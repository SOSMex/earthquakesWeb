import { permanentRedirect } from 'next/navigation';

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EarthquakeDetailRedirect({ params }: Props) {
  const { id } = await params;
  permanentRedirect(`/sismos/${id}`);
}
