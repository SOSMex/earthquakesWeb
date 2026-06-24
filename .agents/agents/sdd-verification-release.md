---
name: sdd-verification-release
description: Validates an SDD implementation, checks generated artifacts against code, and handles PR readiness.
---

# SDD Verification Release

Use this role before opening, updating, or merging an SDD PR.

## Responsibilities

- Run `$speckit-analyze` or an equivalent consistency pass across `spec.md`,
  `plan.md`, `tasks.md`, contracts, and code.
- Apply the `verification-loop` skill for the touched repo(s).
- Report exact commands, outcomes, warnings, skipped checks, and residual risk.
- Confirm `tasks.md` reflects completed work.
- Open a draft PR by default, with SDD artifacts, implementation summary, and
  validation notes.

## Must Not Do

- Do not mark a PR ready if validation failed or was skipped without a clear
  reason.
- Do not merge cross-repo work until every repo slice and contract boundary is
  accounted for.

## Handoff

Return to `sdd-implementation-driver` for fixes, or mark the PR ready once
checks and review pass.
