import { describe, expect, it } from 'vitest';
import { pickReconnectTarget, RECONNECT_BACKOFF_MS } from '../src/core/reconnect';

describe('pickReconnectTarget', () => {
  it('picks target with same fingerprint first', () => {
    const next = pickReconnectTarget(
      { title: 'Hermes', app: 'SampleApp', device: 'iPhone' },
      [
        { id: 'a', title: 'Hermes', app: 'Other', device: 'Android' },
        { id: 'b', title: 'Hermes', app: 'SampleApp', device: 'iPhone' },
      ]
    );

    expect(next?.id).toBe('b');
  });

  it('falls back to first target when no exact match', () => {
    const next = pickReconnectTarget(
      { title: 'Hermes', app: 'Unknown', device: 'Unknown' },
      [
        { id: 'x', title: 'Hermes', app: 'SampleApp', device: 'iPhone' },
        { id: 'y', title: 'Hermes', app: 'SampleApp', device: 'Android' },
      ]
    );

    expect(next?.id).toBe('x');
  });

  it('exposes reconnect backoff policy', () => {
    expect(RECONNECT_BACKOFF_MS).toEqual([500, 1000, 2000]);
  });
});
