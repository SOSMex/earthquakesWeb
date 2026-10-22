import Link from 'next/link';
import { EarthquakeCard, EarthquakeProps } from '@/components/widgets';
import { formatDistanceKm, nearestMexicanCities } from '@/lib/mexican-cities';

export function QuakeContext({
  earthquake,
  related,
}: {
  earthquake: EarthquakeProps;
  related: EarthquakeProps[];
}) {
  const cities = nearestMexicanCities(earthquake, 3);

  return (
    <>
      {cities.length > 0 && (
        <section className="container mx-auto max-w-3xl px-4 py-2 text-left">
          <h2 className="text-xl font-semibold">Cerca de estas ciudades</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-base">
            {cities.map((city) => (
              <li key={city.name}>
                {`${formatDistanceKm(city.distanceKm)} al ${city.direction} de ${city.name}`}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-foreground/80">
            Distancias y rumbos calculados desde las coordenadas del epicentro que publica el
            {' '}
            <a href="http://www.ssn.unam.mx" className="underline">
              Servicio Sismológico Nacional (UNAM)
            </a>
            , hasta el centro de cada ciudad.
          </p>
        </section>
      )}
      <section className="container mx-auto max-w-3xl px-4 py-6">
        {related.length > 0 && (
          <>
            <h2 className="text-xl font-semibold">Sismos recientes</h2>
            <div className="mt-4 flex flex-col gap-2">
              {related.map((item) => (
                <EarthquakeCard key={item.id} earthquake={item} linked />
              ))}
            </div>
          </>
        )}
        <p className={related.length > 0 ? 'mt-4' : ''}>
          <Link href="/sismos/hoy" className="font-medium text-brand underline underline-offset-4">
            Ver sismos de hoy
          </Link>
        </p>
      </section>
    </>
  );
}
