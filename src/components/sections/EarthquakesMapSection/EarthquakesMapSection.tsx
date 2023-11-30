import { EarthquakesMap } from '@/features/earthquakes-map/EarthquakesMap';

function EarthquakesMapSection() {
  return (
    <section className="container mx-auto my-8 mt-8 text-center text-5xl font-semibold ">
      <hr className="mx-auto h-px max-w-7xl bg-black" />
      <h2 className="my-8 mb-8">Últimos sismos</h2>
      <EarthquakesMap />
    </section>
  );
}

export default EarthquakesMapSection;
