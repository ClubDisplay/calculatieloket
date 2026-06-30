/**
 * Atlas Calculator Engine — Input parsing utilities
 *
 * Pure functions for safely reading numeric values from user input.
 */

/**
 * Parse a string or number into a number.
 *
 * Accepts both comma and dot as decimal separator.
 * Invalid values return the fallback.
 *
 * @param value Raw input value.
 * @param fallback Value to return when parsing fails (default 0).
 * @returns Parsed number or fallback.
 */
export function parseNumber(
  value: string | number | null | undefined,
  fallback = 0,
): number {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  const normalized = value
    .trim()
    .replace(/\s/g, "")
    .replace(/\./g, "") // remove Dutch thousand separators
    .replace(/,/g, "."); // normalize comma decimals to dot

  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Parse the value of an HTMLInputElement into a number.
 *
 * @param input HTMLInputElement or null.
 * @param fallback Value to return when parsing fails (default 0).
 * @returns Parsed number or fallback.
 */
export function parseInputNumber(
  input: HTMLInputElement | null,
  fallback = 0,
): number {
  if (!input) return fallback;
  return parseNumber(input.value, fallback);
}
