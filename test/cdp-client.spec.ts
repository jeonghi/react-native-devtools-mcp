import { describe, expect, it } from 'vitest';
import { createPendingMap, resolvePending } from '../src/core/cdpClient';

describe('cdp pending map', () => {
  it('resolves response by id', async () => {
    const pending = createPendingMap();
    const promise = pending.create(1, 1000);

    resolvePending(pending, { id: 1, result: { ok: true } });

    await expect(promise).resolves.toEqual({
      id: 1,
      result: { ok: true },
    });
  });

  it('rejects by timeout', async () => {
    const pending = createPendingMap();
    const promise = pending.create(2, 5);

    await expect(promise).rejects.toThrow('RN_CDP_TIMEOUT');
  });
});
