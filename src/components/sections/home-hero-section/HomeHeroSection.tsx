import { StoreBadges } from '@/components/widgets/store-badges/StoreBadges';
import { SsnSource } from '@/components/widgets/ssn-source/SsnSource';

function HomeHeroSection({ updatedAt }: { updatedAt?: string }) {
  return (
    <section className="container mx-auto my-4 px-4 text-center">
      <h1 className="text-3xl font-semibold text-brand md:text-5xl">Sismos de México</h1>
      <p className="mt-3 text-base font-medium text-foreground md:text-lg">
        Recibe la alerta en tu celular
      </p>
      <StoreBadges className="mt-4" />
      <SsnSource updatedAt={updatedAt} className="mt-4" />
    </section>
  );
}

export default HomeHeroSection;
