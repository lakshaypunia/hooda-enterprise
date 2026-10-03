import {
  Activity,
  Bug,
  Egg,
  FlaskConical,
  Gauge,
  HeartPulse,
  Layers,
  Leaf,
  Microscope,
  Shell,
  ShieldCheck,
  TrendingUp,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { ProblemSlug } from "@/data/taxonomy";

const icons: Record<ProblemSlug, LucideIcon> = {
  "ammonia-nitrite": FlaskConical,
  "low-oxygen": Wind,
  "pond-bottom": Layers,
  vibrio: Microscope,
  "white-gut": Activity,
  "disease-prevention": ShieldCheck,
  parasites: Bug,
  "moulting-shell": Shell,
  "growth-immunity": TrendingUp,
  "liver-hp": HeartPulse,
  "water-hardness": Gauge,
  "algae-snails": Leaf,
  hatchery: Egg,
};

export function ProblemIcon({ problem, className }: { problem: ProblemSlug; className?: string }) {
  const Icon = icons[problem];
  return <Icon className={className} aria-hidden />;
}
