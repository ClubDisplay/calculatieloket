import { describe, expect, it } from "vitest";
import { resolveRule } from "../../src/lib/rules/resolver";
import {
  calculateRentBenefit,
  calculateZorgBenefit,
  calculateAllowances,
  type AllowanceInput,
} from "../../src/lib/calculators/allowances";

/**
 * Reference implementation that mirrors the inline toeslagen-calculator.astro
 * script. Used to verify the engine output stays within tolerance.
 */
function referenceAllowances(input: AllowanceInput) {
  const income = input.income;
  const pi = input.partnerIncome ?? 0;
  const rent = input.rent ?? 0;
  const total = input.isCouple ? income + pi : income;
  const isCouple = input.isCouple;

  const maxRent = 932.93;
  const incomeLimitRent = isCouple ? 43500 : 32500;
  let rb = 0;
  if (total <= incomeLimitRent) {
    const baseBenefit = 425;
    const ownPayment = Math.max(0, (total - (isCouple ? 21000 : 18000)) * 0.15);
    rb = Math.round(Math.max(0, baseBenefit - ownPayment) * Math.min(rent, maxRent) / maxRent);
  }

  const incomeLimitZorg = isCouple ? 51142 : 40857;
  let zb = 0;
  if (total <= incomeLimitZorg) {
    const reduction = Math.max(0, (total - (isCouple ? 26000 : 23000)) * 0.15);
    zb = Math.round(Math.max(0, 131 - reduction));
  }

  return { rb, zb };
}

describe("Allowance Engine v0.1", () => {
  it("loads the health allowance parameters from the Knowledge Layer", () => {
    const health = resolveRule({
      type: "allowance_threshold",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
      id: "nl.allowance.health.2026",
    });
    expect(health).toBeDefined();
    expect(health?.id).toBe("nl.allowance.health.2026");
    expect(health?.data.income_limit_single).toBe(40857);
    expect(health?.data.base_benefit).toBe(131);
    expect(health?.data.reduction_rate).toBe(0.15);
  });

  it("loads the rent allowance parameters from the Knowledge Layer", () => {
    const rent = resolveRule({
      type: "allowance_threshold",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
      id: "nl.allowance.rent.2026",
    });
    expect(rent).toBeDefined();
    expect(rent?.id).toBe("nl.allowance.rent.2026");
    expect(rent?.data.max_rent).toBe(932.93);
    expect(rent?.data.base_benefit).toBe(425);
    expect(rent?.data.own_payment_rate).toBe(0.15);
  });

  describe("calculateRentBenefit", () => {
    it("returns 0 when income exceeds the limit", () => {
      expect(calculateRentBenefit(50000, 700, false)).toBe(0);
      expect(calculateRentBenefit(50000, 700, true)).toBe(0);
    });

    it("returns 0 when rent is 0", () => {
      expect(calculateRentBenefit(20000, 0, false)).toBe(0);
    });

    it("returns a positive benefit for a low-income single person", () => {
      const benefit = calculateRentBenefit(20000, 700, false);
      expect(benefit).toBeGreaterThan(0);
    });
  });

  describe("calculateZorgBenefit", () => {
    it("returns 0 when income exceeds the limit", () => {
      expect(calculateZorgBenefit(50000, false)).toBe(0);
      expect(calculateZorgBenefit(60000, true)).toBe(0);
    });

    it("returns a positive benefit for a low-income single person", () => {
      const benefit = calculateZorgBenefit(20000, false);
      expect(benefit).toBeGreaterThan(0);
    });

    it("returns a higher benefit for a couple than a single at the same income", () => {
      const single = calculateZorgBenefit(25000, false);
      const couple = calculateZorgBenefit(25000, true);
      expect(couple).toBeGreaterThan(single);
    });
  });

  describe("calculateAllowances", () => {
    const defaultInput: AllowanceInput = {
      income: 28000,
      isCouple: false,
      rent: 700,
    };

    it("returns a valid result for the standard scenario", () => {
      const result = calculateAllowances(defaultInput);
      expect(result.valid).toBe(true);
      expect(result.rentBenefit).toBeGreaterThanOrEqual(0);
      expect(result.zorgBenefit).toBeGreaterThanOrEqual(0);
    });

    it("matches the inline calculator for the standard scenario", () => {
      const engine = calculateAllowances(defaultInput);
      const reference = referenceAllowances(defaultInput);
      expect(engine.rentBenefit).toBe(reference.rb);
      expect(engine.zorgBenefit).toBe(reference.zb);
    });

    it("matches the inline calculator for a single low-income zorgtoeslag scenario", () => {
      const input: AllowanceInput = { income: 25000, isCouple: false };
      const engine = calculateAllowances(input);
      const reference = referenceAllowances(input);
      expect(engine.zorgBenefit).toBe(reference.zb);
    });

    it("matches the inline calculator for a couple low-income zorgtoeslag scenario", () => {
      const input: AllowanceInput = { income: 25000, partnerIncome: 15000, isCouple: true };
      const engine = calculateAllowances(input);
      const reference = referenceAllowances(input);
      expect(engine.zorgBenefit).toBe(reference.zb);
    });

    it("returns 0 benefits for high incomes", () => {
      const result = calculateAllowances({ income: 50000, isCouple: false, rent: 700 });
      expect(result.valid).toBe(true);
      expect(result.rentBenefit).toBe(0);
      expect(result.zorgBenefit).toBe(0);
    });

    it("matches the inline calculator for a couple huurtoeslag scenario", () => {
      const input: AllowanceInput = {
        income: 30000,
        partnerIncome: 10000,
        isCouple: true,
        rent: 800,
      };
      const engine = calculateAllowances(input);
      const reference = referenceAllowances(input);
      expect(engine.rentBenefit).toBe(reference.rb);
      expect(engine.zorgBenefit).toBe(reference.zb);
    });

    it("returns valid false for negative income", () => {
      const result = calculateAllowances({ income: -1000, isCouple: false });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("returns valid false for negative rent", () => {
      const result = calculateAllowances({ income: 20000, isCouple: false, rent: -100 });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });
});
