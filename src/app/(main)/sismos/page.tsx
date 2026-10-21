import {
  DownloadSection,
  EarthquakesSection,
  HomeHeroSection,
} from '@/components/sections';
import { QueryClientWrapper } from '@/components/providers';
import { BreadcrumbJsonLd, EarthquakesListJsonLd } from '@/components/seo';
import { loadRecentEarthquakes } from '@/lib/earthquake-page';
import { getCanonicalSiteUrl, pageMetadata } from '@/lib/seo';

export const revalidate = 60;

export const metadata = pageMetadata({
  title: 'Últimos sismos en México',
  description: 'Últimos sismos en México con magnitud, epicentro y hora. Datos del Servicio Sismológico Nacional.',
  path: '/sismos',
});

export default async function EarthquakesPage() {
  const earthquakes = await loadRecentEarthquakes(25);
  const siteUrl = getCanonicalSiteUrl();
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Sismos', url: `${siteUrl}/sismos` },
  ];

  return (
    <QueryClientWrapper>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <EarthquakesListJsonLd earthquakes={earthquakes} />
      <main>
        <HomeHeroSection />
        <EarthquakesSection paginated earthquakes={earthquakes} />
        <DownloadSection />
      </main>
    </QueryClientWrapper>
  );
}
