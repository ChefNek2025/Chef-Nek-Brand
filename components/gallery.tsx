'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { dishCategories, type Dish } from '@/content/dishes';
import { DishCard, DishVisual } from './cards';
import { DraftBadge } from './ui';

export function Gallery({ dishes }: { dishes: Dish[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === 'All' ? dishes : dishes.filter((d) => d.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter dishes by category" className="-mx-1 mb-10 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
        {['All', ...dishCategories].map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c)}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                active ? 'border-transparent text-green-ink' : 'border-line text-fg-2 hover:border-line-strong hover:text-fg'
              }`}
            >
              {active && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-green" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="relative">{c}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? 'dish' : 'dishes'}
      </p>

      <motion.ul layout className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
        <AnimatePresence mode="popLayout">
          {shown.map((d, i) => (
            <motion.li
              key={d.slug}
              layout
              className="break-inside-avoid"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <DishCard d={d} index={i} onOpen={() => setOpen(i)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}

function Lightbox({ items, index, onClose, onIndex }: { items: Dish[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (dir: 1 | -1) => index !== null && onIndex((index + dir + items.length) % items.length),
    [index, items.length, onIndex],
  );
  const goRef = useRef(go);
  const closeFn = useRef(onClose);
  goRef.current = go;
  closeFn.current = onClose;

  useEffect(() => {
    if (index === null) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFn.current();
      if (e.key === 'ArrowRight') goRef.current(1);
      if (e.key === 'ArrowLeft') goRef.current(-1);
      if (e.key === 'Tab') {
        const f = document.querySelectorAll<HTMLElement>('#lightbox button, #lightbox a');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('keydown', key);
      document.body.style.overflow = '';
      lastFocus.current?.focus();
    };
  }, [index === null]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;
  const d = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {d && (
        <motion.div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${d.title} — image ${index! + 1} of ${items.length}`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#05070c]/92 p-4 backdrop-blur-xl sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="relative grid w-full max-w-6xl items-center gap-6 text-[#f8fafc] lg:grid-cols-[1.4fr_1fr]">
            <motion.div
              key={d.slug}
              className="relative aspect-square max-h-[70vh] w-full overflow-hidden rounded-3xl border border-white/10 lg:aspect-[4/3.4]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <DishVisual d={d} />
            </motion.div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">{d.category}</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight">{d.title}</h2>
              {d.draft && <div className="mt-3"><DraftBadge label="Sample — replace with real dish" /></div>}
              <p className="mt-4 text-[#cbd5e1]">{d.blurb}</p>
              <Link href={`/kitchen/${d.slug}`} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#f8fafc] px-5 text-sm font-semibold text-[#080b12] transition hover:bg-[#D4AF37]">
                View dish details
              </Link>
              <p className="mt-6 font-mono text-xs text-[#94a3b8]">
                {index! + 1} / {items.length} · ← → to browse · Esc to close
              </p>
            </div>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#4ADE80] hover:text-[#4ADE80]">
            <X size={20} />
          </button>
          <button type="button" onClick={() => go(-1)} aria-label="Previous dish" className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#4ADE80] sm:grid">
            <ChevronLeft size={22} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next dish" className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-white transition hover:border-[#4ADE80] sm:grid">
            <ChevronRight size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
