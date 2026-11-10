import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { BackToTop, Nav, Providers, ScrollProgress } from '@/components/chrome';
import { Footer } from '@/components/ui';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', style: ['normal', 'italic'], display: 'swap' });
const inter = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', weight: ['400', '500'], display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s · Chef Nek' },
  description: site.description,
  applicationName: 'Chef Nek',
  authors: [{ name: 'Chef Nek' }],
  keywords: ['Chef Nek', 'chef', 'DMV chef', 'Ingrediology', 'food science', 'Chef Nek Pro', 'culinary', 'web developer'],
  openGraph: { type: 'website', siteName: 'Chef Nek', title: site.title, description: site.description, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#080B12' },
    { media: '(prefers-color-scheme: light)', color: '#F7F5F0' },
  ],
  viewportFit: 'cover',
};

// Runs before paint so the stored theme never flashes. Dark is the default.
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}`;

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chef Nek',
  jobTitle: ['Chef', 'Food Educator', 'Web Developer'],
  description: site.description,
  url: site.url,
  homeLocation: { '@type': 'Place', name: site.location },
  founder: [
    { '@type': 'Organization', name: 'Chef Nek Pro', url: 'https://chefnekpro.com' },
    { '@type': 'Organization', name: 'Chef Nek Hire & Train', url: 'https://chefnekpro.com/hire' },
  ],
  sameAs: Object.values(site.socials).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, '\\u003c') }} />
      </head>
      <body>
        <a href="#main" className="sr-only z-[70] rounded-full bg-gold px-4 py-2 font-semibold text-[#080b12] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <div className="ambient" aria-hidden />
        <Providers>
          <ScrollProgress />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
