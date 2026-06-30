import { beforeEach, describe, expect, it } from "vitest";
import { clearRuleResolverCache, resolveRule } from "../../src/lib/rules/resolver";
import type { VatRateKnowledgeObject } from "../../src/lib/knowledge/types";

describe("resolveRule VAT lookup", () => {
  beforeEach(() => {
    clearRuleResolverCache();
  });

  it("returns the Dutch VAT Knowledge Object via the Rule Resolver", () => {
    const vat = resolveRule({
      type: "vat_rate",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
    });

    expect(vat).toBeDefined();
    expect(vat?.id).toBe("nl.vat.standard");
  });

  it("exposes the expected Dutch VAT rates", () => {
    const vat = resolveRule({
      type: "vat_rate",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
    }) as VatRateKnowledgeObject | undefined;

    expect(vat).toBeDefined();
    if (!vat) return;

    const standard = vat.data.rates.find((r) => r.category === "standard")?.value;
    const reduced = vat.data.rates.find((r) => r.category === "reduced")?.value;
    const zero = vat.data.rates.find((r) => r.category === "zero")?.value;

    expect(standard).toBe(21);
    expect(reduced).toBe(9);
    expect(zero).toBe(0);
    expect(vat.data.default_rate).toBe(21);
  });

  it("returns the Belgian VAT Knowledge Object via the Rule Resolver", () => {
    const vat = resolveRule({
      type: "vat_rate",
      country: "BE",
      locale: "nl-BE",
      year: 2026,
    }) as VatRateKnowledgeObject | undefined;

    expect(vat).toBeDefined();
    if (!vat) return;

    expect(vat.id).toBe("be.vat.standard");
    expect(vat.data.default_rate).toBe(21);

    const standard = vat.data.rates.find((r) => r.category === "standard")?.value;
    const reduced = vat.data.rates.find((r) => r.category === "reduced")?.value;
    const reducedLow = vat.data.rates.find((r) => r.category === "reduced_low")?.value;
    const zero = vat.data.rates.find((r) => r.category === "zero")?.value;

    expect(standard).toBe(21);
    expect(reduced).toBe(12);
    expect(reducedLow).toBe(6);
    expect(zero).toBe(0);
  });

  it("returns the French VAT Knowledge Object via the Rule Resolver", () => {
    const vat = resolveRule({
      type: "vat_rate",
      country: "FR",
      locale: "fr-FR",
      year: 2026,
    }) as VatRateKnowledgeObject | undefined;

    expect(vat).toBeDefined();
    if (!vat) return;

    expect(vat.id).toBe("fr.vat.standard");
    expect(vat.data.default_rate).toBe(20);

    const standard = vat.data.rates.find((r) => r.category === "standard")?.value;
    const reduced = vat.data.rates.find((r) => r.category === "reduced")?.value;
    const reducedLow = vat.data.rates.find((r) => r.category === "reduced_low")?.value;
    const superReduced = vat.data.rates.find((r) => r.category === "super_reduced")?.value;

    expect(standard).toBe(20);
    expect(reduced).toBe(10);
    expect(reducedLow).toBe(5.5);
    expect(superReduced).toBe(2.1);
  });

  it("returns the German VAT Knowledge Object via the Rule Resolver", () => {
    const vat = resolveRule({
      type: "vat_rate",
      country: "DE",
      locale: "de-DE",
      year: 2026,
    }) as VatRateKnowledgeObject | undefined;

    expect(vat).toBeDefined();
    if (!vat) return;

    expect(vat.id).toBe("de.vat.standard");
    expect(vat.data.default_rate).toBe(19);

    const standard = vat.data.rates.find((r) => r.category === "standard")?.value;
    const reduced = vat.data.rates.find((r) => r.category === "reduced")?.value;

    expect(standard).toBe(19);
    expect(reduced).toBe(7);
  });

  it("returns the Spanish VAT Knowledge Object via the Rule Resolver", () => {
    const vat = resolveRule({
      type: "vat_rate",
      country: "ES",
      locale: "es-ES",
      year: 2026,
    }) as VatRateKnowledgeObject | undefined;

    expect(vat).toBeDefined();
    if (!vat) return;

    expect(vat.id).toBe("es.vat.standard");
    expect(vat.data.default_rate).toBe(21);

    const standard = vat.data.rates.find((r) => r.category === "standard")?.value;
    const reduced = vat.data.rates.find((r) => r.category === "reduced")?.value;
    const reducedLow = vat.data.rates.find((r) => r.category === "reduced_low")?.value;

    expect(standard).toBe(21);
    expect(reduced).toBe(10);
    expect(reducedLow).toBe(4);
  });

  it("returns undefined for an unsupported country", () => {
    const vat = resolveRule({
      type: "vat_rate",
      country: "PT",
      locale: "pt-PT",
      year: 2026,
    });

    expect(vat).toBeUndefined();
  });
});
