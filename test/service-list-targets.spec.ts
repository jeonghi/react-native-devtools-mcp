import { afterEach, describe, expect, it, vi } from 'vitest';
import { RnDebugService } from '../src/core/service';

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  vi.unstubAllGlobals();
  process.env = { ...ORIGINAL_ENV };
});

describe('RnDebugService.listTargets', () => {
  it('auto-detects metro url when not provided', async () => {
    process.env.METRO_PORT_CANDIDATES = '8088';

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);

        if (url === 'http://localhost:8088/json/version') {
          return {
            ok: true,
            json: async () => ({ Browser: 'ReactNative' }),
          } as Response;
        }

        if (url === 'http://localhost:8088/json/list') {
          return {
            ok: true,
            json: async () => [
              {
                id: 't1',
                title: 'Hermes',
                webSocketDebuggerUrl:
                  'ws://127.0.0.1:8088/inspector/debug?device=1&page=1',
              },
            ],
          } as Response;
        }

        throw new Error(`Unexpected URL: ${url}`);
      })
    );

    const service = new RnDebugService();
    const result = await service.listTargets();

    expect(result.metroUrl).toBe('http://localhost:8088');
    expect(result.targets).toHaveLength(1);
  });
});
