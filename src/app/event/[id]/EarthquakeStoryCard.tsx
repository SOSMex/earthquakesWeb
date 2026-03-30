'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { EarthquakeEventResponse } from '@/services';
import { AppDownloadButton } from '@/components/widgets';

interface Props {
  event: EarthquakeEventResponse;
  heroEta: number | null;
}

function StoryCardContent({ event, heroEta }: Props) {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1a1a2e] px-6 py-12 text-white">

      {/* Hero stat */}
      {heroEta && (
        <div className="text-center">
          <p className="text-7xl font-bold text-yellow-400 md:text-9xl">
            {`${heroEta}s`}
          </p>
          <p className="mt-2 text-xl text-white/70 md:text-2xl">
            de anticipaci&oacute;n
          </p>
        </div>
      )}

      {/* Earthquake info */}
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          {`Sismo ${event.intensity} — ${event.location}`}
        </h1>
        <p className="mt-2 text-lg text-white/50">{dateFormatted}</p>
      </div>

      {/* City ETAs */}
      {sortedEtas.length > 0 && (
        <div className="mt-10 grid w-full max-w-lg grid-cols-2 gap-4 md:grid-cols-4">
          {sortedEtas.map(([city, data]) => (
            <div key={city} className="rounded-xl bg-white/10 p-4 text-center">
              <p className="text-2xl font-bold">{`${data.eta}s`}</p>
              <p className="text-sm uppercase text-white/60">{city}</p>
            </div>
          ))}
        </div>
      )}

      {/* Narrative */}
      {heroEta && (
        <p className="mt-10 max-w-md text-center text-lg text-white/60">
          {`Usuarios de Sismos MX recibieron la alerta ${heroEta} segundos antes de que las ondas sismicas llegaran.`}
        </p>
      )}

      {/* CTAs */}
      <div className="mt-12 flex w-full max-w-sm flex-col gap-4">
        {isFromPush ? (
          <>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-xl bg-yellow-400 py-4 text-center text-lg font-bold text-black"
            >
              Compartir
            </button>
            <a
              href="https://apps.apple.com/app/id6473684021?action=write-review"
              className="rounded-xl bg-white/10 py-4 text-center text-lg font-bold text-white"
            >
              &iquest;Te ayud&oacute; la alerta? Cal&iacute;ficanos
            </a>
          </>
        ) : (
          <>
            <AppDownloadButton
              href="https://sismosmx.app"
              label="Descargar Sismos MX"
              target="_blank"
              className="!rounded-xl !bg-yellow-400 !text-black py-4 text-center text-lg font-bold"
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
      <p className="mt-12 text-sm text-white/30">
        Sismos MX &mdash; sismosmx.app
      </p>
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
