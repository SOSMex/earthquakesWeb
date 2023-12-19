import React from 'react';

type Level = {
  id: string;
  range: string;
  label: string;
  description: string;
  color: string;
};

const levels: Level[] = [
  {
    id: 'light',
    range: '2.0 a 3.0',
    label: 'Ligero',
    description:
      'Puede estar entre 2.0 a 3.0 en la escala Ritcher, no es percibido ni causa daños en donde fue originado.',
    color: 'bg-[#86FE8B]',
  },
  {
    id: 'moderate',
    range: '3.0 a 5.0',
    label: 'Moderado',
    description:
      'Puede estar entre 3.0 a 5.0 en la escala Ritcher, podria ser percibido cerca de tu ubicación.',
    color: 'bg-[#F6F971]',
  },
  {
    id: 'strong',
    range: '5.0 a 7.0',
    label: 'Fuerte',
    description:
      'Puede estar entre 5.0 a 7.0 en la escala Ritcher, puede ser peligroso y va a ser percibido en tu ubicación.',
    color: 'bg-[#FEAD86]',
  },
  {
    id: 'extreme',
    range: '7.0 en adelante',
    label: 'Extremo',
    description:
      'Puede estar entre 7.0 en adelante en la escala Ritcher, es peligroso y causa grandes daños en distintos puntos.',
    color: 'bg-[#FE8686]',
  },
];

function RichterScale() {
  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="mb-6 text-center text-3xl font-semibold text-brand">
        ¿Cómo funciona la escala de Richter?
      </h2>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
      >
        {levels.map((level) => (
          <div key={level.id} className={`overflow-hidden rounded-lg shadow-md ${level.color}`}>
            <div className="flex">
              <div className="flex h-auto w-1/3 flex-none items-center justify-center p-4 text-black">
                <h3 className="flex h-5 text-lg font-bold">{level.label}</h3>
              </div>
              <div className="flex-grow p-4 text-black">
                <p>{level.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RichterScale;
