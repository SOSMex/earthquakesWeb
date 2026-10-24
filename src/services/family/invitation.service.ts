'use server';

import { lookupInvitation } from '@/lib/family-links';

export async function validateCircleInvitation(code: string) {
  return lookupInvitation(code);
}
