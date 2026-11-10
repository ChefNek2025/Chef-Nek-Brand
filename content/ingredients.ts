export type Ingredient = {
  id: string;
  name: string;
  /** Amharic name (please have Chef Nek review). */
  am: string;
  family: 'Grain' | 'Spice' | 'Allium' | 'Mineral' | 'Fruit' | 'Protein' | 'Root' | 'Seed';
  hue: string;
  emoji: string;
  uses: string[];
  chemistry: string[];
  nutrition: string[];
  facts: string[];
};

/**
 * Educational starter set written for Ingrediology. Statements are kept to
 * well-established food-science facts and avoid health claims.
 * Amharic body text is not yet written — only names are translated.
 */
export const ingredients: Ingredient[] = [
  {
    id: 'teff',
    name: 'Teff',
    am: 'ጤፍ',
    family: 'Grain',
    hue: '#C08A4B',
    emoji: '🌾',
    uses: [
      'Fermented into batter for injera, the spongy flatbread at the centre of Ethiopian and Eritrean meals.',
      'Cooked as porridge or added to baked goods for an earthy, slightly sweet flavour.',
    ],
    chemistry: [
      'Injera batter is fermented for one to several days; wild yeasts and lactic acid bacteria produce CO₂ (the “eyes” on the surface) and the signature sour tang.',
      'Teff contains no gluten-forming proteins, so injera’s structure comes from gelatinised starch rather than a gluten network.',
    ],
    nutrition: [
      'A whole grain — the seeds are so small they are almost always eaten with bran and germ intact.',
      'Naturally gluten-free, though cross-contact can occur during processing.',
    ],
    facts: [
      'Teff is one of the smallest grains in the world — roughly 150 seeds weigh about as much as a single wheat kernel.',
      'Its name is often linked to the Amharic word for “lost”, because a dropped grain is nearly impossible to find.',
    ],
  },
  {
    id: 'berbere',
    name: 'Berbere',
    am: 'በርበሬ',
    family: 'Spice',
    hue: '#B91C1C',
    emoji: '🌶️',
    uses: [
      'The backbone of Ethiopian stews such as doro wat and misir wat.',
      'Used as a dry rub, or bloomed in niter kibbeh (spiced clarified butter).',
    ],
    chemistry: [
      'Chilli heat comes from capsaicin, which is fat-soluble — blooming berbere in butter or oil carries heat and aroma through the whole dish.',
      'Slow-cooking onions and berbere together builds deep colour through caramelisation and Maillard browning.',
    ],
    nutrition: [
      'Used in small amounts, so its contribution is mainly flavour and colour rather than nutrients.',
    ],
    facts: [
      'Recipes vary by household and region — common components include chilli, fenugreek, korarima, ginger, garlic and basil.',
      'Toasting whole spices before grinding releases more volatile aroma compounds.',
    ],
  },
  {
    id: 'coffee',
    name: 'Coffee',
    am: 'ቡና',
    family: 'Seed',
    hue: '#6F4E37',
    emoji: '☕',
    uses: [
      'Brewed in the Ethiopian coffee ceremony — roasted, ground and boiled in a jebena, traditionally served in three rounds.',
      'Used in rubs, sauces and desserts for bitterness and roasted depth.',
    ],
    chemistry: [
      'Roasting drives Maillard reactions and caramelisation, creating hundreds of aroma compounds that green coffee does not have.',
      'Bitterness comes partly from caffeine and from compounds formed when chlorogenic acids break down during roasting.',
    ],
    nutrition: [
      'Plain brewed coffee is very low in calories; additions like sugar and milk change that.',
      'Contains caffeine — sensitivity varies from person to person.',
    ],
    facts: [
      'Coffea arabica is native to the highland forests of southwestern Ethiopia.',
      'In the ceremony, the three rounds are traditionally called abol, tona and baraka.',
    ],
  },
  {
    id: 'onion',
    name: 'Onion',
    am: 'ሽንኩርት',
    family: 'Allium',
    hue: '#A855F7',
    emoji: '🧅',
    uses: [
      'Slowly cooked down without oil at the start of many Ethiopian wats.',
      'Eaten raw for bite, pickled for brightness, or caramelised for sweetness.',
    ],
    chemistry: [
      'Cutting an onion releases the enzyme alliinase; together with a second enzyme (lachrymatory-factor synthase) it turns sulfur compounds into syn-propanethial-S-oxide, the gas that makes eyes water.',
      'Long, gentle cooking converts sharp sulfur notes into sweet, savoury flavour as sugars caramelise.',
    ],
    nutrition: [
      'A low-calorie vegetable that adds a lot of flavour with little fat.',
    ],
    facts: [
      'Chilling an onion and using a very sharp knife reduces the tear-inducing reaction.',
      'Red onions get their colour from anthocyanin pigments, which turn bluish-green in alkaline conditions.',
    ],
  },
  {
    id: 'garlic',
    name: 'Garlic',
    am: 'ነጭ ሽንኩርት',
    family: 'Allium',
    hue: '#E7E5E4',
    emoji: '🧄',
    uses: [
      'Pounded with ginger as a base for stews, marinades and spice blends.',
      'Roasted whole for a soft, sweet, spreadable result.',
    ],
    chemistry: [
      'Crushing garlic mixes the compound alliin with the enzyme alliinase, forming allicin — the source of raw garlic’s pungency.',
      'Heat deactivates alliinase, which is why roasted garlic is mellow and sweet.',
    ],
    nutrition: ['Used in small quantities, so it is mainly a flavour ingredient.'],
    facts: [
      'The finer you chop or crush garlic, the more allicin forms and the stronger it tastes.',
      'Burnt garlic turns bitter quickly — add it later when cooking over high heat.',
    ],
  },
  {
    id: 'ginger',
    name: 'Ginger',
    am: 'ዝንጅብል',
    family: 'Root',
    hue: '#EAB308',
    emoji: '🫚',
    uses: [
      'Paired with garlic in Ethiopian cooking, and used in tea, marinades and desserts.',
    ],
    chemistry: [
      'Fresh ginger’s heat comes from gingerols; drying and cooking convert some of them into shogaols and zingerone, changing the flavour.',
      'Fresh ginger contains a protease (zingibain) that can break down proteins in marinades.',
    ],
    nutrition: ['Usually eaten in small amounts as a seasoning.'],
    facts: ['Botanically, ginger is a rhizome — an underground stem, not a true root.'],
  },
  {
    id: 'salt',
    name: 'Salt',
    am: 'ጨው',
    family: 'Mineral',
    hue: '#CBD5E1',
    emoji: '🧂',
    uses: [
      'Seasoning, curing, brining and balancing bitterness.',
      'Controls fermentation speed in breads and pickles.',
    ],
    chemistry: [
      'Salt dissolves some muscle proteins in meat, helping brined meat hold more moisture during cooking.',
      'Through osmosis, salt draws water out of vegetables — the basis of pickling and of salting eggplant or cabbage.',
    ],
    nutrition: [
      'Sodium chloride; a key source of dietary sodium. Follow your local dietary guidance on sodium intake.',
    ],
    facts: [
      'Salt suppresses our perception of bitterness, which is why a pinch can make coffee or greens taste sweeter.',
      'Different crystal shapes (flaky, kosher, fine) have very different volumes per spoon.',
    ],
  },
  {
    id: 'lemon',
    name: 'Lemon',
    am: 'ሎሚ',
    family: 'Fruit',
    hue: '#FACC15',
    emoji: '🍋',
    uses: [
      'Finishing acid for stews, salads and grilled fish.',
      'Zest for aroma; juice for brightness and balance.',
    ],
    chemistry: [
      'Citric acid lowers pH, which can denature proteins — the principle behind ceviche.',
      'Acid slows enzymatic browning on cut apples and avocados.',
      'Zest carries aromatic oils such as limonene; juice carries acidity.',
    ],
    nutrition: ['A source of vitamin C; amounts vary with size and freshness.'],
    facts: ['Rolling a lemon on the counter before cutting helps release more juice.'],
  },
  {
    id: 'egg',
    name: 'Egg',
    am: 'እንቁላል',
    family: 'Protein',
    hue: '#FDE68A',
    emoji: '🥚',
    uses: [
      'Binder, emulsifier, leavener and glaze — and the hard-boiled egg in doro wat.',
    ],
    chemistry: [
      'Egg whites set at roughly 62–65 °C and yolks at roughly 65–70 °C, which is why yolks can stay soft while whites are firm.',
      'Lecithin in the yolk is an emulsifier that holds oil and water together in mayonnaise and hollandaise.',
      'Whipping unfolds egg-white proteins that trap air bubbles, creating meringue foam.',
    ],
    nutrition: ['A source of high-quality protein.'],
    facts: [
      'A green ring around an overcooked yolk is iron sulfide — harmless, but a sign of overcooking.',
      'Older eggs are easier to peel because their pH rises as they age.',
    ],
  },
];

export const explainers = [
  { id: 'onion', title: 'Why onions make you cry', kicker: 'Chemistry', minutes: 2 },
  { id: 'teff', title: 'The science of injera’s eyes', kicker: 'Fermentation', minutes: 3 },
  { id: 'coffee', title: 'What roasting does to coffee', kicker: 'Maillard', minutes: 3 },
  { id: 'egg', title: 'The temperature map of an egg', kicker: 'Proteins', minutes: 2 },
  { id: 'berbere', title: 'Why bloom spices in butter', kicker: 'Solubility', minutes: 2 },
  { id: 'salt', title: 'How brining keeps meat juicy', kicker: 'Osmosis', minutes: 3 },
];

export const amLabels = {
  uses: { en: 'Culinary uses', am: 'የምግብ አጠቃቀም' },
  chemistry: { en: 'Chemistry', am: 'ኬሚስትሪ' },
  nutrition: { en: 'Nutrition', am: 'ስነ-ምግብ' },
  facts: { en: 'Fun facts', am: 'አስደናቂ እውነታዎች' },
} as const;
