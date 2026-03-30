import { AppDownloadButton } from '@/components/widgets';

export default function EventNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1a1a2e] px-6 text-white">
      <h1 className="text-4xl font-bold">Sismo no encontrado</h1>
      <p className="mt-4 max-w-md text-center text-lg text-white/60">
        Este evento ya no est&aacute; disponible. Sismos MX env&iacute;a alertas
        s&iacute;smicas con segundos de anticipaci&oacute;n a miles de usuarios en
        M&eacute;xico.
      </p>
      <div className="mt-8">
        <AppDownloadButton
          href="https://sismosmx.app"
          label="Descargar Sismos MX"
          target="_blank"
          className="py-4 text-lg"
        />
      </div>
    </div>
  );
}
