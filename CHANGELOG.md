# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.1.0] - 2026-02-21

### Added
- MCP server over `stdio` for React Native Metro inspector/CDP integration.
- Core RN tools for target discovery, session lifecycle, runtime evaluation, debugger controls, network enablement, and session status.
- Generic `rn_cdp_call` for method-level CDP passthrough.
- Alias tool families for Runtime/Debugger/Profiler/HeapProfiler/Network/IO/Tracing/Log/Page/Overlay/ReactNativeApplication methods.
- Ring-buffer backed recent event retrieval tools for console, network, and runtime exceptions.
- Metro URL auto-detection with configurable fallback ports.
- Reconnect logic for target changes after reload/disconnect.

### Notes
- CDP method support is target/version dependent.
- Native debugger automation (LLDB/Android Studio) is intentionally excluded.
