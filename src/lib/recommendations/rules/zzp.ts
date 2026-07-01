import type { RecommendationInput, Recommendation } from "../types";
import { findNumber } from "../helpers";

export function zzpRules(input: RecommendationInput): Recommendation[] {
  const hourlyRate = findNumber(input.result, [
    "requiredHourlyRate",
    "hourlyRate",
    "uurtarief",
  ]);

  const recs: Recommendation[] = [];

  if (hourlyRate !== undefined && hourlyRate > 75) {
    recs.push({
      id: "hypotheek",
      title: "Hypotheek berekenen",
      description: "Wat kan je lenen met deze inkomensindicatie?",
      url: "/hypotheek-calculator/",
      priority: 1,
      reason: "hoog uurtarief",
    });
  }

  recs.push(
    {
      id: "btw",
      title: "BTW Calculator",
      description: "Reken btw over je omzet.",
      url: "/btw-calculator/",
      priority: 2,
      reason: "altijd relevant",
    },
    {
      id: "bruto-netto",
      title: "Bruto netto 2026",
      description: "Vergelijk je omzet met een bruto salaris in loondienst.",
      url: "/bruto-netto-2026/",
      priority: 3,
      reason: "altijd relevant",
    },
    {
      id: "toeslagen",
      title: "Toeslagen berekenen",
      description: "Check of je recht hebt op huur- of zorgtoeslag.",
      url: "/toeslagen-calculator/",
      priority: 4,
      reason: "altijd relevant",
    },
  );

  return recs;
}
