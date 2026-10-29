# Research
Decision: reuse the installed SDK, initialize SiteAnalytics before children, use synchronous best-effort events before navigation.
Rationale: SDK 1.2.2 track only invokes an existing window.va; initialization must precede redirect effects. Awaiting or timing analytics would change redirect behavior.
Alternatives rejected: a second SDK, raw private beacon endpoint, duplicated tracking handlers, or awaited delivery. No delivery guarantee when scripts are blocked or navigation wins the race.
Decision: reuse native anchors through StoreLink and extend existing family URL privacy to referral routes. Preserve the existing referral destination issue for separate remediation.
Sources: installed node_modules/@vercel/analytics/dist/index.mjs; https://vercel.com/docs/analytics/custom-events; https://vercel.com/docs/analytics/redacting-sensitive-data.
