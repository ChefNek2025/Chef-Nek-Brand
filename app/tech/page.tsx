import type { Metadata } from 'next';
import { ProjectCard } from '@/components/cards';
import { Reveal } from '@/components/motion';
import { SectionHeading, TechBadge } from '@/components/ui';
import { projects, skills } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Technology & Web Development',
  description: 'Chef Nek’s software projects: Chef Nek Pro, Hire & Train and more — built with JavaScript and Firebase.',
  alternates: { canonical: '/tech' },
};

export default function Tech() {
  return (
    <>
      <section className="container-x pt-40 md:pt-48">
        <SectionHeading
          as="h1"
          eyebrow="Technology & development"
          title={
            <>
              Code with <span className="italic text-gradient-gold">kitchen instincts.</span>
            </>
          }
          intro="Products designed and built by a working chef — fast, mobile-first and grounded in how restaurants actually run."
        />
      </section>

      <section aria-labelledby="projects-h" className="container-x py-16">
        <h2 id="projects-h" className="sr-only">Projects</h2>
        <ul className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 0.1}>
              <ProjectCard p={p} priority={i < 2} />
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="skills" className="container-x py-16">
        <h2 id="skills" className="font-display text-[clamp(2rem,4.5vw,3.5rem)] tracking-[-0.03em]">Skills & tools</h2>
        <p className="mt-3 text-fg-2">Verified in shipped projects.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.08} className="glass rounded-3xl p-6">
              <h3 className="eyebrow">{g.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s}><TechBadge>{s}</TechBadge></li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
