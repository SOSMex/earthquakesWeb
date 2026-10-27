import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { APP_STORE_REVIEW_URL, DEFAULT_PLAY_STORE_URL } from '@/config/stores';
import { pageMetadata } from '@/lib/seo';
import ReviewRedirect from './ReviewRedirect';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Califica Sismos MX',
    description: 'Comparte tu experiencia con Sismos MX en Google Play o App Store.',
    path: '/calificar',
  }),
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171322] px-5 py-12 text-white">
      <ReviewRedirect />
      <section className="w-full max-w-lg rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-10">
        <Image src="/logo.svg" alt="Sismos MX" width={56} height={56} className="rounded-lg bg-white p-1" priority />
        <h1 className="mt-6 text-3xl font-bold leading-tight">Tu opinión nos ayuda a mejorar.</h1>
        <p className="mt-4 text-base leading-7 text-white/80">
          Comparte tu experiencia con Sismos MX. Si la tienda no se abre, elige una opción.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={DEFAULT_PLAY_STORE_URL}
            className="rounded-lg bg-amber-300 px-5 py-4 text-center font-semibold text-[#171322] hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
          >
            Calificar en Google Play
          </a>
          <a
            href={APP_STORE_REVIEW_URL}
            className="rounded-lg border border-white/30 px-5 py-4 text-center font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
          >
            Escribir reseña en App Store
          </a>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/65">
          Es posible que la tienda te pida iniciar sesión.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm text-white/80 underline underline-offset-4">
          Volver a Sismos MX
        </Link>
      </section>
    </main>
  );
}
