/** Public link grammar only: never a membership, report or installation signal. */
export type Platform = 'android' | 'ios' | 'other';
export type InvitationValidation =
  | { status: 'available'; expiresAt: string }
  | { status: 'unavailable' }
  | { status: 'error' };

export {
  DEFAULT_APP_STORE_URL as APP_STORE_URL,
  DEFAULT_PLAY_STORE_URL as PLAY_STORE_URL,
} from '../config/stores';
const INVITATION_VALIDATION_URL = 'https://us-central1-ipn-busca.cloudfunctions.net/validateInviteCode';

export function normalizeInviteCode(value: string): string | null {
  const code = value.trim().toUpperCase();
  return /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{6}$/.test(code) ? code : null;
}

export function appLaunchUrl(platform: Platform, inviteCode?: string): string | null {
  const code = inviteCode === undefined ? null : normalizeInviteCode(inviteCode);
  if (inviteCode !== undefined && !code) return null;
  const destination = code ? `join/${code}` : 'open';
  return platform === 'android'
    ? `intent://${destination}#Intent;scheme=sismosmx;package=com.oscar.sismos_v2;end`
    : `sismosmx://${destination}`;
}

export function decodeInvitation(value: unknown): InvitationValidation {
  if (value === null || typeof value !== 'object') return { status: 'error' };
  const data = value as Record<string, unknown>;
  if (data.valid === false) return { status: 'unavailable' };
  if (data.valid === true && typeof data.expiresAt === 'string'
      && Number.isFinite(Date.parse(data.expiresAt))) {
    return { status: 'available', expiresAt: data.expiresAt };
  }
  return { status: 'error' };
}

export async function lookupInvitation(
  rawCode: string,
  fetcher: typeof fetch = fetch,
): Promise<InvitationValidation> {
  const code = normalizeInviteCode(rawCode);
  if (!code) return { status: 'unavailable' };
  try {
    const response = await fetcher(`${INVITATION_VALIDATION_URL}?code=${code}`, {
      cache: 'no-store', signal: AbortSignal.timeout(10000),
    });
    if (response.status === 400) return { status: 'unavailable' };
    if (!response.ok) return { status: 'error' };
    return decodeInvitation(await response.json());
  } catch {
    return { status: 'error' };
  }
}

export interface PublicFamilyEvent {
  collapseKey: string;
  intensity: string;
  location: string;
  dateUtc: string;
  eventType?: string;
}
export type PublicEventResult =
  | { status: 'found'; event: PublicFamilyEvent }
  | { status: 'notFound' }
  | { status: 'error' };

export function isPublicEventId(value: string): boolean {
  return value === value.trim() && /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/.test(value);
}

export function decodePublicEvent(value: unknown, expectedId: string): PublicEventResult {
  if (value === null || typeof value !== 'object') return { status: 'error' };
  const envelope = value as Record<string, unknown>;
  if (envelope.data === null) return { status: 'notFound' };
  if (envelope.data === null || typeof envelope.data !== 'object') return { status: 'error' };
  const event = envelope.data as Record<string, unknown>;
  if (event.collapseKey !== expectedId || typeof event.intensity !== 'string'
      || typeof event.location !== 'string' || typeof event.dateUtc !== 'string'
      || !Number.isFinite(Date.parse(event.dateUtc))) return { status: 'error' };
  return { status: 'found', event: event as unknown as PublicFamilyEvent };
}

export function familyAnalyticsUrl(value: string): string {
  const url = new URL(value);
  if (url.pathname.startsWith('/join/')) return `${url.origin}/join`;
  if (url.pathname.startsWith('/event/')) return `${url.origin}/event`;
  return value;
}
