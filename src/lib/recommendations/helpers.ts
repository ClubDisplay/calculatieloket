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
