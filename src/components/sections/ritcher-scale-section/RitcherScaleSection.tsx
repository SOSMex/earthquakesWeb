import React from 'react';
import { RitcherCard, Level } from '@/components/widgets';

const levels: Level[] = [
  {
    id: 'light',
    range: '2.0 a 3.0',
    label: 'Ligero',
    description:
      'Puede estar entre 2.0 a 3.0 en la escala Ritcher, no es percibido ni causa daños en donde fue originado.',
    color: 'bg-ritcher-scales-green',
  },
  {
    id: 'moderate',
    range: '3.0 a 5.0',
    label: 'Moderado',
    description:
      'Puede estar entre 3.0 a 5.0 en la escala Ritcher, podria ser percibido cerca de tu ubicación.',
    color: 'bg-ritcher-scales-yellow',
  },
  {
    id: 'strong',
    range: '5.0 a 7.0',
    label: 'Fuerte',
    description:
      'Puede estar entre 5.0 a 7.0 en la escala Ritcher, puede ser peligroso y va a ser percibido en tu ubicación.',
    color: 'bg-ritcher-scales-orange',
  },
  {
    id: 'extreme',
    range: '7.0 en adelante',
    label: 'Extremo',
    description:
      'Puede estar entre 7.0 en adelante en la escala Ritcher, es peligroso y causa grandes daños en distintos puntos.',
    color: 'bg-ritcher-scales-red',
  },
];

export function RitcherScaleSection() {
  return (
    <section className="container mx-auto my-8 w-full py-4">
      <h2 className="mb-6 text-center text-3xl font-semibold text-brand">
        ¿Cómo funciona la escala de Richter?
      </h2>

      <ol className="mx-auto grid max-w-7xl grid-cols-1  gap-12 md:grid-cols-2 lg:grid-cols-4">
        {levels.map((level) => (
          <RitcherCard {...level} key={level.id} />
        ))}
      </ol>
    </section>
  );
}
