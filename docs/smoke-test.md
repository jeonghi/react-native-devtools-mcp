# Smoke Test

## 목적

MCP 서버의 기본 디버깅 경로가 동작하는지 검증합니다.

## 사전 조건

- RN 앱 실행 중 (dev)
- Metro 실행 중
- `/json/list`에서 최소 1개 target 존재

## 실행

```bash
npm run build
npm test
METRO_URL=http://localhost:8081 npm run smoke
```

## 기대 결과

- `targets=<N>` 로그 출력 (`N >= 1`)
- `connected session=<key>` 로그 출력
- `eval=` 로그에 `globalThis.__DEV__` 평가 결과 포함
- `disconnected` 로그 출력

## 실패 시

- `RN_METRO_UNREACHABLE`: Metro 상태 확인
- `RN_TARGET_NOT_FOUND`: 앱 실행/연결 확인
- `RN_WS_CONNECT_FAILED`: WS URL 또는 앱 상태 확인
