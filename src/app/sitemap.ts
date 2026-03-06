import type { MetadataRoute } from 'next';
import { ALL_SHAPE_SLUGS } from './(storefront)/shades/shapeData';
import { ALL_BLOG_SLUGS } from './(storefront)/blog/blogData';
import { CITIES, PRODUCTS } from '@/data/cities';
import { STATES } from '@/data/states';

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

  /* ── /pages/* landing pages ── */
  const landingPages: MetadataRoute.Sitemap = [
    'triangle-shades', 'trapezoid-shades', 'hexagon-shades', 'pentagon-shades',
    'blackout-shades', 'solar-roller-shades', 'motorized-shades',
    'exterior-shades', 'specialty-shades', 'faq', 'contact',
  ].map((handle) => ({
    url: `${BASE}/pages/${handle}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  /* ── Shape landing pages (/shades/[shape]) ── */
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

  /* ── City × Product pages (2,040 pages) ── */
  const citySlugs = new Set(CITIES.map((c) => c.slug));
  const cityPages: MetadataRoute.Sitemap = [];
  for (const city of CITIES) {
    for (const product of PRODUCTS) {
      cityPages.push({
        url: `${BASE}/shades/${city.slug}/${product.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: city.populationTier === 'major' ? 0.7 : city.populationTier === 'large' ? 0.6 : 0.5,
      });
    }
  }

  /* ── State × Product pages (up to 600 pages) ── */
  const statePages: MetadataRoute.Sitemap = [];
  for (const state of STATES) {
    if (citySlugs.has(state.slug)) continue; // city takes priority for conflicts
    for (const product of PRODUCTS) {
      statePages.push({
        url: `${BASE}/shades/${state.slug}/${product.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.55,
      });
    }
  }

  return [...core, ...landingPages, ...shapes, ...blogs, ...cityPages, ...statePages];
}
