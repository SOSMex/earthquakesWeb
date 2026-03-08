'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const STICKY_DISMISSED_KEY = 'sticky-download-dismissed';

export function StickyDownloadBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STICKY_DISMISSED_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(STICKY_DISMISSED_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  const storeUrl = (process.env.NEXT_PUBLIC_IOS_APP_URL as string)
    || (process.env.NEXT_PUBLIC_ANDROID_APP_URL as string)
    || '#';

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-3 bg-brand px-4 py-3 shadow-lg md:hidden">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">Sismos México</p>
        <p className="text-xs text-white/70">Alertas de sismos en tiempo real</p>
      </div>

      <a
        href={storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-bold text-brand"
      >
        Descargar
      </a>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar"
        className="shrink-0 text-white/70"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
