import { EarthquakeProps } from '@/components/widgets';
import { ReportStats } from '@/services';

interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sismos México',
    alternateName: 'Sismos México App',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app',
    description:
      'Información en tiempo real sobre los últimos sismos ocurridos en México. Datos oficiales del Servicio Sismológico Nacional.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app'}/sismos?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={data} />;
}

export function OrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sismos México',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description:
      'Aplicación de monitoreo de sismos en México con información en tiempo real del Servicio Sismológico Nacional.',
    sameAs: [
      'https://play.google.com/store/apps/details?id=com.sosmex.sismos',
      'https://apps.apple.com/mx/app/sismos-m%C3%A9xico/id6473684021',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['Spanish'],
    },
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

interface EarthquakeEventJsonLdProps {
  earthquake: EarthquakeProps;
  url: string;
  reportStats?: ReportStats | null;
}

export function EarthquakeEventJsonLd({
  earthquake, url, reportStats,
}: EarthquakeEventJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';
  const pageId = url.split('/').pop() || '';

  const additionalProperties: Record<string, unknown>[] = [
    {
      '@type': 'PropertyValue',
      name: 'Magnitud',
      value: earthquake.magnitude,
    },
  ];

  if (reportStats && reportStats.totalReports > 0) {
    additionalProperties.push(
      {
        '@type': 'PropertyValue',
        name: 'Reportes comunitarios',
        value: reportStats.totalReports,
      },
      {
        '@type': 'PropertyValue',
        name: 'Intensidad leve',
        value: reportStats.intensityBreakdown.leve,
      },
      {
        '@type': 'PropertyValue',
        name: 'Intensidad moderada',
        value: reportStats.intensityBreakdown.moderado,
      },
      {
        '@type': 'PropertyValue',
        name: 'Intensidad fuerte',
        value: reportStats.intensityBreakdown.fuerte,
      },
    );
  }

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Sismo de magnitud ${earthquake.magnitude} en ${earthquake.state || 'México'}`,
    description: earthquake.details || `Sismo registrado con magnitud ${earthquake.magnitude}`,
    startDate: earthquake.isoDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: earthquake.town
        ? `${earthquake.town}, ${earthquake.state}`
        : earthquake.state || 'México',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: earthquake.lat,
        longitude: earthquake.lng,
      },
      address: {
        '@type': 'PostalAddress',
        addressRegion: earthquake.state,
        addressCountry: 'MX',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Servicio Sismológico Nacional',
      url: 'https://www.ssn.unam.mx/',
    },
    url,
    isAccessibleForFree: true,
    additionalProperty: additionalProperties,
    image: `${siteUrl}/api/og/earthquake/${pageId}`,
  };

  return <JsonLd data={data} />;
}

const softwareAppReviews = [
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Gerardo Aboytes' },
    datePublished: '2026-02-21',
    reviewRating: { '@type': 'Rating', ratingValue: '5' },
    reviewBody: 'Me avisa oportunamente de los multiples sismos que ocurren en México. Desde 2019 que lo utilicé hasta ahora hay muchos avances en la App.',
  },
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Jessica RuBel' },
    datePublished: '2026-01-10',
    reviewRating: { '@type': 'Rating', ratingValue: '5' },
    reviewBody: 'En el último sismo la alerta sonó en tiempo, incluso antes que otras alertas, el tono de la alerta ayuda mucho, ya que es clara.',
  },
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Un usuario de Google' },
    datePublished: '2020-02-12',
    reviewRating: { '@type': 'Rating', ratingValue: '5' },
    reviewBody: 'Desde que la descargué en 2017 me ha avisado de los sismos. CDMX con internet de alta velocidad me llega las notificaciones antes que suene la alarma, ya me salvó 2 veces.',
  },
  {
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Diana García Ibarra' },
    datePublished: '2022-03-03',
    reviewRating: { '@type': 'Rating', ratingValue: '5' },
    reviewBody: 'Es una aplicación muy completa. Avisa al momento y permite mandar mensaje a los familiares de SOS. No contiene anuncios molestos y te mantiene informado.',
  },
];

const softwareAppRating = {
  '@type': 'AggregateRating',
  ratingValue: '4.6',
  ratingCount: '860',
  bestRating: '5',
  worstRating: '1',
};

const softwareAppOffers = {
  '@type': 'Offer',
  price: '0',
  priceCurrency: 'MXN',
};

export function SoftwareAppJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';

  const androidData = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Sismos MX',
    operatingSystem: 'Android',
    applicationCategory: 'UtilitiesApplication',
    url: siteUrl,
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.sosmex.sismos',
    offers: softwareAppOffers,
    aggregateRating: softwareAppRating,
    review: softwareAppReviews,
  };

  const iosData = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Sismos México',
    operatingSystem: 'iOS',
    applicationCategory: 'UtilitiesApplication',
    url: siteUrl,
    downloadUrl: 'https://apps.apple.com/mx/app/sismos-m%C3%A9xico/id6473684021',
    offers: softwareAppOffers,
    aggregateRating: softwareAppRating,
    review: softwareAppReviews,
  };

  return (
    <>
      <JsonLd data={androidData} />
      <JsonLd data={iosData} />
    </>
  );
}

interface FAQItem { question: string; answer: string }

export function FAQPageJsonLd({ questions }: { questions: FAQItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

export function EarthquakesListJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Últimos Sismos en México Hoy',
    description:
      'Lista actualizada de los últimos sismos y temblores registrados en México. Información oficial del Servicio Sismológico Nacional.',
    url: `${siteUrl}/sismos`,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Sismos recientes en México',
      description: 'Listado de sismos ordenados por fecha',
      numberOfItems: 10,
    },
    provider: {
      '@type': 'Organization',
      name: 'Sismos México',
      url: siteUrl,
    },
  };

  return <JsonLd data={data} />;
}
