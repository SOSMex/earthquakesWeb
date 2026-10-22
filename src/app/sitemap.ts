import { MetadataRoute } from 'next';
import { loadRecentEarthquakes } from '@/lib/earthquake-page';
import { getCanonicalSiteUrl } from '@/lib/seo';

export const revalidate = 60;

const ABOUT_LASTMOD = '2026-03-11T06:29:52.000Z';
const LEGAL_LASTMOD = '2023-12-13T04:36:28.000Z';
const ALERTA_LASTMOD = '2026-10-21T06:00:00.000Z';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getCanonicalSiteUrl();
  const earthquakes = await loadRecentEarthquakes(50);
  const newestQuake = earthquakes
    .map((earthquake) => earthquake.isoDate)
    .filter(Boolean)
    .sort()
    .at(-1);
  const quakeLastmod = newestQuake ? new Date(newestQuake) : new Date(ALERTA_LASTMOD);

  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: quakeLastmod,
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${baseUrl}/sismos`,
      lastModified: quakeLastmod,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sismos/hoy`,
      lastModified: quakeLastmod,
      changeFrequency: 'hourly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/sismos/estadisticas`,
      lastModified: quakeLastmod,
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/alerta-sismica`,
      lastModified: new Date(ALERTA_LASTMOD),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/acerca-de`,
      lastModified: new Date(ABOUT_LASTMOD),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date(LEGAL_LASTMOD),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  earthquakes.forEach((earthquake) => {
    pages.push({
      url: `${baseUrl}/sismos/${earthquake.id}`,
      lastModified: earthquake.isoDate ? new Date(earthquake.isoDate) : quakeLastmod,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return pages;
}
