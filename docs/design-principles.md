# Design Principles

`rn-devtools-mcp` follows these principles.

## 1. CDP-first over UI-driving

The server talks directly to Metro inspector and CDP WebSocket endpoints.

- Discovery via `/json/list` and `/json/version`
- Command execution via CDP request/response
- Event intake via CDP notifications

This avoids fragile DevTools UI automation and keeps behavior deterministic.

## 2. Capability-aware behavior

RN/Hermes CDP support differs by runtime/version/target.

- Commands are allowed to fail with explicit `RN_CDP_*` errors.
- Target capabilities are surfaced in `rn_session_status` for runtime decisions.
- Tooling favors graceful degradation instead of hard assumptions.

## 3. Best-effort defaults

On connect, the server tries to enable commonly useful domains:

- `Runtime.enable`
- `Debugger.enable`
- `Network.enable`

Failures in one domain do not block the whole session.

## 4. Evidence-first debugging

Runtime problems should be diagnosable with concrete artifacts.

- Ring buffers store recent console/network/debugger/exception events.
- Retrieval tools return structured evidence instead of lossy text summaries.
- Exception events are mirrored into console feed to reduce blind spots.

## 5. Stable session semantics

A `sessionKey` is the primary handle for all command tools.

- Sessions track connection state and buffered evidence.
- Reconnect uses target fingerprint matching to survive reload target churn.
- Session close path cleans pending requests deterministically.

## 6. Explicit native-boundary scope

This server focuses on JS/Hermes + CDP workflows.

Out of scope:

- LLDB/Android Studio native breakpoints
- Native symbol-level debugging orchestration

Native-level debugging should be handled by platform-native debugger tooling.

## 7. Conservative extensibility

When adding methods/tools:

- Prefer generic `rn_cdp_call` first.
- Promote frequently used stable commands to explicit aliases.
- Add tests and docs together to avoid drift.
