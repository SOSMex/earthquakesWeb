import { Metadata } from 'next';

export const CANONICAL_SITE_URL = 'https://sismosmx.app';
const SITE_NAME = 'Sismos MX';
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

const OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Sismos MX',
};

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getCanonicalSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;

  try {
    const url = new URL(raw);
    url.protocol = 'https:';
    url.hostname = url.hostname.replace(/^www\./, '');
    return url.origin;
  } catch {
    return CANONICAL_SITE_URL;
  }
}

export function getSiteUrl(): string {
  return getCanonicalSiteUrl();
}

export function buildBreadcrumbs(items: Array<{ name: string; path: string }>): BreadcrumbItem[] {
  const siteUrl = getCanonicalSiteUrl();
  return items.map((item) => ({
    name: item.name,
    url: `${siteUrl}${item.path}`,
  }));
}

export function withBrandTitle(title: string): string {
  if (title.includes(TITLE_SUFFIX) || title.endsWith(SITE_NAME)) return title;
  return `${title}${TITLE_SUFFIX}`;
}

export function fitText(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function fitDescription(text: string, max = 155): string {
  return fitText(text, max);
}

/** Page title before the layout suffix " | Sismos MX" (12 characters). */
export function fitTitle(text: string, max = 48): string {
  return fitText(text, max);
}

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  image?: string;
}): Metadata {
  const {
    title, description, path, ogType = 'website', image,
  } = options;
  const fullTitle = withBrandTitle(title);
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: fullTitle }]
    : [OG_IMAGE];

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: path,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((item) => item.url),
    },
    alternates: {
      canonical: path,
    },
  };
}

export function generatePageMetadata(options: {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
}): Metadata {
  return pageMetadata(options);
}

export const defaultOpenGraph = {
  siteName: 'Sismos México',
  locale: 'es_MX',
  type: 'website' as const,
};
