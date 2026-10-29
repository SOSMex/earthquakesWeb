# Implementation Plan: Store conversion analytics
**Branch**: codex/004-store-analytics | **Date**: 2026-10-29 | **Spec**: [spec.md](spec.md)
## Summary
Reuse installed Analytics and initialize it before redirect effects. Centralize typed store events, safe campaign extraction, URL privacy and fail-open navigation. Use a client StoreLink wrapping native anchors.
## Technical Context
TypeScript, Next.js 14.1, React 18, @vercel/analytics 1.2.2; no new dependency or storage. Node test runner with focused TypeScript compilation. No timers or awaited analytics.
## Constitution Check
Pre/post-design gates pass: earthquakesWeb owns behavior; contracts defined first; ADR-001/002 and family spec reviewed; no public URL, SEO, API, app association or destination changes. Metrics use normalized private routes and bounded campaign strings. New ADR-003 records privacy and best-effort navigation decision.
## Project Structure
src/lib/analytics.ts; src/components/widgets/store-link/StoreLink.tsx; existing SiteAnalytics, redirect and button components; tests/analytics. Spec artifacts remain in this directory.
## Validation
npm run test:analytics; npm run test:family; npm run test:review; npm run test:download; npm run lint; npm run typecheck; npm run build. Component tests verify redirect failure handling and native anchors. Deployed pageviews/custom ingestion and native store opening remain owner validation.
## Rollout and rollback
Draft PR only. Owner enables Web Analytics and confirms custom-event plan support, then deploys and verifies dashboard events. Revert instrumentation or disable Analytics to roll back; links remain functional. No mobile changes.
## Existing context
- docs/adr/001-store-review-link.md
- docs/adr/002-platform-download-link.md
- .specify/specs/001-post-quake-family-check-in/spec.md
