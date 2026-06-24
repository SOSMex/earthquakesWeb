# Verification: [FEATURE]

**Spec**: [link to spec.md]
**Status**: Draft
**Last updated**: [DATE]

## Automated Checks

| Repo | Command | Result | Notes |
|------|---------|--------|-------|
| `MonitorAlertsApi` | `dotnet test` or targeted test | [pending] | [notes] |
| `seismic-detector` | `./gradlew test` | [pending] | [notes] |
| `EarthquakesNetCoreApi` | `dotnet test --configuration Release` | [pending] | [notes] |
| `earthquakes_flutter` | `flutter analyze && flutter test` | [pending] | [notes] |
| `earthquakesWeb` | `npm run lint && npm run build` | [pending] | [notes] |

## Contract / E2E Checks

- [ ] Producer emits expected contract
- [ ] Consumer accepts old and new contract
- [ ] User-visible flow works from trigger to final screen/state
- [ ] Rollback path verified or explicitly skipped with reason

## Skipped Checks

| Check | Reason | Residual risk |
|-------|--------|---------------|
| [check] | [reason] | [risk] |
