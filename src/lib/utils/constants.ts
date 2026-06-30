/**
 * Atlas Calculator Engine — Constants
 *
 * Centralized constants extracted from existing calculator pages.
 * Values are copied literally from the current inline scripts.
 * TODO-comments mark places where the source pages contain discrepancies
 * or where official 2026 values should be double-checked later.
 */

/** Dutch VAT rates supported by the site. */
export const VAT_RATES = [0, 9, 21] as const;

/** 2026 Box 1 income tax brackets (under AOW age). */
export const TAX_2026 = {
  year: 2026,
  brackets: [
    { upTo: 38883, rate: 0.3575 },
    { upTo: 78426, rate: 0.3756 },
    { upTo: Infinity, rate: 0.495 },
  ],
  // TODO: verify rates against official Belastingdienst tables before migrating salaris/bruto-netto/zzp.
} as const;

/** 2026 Algemene heffingskorting (general tax credit). */
export const AHK_2026 = {
  year: 2026,
  max: 3115,
  phaseOutThreshold: 29736,
  phaseOutRate: 0.06398,
  cutOff: 78427,
  // TODO: the 2026 max value in AGENTS.md mentions €3.068; the existing page scripts use 3115. Kept as-is from scripts.
} as const;

/** 2026 Arbeidskorting (labour tax credit). */
export const AK_2026 = {
  year: 2026,
  max: 5685,
  brackets: [
    { upTo: 11965, rate: 0.08324 },
    { upTo: 25845, base: 996, rate: 0.31009 },
    { upTo: 45592, base: 5300, rate: 0.0195 },
    { upTo: 132920, base: 5685, rate: -0.0651 },
    { upTo: Infinity, base: 0, rate: 0 },
  ],
  // TODO: page content text mentions phase-out from €45.593 in one page and €45.592 in another.
  // TODO: the script uses 45592 as the threshold. Kept as-is from scripts.
} as const;
