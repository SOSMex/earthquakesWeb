import type { EarthquakeEventResponse } from '@/services';
import { FamilyLanding } from '@/components/family/FamilyLanding';
import { OpenApp, StoreLinks } from '@/components/family/FamilyActions';
import styles from '@/components/family/family-landing.module.css';

export function EarthquakeStoryCard({ event }: { event: EarthquakeEventResponse }) {
  const drill = event.eventType === 'drill' || event.eventType === 'drill_staging';
  const date = new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City', dateStyle: 'long', timeStyle: 'short',
  }).format(new Date(event.dateUtc));
  return (
    <FamilyLanding label={drill ? 'INFORMACIÓN DEL SIMULACRO' : 'INFORMACIÓN DEL SISMO'}>
      <div className={styles.grid}>
        <section className={styles.copy}>
          <p className={styles.eyeline}>
            {drill ? 'EL SIMULACRO QUE TE COMPARTIERON' : 'EL SISMO QUE TE COMPARTIERON'}
          </p>
          <h1>
            El contexto,
            <br />
            a la mano.
          </h1>
          <p className={styles.intro}>
            Consulta la información del evento.
            El aviso personal de tu familiar permanece en su mensaje.
          </p>
          <div className={styles.eventPanel}>
            <span className={styles.eyeline}>{drill ? 'SIMULACRO · PRÁCTICA' : 'INTENSIDAD REPORTADA'}</span>
            {event.intensity && <div className={styles.eventFact}>{event.intensity}</div>}
            <h2>{event.location || 'Ubicación aún no disponible'}</h2>
            <p>
              {date}
              <br />
              Hora del evento · Hora del centro de México
            </p>
            <p className={styles.eventSource}>
              Información del evento compartido por Sismos MX.
              Los datos disponibles pueden actualizarse. Una estimación no acredita
              anticipación ni recepción de una alerta.
            </p>
          </div>
        </section>
        <section className={styles.aside}>
          <p className={styles.eyeline}>SISMOS MX</p>
          <h2>
            Información del sismo.
            <br />
            Respuestas de los tuyos.
          </h2>
          <p>
            Prepara un círculo para compartir cómo están después de un sismo.
            El botón abre la app; este reporte permanece aquí para consultarlo.
          </p>
          <OpenApp />
          <StoreLinks page="event" />
          <div className={styles.payoff}>
            <p>
              Compartir que estás bien es gratis.
              Para usar Círculos necesitarás una cuenta.
            </p>
          </div>
        </section>
      </div>
      <section className={styles.trust}>
        <b>Un mensaje personal. Un enlace público.</b>
        <p>
          Esta página informa sobre el evento. No verifica ni publica el estado
          de quien compartió el enlace.
        </p>
      </section>
    </FamilyLanding>
  );
}
