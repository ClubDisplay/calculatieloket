/**
 * Atlas Calculator Engine — Formatting utilities
 *
 * Pure functions for Dutch number and currency formatting.
 * Uses Dutch notation: thousands separated by dots, decimals by commas.
 */

/**
 * Format a number as a Dutch currency string.
 *
 * Examples:
 *   formatEuro(1234.56)      // "€ 1.235"
 *   formatEuro(1234.56, 2)   // "€ 1.234,56"
 *   formatEuro(NaN)          // "—"
 *
 * @param value Number to format.
 * @param decimals Number of decimal places (default 0).
 * @returns Formatted euro string or em-dash on invalid input.
 */
export function formatEuro(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "—";

  const formatted = formatNumber(value, decimals);
  return `€ ${formatted}`;
}

/**
 * Format a number as a Dutch currency string for HTML output.
 *
 * Uses HTML entities (`&euro;` and `&nbsp;`) so the currency symbol and amount
 * stay together when rendered via `innerHTML`.
 *
 * Examples:
 *   formatEuroHtml(1234.56)      // "&euro;&nbsp;1.234,56"
 *   formatEuroHtml(1234.56, 0)   // "&euro;&nbsp;1.235"
 *   formatEuroHtml(NaN)          // "—"
 *
 * @param value Number to format.
 * @param decimals Number of decimal places (default 0).
 * @returns Formatted euro HTML string or em-dash on invalid input.
 */
export function formatEuroHtml(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "—";
  return `&euro;&nbsp;${formatNumber(value, decimals)}`;
}

/**
 * Format a number using Dutch notation.
 *
 * Examples:
 *   formatNumber(1234.56)      // "1.235"
 *   formatNumber(1234.56, 2) // "1.234,56"
 *   formatNumber(NaN)          // "—"
 *
 * @param value Number to format.
 * @param decimals Number of decimal places (default 0).
 * @returns Formatted number string or em-dash on invalid input.
 */
export function formatNumber(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "—";

  return value
    .toFixed(decimals)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
