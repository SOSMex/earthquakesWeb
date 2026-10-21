import { Metadata } from 'next';
import { fitDescription, pageMetadata } from '@/lib/seo';
import { ReferralLanding } from './ReferralLanding';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return pageMetadata({
    title: 'Gana Premium gratis',
    description: fitDescription(
      'Un amigo te invita a Sismos MX. Descarga la app y ambos se acercan a ganar 1 mes de Premium gratis.',
    ),
    path: `/invite/${code}`,
  });
}

export default async function InvitePage({ params }: Props) {
  const { code } = await params;

  return <ReferralLanding code={code} />;
}
