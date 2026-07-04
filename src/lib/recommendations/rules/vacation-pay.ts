import type { RecommendationInput, Recommendation } from "../types";
import { findNumberAnywhere, findBooleanAnywhere, buildUrl } from "../helpers";
import { formatEuro } from "../../format/currency";
import { recommendationFromRegistry } from "../../calculators/registry";

export function vacationPayRules(input: RecommendationInput): Recommendation[] {
  const grossMonthly = findNumberAnywhere(input, [
    "grossMonthlySalary",
    "grossMonthly",
    "bruto",
    "brutoMaand",
    "salary",
  ]);
  const grossYearly = grossMonthly !== undefined ? grossMonthly * 12 : undefined;
  const netVacationPay = findNumberAnywhere(input, ["netVacationPay", "nettoVakantiegeld"]);
  const lhk = findBooleanAnywhere(input, ["lhk", "loonheffingskorting", "applyLoonheffingskorting"]);
  const pension = findNumberAnywhere(input, ["pensionAmount", "pensioen"]);

  const recs: Recommendation[] = [
    recommendationFromRegistry("bruto-netto", {
      description: grossMonthly
        ? `Bekijk wat je bruto maandsalaris van ${formatEuro(grossMonthly)} netto oplevert in 2026.`
        : "Bereken je netto salaris in 2026.",
      url: buildUrl("/bruto-netto-2026/", {
        bruto: grossMonthly,
        pensioen: pension,
        lhk: lhk === true ? 1 : lhk === false ? 0 : undefined,
      }),
      priority: 1,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("salaris", {
      description: grossMonthly
        ? `Vergelijk een bruto salaris van ${formatEuro(grossMonthly)} op de salaris calculator.`
        : "Vergelijk bruto en netto op de salaris calculator.",
      url: buildUrl("/salaris-calculator/", { bruto: grossMonthly }),
      priority: 2,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("toeslagen", {
      description: grossYearly
        ? `Controleer of je met een inkomen van ${formatEuro(grossYearly)} recht hebt op toeslagen.`
        : "Check of je recht hebt op huur- of zorgtoeslag.",
      url: buildUrl("/toeslagen-calculator/", { inkomen: grossYearly }),
      priority: 3,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("hypotheek", {
      description: grossYearly
        ? `Gebruik je bruto jaarinkomen van ${formatEuro(grossYearly)} als startpunt voor je hypotheekindicatie.`
        : "Wat kan je lenen met dit inkomen?",
      url: buildUrl("/hypotheek-calculator/", { inkomen: grossYearly }),
      priority: 4,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("zzp", {
      description: netVacationPay
        ? `Gebruik je netto vakantiegeld van ${formatEuro(netVacationPay)} als extra doel voor je ZZP-uurtarief.`
        : "Bereken je benodigde uurtarief als zelfstandige.",
      url: "/zzp-calculator/",
      priority: 5,
      reason: "altijd relevant",
    }),
  ];

  return recs;
}
