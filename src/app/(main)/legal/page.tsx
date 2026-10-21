import { LegalNoticeSection } from '@/components/sections';
import { BreadcrumbJsonLd } from '@/components/seo';
import { getCanonicalSiteUrl, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Aviso legal',
  description: 'Aviso legal y privacidad de Sismos MX. Uso de datos y términos del servicio.',
  path: '/legal',
});

export default function LegalPage() {
  const siteUrl = getCanonicalSiteUrl();
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
