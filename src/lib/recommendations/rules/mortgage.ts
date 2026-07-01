import type { RecommendationInput, Recommendation } from "../types";
import { findNumber, findBoolean } from "../helpers";

export function mortgageRules(input: RecommendationInput): Recommendation[] {
  const income = findNumber(input.result, [
    "totalYearlyIncome",
    "income",
    "yearlyIncome",
    "brutoJaarinkomen",
    "bruto",
  ]);
  const partner = findBoolean(input.values, ["partner"]) ?? findBoolean(input.result, ["partner"]);

  const recs: Recommendation[] = [];

  if (income !== undefined && income > 60000) {
    recs.push({
      id: "zzp",
      title: "ZZP uurtarief berekenen",
      description: "Bereken je benodigde uurtarief als zelfstandige.",
      url: "/zzp-calculator/",
      priority: 1,
      reason: "hoog inkomen",
    });
  }

  if (partner === true) {
    recs.push({
      id: "bruto-netto",
      title: "Bruto netto 2026",
      description: "Bereken een indicatie van je nettoloon.",
      url: "/bruto-netto-2026/",
      priority: 2,
      reason: "partner inkomen",
    });
  }

  recs.push(
    {
      id: "toeslagen",
      title: "Toeslagen berekenen",
      description: "Check of je recht hebt op huur- of zorgtoeslag.",
      url: "/toeslagen-calculator/",
      priority: 3,
      reason: "altijd relevant",
    },
    {
      id: "salaris",
      title: "Salaris Calculator",
      description: "Vergelijk bruto en netto.",
      url: "/salaris-calculator/",
      priority: 4,
      reason: "altijd relevant",
    },
  );

  return recs;
}
