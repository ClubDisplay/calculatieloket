import { describe, expect, it } from "vitest";
import { calculateVacationPay } from "../../src/lib/calculators/vacation-pay";

describe("Vacation Pay Engine 2026", () => {
  it("returns a valid result for typical input", () => {
    const result = calculateVacationPay({
      grossMonthlySalary: 3000,
      applyLoonheffingskorting: true,
    });

    expect(result.valid).toBe(true);
    expect(result.grossMonthlySalary).toBe(3000);
    expect(result.vacationPayPercentage).toBe(8);
    expect(result.grossVacationPay).toBeCloseTo(2880, 0);
    expect(result.netVacationPay).toBeGreaterThan(0);
    expect(result.estimatedTax).toBeGreaterThan(0);
    expect(result.effectiveRate).toBeGreaterThan(0);
    expect(result.effectiveRate).toBeLessThan(1);
  });

  it("defaults to 8% vacation pay", () => {
    const result = calculateVacationPay({
      grossMonthlySalary: 3500,
      applyLoonheffingskorting: true,
    });

    expect(result.vacationPayPercentage).toBe(8);
    expect(result.grossVacationPay).toBeCloseTo(3500 * 12 * 0.08, 0);
  });

  it("supports a custom vacation pay percentage", () => {
    const result = calculateVacationPay({
      grossMonthlySalary: 3000,
      vacationPayPercentage: 10,
      applyLoonheffingskorting: true,
    });

    expect(result.vacationPayPercentage).toBe(10);
    expect(result.grossVacationPay).toBeCloseTo(3600, 0);
  });

  it("differs with and without loonheffingskorting", () => {
    const withLhk = calculateVacationPay({
      grossMonthlySalary: 3000,
      applyLoonheffingskorting: true,
    });

    const withoutLhk = calculateVacationPay({
      grossMonthlySalary: 3000,
      applyLoonheffingskorting: false,
    });

    expect(withoutLhk.netVacationPay).toBeGreaterThan(0);
    expect(withoutLhk.netVacationPay).not.toBe(withLhk.netVacationPay);
  });

  it("includes pension in the estimate", () => {
    const withoutPension = calculateVacationPay({
      grossMonthlySalary: 3000,
      applyLoonheffingskorting: true,
    });

    const withPension = calculateVacationPay({
      grossMonthlySalary: 3000,
      applyLoonheffingskorting: true,
      pensionAmount: 150,
    });

    expect(withPension.valid).toBe(true);
    expect(withPension.estimatedTax).not.toBe(withoutPension.estimatedTax);
  });

  it("returns an invalid result for non-positive gross salary", () => {
    const zero = calculateVacationPay({
      grossMonthlySalary: 0,
      applyLoonheffingskorting: true,
    });

    const negative = calculateVacationPay({
      grossMonthlySalary: -1000,
      applyLoonheffingskorting: true,
    });

    expect(zero.valid).toBe(false);
    expect(zero.error).toBeTruthy();
    expect(negative.valid).toBe(false);
    expect(negative.error).toBeTruthy();
  });

  it("returns an invalid result for out-of-range percentage", () => {
    const tooHigh = calculateVacationPay({
      grossMonthlySalary: 3000,
      vacationPayPercentage: 101,
      applyLoonheffingskorting: true,
    });

    const negativePercentage = calculateVacationPay({
      grossMonthlySalary: 3000,
      vacationPayPercentage: -1,
      applyLoonheffingskorting: true,
    });

    expect(tooHigh.valid).toBe(false);
    expect(tooHigh.error).toBeTruthy();
    expect(negativePercentage.valid).toBe(false);
    expect(negativePercentage.error).toBeTruthy();
  });

  it("returns zero vacation pay for a 0% percentage", () => {
    const result = calculateVacationPay({
      grossMonthlySalary: 3000,
      vacationPayPercentage: 0,
      applyLoonheffingskorting: true,
    });

    expect(result.valid).toBe(true);
    expect(result.grossVacationPay).toBe(0);
    expect(result.netVacationPay).toBe(0);
    expect(result.estimatedTax).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });
});
