# Research

Decision: move the existing detector unchanged and keep compatibility aliases. Browser-only platform selection supports iPad desktop UA through platform/touch count; UA-only server redirects cannot preserve this behavior. Both links render server-side with the same URLs passed to the redirect component.

Decision: use fixed configured store URLs, allowlist four UTM keys, first repeated value wins, omit empty values, encode exactly through URLSearchParams. Unknown fields cannot alter destinations or inject nested referrer/action. Pass original UTM values on the App Store URL for link continuity; Apple campaign reporting uses configured numeric pt, valid ct from utm_campaign, mt=8. Missing/invalid pt or invalid campaign omits Apple campaign tuple, without truncating or blocking downloads.

Sources: [Apple campaign links](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links), [Google app attribution](https://support.google.com/analytics/answer/10311900?hl=en). Apple requires account provider token, campaign token up to 30 supported characters with no edge spaces. These metrics belong to App Store Connect, not automatic Firebase iOS install attribution. Play referrer retention is a routing contract; actual attribution needs app/provider validation.

Independent read-only research confirmed shared detection, independent attempt guard, server-rendered fallback and platform/query regression matrix. No new SDK or Firebase Dynamic Links service.
