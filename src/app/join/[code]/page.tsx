import { Metadata } from 'next';
import { JoinCircleLanding } from './JoinCircleLanding';

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Únete al Círculo de Seguridad - ${code}`,
    description:
      'Recibe notificaciones cuando tus seres queridos reporten que están bien después de un sismo.',
  };
}

export default async function JoinPage({ params }: Props) {
  const { code } = await params;

  return <JoinCircleLanding code={code} />;
}
