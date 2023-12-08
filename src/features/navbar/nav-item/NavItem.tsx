import Link from 'next/link';
import { NavItemProps } from './model';
import { cn } from '@/utils';

export function NavItem(props: NavItemProps) {
  const { className, href, label, onClick, active } = props;

  return (
    <Link
      onClick={onClick}
      className={cn(
        'hover:text-brand/80 hover:decoration-brand/80 cursor-pointer font-medium hover:underline hover:decoration-4 hover:underline-offset-[0.75rem]',
        active
          ? 'text-brand decoration-brand underline decoration-4 underline-offset-[0.75rem]'
          : '',
        className,
      )}
      href={href}
    >
      {label}
    </Link>
  );
}
