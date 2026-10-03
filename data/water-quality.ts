import type { ProblemSlug } from "./taxonomy";

/**
 * Optimal water quality parameters, from the Provet Product Booklet 2023.
 * `problem` links an out-of-range reading to products that help.
 */
export type WaterParameter = {
  name: string;
  nameHi: string;
  unit?: string;
  shrimp: string;
  fish: string;
  remark?: string;
  remarkHi?: string;
  /** Fish value depends on fresh vs salt water. */
  fishVaries?: boolean;
  problem?: ProblemSlug;
};

export const waterParameters: WaterParameter[] = [
  { name: "Temperature", nameHi: "तापमान", unit: "°C", shrimp: "28 – 32", fish: "26 – 32" },
  {
    name: "Salinity",
    nameHi: "लवणता",
    unit: "ppt",
    shrimp: "10 – 25",
    fish: "< 1",
    fishVaries: true,
    remark: "Daily fluctuation should be < 5 ppt",
    remarkHi: "रोज़ का उतार-चढ़ाव 5 ppt से कम हो",
  },
  {
    name: "Dissolved oxygen",
    nameHi: "घुली ऑक्सीजन",
    unit: "ppm",
    shrimp: "> 5.0",
    fish: "> 3.0",
    remark: "Daily fluctuation should be < 0.5 ppm",
    remarkHi: "रोज़ का उतार-चढ़ाव 0.5 ppm से कम हो",
    problem: "low-oxygen",
  },
  { name: "pH", nameHi: "pH", shrimp: "7.8 – 8.2", fish: "7.5 – 8.5", problem: "water-hardness" },
  {
    name: "Alkalinity",
    nameHi: "क्षारीयता",
    unit: "ppm",
    shrimp: "150 – 200",
    fish: "50 – 500",
    problem: "water-hardness",
  },
  {
    name: "Hardness",
    nameHi: "कठोरता",
    unit: "ppm",
    shrimp: "< 400",
    fish: "< 40",
    problem: "water-hardness",
  },
  {
    name: "Total ammonia",
    nameHi: "कुल अमोनिया",
    unit: "ppm",
    shrimp: "0.4 – 2",
    fish: "0.4 – 2",
    remark: "More toxic at high pH",
    remarkHi: "ज़्यादा pH पर ज़्यादा ज़हरीला",
    problem: "ammonia-nitrite",
  },
  {
    name: "Nitrite",
    nameHi: "नाइट्राइट",
    unit: "ppm",
    shrimp: "< 0.01",
    fish: "< 0.1",
    remark: "More toxic at low salinity and pH",
    remarkHi: "कम लवणता और pH पर ज़्यादा ज़हरीला",
    problem: "ammonia-nitrite",
  },
  {
    name: "Unionised ammonia",
    nameHi: "अनआयनित अमोनिया",
    unit: "ppm",
    shrimp: "< 0.1",
    fish: "< 0.1",
    remark: "More toxic at high pH",
    remarkHi: "ज़्यादा pH पर ज़्यादा ज़हरीला",
    problem: "ammonia-nitrite",
  },
  {
    name: "Hydrogen sulphide (H₂S)",
    nameHi: "हाइड्रोजन सल्फ़ाइड (H₂S)",
    unit: "ppm",
    shrimp: "< 0.02",
    fish: "< 0.03",
    remark: "More toxic at low pH",
    remarkHi: "कम pH पर ज़्यादा ज़हरीला",
    problem: "pond-bottom",
  },
  { name: "Iron", nameHi: "आयरन", unit: "ppm", shrimp: "< 0.5", fish: "< 0.5", problem: "water-hardness" },
  {
    name: "Secchi disc visibility",
    nameHi: "सेकी डिस्क से पारदर्शिता",
    unit: "cm",
    shrimp: "35 – 45",
    fish: "25 – 45",
    remark: "Not less than 25 and not more than 50 cm",
    remarkHi: "25 से कम और 50 सेमी से ज़्यादा नहीं",
  },
  {
    name: "Ca : Mg",
    nameHi: "Ca : Mg",
    shrimp: "1 : 1.5–3",
    fish: "1 : 1.5–3",
    fishVaries: true,
    remark: "Based on salinity",
    remarkHi: "लवणता के अनुसार",
    problem: "moulting-shell",
  },
  {
    name: "Na : K",
    nameHi: "Na : K",
    shrimp: "28 : 1",
    fish: "28 : 1",
    fishVaries: true,
    remark: "Based on salinity",
    remarkHi: "लवणता के अनुसार",
    problem: "moulting-shell",
  },
  {
    name: "Ca : K",
    nameHi: "Ca : K",
    shrimp: "1 : 0.9",
    fish: "1 : 0.9",
    fishVaries: true,
    remark: "Based on salinity",
    remarkHi: "लवणता के अनुसार",
    problem: "moulting-shell",
  },
];

export const waterTips = [
  {
    title: "Check oxygen at dawn",
    titleHi: "सुबह-सुबह ऑक्सीजन जांचें",
    textHi:
      "सूरज निकलने से ठीक पहले घुली ऑक्सीजन सबसे कम होती है। अगर सुबह मछली या झींगा सतह पर इकट्ठा हों, तो तुरंत उपाय करें।",
    text: "Dissolved oxygen is lowest just before sunrise. If fish or shrimp gather at the surface early morning, act quickly.",
    problem: "low-oxygen" as const,
  },
  {
    title: "Watch pH in the evening",
    titleHi: "शाम को pH देखें",
    textHi:
      "दोपहर बाद pH सबसे ज़्यादा होता है। ज़्यादा pH पर अमोनिया ज़्यादा ज़हरीली होती है, इसलिए अमोनिया और pH साथ में जांचें।",
    text: "pH peaks in the afternoon. High pH makes ammonia more toxic, so test ammonia and pH together.",
    problem: "ammonia-nitrite" as const,
  },
  {
    title: "Keep the pond bottom clean",
    titleHi: "तालाब का तल साफ़ रखें",
    textHi:
      "काली मिट्टी और सड़े अंडे जैसी गंध का मतलब है H₂S बन रही है। प्रोबायोटिक्स और ज़ियोलाइट कीचड़ तोड़ने में मदद करते हैं।",
    text: "Black soil and a rotten-egg smell mean H₂S is building up. Probiotics and zeolites help break down sludge.",
    problem: "pond-bottom" as const,
  },
  {
    title: "Balance minerals for moulting",
    titleHi: "मोल्टिंग के लिए खनिज संतुलन",
    textHi: "Ca, Mg और K का गलत अनुपात झींगे में ढीला कवच और ऐंठन करता है, खासकर कम लवणता वाले पानी में।",
    text: "Wrong Ca, Mg and K ratios cause loose shell and cramps in shrimp, especially in low-salinity water.",
    problem: "moulting-shell" as const,
  },
];
