export type Video = {
  id: string;
  platform: 'youtube' | 'tiktok';
  /** YouTube video ID (e.g. "dQw4w9WgXcQ") or TikTok numeric video ID. */
  videoId: string;
  title: string;
  topic: 'Ingrediology' | 'Cooking' | 'Kitchen Business' | 'Behind the Line';
  /** Optional custom thumbnail in /public; YouTube thumbnails are automatic. */
  thumbnail?: string;
};

/**
 * Add real videos from Chef Nek's YouTube and TikTok here.
 * The gallery shows a "coming soon" state while this list is empty.
 * Embeds only load when a visitor clicks play (privacy + performance).
 */
export const videos: Video[] = [];

export const videoTopics = ['Ingrediology', 'Cooking', 'Kitchen Business', 'Behind the Line'] as const;
