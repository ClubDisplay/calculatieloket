import { describe, expect, it } from "vitest";
import {
  calculateBox1Tax2026,
  calculateGeneralTaxCredit2026,
  calculateLabourTaxCredit2026,
  calculateNetIncomeEstimate2026,
} from "../../src/lib/calculators/tax";
import { resolveRule } from "../../src/lib/rules/resolver";

describe("Tax Engine 2026", () => {
  describe("resolver wiring", () => {
    it("resolves the 2026 Box 1 tax bracket object", () => {
      const obj = resolveRule({
        type: "tax_bracket",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
      });

      expect(obj).toBeDefined();
      expect(obj?.id).toBe("nl.tax.box1.2026");

      const data = obj?.data as {
        brackets: Array<{ up_to: number | null; rate: number }>;
      };
      expect(data.brackets[0].rate).toBe(0.3575);
      expect(data.brackets[1].rate).toBe(0.3756);
      expect(data.brackets[2].rate).toBe(0.495);
    });

    it("resolves the 2026 general tax credit (AHK) object", () => {
      const obj = resolveRule({
        type: "tax_credit",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        id: "nl.tax.ahk.2026",
      });

      expect(obj).toBeDefined();
      expect(obj?.id).toBe("nl.tax.ahk.2026");

      const data = obj?.data as {
        max: number;
        phase_out: { threshold: number; rate: number };
        cut_off: number;
      };
      expect(data.max).toBe(3115);
      expect(data.phase_out.threshold).toBe(29736);
      expect(data.cut_off).toBe(78427);
    });

    it("resolves the 2026 labour tax credit (AK) object", () => {
      const obj = resolveRule({
        type: "tax_credit",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        id: "nl.tax.ak.2026",
      });

      expect(obj).toBeDefined();
      expect(obj?.id).toBe("nl.tax.ak.2026");

      const data = obj?.data as {
        max: number;
        brackets: Array<{ up_to: number | null; base?: number; rate: number }>;
      };
      expect(data.max).toBe(5685);
      expect(data.brackets[0].rate).toBe(0.08324);
      expect(data.brackets[3].rate).toBe(-0.0651);
    });
  });

  describe("calculateBox1Tax2026", () => {
    it("returns 0 for zero or negative income", () => {
      expect(calculateBox1Tax2026(0)).toBe(0);
      expect(calculateBox1Tax2026(-1000)).toBe(0);
    });

    it("returns a positive tax for a low income", () => {
      expect(calculateBox1Tax2026(10000)).toBeGreaterThan(0);
    });

    it("taxes higher income more than middle income", () => {
      const lowTax = calculateBox1Tax2026(30000);
      const middleTax = calculateBox1Tax2026(50000);
      const highTax = calculateBox1Tax2026(100000);
      expect(lowTax).toBeLessThan(middleTax);
      expect(middleTax).toBeLessThan(highTax);
    });
  });

  describe("calculateGeneralTaxCredit2026", () => {
    it("is never negative", () => {
      expect(calculateGeneralTaxCredit2026(-1000)).toBe(0);
      expect(calculateGeneralTaxCredit2026(0)).toBe(0);
      expect(calculateGeneralTaxCredit2026(100000)).toBeGreaterThanOrEqual(0);
    });

    it("returns the maximum for low income", () => {
      expect(calculateGeneralTaxCredit2026(10000)).toBe(3115);
    });

    it("phases out to 0 above the cut-off", () => {
      expect(calculateGeneralTaxCredit2026(80000)).toBe(0);
    });
  });

  describe("calculateLabourTaxCredit2026", () => {
    it("is never negative", () => {
      expect(calculateLabourTaxCredit2026(-1000)).toBe(0);
      expect(calculateLabourTaxCredit2026(0)).toBe(0);
      expect(calculateLabourTaxCredit2026(150000)).toBeGreaterThanOrEqual(0);
    });

    it("returns a positive credit for a typical income", () => {
      expect(calculateLabourTaxCredit2026(30000)).toBeGreaterThan(0);
    });
  });

  describe("calculateNetIncomeEstimate2026", () => {
    it("returns a safe result for zero income", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 0,
        pensionRate: 0,
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(true);
      expect(result.netYearly).toBe(0);
      expect(result.netMonthly).toBe(0);
    });

    it("returns an error for negative income", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: -1000,
        pensionRate: 0,
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBeTruthy();
    });

    it("produces net lower than gross for a normal income", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 3500,
        pensionRate: 5,
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(true);
      expect(result.netYearly).toBeLessThan(result.grossYearly);
      expect(result.netMonthly).toBeLessThan(3500);
    });

    it("matches the existing salaris-calculator example approximately", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 3500,
        pensionRate: 5,
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(true);
      expect(result.grossYearly).toBeCloseTo(45360, 0);
      expect(result.taxableIncome).toBeCloseTo(43260, 0);
      expect(result.incomeTax).toBeCloseTo(15544.67, 1);
      expect(result.totalCredits).toBeCloseTo(7889.33, 1);
      expect(result.netYearly).toBeCloseTo(35604.65, 1);
      expect(result.netMonthly).toBeCloseTo(2967.05, 1);
    });

    it("reduces net income when loonheffingskorting is disabled", () => {
      const withCredits = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 3500,
        pensionRate: 5,
        applyLoonheffingskorting: true,
      });
      const withoutCredits = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 3500,
        pensionRate: 5,
        applyLoonheffingskorting: false,
      });
      expect(withoutCredits.netYearly).toBeLessThan(withCredits.netYearly);
    });

    it("matches the salaris-calculator example with 0% pension", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 3500,
        pensionRate: 0,
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(true);
      expect(result.grossYearly).toBeCloseTo(45360, 0);
      expect(result.taxableIncome).toBeCloseTo(45360, 0);
      expect(result.incomeTax).toBeCloseTo(16333.43, 1);
      expect(result.totalCredits).toBeCloseTo(7795.92, 1);
      expect(result.netYearly).toBeCloseTo(36822.49, 1);
      expect(result.netMonthly).toBeCloseTo(3068.54, 1);
    });

    it("matches the bruto-netto-2026 example 1 (€3000 + €150 pension)", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 3000,
        pensionRate: 5, // 150 / 3000 * 100
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(true);
      expect(result.grossYearly).toBeCloseTo(38880, 0);
      expect(result.taxableIncome).toBeCloseTo(37080, 0);
      expect(result.incomeTax).toBeCloseTo(13256.1, 1);
      expect(result.totalCredits).toBeCloseTo(8164.19, 1);
      expect(result.netYearly).toBeCloseTo(31988.09, 1);
      expect(result.netMonthly).toBeCloseTo(2665.67, 1);
    });

    it("matches the bruto-netto-2026 example 2 (€4000 + €200 pension)", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 4000,
        pensionRate: 5, // 200 / 4000 * 100
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(true);
      expect(result.grossYearly).toBeCloseTo(51840, 0);
      expect(result.taxableIncome).toBeCloseTo(49440, 0);
      expect(result.incomeTax).toBeCloseTo(17865.88, 1);
      expect(result.totalCredits).toBeCloseTo(7288.83, 1);
      expect(result.netYearly).toBeCloseTo(38862.95, 1);
      expect(result.netMonthly).toBeCloseTo(3238.58, 1);
    });

    it("gives the same pension withholding for pensionRate and equivalent pensionAmount", () => {
      const rateResult = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 4000,
        pensionRate: 5,
        applyLoonheffingskorting: true,
      });
      const amountResult = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 4000,
        pensionAmount: 200,
        applyLoonheffingskorting: true,
      });

      expect(amountResult.valid).toBe(true);
      expect(amountResult.breakdown.pensionAmount).toBe(rateResult.breakdown.pensionAmount);
      expect(amountResult.netYearly).toBe(rateResult.netYearly);
      expect(amountResult.netMonthly).toBe(rateResult.netMonthly);
    });

    it("gives pensionAmount priority over pensionRate", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 4000,
        pensionRate: 10,
        pensionAmount: 200,
        applyLoonheffingskorting: true,
      });

      expect(result.valid).toBe(true);
      expect(result.breakdown.pensionAmount).toBe(2400);
      expect(result.taxableIncome).toBeCloseTo(49440, 0);
    });

    it("matches the bruto-netto-2026 example 2 via pensionAmount", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 4000,
        pensionAmount: 200,
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(true);
      expect(result.grossYearly).toBeCloseTo(51840, 0);
      expect(result.taxableIncome).toBeCloseTo(49440, 0);
      expect(result.incomeTax).toBeCloseTo(17865.88, 1);
      expect(result.totalCredits).toBeCloseTo(7288.83, 1);
      expect(result.netYearly).toBeCloseTo(38862.95, 1);
      expect(result.netMonthly).toBeCloseTo(3238.58, 1);
    });

    it("treats a negative pensionAmount as 0", () => {
      const result = calculateNetIncomeEstimate2026({
        grossMonthlySalary: 3000,
        pensionAmount: -150,
        applyLoonheffingskorting: true,
      });
      expect(result.valid).toBe(true);
      expect(result.breakdown.pensionAmount).toBe(0);
      expect(result.taxableIncome).toBe(result.grossYearly);
    });
  });
});
