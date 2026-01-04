'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  Bell,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Smartphone,
  Apple,
} from 'lucide-react';

type Props = {
  code: string;
};

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center py-3">
      <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center mr-3 shadow-sm">
        {icon}
      </div>
      <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">{text}</span>
    </div>
  );
}

export function JoinCircleLanding({ code }: Props) {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const hasValidCode = code && code.length >= 4 && code !== '[code]';
  const displayCode = hasValidCode ? code.toUpperCase() : null;

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsAndroid(/Android/i.test(navigator.userAgent));
      setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
    }

    if (hasValidCode) {
      // Store code for deferred deep linking
      localStorage.setItem('pendingInviteCode', code);

      // Try to open app on Android
      if (/Android/i.test(navigator.userAgent)) {
        window.location.href = `intent://join/${code}#Intent;scheme=sismosmx;package=com.oscar.sismos_v2;end`;
      }
    }
  }, [code, hasValidCode]);

  const handleOpenApp = () => {
    const targetCode = displayCode || manualCode.toUpperCase();
    if (!targetCode) return;

    localStorage.setItem('pendingInviteCode', targetCode);

    if (isAndroid) {
      window.location.href = `intent://join/${targetCode}#Intent;scheme=sismosmx;package=com.oscar.sismos_v2;end`;
    } else if (isIOS) {
      window.location.href = `sismosmx://join/${targetCode}`;
      // Fallback to App Store after timeout
      setTimeout(() => {
        window.location.href = 'https://apps.apple.com/app/sismos-mx/id1234567890';
      }, 2000);
    }
  };

  const handleManualSubmit = () => {
    const trimmedCode = manualCode.trim().toUpperCase();
    if (trimmedCode.length >= 4) {
      // Redirect to the URL with the code
      window.location.href = `/join/${trimmedCode}`;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-950 flex items-center justify-center p-5">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-2xl">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Users className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Círculo de Seguridad
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Alguien te invitó a su círculo de seguridad en
          {' '}
          <strong className="text-purple-700 dark:text-purple-400">Sismos MX</strong>
        </p>

        {/* Code display or manual entry */}
        {displayCode ? (
          <div className="bg-purple-50 dark:bg-purple-900/30 px-6 py-3 rounded-xl inline-block mb-6">
            <span className="font-mono text-2xl font-bold text-purple-700 dark:text-purple-300 tracking-widest">
              {displayCode}
            </span>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
              ¿Tienes un código? Ingrésalo aquí:
            </p>
            <div className="flex gap-2 justify-center">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                placeholder="XXXXXX"
                maxLength={6}
                className="w-36 px-4 py-3 border-2 border-purple-200 dark:border-purple-700 rounded-xl
                           font-mono text-xl font-bold text-center tracking-widest
                           text-purple-700 dark:text-purple-300
                           bg-white dark:bg-gray-800
                           focus:border-purple-500 focus:outline-none
                           placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={handleManualSubmit}
                disabled={manualCode.length < 4}
                className="px-4 py-3 bg-purple-600 text-white rounded-xl
                           hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6 text-left space-y-1">
          <Feature
            icon={<Bell className="w-5 h-5 text-purple-600" />}
            text="Recibe alertas cuando reporten su estado"
          />
          <Feature
            icon={<CheckCircle className="w-5 h-5 text-purple-600" />}
            text="Sabe que están bien después de un sismo"
          />
          <Feature
            icon={<AlertTriangle className="w-5 h-5 text-purple-600" />}
            text="Entérate si necesitan ayuda"
          />
        </div>

        {/* Open App Button */}
        <button
          type="button"
          onClick={handleOpenApp}
          disabled={!displayCode && manualCode.length < 4}
          className="w-full bg-purple-600 text-white py-4 rounded-2xl font-semibold mb-4
                     hover:bg-purple-700 transition flex items-center justify-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ExternalLink className="w-5 h-5" />
          Abrir en Sismos MX
        </button>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">¿No tienes la app?</p>

        {/* Download buttons */}
        <a
          href="https://play.google.com/store/apps/details?id=com.oscar.sismos_v2"
          className="w-full bg-gray-900 dark:bg-gray-700 text-white py-4 rounded-2xl font-semibold mb-3
                     hover:bg-gray-800 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2"
        >
          <Smartphone className="w-5 h-5" />
          Descargar en Google Play
        </a>

        <a
          href="https://apps.apple.com/app/sismos-mx/id1234567890"
          className="w-full bg-gray-900 dark:bg-gray-700 text-white py-4 rounded-2xl font-semibold
                     hover:bg-gray-800 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2"
        >
          <Apple className="w-5 h-5" />
          Descargar en App Store
        </a>

        <p className="text-gray-400 dark:text-gray-500 text-xs mt-6">
          México está en zona sísmica.
          <br />
          ¡Mejor estar preparados! 🇲🇽
        </p>
      </div>
    </main>
  );
}
