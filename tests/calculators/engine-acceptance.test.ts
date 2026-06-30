import { describe, expect, it, vi } from "vitest";
import type { RuleResolverDiagnostics } from "../../src/lib/rules/types";

/**
 * Load a calculator engine module in isolation and return its public API plus
 * a fresh copy of the resolver diagnostics. This forces the engine to resolve
 * its rules from the Knowledge Layer during the test, so we can verify that no
 * fallback locale or missing rule is used.
 */
async function loadEngineAndGetDiagnostics(modulePath: string) {
  vi.resetModules();
  const resolver = await import("../../src/lib/rules/resolver");
  resolver.clearRuleResolverCache();
  resolver.clearRuleResolverDiagnostics();

  const engine = await import(modulePath);
  return { engine, getDiagnostics: resolver.getRuleResolverDiagnostics };
}

function assertNoUnexpectedFallbacks(d: RuleResolverDiagnostics) {
  expect(d.notFoundLookups, "no rules should be missing").toBe(0);
  expect(d.fallbackLocaleHits, "no unexpected locale fallback should occur").toBe(0);
}

describe("Engine acceptance: no unexpected fallback or missing rules", () => {
  it("BTW engine resolves NL VAT without fallback or missing rules", async () => {
    const { engine, getDiagnostics } = await loadEngineAndGetDiagnostics(
      "../../src/lib/calculators/btw",
    );

    const result = engine.calculateBtw({
      amount: 100,
      rate: 21,
      direction: "exclusive_to_inclusive",
    });

    expect(result.valid).toBe(true);
    expect(result.amountIncl).toBe(121);
    assertNoUnexpectedFallbacks(getDiagnostics());
  });

  it("Tax engine resolves 2026 rules without fallback or missing rules", async () => {
    const { engine, getDiagnostics } = await loadEngineAndGetDiagnostics(
      "../../src/lib/calculators/tax",
    );

    const result = engine.calculateNetIncomeEstimate2026({
      grossMonthlySalary: 3500,
      pensionRate: 5,
      applyLoonheffingskorting: true,
    });

    expect(result.valid).toBe(true);
    expect(result.grossYearly).toBeGreaterThan(0);
    assertNoUnexpectedFallbacks(getDiagnostics());
  });

  it("ZZP engine resolves 2026 rules without fallback or missing rules", async () => {
    const { engine, getDiagnostics } = await loadEngineAndGetDiagnostics(
      "../../src/lib/calculators/zzp",
    );

    const result = engine.calculateZzpReverse({
      desiredNetMonthly: 4000,
      billableDaysPerYear: 210,
      hoursPerDay: 8,
      businessCostsMonthly: 300,
      pensionSavingsMonthly: 500,
      applySelfEmployedDeduction: true,
      applyStarterDeduction: false,
      applyMkbExemption: true,
    });

    expect(result.valid).toBe(true);
    expect(result.requiredHourlyRate).toBeGreaterThan(0);
    assertNoUnexpectedFallbacks(getDiagnostics());
  });

  it("Mortgage engine resolves mortgage formula without fallback or missing rules", async () => {
    const { engine, getDiagnostics } = await loadEngineAndGetDiagnostics(
      "../../src/lib/calculators/mortgage",
    );

    const result = engine.calculateMortgage({
      income: 60000,
      interestRate: 3.8,
      termYears: 30,
      partnerIncome: 30000,
      includePartner: true,
    });

    expect(result.valid).toBe(true);
    expect(result.maxMortgage).toBeGreaterThan(0);
    expect(result.monthlyPayment).toBeGreaterThan(0);

    const d = getDiagnostics();
    expect(d.totalLookups).toBeGreaterThan(0);
    assertNoUnexpectedFallbacks(d);
  });

  it("Allowance engine resolves allowance thresholds without fallback or missing rules", async () => {
    const { engine, getDiagnostics } = await loadEngineAndGetDiagnostics(
      "../../src/lib/calculators/allowances",
    );

    const result = engine.calculateAllowances({
      income: 30000,
      partnerIncome: 0,
      isCouple: false,
      rent: 800,
    });

    expect(result.valid).toBe(true);
    expect(result.rentBenefit).toBeGreaterThanOrEqual(0);
    expect(result.zorgBenefit).toBeGreaterThanOrEqual(0);

    const d = getDiagnostics();
    expect(d.totalLookups).toBeGreaterThan(0);
    assertNoUnexpectedFallbacks(d);
  });

  it("Import Cost engine resolves import cost defaults without fallback or missing rules", async () => {
    const { engine, getDiagnostics } = await loadEngineAndGetDiagnostics(
      "../../src/lib/calculators/import-costs",
    );

    const result = engine.calculateImportCosts({
      purchasePrice: 15000,
      estimatedBpm: 2000,
      rdwCosts: 100,
      transportCosts: 500,
      exportCosts: 50,
      inspectionCosts: 200,
      plateCosts: 50,
      otherCosts: 100,
      nlPrice: 20000,
    });

    expect(result.valid).toBe(true);
    expect(result.totalCost).toBeGreaterThan(0);
    expect(result.priceDifference).toBeDefined();

    const d = getDiagnostics();
    expect(d.totalLookups).toBeGreaterThan(0);
    assertNoUnexpectedFallbacks(d);
  });
});
