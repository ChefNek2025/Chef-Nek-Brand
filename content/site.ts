/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to update the whole site.
 *  Anything marked `draft: true` (or left empty) is a placeholder
 *  that still needs Chef Nek's real content. Empty social links
 *  are hidden automatically.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Chef Nek',
  title: 'Chef Nek — Where Culinary Creativity Meets Technology',
  tagline: 'Where Culinary Creativity Meets Technology',
  intro:
    'Chef. Creator. Developer. Bringing together culinary artistry, food science, and modern technology.',
  description:
    'Chef Nek is a DMV-based chef, food educator and developer — founder of Chef Nek Pro, Chef Nek Hire & Train and Ingrediology.',
  /** Set NEXT_PUBLIC_SITE_URL in Vercel once the personal domain is chosen. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  location: 'DMV (Washington, DC · Maryland · Virginia)',
  roles: ['Chef', 'Culinary Creator', 'Food Educator', 'Web Developer'],

  /** Replace with /images/portrait.jpg once uploaded to /public/images. */
  portrait: '' as string,

  /** Shown on the contact page only when filled in. */
  contactEmail: '' as string,

  /** Leave a value empty to hide that link everywhere. Never guess these. */
  socials: {
    youtube: '',
    tiktok: '',
    instagram: '',
    github: '',
    linkedin: '',
  } as Record<'youtube' | 'tiktok' | 'instagram' | 'github' | 'linkedin', string>,
};

export const nav = [
  { href: '/about', label: 'About' },
  { href: '/kitchen', label: 'Kitchen' },
  { href: '/ingrediology', label: 'Ingrediology' },
  { href: '/tech', label: 'Tech' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Verified from chefnekpro.com (Nov 2026). Add real career numbers here. */
export const stats = [
  { value: 3, suffix: '', label: 'Brands founded', note: 'Chef Nek Pro · Hire & Train · Ingrediology' },
  { value: 12, suffix: '+', label: 'Kitchen tools in one platform', note: 'Chef Nek Pro' },
  { value: 7, suffix: '', label: 'Kitchen roles trained', note: 'Hire & Train programs' },
  { value: 2, suffix: '', label: 'Training tracks', note: 'Online & in-person' },
];
