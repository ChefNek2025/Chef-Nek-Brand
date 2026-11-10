import type { Metadata } from 'next';
import { SectionHeading, SocialLinks } from '@/components/ui';
import { VideoGallery } from '@/components/videos';

export const metadata: Metadata = {
  title: 'Videos & Media',
  description: 'Ingrediology explainers, cooking and kitchen-business videos from Chef Nek on YouTube and TikTok.',
  alternates: { canonical: '/media' },
};

export default function Media() {
  return (
    <section className="container-x pt-40 md:pt-48">
      <SectionHeading
        as="h1"
        eyebrow="Videos & social"
        title={
          <>
            Watch, cook, <span className="italic text-gradient-gold">learn.</span>
          </>
        }
        intro="Ingrediology explainers, cooking sessions and real stories from behind the line — on YouTube and TikTok."
      />
      <SocialLinks className="mt-8" />
      <div className="mt-14">
        <VideoGallery />
      </div>
    </section>
  );
}
