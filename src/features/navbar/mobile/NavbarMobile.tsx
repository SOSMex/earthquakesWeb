'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { NavbarMobileProps } from './model';
import { NavItem } from '@/features';
import { cn } from '@/lib/utils';

export function NavbarMobile(props: NavbarMobileProps) {
  const { navigation } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuStyles = isMenuOpen ? 'h-screen z-10' : 'h-[0rem]';
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  function handleOpenMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    bodyRef.current = document.querySelector('body');
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    }
  }, [isMenuOpen]);

  return (
    <nav className="sticky top-0 flex justify-between bg-primary px-8 py-4 md:hidden">
      <button type="button" onClick={handleOpenMenu}>
        <Menu className="cursor-pointer md:hidden" />
      </button>
      <div
        className={cn(
          'absolute top-16 flex w-full flex-col overflow-hidden bg-primary transition-all duration-150 ease-in',
          menuStyles,
        )}
      >
        {navigation.map((item) => (
          <NavItem {...item} onClick={() => handleOpenMenu()} />
        ))}
      </div>
      <button
        type="button"
        className=" rounded-3xl bg-[#48347A] px-4 py-2 font-bold text-white hover:bg-purple-600 hover:duration-200"
      >
        Descarga la app
      </button>
    </nav>
  );
}
