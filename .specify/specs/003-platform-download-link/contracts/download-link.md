# GET /descargar

Returns a noindex,nofollow Spanish fallback page with canonical /descargar. No HTTP UA redirect or custom cache. Android/iOS navigate once per mount using location.replace after hydration; unknown/bots remain. iOS target is the App Store product page, never a write-review action. Both fallback anchors use the same campaign-aware URLs as automatic navigation, including when JavaScript is disabled.

Play target: DEFAULT_PLAY_STORE_URL plus referrer containing only nonempty utm_source/utm_medium/utm_campaign/utm_content, URL-encoded by URLSearchParams. No referrer when absent. App Store target: DEFAULT_APP_STORE_URL plus the same UTM fields; if APP_STORE_PROVIDER_TOKEN is numeric and utm_campaign meets Apple's campaign-token rules, also pt/ct/mt=8. Invalid/missing campaign tuple is omitted and original UTMs retained. Provider token never comes from a query parameter. Repeated parameters use the first value; unrelated query parameters are ignored.

/calificar behavior, association files, SDKs and ads remain unchanged. A working redirect does not prove install attribution, first_open, or physical store UI acceptance. Apple campaign attribution is App Store Connect reporting, not Firebase iOS attribution.
