# ADR-003: Best-effort store conversion analytics
Date: 2026-10-29. Status: proposed in draft PR for #535.

Reuse the existing Vercel Analytics integration and initialize it before page effects.
A shared typed helper emits store_click/store_redirect with bounded campaign labels
and normalized private routes. Native anchors preserve no-JavaScript behavior.
Automatic redirects attempt tracking first, synchronously, without waiting for
network acknowledgement. Measurement errors never block navigation.

Preserve ADR-001/002 destinations, session guards, campaign-link generation and app
association contracts. Redact referral/invitation/event IDs in all analytics URLs,
strip arbitrary query fields and fragments, and collect no additional storage.
Campaign owners must not place personal data in labels; syntactic filtering is not
a general personal-data detector.

Dashboard activation, plan support, deployment, actual event receipt and native store
opening require separate verification. Deliver a draft PR only; rollback by reverting
instrumentation or disabling Web Analytics. No Speed Insights or SDK upgrade.
