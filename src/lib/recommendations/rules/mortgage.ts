import type { RecommendationInput, Recommendation } from "../types";
import { findNumberAnywhere, findBooleanAnywhere, buildUrl } from "../helpers";
import { formatEuro } from "../../format/currency";

export function mortgageRules(input: RecommendationInput): Recommendation[] {
  const income = findNumberAnywhere(input, ["totalYearlyIncome", "income", "yearlyIncome", "brutoJaarinkomen"]);
  const partner = findBooleanAnywhere(input, ["partner"]);
  const estimatedMonthly = income !== undefined ? Math.round(income / 12) : undefined;

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
      description: estimatedMonthly
        ? `Vergelijk een bruto maandinkomen van ${formatEuro(estimatedMonthly)} met het netto loon in loondienst.`
        : "Bereken een indicatie van je nettoloon.",
      url: buildUrl("/bruto-netto-2026/", { bruto: estimatedMonthly }),
      priority: 2,
      reason: "partner inkomen",
    });
  }

  recs.push(
    {
      id: "toeslagen",
      title: "Toeslagen berekenen",
      description: income
        ? `Controleer of je met een inkomen van ${formatEuro(income)} recht hebt op toeslagen.`
        : "Check of je recht hebt op huur- of zorgtoeslag.",
      url: buildUrl("/toeslagen-calculator/", { inkomen: income }),
      priority: 3,
      reason: "altijd relevant",
    },
    {
      id: "salaris",
      title: "Salaris Calculator",
      description: estimatedMonthly
        ? `Vergelijk ${formatEuro(estimatedMonthly)} bruto als loondienst salaris.`
        : "Vergelijk bruto en netto.",
      url: buildUrl("/salaris-calculator/", { bruto: estimatedMonthly }),
      priority: 4,
      reason: "altijd relevant",
    },
  );

  return recs;
}
