import { afterEach, describe, expect, it, vi } from 'vitest';
import { resolveMetroUrl } from '../src/core/metroUrl';

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  vi.unstubAllGlobals();
  process.env = { ...ORIGINAL_ENV };
});

describe('resolveMetroUrl', () => {
  it('returns provided metroUrl without probing', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    await expect(resolveMetroUrl('http://localhost:9090/')).resolves.toBe(
      'http://localhost:9090'
    );
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('probes candidate ports when metroUrl is omitted', async () => {
    process.env.METRO_PORT_CANDIDATES = '8088,8089';

    const fetchSpy = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === 'http://localhost:8088/json/version') {
        return { ok: true } as Response;
      }
      throw new Error('unreachable');
    });

    vi.stubGlobal('fetch', fetchSpy);

    await expect(resolveMetroUrl()).resolves.toBe('http://localhost:8088');
  });
});
