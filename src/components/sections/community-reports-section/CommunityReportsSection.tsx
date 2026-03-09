import type { ReportStats } from '@/services';

interface CommunityReportsSectionProps {
  stats: ReportStats;
}

const INTENSITY_CONFIG = {
  leve: { label: 'Leve', color: 'bg-yellow-400', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50 dark:bg-yellow-900/20' },
  moderado: { label: 'Moderado', color: 'bg-orange-400', textColor: 'text-orange-700', bgLight: 'bg-orange-50 dark:bg-orange-900/20' },
  fuerte: { label: 'Fuerte', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50 dark:bg-red-900/20' },
} as const;

function IntensityBar({ breakdown }: { breakdown: ReportStats['intensityBreakdown'] }) {
  const total = breakdown.leve + breakdown.moderado + breakdown.fuerte;
  if (total === 0) return null;

  const segments = [
    { key: 'leve' as const, count: breakdown.leve },
    { key: 'moderado' as const, count: breakdown.moderado },
    { key: 'fuerte' as const, count: breakdown.fuerte },
  ].filter((s) => s.count > 0);

  return (
    <div className="space-y-3">
      <div className="flex h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        {segments.map(({ key, count }) => (
          <div
            key={key}
            className={`${INTENSITY_CONFIG[key].color} transition-all`}
            style={{ width: `${(count / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {segments.map(({ key, count }) => {
          const config = INTENSITY_CONFIG[key];
          const pct = Math.round((count / total) * 100);
          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span className={`inline-block h-3 w-3 rounded-full ${config.color}`} />
              <span className="text-gray-600 dark:text-gray-400">
                {config.label}
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {`${count} (${pct}%)`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 60) return `hace ${diffMin} min`;
  if (diffHours < 24) return `hace ${diffHours}h`;
  if (diffDays < 7) return `hace ${diffDays}d`;
  return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

function FeaturedComment({ report }: {
  report: ReportStats['featuredReports'][0];
}) {
  const intensity = report.intensity.toLowerCase() as keyof typeof INTENSITY_CONFIG;
  const config = INTENSITY_CONFIG[intensity] || INTENSITY_CONFIG.leve;

  return (
    <div className={`rounded-lg p-3 ${config.bgLight}`}>
      <div className="mb-1 flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase ${config.textColor}`}>
          {config.label}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatRelativeTime(report.reportedAt)}
        </span>
      </div>
      {report.comment && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          &ldquo;
          {report.comment}
          &rdquo;
        </p>
      )}
    </div>
  );
}

export function CommunityReportsSection({ stats }: CommunityReportsSectionProps) {
  if (stats.totalReports === 0) return null;

  const featuredWithComments = stats.featuredReports
    .filter((r) => r.comment && r.comment.trim().length > 0)
    .slice(0, 5);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-6 dark:border-purple-800 dark:bg-purple-950/30 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <svg
              className="h-5 w-5 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 md:text-xl">
              Reportes de la Comunidad
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {stats.totalReports}
              </span>
              {' '}
              {stats.totalReports === 1 ? 'persona report\u00f3' : 'personas reportaron'}
              {' '}
              este sismo
            </p>
          </div>
        </div>

        <IntensityBar breakdown={stats.intensityBreakdown} />

        {featuredWithComments.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Comentarios destacados
            </h3>
            {featuredWithComments.map((report, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <FeaturedComment key={i} report={report} />
            ))}
          </div>
        )}

        <div className="mt-6 rounded-lg bg-purple-100 p-4 text-center dark:bg-purple-900/40">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            ¿Sentiste este sismo?
          </p>
          <p className="font-semibold text-purple-700 dark:text-purple-300">
            Descarga Sismos MX y reporta
          </p>
        </div>
      </div>
    </section>
  );
}
