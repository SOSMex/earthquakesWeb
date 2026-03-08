'use client';

import { useEffect, useState } from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.oscar.sismos_v2';
const APP_STORE_URL = 'https://apps.apple.com/app/sismos-mx/id1234567890';

export function useStoreUrl(): string {
  const [storeUrl, setStoreUrl] = useState(
    (process.env.NEXT_PUBLIC_IOS_APP_URL as string)
      || (process.env.NEXT_PUBLIC_ANDROID_APP_URL as string)
      || APP_STORE_URL,
  );

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) {
      setStoreUrl(
        (process.env.NEXT_PUBLIC_ANDROID_APP_URL as string) || PLAY_STORE_URL,
      );
    } else if (isIOS) {
      setStoreUrl(
        (process.env.NEXT_PUBLIC_IOS_APP_URL as string) || APP_STORE_URL,
      );
    }
  }, []);

  return storeUrl;
}
