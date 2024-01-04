'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { NavItem } from '@/features';
import { cn } from '@/lib/utils';
import { AppDownloadButton } from '@/components/widgets';
import { NavbarMobileProps } from './model';

export function NavbarMobile(props: NavbarMobileProps) {
  const { navigation } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuStyles = isMenuOpen ? 'h-screen z-10' : 'h-[0rem]';
  const bodyRef = useRef<HTMLBodyElement | null>(null);
  const pathname = usePathname();

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
    <header className="sticky top-0 z-50 flex items-center justify-between bg-background px-8 py-4 md:hidden">
      <button name="navigation menu" type="button" onClick={handleOpenMenu}>
        <Menu className="cursor-pointer md:hidden" />
      </button>
      <nav>
        <ul
          className={cn(
            'absolute left-0 top-16 flex w-full flex-col space-y-8 overflow-hidden bg-background px-8 pt-4 transition-all duration-150 ease-in',
            menuStyles,
          )}
        >
          {navigation.map((item) => (
            <NavItem
              {...item}
              onClick={() => handleOpenMenu()}
              active={pathname === item.href}
              key={item.label}
            />
          ))}
        </ul>
      </nav>
      <AppDownloadButton />
    </header>
  );
}
