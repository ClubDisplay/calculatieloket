import type { RecommendationInput, Recommendation } from "../types";
import { findNumber } from "../helpers";

export function allowancesRules(input: RecommendationInput): Recommendation[] {
  const income = findNumber(input.result, [
    "totalYearlyIncome",
    "income",
    "jaarinkomen",
    "brutoJaarinkomen",
  ]);

  const recs: Recommendation[] = [];

  if (income !== undefined && income < 35000) {
    recs.push({
      id: "bruto-netto",
      title: "Bruto netto 2026",
      description: "Bereken een indicatie van je nettoloon.",
      url: "/bruto-netto-2026/",
      priority: 1,
      reason: "laag inkomen",
    });
  }

  recs.push(
    {
      id: "hypotheek",
      title: "Hypotheek berekenen",
      description: "Wat kan je lenen met dit inkomen?",
      url: "/hypotheek-calculator/",
      priority: 2,
      reason: "altijd relevant",
    },
    {
      id: "zzp",
      title: "ZZP uurtarief berekenen",
      description: "Bereken je benodigde uurtarief als zelfstandige.",
      url: "/zzp-calculator/",
      priority: 3,
      reason: "altijd relevant",
    },
  );

  return recs;
}
