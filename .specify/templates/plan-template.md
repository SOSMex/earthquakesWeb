# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]

**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]

**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]

**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]

**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

### Sismos MX Gates

- **Repo ownership**: [Owning repo identified; cross-repo repos justified]
- **Contracts first**: [Contract files/sections planned before implementation]
- **ADR/RFC context**: [Existing decisions reviewed; new ADR/RFC need stated]
- **Release safety**: [Flags, dry-run, rollout, rollback, and compatibility covered]
- **Observability safety**: [Neutral naming and bounded cardinality checked]
- **Verification loop**: [Smallest meaningful checks and E2E/cross-repo checks named]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Sismos MX Design Addenda

### Existing Decisions Reviewed

- [ADR/RFC/runbook and how it constrains this plan]

### Contracts To Create Or Update

```text
specs/[###-feature]/contracts/
├── [contract-name].md
└── [schema-or-payload-example].json
```

### Rollout / Rollback

- **Deployment order**: [docs/contract -> backend producer -> API -> clients -> cleanup]
- **Backward compatibility**: [old/new payload or endpoint behavior]
- **Feature flags / dry-run**: [flags, defaults, and shadow behavior]
- **Rollback**: [exact switch, revert order, or config fallback]

### Verification Matrix

| Surface | Command or check | Required before PR? | Notes |
|---------|------------------|---------------------|-------|
| Docs/spec | [e.g., markdown/links/diff check] | Yes | [notes] |
| `MonitorAlertsApi` | [e.g., dotnet test target] | [Yes/No/N/A] | [notes] |
| `seismic-detector` | [e.g., ./gradlew test] | [Yes/No/N/A] | [notes] |
| `EarthquakesNetCoreApi` | [e.g., dotnet test --configuration Release] | [Yes/No/N/A] | [notes] |
| `earthquakes_flutter` | [e.g., flutter analyze; flutter test] | [Yes/No/N/A] | [notes] |
| `earthquakesWeb` | [e.g., npm run lint; npm run build] | [Yes/No/N/A] | [notes] |
| E2E/contract | [manual or automated cross-repo scenario] | [Yes/No/N/A] | [notes] |

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
