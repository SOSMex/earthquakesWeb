'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppDownloadButton } from '@/components/widgets';
import { NavItem } from '@/features';
import { NavbarDesktopProps } from './model';

export function NavbarDesktop(props: NavbarDesktopProps) {
  const { navigation } = props;
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 mx-auto flex w-full items-center justify-between bg-background px-12 py-4 max-md:hidden">
      <Link href="/">
        <Image
          alt="Sismos México"
          className="h-[4.75rem] w-[13rem]"
          src="/logo.svg"
          width={208}
          height={76}
        />
      </Link>
      <nav>
        <ul className="flex gap-4 transition-all duration-500 ease-in lg:gap-6 xl:gap-8">
          {navigation.map((item) => (
            <NavItem
              {...item}
              active={pathname === item.href}
              className="whitespace-nowrap text-sm xl:text-base"
              key={item.label}
            />
          ))}
        </ul>
      </nav>
      <AppDownloadButton label="Descarga la app" href="#download" />
    </header>
  );
}
