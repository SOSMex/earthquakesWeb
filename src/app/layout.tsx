import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/AppThemeProvider/AppThemeProvider';
import { SiteAnalytics } from '@/components/family/SiteAnalytics';
import { getCanonicalSiteUrl } from '@/lib/seo';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const siteUrl = getCanonicalSiteUrl();
const defaultTitle = 'Sismos en México hoy | Sismos MX';
const defaultDescription = 'Sismos y temblores en México hoy: magnitud, epicentro y hora. Datos del Servicio Sismológico Nacional.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Sismos MX',
    default: defaultTitle,
  },
  description: defaultDescription,
  keywords: [
    'sismos méxico',
    'sismos méxico hoy',
    'sismo hoy',
    'temblor méxico',
    'temblor hoy',
    'últimos sismos',
    'sismos en México',
    'alerta sísmica',
    'Servicio Sismológico Nacional',
    'magnitud sismo',
    'terremotos México',
    'app sismos',
  ],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Sismos México',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sismos MX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: '8cX3ODVvTl97NBldbcYPkyl3HYFWkf042VTZ_moQOsQ',
  },
  other: {
    'al:ios:app_store_id': '6473684021',
    'al:ios:app_name': 'Sismos México',
    'al:android:package': 'com.oscar.sismos_v2',
    'al:android:app_name': 'Sismos MX',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html id="app" lang="es">
      <body id="app-body" className={`relative ${montserrat.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteAnalytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
