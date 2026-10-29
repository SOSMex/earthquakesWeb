# Verification — 2026-10-28

Base: develop 71a8d90. Issue #533. No production or ad changes.

## Passed
- npm run test:download: 26 tests. Android/iPhone/iPad/desktop-mode iPad/desktop/bot; encoded referrer, all four UTMs, missing/invalid provider token, Apple campaign boundaries, duplicate query values and destination-override rejection.
- npm run test:review: 11 unchanged tests. npm run test:family: 8 unchanged tests.
- npm run lint: no warnings/errors. npm run typecheck: exit 0.
- Production build: exit 0, /descargar dynamic SSR, 966 B route and 97 kB first load JS. Final build used npm run build with a temporary Node CPU preload limiting workers to two; no configuration change committed for this limit.
- Eleven Chromium browser scenarios on the built site at loopback: Android/iPhone/iPad/desktop-mode iPad hydrated redirects; existing review-session flag did not suppress downloads; desktop with JS on/off and two different campaigns retained the correct store links and did not redirect; noindex,nofollow and query-free canonical; review fallback retained action=write-review; 390px no-JS fallback had both visible links and no horizontal overflow.
- Browser store requests were intercepted; all other external hosts blocked. Apple provider token 123456 was a local test fixture only. No actual store/analytics interaction occurred.
- Visual inspection of the 390px fallback capture: branded logo, legible copy, both buttons and home link fit the viewport.
- Review page, ReviewRedirect, store constants and association files verified byte-identical to origin/develop. Documentation links and git diff --check passed.

## Limits and rollout
Build logs contain the existing missing earthquake API environment errors (Invalid URL) while prerendering unrelated pages, plus existing Node/Browserslist warnings; build succeeds. This does not validate map data. An initial temporary build launcher inherited node -e into its child workers; its owned process tree was stopped and the final standard npm build passed with a safe preload.

Chromium UA emulation is not native iOS Safari/store acceptance. Before approval to change ad links: validate preview and published /descargar on real Android/iPhone/iPad, configure the real public APP_STORE_PROVIDER_TOKEN from App Store Connect if Apple campaign reporting is wanted, then verify actual install/first_open attribution separately. Apple campaign links report in App Store Connect; forwarding these parameters does not establish Firebase iOS attribution. Draft PR only, no merge or ad updates.
