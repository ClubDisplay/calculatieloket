import { describe, expect, it } from "vitest";
import { resolveRule } from "../../src/lib/rules/resolver";
import {
  calculateIncomeFactor,
  calculateMaxMortgage,
  calculateMonthlyPayment,
  calculateMortgage,
  type MortgageInput,
} from "../../src/lib/calculators/mortgage";

/**
 * Reference implementation that mirrors the inline hypotheek-calculator.astro
 * script. Used to verify the engine output stays within tolerance.
 */
function referenceMortgageCalculate(input: MortgageInput) {
  let income = input.income;
  const rate = input.interestRate;
  const months = input.termYears * 12;
  const monthlyRate = rate / 100 / 12;
  if (input.includePartner) income += input.partnerIncome ?? 0;
  const incomeFactor = Math.max(3.5, 5.8 - rate * 0.28);
  const maxMortgage = income * incomeFactor;
  const monthly = maxMortgage * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalInterest = monthly * months - maxMortgage;
  const netMonthly = monthly - (totalInterest / input.termYears * 0.3756) / 12;
  return { incomeFactor, maxMortgage, monthly, totalInterest, netMonthly };
}

const defaultInput: MortgageInput = {
  income: 60000,
  interestRate: 3.8,
  termYears: 30,
};

describe("Mortgage Engine v0.1", () => {
  describe("calculateIncomeFactor", () => {
    it("returns the correct factor for the default rate", () => {
      expect(calculateIncomeFactor(3.8)).toBe(4.736);
    });

    it("floors the factor at 3.5 for high rates", () => {
      expect(calculateIncomeFactor(10)).toBe(3.5);
    });
  });

  describe("calculateMaxMortgage", () => {
    it("increases with higher income", () => {
      const low = calculateMaxMortgage(50000, 3.8);
      const high = calculateMaxMortgage(100000, 3.8);
      expect(high).toBeGreaterThan(low);
    });

    it("decreases with higher interest rate", () => {
      const lowRate = calculateMaxMortgage(60000, 2);
      const highRate = calculateMaxMortgage(60000, 5);
      expect(highRate).toBeLessThan(lowRate);
    });
  });

  it("loads the mortgage formula from the Knowledge Layer", () => {
    const formula = resolveRule({
      type: "mortgage_formula",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
      id: "nl.mortgage.formula.2026",
    });
    expect(formula).toBeDefined();
    expect(formula?.id).toBe("nl.mortgage.formula.2026");
    expect(formula?.data.interest_deduction_rate).toBe(0.3756);
    expect(formula?.data.min_income_factor).toBe(3.5);
    expect(formula?.data.income_factor_base).toBe(5.8);
    expect(formula?.data.income_factor_rate_multiplier).toBe(0.28);
  });

  describe("calculateMonthlyPayment", () => {
    it("returns a positive monthly payment for a standard mortgage", () => {
      const payment = calculateMonthlyPayment(284160, 3.8, 30);
      expect(payment).toBeGreaterThan(0);
    });

    it("handles zero interest rate gracefully", () => {
      const payment = calculateMonthlyPayment(120000, 0, 20);
      expect(payment).toBe(500);
    });
  });

  describe("calculateMortgage", () => {
    it("returns a valid result for the standard scenario", () => {
      const result = calculateMortgage(defaultInput);
      expect(result.valid).toBe(true);
      expect(result.maxMortgage).toBeGreaterThan(0);
      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalInterest).toBeGreaterThan(0);
    });

    it("matches the inline calculator within tolerance for the standard scenario", () => {
      const engine = calculateMortgage(defaultInput);
      const reference = referenceMortgageCalculate(defaultInput);

      expect(engine.valid).toBe(true);
      expect(Math.abs(engine.maxMortgage - reference.maxMortgage)).toBeLessThanOrEqual(1);
      expect(Math.abs(engine.monthlyPayment - reference.monthly)).toBeLessThanOrEqual(1);
      expect(Math.abs(engine.totalInterest - reference.totalInterest)).toBeLessThanOrEqual(1);
      expect(Math.abs(engine.netMonthlyPayment - reference.netMonthly)).toBeLessThanOrEqual(1);
    });

    it("matches the inline calculator for a 4% rate scenario", () => {
      const input = { ...defaultInput, interestRate: 4 };
      const engine = calculateMortgage(input);
      const reference = referenceMortgageCalculate(input);

      expect(engine.valid).toBe(true);
      expect(Math.abs(engine.maxMortgage - reference.maxMortgage)).toBeLessThanOrEqual(1);
      expect(Math.abs(engine.monthlyPayment - reference.monthly)).toBeLessThanOrEqual(1);
      expect(Math.abs(engine.totalInterest - reference.totalInterest)).toBeLessThanOrEqual(1);
      expect(Math.abs(engine.netMonthlyPayment - reference.netMonthly)).toBeLessThanOrEqual(1);
    });

    it("includes partner income when requested", () => {
      const result = calculateMortgage({
        ...defaultInput,
        partnerIncome: 40000,
        includePartner: true,
      });
      expect(result.valid).toBe(true);
      expect(result.totalIncome).toBe(100000);
      expect(result.maxMortgage).toBeGreaterThan(calculateMortgage(defaultInput).maxMortgage);
    });

    it("returns valid false for negative income", () => {
      const result = calculateMortgage({ ...defaultInput, income: -1000 });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("returns valid false for zero interest rate", () => {
      const result = calculateMortgage({ ...defaultInput, interestRate: 0 });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("returns valid false for invalid term", () => {
      const result = calculateMortgage({ ...defaultInput, termYears: 0 });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });
});
