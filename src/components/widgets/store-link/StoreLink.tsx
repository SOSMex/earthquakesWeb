'use client';

import type { ComponentProps } from 'react';
import { trackStoreEvent, type Store, type StorePlacement } from '@/lib/analytics';

type Props = Omit<ComponentProps<'a'>, 'onClick'> & { store: Store; placement: StorePlacement };

export function StoreLink({ store, placement, href, children, ...props }: Props) {
  return (
    <a
      {...props}
      href={href}
      onClick={() => trackStoreEvent('store_click', { store, placement })}
    >
      {children}
    </a>
  );
}
