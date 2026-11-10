'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { ArrowDown, ArrowRight, FlaskConical, Mail } from 'lucide-react';
import { site } from '@/content/site';
import { Magnetic, RotatingWords } from './motion';
import { Button, DraftBadge } from './ui';

const floaters = [
  { x: '3%', y: '62%', s: 54, r: -18, d: 0, kind: 'leaf' },
  { x: '44%', y: '12%', s: 30, r: 12, d: 1.2, kind: 'crystal' },
  { x: '90%', y: '18%', s: 46, r: 20, d: 0.6, kind: 'molecule' },
  { x: '86%', y: '78%', s: 38, r: -10, d: 1.8, kind: 'chili' },
  { x: '12%', y: '82%', s: 34, r: 8, d: 2.4, kind: 'crystal' },
  { x: '52%', y: '88%', s: 28, r: 0, d: 0.9, kind: 'seed' },
] as const;

function Floater({ kind, size }: { kind: string; size: number }) {
  const common = { width: size, height: size, viewBox: '0 0 48 48', fill: 'none', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'leaf':
      return (
        <svg {...common} stroke="var(--green)">
          <path d="M8 40C8 20 20 8 40 8c0 20-12 32-32 32z" fill="var(--green-soft)" />
          <path d="M8 40L30 18" />
        </svg>
      );
    case 'crystal':
      return (
        <svg {...common} stroke="var(--gold)">
          <path d="M24 4l14 10v20L24 44 10 34V14z" fill="var(--gold-soft)" />
          <path d="M10 14l14 10 14-10M24 24v20" />
        </svg>
      );
    case 'molecule':
      return (
        <svg {...common} stroke="var(--fg-2)">
          <circle cx="12" cy="14" r="5" />
          <circle cx="36" cy="12" r="4" />
          <circle cx="26" cy="36" r="6" fill="var(--green-soft)" stroke="var(--green)" />
          <path d="M16 16l8 15M32 15l-4 15M17 13l15-1" />
        </svg>
      );
    case 'chili':
      return (
        <svg {...common} stroke="#EF4444">
          <path d="M32 10c-2 14-10 26-24 30 8-8 14-18 16-28z" fill="rgba(239,68,68,0.15)" />
          <path d="M32 10c2-3 6-4 8-2" stroke="var(--green)" />
        </svg>
      );
    default:
      return (
        <svg {...common} stroke="var(--gold)">
          <ellipse cx="24" cy="24" rx="8" ry="14" transform="rotate(30 24 24)" fill="var(--gold-soft)" />
        </svg>
      );
  }
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '30%']);
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      {/* Cinematic lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,transparent,var(--glow-gold),transparent_40%,var(--glow-green),transparent_70%)] opacity-60 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-40" />
      </div>
      {floaters.map((f, i) => (
        <div
          key={i}
          aria-hidden
          className="float pointer-events-none absolute -z-10 hidden opacity-70 sm:block"
          style={{ left: f.x, top: f.y, animationDelay: `${f.d}s`, ['--r' as string]: `${f.r}deg` }}
        >
          <Floater kind={f.kind} size={f.s} />
        </div>
      ))}

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: yText, opacity: fade }}>
          <p className="enter eyebrow mb-6 flex items-center gap-3" style={{ ['--d' as string]: '0.05s' }}>
            <span className="h-px w-10 bg-gold" aria-hidden />
            {site.tagline}
          </p>

          <h1 id="hero-title" className="font-display text-[clamp(3.6rem,10.5vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]" aria-label="Chef Nek">
            {['CHEF', 'NEK'].map((word, w) => (
              <span key={word} aria-hidden className="mr-[0.18em] inline-block whitespace-nowrap last:mr-0">
                {word.split('').map((ch, i) => (
                  <span key={i} className="inline-block overflow-hidden pr-[0.04em] pb-[0.06em] align-bottom">
                    <span
                      className={`rise inline-block ${w === 1 ? 'text-gradient-gold italic' : ''}`}
                      style={{ ['--d' as string]: `${0.05 + (w * 5 + i) * 0.045}s` }}
                    >
                      {ch}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div
            className="enter mt-6 flex flex-wrap items-center gap-x-3 font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.25] tracking-tight text-fg-2"
            style={{ ['--d' as string]: '0.45s' }}
          >
            <span>I am a</span>
            <span className="italic text-green">
              <RotatingWords words={site.roles} />
            </span>
            <span className="sr-only">{site.roles.join(', ')}</span>
          </div>

          <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-fg-2" style={{ ['--d' as string]: '0.1s', ['--y' as string]: '6px' }}>
            {site.intro}
          </p>

          <div className="enter mt-10 flex flex-wrap gap-3" style={{ ['--d' as string]: '0.6s' }}>
            <Magnetic>
              <Button href="/kitchen" variant="gold">
                Explore My Work <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/ingrediology" variant="ghost">
                <FlaskConical size={16} aria-hidden /> Discover Ingrediology
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/contact" variant="ghost">
                <Mail size={16} aria-hidden /> Get in Touch
              </Button>
            </Magnetic>
          </div>
        </motion.div>

        {/* Portrait */}
        <motion.div style={{ y: yImg }} className="relative mx-auto w-full max-w-[26rem]">
          <div className="scale-in relative aspect-[4/5]" style={{ ['--d' as string]: '0.2s' }}>
            <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] border border-gold/30" />
            <div aria-hidden className="absolute -inset-8 rounded-[3rem] border border-line" />
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-line-strong bg-gradient-to-b from-[#1a2233] to-[#0a0e16] shadow-[var(--shadow)]">
              {site.portrait ? (
                <Image src={site.portrait} alt="Portrait of Chef Nek" fill priority sizes="(min-width:1024px) 26rem, 80vw" className="object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
                  <div className="grid size-36 place-items-center rounded-full border border-gold/50 bg-gold-soft font-display text-6xl italic text-gold">
                    CN
                  </div>
                  <DraftBadge label="Portrait goes here" />
                  <p className="max-w-[16rem] text-sm text-[#94a3b8]">Add a high-resolution portrait in <code className="font-mono text-xs">content/site.ts</code></p>
                </div>
              )}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl glass px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-fg">Chef Nek</p>
                  <p className="text-xs text-fg-2">Founder · Chef Nek Pro</p>
                </div>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-green">
                  <span className="size-2 animate-pulse rounded-full bg-green" aria-hidden /> DMV
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#pillars"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-3 transition hover:text-fg md:flex"
        aria-label="Scroll to content"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line-strong pt-1.5" aria-hidden>
          <span className="block size-1 rounded-full bg-gold [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
        </span>
        <ArrowDown size={14} className="sr-only" />
      </a>
    </section>
  );
}
