import { describe, expect, it } from "vitest";
import {
  getKnowledgeObject,
  getKnowledgeObjectsByType,
  knowledgeObjects,
} from "../../src/lib/knowledge/objects";

describe("Knowledge registry", () => {
  it("contains at least 17 knowledge objects", () => {
    expect(knowledgeObjects.length).toBeGreaterThanOrEqual(17);
  });

  it("has unique ids across all objects", () => {
    const ids = knowledgeObjects.map((obj) => obj.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("finds the Dutch VAT object by id", () => {
    const vat = getKnowledgeObject("nl.vat.standard");
    expect(vat).toBeDefined();
    expect(vat?.type).toBe("vat_rate");
  });

  it("returns vat_rate objects by type", () => {
    const vatObjects = getKnowledgeObjectsByType("vat_rate");
    expect(vatObjects.length).toBeGreaterThanOrEqual(1);
    expect(vatObjects.some((obj) => obj.id === "nl.vat.standard")).toBe(true);
  });

  it("finds the Belgian VAT object by id", () => {
    const vat = getKnowledgeObject("be.vat.standard");
    expect(vat).toBeDefined();
    expect(vat?.type).toBe("vat_rate");
    expect(vat?.country).toBe("BE");
  });

  it("includes both NL and BE VAT objects in vat_rate results", () => {
    const vatObjects = getKnowledgeObjectsByType("vat_rate");
    expect(vatObjects.some((obj) => obj.id === "nl.vat.standard")).toBe(true);
    expect(vatObjects.some((obj) => obj.id === "be.vat.standard")).toBe(true);
  });

  it("finds the French VAT object by id", () => {
    const vat = getKnowledgeObject("fr.vat.standard");
    expect(vat).toBeDefined();
    expect(vat?.type).toBe("vat_rate");
    expect(vat?.country).toBe("FR");
  });

  it("includes NL, BE and FR VAT objects in vat_rate results", () => {
    const vatObjects = getKnowledgeObjectsByType("vat_rate");
    expect(vatObjects.some((obj) => obj.id === "nl.vat.standard")).toBe(true);
    expect(vatObjects.some((obj) => obj.id === "be.vat.standard")).toBe(true);
    expect(vatObjects.some((obj) => obj.id === "fr.vat.standard")).toBe(true);
  });

  it("finds the German VAT object by id", () => {
    const vat = getKnowledgeObject("de.vat.standard");
    expect(vat).toBeDefined();
    expect(vat?.type).toBe("vat_rate");
    expect(vat?.country).toBe("DE");
  });

  it("finds the Spanish VAT object by id", () => {
    const vat = getKnowledgeObject("es.vat.standard");
    expect(vat).toBeDefined();
    expect(vat?.type).toBe("vat_rate");
    expect(vat?.country).toBe("ES");
  });

  it("includes NL, BE, FR, DE and ES VAT objects in vat_rate results", () => {
    const vatObjects = getKnowledgeObjectsByType("vat_rate");
    expect(vatObjects.some((obj) => obj.id === "nl.vat.standard")).toBe(true);
    expect(vatObjects.some((obj) => obj.id === "be.vat.standard")).toBe(true);
    expect(vatObjects.some((obj) => obj.id === "fr.vat.standard")).toBe(true);
    expect(vatObjects.some((obj) => obj.id === "de.vat.standard")).toBe(true);
    expect(vatObjects.some((obj) => obj.id === "es.vat.standard")).toBe(true);
  });

  it("finds the Belgian country fallback VAT object by id", () => {
    const vat = getKnowledgeObject("be.vat.country_fallback");
    expect(vat).toBeDefined();
    expect(vat?.type).toBe("vat_rate");
    expect(vat?.country).toBe("BE");
    expect(vat?.locale).toBe("BE");
  });

  it("Belgian country fallback VAT has the same rates as the standard Belgian VAT object", () => {
    const standard = getKnowledgeObject("be.vat.standard");
    const fallback = getKnowledgeObject("be.vat.country_fallback");
    expect(fallback).toBeDefined();
    expect(fallback?.data.default_rate).toBe(standard?.data.default_rate);
    expect(fallback?.data.rates).toEqual(standard?.data.rates);
  });

  it("includes the Belgian country fallback VAT object in vat_rate results", () => {
    const vatObjects = getKnowledgeObjectsByType("vat_rate");
    expect(vatObjects.some((obj) => obj.id === "be.vat.country_fallback")).toBe(true);
  });

  it("finds the German income tax object by id", () => {
    const tax = getKnowledgeObject("de.tax.income.2026");
    expect(tax).toBeDefined();
    expect(tax?.type).toBe("tax_bracket");
    expect(tax?.country).toBe("DE");
    expect(tax?.status).toBe("active");
  });

  it("includes both NL and DE tax_bracket objects", () => {
    const taxObjects = getKnowledgeObjectsByType("tax_bracket");
    expect(taxObjects.some((obj) => obj.id === "nl.tax.box1.2026")).toBe(true);
    expect(taxObjects.some((obj) => obj.id === "de.tax.income.2026")).toBe(true);
  });
});
