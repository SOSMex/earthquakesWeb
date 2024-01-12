import { AppDownloadButton } from '@/components/widgets';
import Image from 'next/image';

export function DownloadSection() {
  return (
    <div className="w-full bg-brand px-28 py-12">
      <section id="download" className="mx-auto flex w-full max-w-5xl flex-col gap-24 lg:flex-row">
        <div className="flex flex-col justify-center gap-10 lg:w-1/2">
          <h2 className="text-4xl font-semibold text-white">¡Descarga la App!</h2>
          <p className="text-white">
            ¿Sabías que en México ocurren, en promedio, 4 sismos al día? ¡No te preocupes! A partir
            de ahora, ¡estarás siempre informado!
          </p>
          <div className="flex gap-7">
            <AppDownloadButton
              href={process.env.NEXT_PUBLIC_ANDROID_APP_URL as string}
              label="Android"
              target="_blank"
              className="bg-brand-soft hover:bg-brand-soft/80"
            />
            <AppDownloadButton
              href={process.env.NEXT_PUBLIC_IOS_APP_URL as string}
              label="Apple Store"
              target="_blank"
              className="bg-brand-soft hover:bg-brand-soft/80"
            />
          </div>
        </div>
        <Image
          width={1920}
          height={1080}
          src="/app-ss.svg"
          alt="Earthquake detail on the app"
          className="lg:h-auto lg:w-1/2"
        />
      </section>
    </div>
  );
}
