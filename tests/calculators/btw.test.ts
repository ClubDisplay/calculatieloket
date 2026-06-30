import { describe, expect, it } from "vitest";
import {
  calculateBtwFromExclusive,
  calculateBtwFromInclusive,
  isValidBtwRate,
} from "../../src/lib/calculators/btw";
import { resolveRule } from "../../src/lib/rules/resolver";
import type { VatRateData } from "../../src/lib/knowledge/types";

describe("BTW engine", () => {
  it("accepts the supported Dutch VAT rates", () => {
    expect(isValidBtwRate(21)).toBe(true);
    expect(isValidBtwRate(9)).toBe(true);
    expect(isValidBtwRate(0)).toBe(true);
  });

  it("rejects unsupported rates", () => {
    expect(isValidBtwRate(25)).toBe(false);
  });

  it("calculates 21% from exclusive", () => {
    const result = calculateBtwFromExclusive(100, 21);
    expect(result.valid).toBe(true);
    expect(result.amountIncl).toBe(121);
    expect(result.btwAmount).toBe(21);
  });

  it("calculates 21% from inclusive", () => {
    const result = calculateBtwFromInclusive(121, 21);
    expect(result.valid).toBe(true);
    expect(result.amountExcl).toBe(100);
    expect(result.btwAmount).toBe(21);
  });

  it("calculates 9% from exclusive", () => {
    const result = calculateBtwFromExclusive(100, 9);
    expect(result.valid).toBe(true);
    expect(result.amountIncl).toBe(109);
    expect(result.btwAmount).toBe(9);
  });

  it("calculates 9% from inclusive", () => {
    const result = calculateBtwFromInclusive(109, 9);
    expect(result.valid).toBe(true);
    expect(result.amountExcl).toBeCloseTo(100, 2);
    expect(result.btwAmount).toBeCloseTo(9, 2);
  });

  it("calculates 0% from exclusive", () => {
    const result = calculateBtwFromExclusive(100, 0);
    expect(result.valid).toBe(true);
    expect(result.amountIncl).toBe(100);
    expect(result.btwAmount).toBe(0);
  });

  it("uses the same VAT rates as the Rule Resolver", () => {
    const vat = resolveRule({
      type: "vat_rate",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
    });

    expect(vat).toBeDefined();

    const data = vat?.data as VatRateData | undefined;
    const standard = data?.rates.find((r) => r.category === "standard")?.value;
    const reduced = data?.rates.find((r) => r.category === "reduced")?.value;
    const zero = data?.rates.find((r) => r.category === "zero")?.value;

    expect(isValidBtwRate(standard ?? -1)).toBe(true);
    expect(isValidBtwRate(reduced ?? -1)).toBe(true);
    expect(isValidBtwRate(zero ?? -1)).toBe(true);
  });
});
