import { NavBar } from '@/features';
import { SmartAppBanner } from '@/components/widgets';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmartAppBanner />
      <NavBar />
      {children}
    </>
  );
}
