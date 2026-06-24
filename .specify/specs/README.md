# Workspace Specs

Use this folder only for Sismos MX features that cross repo boundaries or
change shared contracts.

Single-repo work belongs in the owning repo's `.specify/specs/` folder. A
workspace spec may point to child repo specs, but each repo still owns its own
implementation PR.

Required workspace spec addenda:

- `contracts/` for payloads, endpoints, push data, deep links, and schemas.
- `rollout.md` for deploy order, flags, rollback, and monitoring.
- `verification.md` for per-repo checks and cross-repo/E2E validation.

Start with `$speckit-specify`, then use `$speckit-plan`, `$speckit-tasks`,
`$speckit-analyze`, and `$speckit-implement` when the feature is ready.
