'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { EarthquakeEventResponse } from '@/services';
import { AppDownloadButton } from '@/components/widgets';

interface Props {
  event: EarthquakeEventResponse;
  heroEta: number | null;
  mapUrl: string | null;
}

function StoryCardContent({ event, heroEta, mapUrl }: Props) {
  const searchParams = useSearchParams();
  const isFromPush = searchParams.get('ref') === 'push';

  const dateFormatted = new Date(event.dateUtc).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const shareUrl = typeof window !== 'undefined'
    ? window.location.origin + window.location.pathname
    : '';
  const shareText = heroEta
    ? `Recibi alerta sismica ${heroEta}s antes del sismo ${event.intensity} en ${event.location}`
    : `Sismo ${event.intensity} en ${event.location}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: shareText, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    }
  };

  const sortedEtas = Object.entries(event.etas)
    .filter(([, v]) => v.eta && v.eta > 0)
    .sort(([, a], [, b]) => (a.eta ?? 0) - (b.eta ?? 0))
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#1a1a2e] text-white">

      {/* Mapbox static map header */}
      {mapUrl && (
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapUrl}
            alt={`Epicentro del sismo en ${event.location}`}
            className="h-[200px] w-full object-cover md:h-[280px]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a2e]" />
        </div>
      )}

      <div className={`flex w-full flex-1 flex-col items-center justify-center px-6 ${mapUrl ? 'pb-12' : 'py-12'}`}>

        {/* Hero stat */}
        {heroEta && (
          <div className="text-center">
            <p className="text-8xl font-extrabold tracking-tight text-yellow-400 drop-shadow-[0_0_40px_rgba(250,204,21,0.3)] md:text-9xl">
              {`${heroEta}s`}
            </p>
            <p className="mt-1 text-lg font-light uppercase tracking-[0.25em] text-white/60 md:text-xl">
              {'de anticipaci\u00F3n'}
            </p>
          </div>
        )}

        {/* Earthquake info */}
        <div className={`text-center ${heroEta ? 'mt-8' : 'mt-0'}`}>
          <h1 className="text-3xl font-bold md:text-4xl">
            {`Sismo ${event.intensity} \u2014 ${event.location}`}
          </h1>
          <p className="mt-2 text-lg text-white/50">{dateFormatted}</p>
        </div>

        {/* City ETAs */}
        {sortedEtas.length > 0 && (
          <div className="mt-10 grid w-full max-w-lg grid-cols-2 gap-3 md:grid-cols-4">
            {sortedEtas.map(([city, data]) => (
              <div key={city} className="rounded-xl border border-white/5 bg-white/[0.07] p-4 text-center backdrop-blur-sm">
                <p className="text-2xl font-bold tracking-tight">{`${data.eta}s`}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">{city}</p>
              </div>
            ))}
          </div>
        )}

        {/* Narrative */}
        {heroEta && (
          <p className="mt-10 max-w-md text-center text-base leading-relaxed text-white/50">
            {`Usuarios de Sismos MX recibieron la alerta ${heroEta} segundos antes de que las ondas s\u00EDsmicas llegaran.`}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-12 flex w-full max-w-sm flex-col gap-3">
          {isFromPush ? (
            <>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-xl bg-yellow-400 py-4 text-center text-lg font-bold text-black shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(250,204,21,0.35)]"
              >
                Compartir
              </button>
              <a
                href="https://apps.apple.com/app/id6473684021?action=write-review"
                className="rounded-xl bg-white/10 py-4 text-center text-lg font-bold text-white"
              >
                {'\u00BFTe ayud\u00F3 la alerta? Calif\u00EDcanos'}
              </a>
            </>
          ) : (
            <>
              <AppDownloadButton
                href="https://sismosmx.app"
                label="Descargar Sismos MX"
                target="_blank"
                className="!rounded-xl !bg-yellow-400 !text-black py-4 text-center text-lg font-bold shadow-[0_0_20px_rgba(250,204,21,0.2)]"
              />
              <button
                type="button"
                onClick={handleShare}
                className="rounded-xl bg-white/10 py-4 text-center text-lg font-bold text-white"
              >
                Compartir
              </button>
            </>
          )}
        </div>

        {/* Branding */}
        <p className="mt-12 text-sm text-white/20">
          {'Sismos MX \u2014 sismosmx.app'}
        </p>
      </div>
    </div>
  );
}

export function EarthquakeStoryCard(props: Props) {
  return (
    <Suspense>
      <StoryCardContent {...props} />
    </Suspense>
  );
}
