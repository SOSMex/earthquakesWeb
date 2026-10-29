# Platform-aware download entrypoint

Issue: [#533](https://github.com/SOSMex/earthquakesWeb/issues/533). Owner: earthquakesWeb. Date: 2026-10-28. Delivery: draft PR to develop; no ad edits, merge or production activation in this task.

## Independently testable stories
1. Android ad visitors open the official Play listing with MX locale and allowlisted UTM data inside referrer.
2. iPhone/iPad visitors open the App Store download page, never the write-review action. iPad desktop mode remains detectable in the browser.
3. Desktop/unknown/crawler visitors remain on a branded page with both working, campaign-aware store links. Links work without JavaScript.

## Requirements
- Extract and reuse the existing platform detector without changing its behavior or the /calificar destinations, attempt policy, metadata or links.
- Fixed store destinations from config/stores.ts; queries cannot override hosts, package IDs or store actions.
- Preserve nonempty utm_source, utm_medium, utm_campaign and utm_content. Play receives an encoded referrer query; App Store keeps those parameters and maps a valid campaign to ct with configured account pt and mt=8. No invented pt or silent campaign truncation. No iOS Firebase attribution claim.
- Client location.replace once per mount, with fallback buttons if navigation fails; no cacheable UA redirect. Server-render campaign links from searchParams so desktop and JS-disabled visitors retain tracking.
- Noindex/nofollow, canonical /descargar, no sitemap addition. AASA/assetlinks and mobile apps unchanged.
- Code/docs English; public copy Spanish to match Sismos MX.
- Contract tests cover platforms, URL encoding, with/without UTMs, input boundaries, review regression; lint/typecheck/build pass. Provider attribution and actual installed-store opening remain separate rollout checks.
