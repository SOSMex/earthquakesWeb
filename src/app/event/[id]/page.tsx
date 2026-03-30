import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEarthquakeEvent, EarthquakeEventResponse } from '@/services';
import { EarthquakeStoryCard } from './EarthquakeStoryCard';

type Props = {
  params: Promise<{ id: string }>;
};

const INTENSITY_ORDER = ['Extremo', 'MuyViolento', 'Violento', 'Fuerte', 'Moderado'];

/**
 * Hero stat: best available anticipation metric.
 * 1. City with highest intensity that has ETA > 0
 * 2. Any city with smallest ETA > 0
 * 3. latencySeconds from event detection
 * 4. null (no hero stat)
 */
function getHeroEta(event: Pick<EarthquakeEventResponse, 'etas' | 'latencySeconds'>): number | null {
  const etaValues = Object.values(event.etas);

  // Find city with highest intensity that has ETA > 0
  const byIntensity = INTENSITY_ORDER.reduce<number | null>((found, target) => {
    if (found !== null) return found;
    const match = etaValues.find((c) => c.intensity === target && c.eta && c.eta > 0);
    return match?.eta ?? null;
  }, null);
  if (byIntensity !== null) return byIntensity;

  // Fallback: smallest ETA > 0
  const allEtas = etaValues
    .filter((c) => c.eta && c.eta > 0)
    .map((c) => c.eta!);
  if (allEtas.length > 0) return Math.min(...allEtas);

  // Last resort: latency from event detection
  if (event.latencySeconds && event.latencySeconds > 0) {
    return Math.round(event.latencySeconds);
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEarthquakeEvent(id);
  if (!event) return { title: 'Sismo no encontrado' };

  const heroEta = getHeroEta(event);
  const title = heroEta
    ? `${heroEta}s de anticipacion — Sismo ${event.intensity} en ${event.location}`
    : `Sismo ${event.intensity} en ${event.location}`;
  const description = heroEta
    ? `Sismos MX envio la alerta ${heroEta} segundos antes. Descarga la app.`
    : `Sismo ${event.intensity} en ${event.location}. Descarga Sismos MX.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sismosmx.app';
  const ogImageUrl = `${siteUrl}/api/og/event/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Sismos MX',
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = await getEarthquakeEvent(id);
  if (!event) notFound();

  return <EarthquakeStoryCard event={event} heroEta={getHeroEta(event)} />;
}
