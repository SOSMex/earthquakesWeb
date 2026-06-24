# Sismos MX Repo Spec Kit Constitution

## Core Principles

### I. Own The Behavior Locally

This repo owns only the behavior defined in its `CLAUDE.md`, `AGENTS.md`, and
workspace routing rules. Specs MUST state why this repo is the owner or why it
is only a producer/consumer in a cross-repo change. Do not duplicate behavior
from another repo unless an existing boundary requires it.

### II. Preserve Contracts Explicitly

Any change that affects another repo MUST define the contract before
implementation. Producer and consumer behavior, payload examples, endpoint
shape, deep links, auth, idempotency, cache behavior, and backward
compatibility MUST be documented in the spec/plan/contracts folder.

### III. Respect ADR/RFC Memory

Spec Kit governs current work; ADRs and RFCs preserve durable technical memory.
Plans MUST list relevant existing ADRs, RFCs, and runbooks before proposing
implementation. Create or update an ADR for durable decisions. Create or
update an RFC for broad, risky, or cross-repo implementation proposals.

### IV. Verify With The Smallest Meaningful Loop

Every spec MUST include independently testable stories. Every plan MUST name
the validation commands for this repo. Every task list MUST include validation
and skipped-check reporting. Contract, alert, push, API, deploy, and
user-visible mobile/web changes require more than formatting checks.

### V. Ship Safely

Risky behavior needs rollout and rollback before implementation. Prefer
backward-compatible server changes before client dependence. Use feature flags,
dry-run, or shadow modes when a change can create notification noise, stale
state, data drift, or irreversible user impact.

### VI. Keep Public Observability Neutral

Public health endpoints, metrics, labels, and dashboards MUST use neutral names
and bounded cardinality. Do not expose third-party provider names in public
surfaces. Do not use event IDs, correlation IDs, user IDs, or other
high-cardinality values as metric labels.

## Repo Workflow

Single-repo features live in:

```text
.specify/specs/NNN-feature-name/
├── spec.md
├── plan.md
├── tasks.md
└── contracts/
```

Cross-repo features MUST link to the workspace-level spec and include only the
tasks/contracts owned by this repo.

Recommended production workflow:

```text
$speckit-specify
$speckit-clarify
$speckit-checklist
$speckit-plan
$speckit-tasks
$speckit-analyze
$speckit-implement
```

## Governance

This constitution supplements the repo's `CLAUDE.md`, `AGENTS.md`, and
workspace `CLAUDE.md`. When there is conflict, safety-critical runtime
invariants and explicit ADR/RFC decisions take precedence over generic
template guidance. Amendments require updating this file and noting the reason
in the implementing spec or PR.

**Version**: 1.0.0 | **Ratified**: 2026-06-24 | **Last Amended**: 2026-06-24
