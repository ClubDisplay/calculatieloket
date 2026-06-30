/**
 * Centrale configuratie: Nederlandse Box 1 belastingtarieven en heffingskortingen 2026.
 *
 * Bron: Belastingdienst — Box 1 tarieven, Algemene heffingskorting, Arbeidskorting
 * URL box 1: https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/box_1
 * URL ahk:  https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2026
 * URL ak:   https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2026
 *
 * Gecontroleerd: 12 juni 2026
 * Geldig voor: personen die in 2026 de AOW-leeftijd nog niet hebben bereikt.
 */

export const TAX_YEAR = 2026;

/** Box 1 schijven 2026 (onder AOW-leeftijd) */
export const BRACKETS = {
  schijf1: { max: 38883, rate: 0.3575, label: "Schijf 1 — t/m €38.883" },
  schijf2: { max: 78426, rate: 0.3756, label: "Schijf 2 — €38.883 t/m €78.426" },
  schijf3: { rate: 0.4950, label: "Schijf 3 — vanaf €78.426" },
} as const;

export const BRACKET_LIST = [
  { max: 38883, rate: 0.3575 },
  { max: 78426, rate: 0.3756 },
  { max: Infinity, rate: 0.4950 },
] as const;

/** Algemene heffingskorting 2026 */
export const AHK = {
  max: 3115,
  drempel: 29736,
  afbouwPercentage: 0.06398,
  nulVanaf: 78427,
  bronLabel: "Belastingdienst — Tabel algemene heffingskorting 2026",
  bronUrl: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2026",
} as const;

/** Arbeidskorting 2026 */
export const AK = {
  tier1: { max: 11965, percentage: 0.08324 },
  tier2: { min: 11966, max: 25845, basis: 996, percentage: 0.31009 },
  tier3: { min: 25846, max: 45592, basis: 5300, percentage: 0.0195 },
  tier4: { min: 45593, max: 132920, basis: 5685, percentage: 0.0651 },
  nulVanaf: 132921,
  bronLabel: "Belastingdienst — Tabel arbeidskorting 2026",
  bronUrl: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2026",
} as const;

/** Belasting over Box 1 inkomen */
export function berekenBelasting(inkomen: number): number {
  let rest = inkomen;
  let belasting = 0;
  let prev = 0;
  for (const bracket of BRACKET_LIST) {
    const width = bracket.max - prev;
    const inBracket = Math.min(Math.max(rest, 0), width);
    belasting += inBracket * bracket.rate;
    rest -= width;
    prev = bracket.max;
    if (rest <= 0) break;
  }
  return belasting;
}

/** Algemene heffingskorting */
export function berekenAHK(verzamelinkomen: number): number {
  if (verzamelinkomen <= AHK.drempel) return AHK.max;
  if (verzamelinkomen >= AHK.nulVanaf) return 0;
  return Math.max(0, AHK.max - AHK.afbouwPercentage * (verzamelinkomen - AHK.drempel));
}

/** Arbeidskorting */
export function berekenAK(arbeidsinkomen: number): number {
  const ak = AK;
  if (arbeidsinkomen <= ak.tier1.max) return arbeidsinkomen * ak.tier1.percentage;
  if (arbeidsinkomen <= ak.tier2.max) return ak.tier2.basis + ak.tier2.percentage * (arbeidsinkomen - ak.tier2.min);
  if (arbeidsinkomen <= ak.tier3.max) return ak.tier3.basis + ak.tier3.percentage * (arbeidsinkomen - ak.tier3.min);
  if (arbeidsinkomen <= ak.tier4.max) return Math.max(0, ak.tier4.basis - ak.tier4.percentage * (arbeidsinkomen - ak.tier4.min));
  return 0;
}
