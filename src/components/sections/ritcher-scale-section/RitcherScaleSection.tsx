import React from 'react';
import { RitcherCard, Level } from '@/components/widgets';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';

const levels: Level[] = [
  {
    id: 'light',
    range: '2.0 a 3.0',
    label: 'Ligero',
    description:
      'Magnitud de 2.0 a 3.0. Por lo general no se percibe y no causa daños donde se originó.',
    color: 'bg-ritcher-scales-green',
  },
  {
    id: 'moderate',
    range: '3.0 a 5.0',
    label: 'Moderado',
    description:
      'Magnitud de 3.0 a 5.0. Puede percibirse cerca del epicentro.',
    color: 'bg-ritcher-scales-yellow',
  },
  {
    id: 'strong',
    range: '5.0 a 7.0',
    label: 'Fuerte',
    description:
      'Magnitud de 5.0 a 7.0. Puede sentirse con fuerza y causar daños.',
    color: 'bg-ritcher-scales-orange',
  },
  {
    id: 'extreme',
    range: '7.0 en adelante',
    label: 'Extremo',
    description:
      'Magnitud de 7.0 o mayor. Es peligroso y puede causar daños graves.',
    color: 'bg-ritcher-scales-red',
  },
];

export function RitcherScaleSection() {
  return (
    <section className="container mx-auto my-8 w-full py-4">
      {/* Mobile: single collapsible with title as trigger */}
      <Accordion type="single" collapsible className="mx-auto max-w-7xl px-4 md:hidden">
        <AccordionItem value="richter-scale" className="border-none">
          <AccordionTrigger className="justify-center gap-2">
            <span className="text-xl font-semibold text-brand">
              ¿Qué significa la magnitud?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ol className="flex flex-col gap-3 pt-2">
              {levels.map((level) => (
                <li key={level.id} className="flex items-center gap-3">
                  <span className={`inline-block size-4 shrink-0 rounded-full ${level.color}`} />
                  <span className="font-medium">{level.label}</span>
                  <span className="text-sm text-muted-foreground">{level.range}</span>
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Desktop: title + grid */}
      <h2 className="mb-6 hidden text-center text-3xl font-semibold text-brand md:block">
        ¿Qué significa la magnitud?
      </h2>
      <ol className="mx-auto hidden max-w-7xl grid-cols-1 gap-12 md:grid md:grid-cols-2 lg:grid-cols-4">
        {levels.map((level) => (
          <RitcherCard {...level} key={level.id} />
        ))}
      </ol>
    </section>
  );
}
