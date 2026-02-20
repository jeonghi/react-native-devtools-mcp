# Tool Reference

This document describes MCP tools exposed by `rn-devtools-mcp`.

> The sections between auto-generation markers are generated from `src/server/tools.ts`.

## Tool index

<!-- BEGIN AUTO GENERATED TOOL INDEX -->
- **Target & session** (5 tools)
  - [`rn_list_targets`](#rn_list_targets)
  - [`rn_connect`](#rn_connect)
  - [`rn_disconnect`](#rn_disconnect)
  - [`rn_reconnect`](#rn_reconnect)
  - [`rn_session_status`](#rn_session_status)
- **Runtime & debugger control** (8 tools)
  - [`rn_eval`](#rn_eval)
  - [`rn_debugger_enable`](#rn_debugger_enable)
  - [`rn_pause`](#rn_pause)
  - [`rn_resume`](#rn_resume)
  - [`rn_step_over`](#rn_step_over)
  - [`rn_step_into`](#rn_step_into)
  - [`rn_step_out`](#rn_step_out)
  - [`rn_set_breakpoint_by_url`](#rn_set_breakpoint_by_url)
- **Network & evidence** (4 tools)
  - [`rn_network_enable`](#rn_network_enable)
  - [`rn_get_recent_console`](#rn_get_recent_console)
  - [`rn_get_recent_network`](#rn_get_recent_network)
  - [`rn_get_recent_exceptions`](#rn_get_recent_exceptions)
- **Generic CDP** (1 tool)
  - [`rn_cdp_call`](#rn_cdp_call)

- **CDP alias families**
  - **Runtime aliases** (13 tools)
    - [`rn_runtime_enable`](#rn_runtime_enable)
    - [`rn_runtime_disable`](#rn_runtime_disable)
    - [`rn_runtime_discard_console_entries`](#rn_runtime_discard_console_entries)
    - [`rn_runtime_get_heap_usage`](#rn_runtime_get_heap_usage)
    - [`rn_runtime_global_lexical_scope_names`](#rn_runtime_global_lexical_scope_names)
    - [`rn_runtime_compile_script`](#rn_runtime_compile_script)
    - [`rn_runtime_get_properties`](#rn_runtime_get_properties)
    - [`rn_runtime_call_function_on`](#rn_runtime_call_function_on)
    - [`rn_runtime_release_object`](#rn_runtime_release_object)
    - [`rn_runtime_release_object_group`](#rn_runtime_release_object_group)
    - [`rn_runtime_run_if_waiting_for_debugger`](#rn_runtime_run_if_waiting_for_debugger)
    - [`rn_runtime_add_binding`](#rn_runtime_add_binding)
    - [`rn_runtime_remove_binding`](#rn_runtime_remove_binding)
  - **Debugger aliases** (9 tools)
    - [`rn_debugger_disable`](#rn_debugger_disable)
    - [`rn_debugger_set_blackboxed_ranges`](#rn_debugger_set_blackboxed_ranges)
    - [`rn_debugger_set_blackbox_patterns`](#rn_debugger_set_blackbox_patterns)
    - [`rn_debugger_set_pause_on_exceptions`](#rn_debugger_set_pause_on_exceptions)
    - [`rn_debugger_evaluate_on_call_frame`](#rn_debugger_evaluate_on_call_frame)
    - [`rn_debugger_set_breakpoint`](#rn_debugger_set_breakpoint)
    - [`rn_debugger_remove_breakpoint`](#rn_debugger_remove_breakpoint)
    - [`rn_debugger_set_breakpoints_active`](#rn_debugger_set_breakpoints_active)
    - [`rn_debugger_set_instrumentation_breakpoint`](#rn_debugger_set_instrumentation_breakpoint)
  - **Profiler aliases** (2 tools)
    - [`rn_profiler_start`](#rn_profiler_start)
    - [`rn_profiler_stop`](#rn_profiler_stop)
  - **Heap profiler aliases** (8 tools)
    - [`rn_heap_profiler_take_heap_snapshot`](#rn_heap_profiler_take_heap_snapshot)
    - [`rn_heap_profiler_get_object_by_heap_object_id`](#rn_heap_profiler_get_object_by_heap_object_id)
    - [`rn_heap_profiler_get_heap_object_id`](#rn_heap_profiler_get_heap_object_id)
    - [`rn_heap_profiler_collect_garbage`](#rn_heap_profiler_collect_garbage)
    - [`rn_heap_profiler_start_tracking_heap_objects`](#rn_heap_profiler_start_tracking_heap_objects)
    - [`rn_heap_profiler_stop_tracking_heap_objects`](#rn_heap_profiler_stop_tracking_heap_objects)
    - [`rn_heap_profiler_start_sampling`](#rn_heap_profiler_start_sampling)
    - [`rn_heap_profiler_stop_sampling`](#rn_heap_profiler_stop_sampling)
  - **Network aliases** (3 tools)
    - [`rn_network_disable`](#rn_network_disable)
    - [`rn_network_get_response_body`](#rn_network_get_response_body)
    - [`rn_network_load_resource`](#rn_network_load_resource)
  - **IO aliases** (2 tools)
    - [`rn_io_read`](#rn_io_read)
    - [`rn_io_close`](#rn_io_close)
  - **Tracing aliases** (2 tools)
    - [`rn_tracing_start`](#rn_tracing_start)
    - [`rn_tracing_end`](#rn_tracing_end)
  - **Log aliases** (2 tools)
    - [`rn_log_enable`](#rn_log_enable)
    - [`rn_log_disable`](#rn_log_disable)
  - **Host aliases** (2 tools)
    - [`rn_page_reload`](#rn_page_reload)
    - [`rn_overlay_set_paused_in_debugger_message`](#rn_overlay_set_paused_in_debugger_message)
  - **ReactNativeApplication aliases** (2 tools)
    - [`rn_react_native_application_enable`](#rn_react_native_application_enable)
    - [`rn_react_native_application_disable`](#rn_react_native_application_disable)
<!-- END AUTO GENERATED TOOL INDEX -->

## Detailed reference

<!-- BEGIN AUTO GENERATED TOOL DETAILS -->
## Core tools

### `rn_list_targets`
- Category: Target & session
- Summary: List RN CDP targets from Metro inspector.
- Input schema:
  - `metroUrl?: string`
- Common errors:
  - `RN_METRO_UNREACHABLE`

### `rn_connect`
- Category: Target & session
- Summary: Connect to an RN target using targetId or WebSocket URL.
- Input schema:
  - `metroUrl?: string`
  - `webSocketDebuggerUrl?: string`
  - `targetId?: string`
  - `sessionKey?: string`
- Common errors:
  - `RN_TARGET_NOT_FOUND`
  - `RN_WS_CONNECT_FAILED`

### `rn_disconnect`
- Category: Target & session
- Summary: Disconnect and remove session state.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`

### `rn_reconnect`
- Category: Target & session
- Summary: Reconnect after reload/disconnect using target fingerprint matching.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_TARGET_NOT_FOUND`

### `rn_session_status`
- Category: Target & session
- Summary: Return state, target metadata, capabilities, and buffer counts.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`

### `rn_eval`
- Category: Runtime & debugger control
- Summary: Run Runtime.evaluate in Hermes.
- Input schema:
  - `sessionKey: string`
  - `expression: string`
  - `awaitPromise?: boolean`
  - `returnByValue?: boolean`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_enable`
- Category: Runtime & debugger control
- Summary: Enable Debugger domain.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_COMMAND_FAILED`

### `rn_pause`
- Category: Runtime & debugger control
- Summary: Pause JS execution.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_COMMAND_FAILED`

### `rn_resume`
- Category: Runtime & debugger control
- Summary: Resume JS execution.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_COMMAND_FAILED`

### `rn_step_over`
- Category: Runtime & debugger control
- Summary: Step over current statement.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_COMMAND_FAILED`

### `rn_step_into`
- Category: Runtime & debugger control
- Summary: Step into current call.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_COMMAND_FAILED`

### `rn_step_out`
- Category: Runtime & debugger control
- Summary: Step out of current frame.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_COMMAND_FAILED`

### `rn_set_breakpoint_by_url`
- Category: Runtime & debugger control
- Summary: Set breakpoint by url/line/column.
- Input schema:
  - `sessionKey: string`
  - `url: string`
  - `lineNumber: number`
  - `columnNumber?: number`
  - `condition?: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_network_enable`
- Category: Network & evidence
- Summary: Enable Network domain events.
- Input schema:
  - `sessionKey: string`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_COMMAND_FAILED`

### `rn_get_recent_console`
- Category: Network & evidence
- Summary: Get buffered recent console events.
- Input schema:
  - `sessionKey: string`
  - `limit?: number`
- Common errors:
  - `RN_SESSION_NOT_FOUND`

### `rn_get_recent_network`
- Category: Network & evidence
- Summary: Get buffered recent network events.
- Input schema:
  - `sessionKey: string`
  - `limit?: number`
- Common errors:
  - `RN_SESSION_NOT_FOUND`

### `rn_get_recent_exceptions`
- Category: Network & evidence
- Summary: Get buffered recent runtime exception events.
- Input schema:
  - `sessionKey: string`
  - `limit?: number`
- Common errors:
  - `RN_SESSION_NOT_FOUND`

### `rn_cdp_call`
- Category: Generic CDP
- Summary: Send arbitrary CDP command to connected session.
- Input schema:
  - `sessionKey: string`
  - `method: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

## Alias tools

### Runtime aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_runtime_enable`](#rn_runtime_enable) -> `Runtime.enable`
  - [`rn_runtime_disable`](#rn_runtime_disable) -> `Runtime.disable`
  - [`rn_runtime_discard_console_entries`](#rn_runtime_discard_console_entries) -> `Runtime.discardConsoleEntries`
  - [`rn_runtime_get_heap_usage`](#rn_runtime_get_heap_usage) -> `Runtime.getHeapUsage`
  - [`rn_runtime_global_lexical_scope_names`](#rn_runtime_global_lexical_scope_names) -> `Runtime.globalLexicalScopeNames`
  - [`rn_runtime_compile_script`](#rn_runtime_compile_script) -> `Runtime.compileScript`
  - [`rn_runtime_get_properties`](#rn_runtime_get_properties) -> `Runtime.getProperties`
  - [`rn_runtime_call_function_on`](#rn_runtime_call_function_on) -> `Runtime.callFunctionOn`
  - [`rn_runtime_release_object`](#rn_runtime_release_object) -> `Runtime.releaseObject`
  - [`rn_runtime_release_object_group`](#rn_runtime_release_object_group) -> `Runtime.releaseObjectGroup`
  - [`rn_runtime_run_if_waiting_for_debugger`](#rn_runtime_run_if_waiting_for_debugger) -> `Runtime.runIfWaitingForDebugger`
  - [`rn_runtime_add_binding`](#rn_runtime_add_binding) -> `Runtime.addBinding`
  - [`rn_runtime_remove_binding`](#rn_runtime_remove_binding) -> `Runtime.removeBinding`

### Debugger aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_debugger_disable`](#rn_debugger_disable) -> `Debugger.disable`
  - [`rn_debugger_set_blackboxed_ranges`](#rn_debugger_set_blackboxed_ranges) -> `Debugger.setBlackboxedRanges`
  - [`rn_debugger_set_blackbox_patterns`](#rn_debugger_set_blackbox_patterns) -> `Debugger.setBlackboxPatterns`
  - [`rn_debugger_set_pause_on_exceptions`](#rn_debugger_set_pause_on_exceptions) -> `Debugger.setPauseOnExceptions`
  - [`rn_debugger_evaluate_on_call_frame`](#rn_debugger_evaluate_on_call_frame) -> `Debugger.evaluateOnCallFrame`
  - [`rn_debugger_set_breakpoint`](#rn_debugger_set_breakpoint) -> `Debugger.setBreakpoint`
  - [`rn_debugger_remove_breakpoint`](#rn_debugger_remove_breakpoint) -> `Debugger.removeBreakpoint`
  - [`rn_debugger_set_breakpoints_active`](#rn_debugger_set_breakpoints_active) -> `Debugger.setBreakpointsActive`
  - [`rn_debugger_set_instrumentation_breakpoint`](#rn_debugger_set_instrumentation_breakpoint) -> `Debugger.setInstrumentationBreakpoint`

### Profiler aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_profiler_start`](#rn_profiler_start) -> `Profiler.start`
  - [`rn_profiler_stop`](#rn_profiler_stop) -> `Profiler.stop`

### Heap profiler aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_heap_profiler_take_heap_snapshot`](#rn_heap_profiler_take_heap_snapshot) -> `HeapProfiler.takeHeapSnapshot`
  - [`rn_heap_profiler_get_object_by_heap_object_id`](#rn_heap_profiler_get_object_by_heap_object_id) -> `HeapProfiler.getObjectByHeapObjectId`
  - [`rn_heap_profiler_get_heap_object_id`](#rn_heap_profiler_get_heap_object_id) -> `HeapProfiler.getHeapObjectId`
  - [`rn_heap_profiler_collect_garbage`](#rn_heap_profiler_collect_garbage) -> `HeapProfiler.collectGarbage`
  - [`rn_heap_profiler_start_tracking_heap_objects`](#rn_heap_profiler_start_tracking_heap_objects) -> `HeapProfiler.startTrackingHeapObjects`
  - [`rn_heap_profiler_stop_tracking_heap_objects`](#rn_heap_profiler_stop_tracking_heap_objects) -> `HeapProfiler.stopTrackingHeapObjects`
  - [`rn_heap_profiler_start_sampling`](#rn_heap_profiler_start_sampling) -> `HeapProfiler.startSampling`
  - [`rn_heap_profiler_stop_sampling`](#rn_heap_profiler_stop_sampling) -> `HeapProfiler.stopSampling`

### Network aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_network_disable`](#rn_network_disable) -> `Network.disable`
  - [`rn_network_get_response_body`](#rn_network_get_response_body) -> `Network.getResponseBody`
  - [`rn_network_load_resource`](#rn_network_load_resource) -> `Network.loadNetworkResource`

### IO aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_io_read`](#rn_io_read) -> `IO.read`
  - [`rn_io_close`](#rn_io_close) -> `IO.close`

### Tracing aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_tracing_start`](#rn_tracing_start) -> `Tracing.start`
  - [`rn_tracing_end`](#rn_tracing_end) -> `Tracing.end`

### Log aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_log_enable`](#rn_log_enable) -> `Log.enable`
  - [`rn_log_disable`](#rn_log_disable) -> `Log.disable`

### Host aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_page_reload`](#rn_page_reload) -> `Page.reload`
  - [`rn_overlay_set_paused_in_debugger_message`](#rn_overlay_set_paused_in_debugger_message) -> `Overlay.setPausedInDebuggerMessage`

### ReactNativeApplication aliases
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
- Tools:
  - [`rn_react_native_application_enable`](#rn_react_native_application_enable) -> `ReactNativeApplication.enable`
  - [`rn_react_native_application_disable`](#rn_react_native_application_disable) -> `ReactNativeApplication.disable`

### `rn_runtime_enable`
- Category: Runtime aliases
- CDP method: `Runtime.enable`
- Summary: Enable Runtime domain
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_disable`
- Category: Runtime aliases
- CDP method: `Runtime.disable`
- Summary: Disable Runtime domain
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_discard_console_entries`
- Category: Runtime aliases
- CDP method: `Runtime.discardConsoleEntries`
- Summary: Discard Runtime console entries
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_get_heap_usage`
- Category: Runtime aliases
- CDP method: `Runtime.getHeapUsage`
- Summary: Get runtime heap usage
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_global_lexical_scope_names`
- Category: Runtime aliases
- CDP method: `Runtime.globalLexicalScopeNames`
- Summary: Get global lexical scope names
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_compile_script`
- Category: Runtime aliases
- CDP method: `Runtime.compileScript`
- Summary: Compile runtime script
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_get_properties`
- Category: Runtime aliases
- CDP method: `Runtime.getProperties`
- Summary: Get runtime object properties
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_call_function_on`
- Category: Runtime aliases
- CDP method: `Runtime.callFunctionOn`
- Summary: Call function on runtime object
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_release_object`
- Category: Runtime aliases
- CDP method: `Runtime.releaseObject`
- Summary: Release runtime object handle
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_release_object_group`
- Category: Runtime aliases
- CDP method: `Runtime.releaseObjectGroup`
- Summary: Release runtime object group
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_run_if_waiting_for_debugger`
- Category: Runtime aliases
- CDP method: `Runtime.runIfWaitingForDebugger`
- Summary: Run runtime if waiting for debugger
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_add_binding`
- Category: Runtime aliases
- CDP method: `Runtime.addBinding`
- Summary: Add runtime binding
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_runtime_remove_binding`
- Category: Runtime aliases
- CDP method: `Runtime.removeBinding`
- Summary: Remove runtime binding
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_disable`
- Category: Debugger aliases
- CDP method: `Debugger.disable`
- Summary: Disable Debugger domain
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_set_blackboxed_ranges`
- Category: Debugger aliases
- CDP method: `Debugger.setBlackboxedRanges`
- Summary: Set debugger blackboxed ranges
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_set_blackbox_patterns`
- Category: Debugger aliases
- CDP method: `Debugger.setBlackboxPatterns`
- Summary: Set debugger blackbox patterns
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_set_pause_on_exceptions`
- Category: Debugger aliases
- CDP method: `Debugger.setPauseOnExceptions`
- Summary: Set debugger pause-on-exceptions
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_evaluate_on_call_frame`
- Category: Debugger aliases
- CDP method: `Debugger.evaluateOnCallFrame`
- Summary: Evaluate expression on call frame
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_set_breakpoint`
- Category: Debugger aliases
- CDP method: `Debugger.setBreakpoint`
- Summary: Set debugger breakpoint
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_remove_breakpoint`
- Category: Debugger aliases
- CDP method: `Debugger.removeBreakpoint`
- Summary: Remove debugger breakpoint
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_set_breakpoints_active`
- Category: Debugger aliases
- CDP method: `Debugger.setBreakpointsActive`
- Summary: Toggle debugger breakpoints active
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_set_instrumentation_breakpoint`
- Category: Debugger aliases
- CDP method: `Debugger.setInstrumentationBreakpoint`
- Summary: Set debugger instrumentation breakpoint
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_profiler_start`
- Category: Profiler aliases
- CDP method: `Profiler.start`
- Summary: Start CPU profiler
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_profiler_stop`
- Category: Profiler aliases
- CDP method: `Profiler.stop`
- Summary: Stop CPU profiler
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_heap_profiler_take_heap_snapshot`
- Category: Heap profiler aliases
- CDP method: `HeapProfiler.takeHeapSnapshot`
- Summary: Take heap snapshot
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_heap_profiler_get_object_by_heap_object_id`
- Category: Heap profiler aliases
- CDP method: `HeapProfiler.getObjectByHeapObjectId`
- Summary: Resolve object by heap object id
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_heap_profiler_get_heap_object_id`
- Category: Heap profiler aliases
- CDP method: `HeapProfiler.getHeapObjectId`
- Summary: Resolve heap object id from remote object
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_heap_profiler_collect_garbage`
- Category: Heap profiler aliases
- CDP method: `HeapProfiler.collectGarbage`
- Summary: Collect garbage via heap profiler
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_heap_profiler_start_tracking_heap_objects`
- Category: Heap profiler aliases
- CDP method: `HeapProfiler.startTrackingHeapObjects`
- Summary: Start tracking heap objects
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_heap_profiler_stop_tracking_heap_objects`
- Category: Heap profiler aliases
- CDP method: `HeapProfiler.stopTrackingHeapObjects`
- Summary: Stop tracking heap objects
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_heap_profiler_start_sampling`
- Category: Heap profiler aliases
- CDP method: `HeapProfiler.startSampling`
- Summary: Start heap sampling profiler
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_heap_profiler_stop_sampling`
- Category: Heap profiler aliases
- CDP method: `HeapProfiler.stopSampling`
- Summary: Stop heap sampling profiler
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_network_disable`
- Category: Network aliases
- CDP method: `Network.disable`
- Summary: Disable Network domain
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_network_get_response_body`
- Category: Network aliases
- CDP method: `Network.getResponseBody`
- Summary: Get response body for network request
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_network_load_resource`
- Category: Network aliases
- CDP method: `Network.loadNetworkResource`
- Summary: Load network resource via host
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_io_read`
- Category: IO aliases
- CDP method: `IO.read`
- Summary: Read chunk from IO stream
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_io_close`
- Category: IO aliases
- CDP method: `IO.close`
- Summary: Close IO stream
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_tracing_start`
- Category: Tracing aliases
- CDP method: `Tracing.start`
- Summary: Start tracing session
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_tracing_end`
- Category: Tracing aliases
- CDP method: `Tracing.end`
- Summary: End tracing session
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_log_enable`
- Category: Log aliases
- CDP method: `Log.enable`
- Summary: Enable Log domain
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_log_disable`
- Category: Log aliases
- CDP method: `Log.disable`
- Summary: Disable Log domain
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_page_reload`
- Category: Host aliases
- CDP method: `Page.reload`
- Summary: Trigger host page reload
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_overlay_set_paused_in_debugger_message`
- Category: Host aliases
- CDP method: `Overlay.setPausedInDebuggerMessage`
- Summary: Set paused-in-debugger overlay message
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_react_native_application_enable`
- Category: ReactNativeApplication aliases
- CDP method: `ReactNativeApplication.enable`
- Summary: Enable ReactNativeApplication domain
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_react_native_application_disable`
- Category: ReactNativeApplication aliases
- CDP method: `ReactNativeApplication.disable`
- Summary: Disable ReactNativeApplication domain
- Input schema:
  - `sessionKey: string`
  - `params?: Record<string, unknown>`
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`
<!-- END AUTO GENERATED TOOL DETAILS -->

## Error codes

Potential `RN_*` error codes surfaced by tools:

- `RN_TARGET_NOT_FOUND`
- `RN_WS_CONNECT_FAILED`
- `RN_SESSION_NOT_FOUND`
- `RN_CDP_METHOD_UNSUPPORTED`
- `RN_CDP_METHOD_NOT_FOUND`
- `RN_CDP_INVALID_REQUEST`
- `RN_CDP_INVALID_PARAMS`
- `RN_CDP_COMMAND_FAILED`
- `RN_CDP_TIMEOUT`
- `RN_METRO_UNREACHABLE`
- `RN_INVALID_INPUT`
- `RN_SESSION_CLOSED`
