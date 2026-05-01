const MEXICO_CITY_TIME_ZONE = 'America/Mexico_City';

function getDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

export function formatDateInMexicoCity(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {},
): string {
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: MEXICO_CITY_TIME_ZONE,
    ...options,
  }).format(getDate(value));
}

export function formatTimeInMexicoCity(value: string | Date): string {
  const parts = new Intl.DateTimeFormat('es-MX', {
    timeZone: MEXICO_CITY_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(getDate(value));

  const hour = parts.find((part) => part.type === 'hour')?.value ?? '';
  const minute = parts.find((part) => part.type === 'minute')?.value ?? '';
  const dayPeriod = (parts.find((part) => part.type === 'dayPeriod')?.value ?? '')
    .replace(/\./g, '')
    .toLowerCase();

  return `${hour}:${minute} ${dayPeriod}`.trim();
}

export function formatDateTimeInMexicoCity(
  value: string | Date,
  dateOptions: Intl.DateTimeFormatOptions = {},
): string {
  const date = formatDateInMexicoCity(value, dateOptions);
  const time = formatTimeInMexicoCity(value);
  return `${date} ${time}`.trim();
}

export function getCurrentMexicoCityDate(
  options: Intl.DateTimeFormatOptions = {},
): string {
  return formatDateInMexicoCity(new Date(), options);
}

export { MEXICO_CITY_TIME_ZONE };
