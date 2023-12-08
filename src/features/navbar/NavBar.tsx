'use client';

import { NavbarMobile, NavbarDesktop } from '@/features';
import { navigation } from '@/config';

export function NavBar() {
  return (
    <>
      <NavbarDesktop navigation={navigation} />
      <NavbarMobile navigation={navigation} />
    </>
  );
}
