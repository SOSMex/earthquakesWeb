'use client';

export function IosDownloadButton() {
  return (
    <a
      href={process.env.NEXT_PUBLIC_APP_LINK as string}
      target="_blank"
      rel="noopener noreferrer"
      className="whitespace-nowrap rounded-3xl bg-[#9985CB] px-4 py-2 font-bold text-background text-black hover:bg-[#9985CB]/80 hover:duration-200 dark:bg-[#48347A] dark:text-white"
    >
      Apple Store
    </a>
  );
}
