type PendingEntry = {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

export type PendingMap = ReturnType<typeof createPendingMap>;

export function createPendingMap() {
  const map = new Map<number, PendingEntry>();

  return {
    create(id: number, timeoutMs: number): Promise<unknown> {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          map.delete(id);
          reject(new Error('RN_CDP_TIMEOUT'));
        }, timeoutMs);

        map.set(id, { resolve, reject, timer });
      });
    },

    take(id: number): PendingEntry | undefined {
      const pending = map.get(id);
      if (!pending) {
        return undefined;
      }

      map.delete(id);
      clearTimeout(pending.timer);
      return pending;
    },

    rejectAll(reason: Error): void {
      for (const [id, pending] of map.entries()) {
        clearTimeout(pending.timer);
        pending.reject(reason);
        map.delete(id);
      }
    },
  };
}

export function resolvePending(pendingMap: PendingMap, message: unknown): void {
  if (typeof message !== 'object' || message === null) {
    return;
  }

  const id = (message as { id?: unknown }).id;
  if (typeof id !== 'number') {
    return;
  }

  const pending = pendingMap.take(id);
  if (!pending) {
    return;
  }

  pending.resolve(message);
}
