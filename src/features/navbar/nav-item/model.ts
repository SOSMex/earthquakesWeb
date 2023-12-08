export interface NavItemProps {
  label: string;
  href: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}
