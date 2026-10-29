'use client';

import { useEffect, useRef } from 'react';
import { redirectToStore } from '@/lib/analytics';
import { reviewDestination, reviewPlatform } from '@/lib/review-links';

const ATTEMPT_KEY = 'sismos-review-opened';

export default function ReviewRedirect() {
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    const platform = reviewPlatform(
      navigator.userAgent,
      navigator.platform,
      navigator.maxTouchPoints,
    );
    const destination = reviewDestination(platform);
    if (!destination) return;
    attempted.current = true;

    try {
      if (sessionStorage.getItem(ATTEMPT_KEY)) return;
      sessionStorage.setItem(ATTEMPT_KEY, '1');
    } catch {
      // Storage can be blocked in embedded/private browsers; still try once per mount.
    }

    try {
      redirectToStore(destination, platform === 'ios' ? 'app_store' : 'play', (url) => window.location.replace(url));
    } catch {
      // The server-rendered store links remain usable if automatic opening is blocked.
    }
  }, []);

  return null;
}
