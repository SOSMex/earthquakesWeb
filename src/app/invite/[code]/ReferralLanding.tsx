'use client';

import { useEffect, useState } from 'react';
import {
  Gift,
  Crown,
  UserPlus,
  Share2,
  ExternalLink,
  Smartphone,
  Apple,
} from 'lucide-react';

type Props = {
  code: string;
};

function Step({
  number,
  text,
  icon,
}: {
  number: number;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center py-3">
      <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center mr-3 shadow-sm">
        {icon}
      </div>
      <div>
        <span className="text-xs text-purple-500 dark:text-purple-400 font-semibold">
          {'Paso '}
          {number}
        </span>
        <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
          {text}
        </p>
      </div>
    </div>
  );
}

export function ReferralLanding({ code }: Props) {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const hasValidCode = code
    && code.startsWith('REF-')
    && code.length >= 10
    && code !== '[code]';
  const displayCode = hasValidCode ? code : null;

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsAndroid(/Android/i.test(navigator.userAgent));
      setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
    }

    if (hasValidCode) {
      localStorage.setItem('pendingReferralCode', code);

      if (/Android/i.test(navigator.userAgent)) {
        window.location.href = `intent://invite/${code}#Intent;scheme=sismosmx;package=com.oscar.sismos_v2;end`;
      }
    }
  }, [code, hasValidCode]);

  const handleOpenApp = () => {
    if (!displayCode) return;

    if (isAndroid) {
      window.location.href = `intent://invite/${displayCode}#Intent;scheme=sismosmx;package=com.oscar.sismos_v2;end`;
    } else if (isIOS) {
      window.location.href = `sismosmx://invite/${displayCode}`;
      setTimeout(() => {
        window.location.href = 'https://apps.apple.com/app/sismos-mx/id1234567890';
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-950 flex items-center justify-center p-5">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-2xl">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Gift className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Gana Premium Gratis
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {'Un amigo te invita a '}
          <strong className="text-purple-700 dark:text-purple-400">
            Sismos MX
          </strong>
          {'. Descarga la app y ambos se acercan a ganar '}
          <strong>1 mes de Premium</strong>
          .
        </p>

        {/* Code display */}
        {displayCode && (
          <div className="bg-purple-50 dark:bg-purple-900/30 px-6 py-3 rounded-xl inline-block mb-6">
            <span className="font-mono text-lg font-bold text-purple-700 dark:text-purple-300 tracking-wide">
              {displayCode}
            </span>
          </div>
        )}

        {!hasValidCode && (
          <div className="bg-red-50 dark:bg-red-900/30 px-6 py-3 rounded-xl mb-6">
            <p className="text-red-600 dark:text-red-400 text-sm">
              El enlace de referido no es valido.
            </p>
          </div>
        )}

        {/* Steps */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6 text-left space-y-1">
          <Step
            number={1}
            text="Descarga Sismos MX"
            icon={<Smartphone className="w-5 h-5 text-purple-600" />}
          />
          <Step
            number={2}
            text="Crea tu cuenta"
            icon={<UserPlus className="w-5 h-5 text-purple-600" />}
          />
          <Step
            number={3}
            text="Tu amigo recibe credito para Premium"
            icon={<Crown className="w-5 h-5 text-amber-500" />}
          />
        </div>

        {/* Open App Button */}
        {hasValidCode && (
          <button
            type="button"
            onClick={handleOpenApp}
            className="w-full bg-purple-600 text-white py-4 rounded-2xl font-semibold mb-4
                       hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-5 h-5" />
            Abrir en Sismos MX
          </button>
        )}

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          {hasValidCode ? 'No tienes la app?' : 'Descarga la app'}
        </p>

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

        {/* Referral info */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 text-xs">
            <Share2 className="w-3 h-3" />
            <span>
              Invita 3 amigos y gana 1 mes de Premium gratis
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
