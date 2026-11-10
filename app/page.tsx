import Link from 'next/link';
import { ArrowRight, ChefHat, Code2, FlaskConical } from 'lucide-react';
import { Hero } from '@/components/hero';
import { Counter, Reveal, SplitReveal, Tilt } from '@/components/motion';
import { Button, DraftBadge, SectionHeading } from '@/components/ui';
import { DishCard, ProjectCard } from '@/components/cards';
import { IngredientExplorer } from '@/components/explorer';
import { stats } from '@/content/site';
import { dishes } from '@/content/dishes';
import { projects } from '@/content/projects';

const pillars = [
  {
    icon: ChefHat,
    title: 'Culinary',
    body: 'Kitchen leadership in the DMV — flavour, technique and the discipline of a busy service.',
    href: '/kitchen',
    cta: 'See the kitchen',
    color: '#F59E0B',
  },
  {
    icon: FlaskConical,
    title: 'Ingrediology',
    body: 'The science behind every ingredient, taught in English and Amharic.',
    href: '/ingrediology',
    cta: 'Explore ingredients',
    color: '#38BDF8',
  },
  {
    icon: Code2,
    title: 'Technology',
    body: 'Software built from the line — Chef Nek Pro runs kitchens on real-time data.',
    href: '/tech',
    cta: 'View projects',
    color: '#4ADE80',
  },
];

export default function Home() {
  const featured = dishes.filter((d) => d.featured);
  return (
    <>
      <Hero />

      {/* Stats + pillars */}
      <section id="pillars" aria-labelledby="pillars-title" className="container-x py-24 md:py-32">
        <div className="hairline mb-16" />
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Counter to={s.value} suffix={s.suffix} className="font-display text-6xl tracking-tight text-gradient-gold md:text-7xl" />
                <p className="mt-2 font-semibold">{s.label}</p>
                <p className="text-sm text-fg-3">{s.note}</p>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-28">
          <SectionHeading
            id="pillars-title"
            eyebrow="Three crafts, one table"
            title={
              <>
                <SplitReveal text="Cooking, teaching" /> <br className="hidden sm:block" />
                <span className="italic text-gradient-gold">
                  <SplitReveal text="and building." delay={0.2} />
                </span>
              </>
            }
            intro="Every project starts in the kitchen. The same instincts that run a service — mise en place, timing, taste — shape how I teach food science and how I write software."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.1}>
                <Tilt className="h-full rounded-3xl">
                  <Link href={p.href} className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition hover:border-line-strong">
                    <span aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50" style={{ background: p.color }} />
                    <span className="grid size-12 place-items-center rounded-2xl border border-line" style={{ color: p.color }}>
                      <p.icon size={22} aria-hidden />
                    </span>
                    <h3 className="mt-8 font-display text-3xl tracking-tight">{p.title}</h3>
                    <p className="mt-3 flex-1 text-fg-2">{p.body}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: p.color }}>
                      {p.cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured dishes */}
      <section aria-labelledby="dishes-title" className="relative py-24 md:py-32">
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">From the pass</p>
            <h2 id="dishes-title" className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">
              Featured <span className="italic text-gradient-gold">plates</span>
            </h2>
            {featured.some((d) => d.draft) && (
              <div className="mt-4">
                <DraftBadge label="Sample dishes — add real photos" />
              </div>
            )}
          </div>
          <Button href="/kitchen">
            Full culinary portfolio <ArrowRight size={16} aria-hidden />
          </Button>
        </div>
        <ul className="container-x mt-12 grid snap-x snap-mandatory auto-cols-[82%] grid-flow-col gap-5 overflow-x-auto pb-4 [scrollbar-width:none] sm:auto-cols-[46%] lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible">
          {featured.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={i * 0.1} className="snap-start">
              <Link href={`/kitchen/${d.slug}`} className="block rounded-3xl" aria-label={`${d.title} — view details`}>
                <DishCard d={{ ...d, aspect: 'tall' }} index={i} />
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Ingrediology spotlight */}
      <section aria-labelledby="ing-title" className="container-x py-24 md:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-5">Ingrediology by Chef Nek</p>
            <h2 id="ing-title" className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em]">
              Discover the <span className="italic text-green">science</span> behind every ingredient
            </h2>
            <p className="mt-6 text-lg text-fg-2">
              Why do onions make you cry? What gives injera its eyes? Pick an ingredient and explore its culinary uses, chemistry and fun facts — with Amharic names throughout.
            </p>
            <div className="mt-8">
              <Button href="/ingrediology" variant="green">
                Open Ingrediology <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
          <Reveal className="min-w-0">
            <IngredientExplorer compact initial="onion" />
          </Reveal>
        </div>
      </section>

      {/* Tech */}
      <section aria-labelledby="tech-title" className="container-x py-24 md:py-32">
        <SectionHeading
          id="tech-title"
          eyebrow="Built by a chef"
          title={
            <>
              Software that knows <span className="italic text-gradient-gold">a Saturday rush</span>
            </>
          }
          intro="Tools designed from inside the kitchen, used by restaurant owners and cooks across the DMV."
        />
        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.slice(0, 2).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.1}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-title" className="container-x py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-[#121a2b] via-[#0b1220] to-[#080b12] px-6 py-20 text-center text-[#f8fafc] sm:px-16">
            <div aria-hidden className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[#D4AF37]/25 blur-[100px]" />
            <p className="eyebrow relative">Let’s work together</p>
            <h2 id="cta-title" className="relative mx-auto mt-5 max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1] tracking-[-0.03em]">
              Have a table to set, a story to tell or something to <span className="italic text-gradient-gold">build?</span>
            </h2>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="gold">
                Get in touch <ArrowRight size={16} aria-hidden />
              </Button>
              <Button href="/media">Watch & learn</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
