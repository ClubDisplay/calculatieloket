import type { RecommendationInput, Recommendation } from "../types";
import { findNumberAnywhere, buildUrl } from "../helpers";
import { formatEuro } from "../../format/currency";

export function importCostsRules(input: RecommendationInput): Recommendation[] {
  const totalCost = findNumberAnywhere(input, [
    "totalCost",
    "totalImportCost",
    "totaleImportkosten",
  ]);

  const recs: Recommendation[] = [];

  // 1. BTW is altijd relevant voor import/export kosten.
  recs.push({
    id: "btw",
    title: "BTW Calculator",
    description: "Reken btw over bedragen die bij je import of verkoop horen.",
    url: buildUrl("/btw-calculator/", { bedrag: totalCost, tarief: 21, richting: "excl" }),
    priority: 1,
    reason: "altijd relevant",
  });

  // 2. Hoge aanschafkosten -> hypotheek/financiering; anders bruto-netto vergelijken.
  if (totalCost !== undefined && totalCost > 5000) {
    recs.push({
      id: "hypotheek",
      title: "Hypotheek / financiering",
      description: totalCost
        ? `Met een totale investering van ${formatEuro(totalCost)} is een financieringsindicatie interessant.`
        : "Bekijk financieringsmogelijkheden voor je aankoop.",
      url: "/hypotheek-calculator/",
      priority: 2,
      reason: "hoge aanschafkosten",
    });
  } else {
    recs.push({
      id: "bruto-netto",
      title: "Bruto netto 2026",
      description: "Vergelijk je aankoopbedrag met een bruto-netto indicatie.",
      url: "/bruto-netto-2026/",
      priority: 2,
      reason: "altijd relevant",
    });
  }

  // 3. ZZP voor zakelijke context, bewust lager geprioriteerd.
  recs.push({
    id: "zzp",
    title: "ZZP uurtarief berekenen",
    description: "Handig als je de auto deels zakelijk gebruikt of kosten wilt inschatten.",
    url: "/zzp-calculator/",
    priority: 3,
    reason: "zakelijke context",
  });

  // 4. BPM uitleg via officiële bron.
  recs.push({
    id: "bpm-uitleg",
    title: "BPM berekenen",
    description: "Gebruik de officiële tool van de Belastingdienst voor een exacte bpm-berekening.",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/hoe-bpm-berekenen",
    priority: 4,
    reason: "officiële bron",
  });

  return recs;
}
