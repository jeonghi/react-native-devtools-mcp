export type RoutedEventKind =
  | 'console'
  | 'network'
  | 'debugger'
  | 'exception';

export function classifyCdpEvent(method: string): RoutedEventKind | undefined {
  if (method.startsWith('Runtime.console')) {
    return 'console';
  }

  if (
    method === 'Runtime.exceptionThrown' ||
    method === 'Runtime.exceptionRevoked'
  ) {
    return 'exception';
  }

  if (method.startsWith('Network.')) {
    return 'network';
  }

  if (method.startsWith('Debugger.')) {
    return 'debugger';
  }

  return undefined;
}
