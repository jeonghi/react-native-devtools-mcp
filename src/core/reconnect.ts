export type ReconnectTargetLike = {
  id: string;
  title?: string;
  app?: string;
  device?: string;
};

export const RECONNECT_BACKOFF_MS = [500, 1000, 2000] as const;

export function pickReconnectTarget(
  previous: Partial<ReconnectTargetLike>,
  candidates: ReconnectTargetLike[]
): ReconnectTargetLike | undefined {
  const exact = candidates.find(
    (candidate) =>
      candidate.title === previous.title &&
      candidate.app === previous.app &&
      candidate.device === previous.device
  );

  if (exact) {
    return exact;
  }

  return candidates[0];
}
