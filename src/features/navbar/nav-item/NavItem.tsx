import Link from 'next/link';
import { cn } from '@/utils';
import { NavItemProps } from './model';

export function NavItem(props: NavItemProps) {
  const { className, href, label, onClick, active } = props;

  return (
    <Link
      onClick={onClick}
      className={cn(
        'dark:hover:text-brand-bright/80 dark:hover:decoration-brand-bright/80 cursor-pointer font-medium hover:text-brand hover:underline hover:decoration-brand/80 hover:decoration-4 hover:underline-offset-[0.75rem]',
        active
          ? 'dark:text-brand-bright dark:decoration-brand-bright text-brand underline decoration-brand decoration-4 underline-offset-[0.75rem]'
          : '',
        className,
      )}
      href={href}
    >
      {label}
    </Link>
  );
}
