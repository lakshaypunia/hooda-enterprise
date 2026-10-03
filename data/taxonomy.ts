/**
 * Filter vocabularies for the catalogue. Slugs are used in URLs, so keep them stable.
 */

export const categories = {
  probiotics: {
    label: "Soil & Water Probiotics",
    short: "Probiotics",
    hi: { label: "मिट्टी व पानी के प्रोबायोटिक्स", short: "प्रोबायोटिक्स" },
  },
  "ammonia-control": {
    label: "Ammonia & Nitrite Reducers",
    short: "Ammonia Control",
    hi: { label: "अमोनिया व नाइट्राइट कम करने वाले", short: "अमोनिया नियंत्रण" },
  },
  zeolites: {
    label: "Zeolites & Toxin Binders",
    short: "Zeolites",
    hi: { label: "ज़ियोलाइट व टॉक्सिन बाइंडर", short: "ज़ियोलाइट" },
  },
  oxygen: {
    label: "Oxygen Supplements",
    short: "Oxygen",
    hi: { label: "ऑक्सीजन सप्लीमेंट", short: "ऑक्सीजन" },
  },
  disinfectants: {
    label: "Disinfectants & Sanitizers",
    short: "Disinfectants",
    hi: { label: "कीटाणुनाशक व सैनिटाइज़र", short: "कीटाणुनाशक" },
  },
  minerals: {
    label: "Mineral Supplements",
    short: "Minerals",
    hi: { label: "मिनरल सप्लीमेंट", short: "मिनरल" },
  },
  "feed-additives": {
    label: "Feed Additives & Gut Health",
    short: "Feed Additives",
    hi: { label: "फ़ीड एडिटिव व पेट की सेहत", short: "फ़ीड एडिटिव" },
  },
  immunity: {
    label: "Immunostimulants & Growth Promoters",
    short: "Immunity",
    hi: { label: "रोग प्रतिरोधक व ग्रोथ प्रमोटर", short: "इम्युनिटी" },
  },
  "parasite-control": {
    label: "Parasite Control",
    short: "Parasites",
    hi: { label: "परजीवी नियंत्रण", short: "परजीवी" },
  },
  "water-balancers": {
    label: "Water & Soil Balancers",
    short: "Water Balancers",
    hi: { label: "पानी व मिट्टी संतुलन", short: "पानी संतुलन" },
  },
} as const satisfies Record<string, { label: string; short: string; hi: { label: string; short: string } }>;

export type CategorySlug = keyof typeof categories;

