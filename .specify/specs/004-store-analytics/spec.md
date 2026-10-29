# Feature Specification: Store conversion analytics

**Feature Branch**: `codex/004-store-analytics`
**Created**: 2026-10-29
**Status**: Draft
**Input**: Implement SOSMex/earthquakesWeb#535 and deliver a draft PR.

## User Scenarios & Testing
### User Story 1 - Measure store conversion (P1)
As the campaign owner, distinguish visits, automatic redirects and store clicks by platform and campaign.
Independent test: visit download/review routes with campaign tags on Android/iOS and click each desktop fallback.
Acceptance: record the route, platform and destination store; record placement on clicks and the four supported campaign tags when safe and present.
### User Story 2 - Reliable navigation (P1)
As a visitor, reach the same store even when measurement is unavailable.
Independent test: make tracking throw; navigation still occurs immediately and once, preserving the review tab guard.
### User Story 3 - Private attribution (P1)
As an invited visitor, do not expose my invitation code to measurement.
Independent test: inspect page-view URLs and event props for invite/join/event routes with codes and arbitrary queries.
Acceptance: no code, full destination URL, arbitrary query parameter or fragment is sent.
### Edge Cases
Desktop/bots do not auto-redirect; iPad desktop mode follows existing detection. Missing, repeated, empty or unsafe campaign values do not break navigation. Blocked scripts lose measurement without blocking store links. JavaScript-disabled visitors retain rendered anchors.

## Requirements
- FR-001: Measure store clicks on home, download, review and referral pages, including shared navigation/banner buttons.
- FR-002: Measure automatic download/review navigation before leaving without adding a timer or awaiting measurement.
- FR-003: Preserve all destinations, tab guards and public app-link contracts.
- FR-004: Only the four requested UTM campaign fields may be included; campaign labels must never contain personal data. Omit unsafe values.
- FR-005: Preserve cookieless measurement and redact invitation/event identifiers in page views and custom events.
- FR-006: Document owner activation and independent deployed verification; update the existing Spanish privacy notice.

### Key Entities
Store event: event kind, normalized route, platform, store, optional placement and campaign tags. No persistence added.

## Sismos MX Scope
### Repo Matrix
Only earthquakesWeb owns this web instrumentation. MonitorAlertsApi, seismic-detector, EarthquakesNetCoreApi and earthquakes_flutter require no changes.
### Contract Boundaries
Web-to-store destinations, AASA, assetlinks, app schemes and API contracts remain unchanged. No push or campaign configuration changes.
### Existing ADR/RFC/Runbook Context
- docs/adr/001-store-review-link.md
- docs/adr/002-platform-download-link.md
- .specify/specs/001-post-quake-family-check-in/spec.md (private invitation/event URLs)
### Out Of Scope
Speed Insights, SDK upgrades, deployments, dashboard activation, ad edits and referral destination repairs.

## Success Criteria
- SC-001: Every specified store button produces one click event when measurement is available.
- SC-002: Both redirect routes retain their destination and attempt-count behavior with measurement failures.
- SC-003: Events contain no invitation/event identifiers or non-allowlisted query fields.
- SC-004: Owner can verify visits and custom events after enabling analytics and deployment.

## Assumptions
Current Analytics installation is reused. Live ingestion is a separate owner verification gate. Campaign tags are non-personal labels, with only letters, digits, spaces, underscores and hyphens supported, up to 100 characters; numeric-only values are omitted.
