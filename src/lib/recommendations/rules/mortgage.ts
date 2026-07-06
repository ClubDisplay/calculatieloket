import type { RecommendationInput, Recommendation } from "../types";
import { findNumberAnywhere, findBooleanAnywhere, buildUrl } from "../helpers";
import { formatEuro } from "../../format/currency";
import { recommendationFromRegistry } from "../../calculators/registry";

export function mortgageRules(input: RecommendationInput): Recommendation[] {
  const income = findNumberAnywhere(input, ["totalYearlyIncome", "income", "yearlyIncome", "brutoJaarinkomen"]);
  const partner = findBooleanAnywhere(input, ["partner"]);
  const estimatedMonthly = income !== undefined ? Math.round(income / 12) : undefined;

  const recs: Recommendation[] = [];

  if (income !== undefined && income > 60000) {
    recs.push(
      recommendationFromRegistry("zzp", {
        description: "Bereken je benodigde uurtarief als zelfstandige.",
        url: "/zzp-calculator/",
        priority: 1,
        reason: "hoog inkomen",
      }),
    );
  }

  if (partner === true) {
    recs.push(
      recommendationFromRegistry("bruto-netto", {
        description: estimatedMonthly
          ? `Vergelijk een bruto maandinkomen van ${formatEuro(estimatedMonthly)} met het netto loon in loondienst.`
          : "Bereken een indicatie van je nettoloon.",
        url: buildUrl("/bruto-netto-2026/", { bruto: estimatedMonthly }),
        priority: 2,
        reason: "partner inkomen",
      }),
    );
  }

  recs.push(
    recommendationFromRegistry("toeslagen", {
      description: income
        ? `Krijg een indicatie of toeslagen relevant kunnen zijn bij een inkomen van ${formatEuro(income)}.`
        : "Krijg een indicatie of toeslagen relevant kunnen zijn voor jouw situatie.",
      url: buildUrl("/toeslagen-calculator/", { inkomen: income }),
      priority: 3,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("salaris", {
      title: "Salaris Calculator",
      description: estimatedMonthly
        ? `Vergelijk ${formatEuro(estimatedMonthly)} bruto als loondienst salaris.`
        : "Vergelijk bruto en netto.",
      url: buildUrl("/salaris-calculator/", { bruto: estimatedMonthly }),
      priority: 4,
      reason: "altijd relevant",
    }),
  );

  return recs;
}
