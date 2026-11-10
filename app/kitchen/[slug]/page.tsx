import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { dishes, getDish } from '@/content/dishes';
import { DishVisual } from '@/components/cards';
import { DraftBadge, Button } from '@/components/ui';
import { Reveal } from '@/components/motion';

export function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/kitchen/[slug]'>): Promise<Metadata> {
  const d = getDish((await params).slug);
  return d ? { title: d.title, description: d.blurb, alternates: { canonical: `/kitchen/${d.slug}` } } : {};
}

export default async function DishPage({ params }: PageProps<'/kitchen/[slug]'>) {
  const d = getDish((await params).slug);
  if (!d) notFound();
  const others = dishes.filter((x) => x.slug !== d.slug).slice(0, 3);
  const recipeLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: d.title,
    description: d.blurb,
    author: { '@type': 'Person', name: 'Chef Nek' },
    recipeCategory: d.category,
    recipeIngredient: d.ingredients,
    recipeInstructions: d.method?.map((t) => ({ '@type': 'HowToStep', text: t })),
  };
  return (
    <article className="container-x pt-32 md:pt-40">
      {!d.draft && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeLd).replace(/</g, '\\u003c') }} />}
      <Link href="/kitchen" className="inline-flex items-center gap-2 text-sm text-fg-2 transition hover:text-fg">
        <ArrowLeft size={16} aria-hidden /> All dishes
      </Link>
      <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line lg:sticky lg:top-28">
          <DishVisual d={d} />
        </Reveal>
        <div>
          <p className="eyebrow">{d.category}</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1] tracking-[-0.03em]">{d.title}</h1>
          {d.draft && <div className="mt-4"><DraftBadge label="Sample — replace in content/dishes.ts" /></div>}
          <p className="mt-6 text-lg text-fg-2">{d.blurb}</p>

          <section aria-labelledby="ing" className="glass mt-10 rounded-3xl p-6">
            <h2 id="ing" className="font-display text-2xl">Ingredients</h2>
            <ul className="mt-4 space-y-2 text-fg-2">
              {(d.ingredients ?? ['Ingredient list coming soon']).map((x) => (
                <li key={x} className="flex gap-3 border-b border-line pb-2 last:border-0"><span className="text-gold" aria-hidden>—</span>{x}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="method" className="glass mt-4 rounded-3xl p-6">
            <h2 id="method" className="font-display text-2xl">Preparation</h2>
            <ol className="mt-4 space-y-3 text-fg-2">
              {(d.method ?? ['Preparation notes coming soon']).map((x, i) => (
                <li key={x} className="flex gap-4"><span className="font-mono text-sm text-green">{String(i + 1).padStart(2, '0')}</span>{x}</li>
              ))}
            </ol>
          </section>
          <div className="mt-8"><Button href="/contact" variant="gold">Book a culinary collaboration</Button></div>
        </div>
      </div>

      <section aria-labelledby="more" className="mt-28">
        <h2 id="more" className="font-display text-3xl tracking-tight">More from the kitchen</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/kitchen/${o.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-line">
                  <DishVisual d={o} className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-3 font-semibold">{o.title}</p>
                <p className="text-sm text-fg-3">{o.category}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
