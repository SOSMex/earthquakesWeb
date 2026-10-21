import { Metadata } from 'next';
import {
  HomeHeroSection,
  EarthquakesSection,
  SeeMoreSection,
  TestimonialsSection,
  DownloadSection,
} from '@/components/sections';
import { WebSiteJsonLd, OrganizationJsonLd, SoftwareAppJsonLd } from '@/components/seo';
import { latestIsoTimestamp } from '@/components/widgets/ssn-source/SsnSource';
import { getEarthquakesData, parseEarthquakes } from '@/services';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sismos en México Hoy - Últimos Temblores y Alertas Sísmicas',
  description:
    'Consulta los sismos en México hoy en tiempo real. Información actualizada de los últimos temblores, magnitudes y ubicaciones. Datos oficiales del Servicio Sismológico Nacional.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const response = await getEarthquakesData();
  const eartquakes = parseEarthquakes(response?.data);
  const updatedAt = latestIsoTimestamp(eartquakes.map((earthquake) => earthquake.isoDate));

  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />
      <SoftwareAppJsonLd />
      <main>
        <HomeHeroSection updatedAt={updatedAt} />
        <EarthquakesSection earthquakes={eartquakes} showSource={false} />
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
