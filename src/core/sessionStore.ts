export type SessionState =
  | 'idle'
  | 'discovering'
  | 'connecting'
  | 'connected'
  | 'degraded'
  | 'reconnecting'
  | 'failed';

export type SessionRecord = {
  sessionKey: string;
  state: SessionState;
  targetId?: string;
  metroUrl?: string;
  lastError?: string;
  lastSeenAt?: number;
};

export function createSessionStore() {
  const sessions = new Map<string, SessionRecord>();

  return {
    upsert(session: SessionRecord): void {
      sessions.set(session.sessionKey, {
        ...session,
        lastSeenAt: Date.now(),
      });
    },

    get(sessionKey: string): SessionRecord | undefined {
      return sessions.get(sessionKey);
    },

    updateState(
      sessionKey: string,
      state: SessionState,
      lastError?: string
    ): void {
      const session = sessions.get(sessionKey);
      if (!session) {
        return;
      }

      sessions.set(sessionKey, {
        ...session,
        state,
        lastError,
        lastSeenAt: Date.now(),
      });
    },

    remove(sessionKey: string): void {
      sessions.delete(sessionKey);
    },

    list(): SessionRecord[] {
      return Array.from(sessions.values());
    },
  };
}
