import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { SectionHeading, SocialLinks } from '@/components/ui';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Culinary collaborations, web development, content partnerships and Chef Nek Pro inquiries.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <section className="container-x grid gap-14 pt-40 md:pt-48 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <SectionHeading
          as="h1"
          eyebrow="Get in touch"
          title={
            <>
              Let’s make something <span className="italic text-gradient-gold">worth sharing.</span>
            </>
          }
          intro="Collaborations, private events, websites, brand partnerships or a Chef Nek Pro demo — tell me what you have in mind."
        />
        <ul className="mt-10 space-y-4 text-fg-2">
          <li className="flex items-center gap-3"><MapPin size={18} className="text-gold" aria-hidden /> {site.location}</li>
          {site.contactEmail && (
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold" aria-hidden />
              <a className="underline-offset-4 hover:text-fg hover:underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </li>
          )}
        </ul>
        <SocialLinks className="mt-8" />
      </div>
      <ContactForm />
    </section>
  );
}
