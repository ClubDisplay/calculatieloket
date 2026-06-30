import { beforeEach, describe, expect, it } from "vitest";
import {
  clearRuleResolverCache,
  resolveRule,
} from "../../src/lib/rules/resolver";
import {
  calculateZzpDeductions,
  calculateZzpTaxableIncome,
  calculateZzpTax,
  calculateZzpNetProfit,
  solveRequiredRevenue,
  calculateZzpReverse,
  type ZzpInput,
} from "../../src/lib/calculators/zzp";

/**
 * Reference implementation that mirrors the current inline script in
 * src/pages/zzp-calculator.astro. Used to verify the new engine produces
 * output within tolerance of the existing calculator.
 */
function referenceZzpCalculate(input: ZzpInput) {
  const net = input.desiredNetMonthly;
  const days = input.billableDaysPerYear;
  const hrs = input.hoursPerDay;
  const costs = input.businessCostsMonthly;
  const pension = input.pensionSavingsMonthly;
  const hasZA = input.applySelfEmployedDeduction;
  const hasStarter = input.applyStarterDeduction;
  const hasMKB = input.applyMkbExemption;

  const hours = days * hrs;
  const yearlyCosts = costs * 12;
  const yearlyPension = pension * 12;
  const yearlyNet = net * 12;
  const zaAmount = hasZA ? 1200 : 0;
  const starterAmount = hasStarter ? 2123 : 0;
  const totalAftrek = zaAmount + starterAmount;

  function calcTax(income: number): number {
    if (income <= 38883) return income * 0.3575;
    if (income <= 78426) return 38883 * 0.3575 + (income - 38883) * 0.3756;
    return 38883 * 0.3575 + (78426 - 38883) * 0.3756 + (income - 78426) * 0.495;
  }
  function calcAHK(income: number): number {
    if (income <= 29736) return 3115;
    if (income >= 78427) return 0;
    return Math.max(0, 3115 - 0.06398 * (income - 29736));
  }
  function calcAK(income: number): number {
    if (income <= 11965) return income * 0.08324;
    if (income <= 25845) return 996 + 0.31009 * (income - 11965);
    if (income <= 45592) return 5300 + 0.0195 * (income - 25845);
    if (income <= 132920) return Math.max(0, 5685 - 0.0651 * (income - 45592));
    return 0;
  }

  let revenue = 0;
  let resultNet = 0;
  let totalTax = 0;
  for (let i = 0; i < 30; i++) {
    let taxable = revenue - yearlyCosts;
    if (hasMKB && taxable > totalAftrek) {
      taxable = (taxable - totalAftrek) * (1 - 0.127) + totalAftrek;
    }
    taxable = taxable - totalAftrek;
    const tax = calcTax(Math.max(0, taxable));
    const ahk = calcAHK(Math.max(0, taxable));
    const ak = calcAK(Math.max(0, taxable));
    totalTax = Math.max(0, tax - ahk - ak);
    resultNet = revenue - yearlyCosts - totalTax;
    if (Math.abs(resultNet - yearlyPension - yearlyNet) < 10) break;
    revenue += (yearlyNet - (resultNet - yearlyPension)) * 0.7;
  }

  return {
    revenue,
    hourlyRate: revenue / hours,
    resultNet,
    totalTax,
    netAfterPension: resultNet - yearlyPension,
  };
}

const defaultInput: ZzpInput = {
  desiredNetMonthly: 4000,
  billableDaysPerYear: 210,
  hoursPerDay: 8,
  businessCostsMonthly: 300,
  pensionSavingsMonthly: 500,
  applySelfEmployedDeduction: true,
  applyStarterDeduction: false,
  applyMkbExemption: true,
};

