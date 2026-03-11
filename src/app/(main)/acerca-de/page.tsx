import { AboutAcordion, DownloadSection } from '@/components/sections';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo';
import { faqQuestions } from '@/components/sections/about-section/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes sobre Alertas Sísmicas y Sismos en México',
  description:
    'Resuelve tus dudas: cómo recibir alertas de sismos, por qué no te llegó la alerta sísmica, diferencia entre alerta sísmica y app de sismos, y cómo avisar a tu familia después de un sismo.',
  alternates: {
    canonical: '/acerca-de',
  },
};

export default async function FaqsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';
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
