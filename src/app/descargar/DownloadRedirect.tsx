'use client';

import { useEffect, useRef } from 'react';
import { downloadDestination, type DownloadLinks } from '@/lib/download-links';
import { storePlatform } from '@/lib/store-platform';

export default function DownloadRedirect({ links }: { links: DownloadLinks }) {
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    const destination = downloadDestination(storePlatform(
      navigator.userAgent,
      navigator.platform,
      navigator.maxTouchPoints,
    ), links);
    if (!destination) return;
    attempted.current = true;
    try {
      window.location.replace(destination);
    } catch {
      // Server-rendered store links remain available when automatic navigation is blocked.
    }
  }, [links]);

  return null;
}
