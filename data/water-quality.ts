import type { ProblemSlug } from "./taxonomy";

/**
 * Optimal water quality parameters, from the Provet Product Booklet 2023.
 * `problem` links an out-of-range reading to products that help.
 */
export type WaterParameter = {
  name: string;
  unit?: string;
  shrimp: string;
  fish: string;
  remark?: string;
  /** Fish value depends on fresh vs salt water. */
  fishVaries?: boolean;
  problem?: ProblemSlug;
};

export const waterParameters: WaterParameter[] = [
  { name: "Temperature", unit: "°C", shrimp: "28 – 32", fish: "26 – 32" },
  {
    name: "Salinity",
    unit: "ppt",
    shrimp: "10 – 25",
    fish: "< 1",
    fishVaries: true,
    remark: "Daily fluctuation should be < 5 ppt",
  },
  {
    name: "Dissolved oxygen",
    unit: "ppm",
    shrimp: "> 5.0",
    fish: "> 3.0",
    remark: "Daily fluctuation should be < 0.5 ppm",
    problem: "low-oxygen",
  },
  { name: "pH", shrimp: "7.8 – 8.2", fish: "7.5 – 8.5", problem: "water-hardness" },
  { name: "Alkalinity", unit: "ppm", shrimp: "150 – 200", fish: "50 – 500", problem: "water-hardness" },
  { name: "Hardness", unit: "ppm", shrimp: "< 400", fish: "< 40", problem: "water-hardness" },
  {
    name: "Total ammonia",
    unit: "ppm",
    shrimp: "0.4 – 2",
    fish: "0.4 – 2",
    remark: "More toxic at high pH",
    problem: "ammonia-nitrite",
  },
  {
    name: "Nitrite",
    unit: "ppm",
    shrimp: "< 0.01",
    fish: "< 0.1",
    remark: "More toxic at low salinity and pH",
    problem: "ammonia-nitrite",
  },
  {
    name: "Unionised ammonia",
    unit: "ppm",
    shrimp: "< 0.1",
    fish: "< 0.1",
    remark: "More toxic at high pH",
    problem: "ammonia-nitrite",
  },
  {
    name: "Hydrogen sulphide (H₂S)",
    unit: "ppm",
    shrimp: "< 0.02",
    fish: "< 0.03",
    remark: "More toxic at low pH",
    problem: "pond-bottom",
  },
  { name: "Iron", unit: "ppm", shrimp: "< 0.5", fish: "< 0.5", problem: "water-hardness" },
  {
    name: "Secchi disc visibility",
    unit: "cm",
    shrimp: "35 – 45",
    fish: "25 – 45",
    remark: "Not less than 25 and not more than 50 cm",
  },
  {
    name: "Ca : Mg",
    shrimp: "1 : 1.5–3",
    fish: "1 : 1.5–3",
    fishVaries: true,
    remark: "Based on salinity",
    problem: "moulting-shell",
  },
  {
    name: "Na : K",
    shrimp: "28 : 1",
    fish: "28 : 1",
    fishVaries: true,
    remark: "Based on salinity",
    problem: "moulting-shell",
  },
  {
    name: "Ca : K",
    shrimp: "1 : 0.9",
    fish: "1 : 0.9",
    fishVaries: true,
    remark: "Based on salinity",
    problem: "moulting-shell",
  },
];

export const waterTips = [
  {
    title: "Check oxygen at dawn",
    text: "Dissolved oxygen is lowest just before sunrise. If fish or shrimp gather at the surface early morning, act quickly.",
    problem: "low-oxygen" as const,
  },
  {
    title: "Watch pH in the evening",
    text: "pH peaks in the afternoon. High pH makes ammonia more toxic, so test ammonia and pH together.",
    problem: "ammonia-nitrite" as const,
  },
  {
    title: "Keep the pond bottom clean",
    text: "Black soil and a rotten-egg smell mean H₂S is building up. Probiotics and zeolites help break down sludge.",
    problem: "pond-bottom" as const,
  },
  {
    title: "Balance minerals for moulting",
    text: "Wrong Ca, Mg and K ratios cause loose shell and cramps in shrimp, especially in low-salinity water.",
    problem: "moulting-shell" as const,
  },
];
