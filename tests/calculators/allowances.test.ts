import { describe, expect, it } from "vitest";
import { resolveRule } from "../../src/lib/rules/resolver";
import {
  calculateRentBenefit,
  calculateZorgBenefit,
  calculateHealthcareAllowance2026,
  calculateAllowances,
  type AllowanceInput,
} from "../../src/lib/calculators/allowances";

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
    expect(health?.data.income_limit_couple).toBe(51142);
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

  describe("calculateHealthcareAllowance2026", () => {
    describe("single person (no toeslagpartner)", () => {
      it.each([
        [25000, 129],
        [29500, 129],
        [30000, 126],
        [30500, 120],
        [35000, 69],
        [40500, 6],
      ])("income %i -> monthly zorgtoeslag %i", (income, expected) => {
        expect(calculateHealthcareAllowance2026(income, false)).toBe(expected);
      });

      it("returns 0 above the single income limit", () => {
        expect(calculateHealthcareAllowance2026(41000, false)).toBe(0);
        expect(calculateHealthcareAllowance2026(50000, false)).toBe(0);
      });
    });

    describe("couple (with toeslagpartner)", () => {
      it.each([
        [25000, 246],
        [30000, 243],
        [35000, 186],
        [50000, 15],
        [51000, 3],
      ])("joint income %i -> monthly zorgtoeslag %i", (income, expected) => {
        expect(calculateHealthcareAllowance2026(income, true)).toBe(expected);
      });

      it("returns 0 above the couple income limit", () => {
        expect(calculateHealthcareAllowance2026(52000, true)).toBe(0);
        expect(calculateHealthcareAllowance2026(60000, true)).toBe(0);
      });
    });

    it("returns 0 for invalid inputs", () => {
      expect(calculateHealthcareAllowance2026(NaN, false)).toBe(0);
      expect(calculateHealthcareAllowance2026(-1000, false)).toBe(0);
    });
  });

  describe("calculateZorgBenefit", () => {
    it("delegates to the 2026 table-based implementation", () => {
      expect(calculateZorgBenefit(25000, false)).toBe(129);
      expect(calculateZorgBenefit(25000, true)).toBe(246);
      expect(calculateZorgBenefit(41000, false)).toBe(0);
      expect(calculateZorgBenefit(51000, true)).toBe(3);
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
      expect(result.zorgBenefit).toBe(129);
    });

    it("returns the correct zorgtoeslag for the reported bug case", () => {
      const result = calculateAllowances({ income: 25000, rent: 700, isCouple: false });
      expect(result.valid).toBe(true);
      expect(result.zorgBenefit).toBe(129);
      expect(result.rentBenefit).toBeGreaterThanOrEqual(0);
    });

    it("returns 0 benefits for high incomes", () => {
      const result = calculateAllowances({ income: 50000, isCouple: false, rent: 700 });
      expect(result.valid).toBe(true);
      expect(result.rentBenefit).toBe(0);
      expect(result.zorgBenefit).toBe(0);
    });

    it("calculates joint income correctly for a couple", () => {
      const input: AllowanceInput = {
        income: 30000,
        partnerIncome: 20000,
        isCouple: true,
        rent: 800,
      };
      const result = calculateAllowances(input);
      expect(result.totalIncome).toBe(50000);
      expect(result.zorgBenefit).toBe(15);
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

    it("ignores partnerIncome when single", () => {
      const alone = calculateAllowances({ income: 15000, partnerIncome: 50000, isCouple: false, rent: 650 });
      expect(alone.totalIncome).toBe(15000);
      expect(alone.rentBenefit).toBeGreaterThan(0);
      expect(alone.zorgBenefit).toBeGreaterThan(0);
    });

    it("does not return 0 for a single low-income scenario due to ignored partnerIncome", () => {
      const withoutPartner = calculateAllowances({ income: 15000, isCouple: false, rent: 650 });
      const withPartner = calculateAllowances({ income: 15000, partnerIncome: 25000, isCouple: false, rent: 650 });
      expect(withPartner.totalIncome).toBe(withoutPartner.totalIncome);
      expect(withPartner.rentBenefit).toBe(withoutPartner.rentBenefit);
      expect(withPartner.zorgBenefit).toBe(withoutPartner.zorgBenefit);
      expect(withPartner.rentBenefit).toBeGreaterThan(0);
      expect(withPartner.zorgBenefit).toBeGreaterThan(0);
    });

    it("still counts partnerIncome when couple", () => {
      const alone = calculateAllowances({ income: 30000, isCouple: false, rent: 700 });
      const couple = calculateAllowances({ income: 30000, partnerIncome: 10000, isCouple: true, rent: 700 });
      expect(couple.totalIncome).toBe(40000);
      expect(couple.totalIncome).not.toBe(alone.totalIncome);
      expect(couple.zorgBenefit).toBe(129);
    });

    it("matches the required edge cases from the hotfix specification", () => {
      // Single
      expect(calculateAllowances({ income: 25000, isCouple: false }).zorgBenefit).toBe(129);
      expect(calculateAllowances({ income: 30000, isCouple: false }).zorgBenefit).toBe(126);
      expect(calculateAllowances({ income: 40500, isCouple: false }).zorgBenefit).toBe(6);
      expect(calculateAllowances({ income: 41000, isCouple: false }).zorgBenefit).toBe(0);

      // Couple
      expect(calculateAllowances({ income: 25000, partnerIncome: 0, isCouple: true }).zorgBenefit).toBe(246);
      expect(calculateAllowances({ income: 30000, partnerIncome: 20000, isCouple: true }).zorgBenefit).toBe(15);
      expect(calculateAllowances({ income: 51000, partnerIncome: 0, isCouple: true }).zorgBenefit).toBe(3);
      expect(calculateAllowances({ income: 52000, partnerIncome: 0, isCouple: true }).zorgBenefit).toBe(0);
    });
  });
});
