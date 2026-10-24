import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fitDescription, fitTitle, getCanonicalSiteUrl } from '@/lib/seo';
import { getEarthquakeEventResult } from '@/services';
import { FamilyLookupFailure } from '@/components/family/FamilyLookupFailure';
import { EarthquakeStoryCard } from './EarthquakeStoryCard';

export const dynamic = 'force-dynamic';
type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getEarthquakeEventResult(params.id);
  if (result.status !== 'found') {
    return {
      title: result.status === 'error' ? 'Consulta de evento no disponible' : 'Evento no disponible',
      robots: { index: false, follow: false },
    };
  }
  const { event } = result;
  const drill = event.eventType === 'drill' || event.eventType === 'drill_staging';
  const title = fitTitle(`${drill ? 'Simulacro' : 'Sismo'} en ${event.location}`);
  const description = fitDescription(
    'Consulta la información disponible del evento en Sismos MX. Este enlace no publica estados personales.',
  );
  const site = getCanonicalSiteUrl();
  const image = `${site}/api/og/event/${encodeURIComponent(params.id)}?v=family1`;
  return {
    title,
    description,
    alternates: { canonical: `/event/${encodeURIComponent(params.id)}` },
    openGraph: {
      title: `${title} | Sismos MX`,
      description,
      type: 'article',
      siteName: 'Sismos MX',
      url: `${site}/event/${encodeURIComponent(params.id)}`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function EventPage({ params }: Props) {
  const result = await getEarthquakeEventResult(params.id);
  if (result.status === 'notFound') notFound();
  if (result.status === 'error') return <FamilyLookupFailure />;
  return <EarthquakeStoryCard event={result.event} />;
}
