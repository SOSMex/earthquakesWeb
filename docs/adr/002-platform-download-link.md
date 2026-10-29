# ADR-002: Platform-aware download route

Date: 2026-10-28. Status: proposed in draft PR for issue #533.

## Context
Ads currently target Google Play even on iOS. /calificar is a distinct review flow with an iOS write-review deep link and must retain its behavior.

## Decision
Add /descargar with the existing detector extracted unchanged to store-platform.ts and compatibility aliases for review callers. Use client-side replace for iPad desktop-mode detection, plus server-rendered store buttons with campaign URLs. Fixed destinations use config/stores.ts; queries cannot supply a redirect target. Metadata excludes indexing. No app-association, mobile or ad configuration changes.

Forward four allowlisted UTM values through Google's referrer and preserve them on the App Store URL. Apple's campaign tuple uses a configured public APP_STORE_PROVIDER_TOKEN, ct from a supported utm_campaign, and mt=8. Missing/invalid configuration or unsupported campaign names omit the tuple without blocking downloads or inventing attribution. This is App Store Connect measurement, not automatic Firebase iOS attribution.

## Consequences and rollout
No new dependency, tracking SDK, cookie, database or hosting service. JavaScript-disabled users retain campaign-aware buttons. A redirect test proves URL routing only; native store opening and actual install attribution need separate validation. Deliver a draft PR, verify production after release, then obtain Oscar's OK before replacing either ad URL. Revert this route if needed without changing /calificar.

References: [ADR-001](001-store-review-link.md), [Spec003](../../.specify/specs/003-platform-download-link/spec.md), [Apple campaign links](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links), [Google attribution](https://support.google.com/analytics/answer/10311900?hl=en).
