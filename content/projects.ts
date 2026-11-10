export type Project = {
  slug: string;
  title: string;
  kind: string;
  description: string;
  image: string;
  imageAlt: string;
  stack: string[];
  features: string[];
  /** Case-study paragraphs (problem → approach → result). */
  story: { heading: string; body: string }[];
  live?: string;
  /** Leave empty if the repository is private — the button is hidden. */
  github?: string;
  accent: string;
};

/** Verified from the live chefnekpro.com code and pages (Nov 2026). */
export const projects: Project[] = [
  {
    slug: 'chef-nek-pro',
    title: 'Chef Nek Pro',
    kind: 'Restaurant operations platform',
    description:
      'An all-in-one kitchen platform for restaurant owners and staff — recipe book, prep lists, inventory, suppliers, food cost, scheduling, time clock, temperature logs and Team Hub chat.',
    image: '/projects/chefnekpro-app.png',
    imageAlt: 'Chef Nek Pro dashboard with sidebar navigation and kitchen tool shortcuts',
    stack: ['JavaScript', 'HTML', 'CSS', 'Firebase Auth', 'Cloud Firestore', 'PWA', 'Vercel', 'Claude Vision AI'],
    features: [
      'Role-based access for owners, admins and kitchen staff',
      'Weekly prep tracker with per-day sign-off by staff name',
      'Inventory with low-stock and critical alerts',
      'Food cost calculator fed by an AI dish scanner',
      'Color-coded weekly schedule and time clock',
      'Installable on iPhone and Android as a progressive web app',
    ],
    story: [
      {
        heading: 'The problem',
        body: 'Independent kitchens run on paper prep lists, group texts and memory. Owners cannot see what is prepped, what is running low or who is working without being on the line.',
      },
      {
        heading: 'The approach',
        body: 'Built by a working chef, Chef Nek Pro puts every daily kitchen workflow in one mobile-first web app backed by real-time Firestore data, so staff update from their phones and owners see progress from anywhere.',
      },
      {
        heading: 'The result',
        body: 'A single platform with 20 modules — from recipes and prep to scheduling, temperature logs and team chat — live at chefnekpro.com/app.',
      },
    ],
    live: 'https://chefnekpro.com',
    github: '',
    accent: '#4ADE80',
  },
  {
    slug: 'hire-and-train',
    title: 'Chef Nek Hire & Train',
    kind: 'Kitchen staffing platform',
    description:
      'A staffing site where DMV restaurants request certified kitchen workers and candidates apply for Chef Nek’s online or in-person training.',
    image: '/projects/hire-train.png',
    imageAlt: 'Chef Nek Hire and Train landing page',
    stack: ['JavaScript', 'HTML', 'CSS', 'Cloud Firestore', 'Vercel'],
    features: [
      'Restaurant worker-request form with validation',
      'Training application with online and in-person tracks',
      'Live list of certified workers and open positions',
      'Requests flow straight into the Chef Nek Pro admin pipeline',
    ],
    story: [
      {
        heading: 'The problem',
        body: 'Restaurants struggle to find kitchen staff who are ready on day one, and new cooks struggle to get a foot in the door.',
      },
      {
        heading: 'The approach',
        body: 'One page serves both sides: restaurants post what they need, candidates apply for training, and every submission lands in the same Firestore pipeline Chef Nek manages inside Chef Nek Pro.',
      },
    ],
    live: 'https://chefnekpro.com/hire',
    github: '',
    accent: '#D4AF37',
  },
  {
    slug: 'chef-nek-pro-site',
    title: 'Chef Nek Pro — Marketing Site',
    kind: 'Product landing page',
    description:
      'The public website for Chef Nek Pro: product story, feature tour, AI scanner showcase, scheduling preview and a staff-request form.',
    image: '/projects/chefnekpro-landing.png',
    imageAlt: 'Chef Nek Pro landing page hero reading Run Your Kitchen Like a Pro',
    stack: ['HTML', 'CSS', 'JavaScript', 'Cloud Firestore', 'Vercel'],
    features: [
      'Scroll-reveal animations with IntersectionObserver',
      'Feature grid and interactive product previews',
      'Lead form saved to Firestore with admin notifications',
    ],
    story: [
      {
        heading: 'Overview',
        body: 'A fast, dependency-light marketing page that explains the platform to restaurant owners and converts visitors into sign-ups and staffing requests.',
      },
    ],
    live: 'https://chefnekpro.com',
    github: '',
    accent: '#38BDF8',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Skills verified in shipped code. Add others (React, Node, AWS…) once verified. */
export const skills = [
  { group: 'Frontend', items: ['JavaScript', 'HTML', 'CSS', 'Responsive design', 'PWA'] },
  { group: 'Backend & data', items: ['Firebase Auth', 'Cloud Firestore', 'Real-time data'] },
  { group: 'AI & tooling', items: ['Claude Vision AI', 'Vercel', 'Git'] },
];
