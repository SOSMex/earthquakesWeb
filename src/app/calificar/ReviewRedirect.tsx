'use client';

import { useEffect, useRef } from 'react';
import { reviewDestination, reviewPlatform } from '@/lib/review-links';

const ATTEMPT_KEY = 'sismos-review-opened';

export default function ReviewRedirect() {
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    const destination = reviewDestination(reviewPlatform(
      navigator.userAgent,
      navigator.platform,
      navigator.maxTouchPoints,
    ));
    if (!destination) return;
    attempted.current = true;

    try {
      if (sessionStorage.getItem(ATTEMPT_KEY)) return;
      sessionStorage.setItem(ATTEMPT_KEY, '1');
    } catch {
      // Storage can be blocked in embedded/private browsers; still try once per mount.
    }

    try {
      window.location.replace(destination);
    } catch {
      // The server-rendered store links remain usable if automatic opening is blocked.
    }
  }, []);

  return null;
}
