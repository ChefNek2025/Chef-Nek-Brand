'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/content/projects';
import type { Dish } from '@/content/dishes';
import { Tilt } from './motion';
import { DishArt, DraftBadge, SocialIcon, TechBadge } from './ui';

export function ProjectCard({ p, priority }: { p: Project; priority?: boolean }) {
  return (
    <Tilt className="group h-full rounded-[1.75rem]">
      <article className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface-solid/80 shadow-[var(--shadow)]">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            priority={priority}
            sizes="(min-width:1024px) 40rem, 100vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#080b12]/70 via-transparent" />
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#080b12]"
            style={{ background: p.accent }}
          >
            {p.kind}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7 [transform:translateZ(30px)]">
          <h3 className="font-display text-3xl tracking-tight">
            <Link href={`/tech/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {p.title}
            </Link>
          </h3>
          <p className="mt-3 text-fg-2">{p.description}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {p.stack.slice(0, 6).map((s) => (
              <li key={s}>
                <TechBadge>{s}</TechBadge>
              </li>
            ))}
          </ul>
          <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-7">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-fg px-5 text-sm font-semibold text-bg transition hover:bg-green hover:text-green-ink"
              >
                Live demo <ArrowUpRight size={15} aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold transition hover:border-green hover:text-green"
              >
                <SocialIcon name="github" size={15} /> GitHub
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-line px-5 text-sm text-fg-3">
                <SocialIcon name="github" size={15} /> Private repo
              </span>
            )}
            <Link
              href={`/tech/${p.slug}`}
              className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold text-gold transition hover:text-fg"
            >
              Case study →
            </Link>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export function DishVisual({ d, className = '' }: { d: Dish; className?: string }) {
  return d.image ? (
    <Image src={d.image} alt={d.title} fill sizes="(min-width:1024px) 33vw, 90vw" className={`object-cover ${className}`} />
  ) : (
    <div className={`absolute inset-0 ${className}`}>
      <DishArt palette={d.palette} seed={d.slug} label={`Artwork placeholder for ${d.title}`} />
    </div>
  );
}

export function DishCard({ d, onOpen, index }: { d: Dish; onOpen?: () => void; index?: number }) {
  const aspect = { tall: 'aspect-[3/4]', square: 'aspect-square', wide: 'aspect-[4/3]' }[d.aspect];
  return (
    <figure className={`group relative overflow-hidden rounded-3xl border border-line bg-bg-2 ${aspect}`}>
      <DishVisual d={d} className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#05070c]/90 via-[#05070c]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      {d.draft && (
        <div className="absolute right-3 top-3">
          <DraftBadge label="Sample" />
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-[#f8fafc] transition-transform duration-500 group-hover:translate-y-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
          {index !== undefined ? `${String(index + 1).padStart(2, '0')} · ` : ''}
          {d.category}
        </p>
        <p className="mt-1 font-display text-2xl leading-tight tracking-tight">{d.title}</p>
        <p className="mt-1 line-clamp-2 max-h-0 text-sm text-[#cbd5e1] opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100 group-focus-within:max-h-12 group-focus-within:opacity-100">
          {d.blurb}
        </p>
      </figcaption>
      {onOpen && (
        <button type="button" onClick={onOpen} className="absolute inset-0 rounded-3xl" aria-label={`View ${d.title} full screen`} />
      )}
    </figure>
  );
}
