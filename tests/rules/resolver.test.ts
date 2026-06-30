import { beforeEach, describe, expect, it } from "vitest";
import {
  clearRuleResolverCache,
  clearRuleResolverDiagnostics,
  getRuleResolverDiagnostics,
  resolveRule,
  resolveRuleFromRegistry,
} from "../../src/lib/rules/resolver";
import { knowledgeObjects } from "../../src/lib/knowledge/objects";
import type { KnowledgeObject } from "../../src/lib/knowledge/types";
import type { RuleResolverFallbackInfo } from "../../src/lib/rules/types";

describe("Rule Resolver v1", () => {
  beforeEach(() => {
    clearRuleResolverCache();
    clearRuleResolverDiagnostics();
  });
  it("resolves a vat_rate rule for NL", () => {
    const result = resolveRule({
      type: "vat_rate",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
    });
    expect(result).toBeDefined();
    expect(result?.id).toBe("nl.vat.standard");
  });

  it("resolves a vat_rate rule for BE", () => {
    const result = resolveRule({
      type: "vat_rate",
      country: "BE",
      locale: "nl-BE",
      year: 2026,
    });
    expect(result).toBeDefined();
    expect(result?.id).toBe("be.vat.standard");
    expect(result?.data.default_rate).toBe(21);
    const categories = result?.data.rates.map((r: { category: string }) => r.category);
    expect(categories).toContain("standard");
    expect(categories).toContain("reduced");
    expect(categories).toContain("reduced_low");
    expect(categories).toContain("zero");
  });

  it("resolves a vat_rate rule for FR", () => {
    const result = resolveRule({
      type: "vat_rate",
      country: "FR",
      locale: "fr-FR",
      year: 2026,
    });
    expect(result).toBeDefined();
    expect(result?.id).toBe("fr.vat.standard");
    expect(result?.data.default_rate).toBe(20);
    const categories = result?.data.rates.map((r: { category: string }) => r.category);
    expect(categories).toContain("standard");
    expect(categories).toContain("reduced");
    expect(categories).toContain("reduced_low");
    expect(categories).toContain("super_reduced");
  });

  it("resolves a vat_rate rule for DE", () => {
    const result = resolveRule({
      type: "vat_rate",
      country: "DE",
      locale: "de-DE",
      year: 2026,
    });
    expect(result).toBeDefined();
    expect(result?.id).toBe("de.vat.standard");
    expect(result?.data.default_rate).toBe(19);
    const categories = result?.data.rates.map((r: { category: string }) => r.category);
    expect(categories).toContain("standard");
    expect(categories).toContain("reduced");
  });

  it("resolves a vat_rate rule for ES", () => {
    const result = resolveRule({
      type: "vat_rate",
      country: "ES",
      locale: "es-ES",
      year: 2026,
    });
    expect(result).toBeDefined();
    expect(result?.id).toBe("es.vat.standard");
    expect(result?.data.default_rate).toBe(21);
    const categories = result?.data.rates.map((r: { category: string }) => r.category);
    expect(categories).toContain("standard");
    expect(categories).toContain("reduced");
    expect(categories).toContain("reduced_low");
  });

  it("returns undefined for an unknown country", () => {
    const result = resolveRule({
      type: "vat_rate",
      country: "PT",
      locale: "pt-PT",
      year: 2026,
    });
    expect(result).toBeUndefined();
  });

  it("resolves fr-BE via the BE country fallback VAT object, not via nl-BE", () => {
    const result = resolveRule({
      type: "vat_rate",
      country: "BE",
      locale: "fr-BE",
      year: 2026,
    });
    expect(result).toBeDefined();
    expect(result?.id).toBe("be.vat.country_fallback");
    expect(result?.locale).toBe("BE");
    expect(result?.id).not.toBe("be.vat.standard");
  });

  it("returns undefined for an unknown type", () => {
    const result = resolveRule({
      type: "manual_input",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
    });
    expect(result).toBeUndefined();
  });

  it("ignores inactive objects", () => {
    const mockObjects = [
      {
        id: "nl.vat.inactive",
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        status: "draft",
        effective_from: "2026-01-01",
        effective_until: null,
      },
      {
        id: "nl.vat.active",
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        status: "active",
        effective_from: "2026-01-01",
        effective_until: null,
      },
    ] as unknown as KnowledgeObject[];

    const result = resolveRuleFromRegistry(
      { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
      mockObjects,
    );
    expect(result).toBeDefined();
    expect(result?.id).toBe("nl.vat.active");
  });

  it("ignores expired objects", () => {
    const mockObjects = [
      {
        id: "nl.vat.expired",
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        status: "active",
        effective_from: "2025-01-01",
        effective_until: "2025-12-31",
      },
      {
        id: "nl.vat.current",
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        status: "active",
        effective_from: "2026-01-01",
        effective_until: null,
      },
    ] as unknown as KnowledgeObject[];

    const result = resolveRuleFromRegistry(
      { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
      mockObjects,
    );
    expect(result).toBeDefined();
    expect(result?.id).toBe("nl.vat.current");
  });

  it("returns the correct object id when id is provided", () => {
    const result = resolveRule({
      type: "tax_bracket",
      country: "NL",
      locale: "nl-NL",
      year: 2026,
      id: "nl.tax.box1.2026",
    });
    expect(result).toBeDefined();
    expect(result?.id).toBe("nl.tax.box1.2026");
  });

  describe("caching", () => {
    it("returns the same object reference on repeated identical lookups", () => {
      const input = {
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
      } as const;

      const first = resolveRule(input);
      const second = resolveRule(input);

      expect(first).toBeDefined();
      expect(second).toBe(first);
    });

    it("caches undefined results for unknown lookups", () => {
      const input = {
        type: "vat_rate",
        country: "PT",
        locale: "pt-PT",
        year: 2026,
      } as const;

      expect(resolveRule(input)).toBeUndefined();
      expect(resolveRule(input)).toBeUndefined();
    });

    it("caches the BE VAT lookup", () => {
      const input = {
        type: "vat_rate",
        country: "BE",
        locale: "nl-BE",
        year: 2026,
      } as const;

      const first = resolveRule(input);
      const second = resolveRule(input);
      expect(first).toBeDefined();
      expect(second).toBe(first);
    });

    it("clears the cache via clearRuleResolverCache", () => {
      const input = {
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
      } as const;

      const first = resolveRule(input);
      clearRuleResolverCache();
      const second = resolveRule(input);

      expect(second).toBeDefined();
      expect(second?.id).toBe("nl.vat.standard");
    });
  });

  describe("locale fallback", () => {
    it("prefers exact locale over fallback", () => {
      const mockObjects = [
        {
          id: "vat.nl",
          type: "vat_rate",
          country: "NL",
          locale: "nl",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
        {
          id: "vat.nl-NL",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("vat.nl-NL");
    });

    it("falls back to language-only locale", () => {
      const mockObjects = [
        {
          id: "vat.nl",
          type: "vat_rate",
          country: "NL",
          locale: "nl",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("vat.nl");
    });

    it("falls back to country locale", () => {
      const mockObjects = [
        {
          id: "vat.NL",
          type: "vat_rate",
          country: "NL",
          locale: "NL",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("vat.NL");
    });

    it("falls back to default locale", () => {
      const mockObjects = [
        {
          id: "vat.default",
          type: "vat_rate",
          country: "NL",
          locale: "default",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("vat.default");
    });

    it("falls back to BE country locale for fr-BE in Belgium", () => {
      const result = resolveRule({
        type: "vat_rate",
        country: "BE",
        locale: "fr-BE",
        year: 2026,
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe("be.vat.country_fallback");
      expect(result?.locale).toBe("BE");
    });

    it("returns undefined when no fallback matches", () => {
      const mockObjects = [
        {
          id: "vat.de",
          type: "vat_rate",
          country: "NL",
          locale: "de",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeUndefined();
    });
  });

  describe("version selection", () => {
    it("picks the most recent effective_from when multiple versions overlap", () => {
      const mockObjects = [
        {
          id: "nl.vat.2025",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2025-01-01",
          effective_until: null,
        },
        {
          id: "nl.vat.2026",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.2026");
    });

    it("picks the version active for the requested year", () => {
      const mockObjects = [
        {
          id: "nl.vat.2025",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2025-01-01",
          effective_until: "2025-12-31",
        },
        {
          id: "nl.vat.2026",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result2025 = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2025 },
        mockObjects,
      );
      expect(result2025).toBeDefined();
      expect(result2025?.id).toBe("nl.vat.2025");

      const result2026 = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result2026).toBeDefined();
      expect(result2026?.id).toBe("nl.vat.2026");
    });

    it("ignores expired objects for the requested year", () => {
      const mockObjects = [
        {
          id: "nl.vat.2025",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2025-01-01",
          effective_until: "2025-12-31",
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeUndefined();
    });

    it("ignores future objects for an earlier requested year", () => {
      const mockObjects = [
        {
          id: "nl.vat.2027",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2027-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeUndefined();
    });

    it("matches id exactly when multiple versions exist", () => {
      const mockObjects = [
        {
          id: "nl.vat.2025",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2025-01-01",
          effective_until: null,
        },
        {
          id: "nl.vat.2026",
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026, id: "nl.vat.2025" },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.2025");
    });

    it("applies locale fallback when the exact-locale version is missing", () => {
      const mockObjects = [
        {
          id: "vat.nl",
          type: "vat_rate",
          country: "NL",
          locale: "nl",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("vat.nl");
    });
  });

  describe("version parameter", () => {
    it("keeps existing NL VAT lookup working without version", () => {
      const result = resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 });
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.standard");
    });

    it("finds the NL VAT object with the correct version", () => {
      const result = resolveRule({
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        version: "2026-01-01",
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.standard");
      expect(result?.version).toBe("2026-01-01");
    });

    it("returns undefined for an unknown version", () => {
      const result = resolveRule({
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        version: "2025-01-01",
      });
      expect(result).toBeUndefined();
    });

    it("caches lookups with different versions separately", () => {
      clearRuleResolverCache();
      clearRuleResolverDiagnostics();

      resolveRule({
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        version: "2026-01-01",
      });
      resolveRule({
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        version: "2025-01-01",
      });
      resolveRule({
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        version: "2026-01-01",
      });

      const d = getRuleResolverDiagnostics();
      expect(d.totalLookups).toBe(3);
      expect(d.cacheMisses).toBe(2);
      expect(d.cacheHits).toBe(1);
    });

    it("applies locale fallback with version", () => {
      const result = resolveRule({
        type: "vat_rate",
        country: "BE",
        locale: "fr-BE",
        year: 2026,
        version: "2026-01-01",
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe("be.vat.country_fallback");
      expect(result?.version).toBe("2026-01-01");
    });

    it("matches id and version together", () => {
      const result = resolveRule({
        type: "tax_credit",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        id: "nl.tax.ahk.2026",
        version: "2026-01-01",
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.tax.ahk.2026");
      expect(result?.version).toBe("2026-01-01");
    });

    it("returns undefined when id exists but version does not", () => {
      const result = resolveRule({
        type: "tax_credit",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        id: "nl.tax.ahk.2026",
        version: "2025-01-01",
      });
      expect(result).toBeUndefined();
    });
  });

  describe("multi-version selection with test-only registry", () => {
    const mockObjects = [
      {
        id: "nl.vat.standard.2025",
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        status: "active",
        effective_from: "2025-01-01",
        effective_until: null,
        version: "2025-01-01",
        data: { standard: 21 },
      },
      {
        id: "nl.vat.standard.2026",
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        status: "active",
        effective_from: "2026-01-01",
        effective_until: null,
        version: "2026-01-01",
        data: { standard: 22 },
      },
    ] as unknown as KnowledgeObject[];

    it("selects the most recent active version when no version is provided for year 2026", () => {
      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.standard.2026");
      expect(result?.data.standard).toBe(22);
    });

    it("selects the 2025 version when version is specified", () => {
      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026, version: "2025-01-01" },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.standard.2025");
      expect(result?.data.standard).toBe(21);
    });

    it("selects the 2026 version when version is specified", () => {
      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026, version: "2026-01-01" },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.standard.2026");
      expect(result?.data.standard).toBe(22);
    });

    it("returns undefined for an unknown version", () => {
      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026, version: "2024-01-01" },
        mockObjects,
      );
      expect(result).toBeUndefined();
    });

    it("selects the 2025 version for year 2025 without version", () => {
      const result = resolveRuleFromRegistry(
        { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2025 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.standard.2025");
      expect(result?.data.standard).toBe(21);
    });

    it("matches id and version together", () => {
      const result = resolveRuleFromRegistry(
        {
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          year: 2026,
          id: "nl.vat.standard.2025",
          version: "2025-01-01",
        },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("nl.vat.standard.2025");
    });

    it("returns undefined when id exists but version does not", () => {
      const result = resolveRuleFromRegistry(
        {
          type: "vat_rate",
          country: "NL",
          locale: "nl-NL",
          year: 2026,
          id: "nl.vat.standard.2025",
          version: "2026-01-01",
        },
        mockObjects,
      );
      expect(result).toBeUndefined();
    });
  });

  describe("draft and active object handling", () => {
    it("returns undefined for a draft tax_bracket object via resolveRuleFromRegistry", () => {
      const mockObjects = [
        {
          id: "draft.tax.object",
          type: "tax_bracket",
          country: "DE",
          locale: "de-DE",
          status: "draft",
          effective_from: "2026-01-01",
          effective_until: null,
          data: {
            year: 2026,
            brackets: [],
          },
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "tax_bracket", country: "DE", locale: "de-DE", year: 2026 },
        mockObjects,
      );
      expect(result).toBeUndefined();
    });

    it("returns a draft object when status is changed to active in a custom registry", () => {
      const mockObjects = [
        {
          id: "de.tax.income.2026",
          type: "tax_bracket",
          country: "DE",
          locale: "de-DE",
          status: "active",
          effective_from: "2026-01-01",
          effective_until: null,
          data: {
            year: 2026,
            brackets: [],
          },
        },
      ] as unknown as KnowledgeObject[];

      const result = resolveRuleFromRegistry(
        { type: "tax_bracket", country: "DE", locale: "de-DE", year: 2026 },
        mockObjects,
      );
      expect(result).toBeDefined();
      expect(result?.id).toBe("de.tax.income.2026");
    });

    it("returns the active German income tax object from the generated registry", () => {
      const result = resolveRule({
        type: "tax_bracket",
        country: "DE",
        locale: "de-DE",
        year: 2026,
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe("de.tax.income.2026");
    });
  });

  describe("diagnostics", () => {
    it("increments totalLookups on each resolveRule call", () => {
      resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 });
      expect(getRuleResolverDiagnostics().totalLookups).toBe(1);
    });

    it("increments cacheHits on repeated lookup", () => {
      const input = { type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 } as const;
      resolveRule(input);
      resolveRule(input);

      const d = getRuleResolverDiagnostics();
      expect(d.totalLookups).toBe(2);
      expect(d.cacheMisses).toBe(1);
      expect(d.cacheHits).toBe(1);
    });

    it("increments notFoundLookups for unknown lookups", () => {
      resolveRule({ type: "vat_rate", country: "PT", locale: "pt-PT", year: 2026 });
      expect(getRuleResolverDiagnostics().notFoundLookups).toBe(1);
    });

    it("resets counters via clearRuleResolverDiagnostics", () => {
      resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 });
      clearRuleResolverDiagnostics();
      expect(getRuleResolverDiagnostics().totalLookups).toBe(0);
      expect(getRuleResolverDiagnostics().cacheHits).toBe(0);
      expect(getRuleResolverDiagnostics().notFoundLookups).toBe(0);
    });

    it("increments fallbackLocaleHits when a fallback locale is used", () => {
      const fallbackObject = {
        id: "nl.vat.default",
        type: "vat_rate",
        country: "NL",
        locale: "default",
        status: "active",
        effective_from: "2026-01-01",
        effective_until: null,
      } as unknown as KnowledgeObject;

      knowledgeObjects.push(fallbackObject);
      clearRuleResolverCache();
      clearRuleResolverDiagnostics();

      try {
        const result = resolveRule({ type: "vat_rate", country: "NL", locale: "nl", year: 2026 });
        expect(result).toBeDefined();
        expect(result?.id).toBe("nl.vat.default");
        expect(getRuleResolverDiagnostics().fallbackLocaleHits).toBe(1);
      } finally {
        knowledgeObjects.pop();
      }
    });
  });

  describe("fallback warnings", () => {
    it("calls onFallback when a fallback locale is used", () => {
      const fallbackObject = {
        id: "zz.test.fallback",
        type: "informational",
        country: "ZZ",
        locale: "default",
        status: "active",
        effective_from: "2026-01-01",
        effective_until: null,
      } as unknown as KnowledgeObject;

      knowledgeObjects.push(fallbackObject);
      clearRuleResolverCache();
      clearRuleResolverDiagnostics();
      const calls: RuleResolverFallbackInfo[] = [];

      try {
        const result = resolveRule({
          type: "informational",
          country: "ZZ",
          locale: "zz-ZZ",
          year: 2026,
          warnOnFallback: true,
          onFallback: (info) => calls.push(info),
        });

        expect(result).toBeDefined();
        expect(result?.id).toBe("zz.test.fallback");
        expect(calls).toHaveLength(1);
      } finally {
        knowledgeObjects.pop();
      }
    });

    it("does not call onFallback on exact locale match", () => {
      const calls: RuleResolverFallbackInfo[] = [];
      const result = resolveRule({
        type: "vat_rate",
        country: "NL",
        locale: "nl-NL",
        year: 2026,
        warnOnFallback: true,
        onFallback: (info) => calls.push(info),
      });

      expect(result).toBeDefined();
      expect(calls).toHaveLength(0);
    });

    it("passes correct info to the onFallback callback", () => {
      const fallbackObject = {
        id: "zz.test.fallback.info",
        type: "informational",
        country: "ZZ",
        locale: "zz",
        status: "active",
        effective_from: "2026-01-01",
        effective_until: null,
      } as unknown as KnowledgeObject;

      knowledgeObjects.push(fallbackObject);
      clearRuleResolverCache();
      clearRuleResolverDiagnostics();
      const calls: RuleResolverFallbackInfo[] = [];

      try {
        resolveRule({
          type: "informational",
          country: "ZZ",
          locale: "zz-ZZ",
          year: 2026,
          warnOnFallback: true,
          onFallback: (info) => calls.push(info),
        });

        expect(calls).toHaveLength(1);
        expect(calls[0].requestedCountry).toBe("ZZ");
        expect(calls[0].requestedLocale).toBe("zz-ZZ");
        expect(calls[0].resolvedCountry).toBe("ZZ");
        expect(calls[0].resolvedLocale).toBe("zz");
        expect(calls[0].requestedType).toBe("informational");
        expect(calls[0].resolvedId).toBe("zz.test.fallback.info");
      } finally {
        knowledgeObjects.pop();
      }
    });

    it("calls onFallback again on cached fallback results", () => {
      const fallbackObject = {
        id: "zz.test.fallback.cache",
        type: "informational",
        country: "ZZ",
        locale: "default",
        status: "active",
        effective_from: "2026-01-01",
        effective_until: null,
      } as unknown as KnowledgeObject;

      knowledgeObjects.push(fallbackObject);
      clearRuleResolverCache();
      clearRuleResolverDiagnostics();
      const calls: RuleResolverFallbackInfo[] = [];

      try {
        const input = {
          type: "informational" as const,
          country: "ZZ",
          locale: "zz-ZZ",
          year: 2026,
          warnOnFallback: true,
          onFallback: (info: RuleResolverFallbackInfo) => calls.push(info),
        };

        const first = resolveRule(input);
        const second = resolveRule(input);

        expect(first).toBeDefined();
        expect(second).toBe(first);
        expect(calls).toHaveLength(2);

        const d = getRuleResolverDiagnostics();
        expect(d.totalLookups).toBe(2);
        expect(d.cacheMisses).toBe(1);
        expect(d.cacheHits).toBe(1);
        expect(d.fallbackLocaleHits).toBe(2);
      } finally {
        knowledgeObjects.pop();
      }
    });

    it("does not call onFallback when warnOnFallback is false", () => {
      const fallbackObject = {
        id: "zz.test.fallback.off",
        type: "informational",
        country: "ZZ",
        locale: "default",
        status: "active",
        effective_from: "2026-01-01",
        effective_until: null,
      } as unknown as KnowledgeObject;

      knowledgeObjects.push(fallbackObject);
      clearRuleResolverCache();
      clearRuleResolverDiagnostics();
      const calls: RuleResolverFallbackInfo[] = [];

      try {
        resolveRule({
          type: "informational",
          country: "ZZ",
          locale: "zz-ZZ",
          year: 2026,
          warnOnFallback: false,
          onFallback: (info) => calls.push(info),
        });

        expect(calls).toHaveLength(0);
      } finally {
        knowledgeObjects.pop();
      }
    });

    it("calls onFallback with correct fr-BE -> BE fallback info", () => {
      const calls: RuleResolverFallbackInfo[] = [];
      const result = resolveRule({
        type: "vat_rate",
        country: "BE",
        locale: "fr-BE",
        year: 2026,
        warnOnFallback: true,
        onFallback: (info) => calls.push(info),
      });

      expect(result).toBeDefined();
      expect(result?.id).toBe("be.vat.country_fallback");
      expect(calls).toHaveLength(1);
      expect(calls[0].requestedCountry).toBe("BE");
      expect(calls[0].requestedLocale).toBe("fr-BE");
      expect(calls[0].resolvedCountry).toBe("BE");
      expect(calls[0].resolvedLocale).toBe("BE");
      expect(calls[0].requestedType).toBe("vat_rate");
      expect(calls[0].resolvedId).toBe("be.vat.country_fallback");
    });

    it("increments fallbackLocaleHits for fr-BE -> BE fallback", () => {
      clearRuleResolverCache();
      clearRuleResolverDiagnostics();

      const result = resolveRule({
        type: "vat_rate",
        country: "BE",
        locale: "fr-BE",
        year: 2026,
      });

      expect(result).toBeDefined();
      expect(result?.id).toBe("be.vat.country_fallback");
      expect(getRuleResolverDiagnostics().fallbackLocaleHits).toBe(1);
    });

    it("does not call onFallback on exact nl-BE locale match", () => {
      const calls: RuleResolverFallbackInfo[] = [];
      const result = resolveRule({
        type: "vat_rate",
        country: "BE",
        locale: "nl-BE",
        year: 2026,
        warnOnFallback: true,
        onFallback: (info) => calls.push(info),
      });

      expect(result).toBeDefined();
      expect(result?.id).toBe("be.vat.standard");
      expect(calls).toHaveLength(0);
    });
  });

  describe("Belgian income tax locale fallback", () => {
    beforeEach(() => {
      clearRuleResolverCache();
      clearRuleResolverDiagnostics();
    });

    it("resolves fr-BE income tax via the BE country fallback object", () => {
      const result = resolveRule({
        type: "tax_bracket",
        country: "BE",
        locale: "fr-BE",
        year: 2026,
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe("be.tax.income.country_fallback.2026");
      expect(result?.locale).toBe("BE");
    });

    it("keeps exact nl-BE income tax lookup on the language-specific object", () => {
      const result = resolveRule({
        type: "tax_bracket",
        country: "BE",
        locale: "nl-BE",
        year: 2026,
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe("be.tax.income.2026");
      expect(result?.locale).toBe("nl-BE");
    });

    it("calls onFallback with correct fr-BE -> BE fallback info for income tax", () => {
      const calls: RuleResolverFallbackInfo[] = [];
      const result = resolveRule({
        type: "tax_bracket",
        country: "BE",
        locale: "fr-BE",
        year: 2026,
        warnOnFallback: true,
        onFallback: (info) => calls.push(info),
      });

      expect(result).toBeDefined();
      expect(result?.id).toBe("be.tax.income.country_fallback.2026");
      expect(calls).toHaveLength(1);
      expect(calls[0].requestedCountry).toBe("BE");
      expect(calls[0].requestedLocale).toBe("fr-BE");
      expect(calls[0].resolvedCountry).toBe("BE");
      expect(calls[0].resolvedLocale).toBe("BE");
      expect(calls[0].requestedType).toBe("tax_bracket");
      expect(calls[0].resolvedId).toBe("be.tax.income.country_fallback.2026");
    });

    it("increments fallbackLocaleHits for fr-BE -> BE income tax fallback", () => {
      const result = resolveRule({
        type: "tax_bracket",
        country: "BE",
        locale: "fr-BE",
        year: 2026,
      });

      expect(result).toBeDefined();
      expect(result?.id).toBe("be.tax.income.country_fallback.2026");
      expect(getRuleResolverDiagnostics().fallbackLocaleHits).toBe(1);
    });

    it("does not call onFallback on exact nl-BE income tax locale match", () => {
      const calls: RuleResolverFallbackInfo[] = [];
      const result = resolveRule({
        type: "tax_bracket",
        country: "BE",
        locale: "nl-BE",
        year: 2026,
        warnOnFallback: true,
        onFallback: (info) => calls.push(info),
      });

      expect(result).toBeDefined();
      expect(result?.id).toBe("be.tax.income.2026");
      expect(calls).toHaveLength(0);
    });
  });
});
