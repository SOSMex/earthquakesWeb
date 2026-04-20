import Image from 'next/image';
import { Metadata } from 'next';
import { Apple, BellRing, MapPinned, ShieldCheck, Smartphone } from 'lucide-react';

const ANDROID_STORE_URL = 'https://play.google.com/store/apps/details?id=com.oscar.sismos_v2';
const IOS_STORE_URL = 'https://apps.apple.com/app/id6473684021';

export const metadata: Metadata = {
  title: 'Descarga Sismos MX',
  description:
    'Descarga Sismos MX para recibir alertas sísmicas y consultar información de sismos en México.',
  alternates: {
    canonical: '/telegram',
  },
  robots: {
    index: false,
    follow: true,
  },
};

function Benefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-300/15 text-amber-200">
        {icon}
      </div>
      <h2 className="text-base font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/62">{text}</p>
    </div>
  );
}

export default function TelegramLandingPage() {
  return (
    <main className="min-h-screen bg-[#171322] text-white">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-[1.05fr_0.95fr] md:px-8">
        <div>
          <div className="mb-7 flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Sismos MX"
              width={48}
              height={48}
              priority
              className="h-12 w-12"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-200">
                Sismos MX
              </p>
              <p className="text-sm text-white/55">Alertas sísmicas para México</p>
            </div>
          </div>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Recibe alertas sísmicas y mantente informado.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
            Sismos MX te ayuda a consultar sismos recientes y recibir avisos importantes
            directamente en tu celular.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={ANDROID_STORE_URL}
              className="flex min-h-16 items-center justify-center gap-3 rounded-lg bg-amber-300 px-5 py-4 text-base font-bold text-[#171322] shadow-[0_14px_40px_rgba(252,211,77,0.18)] transition hover:bg-amber-200"
            >
              <Smartphone className="h-5 w-5" />
              Descargar en Google Play
            </a>

            <a
              href={IOS_STORE_URL}
              className="flex min-h-16 items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/10 px-5 py-4 text-base font-bold text-white transition hover:bg-white/15"
            >
              <Apple className="h-5 w-5" />
              Descargar en App Store
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Benefit
              icon={<BellRing className="h-5 w-5" />}
              title="Avisos al momento"
              text="Recibe notificaciones cuando haya actividad sísmica relevante."
            />
            <Benefit
              icon={<MapPinned className="h-5 w-5" />}
              title="Información clara"
              text="Consulta magnitud, ubicación y detalles de sismos recientes."
            />
            <Benefit
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Hecha para México"
              text="Una app pensada para estar preparado junto a tu familia."
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="absolute inset-x-10 top-10 h-64 rounded-full bg-amber-300/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
            <Image
              src="/app-ss.svg"
              alt="Pantalla de Sismos MX"
              width={360}
              height={720}
              priority
              className="mx-auto h-auto w-full max-w-xs"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
