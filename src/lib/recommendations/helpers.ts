/**
 * Safe number extraction for recommendation rules.
 * Accepts numbers, numeric strings, and strings with Dutch decimal separators.
 */
export function getNumber(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === "string") {
    // Dutch formatting: dots as thousands separator, comma as decimal separator.
    const normalized = value.replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

/**
 * Try to read a number from a list of possible keys in a record.
 */
export function findNumber(record: Record<string, unknown>, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = record[key];
    const num = getNumber(value);
    if (num !== undefined) return num;
  }
  return undefined;
}

/**
 * Safe boolean extraction for recommendation rules.
 */
export function getBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return undefined;
}

/**
 * Try to read a boolean from a list of possible keys in a record.
 */
export function findBoolean(record: Record<string, unknown>, keys: string[]): boolean | undefined {
  for (const key of keys) {
    const value = record[key];
    const bool = getBoolean(value);
    if (bool !== undefined) return bool;
  }
  return undefined;
}

import type { RecommendationInput } from "./types";

/**
 * Try to read a number from values or result, in that order.
 */
export function findNumberAnywhere(input: RecommendationInput, keys: string[]): number | undefined {
  return findNumber(input.values, keys) ?? findNumber(input.result, keys);
}

/**
 * Try to read a boolean from values or result, in that order.
 */
export function findBooleanAnywhere(input: RecommendationInput, keys: string[]): boolean | undefined {
  return findBoolean(input.values, keys) ?? findBoolean(input.result, keys);
}

/**
 * Build a URL with query parameters. Undefined / empty values are omitted.
 */
export function buildUrl(base: string, params: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  }
  const queryString = query.toString();
  return queryString ? `${base}?${queryString}` : base;
}
