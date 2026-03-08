import { EarthquakeProps, AppDownloadButton } from '@/components/widgets';

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
    <section className="bg-brand py-8 text-white md:py-12">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center">
        <div className="flex items-center gap-4">
          <div
            className={`flex size-16 items-center justify-center rounded-full md:size-20 ${getMagnitudeColor(earthquake.magnitude)}`}
          >
            <span className="text-2xl font-extrabold md:text-3xl">
              {earthquake.magnitude.toFixed(1)}
            </span>
          </div>
          <div className="text-left">
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

        <p className="max-w-lg text-sm text-white/80 md:text-base">
          Recibe alertas de sismos en tiempo real directamente en tu celular
        </p>

        <div className="flex gap-4">
          <AppDownloadButton
            href={process.env.NEXT_PUBLIC_ANDROID_APP_URL as string}
            label="Android"
            target="_blank"
            className="bg-white text-brand hover:bg-white/90"
          />
          <AppDownloadButton
            href={process.env.NEXT_PUBLIC_IOS_APP_URL as string}
            label="Apple Store"
            target="_blank"
            className="bg-white text-brand hover:bg-white/90"
          />
        </div>
      </div>
    </section>
  );
}
