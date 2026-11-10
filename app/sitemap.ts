import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { site } from '@/content/site';
import { dishes } from '@/content/dishes';
import { projects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const pages = ['', '/about', '/kitchen', '/ingrediology', '/tech', '/media', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: 'monthly' as const, priority: p ? 0.8 : 1 })),
    ...dishes.filter((d) => !d.draft).map((d) => ({ url: `${base}/kitchen/${d.slug}`, priority: 0.6 })),
    ...projects.map((p) => ({ url: `${base}/tech/${p.slug}`, priority: 0.7 })),
  ];
}
