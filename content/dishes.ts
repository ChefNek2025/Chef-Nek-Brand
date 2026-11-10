export const dishCategories = [
  'Breakfast & Brunch',
  'Signature Dishes',
  'International Cuisine',
  'Food Innovation',
  'Healthy Cooking',
] as const;

export type DishCategory = (typeof dishCategories)[number];

export type Dish = {
  slug: string;
  title: string;
  category: DishCategory;
  blurb: string;
  /** Real photo path in /public/images/dishes — leave empty to show artwork. */
  image?: string;
  /** Artwork palette used until a real photo is added: [plate glow, main, garnish]. */
  palette: [string, string, string];
  aspect: 'tall' | 'square' | 'wide';
  ingredients?: string[];
  method?: string[];
  featured?: boolean;
  /** Sample entry — replace with Chef Nek's real dish and photo. */
  draft?: boolean;
};

/**
 * ⚠️ ALL DISHES BELOW ARE SAMPLES that show the layout.
 * Replace each with a real dish, real photo and real recipe notes,
 * then remove `draft: true`.
 */
export const dishes: Dish[] = [
  {
    slug: 'sample-brunch-plate',
    title: 'Sample · Brunch Plate',
    category: 'Breakfast & Brunch',
    blurb: 'Placeholder for a signature brunch dish photo and story.',
    palette: ['#3a2a0f', '#E9B949', '#4ADE80'],
    aspect: 'tall',
    featured: true,
    draft: true,
    ingredients: ['Add ingredients'],
    method: ['Add preparation notes'],
  },
  {
    slug: 'sample-signature-main',
    title: 'Sample · Signature Main',
    category: 'Signature Dishes',
    blurb: 'Placeholder for the dish people come back for.',
    palette: ['#2a0f0f', '#C2412D', '#D4AF37'],
    aspect: 'square',
    featured: true,
    draft: true,
  },
  {
    slug: 'sample-international',
    title: 'Sample · International Classic',
    category: 'International Cuisine',
    blurb: 'Placeholder for a dish from your international repertoire.',
    palette: ['#1f1408', '#B4651F', '#F2D27A'],
    aspect: 'wide',
    featured: true,
    draft: true,
  },
  {
    slug: 'sample-innovation',
    title: 'Sample · Food Innovation',
    category: 'Food Innovation',
    blurb: 'Placeholder for an experimental or technique-driven plate.',
    palette: ['#0b1f1a', '#2DD4BF', '#D4AF37'],
    aspect: 'tall',
    draft: true,
  },
  {
    slug: 'sample-healthy-bowl',
    title: 'Sample · Healthy Bowl',
    category: 'Healthy Cooking',
    blurb: 'Placeholder for a balanced, vegetable-forward dish.',
    palette: ['#0d1f10', '#4ADE80', '#F59E0B'],
    aspect: 'square',
    draft: true,
  },
  {
    slug: 'sample-signature-2',
    title: 'Sample · Chef’s Special',
    category: 'Signature Dishes',
    blurb: 'Placeholder for a second signature dish.',
    palette: ['#1d0d18', '#A855F7', '#F2D27A'],
    aspect: 'wide',
    draft: true,
  },
  {
    slug: 'sample-brunch-2',
    title: 'Sample · Morning Pastry',
    category: 'Breakfast & Brunch',
    blurb: 'Placeholder for a pastry or bakery item.',
    palette: ['#2a1a0a', '#F4A261', '#FDE68A'],
    aspect: 'square',
    draft: true,
  },
  {
    slug: 'sample-international-2',
    title: 'Sample · Street Food',
    category: 'International Cuisine',
    blurb: 'Placeholder for a street-food inspired dish.',
    palette: ['#1a1405', '#EAB308', '#EF4444'],
    aspect: 'tall',
    draft: true,
  },
];

export const getDish = (slug: string) => dishes.find((d) => d.slug === slug);
