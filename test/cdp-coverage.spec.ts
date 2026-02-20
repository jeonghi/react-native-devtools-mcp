import { describe, expect, it } from 'vitest';
import { COVERED_CDP_METHODS } from '../src/server/tools';

const EXPECTED_CDP_METHODS = [
  'Debugger.disable',
  'Debugger.enable',
  'Debugger.evaluateOnCallFrame',
  'Debugger.pause',
  'Debugger.removeBreakpoint',
  'Debugger.resume',
  'Debugger.setBlackboxPatterns',
  'Debugger.setBlackboxedRanges',
  'Debugger.setBreakpoint',
  'Debugger.setBreakpointByUrl',
  'Debugger.setBreakpointsActive',
  'Debugger.setInstrumentationBreakpoint',
  'Debugger.setPauseOnExceptions',
  'Debugger.stepInto',
  'Debugger.stepOut',
  'Debugger.stepOver',
  'HeapProfiler.collectGarbage',
  'HeapProfiler.getHeapObjectId',
  'HeapProfiler.getObjectByHeapObjectId',
  'HeapProfiler.startSampling',
  'HeapProfiler.startTrackingHeapObjects',
  'HeapProfiler.stopSampling',
  'HeapProfiler.stopTrackingHeapObjects',
  'HeapProfiler.takeHeapSnapshot',
  'IO.close',
  'IO.read',
  'Log.disable',
  'Log.enable',
  'Network.disable',
  'Network.enable',
  'Network.getResponseBody',
  'Network.loadNetworkResource',
  'Overlay.setPausedInDebuggerMessage',
  'Page.reload',
  'Profiler.start',
  'Profiler.stop',
  'ReactNativeApplication.disable',
  'ReactNativeApplication.enable',
  'Runtime.addBinding',
  'Runtime.callFunctionOn',
  'Runtime.compileScript',
  'Runtime.disable',
  'Runtime.discardConsoleEntries',
  'Runtime.enable',
  'Runtime.evaluate',
  'Runtime.getHeapUsage',
  'Runtime.getProperties',
  'Runtime.globalLexicalScopeNames',
  'Runtime.releaseObject',
  'Runtime.releaseObjectGroup',
  'Runtime.removeBinding',
  'Runtime.runIfWaitingForDebugger',
  'Tracing.end',
  'Tracing.start',
] as const;

describe('CDP method coverage', () => {
  it('covers expected RN Hermes + Host CDP methods', () => {
    const covered = new Set(COVERED_CDP_METHODS);
    const missing = EXPECTED_CDP_METHODS.filter((method) => !covered.has(method));
    const unexpected = COVERED_CDP_METHODS.filter(
      (method) => !EXPECTED_CDP_METHODS.includes(method as (typeof EXPECTED_CDP_METHODS)[number])
    );

    expect(missing).toEqual([]);
    expect(unexpected).toEqual([]);
    expect(COVERED_CDP_METHODS).toHaveLength(EXPECTED_CDP_METHODS.length);
  });
});
