export type RnMcpErrorCode =
  | 'RN_TARGET_NOT_FOUND'
  | 'RN_WS_CONNECT_FAILED'
  | 'RN_SESSION_NOT_FOUND'
  | 'RN_CDP_METHOD_UNSUPPORTED'
  | 'RN_CDP_METHOD_NOT_FOUND'
  | 'RN_CDP_INVALID_REQUEST'
  | 'RN_CDP_INVALID_PARAMS'
  | 'RN_CDP_COMMAND_FAILED'
  | 'RN_CDP_TIMEOUT'
  | 'RN_METRO_UNREACHABLE'
  | 'RN_INVALID_INPUT'
  | 'RN_SESSION_CLOSED';

export class RnMcpError extends Error {
  readonly code: RnMcpErrorCode;

  constructor(code: RnMcpErrorCode, message: string) {
    super(message);
    this.name = 'RnMcpError';
    this.code = code;
  }
}

type CdpErrorPayload = {
  code?: unknown;
  message?: unknown;
};

function cdpMessage(method: string, payload?: CdpErrorPayload): string {
  const rawMessage = payload?.message;
  if (typeof rawMessage === 'string' && rawMessage.length > 0) {
    return rawMessage;
  }
  return `${method} failed`;
}

export function toRnCdpError(
  method: string,
  payload?: CdpErrorPayload
): RnMcpError {
  const code = typeof payload?.code === 'number' ? payload.code : undefined;
  const message = cdpMessage(method, payload);

  if (code === -32601) {
    return new RnMcpError('RN_CDP_METHOD_NOT_FOUND', message);
  }

  if (code === -32600) {
    return new RnMcpError('RN_CDP_INVALID_REQUEST', message);
  }

  if (code === -32602) {
    return new RnMcpError('RN_CDP_INVALID_PARAMS', message);
  }

  // Kept for backwards compatibility with existing callers handling this code.
  if (message.toLowerCase().includes('method not found')) {
    return new RnMcpError('RN_CDP_METHOD_UNSUPPORTED', message);
  }

  if (typeof code === 'number') {
    return new RnMcpError('RN_CDP_COMMAND_FAILED', `${message} (code: ${code})`);
  }

  return new RnMcpError('RN_CDP_COMMAND_FAILED', message);
}

export function toRnMcpError(error: unknown): RnMcpError {
  if (error instanceof RnMcpError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.message.startsWith('RN_METRO_UNREACHABLE:')) {
      return new RnMcpError('RN_METRO_UNREACHABLE', error.message);
    }
    if (error.message === 'RN_CDP_TIMEOUT') {
      return new RnMcpError('RN_CDP_TIMEOUT', error.message);
    }
    return new RnMcpError('RN_WS_CONNECT_FAILED', error.message);
  }

  return new RnMcpError('RN_WS_CONNECT_FAILED', 'Unknown error');
}
