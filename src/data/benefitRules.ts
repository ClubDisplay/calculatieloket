/**
 * Centrale configuratie: ZZP-aftrekposten, BTW, toeslagenregels en overige constanten 2026.
 *
 * Bronnen:
 * - Belastingdienst (zelfstandigenaftrek, MKB-winstvrijstelling, startersaftrek, BTW)
 * - Ondernemersplein (MKB-winstvrijstelling)
 * - Dienst Toeslagen (zorgtoeslag, huurtoeslag)
 * - Toeslagenkaart 2026
 * - Rijksoverheid (vakantiegeld)
 *
 * Gecontroleerd: 12 juni 2026
 */

export const BTW = {
  hoog: { percentage: 21, label: "Hoog tarief (21%)" },
  laag: { percentage: 9, label: "Laag tarief (9%)" },
  bronLabel: "Belastingdienst — BTW-tarieven",
  bronUrl: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/btw_tarief/btw_tarief",
} as const;

export const SALARIS = {
  vakantiegeldPercentage: 0.08,
  maandenPerJaar: 12,
  bronLabel: "Rijksoverheid — Vakantiegeld",
  bronUrl: "https://www.rijksoverheid.nl/vakantiegeld",
} as const;

export const ZZP = {
  zelfstandigenaftrek: {
    bedrag: 1200,
    label: "Zelfstandigenaftrek",
    voorwaarde: "Minimaal 1.225 uur per jaar aan de onderneming besteden (urencriterium). Belastingvoordeel beperkt tot tarief 37,56%.",
    bronLabel: "Belastingdienst — Zelfstandigenaftrek 2026",
    bronUrl: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/zelfstandigenaftrek-2026",
  },
  startersaftrek: {
    bedrag: 2123,
    label: "Startersaftrek",
    voorwaarde: "Verhoging van de zelfstandigenaftrek. Alleen als je in de afgelopen 5 jaar maximaal 2 keer zelfstandigenaftrek toepaste en in 1 of meer van die jaren geen ondernemer was.",
    bronLabel: "Belastingdienst — Startersaftrek 2026",
    bronUrl: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/zelfstandigenaftrek-2026",
  },
  mkbWinstvrijstelling: {
    percentage: 0.127,
    label: "MKB-winstvrijstelling",
    voorwaarde: "12,70% van de winst na ondernemersaftrek. Geen urencriterium vereist.",
    bronLabel: "Ondernemersplein — MKB-winstvrijstelling",
    bronUrl: "https://ondernemersplein.overheid.nl/subsidies-en-regelingen/mkb-winstvrijstelling/",
  },
} as const;

export const HUURTOESLAG = {
  rekengrensJong: 498.20,
  rekengrensOuder: 932.93,
  inkomensgrensAlleen: 32500,
  inkomensgrensSamen: 43500,
  vermogensgrensAlleen: 38479,
  vermogensgrensSamen: 76958,
  vermogensgrensMedebewoner: 38479,
  notitie: "Vanaf 2026 kan de huur niet meer 'te hoog' zijn om huurtoeslag aan te vragen. Rekengrenzen tellen wel mee voor de hoogte van de toeslag.",
  bronLabel: "Dienst Toeslagen — Huurtoeslag 2026 / Toeslagenkaart 2026",
  bronUrl: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/toeslagenkaart-2026",
} as const;

export const ZORGTOESLAG = {
  maxJaarAlleen: 1550,
  maxJaarSamen: 2963,
  maxMaandAlleen: 131,
  inkomensgrensAlleen: 40857,
  inkomensgrensSamen: 51142,
  vermogensgrensAlleen: 146011,
  vermogensgrensSamen: 184633,
  bronLabel: "Dienst Toeslagen — Zorgtoeslag 2026",
  bronUrl: "https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/content/maximaal-inkomen-voor-zorgtoeslag",
} as const;

export const HYPOTHEEK = {
  hypotheekrenteaftrekSchijf: 0.3756,
  bronLabel: "Nibud / Rijksoverheid",
  bronUrl: "https://www.nibud.nl",
} as const;
