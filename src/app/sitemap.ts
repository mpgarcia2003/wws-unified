import type { MetadataRoute } from 'next';
import { ALL_SHAPE_SLUGS } from './(storefront)/shades/shapeData';
import { ALL_BLOG_SLUGS } from './(storefront)/blog/blogData';

const BASE = 'https://worldwideshades.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* ── Core pages ── */
  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/shades`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  /* ── Shape landing pages ── */
  const shapes: MetadataRoute.Sitemap = ALL_SHAPE_SLUGS.map((slug) => ({
    url: `${BASE}/shades/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  /* ── Blog posts ── */
  const blogs: MetadataRoute.Sitemap = ALL_BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [...core, ...shapes, ...blogs];
}
