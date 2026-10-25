import styles from './family-landing.module.css';

export function CircleConnection() {
  return (
    <div
      className={styles.network}
      role="img"
      aria-label="Ilustración: una invitación conecta a quien te invita con tu lugar en el círculo. Aún no te has unido."
    >
      <div className={styles.halo} />
      <svg viewBox="0 0 360 160" aria-hidden="true">
        <path className={styles.wire} d="M80 80 Q180 22 280 80" />
        <path className={styles.echo} d="M80 80 Q180 145 280 80" />
      </svg>
      <div className={styles.host}>
        <span aria-hidden="true">♡</span>
        <b>Quien te invita</b>
      </div>
      <span className={styles.bridge} aria-hidden="true">≈</span>
      <div className={styles.guest}>
        <span>Tú</span>
        <b>Tu lugar en el círculo</b>
      </div>
    </div>
  );
}
