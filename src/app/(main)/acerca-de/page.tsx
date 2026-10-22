import { AboutAcordion, DownloadSection } from '@/components/sections';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo';
import { faqQuestions } from '@/components/sections/about-section/content';
import { getCanonicalSiteUrl, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Preguntas sobre sismos',
  description: 'Preguntas frecuentes sobre sismos, la alerta sísmica SASMEX y la app Sismos MX.',
  path: '/acerca-de',
});

export default async function FaqsPage() {
  const siteUrl = getCanonicalSiteUrl();
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Preguntas frecuentes', url: `${siteUrl}/acerca-de` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQPageJsonLd questions={faqQuestions} />
      <main>
        <AboutAcordion />
        <DownloadSection />
      </main>
    </>
  );
}
