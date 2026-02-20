# rn-devtools-mcp

`rn-devtools-mcp` lets your coding agent control and inspect a live React Native Hermes runtime through the Metro inspector proxy (`/json/list`) and CDP WebSocket targets.

It runs as an MCP server (`stdio`) and exposes React Native debugging primitives as MCP tools for reliable automation, runtime debugging, and evidence collection.

## [Tool Reference](./docs/tool-reference.md) | [Changelog](./CHANGELOG.md) | [Contributing](./CONTRIBUTING.md) | [Troubleshooting](./docs/troubleshooting.md) | [Design Principles](./docs/design-principles.md)

## Key features

- **Metro target discovery**: discovers debuggable RN targets via `/json/list` and `/json/version`.
- **Hermes runtime debugging**: evaluate scripts, pause/resume/step, and manage breakpoints.
- **CDP coverage via aliases**: use dedicated tool aliases or the generic `rn_cdp_call`.
- **Evidence buffers**: capture recent console, network, debugger, and exception events for analysis.
- **Reconnect-aware sessions**: reconnect logic for app reload/disconnect cycles.

## Disclaimers

`rn-devtools-mcp` can inspect and execute code in the connected React Native runtime. Treat connected app data as sensitive.

- Do not connect this server to apps/environments containing secrets you do not want MCP clients to access.
- This server does not sandbox CDP commands; callers with MCP access can issue powerful runtime/debugger commands.

## Requirements

