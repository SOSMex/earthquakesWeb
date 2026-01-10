import { EarthquakesSection, HomeHeroSection, DownloadSection } from '@/components/sections';
import { QueryClientWrapper } from '@/components/providers';
import { BreadcrumbJsonLd, EarthquakesListJsonLd } from '@/components/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Últimos Sismos en México Hoy - Lista Completa de Temblores',
  description:
    'Lista completa de los últimos sismos en México hoy. Consulta magnitudes, ubicaciones y horarios de los temblores más recientes. Información oficial actualizada.',
  openGraph: {
    title: 'Últimos Sismos en México Hoy - Lista Completa',
    description:
      'Lista completa de los últimos sismos en México hoy. Consulta magnitudes, ubicaciones y horarios.',
  },
  alternates: {
    canonical: '/sismos',
  },
};

export default function EarthquakesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sismos.app';
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Sismos', url: `${siteUrl}/sismos` },
  ];

  return (
    <QueryClientWrapper>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <EarthquakesListJsonLd />
      <main>
        <HomeHeroSection />
        <EarthquakesSection paginated earthquakes={[]} />
        <DownloadSection />
      </main>
    </QueryClientWrapper>
  );
}
