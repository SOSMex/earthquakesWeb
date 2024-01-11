import { AndroidDownloadButton } from '@/components/widgets/android-download-button/AndroidDownloadButton';
import { IosDownloadButton } from '@/components/widgets/ios-download-button/IosDownloadButton';
import Image from 'next/image';

export function DownloadSection() {
  return (
    <div className="w-full bg-brand">
      <section className="container mx-auto my-[-1.91rem] flex flex-col items-center justify-center gap-x-[6.25rem] p-0 text-left lg:flex-row">
        <div className="mt-[3.12rem] flex flex-col items-center lg:mt-[-15rem] lg:items-start">
          <h2 className="mb-10 text-4xl font-semibold text-white dark:text-black">
            ¡Descarga la App!
          </h2>
          <p className="mb-10 max-w-[21.5rem] text-center text-base text-white dark:text-black md:max-w-[31.1875rem] lg:text-left">
            ¿Sabías que en México ocurren, en promedio, 4 sismos al día? ¡No te preocupes! A partir
            de ahora, ¡estarás siempre informado!
          </p>
          <div className="flex gap-[1.56rem]">
            <AndroidDownloadButton />
            <IosDownloadButton />
          </div>
        </div>
        <div className="relative mt-[6.25rem] h-96 w-full max-w-xs flex-shrink-0 lg:mt-[-6.231rem] lg:h-[40.54713rem] lg:w-[21.41156rem]">
          <Image alt="Teléfono Móvil" src="/Vector.png" layout="fill" objectFit="contain" />
        </div>
      </section>
    </div>
  );
}