- [Node.js](https://nodejs.org/) 20+
- [npm](https://www.npmjs.com/)
- React Native app running in development mode
- Metro dev server reachable from the MCP server process

## Getting started

Install dependencies:

```bash
npm install
```

Run MCP server (`stdio`):

```bash
npm run dev
```

Default MCP client configuration:

```json
{
  "mcpServers": {
    "rn-devtools": {
      "command": "node",
      "args": ["/absolute/path/to/rn-devtools-mcp/dist/index.js"]
    }
  }
}
```

During development, use `tsx` entry directly:

```json
{
  "mcpServers": {
    "rn-devtools": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/rn-devtools-mcp/src/index.ts"]
    }
  }
}
```

### Client setup examples

#### Codex

```bash
codex mcp add rn-devtools -- npx tsx /absolute/path/to/rn-devtools-mcp/src/index.ts
```

#### Claude Code

```bash
claude mcp add rn-devtools --scope user npx tsx /absolute/path/to/rn-devtools-mcp/src/index.ts
```

#### Cursor

Configure MCP server command in `Cursor Settings -> MCP` using one of the JSON snippets above.

## Verification

```bash
npm test
npm run build
```

Smoke test against a running RN app:

```bash
METRO_URL=http://localhost:8081 npm run smoke
```

If `METRO_URL` is omitted, the server probes local candidates:

- `8081,8082,8083,8088,8090,19000`

Override candidate ports:

```bash
METRO_PORT_CANDIDATES=18081,18082 npm run smoke
```

## Tools

If you run into issues, check [Troubleshooting](./docs/troubleshooting.md).

The catalog below is auto-generated from `src/server/tools.ts`.

<!-- BEGIN AUTO GENERATED TOOLS -->
- **Target & session** (5 tools)
  - [`rn_list_targets`](docs/tool-reference.md#rn_list_targets)
  - [`rn_connect`](docs/tool-reference.md#rn_connect)
  - [`rn_disconnect`](docs/tool-reference.md#rn_disconnect)
  - [`rn_reconnect`](docs/tool-reference.md#rn_reconnect)
  - [`rn_session_status`](docs/tool-reference.md#rn_session_status)
- **Runtime & debugger control** (8 tools)
  - [`rn_eval`](docs/tool-reference.md#rn_eval)
  - [`rn_debugger_enable`](docs/tool-reference.md#rn_debugger_enable)
  - [`rn_pause`](docs/tool-reference.md#rn_pause)
  - [`rn_resume`](docs/tool-reference.md#rn_resume)
  - [`rn_step_over`](docs/tool-reference.md#rn_step_over)
  - [`rn_step_into`](docs/tool-reference.md#rn_step_into)
  - [`rn_step_out`](docs/tool-reference.md#rn_step_out)
  - [`rn_set_breakpoint_by_url`](docs/tool-reference.md#rn_set_breakpoint_by_url)
- **Network & evidence** (4 tools)
  - [`rn_network_enable`](docs/tool-reference.md#rn_network_enable)
  - [`rn_get_recent_console`](docs/tool-reference.md#rn_get_recent_console)
  - [`rn_get_recent_network`](docs/tool-reference.md#rn_get_recent_network)
  - [`rn_get_recent_exceptions`](docs/tool-reference.md#rn_get_recent_exceptions)
- **Generic CDP** (1 tool)
  - [`rn_cdp_call`](docs/tool-reference.md#rn_cdp_call)

- **CDP alias families**
  - **Runtime aliases** (13 tools)
    - [`rn_runtime_enable`](docs/tool-reference.md#rn_runtime_enable)
    - [`rn_runtime_disable`](docs/tool-reference.md#rn_runtime_disable)
    - [`rn_runtime_discard_console_entries`](docs/tool-reference.md#rn_runtime_discard_console_entries)
    - [`rn_runtime_get_heap_usage`](docs/tool-reference.md#rn_runtime_get_heap_usage)
    - [`rn_runtime_global_lexical_scope_names`](docs/tool-reference.md#rn_runtime_global_lexical_scope_names)
    - [`rn_runtime_compile_script`](docs/tool-reference.md#rn_runtime_compile_script)
    - [`rn_runtime_get_properties`](docs/tool-reference.md#rn_runtime_get_properties)
    - [`rn_runtime_call_function_on`](docs/tool-reference.md#rn_runtime_call_function_on)
    - [`rn_runtime_release_object`](docs/tool-reference.md#rn_runtime_release_object)
    - [`rn_runtime_release_object_group`](docs/tool-reference.md#rn_runtime_release_object_group)
    - [`rn_runtime_run_if_waiting_for_debugger`](docs/tool-reference.md#rn_runtime_run_if_waiting_for_debugger)
    - [`rn_runtime_add_binding`](docs/tool-reference.md#rn_runtime_add_binding)
    - [`rn_runtime_remove_binding`](docs/tool-reference.md#rn_runtime_remove_binding)
  - **Debugger aliases** (9 tools)
    - [`rn_debugger_disable`](docs/tool-reference.md#rn_debugger_disable)
    - [`rn_debugger_set_blackboxed_ranges`](docs/tool-reference.md#rn_debugger_set_blackboxed_ranges)
    - [`rn_debugger_set_blackbox_patterns`](docs/tool-reference.md#rn_debugger_set_blackbox_patterns)
    - [`rn_debugger_set_pause_on_exceptions`](docs/tool-reference.md#rn_debugger_set_pause_on_exceptions)
    - [`rn_debugger_evaluate_on_call_frame`](docs/tool-reference.md#rn_debugger_evaluate_on_call_frame)
    - [`rn_debugger_set_breakpoint`](docs/tool-reference.md#rn_debugger_set_breakpoint)
    - [`rn_debugger_remove_breakpoint`](docs/tool-reference.md#rn_debugger_remove_breakpoint)
    - [`rn_debugger_set_breakpoints_active`](docs/tool-reference.md#rn_debugger_set_breakpoints_active)
    - [`rn_debugger_set_instrumentation_breakpoint`](docs/tool-reference.md#rn_debugger_set_instrumentation_breakpoint)
  - **Profiler aliases** (2 tools)
    - [`rn_profiler_start`](docs/tool-reference.md#rn_profiler_start)
    - [`rn_profiler_stop`](docs/tool-reference.md#rn_profiler_stop)
  - **Heap profiler aliases** (8 tools)
    - [`rn_heap_profiler_take_heap_snapshot`](docs/tool-reference.md#rn_heap_profiler_take_heap_snapshot)
    - [`rn_heap_profiler_get_object_by_heap_object_id`](docs/tool-reference.md#rn_heap_profiler_get_object_by_heap_object_id)
    - [`rn_heap_profiler_get_heap_object_id`](docs/tool-reference.md#rn_heap_profiler_get_heap_object_id)
    - [`rn_heap_profiler_collect_garbage`](docs/tool-reference.md#rn_heap_profiler_collect_garbage)
    - [`rn_heap_profiler_start_tracking_heap_objects`](docs/tool-reference.md#rn_heap_profiler_start_tracking_heap_objects)
    - [`rn_heap_profiler_stop_tracking_heap_objects`](docs/tool-reference.md#rn_heap_profiler_stop_tracking_heap_objects)
    - [`rn_heap_profiler_start_sampling`](docs/tool-reference.md#rn_heap_profiler_start_sampling)
    - [`rn_heap_profiler_stop_sampling`](docs/tool-reference.md#rn_heap_profiler_stop_sampling)
  - **Network aliases** (3 tools)
    - [`rn_network_disable`](docs/tool-reference.md#rn_network_disable)
    - [`rn_network_get_response_body`](docs/tool-reference.md#rn_network_get_response_body)
    - [`rn_network_load_resource`](docs/tool-reference.md#rn_network_load_resource)
  - **IO aliases** (2 tools)
    - [`rn_io_read`](docs/tool-reference.md#rn_io_read)
    - [`rn_io_close`](docs/tool-reference.md#rn_io_close)
  - **Tracing aliases** (2 tools)
    - [`rn_tracing_start`](docs/tool-reference.md#rn_tracing_start)
    - [`rn_tracing_end`](docs/tool-reference.md#rn_tracing_end)
  - **Log aliases** (2 tools)
    - [`rn_log_enable`](docs/tool-reference.md#rn_log_enable)
    - [`rn_log_disable`](docs/tool-reference.md#rn_log_disable)
  - **Host aliases** (2 tools)
    - [`rn_page_reload`](docs/tool-reference.md#rn_page_reload)
    - [`rn_overlay_set_paused_in_debugger_message`](docs/tool-reference.md#rn_overlay_set_paused_in_debugger_message)
  - **ReactNativeApplication aliases** (2 tools)
    - [`rn_react_native_application_enable`](docs/tool-reference.md#rn_react_native_application_enable)
    - [`rn_react_native_application_disable`](docs/tool-reference.md#rn_react_native_application_disable)
<!-- END AUTO GENERATED TOOLS -->

See full inputs, behavior, and errors in [Tool Reference](./docs/tool-reference.md).

## Configuration

Environment variables:

- `METRO_URL`: explicit Metro base URL (example: `http://localhost:8081`)
- `METRO_PORT_CANDIDATES`: comma-separated fallback probe ports when `METRO_URL` is not set

## Concepts

### Target discovery

The server discovers targets from Metro inspector endpoints and selects Hermes targets by default when possible.

### Session model

Each connection is represented by `sessionKey`. Tools that issue CDP commands require a connected session.

### Event buffers

The server caches recent events in ring buffers. You can query recent console/network/exception events at any time during a live session.

## Known limitations

- Native debugger workflows (LLDB/Android Studio breakpoints) are out of scope.
- CDP support is capability-dependent by RN/Hermes target and version.
- Some CDP commands may fail with `RN_CDP_METHOD_UNSUPPORTED`, `RN_CDP_METHOD_NOT_FOUND`, or other command errors.

## License

MIT - see [LICENSE](./LICENSE).
