import { afterEach, describe, expect, it, vi } from 'vitest';
import { listTargets } from '../src/core/targetDiscovery';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('listTargets', () => {
  it('normalizes /json/list response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            id: 't1',
            title: 'Hermes',
            webSocketDebuggerUrl: 'ws://127.0.0.1:8081/inspector/debug?device=1&page=1',
            vm: 'Hermes',
            appId: 'SampleApp',
            deviceName: 'iPhone',
            description: 'Sample app',
            reactNative: {
              logicalDeviceId: 'ios-sim-01',
              capabilities: { nativeSourceCodeFetching: true },
            },
          },
        ],
      })
    );

    const result = await listTargets('http://localhost:8081/');
    expect(result.metroUrl).toBe('http://localhost:8081');
    expect(result.targets).toHaveLength(1);
    expect(result.targets[0]).toMatchObject({
      id: 't1',
      title: 'Hermes',
      webSocketDebuggerUrl:
        'ws://127.0.0.1:8081/inspector/debug?device=1&page=1',
      vm: 'Hermes',
      appId: 'SampleApp',
      app: 'SampleApp',
      deviceName: 'iPhone',
      device: 'iPhone',
      description: 'Sample app',
      logicalDeviceId: 'ios-sim-01',
    });
    expect(result.targets[0].capabilities).toEqual({
      nativeSourceCodeFetching: true,
    });
  });

  it('throws when metro is unreachable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      })
    );

    await expect(listTargets('http://localhost:8081')).rejects.toThrow(
      'RN_METRO_UNREACHABLE:503'
    );
  });
});
