import { NavBar } from '@/features';
import { SiteFooter } from '@/components/sections';
import { SmartAppBanner } from '@/components/widgets';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmartAppBanner />
      <NavBar />
      {children}
      <SiteFooter />
    </>
  );
}
