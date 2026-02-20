# Contributing

Thanks for contributing to `rn-devtools-mcp`.

## Development setup

```bash
npm install
```

Run locally:

```bash
npm run dev
```

## Validation

Run before opening a PR:

```bash
npm test
npm run build
```

Optional smoke validation against a live RN app:

```bash
METRO_URL=http://localhost:8081 npm run smoke
```

## Contribution guidelines

- Keep changes focused and small.
- Add or update tests for behavior changes.
- Update documentation when tool behavior, error semantics, or setup steps change.
- Prefer capability-aware behavior when adding new CDP integrations.

## Commit guidelines

Recommended commit style:

- `feat(scope): ...`
- `fix(scope): ...`
- `docs(scope): ...`
- `test(scope): ...`
- `chore(scope): ...`

## Pull request checklist

- [ ] `npm test` passes
- [ ] `npm run build` passes
- [ ] Docs updated (`README`, `docs/*`, `CHANGELOG`) when applicable
- [ ] No project-specific/private identifiers introduced in docs or tests
- [ ] New behavior includes tests or rationale for why tests were unnecessary

## Reporting issues

When filing issues, include:

- RN version
- Hermes enabled/disabled
- Metro URL/port setup
- Relevant MCP tool call inputs
- Full error code/message (`RN_*`)
