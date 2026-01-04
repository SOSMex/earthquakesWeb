// import { GoogleAdsBanner } from '@/features';
import { LegalNoticeSection } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal',
};

function LegalPage() {
  return (
    <main>
      {/* <GoogleAdsBanner /> */}
      <LegalNoticeSection />
    </main>
  );
}

export default LegalPage;
