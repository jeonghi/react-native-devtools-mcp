import { describe, expect, it } from 'vitest';
import { classifyCdpEvent } from '../src/core/eventRouting';

describe('classifyCdpEvent', () => {
  it('classifies Runtime.exceptionThrown as exception', () => {
    expect(classifyCdpEvent('Runtime.exceptionThrown')).toBe('exception');
  });

  it('classifies Runtime.exceptionRevoked as exception', () => {
    expect(classifyCdpEvent('Runtime.exceptionRevoked')).toBe('exception');
  });

  it('keeps Runtime.console as console', () => {
    expect(classifyCdpEvent('Runtime.consoleAPICalled')).toBe('console');
  });

  it('keeps Network and Debugger mapping', () => {
    expect(classifyCdpEvent('Network.requestWillBeSent')).toBe('network');
    expect(classifyCdpEvent('Debugger.paused')).toBe('debugger');
  });
});
