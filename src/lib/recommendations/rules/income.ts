import type { RecommendationInput, Recommendation } from "../types";
import { findNumberAnywhere, buildUrl } from "../helpers";
import { formatEuro } from "../../format/currency";
import { recommendationFromRegistry } from "../../calculators/registry";

export function incomeRules(input: RecommendationInput): Recommendation[] {
  const grossYearly = findNumberAnywhere(input, ["grossYearly", "brutoJaar", "jaarBruto", "brutoJaarinkomen", "totalIncome"]);
  const grossMonthly = findNumberAnywhere(input, ["grossMonthly", "bruto", "brutoMaand", "salary"]);
  const net = findNumberAnywhere(input, ["netMonthly", "nettoMonthly", "netto", "net", "nettoPerMaand"]);

  const recs: Recommendation[] = [
    recommendationFromRegistry("vakantiegeld", {
      description: grossMonthly
        ? `Bereken hoeveel vakantiegeld je netto krijgt bij een bruto maandsalaris van ${formatEuro(grossMonthly)}.`
        : "Bereken hoeveel vakantiegeld je netto krijgt.",
      url: buildUrl("/vakantiegeld-calculator/", { bruto: grossMonthly }),
      priority: 3,
      reason: "relevant bij loon",
    }),
    recommendationFromRegistry("salaris", {
      id: "salaris-vergelijken",
      description: grossMonthly
        ? `Vergelijk een bruto salaris van ${formatEuro(grossMonthly)} op de salaris calculator.`
        : "Vergelijk bruto en netto op de salaris calculator.",
      url: buildUrl("/salaris-calculator/", { bruto: grossMonthly }),
      priority: 4,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("zzp", {
      description: net
        ? `Gebruik je netto doel van ${formatEuro(net)} als basis voor je ZZP-uurtarief.`
        : "Bereken je benodigde uurtarief als zelfstandige.",
      url: buildUrl("/zzp-calculator/", { netto: net }),
      priority: 5,
      reason: "altijd relevant",
    }),
  ];

  if (net !== undefined && net < 2500) {
    recs.push(
      recommendationFromRegistry("toeslagen", {
        description: grossYearly
          ? `Controleer of je met een inkomen van ${formatEuro(grossYearly)} recht hebt op toeslagen.`
          : "Check of je recht hebt op huur- of zorgtoeslag.",
        url: buildUrl("/toeslagen-calculator/", { inkomen: grossYearly }),
        priority: 1,
        reason: "laag netto inkomen",
      }),
    );
  }

  if (net !== undefined && net > 3200) {
    recs.push(
      recommendationFromRegistry("hypotheek", {
        description: grossYearly
          ? `Gebruik je bruto jaarinkomen van ${formatEuro(grossYearly)} als startpunt voor je hypotheekindicatie.`
          : "Wat kan je lenen met dit inkomen?",
        url: buildUrl("/hypotheek-calculator/", { inkomen: grossYearly }),
        priority: 1,
        reason: "hoog netto inkomen",
      }),
    );
  }

  return recs;
}
