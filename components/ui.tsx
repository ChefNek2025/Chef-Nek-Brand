import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site, nav } from '@/content/site';

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="relative grid place-items-center rounded-xl border border-gold/40 bg-gradient-to-br from-[#1b2333] to-[#080b12]"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} fill="none" stroke="url(#lg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F5E6A8" />
            <stop offset="1" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        <path d="M6.5 13.5V19a1 1 0 001 1h9a1 1 0 001-1v-5.5" />
        <path d="M6.5 13.5a4 4 0 01-.2-7.9A5.5 5.5 0 0112 2.5a5.5 5.5 0 015.7 3.1 4 4 0 01-.2 7.9z" />
        <path d="M6.5 16.5h11" />
      </svg>
    </span>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: 'gold' | 'green' | 'ghost'; className?: string; external?: boolean };
export function Button({ href, children, variant = 'ghost', className = '', external }: BtnProps) {
  const styles = {
    gold: 'bg-gradient-to-br from-[#F5E6A8] via-[#D4AF37] to-[#A8841F] text-[#080b12] shadow-[0_10px_40px_-10px_rgba(212,175,55,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(212,175,55,0.75)]',
    green: 'bg-green text-green-ink shadow-[0_10px_40px_-12px_var(--glow-green)] hover:brightness-110',
    ghost: 'glass text-fg hover:border-green hover:text-green',
  }[variant];
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide transition-all duration-300 ${styles} ${className}`;
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: H = 'h2',
  id,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow mb-5 flex items-center gap-3 data-[c=true]:justify-center" data-c={align === 'center'}>
        <span className="h-px w-8 bg-gold" aria-hidden />
        {eyebrow}
      </p>
      <H id={id} className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">{title}</H>
      {intro && <p className="mt-6 text-lg leading-relaxed text-fg-2">{intro}</p>}
    </div>
  );
}

export function DraftBadge({ label = 'Placeholder' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold/60 bg-gold-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
      <span className="size-1.5 rounded-full bg-gold" aria-hidden />
      {label}
    </span>
  );
}

export function TechBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-bg-2/60 px-3 py-1 font-mono text-[11px] tracking-wide text-fg-2">{children}</span>
  );
}

/** Artwork shown until a real dish photo exists: an overhead "plated" composition. */
export function DishArt({ palette, seed, label }: { palette: [string, string, string]; seed: string; label: string }) {
  const [bg, main, garnish] = palette;
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = (n: number) => ((h = (h * 1103515245 + 12345) >>> 0) % 1000) / 1000 * n;
  const dots = Array.from({ length: 9 }, () => ({ x: 130 + rnd(140), y: 130 + rnd(140), r: 3 + rnd(7) }));
  const id = `g-${seed}`;
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={label} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="45%" r="75%">
          <stop offset="0" stopColor={bg} />
          <stop offset="1" stopColor="#05070c" />
        </radialGradient>
        <radialGradient id={`${id}-plate`} cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#f8fafc" stopOpacity="0.16" />
          <stop offset="1" stopColor="#f8fafc" stopOpacity="0.03" />
        </radialGradient>
        <radialGradient id={`${id}-main`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor={main} />
          <stop offset="1" stopColor={main} stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-bg)`} />
      <circle cx="200" cy="200" r="150" fill={`url(#${id}-plate)`} stroke="#f8fafc" strokeOpacity="0.12" />
      <circle cx="200" cy="200" r="118" fill="none" stroke="#f8fafc" strokeOpacity="0.06" />
      <ellipse cx={190 + rnd(20)} cy={195 + rnd(15)} rx={62 + rnd(18)} ry={48 + rnd(14)} fill={`url(#${id}-main)`} transform={`rotate(${rnd(60) - 30} 200 200)`} />
      <path d={`M${120 + rnd(30)} ${250 + rnd(20)} Q 200 ${210 + rnd(40)} ${270 + rnd(20)} ${150 + rnd(30)}`} stroke={garnish} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={i % 3 ? garnish : '#f8fafc'} opacity={i % 3 ? 0.85 : 0.5} />
      ))}
    </svg>
  );
}

