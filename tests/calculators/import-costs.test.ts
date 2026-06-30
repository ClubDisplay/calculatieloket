import { describe, expect, it } from "vitest";
import { resolveRule } from "../../src/lib/rules/resolver";
import {
  calculateImportCosts,
  type ImportCostInput,
} from "../../src/lib/calculators/import-costs";

/**
 * Reference implementation that mirrors the inline
 * auto-importkosten-berekenen.astro script.
 */
function referenceImportCosts(input: ImportCostInput) {
  const purchasePrice = input.purchasePrice || 0;
  const bpm = input.estimatedBpm || 0;
  const rdw = input.rdwCosts || 0;
  const transport = input.transportCosts || 0;
  const exportC = input.exportCosts || 0;
  const inspection = input.inspectionCosts || 0;
  const plates = input.plateCosts || 0;
  const other = input.otherCosts || 0;
  const total =
    purchasePrice + bpm + rdw + transport + exportC + inspection + plates + other;

  const result = {
    valid: purchasePrice > 0,
    total,
  };

  return result;
}

describe("Import Cost Engine v0.1", () => {
  it("loads the import cost defaults from the Knowledge Layer", () => {
    const costs = resolveRule({
      type: "import_cost",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
      id: "nl.import.costs.2026",
    });
    expect(costs).toBeDefined();
    expect(costs?.id).toBe("nl.import.costs.2026");
    expect(costs?.data.estimatedBpm).toBe(0);
    expect(costs?.data.rdwCosts).toBe(0);
    expect(costs?.data.transportCosts).toBe(0);
    expect(costs?.data.exportCosts).toBe(0);
    expect(costs?.data.inspectionCosts).toBe(0);
    expect(costs?.data.plateCosts).toBe(0);
    expect(costs?.data.otherCosts).toBe(0);
  });

  it("matches the inline calculator for the default scenario", () => {
    const input: ImportCostInput = {
      purchasePrice: 15000,
      estimatedBpm: 3000,
      rdwCosts: 150,
      transportCosts: 400,
      exportCosts: 150,
      inspectionCosts: 150,
      plateCosts: 50,
      otherCosts: 100,
    };

    const engine = calculateImportCosts(input);
    const reference = referenceImportCosts(input);

    expect(engine.valid).toBe(true);
    expect(engine.totalCost).toBe(reference.total);
    expect(engine.totalCost).toBe(19000);
  });

  it("returns invalid when purchasePrice is zero or negative", () => {
    expect(calculateImportCosts({ ...emptyInput(), purchasePrice: 0 }).valid).toBe(false);
    expect(calculateImportCosts({ ...emptyInput(), purchasePrice: -100 }).valid).toBe(false);
  });

  it("treats negative optional costs as zero", () => {
    const input: ImportCostInput = {
      purchasePrice: 10000,
      estimatedBpm: -1000,
      rdwCosts: -100,
      transportCosts: -50,
      exportCosts: -25,
      inspectionCosts: -10,
      plateCosts: -5,
      otherCosts: -1,
    };

    const result = calculateImportCosts(input);
    expect(result.valid).toBe(true);
    expect(result.totalCost).toBe(10000);
    expect(result.estimatedBpm).toBe(0);
    expect(result.rdwCosts).toBe(0);
    expect(result.transportCosts).toBe(0);
    expect(result.exportCosts).toBe(0);
    expect(result.inspectionCosts).toBe(0);
    expect(result.plateCosts).toBe(0);
    expect(result.otherCosts).toBe(0);
  });

  it("returns a cheaper label when NL price is higher than total cost", () => {
    const result = calculateImportCosts({
      purchasePrice: 15000,
      estimatedBpm: 3000,
      rdwCosts: 150,
      transportCosts: 400,
      exportCosts: 150,
      inspectionCosts: 150,
      plateCosts: 50,
      otherCosts: 100,
      nlPrice: 21000,
    });

    expect(result.valid).toBe(true);
    expect(result.priceDifference).toBe(2000);
    expect(result.differenceLabel).toBe("Voordeliger (indicatie)");
  });

  it("returns a more expensive label when NL price is lower than total cost", () => {
    const result = calculateImportCosts({
      purchasePrice: 15000,
      estimatedBpm: 3000,
      rdwCosts: 150,
      transportCosts: 400,
      exportCosts: 150,
      inspectionCosts: 150,
      plateCosts: 50,
      otherCosts: 100,
      nlPrice: 18000,
    });

    expect(result.valid).toBe(true);
    expect(result.priceDifference).toBe(-1000);
    expect(result.differenceLabel).toBe("Duurder (indicatie)");
  });

  it("hides comparison when nlPrice is not provided or zero", () => {
    const without = calculateImportCosts({
      purchasePrice: 15000,
      estimatedBpm: 3000,
      rdwCosts: 150,
      transportCosts: 400,
      exportCosts: 150,
      inspectionCosts: 150,
      plateCosts: 50,
      otherCosts: 100,
    });

    expect(without.nlPrice).toBeUndefined();
    expect(without.priceDifference).toBeUndefined();
    expect(without.differenceLabel).toBeUndefined();

    const zero = calculateImportCosts({
      purchasePrice: 15000,
      estimatedBpm: 3000,
      rdwCosts: 150,
      transportCosts: 400,
      exportCosts: 150,
      inspectionCosts: 150,
      plateCosts: 50,
      otherCosts: 100,
      nlPrice: 0,
    });

    expect(zero.nlPrice).toBeUndefined();
    expect(zero.priceDifference).toBeUndefined();
    expect(zero.differenceLabel).toBeUndefined();
  });

  it("rounds the comparison correctly when equal", () => {
    const result = calculateImportCosts({
      purchasePrice: 15000,
      estimatedBpm: 3000,
      rdwCosts: 150,
      transportCosts: 400,
      exportCosts: 150,
      inspectionCosts: 150,
      plateCosts: 50,
      otherCosts: 100,
      nlPrice: 19000,
    });

    expect(result.priceDifference).toBe(0);
    expect(result.differenceLabel).toBe("Duurder (indicatie)");
  });
});

function emptyInput(): ImportCostInput {
  return {
    purchasePrice: 0,
    estimatedBpm: 0,
    rdwCosts: 0,
    transportCosts: 0,
    exportCosts: 0,
    inspectionCosts: 0,
    plateCosts: 0,
    otherCosts: 0,
  };
}
