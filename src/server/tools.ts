import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { toRnMcpError } from '../core/errors';
import { RnDebugService } from '../core/service';

export const CORE_TOOL_NAMES = [
  'rn_list_targets',
  'rn_connect',
  'rn_disconnect',
  'rn_eval',
  'rn_debugger_enable',
  'rn_pause',
  'rn_resume',
  'rn_step_over',
  'rn_step_into',
  'rn_step_out',
  'rn_set_breakpoint_by_url',
  'rn_network_enable',
  'rn_cdp_call',
  'rn_get_recent_console',
  'rn_get_recent_network',
  'rn_get_recent_exceptions',
  'rn_reconnect',
  'rn_session_status',
] as const;

export const CORE_CDP_METHODS = [
  'Runtime.evaluate',
  'Debugger.enable',
  'Debugger.pause',
  'Debugger.resume',
  'Debugger.stepOver',
  'Debugger.stepInto',
  'Debugger.stepOut',
  'Debugger.setBreakpointByUrl',
  'Network.enable',
] as const;

export const CDP_ALIAS_TOOLS = [
  {
    name: 'rn_runtime_enable',
    method: 'Runtime.enable',
    description: 'Enable Runtime domain',
  },
  {
    name: 'rn_runtime_disable',
    method: 'Runtime.disable',
    description: 'Disable Runtime domain',
  },
  {
    name: 'rn_runtime_discard_console_entries',
    method: 'Runtime.discardConsoleEntries',
    description: 'Discard Runtime console entries',
  },
  {
    name: 'rn_runtime_get_heap_usage',
    method: 'Runtime.getHeapUsage',
    description: 'Get runtime heap usage',
  },
  {
    name: 'rn_runtime_global_lexical_scope_names',
    method: 'Runtime.globalLexicalScopeNames',
    description: 'Get global lexical scope names',
  },
  {
    name: 'rn_runtime_compile_script',
    method: 'Runtime.compileScript',
    description: 'Compile runtime script',
  },
  {
    name: 'rn_runtime_get_properties',
    method: 'Runtime.getProperties',
    description: 'Get runtime object properties',
  },
  {
    name: 'rn_runtime_call_function_on',
    method: 'Runtime.callFunctionOn',
    description: 'Call function on runtime object',
  },
  {
    name: 'rn_runtime_release_object',
    method: 'Runtime.releaseObject',
    description: 'Release runtime object handle',
  },
  {
    name: 'rn_runtime_release_object_group',
    method: 'Runtime.releaseObjectGroup',
    description: 'Release runtime object group',
  },
  {
    name: 'rn_runtime_run_if_waiting_for_debugger',
    method: 'Runtime.runIfWaitingForDebugger',
    description: 'Run runtime if waiting for debugger',
  },
  {
    name: 'rn_runtime_add_binding',
    method: 'Runtime.addBinding',
    description: 'Add runtime binding',
  },
  {
    name: 'rn_runtime_remove_binding',
    method: 'Runtime.removeBinding',
    description: 'Remove runtime binding',
  },
  {
    name: 'rn_debugger_disable',
    method: 'Debugger.disable',
    description: 'Disable Debugger domain',
  },
  {
    name: 'rn_debugger_set_blackboxed_ranges',
    method: 'Debugger.setBlackboxedRanges',
    description: 'Set debugger blackboxed ranges',
  },
  {
    name: 'rn_debugger_set_blackbox_patterns',
    method: 'Debugger.setBlackboxPatterns',
    description: 'Set debugger blackbox patterns',
  },
  {
    name: 'rn_debugger_set_pause_on_exceptions',
    method: 'Debugger.setPauseOnExceptions',
    description: 'Set debugger pause-on-exceptions',
  },
  {
    name: 'rn_debugger_evaluate_on_call_frame',
    method: 'Debugger.evaluateOnCallFrame',
    description: 'Evaluate expression on call frame',
  },
  {
    name: 'rn_debugger_set_breakpoint',
    method: 'Debugger.setBreakpoint',
    description: 'Set debugger breakpoint',
  },
  {
    name: 'rn_debugger_remove_breakpoint',
    method: 'Debugger.removeBreakpoint',
    description: 'Remove debugger breakpoint',
  },
  {
    name: 'rn_debugger_set_breakpoints_active',
    method: 'Debugger.setBreakpointsActive',
    description: 'Toggle debugger breakpoints active',
  },
  {
    name: 'rn_debugger_set_instrumentation_breakpoint',
    method: 'Debugger.setInstrumentationBreakpoint',
    description: 'Set debugger instrumentation breakpoint',
  },
  {
    name: 'rn_profiler_start',
    method: 'Profiler.start',
    description: 'Start CPU profiler',
  },
  {
    name: 'rn_profiler_stop',
    method: 'Profiler.stop',
    description: 'Stop CPU profiler',
  },
  {
    name: 'rn_heap_profiler_take_heap_snapshot',
    method: 'HeapProfiler.takeHeapSnapshot',
    description: 'Take heap snapshot',
  },
  {
    name: 'rn_heap_profiler_get_object_by_heap_object_id',
    method: 'HeapProfiler.getObjectByHeapObjectId',
    description: 'Resolve object by heap object id',
  },
  {
    name: 'rn_heap_profiler_get_heap_object_id',
    method: 'HeapProfiler.getHeapObjectId',
    description: 'Resolve heap object id from remote object',
  },
  {
    name: 'rn_heap_profiler_collect_garbage',
    method: 'HeapProfiler.collectGarbage',
    description: 'Collect garbage via heap profiler',
  },
  {
    name: 'rn_heap_profiler_start_tracking_heap_objects',
    method: 'HeapProfiler.startTrackingHeapObjects',
    description: 'Start tracking heap objects',
  },
  {
    name: 'rn_heap_profiler_stop_tracking_heap_objects',
    method: 'HeapProfiler.stopTrackingHeapObjects',
    description: 'Stop tracking heap objects',
  },
  {
    name: 'rn_heap_profiler_start_sampling',
    method: 'HeapProfiler.startSampling',
    description: 'Start heap sampling profiler',
  },
  {
    name: 'rn_heap_profiler_stop_sampling',
    method: 'HeapProfiler.stopSampling',
    description: 'Stop heap sampling profiler',
  },
  {
    name: 'rn_network_disable',
    method: 'Network.disable',
    description: 'Disable Network domain',
  },
  {
    name: 'rn_network_get_response_body',
    method: 'Network.getResponseBody',
    description: 'Get response body for network request',
  },
  {
    name: 'rn_network_load_resource',
    method: 'Network.loadNetworkResource',
    description: 'Load network resource via host',
  },
  {
    name: 'rn_io_read',
    method: 'IO.read',
    description: 'Read chunk from IO stream',
  },
  {
    name: 'rn_io_close',
    method: 'IO.close',
    description: 'Close IO stream',
  },
  {
    name: 'rn_tracing_start',
    method: 'Tracing.start',
    description: 'Start tracing session',
  },
  {
    name: 'rn_tracing_end',
    method: 'Tracing.end',
    description: 'End tracing session',
  },
  {
    name: 'rn_log_enable',
    method: 'Log.enable',
    description: 'Enable Log domain',
  },
  {
    name: 'rn_log_disable',
    method: 'Log.disable',
    description: 'Disable Log domain',
  },
  {
    name: 'rn_page_reload',
    method: 'Page.reload',
    description: 'Trigger host page reload',
  },
  {
    name: 'rn_overlay_set_paused_in_debugger_message',
    method: 'Overlay.setPausedInDebuggerMessage',
    description: 'Set paused-in-debugger overlay message',
  },
  {
    name: 'rn_react_native_application_enable',
    method: 'ReactNativeApplication.enable',
    description: 'Enable ReactNativeApplication domain',
  },
  {
    name: 'rn_react_native_application_disable',
    method: 'ReactNativeApplication.disable',
    description: 'Disable ReactNativeApplication domain',
  },
] as const;

