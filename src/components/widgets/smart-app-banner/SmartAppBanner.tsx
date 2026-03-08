'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useStoreUrl } from '@/utils/useStoreUrl';

const BANNER_DISMISSED_KEY = 'smart-app-banner-dismissed';

export function SmartAppBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith('/sismos/detalle/');
  const storeUrl = useStoreUrl();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(BANNER_DISMISSED_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    setVisible(false);
  };

  if (!visible || isDetailPage) return null;

  return (
    <div className="flex items-center gap-3 bg-muted px-4 py-2 md:hidden">
      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar banner"
        className="shrink-0 text-muted-foreground"
      >
        <X className="size-4" />
      </button>

      <Image
        src="/logo.svg"
        alt="Sismos México App"
        width={40}
        height={40}
        className="shrink-0 rounded-lg"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">Sismos México</p>
        <p className="truncate text-xs text-muted-foreground">Abre la app para más funciones</p>
      </div>

      <a
        href={storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-full bg-brand px-4 py-1 text-sm font-medium text-white"
      >
        Abrir
      </a>
    </div>
  );
}
