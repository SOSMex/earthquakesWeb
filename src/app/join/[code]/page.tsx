import { Metadata } from 'next';
import { validateCircleInvitation } from '@/services/family/invitation.service';
import { JoinCircleLanding } from './JoinCircleLanding';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Una invitación a tu círculo',
  description: 'Revisa tu invitación y decide si quieres unirte en Sismos MX.',
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
  openGraph: {
    title: 'Una invitación a tu círculo | Sismos MX',
    description: 'Tú decides si te unes. Revisa la invitación dentro de Sismos MX.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Una invitación a tu círculo | Sismos MX',
    description: 'Revisa tu invitación dentro de Sismos MX.',
  },
};

export default async function JoinPage({ params }: { params: { code: string } }) {
  const { code } = params;
  const validation = await validateCircleInvitation(code);
  return <JoinCircleLanding code={code} validation={validation} />;
}
