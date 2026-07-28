import { describe, it, expect } from "vitest";
import { search } from "../../src/lib/search-index";

function expectCalculator(query: string, expectedTitle: string | string[]) {
  const results = search(query);
  const titles = results.map((r) => r.title);
  const expected = Array.isArray(expectedTitle) ? expectedTitle : [expectedTitle];
  const found = expected.some((title) => titles.includes(title));
  expect(found).toBe(true);
}

describe("search aliases", () => {
  it('"zorg" toont minimaal de Toeslagen calculator', () => {
    expectCalculator("zorg", ["Toeslagen calculator", "Zorgtoeslag berekenen"]);
  });

  it('"zorgtoeslag" toont minimaal de Toeslagen calculator', () => {
    expectCalculator("zorgtoeslag", ["Toeslagen calculator", "Zorgtoeslag berekenen"]);
  });

  it('"huur" toont minimaal de Toeslagen calculator', () => {
    expectCalculator("huur", ["Toeslagen calculator", "Huurtoeslag berekenen"]);
  });

  it('"huurtoeslag" toont minimaal de Toeslagen calculator', () => {
    expectCalculator("huurtoeslag", ["Toeslagen calculator", "Huurtoeslag berekenen"]);
  });

  it('"toeslag" toont de Toeslagen calculator', () => {
    expectCalculator("toeslag", ["Toeslagen calculator", "Toeslagen 2026", "Huurtoeslag berekenen", "Zorgtoeslag berekenen"]);
  });

  it('"btw" toont relevante btw-calculators', () => {
    expectCalculator("btw", [
      "BTW calculator",
      "BTW terugrekenen",
      "BTW inclusief/exclusief",
      "BTW 21 procent berekenen",
      "BTW 9 procent berekenen",
      "BTW van bedrag afhalen",
      "Hoe bereken je btw?",
      "BTW-bedrag berekenen",
      "Exclusief naar inclusief btw",
    ]);
  });

  it('"bruto" toont Bruto netto 2026 of salaris/bruto-netto resultaat', () => {
    expectCalculator("bruto", [
      "Bruto netto 2026",
      "Salaris calculator",
      "Nettoloon 2026",
      "Salaris 2026 berekenen",
      "Bruto netto berekenen 2026",
      "Loonheffing berekenen 2026",
    ]);
  });

  it('"salaris" toont salaris/bruto-netto resultaat', () => {
    expectCalculator("salaris", [
      "Salaris calculator",
      "Bruto netto 2026",
      "Salaris 2026 berekenen",
      "Nettoloon 2026",
    ]);
  });

  it('"hypotheek" toont de Hypotheek calculator', () => {
    expectCalculator("hypotheek", [
      "Hypotheek calculator",
      "Maximale hypotheek berekenen",
      "Hypotheek maandlasten berekenen",
      "Hypotheek rente berekenen",
      "Hypotheek 2026",
    ]);
  });

  it('"zzp" toont de ZZP calculator', () => {
    expectCalculator("zzp", [
      "ZZP calculator",
      "ZZP uurtarief berekenen",
      "ZZP inkomen berekenen",
      "ZZP omzet berekenen",
      "ZZP kosten berekenen",
    ]);
  });

  it('"import" toont Auto importkosten berekenen', () => {
    expectCalculator("import", "Auto importkosten berekenen");
  });

  it('"auto" toont Auto importkosten berekenen', () => {
    expectCalculator("auto", "Auto importkosten berekenen");
  });
});
