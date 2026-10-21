import Image from 'next/image';
import { appStoreUrl, playStoreUrl } from '@/config/stores';
import { cn } from '@/utils';

const playHref = playStoreUrl(process.env.NEXT_PUBLIC_ANDROID_APP_URL);
const appStoreHref = appStoreUrl(process.env.NEXT_PUBLIC_IOS_APP_URL);

export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-3', className)}>
      <a href={playHref} target="_blank" rel="noopener noreferrer">
        <Image
          src="/badges/google-play.png"
          alt="Disponible en Google Play"
          width={135}
          height={52}
          className="h-10 w-auto"
        />
      </a>
      <a href={appStoreHref} target="_blank" rel="noopener noreferrer">
        <Image
          src="/badges/app-store-es-mx.svg"
          alt="Consíguelo en el App Store"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </a>
    </div>
  );
}
