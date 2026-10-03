import type {
  ApplicationSlug,
  CategorySlug,
  ProblemSlug,
  SpeciesSlug,
} from "./taxonomy";

/**
 * Product catalogue.
 *
 * Sources: Provet Product Booklet 2023, Hindi product catalogue, provet.in (BluNova range)
 * and the Provet price list FY2027. MRP is inclusive of GST. Selling price is derived
 * from MRP in lib/pricing.ts — do not store discounted prices here.
 *
 * A pack without `mrp` is shown as "Price on request".
 */

export type Pack = {
  size: string;
  mrp?: number;
  gstPercent?: number;
  sapCode?: string;
  hsn?: string;
};

export type DosageGroup = {
  title?: string;
  rows: { label: string; value: string }[];
};

export type Product = {
  slug: string;
  name: string;
  nameHi: string;
  brand: string;
  tagline: string;
  category: CategorySlug;
  description: string;
  composition: string;
  benefits: string[];
  dosage: DosageGroup[];
  method?: string;
  packs: Pack[];
  species: SpeciesSlug[];
  applications: ApplicationSlug[];
  problems: ProblemSlug[];
  /** Extra search terms, including Hindi and common farmer phrasing. */
  keywords: string[];
};

const BRAND = "Provet BluNova";

export const products: Product[] = [
  // ───────────────────────── Soil & water probiotics ─────────────────────────
  {
    slug: "aquabac",
    name: "Aquabac",
    nameHi: "एक्वाबैक",
    brand: BRAND,
    tagline: "Soil & water probiotic for stabilising pond ecology",
    category: "probiotics",
    description:
      "A high-quality probiotic blend that breaks down organic waste, keeps harmful bacteria in check and supports a healthy plankton bloom. Suitable for biofloc systems.",
    composition:
      "NLT 5 billion CFU/g of viable spores of B. subtilis, B. licheniformis, L. acidophilus, L. sporogenes and Saccharomyces cerevisiae in a compatible base.",
    benefits: [
      "Bioremediation of all kinds of organic waste",
      "Reduces stress conditions in pond water",
      "Helps eliminate pathogenic bacteria from pond water",
      "Minimises water changes during the culture period",
      "Promotes growth of phytoplankton",
    ],
    dosage: [
      {
        title: "Shrimp ponds",
        rows: [
          { label: "5–7 days before stocking", value: "1 kg/acre (low density) · 1.5 kg/acre (high density)" },
          { label: "Every 10–15 days after stocking", value: "0.5 kg/acre (low density) · 1 kg/acre (high density)" },
        ],
      },
      {
        rows: [
          { label: "Fish ponds", value: "500 g per acre" },
          { label: "Hatcheries (shrimp & fish)", value: "50–70 g per 1000 litres" },
          { label: "Biofloc", value: "200–250 g per 10,000 litre tank" },
        ],
      },
    ],
    method: "Soak the required quantity for 30 minutes before applying to the pond.",
    packs: [{ size: "1 kg", mrp: 1440, gstPercent: 0, sapCode: "6001082", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["water", "soil", "hatchery"],
    problems: ["pond-bottom", "vibrio", "ammonia-nitrite"],
    keywords: ["probiotic", "biofloc", "pond probiotic", "प्रोबायोटिक", "पानी साफ"],
  },
  {
    slug: "bacitox-plus",
    name: "Bacitox Plus",
    nameHi: "बेसिटॉक्स प्लस",
    brand: BRAND,
    tagline: "Unique & innovative soil and water conditioner",
    category: "probiotics",
    description:
      "Converts harmful H₂S, ammonia and nitrite into harmless forms that feed plankton. Releases bacteriocins that kill harmful bacteria and controls vibrio populations.",
    composition:
      "NLT 10 billion CFU/g of B. subtilis, B. licheniformis, B. megaterium, B. polymyxa, Nitrosomonas, Nitrobacter, Rhodobacter, Rhodococcus and Thiobacillus denitrificans.",
    benefits: [
      "Keeps pond bottom hygienic and water clear by digesting sediments",
      "Removes toxic materials and foul-smelling gases",
      "Maintains dissolved oxygen by lowering BOD and COD",
      "Effective over a wide range of pH and salinity",
      "Maintains a stable plankton bloom",
    ],
    dosage: [
      {
        title: "Shrimp ponds",
        rows: [
          { label: "5–7 days before stocking", value: "400 g/acre (low density) · 600 g/acre (high density)" },
          { label: "Every 10–15 days after stocking", value: "200 g/acre (low density) · 400 g/acre (high density)" },
        ],
      },
      {
        rows: [
          { label: "Fish ponds", value: "100–150 g per acre" },
          { label: "Hatcheries (shrimp & fish)", value: "25–40 g per 1000 litres" },
        ],
      },
    ],
    method: "Soak the required quantity for 30 minutes before applying to the pond.",
    packs: [
      { size: "250 g", mrp: 990, gstPercent: 0, sapCode: "6001121", hsn: "23099090" },
      { size: "1 kg", mrp: 3600, gstPercent: 0, sapCode: "6001079", hsn: "23099090" },
    ],
    species: ["fish", "shrimp"],
    applications: ["water", "soil", "hatchery"],
    problems: ["pond-bottom", "ammonia-nitrite", "vibrio", "low-oxygen"],
    keywords: ["H2S", "hydrogen sulphide", "sludge", "soil probiotic", "मिट्टी", "बदबू"],
  },
  {
    slug: "rhodobac",
    name: "Rhodobac",
    nameHi: "रोडोबैक",
    brand: BRAND,
    tagline: "Stable multi-strain liquid probiotic blend",
    category: "probiotics",
    description:
      "Liquid probiotic that controls sludge, removes foul smell and H₂S, and stabilises algal blooms. Effective across a wide range of salinity.",
    composition:
      "Rhodococcus spp., Rhodobacter spp., Bacillus spp., Nitrosomonas spp. and Lactobacillus spp., fortified with nitrifying and denitrifying bacteria in liquid form.",
    benefits: [
      "Prevents and controls loose pond bottom and rotten-egg smell",
      "Controls H₂S (desulphurisation)",
      "Controls sludge build-up and stabilises algal blooms",
      "Breaks down dissolved protein and unused feed",
      "Enhances zooplankton in the pond",
    ],
    dosage: [
      {
        rows: [
          { label: "Pond application", value: "1–5 litres per acre, depending on pond hygiene" },
        ],
      },
    ],
    method: "Mix with water or sand and sprinkle over the pond surface.",
    packs: [
      { size: "1 L", mrp: 450, gstPercent: 0, sapCode: "6001012", hsn: "23099090" },
      { size: "5 L", mrp: 1980, gstPercent: 0, sapCode: "6001013", hsn: "23099090" },
      { size: "20 L", mrp: 7200, gstPercent: 0, sapCode: "6001024", hsn: "23099090" },
    ],
    species: ["fish", "shrimp"],
    applications: ["water", "soil"],
    problems: ["pond-bottom", "ammonia-nitrite"],
    keywords: ["liquid probiotic", "rotten egg smell", "H2S", "black soil", "तरल प्रोबायोटिक"],
  },
  {
    slug: "fepromix",
    name: "Fepromix",
    nameHi: "फेप्रोमिक्स",
    brand: BRAND,
    tagline: "Optimised blend of gut probiotics",
    category: "probiotics",
    description:
      "Feed probiotic that builds a healthy gut flora in fish and shrimp. Helps prevent white faecal syndrome and vibrio, and improves digestion and FCR.",
    composition:
      "Beneficial strains of Saccharomyces spp., Lactobacillus spp., Bifidobacterium spp. and Bacillus spp.",
    benefits: [
      "Prevents and controls white faecal syndrome and vibrio",
      "Maintains a healthy, balanced gut microflora",
      "Reduces digestive upsets and improves metabolism",
      "Improves FCR and disease resistance, lowers mortality",
    ],
    dosage: [
      {
        rows: [
          { label: "Shrimp", value: "3–5 g per kg of feed" },
          { label: "Fish", value: "2–2.5 g per kg of feed" },
        ],
      },
    ],
    packs: [{ size: "1 kg", mrp: 1800, gstPercent: 0, sapCode: "6001011", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["feed"],
    problems: ["white-gut", "vibrio", "growth-immunity"],
    keywords: ["gut probiotic", "feed probiotic", "white faeces", "पेट", "सफेद मल"],
  },
  {
    slug: "hatchpro",
    name: "Hatchpro",
    nameHi: "हैचप्रो",
    brand: BRAND,
    tagline: "Potent & soluble probiotic water conditioner for hatcheries",
    category: "probiotics",
    description:
      "Specialised microbial blend for shrimp hatcheries. Keeps tank water clean and free of toxic gases in both fresh and sea water.",
    composition:
      "B. subtilis, B. licheniformis, B. megaterium, B. polymyxa, B. pumilus, B. coagulans and B. clausii, enriched with nitrifying and denitrifying bacteria and Saccharomyces cerevisiae.",
    benefits: [
      "Inhibits pathogenic bacteria and increases disease resistance",
      "Keeps water clear by digesting sediments",
      "Keeps tanks free of toxic materials and foul gases",
      "Leaves no residues",
    ],
    dosage: [
      {
        title: "Normal conditions",
        rows: [
          { label: "Day before stocking", value: "2 g per MT of culture water" },
          { label: "N5 to PL1", value: "1 g per MT" },
          { label: "PL1 to PL12", value: "0.5 g per MT" },
        ],
      },
      {
        rows: [
          { label: "Zoea-2 syndrome (till Z3)", value: "2–5 g per MT" },
          { label: "Broodstock", value: "2–5 g per MT" },
        ],
      },
    ],
    packs: [{ size: "500 g", mrp: 5760, gstPercent: 0, sapCode: "6001047", hsn: "23099990" }],
    species: ["shrimp"],
    applications: ["hatchery", "water"],
    problems: ["hatchery", "vibrio"],
    keywords: ["hatchery probiotic", "larvae", "zoea", "हैचरी"],
  },

  // ───────────────────────── Ammonia & nitrite ─────────────────────────
  {
    slug: "envipro-gold",
    name: "Envipro Gold",
    nameHi: "एनविप्रो गोल्ड",
    brand: BRAND,
    tagline: "Phytobiotic liquid ammonia binder",
    category: "ammonia-control",
    description:
      "Plant-based urease inhibitor that binds free ammonia in the pond. Also improves digestion, feed intake and survival. Non-toxic with no withdrawal period.",
    composition: "Polyphenols and triterpenoid saponins.",
    benefits: [
      "Reduces ammonia and other noxious gases",
      "Prevents growth of pathogenic bacteria",
      "Improves feed intake and growth",
      "Helps relieve stress and improves survival",
    ],
    dosage: [
      {
        rows: [
          { label: "Pond application", value: "250 ml per acre, repeat every 10–15 days" },
          { label: "Feed application", value: "1 ml per kg of feed" },
        ],
      },
    ],
    packs: [{ size: "500 ml", mrp: 1800, gstPercent: 0, sapCode: "6001103", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["water", "feed"],
    problems: ["ammonia-nitrite"],
    keywords: ["ammonia binder", "yucca", "अमोनिया", "गैस"],
  },
  {
    slug: "dynablend",
    name: "Dynablend",
    nameHi: "डायनाब्लेंड",
    brand: BRAND,
    tagline: "Stable combination for reducing ammonia",
    category: "ammonia-control",
    description:
      "Yucca with probiotics and digestive enzymes that break down sludge and leftover feed, cutting ammonia and H₂S levels.",
    composition:
      "Yucca schidigera, Bacillus spp., L. acidophilus, Saccharomyces cerevisiae and enzymes (protease, amylase, lipase, beta-glucanase, xylanase, cellulase), fortified with nitrifying and denitrifying bacteria.",
    benefits: [
      "Reduces ammonia and H₂S concentration",
      "Reduces odour and sludge",
      "Inhibits urease activity",
      "Helps prevent black gills, swollen gills, tail rot and appendage necrosis",
    ],
    dosage: [
      {
        rows: [
          { label: "Prevention", value: "500 g per acre, repeat every 10–15 days" },
          { label: "Control", value: "1–1.5 kg per acre, repeat every 10–15 days" },
        ],
      },
    ],
    method: "Mix in water and spread over the pond.",
    packs: [
      { size: "500 g", mrp: 1350, gstPercent: 0, sapCode: "6001021", hsn: "23099090" },
      { size: "1 kg", mrp: 2610, gstPercent: 0, sapCode: "6001020", hsn: "23099090" },
    ],
    species: ["fish", "shrimp"],
    applications: ["water", "soil"],
    problems: ["ammonia-nitrite", "pond-bottom"],
    keywords: ["yucca", "enzymes", "ammonia", "अमोनिया"],
  },
  {
    slug: "nitrisol-hp",
    name: "Nitrisol HP",
    nameHi: "नाइट्रिसोल एचपी",
    brand: BRAND,
    tagline: "A complete solution for nitrites",
    category: "ammonia-control",
    description:
      "Two-pack nitrifying and denitrifying probiotic system that breaks the cycle of nitrite build-up and converts sulphur compounds to harmless sulphates.",
    composition:
      "Bacillus subtilis, Yucca schidigera, Thiobacillus denitrificans, Nitrosomonas eutropha and Nitrobacter winogradskyi.",
    benefits: [
      "Controls nitrite levels in the pond",
      "Removes nitrogen and solubilises phosphates",
      "Suppresses vibrio and undesirable microbes",
      "Decomposes waste and organic matter",
    ],
    dosage: [
      {
        rows: [
          { label: "Shrimp & fish ponds", value: "Mix Pack 1 and Pack 2 — one combo pack per acre" },
        ],
      },
    ],
    packs: [
      {
        size: "Combo pack (500 g + 1 L)",
        mrp: 2745,
        gstPercent: 0,
        sapCode: "6001051",
        hsn: "23099090",
      },
    ],
    species: ["fish", "shrimp"],
    applications: ["water"],
    problems: ["ammonia-nitrite", "vibrio"],
    keywords: ["nitrite", "नाइट्राइट"],
  },

  // ───────────────────────── Zeolites ─────────────────────────
  {
    slug: "zeomin",
    name: "Zeomin",
    nameHi: "ज़िओमिन",
    brand: BRAND,
    tagline: "A unique blend of mineral zeolites",
    category: "zeolites",
    description:
      "Porous mineral zeolite that absorbs ammonia and toxic gases, purifies water and improves dissolved oxygen.",
    composition: "SiO₂ 82.35–85% · Al₂O₃ 5.28–8% · Fe₂O₃ 0.8–2% · CaO 2.7–3%.",
    benefits: [
      "Adsorbs toxic gases for a clean pond habitat",
      "Catalytic action purifies water and improves dissolved oxygen",
      "Cation exchange removes ammonia and improves soil and water quality",
    ],
    dosage: [
      { rows: [{ label: "Shrimp & fish ponds", value: "10–15 kg per acre" }] },
    ],
    packs: [
      { size: "5 kg", mrp: 522, gstPercent: 0, sapCode: "6001097", hsn: "23099090" },
      { size: "10 kg", mrp: 936, gstPercent: 0, sapCode: "6001016", hsn: "23099090" },
      { size: "25 kg", mrp: 2160, gstPercent: 0, sapCode: "6001017", hsn: "23099090" },
    ],
    species: ["fish", "shrimp"],
    applications: ["water", "soil"],
    problems: ["ammonia-nitrite", "pond-bottom", "low-oxygen"],
    keywords: ["zeolite", "ज़ियोलाइट", "जिओलाइट"],
  },
  {
    slug: "zeomin-forte",
    name: "Zeomin Forte",
    nameHi: "ज़िओमिन फोर्ट",
    brand: BRAND,
    tagline: "Triple-action mineral zeolite with probiotics",
    category: "zeolites",
    description:
      "Zeolite fortified with Bacillus probiotics — absorbs toxic gases while beneficial bacteria control pathogens and stabilise oxygen.",
    composition:
      "SiO₂ 82.35–85% · Al₂O₃ 5.28–8% · Fe₂O₃ 0.8–2% · CaO 2.7–3% · Bacillus spp. NLT 2500 million CFU/kg.",
    benefits: [
      "Probiotic effect controls bacterial pathogens",
      "Adsorbs ammonia and toxic gases",
      "Improves dissolved oxygen and water quality",
    ],
    dosage: [
      { rows: [{ label: "Shrimp & fish ponds", value: "10–15 kg per acre" }] },
    ],
    packs: [{ size: "10 kg", mrp: 2250, gstPercent: 0, sapCode: "6001061", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["water", "soil"],
    problems: ["ammonia-nitrite", "pond-bottom", "vibrio"],
    keywords: ["zeolite", "probiotic zeolite", "ज़ियोलाइट"],
  },

  // ───────────────────────── Oxygen ─────────────────────────
  {
    slug: "dissox",
    name: "Dissox",
    nameHi: "डिसॉक्स",
    brand: BRAND,
    tagline: "Eco-friendly granules for dissolved oxygen",
    category: "oxygen",
    description:
      "Oxygen-releasing granules for emergencies and routine use. Also degrades organic matter and is used during live fish transport.",
    composition: "Sodium carbonate peroxyhydrate granules.",
    benefits: [
      "Releases oxygen quickly when applied",
      "Improves water quality and degrades organic matter",
      "Useful during fish and shrimp transportation",
    ],
    dosage: [
      {
        rows: [
          { label: "Regular application", value: "1–2 kg per acre" },
          { label: "Low dissolved oxygen", value: "2–3 kg per acre" },
          { label: "During transportation", value: "3 g per cubic metre of water" },
        ],
      },
    ],
    packs: [
      { size: "1 kg", mrp: 495, gstPercent: 18, sapCode: "6001015", hsn: "28369990" },
      { size: "10 kg", mrp: 4500, gstPercent: 18, sapCode: "6001070", hsn: "28369990" },
    ],
    species: ["fish", "shrimp"],
    applications: ["water"],
    problems: ["low-oxygen"],
    keywords: ["oxygen", "DO", "ऑक्सीजन", "मछली ऊपर"],
  },
  {
    slug: "dissox-fla-tablets",
    name: "Dissox FLA Tablets",
    nameHi: "डिसॉक्स एफएलए टैबलेट",
    brand: BRAND,
    tagline: "Oxygen tablets that also absorb pond-bottom gases",
    category: "oxygen",
    description:
      "Tablet form of Dissox. Generates and stabilises dissolved oxygen, absorbs harmful gases from the pond bottom and prevents floating heads. No residue or withdrawal period.",
    composition: "Sodium carbonate peroxyhydrate.",
    benefits: [
      "Immediate release of oxygen",
      "Prevents floating heads in fish and shrimp",
      "Reduces nitrite and H₂S levels",
      "Degrades organic matter",
    ],
    dosage: [
      {
        rows: [
          { label: "Regular application", value: "1–2 kg per acre" },
          { label: "Oxygen depletion", value: "2–3 kg per acre" },
          { label: "During transportation", value: "3 g per cubic metre of water" },
        ],
      },
    ],
    method: "Spread tablets directly into the pond. Do not dissolve in water before use.",
    packs: [{ size: "1 kg", mrp: 1080, gstPercent: 18, sapCode: "6001058", hsn: "23369990" }],
    species: ["fish", "shrimp"],
    applications: ["water", "soil"],
    problems: ["low-oxygen", "pond-bottom"],
    keywords: ["oxygen tablet", "ऑक्सीजन गोली"],
  },

  // ───────────────────────── Disinfectants ─────────────────────────
  {
    slug: "benzatec-80",
    name: "Benzatec 80",
    nameHi: "बेंज़ाटेक 80",
    brand: BRAND,
    tagline: "Powerful and proven biocide & sanitizer",
    category: "disinfectants",
    description:
      "BKC-based pond disinfectant that prevents secondary infections and controls bacterial, fungal and algal loads. Also used against red disease in shrimp hatcheries.",
    composition: "Benzalkonium chloride (BKC) 80%.",
    benefits: [
      "Prevents bacterial and fungal diseases",
      "Controls bacterial and algal loads",
      "Prevents secondary infections",
    ],
    dosage: [
      {
        rows: [
          { label: "Shrimp & fish ponds", value: "375–650 ml per acre per metre water depth" },
          { label: "Regular use", value: "Once every 7–10 days" },
          { label: "Shrimp hatcheries (red disease)", value: "One-day bath in 1–2 ppm solution" },
        ],
      },
    ],
    packs: [
      { size: "1 L", mrp: 1620, gstPercent: 18, sapCode: "6001039", hsn: "28089440" },
      { size: "5 L", mrp: 7470, gstPercent: 18, sapCode: "6001040", hsn: "23089090" },
    ],
    species: ["fish", "shrimp"],
    applications: ["water", "hatchery"],
    problems: ["disease-prevention", "vibrio", "algae-snails"],
    keywords: ["BKC", "benzalkonium", "disinfectant", "दवा", "कीटाणुनाशक"],
  },
  {
    slug: "profect-plus",
    name: "Profect Plus",
    nameHi: "प्रोफेक्ट प्लस",
    brand: BRAND,
    tagline: "Highly potent broad-spectrum sanitizer",
    category: "disinfectants",
    description:
      "Fast-acting, non-corrosive triple-salt sanitizer effective against WSSV, MBV, vibrio and other pathogens. Does not affect dissolved oxygen or phytoplankton.",
    composition:
      "Potassium monopersulphate, potassium hydrogen sulphate and potassium sulphate (triple salt) with sodium dichloroisocyanurate (NaDCC).",
    benefits: [
      "Effective against WSSV, MBV and Vibrio spp.",
      "Destroys biofilms with strong oxidising action",
      "Does not affect water quality, DO or phytoplankton",
      "Biodegradable and eco-friendly",
    ],
    dosage: [
      {
        rows: [
          { label: "Hatcheries (shrimp/fish)", value: "5 g per 1000 litres" },
          { label: "Ponds (shrimp/fish)", value: "500 g – 1 kg per hectare" },
          { label: "Equipment, nets, foot dips", value: "10 g per litre of water" },
        ],
      },
    ],
    method: "Dissolve in water in a clean container outside the pond, then spray uniformly.",
    packs: [{ size: "500 g", mrp: 1800, gstPercent: 18, sapCode: "6001113", hsn: "28334000" }],
    species: ["fish", "shrimp"],
    applications: ["water", "hatchery"],
    problems: ["disease-prevention", "vibrio"],
    keywords: ["triple salt", "white spot", "WSSV", "virus", "वायरस"],
  },
  {
    slug: "profect-ultra",
    name: "Profect Ultra",
    nameHi: "प्रोफेक्ट अल्ट्रा",
    brand: BRAND,
    tagline: "Broad-spectrum algaecide & molluscicide",
    category: "disinfectants",
    description:
      "Pond-preparation disinfectant sprayed on wet pond bottoms and dikes. Effective against pathogenic viruses, bacteria, fungi, protozoa, molluscs and algae.",
    composition: "BKC, DDAC, DDAB, PHMB, PHMG and glutaraldehyde.",
    benefits: [
      "Kills viruses, bacteria, fungi and protozoa",
      "Controls snails and other molluscs",
      "Controls unwanted algae",
    ],
    dosage: [
      {
        rows: [
          { label: "Pond preparation", value: "2 litres per acre, sprayed on wet pond bottom and dikes" },
        ],
      },
    ],
    packs: [{ size: "1 L" }],
    species: ["fish", "shrimp"],
    applications: ["soil"],
    problems: ["algae-snails", "disease-prevention"],
    keywords: ["algaecide", "snail", "molluscicide", "घोंघा", "काई"],
  },

  // ───────────────────────── Minerals ─────────────────────────
  {
    slug: "minblend",
    name: "Minblend",
    nameHi: "मिनब्लेंड",
    brand: BRAND,
    tagline: "Stable blend of macro minerals",
    category: "minerals",
    description:
      "Macro-mineral blend that balances mineral ratios in pond water. Prevents cramps and white muscle in shrimp and supports timely moulting.",
    composition: "Calcium, magnesium, potassium, sodium and chlorides in a compatible base.",
    benefits: [
      "Prevents white muscle disease and cramps in shrimp",
      "Controls slow mortality and low survival",
      "Supports timely moulting and uniform growth",
      "Develops plankton",
    ],
    dosage: [
      {
        title: "Ponds",
        rows: [
          { label: "Pond preparation", value: "20–30 kg per hectare" },
          { label: "During culture", value: "10–20 kg per hectare per week" },
          { label: "Rainy season / moulting", value: "50–100 kg per hectare" },
        ],
      },
      { rows: [{ label: "Fish & prawn feed", value: "10 kg per ton of feed" }] },
    ],
    method: "Mix with water or sand and sprinkle over the pond surface.",
    packs: [{ size: "25 kg", mrp: 2070, gstPercent: 0, sapCode: "6001019", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["water", "feed"],
    problems: ["moulting-shell", "growth-immunity"],
    keywords: ["mineral", "white muscle", "cramp", "खनिज", "मिनरल"],
  },
  {
    slug: "mipramax",
    name: "Mipramax",
    nameHi: "मिप्रामैक्स",
    brand: BRAND,
    tagline: "Essential minerals with probiotics & amino acids",
    category: "minerals",
    description:
      "Complete mineral mix enriched with Bacillus probiotics, methionine and lysine. Supports regular moulting, plankton and uniform growth.",
    composition:
      "Essential minerals with B. subtilis, B. licheniformis, B. pumilus, B. polymyxa, B. megaterium, DL-methionine and L-lysine.",
    benefits: [
      "Prevents white muscle disease and mortality",
      "Promotes regular moulting in shrimp",
      "Improves FCR, digestion and uniform growth",
      "Promotes plankton development",
    ],
    dosage: [
      {
        title: "Ponds",
        rows: [
          { label: "Pond preparation", value: "20–30 kg per hectare" },
          { label: "During culture", value: "10–20 kg per hectare, once a fortnight" },
        ],
      },
      { rows: [{ label: "Fish & prawn feed", value: "10 kg per ton of feed" }] },
    ],
    packs: [{ size: "10 kg", mrp: 2070, gstPercent: 0, sapCode: "6001018", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["water", "feed"],
    problems: ["moulting-shell", "growth-immunity"],
    keywords: ["mineral", "probiotic mineral", "खनिज", "मिनरल"],
  },
  {
    slug: "mintroplex-gold",
    name: "Mintroplex Gold",
    nameHi: "मिंट्रोप्लेक्स गोल्ड",
    brand: BRAND,
    tagline: "Chelated minerals, vitamins & amino acids for moulting",
    category: "minerals",
    description:
      "Chelated mineral and vitamin premix that stimulates moulting, prevents loose shell and acts as a growth promoter in shrimp and fish.",
    composition:
      "Calcium, phosphorus, cobalt, copper, iodine, iron, magnesium, manganese, potassium, selenium, sodium, sulphur, zinc, vitamins A, D₃, E, biotin, nicotinamide, DL-methionine and L-lysine.",
    benefits: [
      "Prevents and controls loose shell disease",
      "Stimulates and regulates moulting",
      "Counters vitamin and mineral deficiencies",
      "Reduces stress and mortality",
    ],
    dosage: [
      {
        title: "Shrimp",
        rows: [
          { label: "Regular use", value: "5 g per kg of feed, once a day" },
          { label: "During moulting", value: "10 g per kg of feed, twice a day" },
          { label: "Pond application", value: "4 kg per acre" },
        ],
      },
      { rows: [{ label: "Fish", value: "5 g per kg of feed" }] },
    ],
    method: "Mix with a binder to make a premix, then mix evenly into the feed.",
    packs: [
      { size: "1 kg", mrp: 630, gstPercent: 0, sapCode: "6001073", hsn: "23099090" },
      { size: "10 kg", mrp: 6480, gstPercent: 0, sapCode: "6001131", hsn: "23099090" },
    ],
    species: ["fish", "shrimp"],
    applications: ["feed", "water"],
    problems: ["moulting-shell", "growth-immunity"],
    keywords: ["loose shell", "soft shell", "chelated", "vitamin", "कवच", "मोल्टिंग"],
  },
  {
    slug: "mintroplex-ultra",
    name: "Mintroplex Ultra",
    nameHi: "मिंट्रोप्लेक्स अल्ट्रा",
    brand: BRAND,
    tagline: "Highly bioavailable liquid minerals",
    category: "minerals",
    description:
      "Liquid ionic minerals that correct Na, K, Mg and Ca imbalances which cause osmotic stress. Aids moulting and shell hardness.",
    composition:
      "Per ml: calcium diacid phosphate 103.8 mg, phosphorus pentoxide 236.2 mg, magnesium diacid phosphate 109.4 mg, sodium diacid phosphate 45.4 mg, manganese 11.2 mg, zinc 10.4 mg, copper 2.6 mg, cobalt 0.12 mg (as diacid phosphates).",
    benefits: [
      "Easily absorbed ionic minerals",
      "Aids moulting and growth",
      "Maintains brightness and rigidity of the shell",
      "Prevents and controls loose shell disease",
    ],
    dosage: [
      {
        rows: [
          { label: "Shrimp & fish", value: "5 ml per kg of feed through the culture" },
          { label: "Quick improvement", value: "10 ml per kg of feed" },
        ],
      },
    ],
    method: "Mix evenly into feed, dry in shade for about 30 minutes, then feed.",
    packs: [{ size: "1 L", mrp: 855, gstPercent: 0, sapCode: "6001107", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["feed"],
    problems: ["moulting-shell", "growth-immunity"],
    keywords: ["liquid mineral", "loose shell", "कवच", "मोल्टिंग"],
  },
  {
    slug: "maxigro-xl",
    name: "Maxigro XL",
    nameHi: "मैक्सीग्रो एक्सएल",
    brand: BRAND,
    tagline: "Minerals with amino acids, immunostimulants & antioxidants",
    category: "minerals",
    description:
      "Hatchery-focused nutrition that improves larval stage conversion, moulting and survival of post-larvae. Also used in grow-out ponds.",
    composition:
      "Sodium, potassium, magnesium, iron, copper, cobalt, manganese, selenium and zinc with amino acids, natural antioxidants and complex polysaccharides.",
    benefits: [
      "Improves zoea and mysis stage conversion",
      "Improves moulting and recovery from nauplii to post-larvae",
      "Stimulates immunity and reduces stress",
      "Improves gut health and PL survival",
    ],
    dosage: [
      {
        title: "Shrimp hatcheries",
        rows: [
          { label: "Nauplii – zoea tanks", value: "0.5–1 ppm daily" },
          { label: "Zoea – mysis – PL tanks", value: "2–3 ppm daily" },
          { label: "Post-larvae tanks", value: "3–4 ppm daily" },
          { label: "Nursery tanks", value: "4–5 ppm daily" },
        ],
      },
      { rows: [{ label: "Shrimp ponds", value: "5 ml per kg of feed or 100 ml per acre" }] },
    ],
    packs: [{ size: "1 L", mrp: 1530, gstPercent: 0, sapCode: "6001117", hsn: "23099090" }],
    species: ["shrimp"],
    applications: ["hatchery", "feed", "water"],
    problems: ["hatchery", "growth-immunity", "moulting-shell"],
    keywords: ["larvae", "PL survival", "हैचरी"],
  },
  {
    slug: "solumin-l",
    name: "Solumin-L",
    nameHi: "सोलुमिन-एल",
    brand: BRAND,
    tagline: "Bioavailable micro & macro minerals (liquid)",
    category: "minerals",
    description:
      "Concentrated ionic mineral blend for shrimp hatcheries. Supports osmoregulation, acid-base balance and skeletal development.",
    composition:
      "Calcium, phosphorus, magnesium, sodium, manganese, zinc, copper and cobalt in ionic form.",
    benefits: [
      "Enhances immunity and disease resistance",
      "Improves survival and growth",
      "Corrects mineral ion imbalance in water",
      "Supports exoskeleton development",
    ],
    dosage: [{ rows: [{ label: "Hatchery tanks", value: "3–5 ml per MT of water (3–5 ppm)" }] }],
    packs: [{ size: "1 L", mrp: 2340, gstPercent: 0, sapCode: "6001109", hsn: "23099090" }],
    species: ["shrimp"],
    applications: ["hatchery", "water"],
    problems: ["hatchery", "moulting-shell"],
    keywords: ["hatchery mineral", "हैचरी"],
  },
  {
    slug: "solumin-s",
    name: "Solumin-S",
    nameHi: "सोलुमिन-एस",
    brand: BRAND,
    tagline: "Essential minerals with amino acids & probiotics",
    category: "minerals",
    description:
      "Highly soluble mineral blend with lysine, methionine and Bacillus for larval rearing and broodstock maturation.",
    composition: "Micro and macro minerals with lysine, methionine and Bacillus spp.",
    benefits: [
      "Supports robust larval growth",
      "Enhances immune function and survival",
      "Improves FCR and nutrient absorption",
    ],
    dosage: [{ rows: [{ label: "Hatchery tanks", value: "3–5 g per MT of water (3–5 ppm)" }] }],
    method:
      "Larval rearing: add directly to tanks. Maturation: mix with fresh or frozen feed one hour before feeding.",
    packs: [{ size: "500 g", mrp: 2700, gstPercent: 0, sapCode: "6001046", hsn: "23099090" }],
    species: ["shrimp"],
    applications: ["hatchery", "feed"],
    problems: ["hatchery", "growth-immunity"],
    keywords: ["solumin", "broodstock", "हैचरी"],
  },

  // ───────────────────────── Feed additives ─────────────────────────
  {
    slug: "vibrocid",
    name: "Vibrocid",
    nameHi: "वाइब्रोसिड",
    brand: BRAND,
    tagline: "Phytobiotic against vibrio",
    category: "feed-additives",
    description:
      "Plant extracts with organic acids and short-chain fatty acids that fight vibrio and bacterial infections and improve survival and growth.",
    composition:
      "Protected vegetable extracts, organic acids and their salts, and short-chain fatty acids.",
    benefits: [
      "Prevents and controls vibrio loads",
      "Helps prevent white faecal syndrome",
      "Improves feed digestibility and nutrient absorption",
      "Improves FCR and daily growth",
    ],
    dosage: [
      {
        rows: [
          { label: "Prevention", value: "10–15 g per kg of feed, one meal daily" },
          { label: "Control (high vibrio risk)", value: "15–20 g per kg of feed, 1–2 meals for 7–10 days" },
        ],
      },
    ],
    method: "For best results mix into feed together with Nagrowall and Orbigel-HP.",
    packs: [{ size: "1 kg", mrp: 3150, gstPercent: 0, sapCode: "6001031", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["feed"],
    problems: ["vibrio", "white-gut"],
    keywords: ["vibrio", "red uropod", "बैक्टीरिया"],
  },
  {
    slug: "pathostat-blu",
    name: "Pathostat Blu",
    nameHi: "पैथोस्टैट ब्लू",
    brand: BRAND,
    tagline: "Antiviral, antibacterial & antifungal phytobiotics",
    category: "feed-additives",
    description:
      "Quintessential feed additive that rejuvenates the hepatopancreas and fights RMS, EMS, WSSV, EHP, WFS and white gut disease.",
    composition:
      "Tannins, polyphenols, mucilage, plant extracts, curcumin, tricholine citrate, allicin, thymol, potassium diformate, formic acid and minerals.",
    benefits: [
      "Effective against WSSV, EHP, WFS and white gut disease",
      "Rejuvenates damaged hepatopancreas cells",
      "Improves gut health and feed intake",
      "Improves daily weight gain and FCR",
    ],
    dosage: [
      {
        rows: [
          { label: "Prevention", value: "10–15 g per kg of feed, every 2 days in the last feed" },
          { label: "Control", value: "15–20 g per kg of feed, twice daily for one week" },
        ],
      },
    ],
    method: "Premix with Orbigel-HP, then mix evenly into the final feed.",
    packs: [{ size: "500 g", mrp: 3150, gstPercent: 0, sapCode: "6001069", hsn: "23099090" }],
    species: ["shrimp", "fish"],
    applications: ["feed"],
    problems: ["white-gut", "disease-prevention", "liver-hp"],
    keywords: ["EHP", "WSSV", "RMS", "EMS", "white gut", "वायरस"],
  },
  {
    slug: "syngromix",
    name: "Syngromix",
    nameHi: "सिंग्रोमिक्स",
    brand: BRAND,
    tagline: "Phytobiotic hepatopancreatic protector & growth enhancer",
    category: "feed-additives",
    description:
      "Protected organic acids, plant extracts and essential oils that protect the liver, improve digestion and help prevent white gut and white faecal syndrome.",
    composition: "Protected organic acids, essential oils, plant extracts and flavourings.",
    benefits: [
      "Protects the liver / hepatopancreas",
      "Prevents and controls white gut and white faecal syndrome",
      "Improves digestion and nutrient absorption",
      "Improves FCR and daily weight gain",
    ],
    dosage: [
      {
        rows: [
          { label: "Shrimp (PL to grow-out)", value: "10–15 g per kg of feed" },
          { label: "Fish (fingerlings to grow-out)", value: "7–10 g per kg of feed" },
        ],
      },
    ],
    method: "Mix into feed daily along with feed probiotics and a binder.",
    packs: [{ size: "1 kg" }],
    species: ["fish", "shrimp"],
    applications: ["feed"],
    problems: ["liver-hp", "white-gut", "growth-immunity"],
    keywords: ["liver tonic", "hepatopancreas", "लिवर"],
  },
  {
    slug: "orbigel-hp",
    name: "Orbigel-HP",
    nameHi: "ऑर्बिजेल-एचपी",
    brand: BRAND,
    tagline: "Hepato-pancreatic stimulant cum feed binding gel",
    category: "feed-additives",
    description:
      "Feed binder that holds additives on the pellet while supporting liver and pancreas function, moulting and nutrient use.",
    composition:
      "Ferrous gluconate, nicotinamide, calcium lactate, yeast extract, choline chloride, cobalt sulphate, copper sulphate, sodium propionate and zinc sulphate.",
    benefits: [
      "Binds feed additives to the feed",
      "Improves liver and pancreas efficiency",
      "Improves moulting and prevents loose shell",
      "Optimises FCR",
    ],
    dosage: [{ rows: [{ label: "Fish & shrimp feed", value: "10–15 g per kg of feed" }] }],
    packs: [
      { size: "5 kg", mrp: 1180, gstPercent: 0, sapCode: "6001080", hsn: "23099090" },
      { size: "30 kg", mrp: 6390, gstPercent: 0, sapCode: "6001081", hsn: "23099090" },
    ],
    species: ["fish", "shrimp"],
    applications: ["feed"],
    problems: ["liver-hp", "growth-immunity"],
    keywords: ["binder", "gel", "feed binder", "बाइंडर"],
  },
  {
    slug: "yeaforte-plus",
    name: "Yeaforte Plus",
    nameHi: "यीफोर्ट प्लस",
    brand: BRAND,
    tagline: "Novel direct-fed microbial (DFM) formulation",
    category: "feed-additives",
    description:
      "Live yeast and Bacillus for both pond and feed use — improves pond ecology and plankton, and boosts survival and daily weight gain.",
    composition: "Saccharomyces cerevisiae and Bacillus spp.",
    benefits: [
      "Pond: improves ecology and stabilises plankton",
      "Feed: improves survival and daily weight gain",
      "Binds pathogens in the gut",
    ],
    dosage: [
      {
        rows: [
          { label: "Pond application", value: "1–2 kg per acre" },
          { label: "Feed application", value: "1–2 g per kg of feed" },
        ],
      },
    ],
    method: "Mix with rice bran and jaggery before application for best results.",
    packs: [{ size: "1 kg", mrp: 585, gstPercent: 0, sapCode: "6001078", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["water", "feed"],
    problems: ["growth-immunity"],
    keywords: ["yeast", "DFM", "खमीर"],
  },
  {
    slug: "blucee",
    name: "Blucee",
    nameHi: "ब्लूसी",
    brand: BRAND,
    tagline: "Highly potent & soluble L-ascorbic acid (Vitamin C)",
    category: "feed-additives",
    description:
      "Fast-dissolving Vitamin C that relieves stress, improves disease resistance and helps larvae moult freely.",
    composition: "L-ascorbic acid (Vitamin C).",
    benefits: [
      "Relieves stress",
      "Improves disease resistance",
      "Helps free moulting in larval and post-larval stages",
    ],
    dosage: [
      {
        rows: [
          { label: "Normal conditions", value: "2–3 ppm" },
          { label: "Stress conditions", value: "5 ppm" },
        ],
      },
    ],
    packs: [{ size: "1 kg", mrp: 2430, gstPercent: 18, sapCode: "6001067", hsn: "29362700" }],
    species: ["shrimp", "fish"],
    applications: ["hatchery", "water"],
    problems: ["hatchery", "growth-immunity"],
    keywords: ["vitamin c", "stress", "विटामिन सी"],
  },
  {
    slug: "ceemax",
    name: "Ceemax",
    nameHi: "सीमैक्स",
    brand: BRAND,
    tagline: "The most stable & bio-available Vitamin C",
    category: "feed-additives",
    description:
      "Stable Vitamin C (L-ascorbic acid 2-phosphate) that survives pelleting, storage and water — for consistent immunity support through feed.",
    composition: "L-ascorbic acid 2-phosphate.",
    benefits: [
      "Over 80% Vitamin C retained after extrusion",
      "High stability in storage and water",
      "High bio-availability",
    ],
    dosage: [
      {
        rows: [
          { label: "Shrimp", value: "0.6–1.5 g per kg of feed" },
          { label: "Fish", value: "0.2–0.8 g per kg of feed" },
          { label: "High temperature / polluted water", value: "Increase by 50–100%" },
        ],
      },
    ],
    packs: [{ size: "1 kg" }, { size: "25 kg" }],
    species: ["fish", "shrimp"],
    applications: ["feed"],
    problems: ["growth-immunity"],
    keywords: ["vitamin c", "विटामिन सी"],
  },

  // ───────────────────────── Immunity ─────────────────────────
  {
    slug: "nagrowall",
    name: "Nagrowall",
    nameHi: "नैग्रोवॉल",
    brand: BRAND,
    tagline: "Non-antibiotic growth & immunity enhancer",
    category: "immunity",
    description:
      "Yeast-derived MOS, beta-glucans and free nucleotides that strengthen immunity, repair the gut lining and reduce mortality from EMS/RMS.",
    composition: "MOS, beta-glucans, nucleotides and nucleosides.",
    benefits: [
      "Restricts colonisation of pathogens in the gut",
      "Improves FCR and palatability of feed",
      "Repairs intestinal cells during white gut disease",
      "Reduces mortality due to EMS/RMS",
    ],
    dosage: [
      {
        title: "Regular use",
        rows: [
          { label: "Shrimp", value: "10–12 g per kg of feed" },
          { label: "Fish", value: "5–10 g per kg of feed" },
        ],
      },
      {
        title: "During stress",
        rows: [
          { label: "Shrimp", value: "15–20 g per kg of feed" },
          { label: "Fish", value: "10–13 g per kg of feed" },
        ],
      },
    ],
    packs: [{ size: "1 kg", mrp: 1620, gstPercent: 0, sapCode: "6001064", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["feed"],
    problems: ["growth-immunity", "white-gut"],
    keywords: ["immunity", "beta glucan", "growth promoter", "रोग प्रतिरोधक"],
  },

  // ───────────────────────── Parasite control ─────────────────────────
  {
    slug: "argucide",
    name: "Argucide",
    nameHi: "आर्गुसाइड",
    brand: BRAND,
    tagline: "A complete ectoparasiticide for fish",
    category: "parasite-control",
    description:
      "Natural garlic-extract (allicin) feed treatment that prevents and controls external parasites such as Argulus and Lernea, helps wounds heal and reduces stress.",
    composition: "Allicin (concentrated garlic extract).",
    benefits: [
      "Controls Argulus (fish lice) and Lernea (anchor worm)",
      "Heals wounds faster",
      "Relieves stress and improves immunity",
    ],
    dosage: [
      {
        rows: [
          { label: "Fish feed", value: "1.5–2.5 g per kg of feed" },
          { label: "Live fish weight", value: "25–30 g per ton, twice daily" },
        ],
      },
    ],
    packs: [{ size: "1 kg" }],
    species: ["fish"],
    applications: ["feed"],
    problems: ["parasites"],
    keywords: ["argulus", "lernea", "fish lice", "जूं", "परजीवी"],
  },
  {
    slug: "ectocyp",
    name: "Ectocyp",
    nameHi: "एक्टोसिप",
    brand: BRAND,
    tagline: "Ectoparasiticide for fish",
    category: "parasite-control",
    description: "Cypermethrin water treatment that prevents and controls external parasites in fish ponds.",
    composition: "Cypermethrin high cis EC 10%.",
    benefits: ["Prevents and controls external parasites", "Reduces parasite stress"],
    dosage: [{ rows: [{ label: "Water application", value: "100 ml per acre" }] }],
    packs: [
      { size: "50 ml", mrp: 108, gstPercent: 5, sapCode: "6001041", hsn: "30049085" },
      { size: "1 L", mrp: 1260, gstPercent: 5, sapCode: "6001042", hsn: "30049085" },
    ],
    species: ["fish"],
    applications: ["water"],
    problems: ["parasites"],
    keywords: ["cypermethrin", "argulus", "lice", "परजीवी"],
  },
  {
    slug: "mectimax",
    name: "Mectimax",
    nameHi: "मेक्टिमैक्स",
    brand: BRAND,
    tagline: "Endectocide for external & internal parasites",
    category: "parasite-control",
    description: "Ivermectin solution for the control and treatment of external and internal parasites in fish and shrimp.",
    composition: "Ivermectin 0.12% w/v.",
    benefits: ["Controls external parasites", "Controls internal parasites"],
    dosage: [
      {
        rows: [
          { label: "Water application", value: "400 ml per acre" },
          { label: "Feed application", value: "1 ml per kg of feed" },
        ],
      },
    ],
    packs: [{ size: "1 L", mrp: 1566, gstPercent: 5, sapCode: "6001074", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["water", "feed"],
    problems: ["parasites"],
    keywords: ["ivermectin", "worms", "कीड़े", "परजीवी"],
  },

  // ───────────────────────── Water & soil balancers ─────────────────────────
  {
    slug: "raprosoft",
    name: "Raprosoft",
    nameHi: "रैप्रोसॉफ्ट",
    brand: BRAND,
    tagline: "Water hardness controller for ponds",
    category: "water-balancers",
    description:
      "EDTA-based softener that reduces hardness, controls heavy-metal toxicity and steadies pH. Works in fresh and salt water.",
    composition: "EDTA fortified with active water-softening agents.",
    benefits: [
      "Reduces water hardness",
      "Controls heavy-metal toxicity",
      "Helps shrimp moult",
      "Promotes plankton growth",
    ],
    dosage: [{ rows: [{ label: "Water application", value: "1–2 kg per acre" }] }],
    method: "Mix in 50 litres of water and broadcast evenly across the pond.",
    packs: [
      { size: "1 kg", mrp: 540, gstPercent: 0, sapCode: "6001094", hsn: "23099090" },
      { size: "5 kg", mrp: 2520, gstPercent: 0, sapCode: "6001098", hsn: "23099090" },
    ],
    species: ["fish", "shrimp"],
    applications: ["water"],
    problems: ["water-hardness", "moulting-shell"],
    keywords: ["EDTA", "hardness", "कठोर पानी"],
  },
  {
    slug: "molasafe",
    name: "Molasafe",
    nameHi: "मोलासेफ",
    brand: BRAND,
    tagline: "Organic carbon with minerals",
    category: "water-balancers",
    description:
      "Spray-dried molasses with organic minerals — a rich energy source that raises carbon levels and feeds beneficial bacteria. Ideal for fermenting rice bran and biofloc.",
    composition: "Spray-dried molasses with micro and macro organic minerals.",
    benefits: [
      "Improves carbon levels in the pond",
      "Supports growth of beneficial bacteria",
      "Improves feed intake",
    ],
    dosage: [
      {
        rows: [
          { label: "Pond preparation / culture breaks", value: "10 kg per hectare" },
          { label: "Improving water quality", value: "5 kg per hectare" },
          { label: "Improving feed intake", value: "5–7 g per kg of feed" },
          { label: "Fermenting rice bran", value: "Half the quantity of jaggery" },
        ],
      },
    ],
    packs: [{ size: "5 kg", mrp: 2970, gstPercent: 0, sapCode: "6001057", hsn: "23099090" }],
    species: ["fish", "shrimp"],
    applications: ["water", "feed"],
    problems: ["pond-bottom", "growth-immunity"],
    keywords: ["molasses", "carbon source", "biofloc", "गुड़", "शीरा"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** Lowest MRP across packs, or undefined if every pack is price-on-request. */
export function lowestMrp(product: Product) {
  const prices = product.packs.flatMap((p) => (p.mrp ? [p.mrp] : []));
  return prices.length ? Math.min(...prices) : undefined;
}
