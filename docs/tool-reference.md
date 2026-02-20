# Tool Reference

This document describes the MCP tools exposed by `rn-devtools-mcp`.

## Target discovery and sessions

### `rn_list_targets`
- Input:
  - `metroUrl?: string` (optional URL)
- Behavior:
  - Reads Metro inspector targets from `/json/list`.
  - Returns normalized target metadata and capabilities.
- Common errors:
  - `RN_METRO_UNREACHABLE`

### `rn_connect`
- Input:
  - `metroUrl?: string`
  - `webSocketDebuggerUrl?: string`
  - `targetId?: string`
  - `sessionKey?: string`
- Behavior:
  - Connects to target by explicit WebSocket URL or discovered target ID.
  - Best-effort enables `Runtime`, `Debugger`, and `Network` domains.
- Common errors:
  - `RN_TARGET_NOT_FOUND`
  - `RN_WS_CONNECT_FAILED`

### `rn_disconnect`
- Input:
  - `sessionKey: string`
- Behavior:
  - Closes and removes session state.
- Common errors:
  - `RN_SESSION_NOT_FOUND`

### `rn_reconnect`
- Input:
  - `sessionKey: string`
- Behavior:
  - Rediscovers targets and reconnects using target fingerprint matching.
- Common errors:
  - `RN_SESSION_NOT_FOUND`
  - `RN_TARGET_NOT_FOUND`

### `rn_session_status`
- Input:
  - `sessionKey: string`
- Behavior:
  - Returns session state, target metadata, capabilities, and event buffer counts.

## Runtime, debugger, and network controls

### `rn_eval`
- Input:
  - `sessionKey: string`
  - `expression: string`
  - `awaitPromise?: boolean` (default `true`)
  - `returnByValue?: boolean` (default `true`)
- Behavior:
  - Executes `Runtime.evaluate`.
- Common errors:
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

### `rn_debugger_enable`
### `rn_pause`
### `rn_resume`
### `rn_step_over`
### `rn_step_into`
### `rn_step_out`
- Input:
  - `sessionKey: string`
- Behavior:
  - Executes corresponding Debugger CDP command.

### `rn_set_breakpoint_by_url`
- Input:
  - `sessionKey: string`
  - `url: string`
  - `lineNumber: number`
  - `columnNumber?: number`
  - `condition?: string`
- Behavior:
  - Executes `Debugger.setBreakpointByUrl`.

### `rn_network_enable`
- Input:
  - `sessionKey: string`
- Behavior:
  - Enables `Network` domain event flow.

## Event retrieval

### `rn_get_recent_console`
### `rn_get_recent_network`
### `rn_get_recent_exceptions`
- Input:
  - `sessionKey: string`
  - `limit?: number`
- Behavior:
  - Returns recent buffered events from in-memory ring buffers.

## Generic CDP

### `rn_cdp_call`
- Input:
  - `sessionKey: string`
  - `method: string`
  - `params?: object`
- Behavior:
  - Sends arbitrary CDP method call through active session.
- Common errors:
  - `RN_CDP_METHOD_NOT_FOUND`
  - `RN_CDP_INVALID_REQUEST`
  - `RN_CDP_INVALID_PARAMS`
  - `RN_CDP_COMMAND_FAILED`

## Alias tool families

Alias tools are convenience wrappers around `rn_cdp_call`.

### Runtime aliases
- `rn_runtime_enable`
- `rn_runtime_disable`
- `rn_runtime_discard_console_entries`
- `rn_runtime_get_heap_usage`
- `rn_runtime_global_lexical_scope_names`
- `rn_runtime_compile_script`
- `rn_runtime_get_properties`
- `rn_runtime_call_function_on`
- `rn_runtime_release_object`
- `rn_runtime_release_object_group`
- `rn_runtime_run_if_waiting_for_debugger`
- `rn_runtime_add_binding`
- `rn_runtime_remove_binding`

### Debugger aliases
- `rn_debugger_disable`
- `rn_debugger_set_blackboxed_ranges`
- `rn_debugger_set_blackbox_patterns`
- `rn_debugger_set_pause_on_exceptions`
- `rn_debugger_evaluate_on_call_frame`
- `rn_debugger_set_breakpoint`
- `rn_debugger_remove_breakpoint`
- `rn_debugger_set_breakpoints_active`
- `rn_debugger_set_instrumentation_breakpoint`

### Profiler aliases
- `rn_profiler_start`
- `rn_profiler_stop`

### Heap profiler aliases
- `rn_heap_profiler_take_heap_snapshot`
- `rn_heap_profiler_get_object_by_heap_object_id`
- `rn_heap_profiler_get_heap_object_id`
- `rn_heap_profiler_collect_garbage`
- `rn_heap_profiler_start_tracking_heap_objects`
- `rn_heap_profiler_stop_tracking_heap_objects`
- `rn_heap_profiler_start_sampling`
- `rn_heap_profiler_stop_sampling`

### Network/IO/Tracing/Log aliases
- `rn_network_disable`
- `rn_network_get_response_body`
- `rn_network_load_resource`
- `rn_io_read`
- `rn_io_close`
- `rn_tracing_start`
- `rn_tracing_end`
- `rn_log_enable`
- `rn_log_disable`

### Host/domain-specific aliases
- `rn_page_reload`
- `rn_overlay_set_paused_in_debugger_message`
- `rn_react_native_application_enable`
- `rn_react_native_application_disable`

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
