export type Milestone = {
  id: string;
  pillar: 'Culinary' | 'Leadership' | 'Education' | 'Technology' | 'Entrepreneurship';
  period: string;
  title: string;
  summary: string;
  details: string[];
  /** true = placeholder that Chef Nek must replace with real facts. */
  draft?: boolean;
};

/**
 * Only facts verified from chefnekpro.com are written as real entries.
 * Draft entries are placeholders — replace or delete them.
 */
export const timeline: Milestone[] = [
  {
    id: 'roots',
    pillar: 'Culinary',
    period: 'Early career',
    title: 'Culinary training & first kitchens',
    summary: 'Add where you trained and the kitchens that shaped your cooking.',
    details: [
      'Culinary school or apprenticeship (name, years)',
      'First line / prep roles',
      'Cuisines and techniques you specialised in',
    ],
    draft: true,
  },
  {
    id: 'head-chef',
    pillar: 'Leadership',
    period: 'DMV',
    title: 'Founder & Head Chef',
    summary:
      'Leading kitchens in the DMV through late deliveries, no-shows and busy Saturday nights — the real-world pressure that every later project was built from.',
    details: [
      'Kitchen leadership in the Washington, DC metro area',
      'Hands-on with prep systems, food cost and team scheduling',
      'Add restaurant names and years here',
    ],
  },
  {
    id: 'chef-nek-pro',
    pillar: 'Technology',
    period: 'Chef Nek Pro',
    title: 'Built a restaurant platform from the line',
    summary:
      'Designed and developed Chef Nek Pro — recipes, prep lists, inventory, food cost, scheduling, time clock, temperature logs and a team chat, in one installable web app.',
    details: [
      '12+ integrated kitchen tools for restaurant owners and staff',
      'Firebase authentication and real-time Firestore data',
      'Installable progressive web app for phones and tablets',
      'AI dish scanning that feeds directly into food cost',
    ],
  },
  {
    id: 'hire-train',
    pillar: 'Education',
    period: 'Hire & Train',
    title: 'Training & certifying kitchen workers',
    summary:
      'Launched Chef Nek Hire & Train to personally train, certify and place kitchen workers with DMV restaurants.',
    details: [
      'Online track: four Zoom sessions on kitchen basics, food safety and the platform',
      'In-person track at Black Lion Kitchen, DMV',
      'Roles: line cook, prep cook, sous chef, pastry, kitchen manager, dish and FOH',
    ],
  },
  {
    id: 'ingrediology',
    pillar: 'Education',
    period: 'Ingrediology',
    title: 'Ingrediology by Chef Nek',
    summary:
      'An educational brand that explains the science behind everyday ingredients — in English and Amharic.',
    details: [
      'Ingredient deep-dives: uses, chemistry and nutrition basics',
      'Short-form video for YouTube and TikTok',
      'Add launch date and channel milestones here',
    ],
  },
  {
    id: 'next',
    pillar: 'Entrepreneurship',
    period: 'Now',
    title: 'Chef · Creator · Developer',
    summary:
      'Bringing culinary artistry, food science and modern technology together — for restaurants, cooks and curious eaters.',
    details: ['Add what you are building or cooking next'],
    draft: true,
  },
];
