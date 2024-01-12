import { cn } from '@/utils';
import { AppDownloadButtonProps } from './model';

export function AppDownloadButton(props: AppDownloadButtonProps) {
  const { href, label, target, className } = props;
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={cn(
        'hover:bg-brand-soft whitespace-nowrap rounded-3xl bg-brand px-4 py-2 font-medium text-background hover:duration-200',
        className,
      )}
    >
      {label}
    </a>
  );
}
