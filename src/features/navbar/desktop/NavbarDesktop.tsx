import Image from 'next/image';
import Link from 'next/link';
import { NavItem } from '../nav-item/NavItem';
import { NavbarDesktopProps } from './model';

export function NavbarDesktop(props: NavbarDesktopProps) {
  const { navigation } = props;
  return (
    <nav className="container sticky top-0 mx-auto flex items-center justify-between bg-primary px-8 py-4 max-md:hidden">
      <Link href="/">
        <Image
          alt="Sismos México"
          className="h-[3.573rem] w-[9.813rem] text-xl font-bold"
          src="logo.svg"
          width={75}
          height={57}
        />
      </Link>

      <div className="flex bg-primary transition-all duration-500 ease-in ">
        {navigation.map((item) => (
          <NavItem {...item} />
        ))}
      </div>
      <button
        type="button"
        className="rounded-3xl bg-[#48347A] px-4 py-2 font-bold text-white hover:bg-purple-600 hover:duration-200"
      >
        Descarga la app
      </button>
    </nav>
  );
}
