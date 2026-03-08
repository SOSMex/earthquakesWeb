import { EarthquakeProps } from '@/components/widgets';

function getMagnitudeColor(magnitude: number): string {
  if (magnitude >= 6.0) return 'bg-red-600';
  if (magnitude >= 5.0) return 'bg-orange-500';
  if (magnitude >= 4.0) return 'bg-amber-500';
  return 'bg-green-500';
}

interface EarthquakeHeroSectionProps {
  earthquake: EarthquakeProps;
}

export function EarthquakeHeroSection({ earthquake }: EarthquakeHeroSectionProps) {
  const location = earthquake.town
    ? `${earthquake.town}, ${earthquake.state}`
    : earthquake.state || 'México';

  return (
    <section className="bg-brand py-6 text-white md:py-10">
      <div className="container mx-auto flex items-center justify-center gap-4 px-4">
        <div
          className={`flex size-16 shrink-0 items-center justify-center rounded-full md:size-20 ${getMagnitudeColor(earthquake.magnitude)}`}
        >
          <span className="text-2xl font-extrabold md:text-3xl">
            {earthquake.magnitude.toFixed(1)}
          </span>
        </div>
        <div>
          <h1 className="text-xl font-bold md:text-3xl">
            Sismo en
            {' '}
            {location.trim()}
          </h1>
          <p className="text-sm text-white/70 md:text-base">
            {earthquake.date}
            {' '}
            •
            {' '}
            {earthquake.time}
          </p>
        </div>
      </div>
    </section>
  );
}
