import { AboutAcordion } from '@/components/sections';
import { BreadcrumbJsonLd } from '@/components/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca de Sismos México - Preguntas Frecuentes',
  description:
    'Conoce más sobre Sismos México App. Preguntas frecuentes sobre la aplicación de monitoreo de sismos en tiempo real para México.',
  alternates: {
    canonical: '/acerca-de',
  },
};

export default async function FaqsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sismos.app';
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Acerca de', url: `${siteUrl}/acerca-de` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <main>
        <AboutAcordion />
      </main>
    </>
  );
}
