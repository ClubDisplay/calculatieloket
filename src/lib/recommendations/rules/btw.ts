import type { RecommendationInput, Recommendation } from "../types";
import { findNumberAnywhere, buildUrl } from "../helpers";
import { recommendationFromRegistry } from "../../calculators/registry";

export function btwRules(input: RecommendationInput): Recommendation[] {
  const amount = findNumberAnywhere(input, ["amount", "bedrag", "amountExcl", "amountIncl"]);
  const rate = findNumberAnywhere(input, ["rate", "tarief", "btwRate"]);
  const direction =
    (input.values.direction as string | undefined) ||
    (input.result.direction as string | undefined) ||
    "excl";

  const btwCluster: Recommendation[] = [
    recommendationFromRegistry("btw-terugrekenen", {
      description: "Reken hetzelfde bedrag terug van inclusief naar exclusief btw.",
      url: buildUrl("/btw-terugrekenen/", { bedrag: amount, tarief: rate }),
      priority: 1,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("btw-inclusief-exclusief", {
      description: "Bereken btw in beide richtingen voor hetzelfde bedrag.",
      url: buildUrl("/btw-inclusief-exclusief/", { bedrag: amount, tarief: rate, richting: direction }),
      priority: 2,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("zzp", {
      description: "Bereken je benodigde uurtarief als zelfstandige.",
      url: "/zzp-calculator/",
      priority: 3,
      reason: "altijd relevant",
    }),
    recommendationFromRegistry("auto-importkosten", {
      description: "Bereken importkosten voor een auto of camper.",
      url: "/auto-importkosten-berekenen/",
      priority: 4,
      reason: "altijd relevant",
    }),
  ];

  return btwCluster.filter((rec) => rec.id !== input.calculator);
}
