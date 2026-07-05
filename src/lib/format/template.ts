/**
 * Safe template filling utilities.
 *
 * Used by calculator use-case cards to replace placeholders like {{inkomen}}
 * with computed values. If a required value is missing, the fallback text is
 * returned so raw {{...}} tokens never reach users.
 */

export interface FillTemplateValues {
  [key: string]: string | number | undefined | null;
}

const PLACEHOLDER_RE = /\{\{([^}]+)\}\}/g;

/**
 * Fill a template with values, returning a safe fallback if any required
 * placeholder is missing or invalid.
 *
 * Examples:
 *   fillTemplate("Bekijk {{inkomen}}", { inkomen: 25000 }, "Bekijk je inkomen")
 *   // => "Bekijk 25.000"
 *
 *   fillTemplate("Bekijk {{inkomen}}", {}, "Bekijk je inkomen")
 *   // => "Bekijk je inkomen"
 */
export function fillTemplate(
  template: string,
  values: FillTemplateValues,
  fallback: string
): string {
  const requiredKeys = Array.from(new Set(Array.from(template.matchAll(PLACEHOLDER_RE)).map((m) => m[1])));

  for (const key of requiredKeys) {
    const value = values[key];
    if (value === undefined || value === null || value === "" || (typeof value === "number" && Number.isNaN(value))) {
      return fallback;
    }
  }

  return template.replace(PLACEHOLDER_RE, (match, key) => {
    const value = values[key];
    return value === undefined || value === null ? match : String(value);
  });
}

/**
 * Check whether a string still contains unfulfilled {{...}} placeholders.
 */
export function hasRawPlaceholders(text: string): boolean {
  return PLACEHOLDER_RE.test(text);
}

/**
 * Replace raw placeholders with an empty string as a last-resort sanitiser.
 */
export function stripPlaceholders(text: string): string {
  return text.replace(PLACEHOLDER_RE, "").replace(/\s+/g, " ").trim();
}
