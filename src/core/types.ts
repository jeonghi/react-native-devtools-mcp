export type TargetSummary = {
  id: string;
  title: string;
  webSocketDebuggerUrl: string;
  vm?: string;
  appId?: string;
  app?: string;
  deviceName?: string;
  device?: string;
  logicalDeviceId?: string;
  description?: string;
  capabilities?: Record<string, unknown>;
};

export type TargetListResult = {
  metroUrl: string;
  targets: TargetSummary[];
};
