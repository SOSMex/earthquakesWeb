import { Metadata } from 'next';
import { ReferralLanding } from './ReferralLanding';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Gana Premium Gratis - Sismos MX`,
    description:
      'Un amigo te invita a Sismos MX. Descarga la app y ambos se acercan a ganar 1 mes de Premium gratis.',
    openGraph: {
      title: 'Gana Premium Gratis - Sismos MX',
      description:
        'Descarga Sismos MX y gana 1 mes de Premium gratis con el programa de referidos.',
      type: 'website',
      url: `https://sismosmx.app/invite/${code}`,
    },
  };
}

export default async function InvitePage({ params }: Props) {
  const { code } = await params;

  return <ReferralLanding code={code} />;
}
