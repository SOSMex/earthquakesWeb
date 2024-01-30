import { AboutAcordion } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca de',
};

export default async function faqsPage() {
  return (
    <main>
      <AboutAcordion />
    </main>
  );
}
