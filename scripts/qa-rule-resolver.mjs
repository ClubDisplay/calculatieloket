#!/usr/bin/env node
// scripts/qa-rule-resolver.mjs
// Atlas v2 — Rule Resolver QA Script v0.2
// Voert een vaste set veilige lookups uit tegen de YAML Knowledge Layer-bronnen
// en rapporteert resultaten + diagnostics. Bevat geen PII.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OBJECTS_DIR = path.resolve(__dirname, "../docs/v2/knowledge/objects");

const lookups = [
  { label: "NL VAT", type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026, expected: "nl.vat.standard" },
  { label: "BE VAT", type: "vat_rate", country: "BE", locale: "nl-BE", year: 2026, expected: "be.vat.standard" },
  { label: "BE VAT fr-BE fallback", type: "vat_rate", country: "BE", locale: "fr-BE", year: 2026, expected: "be.vat.country_fallback" },
  { label: "FR VAT", type: "vat_rate", country: "FR", locale: "fr-FR", year: 2026, expected: "fr.vat.standard" },
  { label: "DE VAT", type: "vat_rate", country: "DE", locale: "de-DE", year: 2026, expected: "de.vat.standard" },
  { label: "ES VAT", type: "vat_rate", country: "ES", locale: "es-ES", year: 2026, expected: "es.vat.standard" },
  { label: "NL Box 1", type: "tax_bracket", country: "NL", locale: "nl-NL", year: 2026, expected: "nl.tax.box1.2026" },
  { label: "NL AHK", type: "tax_credit", country: "NL", locale: "nl-NL", year: 2026, id: "nl.tax.ahk.2026", expected: "nl.tax.ahk.2026" },
  { label: "NL AK", type: "tax_credit", country: "NL", locale: "nl-NL", year: 2026, id: "nl.tax.ak.2026", expected: "nl.tax.ak.2026" },
  { label: "DE Income Tax", type: "tax_bracket", country: "DE", locale: "de-DE", year: 2026, expected: "de.tax.income.2026" },
  { label: "BE Income Tax", type: "tax_bracket", country: "BE", locale: "nl-BE", year: 2026, expected: "be.tax.income.2026" },
  { label: "BE Income Tax fr-BE fallback", type: "tax_bracket", country: "BE", locale: "fr-BE", year: 2026, expected: "be.tax.income.country_fallback.2026" },
  { label: "NL VAT (version)", type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026, version: "2026-01-01", expected: "nl.vat.standard" },
  { label: "NL VAT (bad version)", type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026, version: "2025-01-01", expected: null },
  { label: "BE fr-BE (version)", type: "vat_rate", country: "BE", locale: "fr-BE", year: 2026, version: "2026-01-01", expected: "be.vat.country_fallback" },
];

const diagnostics = {
  totalLookups: 0,
  cacheHits: 0,
  cacheMisses: 0,
  notFoundLookups: 0,
  fallbackLocaleHits: 0,
};

function loadRegistry() {
  const files = fs
    .readdirSync(OBJECTS_DIR)
    .filter((name) => name.endsWith(".yml"))
    .map((name) => path.join(OBJECTS_DIR, name))
    .sort();

  return files.map((filePath) => load(fs.readFileSync(filePath, "utf8")));
}

function buildLocaleFallbacks(locale, country) {
  const fallbacks = [locale];
  const language = locale.split("-")[0];
  if (language && language !== locale) {
    fallbacks.push(language);
  }
  if (country) {
    fallbacks.push(country);
    const lower = country.toLowerCase();
    if (lower !== country) {
      fallbacks.push(lower);
    }
  }
  fallbacks.push("default");
  return [...new Set(fallbacks)];
}

function findRule(input, locale, registry) {
  const { type, country, year, id, version } = input;
  const yearStart = `${year}-01-01`;
  const yearEnd = `${year}-12-31`;

  let candidates = registry.filter((obj) => {
    if (obj.type !== type) return false;
    if (obj.country !== country) return false;
    if (obj.locale !== locale) return false;
    if (obj.status !== "active") return false;
    if (obj.effective_from && obj.effective_from > yearEnd) return false;
    if (obj.effective_until && obj.effective_until < yearStart) return false;
    return true;
  });

  if (version) {
    candidates = candidates.filter((obj) => obj.version === version);
  }

  if (id) {
    const exact = candidates.find((obj) => obj.id === id);
    return exact;
  }

  candidates.sort((a, b) => b.effective_from.localeCompare(a.effective_from));
  return candidates[0];
}

function buildFallbackInfo(input, result) {
  return {
    requestedCountry: input.country,
    requestedLocale: input.locale,
    resolvedCountry: result.country,
    resolvedLocale: result.locale,
    requestedType: input.type,
    resolvedId: result.id,
  };
}

function maybeWarnOnFallback(input, result) {
  if (result === undefined) return;
  if (result.locale === input.locale) return;
  if (!input.warnOnFallback) return;
  if (typeof input.onFallback !== "function") return;

  input.onFallback(buildFallbackInfo(input, result));
}

