import type { TargetListResult, TargetSummary } from './types';

export async function listTargets(metroUrl: string): Promise<TargetListResult> {
  const base = metroUrl.replace(/\/$/, '');
  const res = await fetch(`${base}/json/list`);
  if (!res.ok) {
    throw new Error(`RN_METRO_UNREACHABLE:${res.status}`);
  }

  const rawTargets = (await res.json()) as Array<Record<string, unknown>>;
  const targets: TargetSummary[] = rawTargets
    .filter((item) => typeof item.webSocketDebuggerUrl === 'string')
    .map((item) => {
      const reactNative =
        typeof item.reactNative === 'object' && item.reactNative
          ? (item.reactNative as Record<string, unknown>)
          : undefined;

      const app =
        typeof item.app === 'string'
          ? item.app
          : typeof item.appId === 'string'
            ? item.appId
            : undefined;

      const device =
        typeof item.device === 'string'
          ? item.device
          : typeof item.deviceName === 'string'
            ? item.deviceName
            : undefined;

      return {
        id: String(item.id ?? ''),
        title: String(item.title ?? ''),
        webSocketDebuggerUrl: String(item.webSocketDebuggerUrl),
        vm: typeof item.vm === 'string' ? item.vm : undefined,
        appId: typeof item.appId === 'string' ? item.appId : undefined,
        app,
        deviceName:
          typeof item.deviceName === 'string' ? item.deviceName : undefined,
        device,
        logicalDeviceId:
          reactNative && typeof reactNative.logicalDeviceId === 'string'
            ? reactNative.logicalDeviceId
            : undefined,
        description:
          typeof item.description === 'string' ? item.description : undefined,
        capabilities:
          reactNative && typeof reactNative.capabilities === 'object'
            ? (reactNative.capabilities as Record<string, unknown>)
            : {},
      };
    });

  return { metroUrl: base, targets };
}
