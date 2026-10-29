'use client';

import { useEffect, useRef } from 'react';
import { redirectToStore } from '@/lib/analytics';
import { downloadDestination, type DownloadLinks } from '@/lib/download-links';
import { storePlatform } from '@/lib/store-platform';

export default function DownloadRedirect({ links }: { links: DownloadLinks }) {
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    const platform = storePlatform(
      navigator.userAgent,
      navigator.platform,
      navigator.maxTouchPoints,
    );
    const destination = downloadDestination(platform, links);
    if (!destination) return;
    attempted.current = true;
    try {
      redirectToStore(destination, platform === 'ios' ? 'app_store' : 'play', (url) => window.location.replace(url));
    } catch {
      // Server-rendered store links remain available when automatic navigation is blocked.
    }
  }, [links]);

  return null;
}