const SocialPaths: Record<string, string> = {
  youtube: 'M23 7.2a3 3 0 00-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 001 7.2 31 31 0 00.6 12a31 31 0 00.4 4.8 3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-4.8 31 31 0 00-.4-4.8zM9.7 15.1V8.9l5.8 3.1z',
  tiktok: 'M16.6 5.8A4.3 4.3 0 0115.5 3h-3.1v12.4a2.6 2.6 0 11-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 105 5.7V9.1a7.3 7.3 0 004.3 1.4V7.4a4.3 4.3 0 01-3.3-1.6z',
  instagram: 'M12 7.3A4.7 4.7 0 1016.7 12 4.7 4.7 0 0012 7.3zm0 7.7a3 3 0 113-3 3 3 0 01-3 3zm6-7.9a1.1 1.1 0 11-1.1-1.1A1.1 1.1 0 0118 7.1zM21.9 8.2a7 7 0 00-1.9-4.9A7 7 0 0015 1.4C13.1 1.3 10.9 1.3 9 1.4a7 7 0 00-4.9 1.9A7 7 0 002.1 8.2c-.1 1.9-.1 4.1 0 6a7 7 0 001.9 4.9A7 7 0 009 21c1.9.1 4.1.1 6 0a7 7 0 004.9-1.9 7 7 0 001.9-4.9c.1-1.9.1-4.1.1-6z',
  github: 'M12 .5a11.5 11.5 0 00-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5a3 3 0 00-1.3-1.7c-1-.7.1-.7.1-.7a2.4 2.4 0 011.8 1.2 2.4 2.4 0 003.3 1 2.4 2.4 0 01.7-1.5c-2.6-.3-5.3-1.3-5.3-5.7a4.5 4.5 0 011.2-3.1 4.2 4.2 0 01.1-3.1s1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2a4.2 4.2 0 01.1 3.1 4.5 4.5 0 011.2 3.1c0 4.4-2.7 5.4-5.3 5.7a2.7 2.7 0 01.8 2.1v3.1c0 .4.2.7.8.6A11.5 11.5 0 0012 .5z',
  linkedin: 'M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6a3.8 3.8 0 013.4-1.9c3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 112.1-2.1 2.1 2.1 0 01-2.1 2.1zM7.1 20.5H3.6V9h3.5zM22.2 0H1.8A1.8 1.8 0 000 1.7v20.6A1.8 1.8 0 001.8 24h20.4a1.8 1.8 0 001.8-1.7V1.7A1.8 1.8 0 0022.2 0z',
};

export function SocialIcon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d={SocialPaths[name]} />
    </svg>
  );
}

export function SocialLinks({ className = '' }: { className?: string }) {
  const entries = Object.entries(site.socials).filter(([, url]) => url);
  if (!entries.length) return null;
  return (
    <ul className={`flex gap-2 ${className}`}>
      {entries.map(([name, url]) => (
        <li key={name}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-full border border-line text-fg-2 transition hover:border-green hover:text-green"
            aria-label={`Chef Nek on ${name}`}
          >
            <SocialIcon name={name} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <span className="font-display text-2xl">
              Chef <span className="text-gradient-gold">Nek</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-fg-2">{site.intro}</p>
          <SocialLinks className="mt-6" />
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5">
            {nav.map((l) => (
              <li key={l.href}>
                <Link className="text-fg-2 transition hover:text-fg" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4">Ventures</p>
          <ul className="space-y-2.5 text-fg-2">
            <li>
              <a className="inline-flex items-center gap-1 transition hover:text-fg" href="https://chefnekpro.com" target="_blank" rel="noopener noreferrer">
                Chef Nek Pro <ArrowUpRight size={14} aria-hidden />
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-1 transition hover:text-fg" href="https://chefnekpro.com/hire" target="_blank" rel="noopener noreferrer">
                Hire &amp; Train <ArrowUpRight size={14} aria-hidden />
              </a>
            </li>
            <li>
              <Link className="transition hover:text-fg" href="/ingrediology">
                Ingrediology
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 text-sm text-fg-3 sm:flex-row">
        <p>© {new Date().getFullYear()} Chef Nek. All rights reserved.</p>
        <p>From Struggling to Thriving.</p>
      </div>
    </footer>
  );
}
