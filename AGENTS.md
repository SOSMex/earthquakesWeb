# AGENTS.md

Read [CLAUDE.md](CLAUDE.md) first for repo architecture, build commands,
deployment topology, and conventions.

## Spec Kit / SDD

Spec Kit is initialized for Codex in this repo. Use `$speckit-*` skills for
new marketing-site features, SEO changes, public map changes, app/deep-link
changes, or work with meaningful ambiguity before editing implementation code.

- Single-repo specs live in `.specify/specs/`.
- Cross-repo features must link to the workspace-level spec and define this
  repo's web, SEO, AASA, `assetlinks.json`, public URL, rollout, rollback, and
  verification slice.
- ADRs/RFCs remain required context. Plans must list relevant docs under
  `docs/` before proposing new behavior.
- Plans must name validation such as `npm run lint`, `npm run build`, link
  checks, and manual web/deep-link checks depending on the touched surface.

## Cross-Repo Reminders

- Preserve app-store/mobile deep-link compatibility when changing public URLs.
- Do not duplicate API contracts that belong in `EarthquakesNetCoreApi` or
  alert delivery contracts that belong in `MonitorAlertsApi`.
- Keep public copy and metadata aligned with Sismos MX trust and emergency-use
  expectations.
