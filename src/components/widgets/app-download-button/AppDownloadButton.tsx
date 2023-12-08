'use client';

export function AppDownloadButton() {
  return (
    <a
      href={process.env.NEXT_PUBLIC_APP_LINK as string}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-brand hover:bg-brand/80 whitespace-nowrap rounded-3xl px-4 py-2 font-medium text-background hover:duration-200"
    >
      Descarga la app
    </a>
  );
}
