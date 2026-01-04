import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Únete al Círculo de Seguridad',
  description:
    'Recibe notificaciones cuando tus seres queridos reporten que están bien después de un sismo.',
  openGraph: {
    title: 'Únete a mi Círculo de Seguridad - Sismos MX',
    description:
      'Recibe notificaciones cuando tus seres queridos reporten que están bien después de un sismo.',
    type: 'website',
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
