import { GoogleAdsBanner } from '@/features';

function HomeHeroSection() {
  return (
    <section className="container mx-auto my-4 text-center text-7xl font-black">
      <div className="flex flex-col-reverse gap-8 lg:flex-col">
        <GoogleAdsBanner />
        <h1 className="text-5xl font-semibold text-brand">Sismos de México</h1>
      </div>
      <p className="mt-8 text-xl font-normal">
        A continuación te ofrecemos información oficial de los reportes de los últimos sismos
        ocurridos en el país
      </p>
    </section>
  );
}

export default HomeHeroSection;
