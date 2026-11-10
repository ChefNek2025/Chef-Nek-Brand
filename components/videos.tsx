'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { videos, videoTopics, type Video } from '@/content/videos';
import { site } from '@/content/site';
import { SocialIcon } from './ui';

export function VideoGallery() {
  const [topic, setTopic] = useState<string>('All');
  const shown = topic === 'All' ? videos : videos.filter((v) => v.topic === topic);

  if (!videos.length) return <VideoEmpty />;

  return (
    <div>
      <div role="group" aria-label="Filter videos" className="mb-8 flex flex-wrap gap-2">
        {['All', ...videoTopics].map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={topic === t}
            onClick={() => setTopic(t)}
            className={`rounded-full border px-4 py-2 text-sm transition ${topic === t ? 'border-green bg-green text-green-ink' : 'border-line text-fg-2 hover:text-fg'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v) => (
          <li key={v.id}>
            <VideoCard v={v} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Thumbnail "facade" — the real embed only loads after a click. */
function VideoCard({ v }: { v: Video }) {
  const [play, setPlay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const yt = v.platform === 'youtube';
  const thumb = v.thumbnail ?? (yt ? `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg` : '');
  const src = yt
    ? `https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0`
    : `https://www.tiktok.com/player/v1/${v.videoId}?autoplay=1`;
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-bg-2">
      <div className={`relative ${yt ? 'aspect-video' : 'aspect-[9/16] max-h-[34rem]'} w-full`}>
        {play ? (
          <>
            {!loaded && <div className="skeleton absolute inset-0" aria-hidden />}
            <iframe
              src={src}
              title={v.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 h-full w-full"
            />
          </>
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Play video: ${v.title}`}>
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="skeleton h-full w-full" />
            )}
            <span className="absolute inset-0 grid place-items-center bg-black/25 transition group-hover:bg-black/10">
              <span className="grid size-16 place-items-center rounded-full bg-[#f8fafc] text-[#080b12] shadow-xl transition group-hover:scale-110 group-hover:bg-[#D4AF37]">
                <Play size={24} fill="currentColor" aria-hidden />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{v.topic}</p>
          <h3 className="mt-1 font-semibold leading-snug">{v.title}</h3>
        </div>
        <span className="text-fg-3" aria-label={yt ? 'YouTube' : 'TikTok'}>
          <SocialIcon name={v.platform} />
        </span>
      </div>
    </article>
  );
}

function VideoEmpty() {
  const channels = (['youtube', 'tiktok', 'instagram'] as const).filter((k) => site.socials[k]);
  return (
    <div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <li key={i} className="overflow-hidden rounded-3xl border border-line bg-bg-2">
            <div className="skeleton aspect-video" />
            <div className="space-y-2 p-4">
              <div className="skeleton h-2.5 w-20 rounded-full" />
              <div className="skeleton h-3.5 w-3/4 rounded-full" />
            </div>
          </li>
        ))}
      </ul>
      <div className="glass mx-auto -mt-24 max-w-xl rounded-3xl p-8 text-center shadow-[var(--shadow)] relative">
        <p className="eyebrow">Coming soon</p>
        <p className="mt-3 font-display text-3xl tracking-tight">New episodes are on the way</p>
        <p className="mt-3 text-fg-2">Ingrediology explainers, cooking sessions and behind-the-line stories will appear here.</p>
        {channels.length > 0 && (
          <div className="mt-6 flex justify-center gap-2">
            {channels.map((c) => (
              <a key={c} href={site.socials[c]} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm transition hover:border-green hover:text-green">
                <SocialIcon name={c} size={16} /> Follow on {c[0].toUpperCase() + c.slice(1)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
