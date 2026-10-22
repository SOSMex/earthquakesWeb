import Link from 'next/link';
import { footerNavigation } from '@/config';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <nav aria-label="Pie de página" className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-8 text-sm">
        {footerNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-medium text-foreground underline-offset-4 hover:text-brand hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
