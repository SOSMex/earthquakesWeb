import { Metadata } from 'next';
import {
  Apple,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Smartphone,
  Waves,
} from 'lucide-react';

const ANDROID_DOWNLOAD_URL = 'https://play.google.com/store/apps/details?id=com.oscar.sismos_v2';
const IOS_DOWNLOAD_URL = 'https://apps.apple.com/app/id6473684021';

export const metadata: Metadata = {
  title: 'Simulacro Nacional 2026 - Sismos MX',
  description:
    'Sismos MX participa en el Simulacro Nacional 2026. Mañana 11 AM, todo México practica como si fuera un sismo real. Abre la app y prepárate.',
  alternates: {
    canonical: '/simulacrum',
  },
  robots: {
    index: true,
    follow: true,
  },
};

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.07] p-5">
      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/15 text-sm font-bold text-amber-200">
        {step}
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/70">{description}</p>
    </div>
  );
}

export default function SimulacrumPage() {
  return (
    <main className="min-h-screen bg-[#171322] text-white">
      <section className="mx-auto flex w-full max-w-3xl flex-col px-5 py-10">
        <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-lg border border-amber-300/25 bg-amber-300/10 px-3 py-2 text-sm font-semibold text-amber-200">
          <Waves className="h-4 w-4" />
          Simulacro Nacional 2026 - Miércoles 6 de mayo, 11:00 AM
        </div>

        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
          Hoy todo México practica.
          <br />
          Sismos MX practica contigo.
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
          Hipótesis del simulacro: sismo M8.2, epicentro a 55 km al noroeste de
          Acapulco, Guerrero. La alerta sísmica se activará en altavoces, radio,
          TV y celulares de todo el país.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 text-center">
            <div className="mb-1 inline-flex items-center justify-center text-amber-300">
              <Clock className="h-4 w-4" />
            </div>
            <p className="text-base font-bold text-white">11:00 AM</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/55">
              Hora del centro
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 text-center">
            <div className="mb-1 inline-flex items-center justify-center text-amber-300">
              <MapPin className="h-4 w-4" />
            </div>
            <p className="text-base font-bold text-white">Costa Guerrero</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/55">
              Epicentro hipotético
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3 text-center">
            <div className="mb-1 inline-flex items-center justify-center text-amber-300">
              <Waves className="h-4 w-4" />
            </div>
            <p className="text-base font-bold text-white">M8.2</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/55">
              Magnitud simulada
            </p>
          </div>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-white">
          Cómo participar con Sismos MX
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <StepCard
            step="1"
            title="Abre la app"
            description="Asegúrate de tener Sismos MX instalada y con notificaciones activas antes de las 11:00 AM."
          />
          <StepCard
            step="2"
            title="Recibe la alerta"
            description="Cuando empiece el simulacro vas a recibir una alerta como si fuera un sismo real."
          />
          <StepCard
            step="3"
            title="Practica el protocolo"
            description="Sigue el flujo guiado dentro de la app: zona segura, evaluación, aviso a tu círculo."
          />
        </div>

        <h2 className="mt-12 text-2xl font-bold text-white">
          ¿Aún no tienes Sismos MX?
        </h2>

        <p className="mt-3 text-base text-white/70">
          Descárgala gratis y participa en el simulacro mañana junto a todo México.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href={ANDROID_DOWNLOAD_URL}
            className="flex min-h-16 items-center justify-center gap-3 rounded-lg bg-amber-300 px-5 py-4 text-base font-bold text-[#171322] shadow-[0_14px_40px_rgba(252,211,77,0.18)] transition hover:bg-amber-200"
          >
            <Smartphone className="h-5 w-5" />
            Descargar en Google Play
          </a>

          <a
            href={IOS_DOWNLOAD_URL}
            className="flex min-h-16 items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/10 px-5 py-4 text-base font-bold text-white transition hover:bg-white/15"
          >
            <Apple className="h-5 w-5" />
            Descargar en App Store
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-sm text-white/55 sm:flex-row sm:items-center">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            Es un ejercicio nacional. No representa un sismo real.
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-300" />
            Practicar salva vidas cuando sí ocurre.
          </span>
        </div>
      </section>
    </main>
  );
}
