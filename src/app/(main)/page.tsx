import { Metadata } from 'next';
import {
  HomeHeroSection,
  EarthquakesSection,
  SeeMoreSection,
  TestimonialsSection,
  DownloadSection,
} from '@/components/sections';
import { WebSiteJsonLd, OrganizationJsonLd, SoftwareAppJsonLd, EarthquakesListJsonLd } from '@/components/seo';
import { latestIsoTimestamp } from '@/components/widgets/ssn-source/SsnSource';
import { loadRecentEarthquakes } from '@/lib/earthquake-page';
import { notifyIndexNow, quakeIndexPaths } from '@/lib/indexnow';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: 'Sismos en México hoy',
  description: 'Sismos y temblores en México hoy: magnitud, epicentro y hora. Datos del Servicio Sismológico Nacional.',
  path: '/',
});

export default async function HomePage() {
  const earthquakes = await loadRecentEarthquakes(20);
  const updatedAt = latestIsoTimestamp(earthquakes.map((earthquake) => earthquake.isoDate));
  await notifyIndexNow(quakeIndexPaths(earthquakes));

  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />
      <SoftwareAppJsonLd />
      <EarthquakesListJsonLd path="/" earthquakes={earthquakes} />
      <main>
        <HomeHeroSection updatedAt={updatedAt} />
        <EarthquakesSection earthquakes={earthquakes} showSource={false} />
        <SeeMoreSection
          title="¿Quieres enterarte de más sismos?"
          button={{
            label: 'Listado de sismos',
            href: '/sismos',
          }}
        />
        <TestimonialsSection />
        <DownloadSection />
      </main>
    </>
  );
}
