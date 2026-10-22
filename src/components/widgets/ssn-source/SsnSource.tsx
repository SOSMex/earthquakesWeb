import { formatDateTimeInMexicoCity, formatUpdatedAgo } from '@/utils/dateTime.utility';
import { cn } from '@/utils';

export const SSN_SOURCE_URL = 'http://www.ssn.unam.mx';
export const SSN_SOURCE_LABEL = 'Datos del Servicio Sismológico Nacional (UNAM)';

export function latestIsoTimestamp(values: Array<string | undefined>): string | undefined {
  return values.reduce<string | undefined>((latest, value) => {
    if (!value) return latest;
    if (!latest || value > latest) return value;
    return latest;
  }, undefined);
}

function updatedLabel(updatedAt?: string): string {
  if (updatedAt) return formatUpdatedAgo(updatedAt);

  return `Actualizado ${formatDateTimeInMexicoCity(new Date(), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
}

export function SsnSource({
  updatedAt,
  className,
}: {
  updatedAt?: string;
  className?: string;
}) {
  return (
    <p className={cn('text-sm font-normal text-foreground', className)}>
      <a
        href={SSN_SOURCE_URL}
        className="underline decoration-foreground/40 underline-offset-2 hover:decoration-foreground"
      >
        {SSN_SOURCE_LABEL}
      </a>
      <span className="text-foreground/90">{` · ${updatedLabel(updatedAt)}`}</span>
    </p>
  );
}
