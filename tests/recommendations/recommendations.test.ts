import { describe, it, expect } from "vitest";
import { getRecommendations } from "../../src/lib/recommendations/engine";
import { recommendationRegistry } from "../../src/lib/recommendations/registry";

describe("Recommendation engine", () => {
  it("returns empty array for unknown calculator", () => {
    const result = getRecommendations({
      calculator: "unknown",
      values: {},
      result: {},
    });
    expect(result).toEqual([]);
  });

  it("sorts recommendations by priority ascending", () => {
    const result = getRecommendations({
      calculator: "bruto-netto",
      values: {},
      result: { nettoMonthly: 3500 },
    });
    const priorities = result.map((r) => r.priority);
    expect(priorities).toEqual([...priorities].sort((a, b) => a - b));
    expect(priorities[0]).toBe(1);
  });

  it("deduplicates recommendations by id, keeping the first (lowest priority) occurrence", () => {
    const result = getRecommendations({
      calculator: "bruto-netto",
      values: {},
      result: { nettoMonthly: 3500 },
    });
    const ids = result.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("filters out the current calculator from recommendations", () => {
    const result = getRecommendations({
      calculator: "btw-terugrekenen",
      values: {},
      result: {},
    });
    const ids = result.map((r) => r.id);
    expect(ids).not.toContain("btw-terugrekenen");
  });

  it("returns always-rules when result values are missing", () => {
    const result = getRecommendations({
      calculator: "bruto-netto",
      values: {},
      result: {},
    });
    const ids = result.map((r) => r.id);
    expect(ids).toContain("vakantiegeld");
    expect(ids).toContain("salaris-vergelijken");
    expect(ids).toContain("zzp");
  });
});

describe("Income rules (bruto-netto / salaris)", () => {
  it("recommends toeslagen as priority 1 when nettoMonthly < 2500", () => {
    const result = getRecommendations({
      calculator: "bruto-netto",
      values: {},
      result: { nettoMonthly: 2000 },
    });
    expect(result[0].id).toBe("toeslagen");
    expect(result[0].priority).toBe(1);
  });

  it("recommends hypotheek as priority 1 when nettoMonthly > 3200", () => {
    const result = getRecommendations({
      calculator: "bruto-netto",
      values: {},
      result: { nettoMonthly: 3500 },
    });
    expect(result[0].id).toBe("hypotheek");
    expect(result[0].priority).toBe(1);
  });

  it("falls back to alternative netto result keys", () => {
    const result = getRecommendations({
      calculator: "salaris",
      values: {},
      result: { net: 2100 },
    });
    expect(result.some((r) => r.id === "toeslagen")).toBe(true);
  });
});

describe("BTW rules", () => {
  it("excludes the current calculator from the BTW cluster", () => {
    const result = getRecommendations({
      calculator: "btw-terugrekenen",
      values: {},
      result: {},
    });
    const ids = result.map((r) => r.id);
    expect(ids).toContain("btw-inclusief-exclusief");
    expect(ids).toContain("zzp");
    expect(ids).toContain("auto-importkosten");
    expect(ids).not.toContain("btw-terugrekenen");
  });

  it("shows all BTW cluster recommendations from the main btw calculator", () => {
    const result = getRecommendations({
      calculator: "btw",
      values: {},
      result: {},
    });
    const ids = result.map((r) => r.id);
    expect(ids).toContain("btw-terugrekenen");
    expect(ids).toContain("btw-inclusief-exclusief");
    expect(ids).toContain("zzp");
    expect(ids).toContain("auto-importkosten");
  });
});

describe("Mortgage rules", () => {
  it("recommends zzp as priority 1 when income > 60000", () => {
    const result = getRecommendations({
      calculator: "hypotheek",
      values: {},
      result: { totalYearlyIncome: 70000 },
    });
    expect(result[0].id).toBe("zzp");
    expect(result[0].priority).toBe(1);
  });

  it("recommends bruto-netto when partner is true", () => {
    const result = getRecommendations({
      calculator: "hypotheek",
      values: { partner: true },
      result: { totalYearlyIncome: 50000 },
    });
    expect(result.some((r) => r.id === "bruto-netto")).toBe(true);
  });
});

describe("ZZP rules", () => {
  it("recommends hypotheek when requiredHourlyRate > 75", () => {
    const result = getRecommendations({
      calculator: "zzp",
      values: {},
      result: { requiredHourlyRate: 80 },
    });
    expect(result[0].id).toBe("hypotheek");
    expect(result[0].priority).toBe(1);
  });

  it("falls back to hourlyRate key", () => {
    const result = getRecommendations({
      calculator: "zzp",
      values: {},
      result: { hourlyRate: 100 },
    });
    expect(result[0].id).toBe("hypotheek");
  });
});

describe("Allowances rules", () => {
  it("recommends bruto-netto as priority 1 when income < 35000", () => {
    const result = getRecommendations({
      calculator: "toeslagen",
      values: {},
      result: { income: 30000 },
    });
    expect(result[0].id).toBe("bruto-netto");
    expect(result[0].priority).toBe(1);
  });

  it("does not recommend bruto-netto when income is above 35000", () => {
    const result = getRecommendations({
      calculator: "toeslagen",
      values: {},
      result: { income: 40000 },
    });
    expect(result.some((r) => r.id === "bruto-netto")).toBe(false);
  });
});

describe("Recommendation registry", () => {
  it("contains all current calculator keys", () => {
    const keys = [
      "bruto-netto",
      "salaris",
      "btw",
      "btw-terugrekenen",
      "btw-inclusief-exclusief",
      "hypotheek",
      "zzp",
      "toeslagen",
      "auto-importkosten",
    ];
    for (const key of keys) {
      expect(recommendationRegistry[key]).toBeDefined();
      expect(typeof recommendationRegistry[key]).toBe("function");
    }
  });
});

describe("Import costs rules", () => {
  it("recommends btw as priority 1", () => {
    const result = getRecommendations({
      calculator: "auto-importkosten",
      values: {},
      result: { totalCost: 15000 },
    });
    expect(result[0].id).toBe("btw");
    expect(result[0].priority).toBe(1);
  });

  it("recommends hypotheek when totalCost > 5000", () => {
    const result = getRecommendations({
      calculator: "auto-importkosten",
      values: {},
      result: { totalCost: 15000 },
    });
    const ids = result.map((r) => r.id);
    expect(ids).toContain("hypotheek");
    expect(ids).not.toContain("bruto-netto");
  });

  it("recommends bruto-netto when totalCost <= 5000", () => {
    const result = getRecommendations({
      calculator: "auto-importkosten",
      values: {},
      result: { totalCost: 3000 },
    });
    const ids = result.map((r) => r.id);
    expect(ids).toContain("bruto-netto");
    expect(ids).not.toContain("hypotheek");
  });

  it("does not recommend the current calculator", () => {
    const result = getRecommendations({
      calculator: "auto-importkosten",
      values: {},
      result: { totalCost: 15000 },
    });
    const ids = result.map((r) => r.id);
    expect(ids).not.toContain("auto-importkosten");
  });

  it("includes zzp and bpm-uitleg recommendations", () => {
    const result = getRecommendations({
      calculator: "auto-importkosten",
      values: {},
      result: { totalCost: 15000 },
    });
    const ids = result.map((r) => r.id);
    expect(ids).toContain("zzp");
    expect(ids).toContain("bpm-uitleg");
  });
});
