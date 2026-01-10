import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/AppThemeProvider/AppThemeProvider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sismos.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Sismos México App',
    default: 'Sismos en México Hoy - Últimos Temblores y Alertas Sísmicas',
  },
  description:
    'Información en tiempo real sobre sismos en México hoy. Consulta los últimos temblores, magnitudes y ubicaciones. Datos oficiales del Servicio Sismológico Nacional. Descarga la app para Android e iOS.',
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
    title: 'Sismos en México Hoy - Últimos Temblores y Alertas Sísmicas',
    description:
      'Información en tiempo real sobre sismos en México hoy. Consulta los últimos temblores, magnitudes y ubicaciones.',
    images: [
      {
        url: '/logo.svg',
        width: 512,
        height: 512,
        alt: 'Sismos México App Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sismos en México Hoy - Últimos Temblores',
    description:
      'Información en tiempo real sobre sismos en México. Datos oficiales del Servicio Sismológico Nacional.',
    images: ['/logo.svg'],
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html id="app" lang="es">
      <body id="app-body" className={`relative ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
