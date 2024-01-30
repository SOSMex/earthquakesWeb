import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/AppThemeProvider/AppThemeProvider';
import { NavBar } from '@/features';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    template: '%s | Sismos México App',
    default: 'Últimos sismos | Sismos, México App',
  },
  description:
    'Sismos México: Accede a información actualizada sobre los últimos sismos ocurridos en México. Con nuestra app, obtén datos en tiempo real, alertas sísmicas y análisis detallado de sismos México hoy y el último sismo México para Android e iOS.',
  keywords: [
    'Sismos México',
    'Sismos México hoy',
    'Sismos México Alerta s´sismica',
    'Servicios Sismológico Nacional',
    'app de sismos',
    'alerta sísmicas',
    'monitoreo de terremotos en México',
    'app sismos Android',
    'app sismos iOS',
    'sismos México hoy',
    'último sismo México',
  ],
  icons: {
    icon: '/icon.svg',
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
          <NavBar />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
