import Link from 'next/link';
import styles from './family-landing.module.css';

export function FamilyLanding({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className={styles.page}>
      <div className={styles.surface}>
        <header className={styles.header}>
          <Link href="/" aria-label="Inicio de Sismos MX">
            <span className={styles.mark} aria-hidden="true">≈</span>
            Sismos MX
          </Link>
          <span>{label}</span>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <strong>Sismos MX</strong>
          <p>Los tuyos, en un mismo lugar.</p>
        </footer>
      </div>
    </div>
  );
}
