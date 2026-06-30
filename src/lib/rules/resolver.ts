import { knowledgeObjects } from "../knowledge/objects";
import type { KnowledgeObject } from "../knowledge/types";
import type { RuleResolverDiagnostics, RuleResolverFallbackInfo, RuleResolverInput } from "./types";

/** Simple in-memory cache for resolveRule lookups. */
const ruleCache = new Map<string, KnowledgeObject | undefined>();

/** Lightweight diagnostics counters for dev/test/AI QA. No PII is stored. */
let diagnostics: RuleResolverDiagnostics = {
  totalLookups: 0,
  cacheHits: 0,
  cacheMisses: 0,
  notFoundLookups: 0,
  fallbackLocaleHits: 0,
};

function buildRuleCacheKey(input: RuleResolverInput): string {
  return `${input.type}:${input.country}:${input.locale}:${input.year}:${input.id ?? ""}:${input.version ?? ""}`;
}

/**
 * Build the locale fallback chain for a resolver input.
 *
 * Order:
 * 1. Exact requested locale (e.g. "nl-NL")
 * 2. Language-only fallback (e.g. "nl")
 * 3. Country fallback (e.g. "NL" / "nl")
 * 4. Default locale ("default")
 */
function buildLocaleFallbacks(locale: string, country: string): string[] {
  const fallbacks = [locale];

  const language = locale.split("-")[0];
  if (language && language !== locale) {
    fallbacks.push(language);
  }

  if (country) {
    fallbacks.push(country);
    const countryLower = country.toLowerCase();
    if (countryLower !== country) {
      fallbacks.push(countryLower);
    }
  }

  fallbacks.push("default");

  // Remove duplicates while preserving order.
  return [...new Set(fallbacks)];
}

/**
 * Clear the resolver cache. Primarily useful in tests or when the Knowledge
 * Layer registry is hot-reloaded at runtime.
 */
export function clearRuleResolverCache(): void {
  ruleCache.clear();
}

/**
 * Return a snapshot of the current resolver diagnostics.
 *
 * These counters are intended for development, testing and AI QA only. They
 * contain no personal data, only aggregated counters.
 */
export function getRuleResolverDiagnostics(): RuleResolverDiagnostics {
  return { ...diagnostics };
}

/**
 * Reset all resolver diagnostics counters to zero.
 *
 * Does not clear the cache; use `clearRuleResolverCache()` for that.
 */
export function clearRuleResolverDiagnostics(): void {
  diagnostics = {
    totalLookups: 0,
    cacheHits: 0,
    cacheMisses: 0,
    notFoundLookups: 0,
    fallbackLocaleHits: 0,
  };
}

function findRuleInRegistry(
  input: Omit<RuleResolverInput, "locale">,
  locale: string,
  registry: readonly KnowledgeObject[],
): KnowledgeObject | undefined {
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
    // When an explicit id is requested, it must match within the filtered set.
    // Do not fall back to a different object if the id is not found.
    return candidates.find((obj) => obj.id === id);
  }

  // Return the most recently effective rule.
  candidates.sort((a, b) => b.effective_from.localeCompare(a.effective_from));
  return candidates[0];
}

function recordLookupResult(
  result: KnowledgeObject | undefined,
  input: RuleResolverInput,
): void {
  if (result === undefined) {
    diagnostics.notFoundLookups++;
  } else if (result.locale !== input.locale) {
    // A result was found via a less-specific fallback locale.
    diagnostics.fallbackLocaleHits++;
  }
}

function buildFallbackInfo(
  input: RuleResolverInput,
  result: KnowledgeObject,
): RuleResolverFallbackInfo {
  return {
    requestedCountry: input.country,
    requestedLocale: input.locale,
    resolvedCountry: result.country,
    resolvedLocale: result.locale,
    requestedType: input.type,
    resolvedId: result.id,
  };
}

function maybeWarnOnFallback(
  input: RuleResolverInput,
  result: KnowledgeObject | undefined,
): void {
  if (result === undefined) return;
  if (result.locale === input.locale) return;
  if (!input.warnOnFallback) return;
  if (typeof input.onFallback !== "function") return;

  input.onFallback(buildFallbackInfo(input, result));
}

/**
 * Resolve a rule against a provided Knowledge Object registry.
 *
 * Filters by type, country, locale, active status and effective date range.
 * If `id` is provided, it is used as an exact match within the filtered candidates.
 * Otherwise, the most recently effective active object is returned.
 *
 * Locale fallback is applied in this order: exact locale → language-only →
 * country → default. This keeps existing exact matches intact while allowing
 * future multi-country/multi-locale objects to share rules.
 */
export function resolveRuleFromRegistry(
  input: RuleResolverInput,
  registry: readonly KnowledgeObject[],
): KnowledgeObject | undefined {
  const locales = buildLocaleFallbacks(input.locale, input.country);

  for (const locale of locales) {
    const result = findRuleInRegistry(input, locale, registry);
    if (result !== undefined) {
      return result;
    }
  }

  return undefined;
}

/**
 * Resolve a rule from the in-memory Knowledge Layer registry.
 *
 * This is the public entry point for calculator engines. They should never
 * import `knowledgeObjects` directly; instead they call `resolveRule()` and let
 * the Rule Resolver select the appropriate object.
 *
 * Results are cached in memory so repeated lookups for the same input do not
 * re-scan the entire registry. Both found objects and `undefined` are cached.
 * The cache key uses the original input locale, not the fallback chain.
 *
 * Diagnostics are collected for dev/test/AI QA only. They contain no personal
 * data. Use `getRuleResolverDiagnostics()` and `clearRuleResolverDiagnostics()`
 * to inspect or reset counters.
 */
export function resolveRule(input: RuleResolverInput): KnowledgeObject | undefined {
  const key = buildRuleCacheKey(input);
  diagnostics.totalLookups++;

  if (ruleCache.has(key)) {
    diagnostics.cacheHits++;
    const result = ruleCache.get(key);
    recordLookupResult(result, input);
    maybeWarnOnFallback(input, result);
    return result;
  }

  diagnostics.cacheMisses++;
  const result = resolveRuleFromRegistry(input, knowledgeObjects);
  ruleCache.set(key, result);
  recordLookupResult(result, input);
  maybeWarnOnFallback(input, result);
  return result;
}
