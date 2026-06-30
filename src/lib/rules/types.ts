import type { KnowledgeObject } from "../knowledge/types";

/** Recognised rule types in the Atlas Rule Engine. */
export type RuleType =
  | "vat_rate"
  | "tax_bracket"
  | "tax_credit"
  | "allowance_threshold"
  | "mortgage_formula"
  | "annuity_formula"
  | "import_cost"
  | "manual_input"
  | "informational"
  | "entrepreneur_deduction"
  | "profit_exemption";

/** Information passed to the fallback warning callback. */
export interface RuleResolverFallbackInfo {
  /** Country originally requested by the caller. */
  requestedCountry: string;
  /** Locale originally requested by the caller. */
  requestedLocale: string;
  /** Country of the resolved Knowledge Object. */
  resolvedCountry: string;
  /** Locale of the resolved Knowledge Object (the fallback that matched). */
  resolvedLocale: string;
  /** Rule type originally requested. */
  requestedType: RuleType;
  /** Id of the resolved Knowledge Object. */
  resolvedId: string;
}

/** Input for the generic Rule Resolver. */
export interface RuleResolverInput {
  /** The type of rule to resolve. */
  type: RuleType;
  /** ISO 3166-1 alpha-2 country code, e.g. "NL". */
  country: string;
  /** BCP-47 locale, e.g. "nl-NL". */
  locale: string;
  /** The year the rule must be active for. */
  year: number;
  /** Optional exact id match. */
  id?: string;
  /** Optional exact version match. When omitted, the most recent active object is selected. */
  version?: string;
  /** When true, the resolver may invoke `onFallback` for fallback locale matches. */
  warnOnFallback?: boolean;
  /** Optional callback invoked when a fallback locale is used and `warnOnFallback` is true. */
  onFallback?: (info: RuleResolverFallbackInfo) => void;
}

/** Result wrapper returned by the Rule Resolver. */
export interface RuleResolverResult {
  /** The matched Knowledge Object. */
  object: KnowledgeObject;
}

/** Function signature for resolving a rule. */
export type ResolveRule = (input: RuleResolverInput) => KnowledgeObject | undefined;

/** Aggregated diagnostics counters for the Rule Resolver.
 *
 * These values are intended for development, testing and AI QA only. They
 * contain no personal or user-identifiable data.
 */
export interface RuleResolverDiagnostics {
  /** Total number of resolveRule() calls. */
  totalLookups: number;
  /** Number of calls served from the in-memory cache. */
  cacheHits: number;
  /** Number of calls that required a registry scan. */
  cacheMisses: number;
  /** Number of calls that returned undefined. */
  notFoundLookups: number;
  /** Number of calls that resolved via a less-specific fallback locale. */
  fallbackLocaleHits: number;
}
