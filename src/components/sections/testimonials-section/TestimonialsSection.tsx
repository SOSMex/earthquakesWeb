const REVIEWS = [
  {
    name: 'Gerardo Aboytes',
    date: 'Febrero 2026',
    rating: 5,
    text: 'Me avisa oportunamente de los multiples sismos que ocurren en México. Y ahora con esta última actualización es más objetivas las alertas, el avisar a tu círculo como estás. Desde 2019 que lo utilicé hasta ahora hay muchos avances en la App.',
  },
  {
    name: 'Jessica RuBel',
    date: 'Enero 2026',
    rating: 5,
    text: 'En el último sismo la alerta sonó en tiempo, incluso antes que otras alertas, el tono de la alerta ayuda mucho, ya que es clara.',
  },
  {
    name: 'Un usuario de Google',
    date: 'Febrero 2020',
    rating: 5,
    text: 'Desde que la descargué en 2017 me ha avisado de los sismos y terremotos que han pasado. CDMX con internet de alta velocidad me llega las notificaciones antes que suene la alarma, ya me salvó 2 veces. De perlas.',
  },
  {
    name: 'Diana García Ibarra',
    date: 'Marzo 2022',
    rating: 5,
    text: 'Es una aplicación muy completa. Avisa al momento y permite mandar mensaje a los familiares de SOS con sólo presionar el botón de encendido tres veces. No contiene anuncios molestos y te mantiene informado.',
  },
];

const STATS = [
  { value: '860k+', label: 'Descargas totales' },
  { value: '4.6', label: 'Estrellas' },
  { value: '2017', label: 'Desde' },
];

function StarIcon() {
  return (
    <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <StarIcon key={i} />
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {`\u201C${review.text}\u201D`}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {review.name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {review.date}
        </span>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 md:py-16">
      <div className="mb-8 text-center md:mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 md:text-4xl">
          Lo que dicen nuestros usuarios
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Disponible en Google Play y App Store
        </p>
      </div>

      <div className="mb-10 flex justify-center gap-8 md:gap-16">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-brand md:text-4xl">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>
    </section>
  );
}
