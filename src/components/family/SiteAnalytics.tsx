'use client';

import { Analytics } from '@vercel/analytics/react';
import { familyAnalyticsUrl } from '@/lib/family-links';

export function SiteAnalytics() {
  return (
    <Analytics beforeSend={(event) => ({ ...event, url: familyAnalyticsUrl(event.url) })} />
  );
}