describe("ZZP Engine v0.1", () => {
  describe("calculateZzpDeductions", () => {
    it("returns only self-employed deduction without starter deduction", () => {
      const deductions = calculateZzpDeductions(defaultInput);
      expect(deductions.selfEmployedAmount).toBe(1200);
      expect(deductions.starterAmount).toBe(0);
      expect(deductions.totalEntrepreneurDeductions).toBe(1200);
      expect(deductions.mkbRate).toBe(0.127);
    });

    it("includes starter deduction when enabled", () => {
      const deductions = calculateZzpDeductions({
        ...defaultInput,
        applyStarterDeduction: true,
      });
      expect(deductions.selfEmployedAmount).toBe(1200);
      expect(deductions.starterAmount).toBe(2123);
      expect(deductions.totalEntrepreneurDeductions).toBe(3323);
    });
  });

  describe("calculateZzpTaxableIncome", () => {
    it("returns a non-negative taxable income for profitable scenarios", () => {
      const deductions = calculateZzpDeductions(defaultInput);
      const taxable = calculateZzpTaxableIncome(120000, 3600, deductions);
      expect(taxable).toBeGreaterThan(0);
    });

    it("allows negative taxable income before tax clamping when costs exceed revenue", () => {
      const deductions = calculateZzpDeductions(defaultInput);
      const taxable = calculateZzpTaxableIncome(0, 10000, deductions);
      expect(taxable).toBeLessThan(0);
    });
  });

  describe("calculateZzpTax", () => {
    it("clamps negative taxable income to zero", () => {
      const tax = calculateZzpTax(-5000);
      expect(tax.incomeTax).toBe(0);
      expect(tax.generalTaxCredit).toBe(0);
      expect(tax.labourTaxCredit).toBe(0);
      expect(tax.totalTaxDue).toBe(0);
    });

    it("produces positive tax due for a middle income", () => {
      const tax = calculateZzpTax(50000);
      expect(tax.totalTaxDue).toBeGreaterThan(0);
    });
  });

  describe("calculateZzpNetProfit", () => {
    it("net profit increases with higher revenue", () => {
      const deductions = calculateZzpDeductions(defaultInput);
      const low = calculateZzpNetProfit(100000, 3600, deductions);
      const high = calculateZzpNetProfit(150000, 3600, deductions);
      expect(high.netProfit).toBeGreaterThan(low.netProfit);
    });
  });

  describe("solveRequiredRevenue", () => {
    it("converges within max iterations for the default scenario", () => {
      const deductions = calculateZzpDeductions(defaultInput);
      const desiredNetYearly = defaultInput.desiredNetMonthly * 12;
      const yearlyCosts = defaultInput.businessCostsMonthly * 12;
      const yearlyPension = defaultInput.pensionSavingsMonthly * 12;

      const result = solveRequiredRevenue(desiredNetYearly, yearlyCosts, yearlyPension, deductions, {
        year: 2026,
        maxIterations: 50,
        tolerance: 1,
        maxRevenue: 10_000_000,
      });

      expect(result.converged).toBe(true);
      expect(result.iterations).toBeLessThanOrEqual(50);
      expect(result.revenue).toBeGreaterThan(0);
    });
  });

  describe("calculateZzpReverse", () => {
    it("returns a valid result for the default scenario", () => {
      const result = calculateZzpReverse(defaultInput);
      expect(result.valid).toBe(true);
      expect(result.requiredHourlyRate).toBeGreaterThan(0);
      expect(result.requiredYearlyRevenue).toBeGreaterThan(0);
      expect(result.totalBillableHours).toBe(1680);
    });

    it("returns valid false for invalid input", () => {
      const result = calculateZzpReverse({
        ...defaultInput,
        billableDaysPerYear: 0,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("matches the inline calculator within tolerance for the default scenario", () => {
      const engine = calculateZzpReverse(defaultInput);
      const reference = referenceZzpCalculate(defaultInput);

      expect(engine.valid).toBe(true);
      expect(
        Math.abs(engine.requiredYearlyRevenue - reference.revenue),
      ).toBeLessThanOrEqual(100);
      expect(
        Math.abs(engine.requiredHourlyRate - reference.hourlyRate),
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(engine.netAfterPension - reference.netAfterPension),
      ).toBeLessThanOrEqual(20);
    });

    it("matches the inline calculator with starter deduction", () => {
      const input = { ...defaultInput, applyStarterDeduction: true };
      const engine = calculateZzpReverse(input);
      const reference = referenceZzpCalculate(input);

      expect(engine.valid).toBe(true);
      expect(
        Math.abs(engine.requiredYearlyRevenue - reference.revenue),
      ).toBeLessThanOrEqual(100);
      expect(
        Math.abs(engine.requiredHourlyRate - reference.hourlyRate),
      ).toBeLessThanOrEqual(1);
    });

    it("matches the inline calculator with zero business costs", () => {
      const input = { ...defaultInput, businessCostsMonthly: 0 };
      const engine = calculateZzpReverse(input);
      const reference = referenceZzpCalculate(input);

      expect(engine.valid).toBe(true);
      expect(engine.yearlyCosts).toBe(0);
      expect(
        Math.abs(engine.requiredYearlyRevenue - reference.revenue),
      ).toBeLessThanOrEqual(100);
      expect(
        Math.abs(engine.requiredHourlyRate - reference.hourlyRate),
      ).toBeLessThanOrEqual(1);
    });

    it("matches the inline calculator with zero pension savings", () => {
      const input = { ...defaultInput, pensionSavingsMonthly: 0 };
      const engine = calculateZzpReverse(input);
      const reference = referenceZzpCalculate(input);

      expect(engine.valid).toBe(true);
      expect(engine.yearlyPension).toBe(0);
      expect(
        Math.abs(engine.requiredYearlyRevenue - reference.revenue),
      ).toBeLessThanOrEqual(100);
      expect(
        Math.abs(engine.requiredHourlyRate - reference.hourlyRate),
      ).toBeLessThanOrEqual(1);
    });

    it("matches the inline calculator with all deductions off", () => {
      const input = {
        ...defaultInput,
        applySelfEmployedDeduction: false,
        applyStarterDeduction: false,
        applyMkbExemption: false,
      };
      const engine = calculateZzpReverse(input);
      const reference = referenceZzpCalculate(input);

      expect(engine.valid).toBe(true);
      expect(engine.totalEntrepreneurDeductions).toBe(0);
      expect(engine.mkbExemptionAmount).toBe(0);
      expect(
        Math.abs(engine.requiredYearlyRevenue - reference.revenue),
      ).toBeLessThanOrEqual(100);
      expect(
        Math.abs(engine.requiredHourlyRate - reference.hourlyRate),
      ).toBeLessThanOrEqual(1);
    });

    it("returns valid false for negative desired net income", () => {
      const result = calculateZzpReverse({
        ...defaultInput,
        desiredNetMonthly: -1000,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe("ZZP Knowledge Layer integration", () => {
    beforeEach(() => {
      clearRuleResolverCache();
    });

    it("resolves the self-employed deduction object", () => {
      const obj = resolveRule({
        type: "entrepreneur_deduction",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        id: "nl.zzp.self_employed_deduction.2026",
      });
      expect(obj).toBeDefined();
      expect(obj?.id).toBe("nl.zzp.self_employed_deduction.2026");
      expect((obj?.data as { amount?: number }).amount).toBe(1200);
    });

    it("resolves the starter deduction object", () => {
      const obj = resolveRule({
        type: "entrepreneur_deduction",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        id: "nl.zzp.starter_deduction.2026",
      });
      expect(obj).toBeDefined();
      expect(obj?.id).toBe("nl.zzp.starter_deduction.2026");
      expect((obj?.data as { amount?: number }).amount).toBe(2123);
    });

    it("resolves the MKB profit exemption object", () => {
      const obj = resolveRule({
        type: "profit_exemption",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        id: "nl.zzp.mkb_profit_exemption.2026",
      });
      expect(obj).toBeDefined();
      expect(obj?.id).toBe("nl.zzp.mkb_profit_exemption.2026");
      expect((obj?.data as { rate?: number }).rate).toBe(0.127);
    });
  });
});
