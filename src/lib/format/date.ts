/**
 * Parse a Dutch date string like "4 augustus 2026" into an ISO date
 * "2026-08-04". Returns undefined when the input is not in the expected format.
 */
const MONTHS: Record<string, string> = {
  januari: "01",
  februari: "02",
  maart: "03",
  april: "04",
  mei: "05",
  juni: "06",
  juli: "07",
  augustus: "08",
  september: "09",
  oktober: "10",
  november: "11",
  december: "12",
};

export function parseDutchDate(value: string): string | undefined {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, " ");
  const parts = normalized.split(" ");
  if (parts.length !== 3) return undefined;

  const [day, monthName, year] = parts;
  const month = MONTHS[monthName];

  if (!month || !/^\d{1,2}$/.test(day) || !/^\d{4}$/.test(year)) {
    return undefined;
  }

  const dayNum = parseInt(day, 10);
  if (dayNum < 1 || dayNum > 31) return undefined;

  return `${year}-${month}-${day.padStart(2, "0")}`;
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}
