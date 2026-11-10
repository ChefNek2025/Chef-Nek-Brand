'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useId, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { amLabels, ingredients, type Ingredient } from '@/content/ingredients';

type Tab = keyof typeof amLabels;
const tabs: Tab[] = ['uses', 'chemistry', 'nutrition', 'facts'];

export function IngredientExplorer({ compact = false, initial = 'teff' }: { compact?: boolean; initial?: string }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(initial);
  const [tab, setTab] = useState<Tab>('chemistry');
  const [lang, setLang] = useState<'en' | 'am'>('en');
  const uid = useId();

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return ingredients.filter(
      (i) => !t || i.name.toLowerCase().includes(t) || i.am.includes(q.trim()) || i.family.toLowerCase().includes(t),
    );
  }, [q]);
  const ing = ingredients.find((i) => i.id === sel) ?? ingredients[0];

  return (
    <div className={`glass min-w-0 overflow-hidden rounded-[2rem] shadow-[var(--shadow)] ${compact ? '' : 'lg:grid lg:grid-cols-[19rem_1fr]'}`}>
      {/* Library */}
      <div className={`min-w-0 border-line ${compact ? 'border-b' : 'border-b lg:border-b-0 lg:border-r'} p-5`}>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={`${uid}-q`} className="eyebrow">
            Ingredient library
          </label>
          <div role="group" aria-label="Language" className="flex rounded-full border border-line p-0.5 text-xs">
            {(['en', 'am'] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 transition ${lang === l ? 'bg-fg text-bg' : 'text-fg-2 hover:text-fg'}`}
              >
                {l === 'en' ? 'EN' : 'አማ'}
              </button>
            ))}
          </div>
        </div>
        <div className="relative mt-4">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-3" aria-hidden />
          <input
            id={`${uid}-q`}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search teff, ቡና, spice…"
            className="h-11 w-full rounded-full border border-line bg-bg/60 pl-10 pr-4 text-sm text-fg placeholder:text-fg-3 focus:border-green focus:outline-none"
          />
        </div>
        <ul
          className={`mt-4 flex gap-2 ${compact ? 'overflow-x-auto pb-2 [scrollbar-width:none]' : 'overflow-x-auto pb-2 [scrollbar-width:none] lg:max-h-[26rem] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:pb-0'}`}
          aria-label="Ingredients"
        >
          {list.map((i) => (
            <li key={i.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setSel(i.id)}
                aria-pressed={sel === i.id}
                className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition ${
                  sel === i.id ? 'border-green/50 bg-green-soft' : 'border-transparent hover:bg-bg-2/70'
                }`}
              >
                <span className="grid size-9 place-items-center rounded-xl text-lg" style={{ background: `${i.hue}26` }} aria-hidden>
                  {i.emoji}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{lang === 'am' ? i.am : i.name}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-fg-3">
                    {lang === 'am' ? i.name : i.am} · {i.family}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {!list.length && <li className="px-2 py-6 text-sm text-fg-2">No ingredient matches “{q}”.</li>}
        </ul>
      </div>

      {/* Detail */}
      <div className="relative min-h-[26rem] min-w-0 p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={ing.id + lang}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Detail ing={ing} tab={tab} setTab={setTab} lang={lang} uid={uid} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Detail({ ing, tab, setTab, lang, uid }: { ing: Ingredient; tab: Tab; setTab: (t: Tab) => void; lang: 'en' | 'am'; uid: string }) {
  return (
    <div>
      <div className="flex items-start gap-5">
        <div
          aria-hidden
          className="grid size-20 shrink-0 place-items-center rounded-3xl text-4xl"
          style={{ background: `radial-gradient(circle at 30% 30%, ${ing.hue}55, ${ing.hue}11)`, boxShadow: `0 20px 50px -20px ${ing.hue}` }}
        >
          {ing.emoji}
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{ing.family}</p>
          <h3 className="font-display text-4xl tracking-tight sm:text-5xl" lang={lang === 'am' ? 'am' : undefined}>
            {lang === 'am' ? ing.am : ing.name}
          </h3>
          <p className="mt-1 text-fg-2" lang={lang === 'am' ? 'en' : 'am'}>
            {lang === 'am' ? ing.name : ing.am}
          </p>
        </div>
      </div>

      <div role="tablist" aria-label="Ingredient information" className="mt-7 flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            id={`${uid}-tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`${uid}-panel`}
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            onKeyDown={(e) => {
              const i = tabs.indexOf(t);
              const n = e.key === 'ArrowRight' ? tabs[(i + 1) % tabs.length] : e.key === 'ArrowLeft' ? tabs[(i + 3) % tabs.length] : null;
              if (n) {
                setTab(n);
                document.getElementById(`${uid}-tab-${n}`)?.focus();
              }
            }}
            className={`relative shrink-0 px-4 pb-3 pt-1 text-sm transition ${tab === t ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}
          >
            <span lang={lang === 'am' ? 'am' : undefined}>{amLabels[t][lang]}</span>
            {tab === t && <motion.span layoutId={`${uid}-tabline`} className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-green" />}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${tab}`} className="pt-6">
        {lang === 'am' && (
          <p className="mb-4 rounded-2xl border border-dashed border-gold/50 bg-gold-soft px-4 py-3 text-sm text-fg-2">
            <span lang="am">የአማርኛ ትርጉም በቅርቡ ይመጣል።</span> Amharic text coming soon — showing English for now.
          </p>
        )}
        <ul className="space-y-3">
          {ing[tab].map((line, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-3 leading-relaxed text-fg-2"
            >
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full" style={{ background: ing.hue }} aria-hidden />
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>
        {tab === 'nutrition' && (
          <p className="mt-6 text-xs text-fg-3">General educational information only — not medical or dietary advice.</p>
        )}
      </div>
    </div>
  );
}
