'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { InvitationValidation, normalizeInviteCode } from '@/lib/family-links';
import { FamilyLanding } from '@/components/family/FamilyLanding';
import { CircleConnection } from '@/components/family/CircleConnection';
import { CodeHelp, OpenApp, StoreLinks } from '@/components/family/FamilyActions';
import styles from '@/components/family/family-landing.module.css';

export function JoinCircleLanding({ code, validation }: {
  code: string; validation: InvitationValidation;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const normalized = normalizeInviteCode(code);
  const available = validation.status === 'available' && normalized;
  const failed = validation.status === 'error';
  return (
    <FamilyLanding label="INVITACIÓN A UN CÍRCULO">
      {available ? (
        <div className={styles.grid}>
          <section className={styles.copy}>
            <p className={styles.eyeline}>TE INVITARON A UN CÍRCULO</p>
            <h1>
              Los tuyos.
              <br />
              Más cerca de ti.
            </h1>
            <p className={styles.intro}>
              Después de un sismo, cada quien indica cómo está.
              Sus respuestas, juntas en Sismos MX.
            </p>
            <CircleConnection />
            <p className={styles.note}>Una invitación. Tú decides si te unes.</p>
            <div className={styles.payoff}>
              <p>
                <b>Una respuesta de cada uno.</b>
                <br />
                Consulta quién indicó que está bien y quién aún no ha respondido.
              </p>
            </div>
          </section>
          <section className={styles.aside} aria-labelledby="invite-next">
            <p className={styles.eyeline}>EL SIGUIENTE PASO</p>
            <h2 id="invite-next">Revisa tu invitación.</h2>
            <p>En la app verás quién te invita y podrás confirmar si quieres unirte.</p>
            <OpenApp code={normalized} />
            <p className={styles.actionNote}>
              Necesitarás una cuenta para unirte.
              <br />
              Abrir el enlace no te incorpora al círculo.
            </p>
            <StoreLinks page="invite" />
            <CodeHelp code={normalized} />
          </section>
        </div>
      ) : (
        <section className={styles.error} aria-live="polite" aria-busy={pending}>
          <p className={styles.eyeline}>INVITACIÓN A UN CÍRCULO</p>
          <h1>{failed ? 'Vamos a intentarlo otra vez.' : 'Esta invitación no está disponible.'}</h1>
          <p>
            {failed ? 'No pudimos consultar la invitación. Puedes reintentar sin perder este enlace.'
              : 'Pídele a quien te invitó que comparta una invitación nueva contigo.'}
          </p>
          {failed && (
          <button
            type="button"
            className={styles.primary}
            disabled={pending}
            onClick={() => startTransition(() => router.refresh())}
          >
            {pending ? 'Consultando…' : 'Volver a consultar'}
          </button>
          )}
          <p>No se ha aceptado ninguna invitación.</p>
          <StoreLinks page="invite" />
          {failed && normalized && <CodeHelp code={normalized} />}
        </section>
      )}
      <section className={styles.trust}>
        <b>Tu círculo es privado.</b>
        <p>
          Las respuestas se consultan dentro de la app. Esta página no muestra
          integrantes, ubicaciones ni estados personales.
        </p>
      </section>
    </FamilyLanding>
  );
}
