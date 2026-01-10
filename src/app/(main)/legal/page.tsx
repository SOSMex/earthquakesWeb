import { LegalNoticeSection } from '@/components/sections';
import { BreadcrumbJsonLd } from '@/components/seo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal y Privacidad',
  description:
    'Aviso legal y política de privacidad de Sismos México App. Información sobre el uso de datos y términos del servicio.',
  alternates: {
    canonical: '/legal',
  },
};

export default function LegalPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Legal', url: `${siteUrl}/legal` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <main>
        <LegalNoticeSection />
      </main>
    </>
  );
}
