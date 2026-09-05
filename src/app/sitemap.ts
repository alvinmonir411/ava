import { MetadataRoute } from 'next';
import { getArticles, getPracticeAreas } from '@/db';
import { SITE_CONFIG } from '@/lib/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const articles = await getArticles();
  const practiceAreas = await getPracticeAreas();

  const staticRoutes = [
    '',
    '/about',
    '/practices',
    '/our-team',
    '/articles',
    '/faq',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const practiceRoutes = practiceAreas.map((p) => ({
    url: `${baseUrl}/practices/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...practiceRoutes, ...articleRoutes];
}
