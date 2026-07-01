import type { RecommendationInput, Recommendation } from "../types";
import { findNumberAnywhere, buildUrl } from "../helpers";
import { formatEuro } from "../../format/currency";

export function allowancesRules(input: RecommendationInput): Recommendation[] {
  const income = findNumberAnywhere(input, ["totalYearlyIncome", "income", "jaarinkomen", "brutoJaarinkomen"]);
  const monthlyIncome = income !== undefined ? Math.round(income / 12) : undefined;

  const recs: Recommendation[] = [];

  if (income !== undefined && income < 35000) {
    recs.push({
      id: "bruto-netto",
      title: "Bruto netto 2026",
      description: income
        ? `Gebruik je bruto inkomen van ${formatEuro(income)} als startpunt voor een netto vergelijking.`
        : "Bereken een indicatie van je nettoloon.",
      url: buildUrl("/bruto-netto-2026/", { bruto: monthlyIncome }),
      priority: 1,
      reason: "laag inkomen",
    });
  }

  recs.push(
    {
      id: "hypotheek",
      title: "Hypotheek berekenen",
      description: income
        ? `Gebruik je inkomen van ${formatEuro(income)} als startpunt voor je hypotheekindicatie.`
        : "Wat kan je lenen met dit inkomen?",
      url: buildUrl("/hypotheek-calculator/", { inkomen: income }),
      priority: 2,
      reason: "altijd relevant",
    },
    {
      id: "zzp",
      title: "ZZP uurtarief berekenen",
      description: monthlyIncome
        ? `Gebruik een geschat netto doel van ${formatEuro(monthlyIncome)} als basis voor je ZZP-uurtarief.`
        : "Bereken je benodigde uurtarief als zelfstandige.",
      url: buildUrl("/zzp-calculator/", { netto: monthlyIncome }),
      priority: 3,
      reason: "altijd relevant",
    },
  );

  return recs;
}
