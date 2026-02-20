import { describe, expect, it } from 'vitest';
import { toRnCdpError } from '../src/core/errors';

describe('toRnCdpError', () => {
  it('maps MethodNotFound to dedicated code', () => {
    const error = toRnCdpError('Runtime.foo', {
      code: -32601,
      message: 'Method not found',
    });

    expect(error.code).toBe('RN_CDP_METHOD_NOT_FOUND');
  });

  it('maps InvalidRequest and InvalidParams correctly', () => {
    const invalidRequest = toRnCdpError('Tracing.start', {
      code: -32600,
      message: 'Invalid request',
    });
    const invalidParams = toRnCdpError('Debugger.setBreakpointByUrl', {
      code: -32602,
      message: 'Invalid params',
    });

    expect(invalidRequest.code).toBe('RN_CDP_INVALID_REQUEST');
    expect(invalidParams.code).toBe('RN_CDP_INVALID_PARAMS');
  });

  it('falls back to command failed for other codes', () => {
    const error = toRnCdpError('Runtime.evaluate', {
      code: -32000,
      message: 'Target is paused',
    });

    expect(error.code).toBe('RN_CDP_COMMAND_FAILED');
    expect(error.message).toContain('code: -32000');
  });
});