function resolveRule(input, registry, cache) {
  const key = `${input.type}:${input.country}:${input.locale}:${input.year}:${input.id ?? ""}:${input.version ?? ""}`;
  diagnostics.totalLookups++;

  if (cache.has(key)) {
    diagnostics.cacheHits++;
    const result = cache.get(key);
    if (result === undefined) {
      diagnostics.notFoundLookups++;
    } else if (result.locale !== input.locale) {
      diagnostics.fallbackLocaleHits++;
    }
    maybeWarnOnFallback(input, result);
    return result;
  }

  diagnostics.cacheMisses++;
  const locales = buildLocaleFallbacks(input.locale, input.country);
  let result = undefined;
  for (const locale of locales) {
    const found = findRule(input, locale, registry);
    if (found !== undefined) {
      result = found;
      break;
    }
  }

  cache.set(key, result);
  if (result === undefined) {
    diagnostics.notFoundLookups++;
  } else if (result.locale !== input.locale) {
    diagnostics.fallbackLocaleHits++;
  }
  maybeWarnOnFallback(input, result);
  return result;
}

function main() {
  const registry = loadRegistry();
  const cache = new Map();

  console.log("Atlas v2 — Rule Resolver QA v0.2\n");
  console.log("Lookup results:");
  console.log("-".repeat(80));
  console.log(`${pad("Label", 24)} ${pad("Expected", 28)} ${pad("Actual", 22)} Status`);
  console.log("-".repeat(80));

  let failures = 0;

  for (const lookup of lookups) {
    const result = resolveRule(lookup, registry, cache);
    const actualId = result ? result.id : "missing";
    const expectedId = lookup.expected ?? "missing";
    const passed = actualId === expectedId;
    if (!passed) failures++;

    console.log(
      `${pad(lookup.label, 24)} ${pad(expectedId, 28)} ${pad(actualId, 22)} ${passed ? "PASS" : "FAIL"}`,
    );
  }

  console.log("-".repeat(80));
  console.log("\nFallback warning test (fr-BE -> BE):");
  const fallbackCalls = [];
  const fallbackCache = new Map();
  resolveRule(
    {
      type: "vat_rate",
      country: "BE",
      locale: "fr-BE",
      year: 2026,
      warnOnFallback: true,
      onFallback: (info) => fallbackCalls.push(info),
    },
    registry,
    fallbackCache,
  );

  const fallbackWarningPassed =
    fallbackCalls.length === 1 &&
    fallbackCalls[0].requestedLocale === "fr-BE" &&
    fallbackCalls[0].resolvedLocale === "BE" &&
    fallbackCalls[0].resolvedId === "be.vat.country_fallback";

  if (!fallbackWarningPassed) failures++;

  console.log(`  callback invoked: ${fallbackCalls.length === 1 ? "yes" : "no"} ${fallbackWarningPassed ? "PASS" : "FAIL"}`);
  if (fallbackCalls.length > 0) {
    console.log(`  requestedLocale: ${fallbackCalls[0].requestedLocale}`);
    console.log(`  resolvedLocale:  ${fallbackCalls[0].resolvedLocale}`);
    console.log(`  resolvedId:        ${fallbackCalls[0].resolvedId}`);
  }
  console.log("");

  console.log("\nFallback warning test (fr-BE -> BE income tax):");
  const incomeTaxFallbackCalls = [];
  const incomeTaxFallbackCache = new Map();
  resolveRule(
    {
      type: "tax_bracket",
      country: "BE",
      locale: "fr-BE",
      year: 2026,
      warnOnFallback: true,
      onFallback: (info) => incomeTaxFallbackCalls.push(info),
    },
    registry,
    incomeTaxFallbackCache,
  );

  const incomeTaxFallbackWarningPassed =
    incomeTaxFallbackCalls.length === 1 &&
    incomeTaxFallbackCalls[0].requestedLocale === "fr-BE" &&
    incomeTaxFallbackCalls[0].resolvedLocale === "BE" &&
    incomeTaxFallbackCalls[0].resolvedId === "be.tax.income.country_fallback.2026";

  if (!incomeTaxFallbackWarningPassed) failures++;

  console.log(`  callback invoked: ${incomeTaxFallbackCalls.length === 1 ? "yes" : "no"} ${incomeTaxFallbackWarningPassed ? "PASS" : "FAIL"}`);
  if (incomeTaxFallbackCalls.length > 0) {
    console.log(`  requestedLocale: ${incomeTaxFallbackCalls[0].requestedLocale}`);
    console.log(`  resolvedLocale:  ${incomeTaxFallbackCalls[0].resolvedLocale}`);
    console.log(`  resolvedId:        ${incomeTaxFallbackCalls[0].resolvedId}`);
  }
  console.log("");

  console.log("\nDiagnostics:");
  console.log(`  totalLookups:      ${diagnostics.totalLookups}`);
  console.log(`  cacheHits:         ${diagnostics.cacheHits}`);
  console.log(`  cacheMisses:       ${diagnostics.cacheMisses}`);
  console.log(`  notFoundLookups:   ${diagnostics.notFoundLookups}`);
  console.log(`  fallbackLocaleHits: ${diagnostics.fallbackLocaleHits}`);
  console.log("");

  if (failures === 0) {
    console.log("✅ All lookups matched expectations.");
    process.exit(0);
  } else {
    console.log(`❌ ${failures} lookup(s) did not match expectations.`);
    process.exit(1);
  }
}

function pad(value, width) {
  const str = String(value);
  return str.length >= width ? str : str + " ".repeat(width - str.length);
}

main();
