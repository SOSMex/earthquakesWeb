import { Metadata } from 'next';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  MapPin,
  Zap,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo';
import { DownloadSection, SeeMoreSection } from '@/components/sections';
import { getStatistics } from '@/services';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Estadísticas de Sismos en México - Actividad Sísmica',
  description:
    'Estadísticas de actividad sísmica en México: total de sismos, magnitud promedio,'
    + ' distribución por intensidad, estados más activos y tendencias.',
  openGraph: {
    title: 'Estadísticas de Sismos en México',
    description:
      'Estadísticas de actividad sísmica en México: total de sismos, magnitud promedio, distribución y tendencias.',
  },
  alternates: {
    canonical: '/sismos/estadisticas',
  },
};

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

type StatCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
};

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="mb-2 text-muted-foreground">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

type InsightCardProps = {
  title: string;
  description: string;
  type: string;
};

function InsightCard({ title, description, type }: InsightCardProps) {
  const iconMap: Record<string, React.ReactNode> = {
    most_active_state: <MapPin className="size-5 text-red-500" />,
    activity_trend: <TrendingUp className="size-5 text-blue-500" />,
    strongest_earthquake: <Zap className="size-5 text-amber-500" />,
  };

  return (
    <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
      <div className="mt-0.5 shrink-0">{iconMap[type] || <Activity className="size-5" />}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

type MagnitudeBarProps = {
  range: string;
  count: number;
  max: number;
};

function MagnitudeBar({ range, count, max }: MagnitudeBarProps) {
  const percentage = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 text-right text-sm font-medium">{range}</span>
      <div className="h-6 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="flex h-full items-center rounded-full bg-brand px-2 text-xs font-medium text-white transition-all"
          style={{ width: `${Math.max(percentage, 8)}%` }}
        >
          {count}
        </div>
      </div>
    </div>
  );
}

export default async function StatisticsPage() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const response = await getStatistics(formatDate(thirtyDaysAgo), formatDate(now));
  const stats = response?.data;
  const insights = stats?.insights || [];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sismosmx.app';
  const breadcrumbs = [
    { name: 'Inicio', url: siteUrl },
    { name: 'Sismos', url: `${siteUrl}/sismos` },
    { name: 'Estadísticas', url: `${siteUrl}/sismos/estadisticas` },
  ];

  const magnitudeDistribution = stats?.magnitudeDistribution || {};
  const maxDistValue = Math.max(...Object.values(magnitudeDistribution).map(Number), 1);

  const startFormatted = thirtyDaysAgo.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  const endFormatted = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <main>
        {/* Hero */}
        <section className="bg-brand py-8 text-white md:py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold md:text-4xl">Estadísticas Sísmicas de México</h1>
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/70 md:text-base">
              <Calendar className="size-4" />
              {`${startFormatted} — ${endFormatted}`}
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
          {!stats ? (
            <div className="rounded-xl border bg-card p-8 text-center">
              <Activity className="mx-auto mb-4 size-12 text-muted-foreground" />
              <p className="text-lg font-semibold">No se pudieron cargar las estadísticas</p>
              <p className="text-sm text-muted-foreground">Intenta de nuevo más tarde</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Insights */}
              {insights.length > 0 && (
                <section>
                  <h2 className="mb-4 text-lg font-bold md:text-xl">Datos clave del periodo</h2>
                  <div className="grid gap-3 md:grid-cols-3">
                    {insights.map((insight: InsightCardProps) => (
                      <InsightCard
                        key={insight.type}
                        type={insight.type}
                        title={insight.title}
                        description={insight.description}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Summary cards */}
              <section>
                <h2 className="mb-4 text-lg font-bold md:text-xl">Resumen</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <StatCard
                    label="Total de sismos"
                    value={stats.totalCount ?? '—'}
                    icon={<Activity className="size-5" />}
                  />
                  <StatCard
                    label="Magnitud promedio"
                    value={stats.averageMagnitude?.toFixed(1) ?? '—'}
                    icon={<BarChart3 className="size-5" />}
                  />
                  <StatCard
                    label="Magnitud máxima"
                    value={stats.maxMagnitude?.toFixed(1) ?? '—'}
                    icon={<TrendingUp className="size-5" />}
                  />
                  <StatCard
                    label="Magnitud mínima"
                    value={stats.minMagnitude?.toFixed(1) ?? '—'}
                    icon={<TrendingDown className="size-5" />}
                  />
                </div>
              </section>

              {/* Magnitude distribution */}
              {Object.keys(magnitudeDistribution).length > 0 && (
                <section>
                  <h2 className="mb-4 text-lg font-bold md:text-xl">Distribución por magnitud</h2>
                  <div className="space-y-2 rounded-xl border bg-card p-4 shadow-sm">
                    {Object.entries(magnitudeDistribution).map(([range, count]) => (
                      <MagnitudeBar
                        key={range}
                        range={range}
                        count={Number(count)}
                        max={maxDistValue}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Monthly count */}
              {stats.monthlyCount && Object.keys(stats.monthlyCount).length > 0 && (
                <section>
                  <h2 className="mb-4 text-lg font-bold md:text-xl">Sismos por mes</h2>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {Object.entries(stats.monthlyCount).map(([month, count]) => {
                      const [year, m] = month.split('-');
                      const d = new Date(Number(year), Number(m) - 1);
                      const monthName = d.toLocaleDateString('es-MX', {
                        month: 'short',
                        year: 'numeric',
                      });
                      return (
                        <div key={month} className="rounded-xl border bg-card p-4 text-center shadow-sm">
                          <p className="text-2xl font-bold">{String(count)}</p>
                          <p className="text-sm capitalize text-muted-foreground">{monthName}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>

        <SeeMoreSection
          title="¿Quieres ver los sismos recientes?"
          button={{ label: 'Listado de sismos', href: '/sismos' }}
        />
        <DownloadSection />
      </main>
    </>
  );
}
