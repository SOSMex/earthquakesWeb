# Event data
store_redirect: route, platform (android/ios/desktop), store (play/app_store).
store_click: same fields plus a fixed placement label.
Both optionally include utm_source, utm_medium, utm_campaign, utm_content from the current URL, first nonempty supported value only. No cookies or local storage are introduced. Reject values exceeding 100 characters, numeric-only labels, or characters outside letters/digits/spaces/underscore/hyphen. Operators must never put personal data in campaign labels.
Private routes normalize to /invite/[code], /join/[code], /event/[id]. URL query/fragment values are removed except safe campaign labels on non-private pages; private pageviews omit queries entirely.
