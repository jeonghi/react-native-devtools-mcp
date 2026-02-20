# Troubleshooting

## RN_METRO_UNREACHABLE

- Metro가 실행 중인지 확인
- 기본 URL: `http://localhost:8081`
- 포트가 다르면 `METRO_URL` 또는 tool input `metroUrl` 지정
- 자동 탐지 후보를 바꾸려면 `METRO_PORT_CANDIDATES=8088,18081` 지정

## RN_TARGET_NOT_FOUND

- 앱이 실제 디바이스/시뮬레이터에서 실행 중인지 확인
- 앱이 Metro에 연결되어 있는지 확인
- `/json/list` 결과가 비어 있으면 앱을 다시 실행

## RN_WS_CONNECT_FAILED

- `webSocketDebuggerUrl`이 유효한지 확인
- 앱 reload 직후면 `rn_reconnect` 재시도
- 방화벽/포트 포워딩 문제 확인

## RN_CDP_TIMEOUT

- 타겟이 일시 중단됐는지 확인 (`Debugger.pause` 상태)
- 과도한 명령 동시 전송을 줄이기
- 앱 reload 후 `rn_reconnect`

## RN_CDP_METHOD_UNSUPPORTED / RN_CDP_METHOD_NOT_FOUND

- 해당 RN/Hermes 타겟에서 도메인 미지원
- 먼저 `rn_session_status`로 capabilities 확인
- 미지원 명령은 우회(예: Network 도메인 사용 불가 시 콘솔/로그 기반 분석)

## RN_CDP_INVALID_REQUEST / RN_CDP_INVALID_PARAMS

- method 자체는 지원되지만 현재 상태 또는 params가 잘못된 경우
- 예: pause 상태가 아닌데 step command 호출, 필수 파라미터 누락
- `rn_cdp_call` 사용 시 공식 CDP 파라미터 스키마와 맞추기

## RN_CDP_COMMAND_FAILED

- method/params는 맞지만 런타임 상태 때문에 처리 실패
- 에러 메시지 끝의 `(code: <n>)` 값을 같이 확인

## RN_SESSION_NOT_FOUND

- `rn_connect` 먼저 수행했는지 확인
- 세션 키 오타 확인
- 연결이 끊겼다면 `rn_reconnect` 또는 재연결

## Runtime Error Visibility

- JS 런타임 예외는 `rn_get_recent_exceptions`로 확인
- 콘솔 흐름에서 함께 보고 싶으면 `rn_get_recent_console` 사용 (`Runtime.exceptionThrown`도 포함)
