# Data model

Download query: read-only record of string/string[]/undefined values. Only utm_source, utm_medium, utm_campaign, utm_content are forwarded; first value wins. StoreLinks: immutable playStore/appStore URLs built from constants, never caller-controlled hosts. StorePlatform: android/ios/unknown, same classifier as Spec002. Optional server APP_STORE_PROVIDER_TOKEN: numeric public account token. No persistence, cookies or session state.
