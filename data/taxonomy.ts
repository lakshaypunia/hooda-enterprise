/**
 * Filter vocabularies for the catalogue. Slugs are used in URLs, so keep them stable.
 */

export const categories = {
  probiotics: { label: "Soil & Water Probiotics", short: "Probiotics" },
  "ammonia-control": { label: "Ammonia & Nitrite Reducers", short: "Ammonia Control" },
  zeolites: { label: "Zeolites & Toxin Binders", short: "Zeolites" },
  oxygen: { label: "Oxygen Supplements", short: "Oxygen" },
  disinfectants: { label: "Disinfectants & Sanitizers", short: "Disinfectants" },
  minerals: { label: "Mineral Supplements", short: "Minerals" },
  "feed-additives": { label: "Feed Additives & Gut Health", short: "Feed Additives" },
  immunity: { label: "Immunostimulants & Growth Promoters", short: "Immunity" },
  "parasite-control": { label: "Parasite Control", short: "Parasites" },
  "water-balancers": { label: "Water & Soil Balancers", short: "Water Balancers" },
} as const satisfies Record<string, { label: string; short: string }>;

export type CategorySlug = keyof typeof categories;

/** Pond problems farmers search by. `hint` is a one-line plain-language symptom. */
export const problems = {
  "ammonia-nitrite": {
    label: "High ammonia / nitrite",
    hint: "Toxic gases, poor water, fish gasping or off-feed",
  },
  "low-oxygen": {
    label: "Low oxygen",
    hint: "Fish or shrimp coming to the surface at dawn",
  },
  "pond-bottom": {
    label: "Black soil & bad smell",
    hint: "Sludge, rotten-egg smell (H₂S), dirty pond bottom",
  },
  vibrio: {
    label: "Vibrio & bacterial load",
    hint: "Red uropods, luminous bacteria, rising mortality",
  },
  "white-gut": {
    label: "White gut / white feces",
    hint: "White faecal strings, poor feed intake",
  },
  "disease-prevention": {
    label: "Virus & disease prevention",
    hint: "WSSV, EHP, fungal and protozoan outbreaks",
  },
  parasites: {
    label: "Parasites (Argulus, Lernea)",
    hint: "Fish lice, anchor worm, fish rubbing on surfaces",
  },
  "moulting-shell": {
    label: "Loose shell & moulting",
    hint: "Soft or loose shell, irregular moulting, cramps",
  },
  "growth-immunity": {
    label: "Slow growth & weak immunity",
    hint: "Poor FCR, uneven size, stress after weather change",
  },
  "liver-hp": {
    label: "Liver / hepatopancreas health",
    hint: "Pale or shrunken HP, poor digestion",
  },
  "water-hardness": {
    label: "Hard water & pH swings",
    hint: "High hardness, heavy metals, unstable pH",
  },
  "algae-snails": {
    label: "Algae & snails",
    hint: "Unwanted algae, molluscs during pond preparation",
  },
  hatchery: {
    label: "Hatchery & larvae care",
    hint: "Nauplii, zoea, mysis and post-larvae stages",
  },
} as const satisfies Record<string, { label: string; hint: string }>;

export type ProblemSlug = keyof typeof problems;

export const species = {
  fish: { label: "Fish" },
  shrimp: { label: "Shrimp & Prawn" },
} as const;

export type SpeciesSlug = keyof typeof species;

export const applications = {
  water: { label: "Pond water" },
  soil: { label: "Pond soil" },
  feed: { label: "Mix in feed" },
  hatchery: { label: "Hatchery" },
} as const;

export type ApplicationSlug = keyof typeof applications;
