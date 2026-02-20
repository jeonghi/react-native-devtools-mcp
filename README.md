# rn-devtools-mcp

React Native DevTools Inspector Proxy (`/json/list`)에 연결해 Hermes/CDP 디버깅을 자동화하는 MCP 서버(`stdio`)입니다.

## Requirements

- Node.js 20+
- React Native app running in dev mode
- Metro server running (default `http://localhost:8081`)

## Install

```bash
npm install
```

## Run (stdio)

```bash
npm run dev
```

## Build / Test

```bash
npm run build
npm test
```

## Smoke Validation

```bash
METRO_URL=http://localhost:8081 npm run smoke
```

`METRO_URL`를 지정하지 않으면 MCP가 로컬 후보 포트(`8081,8082,8083,8088,8090,19000`)를 자동 탐지합니다.
필요하면 `METRO_PORT_CANDIDATES=18081,18082` 형태로 후보 포트를 바꿀 수 있습니다.

Smoke는 아래 체인을 검증합니다.

1. `rn_list_targets`
2. `rn_connect`
3. `rn_eval` (`globalThis.__DEV__`)

## Tools

- `rn_list_targets`
- `rn_connect`
- `rn_disconnect`
- `rn_eval`
- `rn_debugger_enable`
- `rn_pause`
- `rn_resume`
- `rn_step_over`
- `rn_step_into`
- `rn_step_out`
- `rn_set_breakpoint_by_url`
- `rn_network_enable`
- `rn_cdp_call`
- `rn_runtime_*`, `rn_debugger_*`, `rn_profiler_*`, `rn_heap_profiler_*`
- `rn_network_*`, `rn_io_*`, `rn_tracing_*`, `rn_log_*`
- `rn_page_reload`, `rn_overlay_set_paused_in_debugger_message`
- `rn_react_native_application_*`
- `rn_get_recent_console`
- `rn_get_recent_network`
- `rn_get_recent_exceptions`
- `rn_reconnect`
- `rn_session_status`

## Limitations

- LLDB/Android Studio 네이티브 브레이크포인트 자동화는 지원하지 않습니다.
- RN target capabilities에 따라 일부 CDP method는 `RN_CDP_METHOD_UNSUPPORTED`로 실패할 수 있습니다.

자세한 에러 대응은 `docs/troubleshooting.md`를 참고하세요.
