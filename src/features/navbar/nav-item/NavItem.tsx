import Link from 'next/link';
import { NavItemProps } from './model';
import { cn } from '@/utils';

export function NavItem(props: NavItemProps) {
  const { className, href, label, onClick } = props;

  return (
    <Link
      onClick={onClick}
      className={cn(
        'my-5 cursor-pointer font-bold hover:text-[#48347A] hover:underline hover:decoration-[#72629B] hover:decoration-4 hover:underline-offset-[0.75rem] md:mx-4 md:my-0',
        className,
      )}
      href={href}
    >
      {label}
    </Link>
  );
}
