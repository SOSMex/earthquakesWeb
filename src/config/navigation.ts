import { NavItemProps } from '@/features';

export const navigation: NavItemProps[] = [
  {
    label: 'Inicio',
    href: '/',
  },
  {
    label: 'Sismos hoy',
    href: '/sismos/hoy',
  },
  {
    label: 'Listado de sismos',
    href: '/sismos',
  },
  {
    label: 'Estadísticas',
    href: '/sismos/estadisticas',
  },
  {
    label: 'Alerta sísmica',
    href: '/alerta-sismica',
  },
];

export const footerNavigation: NavItemProps[] = [
  {
    label: 'Sismos hoy',
    href: '/sismos/hoy',
  },
  {
    label: 'Acerca de',
    href: '/acerca-de',
  },
  {
    label: 'Legal',
    href: '/legal',
  },
];
