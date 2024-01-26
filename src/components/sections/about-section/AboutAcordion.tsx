import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { faqQuestions } from './content';

export function AboutAcordion() {
  return (
    <section className="mx-auto min-h-screen w-full bg-brand-background px-4 dark:bg-brand-pdark">
      <section className="container mx-auto max-w-7xl pt-12 text-center font-black">
        <h1 className="w-full text-center text-3xl font-semibold dark:text-white">
          Preguntas frecuentes
        </h1>
        <p className="mb-12 mt-12 font-normal">
          Sabemos que en ocasiones se pueden tener dudas respecto a los sismos, así que a
          continuación tratamos de brindarte la mayor información posible.
        </p>
      </section>
      <section className="mx-auto w-full max-w-7xl">
        <Accordion type="multiple">
          {faqQuestions.map((question) => (
            <AccordionItem value={question.question}>
              <AccordionTrigger className="border-2 border-black px-12 py-5 dark:border-white ">
                {question.question}
              </AccordionTrigger>
              <AccordionContent className="w- mt-1 border-2 border-black bg-brand-pink px-12 py-5 dark:border-white dark:bg-brand-pale">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </section>
  );
}
