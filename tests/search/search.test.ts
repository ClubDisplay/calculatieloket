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
    expectCalculator("zorg", "Toeslagen calculator");
  });

  it('"zorgtoeslag" toont minimaal de Toeslagen calculator', () => {
    expectCalculator("zorgtoeslag", "Toeslagen calculator");
  });

  it('"huur" toont minimaal de Toeslagen calculator', () => {
    expectCalculator("huur", "Toeslagen calculator");
  });

  it('"huurtoeslag" toont minimaal de Toeslagen calculator', () => {
    expectCalculator("huurtoeslag", "Toeslagen calculator");
  });

  it('"toeslag" toont de Toeslagen calculator', () => {
    expectCalculator("toeslag", "Toeslagen calculator");
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
    expectCalculator("bruto", ["Bruto netto 2026", "Salaris calculator"]);
  });

  it('"salaris" toont salaris/bruto-netto resultaat', () => {
    expectCalculator("salaris", ["Salaris calculator", "Bruto netto 2026"]);
  });

  it('"hypotheek" toont de Hypotheek calculator', () => {
    expectCalculator("hypotheek", "Hypotheek calculator");
  });

  it('"zzp" toont de ZZP calculator', () => {
    expectCalculator("zzp", "ZZP calculator");
  });

  it('"import" toont Auto importkosten berekenen', () => {
    expectCalculator("import", "Auto importkosten berekenen");
  });

  it('"auto" toont Auto importkosten berekenen', () => {
    expectCalculator("auto", "Auto importkosten berekenen");
  });
});
