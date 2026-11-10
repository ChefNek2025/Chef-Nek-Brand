import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-[-0.04em]">
        Off the <span className="italic text-gradient-gold">menu.</span>
      </h1>
      <p className="mt-6 max-w-md text-fg-2">This page isn’t on today’s menu. Let’s get you back to the kitchen.</p>
      <div className="mt-10"><Button href="/" variant="gold">Back home</Button></div>
    </section>
  );
}
