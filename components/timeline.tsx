'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Milestone } from '@/content/timeline';
import { DraftBadge } from './ui';

const pillarColor: Record<Milestone['pillar'], string> = {
  Culinary: '#F97316',
  Leadership: '#D4AF37',
  Education: '#38BDF8',
  Technology: '#4ADE80',
  Entrepreneurship: '#A78BFA',
};

export function Timeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 24 });
  const [open, setOpen] = useState<string | null>(items.find((i) => !i.draft)?.id ?? null);

  return (
    <ol ref={ref} className="relative mx-auto max-w-4xl">
      <div aria-hidden className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-line md:left-1/2" />
      <motion.div aria-hidden className="absolute left-[1.15rem] top-0 h-full w-px origin-top bg-gradient-to-b from-gold via-green to-green md:left-1/2" style={{ scaleY: fill }} />
      {items.map((m, i) => {
        const left = i % 2 === 0;
        const isOpen = open === m.id;
        return (
          <li key={m.id} className="relative mb-10 pl-12 md:mb-14 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
            <span
              aria-hidden
              className="absolute left-[1.15rem] top-6 size-3.5 -translate-x-1/2 rounded-full ring-4 ring-bg md:left-1/2"
              style={{ background: pillarColor[m.pillar], boxShadow: `0 0 20px ${pillarColor[m.pillar]}` }}
            />
            <motion.div
              className={left ? 'md:col-start-1' : 'md:col-start-2'}
              initial={{ opacity: 0, x: left ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <article className={`glass rounded-3xl p-6 transition-colors ${isOpen ? 'border-line-strong' : ''} ${m.draft ? 'border-dashed' : ''}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#080b12]" style={{ background: pillarColor[m.pillar] }}>
                    {m.pillar}
                  </span>
                  <span className="font-mono text-xs text-fg-3">{m.period}</span>
                  {m.draft && <DraftBadge label="Needs your details" />}
                </div>
                <h3 className="mt-3 font-display text-2xl tracking-tight">{m.title}</h3>
                <p className="mt-2 text-fg-2">{m.summary}</p>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`tl-${m.id}`}
                  onClick={() => setOpen(isOpen ? null : m.id)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition hover:text-fg"
                >
                  {isOpen ? 'Show less' : 'Read more'}
                  <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      id={`tl-${m.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      {m.details.map((d) => (
                        <li key={d} className="mt-3 flex gap-3 border-t border-line pt-3 text-sm text-fg-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: pillarColor[m.pillar] }} aria-hidden />
                          {d}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </article>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
