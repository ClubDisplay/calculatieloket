import type { RecommendationInput, Recommendation } from "../types";
import { findNumber } from "../helpers";

const always: Recommendation[] = [
  {
    id: "vakantiegeld",
    title: "Vakantiegeld berekenen",
    description: "Binnenkort beschikbaar.",
    url: "#",
    priority: 3,
    reason: "relevant bij loon",
  },
  {
    id: "salaris-vergelijken",
    title: "Salaris vergelijken",
    description: "Vergelijk bruto en netto op de salaris calculator.",
    url: "/salaris-calculator/",
    priority: 4,
    reason: "altijd relevant",
  },
  {
    id: "zzp",
    title: "ZZP uurtarief berekenen",
    description: "Bereken je benodigde uurtarief als zelfstandige.",
    url: "/zzp-calculator/",
    priority: 5,
    reason: "altijd relevant",
  },
];

export function incomeRules(input: RecommendationInput): Recommendation[] {
  const net = findNumber(input.result, [
    "netMonthly",
    "nettoMonthly",
    "netto",
    "net",
    "nettoPerMaand",
  ]);

  const recs: Recommendation[] = [...always];

  if (net !== undefined && net < 2500) {
    recs.push({
      id: "toeslagen",
      title: "Toeslagen berekenen",
      description: "Check of je recht hebt op huur- of zorgtoeslag.",
      url: "/toeslagen-calculator/",
      priority: 1,
      reason: "laag netto inkomen",
    });
  }

  if (net !== undefined && net > 3200) {
    recs.push({
      id: "hypotheek",
      title: "Hypotheek berekenen",
      description: "Wat kan je lenen met dit inkomen?",
      url: "/hypotheek-calculator/",
      priority: 1,
      reason: "hoog netto inkomen",
    });
  }

  return recs;
}
