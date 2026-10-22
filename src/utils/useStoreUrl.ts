'use client';

import { useEffect, useState } from 'react';
import { appStoreUrl, playStoreUrl } from '@/config/stores';

function storeUrlForUserAgent(userAgent: string): string {
  if (/Android/i.test(userAgent)) {
    return playStoreUrl(process.env.NEXT_PUBLIC_ANDROID_APP_URL);
  }

  return appStoreUrl(process.env.NEXT_PUBLIC_IOS_APP_URL);
}

export function useStoreUrl(): string {
  const [storeUrl, setStoreUrl] = useState(appStoreUrl(process.env.NEXT_PUBLIC_IOS_APP_URL));

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    setStoreUrl(storeUrlForUserAgent(navigator.userAgent));
  }, []);

  return storeUrl;
}
