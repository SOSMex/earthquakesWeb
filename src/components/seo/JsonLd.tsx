import { EarthquakeProps } from '@/components/widgets';

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
      'https://apps.apple.com/app/sismos-mexico/id1234567890',
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
}

export function EarthquakeEventJsonLd({ earthquake, url }: EarthquakeEventJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Sismo de magnitud ${earthquake.magnitude} en ${earthquake.state || 'México'}`,
    description: earthquake.details || `Sismo registrado con magnitud ${earthquake.magnitude}`,
    startDate: earthquake.date,
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
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Magnitud',
        value: earthquake.magnitude,
      },
    ],
    image: `${siteUrl}/logo.svg`,
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