export const CDP_ALIAS_METHODS = CDP_ALIAS_TOOLS.map((tool) => tool.method);

export const COVERED_CDP_METHODS = Array.from(
  new Set<string>([...CORE_CDP_METHODS, ...CDP_ALIAS_METHODS])
);

export const TOOL_NAMES = [
  ...CORE_TOOL_NAMES,
  ...CDP_ALIAS_TOOLS.map((tool) => tool.name),
] as const;

const sessionSchema = z.object({
  sessionKey: z.string().min(1),
});

const cdpAliasSchema = z.object({
  sessionKey: z.string().min(1),
  params: z.record(z.unknown()).optional(),
});

function toContent(value: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }],
  };
}

function toToolError(error: unknown) {
  const rnError = toRnMcpError(error);
  return {
    isError: true,
    content: [
      {
        type: 'text' as const,
        text: `${rnError.code}: ${rnError.message}`,
      },
    ],
  };
}

async function wrapTool<T>(fn: () => Promise<T>) {
  try {
    const result = await fn();
    return toContent(result);
  } catch (error) {
    return toToolError(error);
  }
}

export function registerTools(
  server: McpServer,
  service = new RnDebugService()
): void {
  server.registerTool(
    'rn_list_targets',
    {
      description: 'List React Native CDP targets from Metro /json/list',
      inputSchema: z.object({
        metroUrl: z.string().url().optional(),
      }),
    },
    ({ metroUrl }) => wrapTool(() => service.listTargets(metroUrl))
  );

  server.registerTool(
    'rn_connect',
    {
      description: 'Connect to RN target via webSocketDebuggerUrl or metro targetId',
      inputSchema: z.object({
        metroUrl: z.string().url().optional(),
        webSocketDebuggerUrl: z.string().url().optional(),
        targetId: z.string().optional(),
        sessionKey: z.string().optional(),
      }),
    },
    ({ metroUrl, webSocketDebuggerUrl, targetId, sessionKey }) =>
      wrapTool(() =>
        service.connect({
          metroUrl,
          webSocketDebuggerUrl,
          targetId,
          sessionKey,
        })
      )
  );

  server.registerTool(
    'rn_disconnect',
    {
      description: 'Disconnect CDP session',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.disconnect(sessionKey))
  );

  server.registerTool(
    'rn_eval',
    {
      description: 'Run Runtime.evaluate in RN Hermes runtime',
      inputSchema: z.object({
        sessionKey: z.string(),
        expression: z.string(),
        awaitPromise: z.boolean().optional().default(true),
        returnByValue: z.boolean().optional().default(true),
      }),
    },
    ({ sessionKey, expression, awaitPromise, returnByValue }) =>
      wrapTool(() =>
        service.evaluate(sessionKey, expression, awaitPromise, returnByValue)
      )
  );

  server.registerTool(
    'rn_debugger_enable',
    {
      description: 'Enable Debugger domain',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.enableDebugger(sessionKey))
  );

  server.registerTool(
    'rn_pause',
    {
      description: 'Pause JS execution',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.pause(sessionKey))
  );

  server.registerTool(
    'rn_resume',
    {
      description: 'Resume JS execution',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.resume(sessionKey))
  );

  server.registerTool(
    'rn_step_over',
    {
      description: 'Step over in debugger',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.stepOver(sessionKey))
  );

  server.registerTool(
    'rn_step_into',
    {
      description: 'Step into in debugger',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.stepInto(sessionKey))
  );

  server.registerTool(
    'rn_step_out',
    {
      description: 'Step out in debugger',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.stepOut(sessionKey))
  );

  server.registerTool(
    'rn_set_breakpoint_by_url',
    {
      description: 'Set breakpoint by url/line/column',
      inputSchema: z.object({
        sessionKey: z.string(),
        url: z.string(),
        lineNumber: z.number().int().nonnegative(),
        columnNumber: z.number().int().nonnegative().optional(),
        condition: z.string().optional(),
      }),
    },
    ({ sessionKey, url, lineNumber, columnNumber, condition }) =>
      wrapTool(() =>
        service.setBreakpointByUrl(sessionKey, {
          url,
          lineNumber,
          columnNumber,
          condition,
        })
      )
  );

  server.registerTool(
    'rn_network_enable',
    {
      description: 'Enable Network domain',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.enableNetwork(sessionKey))
  );

  server.registerTool(
    'rn_cdp_call',
    {
      description: 'Send any CDP command to the currently connected RN target',
      inputSchema: z.object({
        sessionKey: z.string(),
        method: z.string().min(1),
        params: z.record(z.unknown()).optional(),
      }),
    },
    ({ sessionKey, method, params }) =>
      wrapTool(() => service.cdpCall(sessionKey, method, params))
  );

  for (const alias of CDP_ALIAS_TOOLS) {
    server.registerTool(
      alias.name,
      {
        description: `${alias.description} (${alias.method})`,
        inputSchema: cdpAliasSchema,
      },
      ({ sessionKey, params }) =>
        wrapTool(() => service.cdpCall(sessionKey, alias.method, params))
    );
  }

  server.registerTool(
    'rn_get_recent_console',
    {
      description: 'Get cached Runtime.console events',
      inputSchema: z.object({
        sessionKey: z.string(),
        limit: z.number().int().positive().optional(),
      }),
    },
    ({ sessionKey, limit }) =>
      wrapTool(async () => service.getRecentConsole(sessionKey, limit))
  );

  server.registerTool(
    'rn_get_recent_network',
    {
      description: 'Get cached Network events',
      inputSchema: z.object({
        sessionKey: z.string(),
        limit: z.number().int().positive().optional(),
      }),
    },
    ({ sessionKey, limit }) =>
      wrapTool(async () => service.getRecentNetwork(sessionKey, limit))
  );

  server.registerTool(
    'rn_get_recent_exceptions',
    {
      description: 'Get cached Runtime exception events',
      inputSchema: z.object({
        sessionKey: z.string(),
        limit: z.number().int().positive().optional(),
      }),
    },
    ({ sessionKey, limit }) =>
      wrapTool(async () => service.getRecentExceptions(sessionKey, limit))
  );

  server.registerTool(
    'rn_reconnect',
    {
      description: 'Reconnect session after reload/disconnect',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(() => service.reconnect(sessionKey))
  );

  server.registerTool(
    'rn_session_status',
    {
      description: 'Get current session state and event buffer counts',
      inputSchema: sessionSchema,
    },
    ({ sessionKey }) => wrapTool(async () => service.getSessionStatus(sessionKey))
  );
}
