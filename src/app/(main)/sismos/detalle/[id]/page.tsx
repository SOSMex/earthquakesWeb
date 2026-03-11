import { Metadata } from 'next';
import {
  CommunityReportsSection,
  EarthquakeHeroSection,
  EarthquakesSection,
  SeeMoreSection,
  DownloadSection,
} from '@/components/sections';
import { StickyDownloadBar } from '@/components/widgets';
import { BreadcrumbJsonLd, EarthquakeEventJsonLd } from '@/components/seo';
import { getEarthquakeDetail, getReportLocations, getReportStats, parseEarthquakes } from '@/services';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const [response, reportStats] = await Promise.all([
    getEarthquakeDetail(id),
    getReportStats(id),
  ]);
  const earthquakes = parseEarthquakes([response?.data]);
  const earthquake = earthquakes[0];

  if (!earthquake) {
    return {
      title: 'Detalle de Sismo',
      description: 'Información detallada del sismo registrado en México.',
    };
  }

  const location = earthquake.town
    ? `${earthquake.town}, ${earthquake.state}`
    : earthquake.state || 'México';

  const title = `Sismo de magnitud ${earthquake.magnitude} en ${location}`;

  const reportsSuffix = reportStats && reportStats.totalReports > 0
    ? ` ${reportStats.totalReports} personas reportaron este sismo.`
    : '';
  const description = `Sismo registrado el ${earthquake.date} a las ${earthquake.time} con magnitud ${earthquake.magnitude} en ${location}.${reportsSuffix} ${earthquake.details || ''}`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sismosmx.app';
  const ogImageUrl = `${siteUrl}/api/og/earthquake/${id}`;
  const ogTitle = `Sismo M${earthquake.magnitude} en ${location}`;

  return {
    title,
    description,
    openGraph: {
      title: `${ogTitle} | Sismos México`,
      description,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Mapa del sismo de magnitud ${earthquake.magnitude} en ${location}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/sismos/detalle/${id}`,
    },
  };
}

export default async function EarthquakeDetailPage({ params }: Props) {
  const { id } = await params;
  const [response, reportStats, reportLocations] = await Promise.all([
    getEarthquakeDetail(id),
    getReportStats(id),
    getReportLocations(id),
  ]);
  const detail = parseEarthquakes([response?.data]);
  const earthquake = detail[0];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Sismos', url: `${siteUrl}/sismos` },
    { name: 'Detalle', url: `${siteUrl}/sismos/detalle/${id}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {earthquake && (
        <EarthquakeEventJsonLd
          earthquake={earthquake}
          url={`${siteUrl}/sismos/detalle/${id}`}
          reportStats={reportStats}
        />
      )}
      <main>
        {earthquake ? (
          <EarthquakeHeroSection earthquake={earthquake} />
        ) : null}
        <EarthquakesSection
          earthquakes={detail}
          mapTitle="Detalle del sismo"
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
