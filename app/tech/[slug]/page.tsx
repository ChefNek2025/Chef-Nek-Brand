import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { getProject, projects } from '@/content/projects';
import { Reveal } from '@/components/motion';
import { TechBadge } from '@/components/ui';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/tech/[slug]'>): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.title} — Case Study`, description: p.description, alternates: { canonical: `/tech/${p.slug}` } } : {};
}

export default async function ProjectPage({ params }: PageProps<'/tech/[slug]'>) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return (
    <article className="container-x pt-32 md:pt-40">
      <Link href="/tech" className="inline-flex items-center gap-2 text-sm text-fg-2 transition hover:text-fg">
        <ArrowLeft size={16} aria-hidden /> All projects
      </Link>
      <header className="mt-8 max-w-4xl">
        <p className="eyebrow" style={{ color: p.accent }}>{p.kind}</p>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-[-0.04em]">{p.title}</h1>
        <p className="mt-6 text-xl text-fg-2">{p.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-semibold text-bg transition hover:bg-green hover:text-green-ink">
              Live demo <ArrowUpRight size={16} aria-hidden /><span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-semibold transition hover:border-green hover:text-green">
              GitHub <ArrowUpRight size={16} aria-hidden /><span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </header>

      <Reveal className="relative mt-14 aspect-[16/10] overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow)]">
        <Image src={p.image} alt={p.imageAlt} fill priority sizes="(min-width:1280px) 80rem, 100vw" className="object-cover object-top" />
      </Reveal>

      <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-12">
          {p.story.map((s) => (
            <Reveal key={s.heading}>
              <h2 className="font-display text-3xl tracking-tight">{s.heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-fg-2">{s.body}</p>
            </Reveal>
          ))}
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight">Key features</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="glass flex gap-3 rounded-2xl p-4 text-fg-2">
                  <Check size={18} className="mt-0.5 shrink-0 text-green" aria-hidden /> {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <aside className="h-fit lg:sticky lg:top-28">
          <div className="glass rounded-3xl p-6">
            <h2 className="eyebrow">Technology stack</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s}><TechBadge>{s}</TechBadge></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
