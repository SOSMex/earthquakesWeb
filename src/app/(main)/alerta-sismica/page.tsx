import Link from 'next/link';
import { DownloadSection } from '@/components/sections';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo';
import { getCanonicalSiteUrl, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Alerta sísmica en México',
  description: 'Qué es la alerta sísmica SASMEX, quién la opera y en qué se diferencia de la app Sismos MX. Sismos MX no es la alerta oficial.',
  path: '/alerta-sismica',
});

const questions = [
  {
    question: '¿Qué es la alerta sísmica en México?',
    answer: 'La alerta sísmica temprana en México la opera el Sistema de Alerta Sísmica Mexicano (SASMEX), a cargo del Centro de Instrumentación y Registro Sísmico (CIRES, A.C.). No la opera el Servicio Sismológico Nacional.',
  },
  {
    question: '¿Sismos MX es la alerta sísmica oficial?',
    answer: 'No. Sismos MX es una app privada e informativa. No sustituye a SASMEX ni a los receptores oficiales de alerta sísmica.',
  },
  {
    question: '¿Por qué a veces no suena la alerta sísmica?',
    answer: 'SASMEX no cubre todo el país y solo alerta cuando se cumplen sus criterios para un sismo fuerte. Si el epicentro está muy cerca, puede no haber tiempo útil de aviso. Los criterios y la cobertura los publica CIRES.',
  },
];

export default function AlertaSismicaPage() {
  const siteUrl = getCanonicalSiteUrl();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', url: siteUrl },
          { name: 'Alerta sísmica', url: `${siteUrl}/alerta-sismica` },
        ]}
      />
      <FAQPageJsonLd questions={questions} />
      <div className="flex min-h-dvh flex-col">
        <main className="container mx-auto w-full max-w-3xl flex-1 px-4 py-10 leading-relaxed md:max-w-5xl md:px-8 md:py-16 md:text-lg lg:text-xl">
          <h1 className="text-3xl font-semibold text-brand md:text-4xl">Alerta sísmica en México</h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Sismos MX no es la alerta sísmica oficial. La alerta temprana la opera SASMEX,
            el Sistema de Alerta Sísmica Mexicano.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Qué es SASMEX</h2>
          <p className="mt-3">
            SASMEX es la red de alerta sísmica temprana de México. La administra el
            Centro de Instrumentación y Registro Sísmico (CIRES, A.C.). Su función es
            avisar, en las ciudades donde tiene cobertura, segundos antes de que lleguen
            las ondas de un sismo que el sistema considera alertable.
          </p>
          <p className="mt-3">
            El Servicio Sismológico Nacional (UNAM) registra y publica los sismos.
            No opera ni es responsable de ninguna alerta sísmica.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Cobertura</h2>
          <p className="mt-3">
            SASMEX no cubre todo el territorio. Las ciudades y sensores activos cambian
            y los publica CIRES. Antes de asumir que una ciudad está cubierta, revisa
            el sitio oficial.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Por qué a veces no suena</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>El sismo no cumplió los criterios con los que SASMEX decide alertar.</li>
            <li>La ciudad no está en la cobertura publicada por CIRES.</li>
            <li>El epicentro está tan cerca que no hay segundos útiles de aviso.</li>
            <li>
              Un teléfono en silencio, sin datos o con notificaciones bloqueadas afecta
              a las apps. Eso es distinto del receptor oficial de SASMEX.
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">En qué se diferencia Sismos MX</h2>
          <p className="mt-3">
            Sismos MX es una aplicación privada. Muestra sismos ya registrados, con
            magnitud y epicentro, y puede enviar una notificación informativa. No es
            el sistema de alerta sísmica del Estado, no reemplaza a SASMEX y no debe
            usarse como único aviso para protegerse.
          </p>
          <p className="mt-3">
            Los sismos del día están en
            {' '}
            <Link href="/sismos/hoy" className="underline">sismo hoy</Link>
            .
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Fuentes oficiales</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <a href="http://www.cires.org.mx/sasmex_n.php" className="underline">
                SASMEX, qué es (CIRES)
              </a>
            </li>
            <li>
              <a href="http://www.cires.org.mx/" className="underline">
                Centro de Instrumentación y Registro Sísmico (CIRES)
              </a>
            </li>
            <li>
              <a href="http://www.ssn.unam.mx/info/ssn-no-opera-alerta-sismica/" className="underline">
                El SSN no opera ninguna alerta sísmica
              </a>
            </li>
            <li>
              <a href="http://www.ssn.unam.mx" className="underline">
                Servicio Sismológico Nacional (UNAM)
              </a>
            </li>
          </ul>
        </main>
        <DownloadSection showDailyAverage={false} />
      </div>
    </>
  );
}
