import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CommunityReportsSection,
  DownloadSection,
  EarthquakeHeroSection,
  EarthquakesSection,
  QuakeContext,
  SeeMoreSection,
} from '@/components/sections';
import { StickyDownloadBar } from '@/components/widgets';
import { BreadcrumbJsonLd, EarthquakeEventJsonLd } from '@/components/seo';
import { loadEarthquakeByPublicId, loadRecentEarthquakes } from '@/lib/earthquake-page';
import { notifyIndexNow } from '@/lib/indexnow';
import { pickRecentEarthquakes } from '@/lib/related-earthquakes';
import { fitDescription, getCanonicalSiteUrl, pageMetadata } from '@/lib/seo';
import { getReportLocations, getReportStats } from '@/services';

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

function placeName(town?: string, state?: string | String): string {
  const townName = town?.trim();
  const stateName = String(state || '').trim();
  if (townName && stateName) return `${townName}, ${stateName}`;
  return stateName || townName || 'México';
}

function quakeTitle(magnitude: number, place: string): string {
  const titled = `Sismo M${magnitude.toFixed(1)} en ${place}`;
  if (titled.length <= 48) return titled;
  const short = `Sismo M${magnitude.toFixed(1)} en México`;
  return short.length <= 48 ? short : 'Sismo en México';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const earthquake = await loadEarthquakeByPublicId(id);

  if (!earthquake) {
    return pageMetadata({
      title: 'Sismo en México',
      description: 'Detalle de un sismo registrado en México. Fuente: Servicio Sismológico Nacional.',
      path: `/sismos/${id}`,
    });
  }

  const place = placeName(earthquake.town, earthquake.state);
  const title = quakeTitle(earthquake.magnitude, place);
  const description = fitDescription(
    `Sismo de magnitud ${earthquake.magnitude.toFixed(1)} en ${place} el ${earthquake.date} a las ${earthquake.time}. Fuente: Servicio Sismológico Nacional.`,
  );
  const siteUrl = getCanonicalSiteUrl();

  return pageMetadata({
    title,
    description,
    path: `/sismos/${earthquake.id}`,
    ogType: 'article',
    image: `${siteUrl}/api/og/earthquake/${earthquake.id}`,
  });
}

export default async function EarthquakePage({ params }: Props) {
  const { id } = await params;
  const earthquake = await loadEarthquakeByPublicId(id);

  if (!earthquake) notFound();

  const recentPool = await loadRecentEarthquakes(40);
  const related = pickRecentEarthquakes(earthquake, recentPool, 6);
  await notifyIndexNow([`/sismos/${earthquake.id}`]);

  const [reportStats, reportLocations] = await Promise.all([
    getReportStats(earthquake.id),
    getReportLocations(earthquake.id),
  ]);
  const siteUrl = getCanonicalSiteUrl();
  const place = placeName(earthquake.town, earthquake.state);
  const pageUrl = `${siteUrl}/sismos/${earthquake.id}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', url: siteUrl },
          { name: 'Sismos', url: `${siteUrl}/sismos` },
          { name: `M${earthquake.magnitude.toFixed(1)}`, url: pageUrl },
        ]}
      />
      <EarthquakeEventJsonLd earthquake={earthquake} url={pageUrl} reportStats={reportStats} />
      <main>
        <EarthquakeHeroSection earthquake={earthquake} />
        <section className="container mx-auto max-w-3xl px-4 py-6 text-center">
          <p className="text-lg">{earthquake.details}</p>
          {earthquake.depth ? (
            <p className="mt-2 text-foreground">{`Profundidad: ${earthquake.depth}`}</p>
          ) : null}
          <p className="mt-3 text-sm">
            Fuente:
            {' '}
            <a href="http://www.ssn.unam.mx" className="underline">
              Servicio Sismológico Nacional (UNAM)
            </a>
            . Sismos MX no opera la alerta sísmica oficial.
          </p>
        </section>
        <QuakeContext earthquake={earthquake} related={related} />
        <EarthquakesSection
          earthquakes={[earthquake]}
          mapTitle={`Sismo en ${place}`}
          perceptionLocations={reportLocations?.locations}
          hideTable
        />
        {reportStats && reportStats.totalReports > 0 && (
          <CommunityReportsSection stats={reportStats} />
        )}
        <SeeMoreSection
          title="¿Quieres enterarte de más sismos?"
          button={{
            label: 'Listado de sismos',
            href: '/sismos',
          }}
        />
        <DownloadSection />
        <StickyDownloadBar />
      </main>
    </>
  );
}
