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
      "args": ["/absolute/path/to/rn-devtools-mcp/dist/src/index.js"]
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

Core tools:

- Target/session: `rn_list_targets`, `rn_connect`, `rn_disconnect`, `rn_reconnect`, `rn_session_status`
- Runtime/debugger/network: `rn_eval`, `rn_debugger_enable`, `rn_pause`, `rn_resume`, `rn_step_over`, `rn_step_into`, `rn_step_out`, `rn_set_breakpoint_by_url`, `rn_network_enable`
- Evidence retrieval: `rn_get_recent_console`, `rn_get_recent_network`, `rn_get_recent_exceptions`
- Generic CDP passthrough: `rn_cdp_call`

Alias families:

- `rn_runtime_*`
- `rn_debugger_*`
- `rn_profiler_*`
- `rn_heap_profiler_*`
- `rn_network_*`
- `rn_io_*`
- `rn_tracing_*`
- `rn_log_*`
- `rn_page_reload`
- `rn_overlay_set_paused_in_debugger_message`
- `rn_react_native_application_*`

See full inputs and examples in [Tool Reference](./docs/tool-reference.md).

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
