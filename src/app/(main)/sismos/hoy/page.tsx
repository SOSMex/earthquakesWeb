import { Metadata } from 'next';
import {
  EarthquakesSection,
  SeeMoreSection,
  DownloadSection,
} from '@/components/sections';
import { BreadcrumbJsonLd, EarthquakesListJsonLd } from '@/components/seo';
import { getEarthquakesData, parseEarthquakes } from '@/services';

export const dynamic = 'force-dynamic';

function formatDateForTitle(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateForSEO(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getDefaultFormattedDate(): string {
  return new Date().toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

async function getLatestEarthquakeDate(): Promise<string | null> {
  const response = await getEarthquakesData(1);
  const latestEarthquake = response?.data?.[0];
  return latestEarthquake?.fecha || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const fechaUltimoSismo = await getLatestEarthquakeDate();

  const fechaFormateada = fechaUltimoSismo
    ? formatDateForTitle(fechaUltimoSismo)
    : getDefaultFormattedDate();

  const fechaSEO = fechaUltimoSismo
    ? formatDateForSEO(fechaUltimoSismo)
    : '';

  const title = `Sismos en México Hoy ${fechaFormateada} - Últimos Temblores`;
  const description = `Sismos registrados en México hoy ${fechaSEO}. Consulta magnitudes, ubicaciones y horarios de los temblores más recientes. Información oficial actualizada en tiempo real.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: '/sismos/hoy',
    },
  };
}

function HoyHeroSection({ fecha }: { fecha: string }) {
  return (
    <section className="container mx-auto my-4 text-center">
      <h1 className="text-4xl font-semibold text-brand md:text-5xl">
        Sismos en México Hoy
      </h1>
      <p className="mt-2 text-xl font-medium text-primary">
        {fecha}
      </p>
      <p className="mt-4 text-lg font-normal">
        Información oficial de los sismos registrados hoy en México
      </p>
    </section>
  );
}

function SismosHoyJsonLd({ fecha }: { fecha: string | null }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sismos.app';
  const isoDate = fecha ? new Date(fecha).toISOString() : new Date().toISOString();

  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sismos en México Hoy',
    description: 'Lista actualizada de los sismos registrados hoy en México',
    url: `${siteUrl}/sismos/hoy`,
    datePublished: isoDate,
    dateModified: isoDate,
    publisher: {
      '@type': 'Organization',
      name: 'Sismos México',
      url: siteUrl,
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Sismos de hoy en México',
      description: 'Listado de sismos registrados hoy',
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function SismosHoyPage() {
  const response = await getEarthquakesData();
  const earthquakes = parseEarthquakes(response?.data);

  const fechaUltimoSismo = response?.data?.[0]?.fecha;
  const fechaFormateada = fechaUltimoSismo
    ? formatDateForTitle(fechaUltimoSismo)
    : getDefaultFormattedDate();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sismos.app';
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Sismos', url: `${siteUrl}/sismos` },
    { name: 'Hoy', url: `${siteUrl}/sismos/hoy` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <EarthquakesListJsonLd />
      <SismosHoyJsonLd fecha={fechaUltimoSismo} />
      <main>
        <HoyHeroSection fecha={fechaFormateada} />
        <EarthquakesSection earthquakes={earthquakes} />
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
