'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight, Check, ChefHat, Code2, Loader2, Megaphone, Sparkles, Users } from 'lucide-react';
import { sendInquiry } from '@/lib/inquiries';

const types = [
  { id: 'Culinary collaboration', icon: ChefHat, hint: 'Events, menus, private dining, consulting' },
  { id: 'Web development', icon: Code2, hint: 'Websites, apps and restaurant tech' },
  { id: 'Content partnership', icon: Megaphone, hint: 'Brands, sponsorships, Ingrediology' },
  { id: 'Chef Nek Pro / staffing', icon: Users, hint: 'Platform demos and Hire & Train' },
  { id: 'Something else', icon: Sparkles, hint: 'Say hello' },
] as const;

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export function ContactForm() {
  const [type, setType] = useState<string>(types[0].id);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const started = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    started.current = Date.now();
  }, []);

  function validate(fd: FormData): Errors {
    const e: Errors = {};
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();
    if (name.length < 2) e.name = 'Please enter your name.';
    if (!emailOk(email)) e.email = 'Please enter a valid email address.';
    if (message.length < 20) e.message = 'Tell me a little more — at least 20 characters.';
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    // Spam guards: hidden honeypot + implausibly fast submissions.
    if (fd.get('company_website') || Date.now() - started.current < 2500) {
      setState('done');
      return;
    }
    setState('sending');
    try {
      await sendInquiry({
        name: String(fd.get('name')).trim().slice(0, 120),
        email: String(fd.get('email')).trim().slice(0, 200),
        organization: String(fd.get('organization') ?? '').trim().slice(0, 160),
        type,
        message: String(fd.get('message')).trim().slice(0, 4000),
      });
      setState('done');
      form.reset();
    } catch (err) {
      console.error(err);
      setState('error');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const field =
    'peer h-14 w-full rounded-2xl border bg-bg/50 px-4 pt-5 text-fg outline-none transition placeholder:text-transparent focus:border-green focus:bg-bg/80 aria-[invalid=true]:border-red-400';
  const label =
    'pointer-events-none absolute left-4 top-4 origin-left text-fg-2 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs';

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-[var(--shadow)] sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'done' ? (
          <motion.div
            key="done"
            ref={statusRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center outline-none"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid size-20 place-items-center rounded-full bg-green text-green-ink"
            >
              <Check size={36} strokeWidth={2.5} aria-hidden />
            </motion.span>
            <h3 className="mt-6 font-display text-4xl tracking-tight">Message received</h3>
            <p className="mt-3 max-w-sm text-fg-2">Thank you for reaching out. Chef Nek reviews every inquiry personally and will get back to you soon.</p>
            <button type="button" onClick={() => setState('idle')} className="mt-8 rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-green hover:text-green">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <fieldset>
              <legend className="eyebrow mb-4">What can we create together?</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {types.map(({ id, icon: Icon, hint }) => (
                  <label
                    key={id}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-green ${
                      type === id ? 'border-green/60 bg-green-soft' : 'border-line hover:border-line-strong'
                    }`}
                  >
                    <input type="radio" name="type" value={id} checked={type === id} onChange={() => setType(id)} className="sr-only" />
                    <Icon size={18} className={`mt-0.5 shrink-0 ${type === id ? 'text-green' : 'text-fg-3'}`} aria-hidden />
                    <span>
                      <span className="block text-sm font-semibold">{id}</span>
                      <span className="block text-xs text-fg-2">{hint}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name} cls={field} lcls={label} autoComplete="name" />
              <Field id="email" label="Email" type="email" error={errors.email} cls={field} lcls={label} autoComplete="email" />
            </div>
            <Field id="organization" label="Company or restaurant (optional)" cls={field} lcls={label} autoComplete="organization" />

            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Message"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-err' : undefined}
                className={`${field} h-auto min-h-36 resize-y pt-7`}
              />
              <label htmlFor="message" className={label}>
                Tell me about your project
              </label>
              <ErrorText id="message-err" text={errors.message} />
            </div>

            {/* Honeypot — hidden from people, tempting for bots */}
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company_website">Website</label>
              <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
            </div>

            {state === 'error' && (
              <div ref={statusRef} tabIndex={-1} role="alert" className="flex items-start gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm outline-none">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" aria-hidden />
                <span>Something went wrong sending your message. Please try again in a moment.</span>
              </div>
            )}

            <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs text-fg-3">Your details are only used to reply to this inquiry.</p>
              <button
                type="submit"
                disabled={state === 'sending'}
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-br from-[#F5E6A8] via-[#D4AF37] to-[#A8841F] px-7 text-sm font-semibold text-[#080b12] shadow-[0_10px_40px_-10px_rgba(212,175,55,0.6)] transition disabled:opacity-70"
              >
                {state === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    Send message <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ id, label, error, cls, lcls, type = 'text', autoComplete }: { id: string; label: string; error?: string; cls: string; lcls: string; type?: string; autoComplete?: string }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cls}
      />
      <label htmlFor={id} className={lcls}>
        {label}
      </label>
      <ErrorText id={`${id}-err`} text={error} />
    </div>
  );
}

function ErrorText({ id, text }: { id: string; text?: string }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.p id={id} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 flex items-center gap-1.5 pl-1 text-xs text-red-400">
          <AlertCircle size={12} aria-hidden /> {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