/** Pond problems farmers search by. `hint` is a one-line plain-language symptom. */
export const problems = {
  "ammonia-nitrite": {
    label: "High ammonia / nitrite",
    hint: "Toxic gases, poor water, fish gasping or off-feed",
    hi: {
      label: "ज़्यादा अमोनिया / नाइट्राइट",
      hint: "ज़हरीली गैस, खराब पानी, मछली का हांफना या दाना न खाना",
    },
  },
  "low-oxygen": {
    label: "Low oxygen",
    hint: "Fish or shrimp coming to the surface at dawn",
    hi: { label: "ऑक्सीजन की कमी", hint: "सुबह-सुबह मछली या झींगा पानी की सतह पर आना" },
  },
  "pond-bottom": {
    label: "Black soil & bad smell",
    hint: "Sludge, rotten-egg smell (H₂S), dirty pond bottom",
    hi: { label: "काली मिट्टी व बदबू", hint: "कीचड़, सड़े अंडे जैसी गंध (H₂S), गंदा तल" },
  },
  vibrio: {
    label: "Vibrio & bacterial load",
    hint: "Red uropods, luminous bacteria, rising mortality",
    hi: { label: "विब्रियो व बैक्टीरिया", hint: "लाल पूंछ, चमकने वाले बैक्टीरिया, बढ़ती मौतें" },
  },
  "white-gut": {
    label: "White gut / white feces",
    hint: "White faecal strings, poor feed intake",
    hi: { label: "सफ़ेद आंत / सफ़ेद मल", hint: "सफ़ेद धागे जैसा मल, दाना कम खाना" },
  },
  "disease-prevention": {
    label: "Virus & disease prevention",
    hint: "WSSV, EHP, fungal and protozoan outbreaks",
    hi: { label: "वायरस व रोग से बचाव", hint: "WSSV, EHP, फंगस और प्रोटोज़ोआ का प्रकोप" },
  },
  parasites: {
    label: "Parasites (Argulus, Lernea)",
    hint: "Fish lice, anchor worm, fish rubbing on surfaces",
    hi: { label: "परजीवी (आर्गुलस, लर्निया)", hint: "मछली की जूं, एंकर वर्म, मछली का रगड़ना" },
  },
  "moulting-shell": {
    label: "Loose shell & moulting",
    hint: "Soft or loose shell, irregular moulting, cramps",
    hi: { label: "ढीला कवच व मोल्टिंग", hint: "नरम या ढीला कवच, अनियमित मोल्टिंग, ऐंठन" },
  },
  "growth-immunity": {
    label: "Slow growth & weak immunity",
    hint: "Poor FCR, uneven size, stress after weather change",
    hi: { label: "धीमी बढ़त व कमज़ोर इम्युनिटी", hint: "खराब FCR, असमान आकार, मौसम बदलने पर तनाव" },
  },
  "liver-hp": {
    label: "Liver / hepatopancreas health",
    hint: "Pale or shrunken HP, poor digestion",
    hi: { label: "लिवर / हेपेटोपैंक्रियास", hint: "पीला या सिकुड़ा HP, कमज़ोर पाचन" },
  },
  "water-hardness": {
    label: "Hard water & pH swings",
    hint: "High hardness, heavy metals, unstable pH",
    hi: { label: "कठोर पानी व pH उतार-चढ़ाव", hint: "ज़्यादा कठोरता, भारी धातु, अस्थिर pH" },
  },
  "algae-snails": {
    label: "Algae & snails",
    hint: "Unwanted algae, molluscs during pond preparation",
    hi: { label: "काई व घोंघे", hint: "तालाब तैयारी के समय अनचाही काई और घोंघे" },
  },
  hatchery: {
    label: "Hatchery & larvae care",
    hint: "Nauplii, zoea, mysis and post-larvae stages",
    hi: { label: "हैचरी व लार्वा देखभाल", hint: "नॉप्लियस, ज़ोइया, मायसिस और पोस्ट-लार्वा अवस्था" },
  },
} as const satisfies Record<string, { label: string; hint: string; hi: { label: string; hint: string } }>;

export type ProblemSlug = keyof typeof problems;

export const species = {
  fish: { label: "Fish", hi: { label: "मछली" } },
  shrimp: { label: "Shrimp & Prawn", hi: { label: "झींगा" } },
} as const;

export type SpeciesSlug = keyof typeof species;

export const applications = {
  water: { label: "Pond water", hi: { label: "तालाब का पानी" } },
  soil: { label: "Pond soil", hi: { label: "तालाब की मिट्टी" } },
  feed: { label: "Mix in feed", hi: { label: "दाने में मिलाएं" } },
  hatchery: { label: "Hatchery", hi: { label: "हैचरी" } },
} as const;

export type ApplicationSlug = keyof typeof applications;

type Lang = "en" | "hi";

export const problemText = (slug: ProblemSlug, lang: Lang) =>
  lang === "hi" ? problems[slug].hi : { label: problems[slug].label, hint: problems[slug].hint };

export const categoryText = (slug: CategorySlug, lang: Lang) =>
  lang === "hi" ? categories[slug].hi : { label: categories[slug].label, short: categories[slug].short };

export const speciesLabel = (slug: SpeciesSlug, lang: Lang): string =>
  lang === "hi" ? species[slug].hi.label : species[slug].label;

export const applicationLabel = (slug: ApplicationSlug, lang: Lang): string =>
  lang === "hi" ? applications[slug].hi.label : applications[slug].label;
