import { describe, expect, it } from 'vitest';
import { createSessionStore } from '../src/core/sessionStore';

describe('session store', () => {
  it('tracks and updates state', () => {
    const store = createSessionStore();

    store.upsert({
      sessionKey: 's1',
      state: 'connecting',
      targetId: 't1',
      metroUrl: 'http://localhost:8081',
    });

    store.updateState('s1', 'connected');

    expect(store.get('s1')?.state).toBe('connected');
    expect(store.get('s1')?.targetId).toBe('t1');
  });

  it('removes session', () => {
    const store = createSessionStore();
    store.upsert({ sessionKey: 's1', state: 'idle' });

    store.remove('s1');

    expect(store.get('s1')).toBeUndefined();
  });
});
