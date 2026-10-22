import { Metadata } from 'next';
import { fitDescription, fitTitle, pageMetadata } from '@/lib/seo';
import { JoinCircleLanding } from './JoinCircleLanding';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return pageMetadata({
    title: fitTitle(`Únete al círculo ${code}`),
    description: fitDescription(
      'Recibe notificaciones cuando tus seres queridos reporten que están bien después de un sismo.',
    ),
    path: `/join/${code}`,
  });
}

export default async function JoinPage({ params }: Props) {
  const { code } = await params;

  return <JoinCircleLanding code={code} />;
}
