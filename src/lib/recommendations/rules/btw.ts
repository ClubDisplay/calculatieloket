import type { RecommendationInput, Recommendation } from "../types";

const btwCluster: Recommendation[] = [
  {
    id: "btw-terugrekenen",
    title: "BTW terugrekenen",
    description: "Bereken het exclusieve bedrag van een inclusief bedrag.",
    url: "/btw-terugrekenen/",
    priority: 1,
    reason: "altijd relevant",
  },
  {
    id: "btw-inclusief-exclusief",
    title: "BTW inclusief/exclusief",
    description: "Reken btw in beide richtingen.",
    url: "/btw-inclusief-exclusief/",
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
  {
    id: "auto-importkosten",
    title: "Auto importkosten",
    description: "Bereken importkosten voor een auto of camper.",
    url: "/auto-importkosten-berekenen/",
    priority: 4,
    reason: "altijd relevant",
  },
];

export function btwRules(input: RecommendationInput): Recommendation[] {
  return btwCluster.filter((rec) => rec.id !== input.calculator);
}
