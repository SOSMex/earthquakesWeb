'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { NavItem } from '../nav-item/NavItem';
import { NavbarDesktopProps } from './model';
import { AppDownloadButton } from '@/components/widgets';

export function NavbarDesktop(props: NavbarDesktopProps) {
  const { navigation } = props;
  const pathname = usePathname();

  return (
    <header className="container sticky top-0 mx-auto flex items-center justify-between bg-background px-8 py-4 max-md:hidden">
      <Link href="/">
        <Image
          alt="Sismos México"
          className="h-[3.573rem] w-[9.813rem] text-xl font-bold"
          src="logo.svg"
          width={75}
          height={57}
        />
      </Link>
      <nav>
        <ul className="flex gap-10 transition-all duration-500 ease-in">
          {navigation.map((item) => (
            <NavItem {...item} active={pathname === item.href} />
          ))}
        </ul>
      </nav>
      <AppDownloadButton />
    </header>
  );
}
