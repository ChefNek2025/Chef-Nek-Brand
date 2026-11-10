'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  AnimatePresence,
  type HTMLMotionProps,
} from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

/** Fade/slide a block in when it scrolls into view (once). */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Word-by-word headline reveal. Text stays readable for screen readers. */
export function SplitReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      aria-label={text}
      role="text"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] pr-[0.05em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 1, ease } } }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Cycles through roles with a vertical slide. */
export function RotatingWords({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className="relative inline-grid h-[1.25em] items-center overflow-hidden pr-[0.1em]" aria-hidden>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={reduce ? { opacity: 0 } : { y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Animated number counter that starts when visible. */
export function Counter({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setVal(to);
    const c = animate(0, to, { duration: 1.8, ease, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {val}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
}

const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Magnetic hover — desktop with a fine pointer only. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  return (
    <motion.div
      ref={ref}
      className={className ?? 'inline-block'}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || !finePointer() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Subtle 3D tilt with a moving highlight. */
export function Tilt({
  children,
  className,
  max = 7,
  ...rest
}: { children: ReactNode; className?: string; max?: number } & HTMLMotionProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });
  const glow = useTransform(
    [px, py] as never,
    ([a, b]: number[]) => `radial-gradient(500px circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,0.10), transparent 45%)`,
  );
  return (
    <motion.div
      ref={ref}
      className={`relative [transform-style:preserve-3d] ${className ?? ''}`}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (reduce || !finePointer() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      {...rest}
    >
      {children}
      {!reduce && (
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glow }} />
      )}
    </motion.div>
  );
}
