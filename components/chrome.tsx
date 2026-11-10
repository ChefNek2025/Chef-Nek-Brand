'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring, MotionConfig } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUp, Menu, Moon, Sun, X } from 'lucide-react';
import { nav } from '@/content/site';
import { Logo } from './ui';

export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-green via-gold to-gold"
      style={{ scaleX }}
    />
  );
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);
  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as 'dark' | 'light') ?? 'dark');
  }, []);
  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch {}
        setTheme(next);
      }}
      className={`grid size-10 place-items-center rounded-full border border-line text-fg-2 transition hover:border-green hover:text-green ${className}`}
      aria-label={theme ? `Switch to ${next} theme` : 'Toggle theme'}
    >
      {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); menuBtn.current?.focus(); }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`container-x mt-3 flex h-16 items-center justify-between rounded-full transition-all duration-500 ${
          scrolled || open ? 'glass shadow-[var(--shadow)] md:max-w-[min(80rem,calc(100%-2rem))]' : 'border border-transparent'
        }`}
      >
        <Link href="/" className="flex items-center gap-3 rounded-full" aria-label="Chef Nek — home">
          <Logo />
          <span className="font-display text-lg font-semibold tracking-tight">
            Chef <span className="text-gradient-gold">Nek</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((l) => {
            const active = path.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${active ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}
              >
                {active && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-green-soft" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition hover:bg-gold hover:text-[#080b12] md:inline-block"
          >
            Get in touch
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 -z-10 flex flex-col bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1">
              {[{ href: '/', label: 'Home' }, ...nav].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i, duration: 0.5 }}>
                  <Link
                    href={l.href}
                    aria-current={path === l.href ? 'page' : undefined}
                    className="flex items-baseline justify-between border-b border-line py-4 font-display text-4xl tracking-tight"
                  >
                    {l.label}
                    <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="text-sm text-fg-2">Chef · Creator · Educator · Developer</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
          className="glass fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full text-fg shadow-[var(--shadow)] transition hover:text-green"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
