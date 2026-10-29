'use client';

import { Analytics } from '@vercel/analytics/react';
import { analyticsUrl } from '@/lib/analytics';

export function SiteAnalytics() {
  return (
    <Analytics beforeSend={(event) => ({ ...event, url: analyticsUrl(event.url) })} />
  );
}
