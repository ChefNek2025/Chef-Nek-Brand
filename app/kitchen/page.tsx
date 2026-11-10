import type { Metadata } from 'next';
import { SectionHeading, DraftBadge } from '@/components/ui';
import { Gallery } from '@/components/gallery';
import { dishes } from '@/content/dishes';

export const metadata: Metadata = {
  title: 'Culinary Portfolio',
  description: 'Signature dishes, brunch, international cuisine and food innovation by Chef Nek.',
  alternates: { canonical: '/kitchen' },
};

export default function Kitchen() {
  return (
    <section className="container-x pt-40 md:pt-48">
      <SectionHeading
        as="h1"
        eyebrow="Culinary portfolio"
        title={
          <>
            Plates with a <span className="italic text-gradient-gold">point of view.</span>
          </>
        }
        intro="Browse by category, open any plate full screen, and dive into the ingredients and technique behind it."
      />
      {dishes.some((d) => d.draft) && (
        <div className="mt-6">
          <DraftBadge label="Sample gallery — replace with Chef Nek’s photos" />
        </div>
      )}
      <div className="mt-14">
        <Gallery dishes={dishes} />
      </div>
    </section>
  );
}
