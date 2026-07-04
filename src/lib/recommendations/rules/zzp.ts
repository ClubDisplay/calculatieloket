import type { RecommendationInput, Recommendation } from "../types";
import { findNumberAnywhere, buildUrl } from "../helpers";
import { formatEuro } from "../../format/currency";
import { recommendationFromRegistry } from "../../calculators/registry";

export function zzpRules(input: RecommendationInput): Recommendation[] {
  const revenue = findNumberAnywhere(input, ["requiredYearlyRevenue", "yearlyRevenue", "omzet"]);
  const hourlyRate = findNumberAnywhere(input, ["requiredHourlyRate", "hourlyRate", "uurtarief"]);
  const estimatedMonthlyBruto = revenue !== undefined ? Math.round(revenue / 12) : undefined;

  const recs: Recommendation[] = [];

  if (hourlyRate !== undefined && hourlyRate > 75) {
    recs.push(
      recommendationFromRegistry("hypotheek", {
        description: revenue
          ? `Gebruik je geschatte jaaromzet van ${formatEuro(revenue)} als startpunt voor een hypotheekindicatie.`
          : "Wat kan je lenen met deze inkomensindicatie?",
        url: buildUrl("/hypotheek-calculator/", { inkomen: revenue }),
        priority: 1,
        reason: "hoog uurtarief",
      }),
    );
  }

  recs.push(
    recommendationFromRegistry("btw", {
      description: revenue
        ? `Reken btw over je geschatte jaaromzet van ${formatEuro(revenue)}.`
        : "Reken btw over je omzet.",
      url: buildUrl("/btw-calculator/", { bedrag: revenue, tarief: 21, richting: "excl" }),
      priority: 2,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("bruto-netto", {
      description: estimatedMonthlyBruto
        ? `Vergelijk een bruto maandinkomen van ${formatEuro(estimatedMonthlyBruto)} met het netto loon in loondienst.`
        : "Vergelijk je omzet met een bruto salaris in loondienst.",
      url: buildUrl("/bruto-netto-2026/", { bruto: estimatedMonthlyBruto }),
      priority: 3,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("toeslagen", {
      description: revenue
        ? `Controleer of je met een inkomen van ${formatEuro(revenue)} recht hebt op toeslagen.`
        : "Check of je recht hebt op huur- of zorgtoeslag.",
      url: buildUrl("/toeslagen-calculator/", { inkomen: revenue }),
      priority: 4,
      reason: "altijd relevant",
    }),
  );

  return recs;
}
