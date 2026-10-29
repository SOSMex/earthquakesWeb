import { StoreLink } from '@/components/widgets/store-link/StoreLink';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { downloadLinks, type DownloadQuery } from '@/lib/download-links';
import { pageMetadata } from '@/lib/seo';
import DownloadRedirect from './DownloadRedirect';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Descarga Sismos MX',
    description: 'Descarga Sismos MX para Android o iPhone desde su tienda oficial.',
    path: '/descargar',
  }),
  robots: { index: false, follow: false },
};

export default function DownloadPage({ searchParams }: { searchParams: DownloadQuery }) {
  const links = downloadLinks(searchParams, process.env.APP_STORE_PROVIDER_TOKEN);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171322] px-5 py-12 text-white">
      <DownloadRedirect links={links} />
      <section className="w-full max-w-lg rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-10">
        <Image src="/logo.svg" alt="Sismos MX" width={56} height={56} className="rounded-lg bg-white p-1" priority />
        <h1 className="mt-6 text-3xl font-bold leading-tight">Lleva Sismos MX contigo.</h1>
        <p className="mt-4 text-base leading-7 text-white/80">
          Descarga la app para Android o iPhone. Si la tienda no se abre, elige una opción.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <StoreLink
            store="play"
            placement="download_fallback"
            href={links.playStore}
            className="rounded-lg bg-amber-300 px-5 py-4 text-center font-semibold text-[#171322] hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
          >
            Descargar en Google Play
          </StoreLink>
          <StoreLink
            store="app_store"
            placement="download_fallback"
            href={links.appStore}
            className="rounded-lg border border-white/30 px-5 py-4 text-center font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
          >
            Descargar en App Store
          </StoreLink>
        </div>
        <Link href="/" className="mt-8 inline-block text-sm text-white/80 underline underline-offset-4">
          Volver a Sismos MX
        </Link>
      </section>
    </main>
  );
}
