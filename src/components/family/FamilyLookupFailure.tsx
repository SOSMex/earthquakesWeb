'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FamilyLanding } from './FamilyLanding';
import { OpenApp, StoreLinks } from './FamilyActions';
import styles from './family-landing.module.css';

export function FamilyLookupFailure({ unavailable = false }: { unavailable?: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <FamilyLanding label="INFORMACIÓN DEL SISMO">
      <section className={styles.error} aria-live="polite" aria-busy={pending}>
        <p className={styles.eyeline}>INFORMACIÓN DEL SISMO</p>
        <h1>{unavailable ? 'Este reporte no está disponible.' : 'No pudimos cargar el reporte.'}</h1>
        <p>
          {unavailable ? 'Consulta la información disponible en Sismos MX.'
            : 'Puedes volver a intentarlo. No mostramos información de otro sismo como sustituto.'}
        </p>
        {!unavailable && (
        <button
          type="button"
          className={styles.primary}
          disabled={pending}
          onClick={() => startTransition(() => router.refresh())}
        >
          {pending ? 'Consultando…' : 'Volver a consultar'}
        </button>
        )}
        <OpenApp />
        <StoreLinks page="event" />
      </section>
    </FamilyLanding>
  );
}
