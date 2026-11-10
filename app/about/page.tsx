import type { Metadata } from 'next';
import { Reveal } from '@/components/motion';
import { Button, DraftBadge, SectionHeading } from '@/components/ui';
import { Timeline } from '@/components/timeline';
import { timeline } from '@/content/timeline';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'The journey of Chef Nek — from DMV kitchens to Chef Nek Pro, Hire & Train and Ingrediology.',
  alternates: { canonical: '/about' },
};

const values = [
  { k: 'Mise en place', v: 'Preparation is everything — in a kitchen, a classroom or a codebase.' },
  { k: 'Built from the line', v: 'Every tool and lesson comes from real service, not theory.' },
  { k: 'Share the knowledge', v: 'Training cooks and teaching food science lifts the whole industry.' },
];

export default function About() {
  return (
    <>
      <section className="container-x pt-40 pb-16 md:pt-48">
        <SectionHeading
          as="h1"
          eyebrow="About Chef Nek"
          title={
            <>
              From the line <span className="italic text-gradient-gold">to the platform.</span>
            </>
          }
          intro={`A chef based in the ${site.location}, building tools, training cooks and teaching the science of food.`}
        />
        <div className="mt-6">
          <DraftBadge label="Add your full bio in content/timeline.ts" />
        </div>
      </section>

      <section aria-label="Values" className="container-x pb-24">
        <ul className="grid gap-4 md:grid-cols-3">
          {values.map((x, i) => (
            <Reveal as="li" key={x.k} delay={i * 0.08} className="glass rounded-3xl p-7">
              <p className="font-mono text-xs text-gold">0{i + 1}</p>
              <h2 className="mt-3 font-display text-2xl tracking-tight">{x.k}</h2>
              <p className="mt-2 text-fg-2">{x.v}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="journey" className="container-x py-16">
        <div className="mb-16 text-center">
          <p className="eyebrow">The journey</p>
          <h2 id="journey" className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.03em]">
            Milestones
          </h2>
        </div>
        <Timeline items={timeline} />
      </section>

      <section className="container-x py-16 text-center">
        <Reveal>
          <p className="mx-auto max-w-2xl font-display text-3xl italic leading-snug tracking-tight md:text-4xl">
            “This is the tool we always needed.”
          </p>
          <p className="mt-4 text-sm text-fg-3">— on building Chef Nek Pro, from chefnekpro.com</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/tech" variant="gold">See the projects</Button>
            <Button href="/contact">Work with me</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
