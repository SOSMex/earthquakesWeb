'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { EarthquakeEventResponse } from '@/services';
import { formatDateTimeInMexicoCity, useStoreUrl } from '@/utils';

const IOS_REVIEW_URL = 'https://apps.apple.com/app/id6473684021?action=write-review';
const ANDROID_REVIEW_URL = 'https://play.google.com/store/apps/details?id=com.oscar.sismos_v2';

function useReviewUrl(): string {
  const [reviewUrl, setReviewUrl] = useState(IOS_REVIEW_URL);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    if (/Android/i.test(navigator.userAgent)) {
      setReviewUrl(ANDROID_REVIEW_URL);
    }
  }, []);

  return reviewUrl;
}

interface Props {
  event: EarthquakeEventResponse;
  heroEta: number | null;
  mapUrl: string | null;
}

function StoryCardContent({ event, heroEta, mapUrl }: Props) {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  // RFC-033: drill_close pushes also count as "from push" — they go through
  // the same OneSignal story-push pipeline, only the ref tag differs so we
  // can split analytics later.
  const isFromPush = ref === 'push' || ref === 'drill_close';
  const isDrill = event.eventType === 'drill' || event.eventType === 'drill_staging';
  const storeUrl = useStoreUrl();
  const reviewUrl = useReviewUrl();

  const dateFormatted = formatDateTimeInMexicoCity(event.dateUtc, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const shareUrl = typeof window !== 'undefined'
    ? window.location.origin + window.location.pathname
    : '';
  let shareText: string;
  if (isDrill) {
    shareText = 'Participé en el simulacro nacional con Sismos MX';
  } else if (heroEta) {
    shareText = `Recibi alerta sismica ${heroEta}s antes del sismo ${event.intensity} en ${event.location}`;
  } else {
    shareText = `Sismo ${event.intensity} en ${event.location}`;
  }

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
          {isDrill && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300 ring-1 ring-yellow-400/30">
              <span aria-hidden="true">{'\uD83C\uDFAF'}</span>
              Simulacro nacional
            </div>
          )}
          <h1 className="text-3xl font-bold md:text-4xl">
            {isDrill
              ? `Simulacro nacional \u2014 ${event.location}`
              : `Sismo ${event.intensity} \u2014 ${event.location}`}
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

        {/* Narrative — contextual by audience and event type */}
        <div className="mt-10 max-w-md text-center">
          {isDrill && isFromPush && (
            <>
              <p className="text-base leading-relaxed text-white/50">
                Practicaste el simulacro nacional 2026.
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                {'Comparte tu participaci\u00F3n para que m\u00E1s personas est\u00E9n preparadas en el pr\u00F3ximo sismo.'}
              </p>
            </>
          )}
          {isDrill && !isFromPush && (
            <p className="text-base leading-relaxed text-white/70">
              {'Esto fue parte del simulacro nacional 2026. Descarga Sismos MX para participar la pr\u00F3xima vez.'}
            </p>
          )}
          {!isDrill && isFromPush && (
            <>
              {heroEta && (
                <p className="text-base leading-relaxed text-white/50">
                  {`Tu alerta lleg\u00F3 ${heroEta} segundos antes que las ondas s\u00EDsmicas.`}
                </p>
              )}
              <p className="mt-3 text-base leading-relaxed text-white/70">
                {'Comparte con tu familia y amigos para que tambi\u00E9n est\u00E9n prevenidos en el pr\u00F3ximo sismo.'}
              </p>
            </>
          )}
          {!isDrill && !isFromPush && (
            <>
              {heroEta && (
                <p className="text-base leading-relaxed text-white/50">
                  {`Usuarios de Sismos MX recibieron la alerta ${heroEta} segundos antes de que las ondas s\u00EDsmicas llegaran.`}
                </p>
              )}
              <p className="mt-3 text-base leading-relaxed text-white/70">
                {'Recibe alertas s\u00EDsmicas con segundos de anticipaci\u00F3n. Prot\u00E9gete a ti y a tu familia.'}
              </p>
            </>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
          {isFromPush && (
            <>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-xl bg-yellow-400 py-4 text-center text-lg font-bold text-black shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(250,204,21,0.35)]"
              >
                {isDrill ? 'Comparte tu simulacro' : 'Invitar a familia y amigos'}
              </button>
              {/* Suppress the app-review CTA for drills — asking for a rating
                  after a simulacro doesn't fit the moment. */}
              {!isDrill && (
                <a
                  href={reviewUrl}
                  className="rounded-xl bg-white/10 py-4 text-center text-lg font-bold text-white"
                >
                  {'\u00BFTe ayud\u00F3 la alerta? Calif\u00EDcanos'}
                </a>
              )}
            </>
          )}
          {!isFromPush && (
            <>
              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-yellow-400 py-4 text-center text-lg font-bold text-black shadow-[0_0_20px_rgba(250,204,21,0.2)]"
              >
                Descargar Sismos MX
              </a>
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
