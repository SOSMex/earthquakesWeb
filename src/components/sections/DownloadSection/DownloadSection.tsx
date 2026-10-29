import Image from 'next/image';
import { StoreBadges } from '@/components/widgets/store-badges/StoreBadges';

export function DownloadSection({ showDailyAverage = true }: { showDailyAverage?: boolean }) {
  const message = showDailyAverage
    ? '¿Sabías que en México ocurren, en promedio, 4 sismos al día? Entérate en segundos de cada sismo cerca de ti. A partir de ahora, ¡estarás siempre informado!'
    : 'Entérate en segundos de cada sismo cerca de ti. A partir de ahora, ¡estarás siempre informado!';

  return (
    <div className="mx-auto w-full overflow-hidden bg-brand px-4 py-6 md:px-52 md:py-12 lg:px-0">
      <section id="download" className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-24 lg:flex-row">
        <div className="flex flex-col justify-center gap-4 max-lg:text-center md:gap-10 lg:w-1/2 lg:items-start">
          <h2 className="text-2xl font-semibold text-white md:text-4xl">¡Descarga la App!</h2>
          <p className="text-white">
            {message}
          </p>
          <StoreBadges placement="download_section" className="justify-center lg:justify-start" />
        </div>
        <Image
          width={450}
          height={430}
          src="/app-ss.svg"
          alt="Earthquake detail on the app"
          className="hidden h-auto w-full min-w-0 object-contain lg:block lg:w-1/2"
        />
      </section>
    </div>
  );
}
