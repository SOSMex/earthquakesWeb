'use client';

import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';
import {
  APP_STORE_URL, PLAY_STORE_URL, appLaunchUrl, Platform,
} from '@/lib/family-links';
import styles from './family-landing.module.css';

function action(page: 'event' | 'invite', name: string, outcome = 'started') {
  try {
    track('family_link_action', { page, action: name, outcome });
  } catch {
    // A metric cannot delay navigation or change the copy outcome.
  }
}

export function StoreLinks({ page }: { page: 'event' | 'invite' }) {
  return (
    <div className={styles.download}>
      <p>
        <b>¿Aún no tienes Sismos MX?</b>
        <br />
        Descárgala gratis y vuelve a abrir este enlace.
      </p>
      <div className={styles.stores}>
        <a href={PLAY_STORE_URL} onClick={() => action(page, 'store_android')}>
          <small>ANDROID</small>
          <b>Google Play ↗</b>
        </a>
        <a href={APP_STORE_URL} onClick={() => action(page, 'store_ios')}>
          <small>IPHONE</small>
          <b>App Store ↗</b>
        </a>
      </div>
    </div>
  );
}

export function OpenApp({ code }: { code?: string }) {
  const [platform, setPlatform] = useState<Platform>('other');
  const [attempted, setAttempted] = useState(false);
  useEffect(() => {
    if (/Android/i.test(navigator.userAgent)) setPlatform('android');
    else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) setPlatform('ios');
  }, []);
  const href = appLaunchUrl(platform, code);
  if (!href) return null;
  return (
    <>
      <a
        className={styles.primary}
        href={href}
        onClick={() => {
          setAttempted(true);
          action(code ? 'invite' : 'event', 'open_app');
        }}
      >
        {code ? 'Revisar en Sismos MX' : 'Abrir Sismos MX'}
        <span aria-hidden="true">↗</span>
      </a>
      {attempted && (
      <p className={styles.feedback} role="status">
        Si la app no abrió, puedes descargarla o volver a abrir este enlace.
      </p>
      )}
    </>
  );
}

export function CodeHelp({ code }: { code: string }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copy = async () => {
    action('invite', 'copy_code');
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
      action('invite', 'copy_code', 'succeeded');
    } catch {
      setCopyState('failed');
      action('invite', 'copy_code', 'failed');
    }
  };
  return (
    <details className={styles.help}>
      <summary>¿El enlace no continúa en la app?</summary>
      <p>Abre Círculos en Sismos MX y elige unirte con código.</p>
      <div className={styles.code}>
        <small>CÓDIGO DE INVITACIÓN</small>
        <strong>{code}</strong>
        <button type="button" onClick={copy}>Copiar código</button>
      </div>
      <p role="status">
        {copyState === 'copied' && 'Código copiado.'}
        {copyState === 'failed' && 'No se pudo copiar. Puedes introducir el código que aparece arriba.'}
      </p>
      <p>También puedes volver a abrir este enlace después de instalar.</p>
    </details>
  );
}
