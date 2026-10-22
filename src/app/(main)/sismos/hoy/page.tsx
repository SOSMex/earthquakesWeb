import { Metadata } from 'next';
import {
  DownloadSection,
  EarthquakesSection,
  SeeMoreSection,
} from '@/components/sections';
import { BreadcrumbJsonLd, EarthquakesListJsonLd } from '@/components/seo';
import { loadRecentEarthquakes } from '@/lib/earthquake-page';
import { notifyIndexNow, quakeIndexPaths } from '@/lib/indexnow';
import { getCanonicalSiteUrl, pageMetadata } from '@/lib/seo';
import {
  formatDateInMexicoCity,
  mexicoCityDateKey,
} from '@/utils/dateTime.utility';

export const revalidate = 60;

const title = 'Sismo hoy en México: últimos temblores';
const description = 'Temblor hoy en México: magnitud, epicentro y hora de los sismos registrados. Fuente: Servicio Sismológico Nacional.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/sismos/hoy',
  ogType: 'article',
});

function todayLabel(): string {
  return formatDateInMexicoCity(new Date(), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function shortDayLabel(isoDate: string): string {
  const day = formatDateInMexicoCity(isoDate, { day: 'numeric' });
  const month = formatDateInMexicoCity(isoDate, { month: 'short' }).replace('.', '');
  return `${day} de ${month}`;
}

function HoyHeroSection({
  dateLabel,
  emptyMessage,
}: {
  dateLabel: string;
  emptyMessage?: string;
}) {
  return (
    <section className="container mx-auto my-4 px-4 text-center">
      <h1 className="text-4xl font-semibold text-brand md:text-5xl">Sismo hoy en México</h1>
      <h2 className="mt-2 text-2xl font-medium text-foreground">Temblor hoy en México</h2>
      <p className="mt-2 text-xl font-medium text-primary">{dateLabel}</p>
      {emptyMessage ? (
        <p className="mt-4 text-lg font-medium">{emptyMessage}</p>
      ) : (
        <p className="mt-4 text-lg font-normal">
          Sismos registrados hoy en México. Datos del Servicio Sismológico Nacional.
        </p>
      )}
    </section>
  );
}

export default async function SismosHoyPage() {
  const earthquakes = await loadRecentEarthquakes(50);
  const todayKey = mexicoCityDateKey();
  const todays = earthquakes.filter((earthquake) => (
    earthquake.isoDate && mexicoCityDateKey(earthquake.isoDate) === todayKey
  ));
  const visible = todays.length > 0 ? todays : earthquakes;
  const latestOther = earthquakes.find((earthquake) => (
    earthquake.isoDate && mexicoCityDateKey(earthquake.isoDate) !== todayKey
  ));
  const emptyMessage = todays.length === 0
    ? `Sin sismos registrados hoy; últimos del ${latestOther ? shortDayLabel(latestOther.isoDate) : 'día anterior'}`
    : undefined;
  await notifyIndexNow(['/sismos/hoy', ...quakeIndexPaths(visible)]);

  const siteUrl = getCanonicalSiteUrl();
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Sismos', url: `${siteUrl}/sismos` },
    { name: 'Hoy', url: `${siteUrl}/sismos/hoy` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <EarthquakesListJsonLd path="/sismos/hoy" earthquakes={visible} />
      <main>
        <HoyHeroSection dateLabel={todayLabel()} emptyMessage={emptyMessage} />
        <EarthquakesSection earthquakes={visible} />
        <SeeMoreSection
          title="Ver todos los sismos"
          button={{
            label: 'Lista completa',
            href: '/sismos',
          }}
        />
        <DownloadSection />
      </main>
    </>
  );
}
