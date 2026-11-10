import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { IngredientExplorer } from '@/components/explorer';
import { Reveal } from '@/components/motion';
import { SectionHeading } from '@/components/ui';
import { VideoGallery } from '@/components/videos';
import { explainers, ingredients } from '@/content/ingredients';

export const metadata: Metadata = {
  title: 'Ingrediology — The Science Behind Every Ingredient',
  description: 'Ingrediology by Chef Nek: an interactive ingredient explorer covering culinary uses, food chemistry and fun facts, in English and Amharic.',
  alternates: { canonical: '/ingrediology' },
};

export default function Ingrediology() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16 md:pt-48">
        <div aria-hidden className="absolute right-[-10%] top-20 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_65%)]" />
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Ingrediology by Chef Nek"
            title={
              <>
                Discover the science <br className="hidden md:block" />
                <span className="italic text-green">behind every ingredient.</span>
              </>
            }
            intro="Food, chemistry and culture in one place. Search the library, switch between English and አማርኛ, and learn what really happens in the pan."
          />
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Featured ingredients">
            {ingredients.map((i) => (
              <li key={i.id} className="glass rounded-full px-4 py-2 text-sm">
                <span aria-hidden>{i.emoji}</span> {i.name} <span className="text-fg-3" lang="am">· {i.am}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="explorer" aria-labelledby="explorer-h" className="container-x py-8">
        <h2 id="explorer-h" className="sr-only">Ingredient explorer</h2>
        <Reveal>
          <IngredientExplorer />
        </Reveal>
      </section>

      <section aria-labelledby="explainers" className="container-x py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Quick explainers</p>
            <h2 id="explainers" className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] tracking-[-0.03em]">Kitchen science, in minutes</h2>
          </div>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {explainers.map((e, i) => {
            const ing = ingredients.find((x) => x.id === e.id)!;
            return (
              <Reveal as="li" key={e.title} delay={(i % 3) * 0.08}>
                <Link href="#explorer" className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition hover:border-line-strong">
                  <span aria-hidden className="absolute -right-6 -top-6 text-8xl opacity-20 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">{ing.emoji}</span>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: ing.hue }}>{e.kicker}</p>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">{e.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm text-fg-2">{ing.chemistry[0]}</p>
                  <span className="mt-6 flex items-center justify-between text-xs text-fg-3">
                    <span className="flex items-center gap-1.5"><Clock size={13} aria-hidden /> {e.minutes} min read</span>
                    <ArrowUpRight size={16} className="text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="ing-videos" className="container-x py-12">
        <SectionHeading id="ing-videos" eyebrow="Watch" title={<>Ingrediology <span className="italic text-gradient-gold">on video</span></>} />
        <div className="mt-12">
          <VideoGallery />
        </div>
      </section>

      <p className="container-x mt-12 text-xs text-fg-3">
        Ingrediology content is for general education only and is not medical or nutritional advice.
      </p>
    </>
  );
}
