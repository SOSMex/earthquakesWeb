import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sismos.app';
const SITE_NAME = 'Sismos México';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getSiteUrl(): string {
  return SITE_URL;
}

export function buildBreadcrumbs(items: Array<{ name: string; path: string }>): BreadcrumbItem[] {
  return items.map((item) => ({
    name: item.name,
    url: `${SITE_URL}${item.path}`,
  }));
}

export function generatePageMetadata(options: {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
}): Metadata {
  const { title, description, path, ogType = 'website' } = options;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: ogType,
      url: `${SITE_URL}${path}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: path,
    },
  };
}

export const defaultOpenGraph = {
  siteName: SITE_NAME,
  locale: 'es_MX',
  type: 'website' as const,
};
