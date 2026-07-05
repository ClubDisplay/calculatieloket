/**
 * Calculator Registry — Single Source of Truth for all calculators.
 *
 * This module defines the canonical metadata for every calculator, category and
 * cross-cutting concern (search, recommendations, navigation, SEO, schema, sources).
 *
 * Rules of the registry:
 * - One entry per calculator.
 * - Categories are defined here; `category-icons.ts` only provides the SVG icons.
 * - All consumer code (search, categories, recommendations, hub, homepage) reads from this file.
 * - Adding a new calculator in the future means adding one record here.
 */

import { icons } from "../category-icons";
import type { Recommendation } from "../recommendations/types";

export type CalculatorCountry = "NL";
export type CalculatorLanguage = "nl";
export type CalculatorStatus = "active" | "draft" | "deprecated";
export type CalculatorDifficulty = "beginner" | "intermediate" | "advanced";

export interface SearchItem {
  title: string;
  url: string;
  keywords: string[];
  category: string;
  description: string;
  intents: string[];
  icon: string;
}

export interface CalculatorSeo {
  title: string;
  description: string;
}

export interface CalculatorHowToStep {
  name: string;
  text: string;
}

export interface CalculatorSchema {
  howTo?: {
    name: string;
    description: string;
    totalTime: string;
    steps: CalculatorHowToStep[];
  };
}

export interface CalculatorOfficialSource {
  label: string;
  title: string;
  description: string;
  href: string;
}

export interface CalculatorCategory {
  id: string;
  label: string;
  href: string;
  iconKey: string;
  accent: string;
  description: string;
  /** Whether the category has a dedicated `/categorie/{slug}/` page. */
  hasPage: boolean;
  /** Whether the category appears on the homepage category grid. */
  showOnHome: boolean;
}

export interface CalculatorDefinition {
  id: string;
  slug: string;
  url: string;
  title: string;
  shortTitle: string;
  /** Optional title used by the recommendation engine when it references this calculator. */
  recommendationTitle?: string;
  description: string;
  /** Concise description used for search results and category/hub cards. */
  shortDescription: string;
  /** Primary category. */
  category: string;
  /** Additional categories where the calculator should also appear (e.g. hub / category pages). */
  secondaryCategories?: string[];
  iconKey: string;
  keywords: string[];
  intents: string[];
  related: string[];
  difficulty: CalculatorDifficulty;
  country: CalculatorCountry;
  language: CalculatorLanguage;
  status: CalculatorStatus;
  year: number;
  featured: boolean;
  popular: boolean;
  isNew: boolean;
  badge?: string;
  lastUpdated: string;
  seo: CalculatorSeo;
  schema: CalculatorSchema;
  officialSources: CalculatorOfficialSource[];
  /** Optional tagline shown on the homepage featured card. */
  question?: string;
  /** Optional label used by the homepage quick-link chips. */
  quickLinkLabel?: string;
}

export interface CategoryListItem {
  id: string;
  label: string;
  href: string;
}

export interface HomeCategoryItem extends CategoryListItem {
  icon: string;
}

export interface CalculatorGridItem {
  title: string;
  href: string;
  description: string;
  badge?: string;
  icon: string;
  accent: string;
}

export interface CalculatorHubGroup {
  category: string;
  accent: string;
  items: CalculatorGridItem[];
}

export interface FeaturedCardItem {
  id: string;
  title: string;
  href: string;
  keywords: string;
  icon: string;
  accent: string;
  question: string;
}

export interface QuickLinkItem {
  label: string;
  href: string;
}

// ============================================================================
// Categories
// ============================================================================

export const calculatorCategories: CalculatorCategory[] = [
  {
    id: "Inkomen",
    label: "Inkomen",
    href: "/categorie/inkomen/",
    iconKey: "euro",
    accent: "#2563eb",
    description: "Berekeningen voor loon, salaris, vakantiegeld en toeslagen.",
    hasPage: true,
    showOnHome: true,
  },
  {
    id: "Wonen",
    label: "Wonen",
    href: "/categorie/wonen/",
    iconKey: "house",
    accent: "#d97706",
    description: "Berekeningen voor hypotheek, wonen en maandlasten.",
    hasPage: true,
    showOnHome: true,
  },
  {
    id: "Belasting",
    label: "Belasting",
    href: "/categorie/belasting/",
    iconKey: "calc",
    accent: "#2563eb",
    description: "Berekeningen voor btw, tarieven en omrekenen.",
    hasPage: true,
    showOnHome: true,
  },
  {
    id: "Ondernemen",
    label: "Ondernemen",
    href: "/categorie/ondernemen/",
    iconKey: "person",
    accent: "#7c3aed",
    description: "Berekeningen voor zzp'ers, ondernemers en importkosten.",
    hasPage: true,
    showOnHome: true,
  },
  {
    id: "Auto",
    label: "Auto",
    href: "/categorie/auto/",
    iconKey: "car",
    accent: "#0891b2",
    description: "Berekeningen voor auto importkosten, bpm en RDW.",
    hasPage: true,
    showOnHome: true,
  },
  {
    id: "Toeslagen",
    label: "Toeslagen",
    href: "/toeslagen-calculator/",
    iconKey: "money",
    accent: "#059669",
    description: "Bereken huur- en zorgtoeslag op basis van je situatie.",
    hasPage: false,
    showOnHome: true,
  },
];

// ============================================================================
// Calculators
// ============================================================================

export const calculators: CalculatorDefinition[] = [
  {
    id: "bruto-netto",
    slug: "bruto-netto-2026",
    url: "/bruto-netto-2026/",
    title: "Bruto netto 2026",
    shortTitle: "Bruto netto 2026",
    description:
      "Bereken je bruto-netto salaris in 2026. Zie direct je nettoloon, loonheffing, vakantiegeld, pensioen en loonheffingskorting. Gebaseerd op officiële Belastingdienst tarieven.",
    shortDescription: "Wat houd je netto over van je bruto salaris in 2026?",
    category: "Inkomen",
    iconKey: "euro",
    keywords: ["bruto netto", "netto", "bruto", "salaris", "loon", "inkomen", "werknemer"],
    intents: ["meer salaris", "loon", "netto loon", "bruto loon", "salaris berekenen", "inkomen"],
    related: ["salaris", "vakantiegeld", "toeslagen", "hypotheek", "zzp"],
    difficulty: "beginner",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: true,
    popular: true,
    isNew: false,
    lastUpdated: "2026-06-30",
    question: "Wat houd ik netto over?",
    quickLinkLabel: "Netto salaris",
    seo: {
      title: "Bruto netto 2026 | Nettoloon berekenen | Calculatieloket.nl",
      description:
        "Bereken je bruto-netto salaris in 2026. Zie direct je nettoloon, loonheffing, vakantiegeld, pensioen en loonheffingskorting. Gebaseerd op officiële Belastingdienst tarieven.",
    },
    schema: {
      howTo: {
        name: "Bruto netto salaris berekenen in 2026",
        description: "Stappen om je netto salaris in 2026 te berekenen.",
        totalTime: "PT1M",
        steps: [
          { name: "Vul je bruto maandsalaris in", text: "Voer je bruto maandsalaris in, inclusief vakantiegeld." },
          { name: "Vul je pensioenpremie in", text: "Voer het werknemersdeel van je pensioenpremie per maand in." },
          { name: "Pas loonheffingskorting toe", text: "Zet de loonheffingskorting aan als je deze bij je werkgever hebt." },
          { name: "Bekijk je netto salaris", text: "De calculator toont je netto salaris per maand en per jaar." },
          { name: "Vergelijk met en zonder korting", text: "Zie direct het verschil als je de loonheffingskorting niet zou toepassen." },
        ],
      },
    },
    officialSources: [
      {
        label: "Officiële bron",
        title: "Belastingdienst — Box 1 tarieven 2026",
        description: "Actuele tarieven en schijven voor de inkomstenbelasting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/box_1",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Algemene heffingskorting 2026",
        description: "Tabel en maximale bedragen voor de algemene heffingskorting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2026",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Arbeidskorting 2026",
        description: "Tabel en maximale bedragen voor de arbeidskorting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2026",
      },
    ],
  },
  {
    id: "salaris",
    slug: "salaris-calculator",
    url: "/salaris-calculator/",
    title: "Salaris calculator",
    shortTitle: "Salaris calculator",
    recommendationTitle: "Salaris vergelijken",
    description: "Vergelijk bruto bedragen en zie direct het netto effect. Gebaseerd op Belastingdienst tarieven.",
    shortDescription: "Vergelijk bruto bedragen en zie direct het netto effect.",
    category: "Inkomen",
    iconKey: "money",
    keywords: ["salaris", "loon", "bruto netto", "inkomen", "werknemer"],
    intents: ["meer salaris", "salaris", "salaris vergelijken"],
    related: ["bruto-netto", "toeslagen", "hypotheek", "zzp"],
    difficulty: "beginner",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: false,
    popular: false,
    isNew: false,
    lastUpdated: "2026-06-30",
    quickLinkLabel: "Salaris",
    seo: {
      title: "Salaris Calculator 2026 — Bruto naar netto | Calculatieloket.nl",
      description:
        "Bereken je nettosalaris in 2026. Vul bruto loon, pensioenpercentage en loonheffingskorting in voor een directe netto-indicatie per maand. Gebaseerd op Belastingdienst tarieven.",
    },
    schema: {
      howTo: {
        name: "Salaris berekenen in 2026",
        description: "Stappen om je bruto salaris om te rekenen naar netto in 2026.",
        totalTime: "PT1M",
        steps: [
          { name: "Vul je bruto maandsalaris in", text: "Voer je bruto maandsalaris in." },
          { name: "Vul je pensioenpercentage in", text: "Voer het percentage in dat je zelf aan pensioenpremie betaalt." },
          { name: "Pas loonheffingskorting toe", text: "Zet de loonheffingskorting aan als je deze bij je werkgever hebt." },
          { name: "Bekijk je netto salaris", text: "De calculator toont je netto salaris per maand en per jaar." },
          { name: "Vergelijk met en zonder korting", text: "Zie direct het verschil als je de loonheffingskorting niet zou toepassen." },
        ],
      },
    },
    officialSources: [
      {
        label: "Officiële bron",
        title: "Belastingdienst — Box 1 tarieven 2026",
        description: "Actuele tarieven en schijven voor de inkomstenbelasting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/box_1",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Algemene heffingskorting 2026",
        description: "Tabel en maximale bedragen voor de algemene heffingskorting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2026",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Arbeidskorting 2026",
        description: "Tabel en maximale bedragen voor de arbeidskorting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2026",
      },
    ],
  },
  {
    id: "vakantiegeld",
    slug: "vakantiegeld-calculator",
    url: "/vakantiegeld-calculator/",
    title: "Vakantiegeld calculator",
    shortTitle: "Vakantiegeld calculator",
    recommendationTitle: "Vakantiegeld berekenen",
    description: "Bereken hoeveel vakantiegeld je netto krijgt in 2026. Gebaseerd op bruto maandsalaris, pensioen en loonheffingskorting.",
    shortDescription: "Hoeveel vakantiegeld houd je netto over na inhoudingen?",
    category: "Inkomen",
    iconKey: "sun",
    keywords: ["vakantiegeld", "vakantie", "geld", "netto", "bruto", "salaris"],
    intents: ["vakantie", "vakantiegeld", "vakantie geld"],
    related: ["bruto-netto", "salaris", "toeslagen", "hypotheek", "zzp"],
    difficulty: "beginner",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: false,
    popular: false,
    isNew: true,
    badge: "Nieuw",
    lastUpdated: "2026-07-02",
    seo: {
      title: "Vakantiegeld berekenen 2026 | Netto vakantiegeld | Calculatieloket.nl",
      description: "Bereken hoeveel vakantiegeld je netto krijgt in 2026. Gebaseerd op bruto maandsalaris, pensioen en loonheffingskorting.",
    },
    schema: {
      howTo: {
        name: "Vakantiegeld berekenen",
        description: "Stappen om een indicatie te krijgen van je netto vakantiegeld in 2026.",
        totalTime: "PT1M",
        steps: [
          { name: "Vul je bruto maandsalaris in", text: "Voer het bruto maandsalaris in waarover je vakantiegeld wilt berekenen." },
          { name: "Kies het vakantiegeldpercentage", text: "De standaard is 8%, maar je kunt een afwijkend percentage invullen." },
          { name: "Vul je pensioenpremie in", text: "Voer het werknemersdeel van je pensioenpremie per maand in." },
          { name: "Pas loonheffingskorting toe", text: "Zet de loonheffingskorting aan als je deze bij je werkgever hebt." },
          { name: "Bekijk je netto vakantiegeld", text: "De calculator toont je bruto vakantiegeld, de geschatte inhouding en het netto bedrag." },
        ],
      },
    },
    officialSources: [
      {
        label: "Officiële bron",
        title: "Belastingdienst — Box 1 tarieven 2026",
        description: "Actuele tarieven en schijven voor de inkomstenbelasting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/box_1",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Algemene heffingskorting 2026",
        description: "Tabel en maximale bedragen voor de algemene heffingskorting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2026",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Arbeidskorting 2026",
        description: "Tabel en maximale bedragen voor de arbeidskorting.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2026",
      },
      {
        label: "Officiële bron",
        title: "Rijksoverheid — Vakantiegeld",
        description: "Algemene informatie over vakantiegeld en wanneer je het krijgt.",
        href: "https://www.rijksoverheid.nl/onderwerpen/vakantiegeld",
      },
    ],
  },
  {
    id: "toeslagen",
    slug: "toeslagen-calculator",
    url: "/toeslagen-calculator/",
    title: "Toeslagen calculator",
    shortTitle: "Toeslagen berekenen",
    recommendationTitle: "Toeslagen berekenen",
    description:
      "Bereken een indicatie van zorgtoeslag en huurtoeslag voor 2026 op basis van inkomen, huur en huishouden. Gebaseerd op regels van Dienst Toeslagen.",
    shortDescription: "Bereken snel je huur- en zorgtoeslag op basis van inkomen.",
    category: "Inkomen",
    iconKey: "money",
    keywords: ["toeslagen", "zorgtoeslag", "zorgtoeslagen", "huurtoeslag", "huurtoeslagen", "zorg", "huur", "wonen", "inkomen"],
    intents: ["zorgverzekering", "zorgtoeslag", "huurtoeslag", "zorg toeslag", "huur toeslag", "toeslag"],
    related: ["bruto-netto", "salaris", "hypotheek", "zzp"],
    difficulty: "beginner",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: true,
    popular: true,
    isNew: false,
    badge: "Populair",
    lastUpdated: "2026-06-30",
    question: "Krijg een indicatie van huur- of zorgtoeslag.",
    quickLinkLabel: "Toeslagen",
    seo: {
      title: "Toeslagen Calculator 2026 — Zorgtoeslag en huurtoeslag indicatie | Calculatieloket.nl",
      description:
        "Bereken een indicatie van zorgtoeslag en huurtoeslag voor 2026 op basis van inkomen, huur en huishouden. Gebaseerd op regels van Dienst Toeslagen.",
    },
    schema: {
      howTo: {
        name: "Huurtoeslag en zorgtoeslag berekenen",
        description: "Stappen om een indicatie van je huur- en zorgtoeslag in 2026 te krijgen.",
        totalTime: "PT1M",
        steps: [
          { name: "Vul je bruto jaarinkomen in", text: "Voer je bruto jaarinkomen in." },
          { name: "Kies je huishouden", text: "Geef aan of je alleenstaand bent of met een partner woont." },
          { name: "Vul eventueel partner inkomen in", text: "Als je een partner hebt, voer dan ook het bruto jaarinkomen in." },
          { name: "Vul je maandelijkse huur in", text: "Voer de kale huur in, exclusief servicekosten." },
          { name: "Bekijk je toeslag", text: "De calculator toont een indicatie van huurtoeslag en zorgtoeslag per maand." },
        ],
      },
    },
    officialSources: [
      {
        label: "Officiële bron",
        title: "Dienst Toeslagen — Huurtoeslag",
        description: "Informatie en voorwaarden voor huurtoeslag.",
        href: "https://www.toeslagen.nl/huurtoeslag",
      },
      {
        label: "Officiële bron",
        title: "Dienst Toeslagen — Zorgtoeslag",
        description: "Informatie en inkomensgrenzen voor zorgtoeslag.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/content/maximaal-inkomen-voor-zorgtoeslag",
      },
      {
        label: "Officiële bron",
        title: "Toeslagenkaart 2026",
        description: "Overzicht van alle toeslagen en bedragen voor 2026.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/toeslagenkaart-2026",
      },
    ],
  },
  {
    id: "hypotheek",
    slug: "hypotheek-calculator",
    url: "/hypotheek-calculator/",
    title: "Hypotheek calculator",
    shortTitle: "Hypotheek berekenen",
    recommendationTitle: "Hypotheek berekenen",
    description: "Bereken een indicatie van je maximale hypotheek, maandlasten en totale rentekosten op basis van je inkomen en rente. Geen officiële offerte.",
    shortDescription: "Wat kan je maximaal lenen en wat zijn je maandlasten?",
    category: "Wonen",
    iconKey: "house",
    keywords: ["hypotheek", "huis", "woning", "wonen", "maximale hypotheek", "lenen", "maandlasten"],
    intents: ["huis kopen", "eerste huis", "woning kopen", "huis", "woning", "hypotheek"],
    related: ["bruto-netto", "salaris", "toeslagen", "zzp"],
    difficulty: "beginner",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: true,
    popular: true,
    isNew: false,
    badge: "Populair",
    lastUpdated: "2026-06-30",
    question: "Wat kan ik maximaal lenen?",
    quickLinkLabel: "Hypotheek",
    seo: {
      title: "Hypotheek Calculator 2026 — Indicatie maandlasten | Calculatieloket.nl",
      description: "Bereken een indicatie van je maximale hypotheek, maandlasten en totale rentekosten op basis van je inkomen en rente. Geen officiële offerte.",
    },
    schema: {
      howTo: {
        name: "Hypotheek berekenen op basis van inkomen",
        description: "Stappen om een indicatie van je maximale hypotheek en maandlasten te berekenen.",
        totalTime: "PT1M",
        steps: [
          { name: "Vul je bruto jaarinkomen in", text: "Voer je bruto jaarinkomen in, inclusief vakantiegeld." },
          { name: "Vul de hypotheekrente in", text: "Voer een actuele voorbeeldrente in, bijvoorbeeld 3,8%." },
          { name: "Kies de looptijd", text: "Selecteer 10, 20 of 30 jaar." },
          { name: "Voeg eventueel een partner inkomen toe", text: "Zet de partner-toggle aan en vul het tweede inkomen in." },
          { name: "Bekijk je hypotheekindicatie", text: "De calculator toont het maximale hypotheekbedrag, bruto en netto maandlasten." },
        ],
      },
    },
    officialSources: [
      {
        label: "Onafhankelijke bron",
        title: "Nibud — Budgetvoorlichting",
        description: "Informatie over verantwoord lenen en hypotheeklasten.",
        href: "https://www.nibud.nl",
      },
      {
        label: "Officiële bron",
        title: "Rijksoverheid — Hypotheek",
        description: "Algemene informatie over hypotheken en regelgeving.",
        href: "https://www.rijksoverheid.nl/hypotheek",
      },
    ],
  },
  {
    id: "zzp",
    slug: "zzp-calculator",
    url: "/zzp-calculator/",
    title: "ZZP calculator",
    shortTitle: "ZZP uurtarief",
    recommendationTitle: "ZZP uurtarief berekenen",
    description:
      "Bereken als zzp'er in 2026 je benodigde uurtarief, jaaromzet, inkomstenbelasting en netto inkomen. Inclusief ondernemersaftrek en MKB-winstvrijstelling.",
    shortDescription: "Van gewenst netto inkomen naar benodigd uurtarief.",
    category: "Ondernemen",
    iconKey: "person",
    keywords: ["zzp", "zelfstandig", "ondernemer", "uurtarief", "freelancer", "inkomen"],
    intents: ["minder belasting", "zzper", "zzp", "zelfstandig", "ondernemer", "freelancer", "uurtarief"],
    related: ["btw", "bruto-netto", "hypotheek", "toeslagen", "auto-importkosten"],
    difficulty: "intermediate",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: true,
    popular: false,
    isNew: false,
    badge: "Voor ondernemers",
    lastUpdated: "2026-07-02",
    question: "Wat moet ik als zzp'er vragen?",
    quickLinkLabel: "ZZP uurtarief",
    seo: {
      title: "ZZP Calculator 2026 — Uurtarief en netto inkomen | Calculatieloket.nl",
      description:
        "Bereken als zzp'er in 2026 je benodigde uurtarief, jaaromzet, inkomstenbelasting en netto inkomen. Inclusief ondernemersaftrek en MKB-winstvrijstelling.",
    },
    schema: {
      howTo: {
        name: "ZZP uurtarief berekenen in 2026",
        description: "Stappen om als zzp'er je benodigde uurtarief en jaaromzet te berekenen.",
        totalTime: "PT1M",
        steps: [
          { name: "Vul je gewenste netto inkomen in", text: "Voer in hoeveel netto je per maand wilt verdienen." },
          { name: "Vul je werkdagen en uren in", text: "Geef het aantal factureerbare dagen per jaar en uren per dag op." },
          { name: "Vul kosten en pensioen in", text: "Voer zakelijke kosten en pensioenreservering per maand in." },
          { name: "Kies je aftrekposten", text: "Zet zelfstandigenaftrek, startersaftrek en MKB-winstvrijstelling aan of uit." },
          { name: "Bekijk je uurtarief", text: "De calculator toont het benodigde uurtarief en jaaromzet." },
        ],
      },
    },
    officialSources: [
      {
        label: "Officiële bron",
        title: "Belastingdienst — Zelfstandigenaftrek 2026",
        description: "Actuele regels voor zelfstandigenaftrek en startersaftrek.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/zelfstandigenaftrek-2026",
      },
      {
        label: "Officiële bron",
        title: "Ondernemersplein — MKB-winstvrijstelling",
        description: "Informatie over de MKB-winstvrijstelling voor ondernemers.",
        href: "https://ondernemersplein.overheid.nl/subsidies-en-regelingen/mkb-winstvrijstelling/",
      },
    ],
  },
  {
    id: "auto-importkosten",
    slug: "auto-importkosten-berekenen",
    url: "/auto-importkosten-berekenen/",
    title: "Auto importkosten berekenen",
    shortTitle: "Auto importkosten",
    recommendationTitle: "Auto importkosten",
    description:
      "Bereken een indicatie van de kosten om een auto of camper te importeren naar Nederland. Inclusief bpm, RDW, transport, keuring en kenteken.",
    shortDescription: "Alle kosten voor het importeren van een auto op een rij.",
    category: "Auto",
    secondaryCategories: ["Ondernemen"],
    iconKey: "car",
    keywords: ["auto", "import", "importkosten", "duitsland", "bpm", "rdw", "auto importeren"],
    intents: ["duitse auto", "auto uit duitsland", "auto importeren", "import auto"],
    related: ["btw", "zzp", "bruto-netto", "hypotheek"],
    difficulty: "intermediate",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: true,
    popular: false,
    isNew: true,
    badge: "Nieuw",
    lastUpdated: "2026-07-01",
    question: "Wat kost een auto importeren?",
    quickLinkLabel: "Auto import",
    seo: {
      title: "Auto importkosten berekenen — Auto of camper importeren | Calculatieloket.nl",
      description:
        "Bereken een indicatie van de kosten om een auto of camper te importeren naar Nederland. Inclusief bpm, RDW, transport, keuring en kenteken.",
    },
    schema: {
      howTo: {
        name: "Auto importkosten berekenen",
        description: "Stappen om een indicatie te krijgen van de kosten voor het importeren van een auto of camper naar Nederland.",
        totalTime: "PT2M",
        steps: [
          { name: "Kies voertuigtype en aankoopland", text: "Selecteer auto of camper en het land waar je het voertuig koopt." },
          { name: "Vul de aankoopprijs in", text: "Voer het bedrag in dat je in het buitenland voor het voertuig betaalt." },
          { name: "Vul de geschatte bpm in", text: "Gebruik de officiële bpm-tool van de Belastingdienst om een inschatting te maken." },
          { name: "Vul transport, RDW en keuringskosten in", text: "Voer de verwachte kosten voor transport, kenteken, keuring en exportkenteken in." },
          { name: "Bekijk de totale importkosten", text: "De calculator toont een indicatie van de totale kosten, inclusief een vergelijking met een Nederlandse prijs." },
        ],
      },
    },
    officialSources: [
      {
        label: "RDW",
        title: "Voertuig invoeren vanuit een Europees land",
        description: "Stappen en eisen voor het invoeren van een voertuig uit de EU.",
        href: "https://www.rdw.nl/invoeren-exporteren-doorvoeren/invoeren-binnen-europa",
      },
      {
        label: "RDW",
        title: "Invoeren, exporteren of doorvoeren",
        description: "Overzicht van de RDW-procedures rond in- en uitvoer van voertuigen.",
        href: "https://www.rdw.nl/invoeren-exporteren-doorvoeren",
      },
      {
        label: "Belastingdienst",
        title: "Bpm",
        description: "Algemene informatie over de bpm bij voertuigen.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/bpm",
      },
      {
        label: "Belastingdienst",
        title: "Aangifte bpm bij aanvraag Nederlands kenteken",
        description: "Hoe je bpm-aangifte doet bij een aanvraag voor een Nederlands kenteken.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/online-aangifte-bpm",
      },
      {
        label: "Belastingdienst",
        title: "Hoe kan ik de bpm berekenen?",
        description: "Uitleg over het berekenen van de bpm.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/hoe-bpm-berekenen",
      },
      {
        label: "Belastingdienst",
        title: "Bpm berekenen voor een personenauto",
        description: "Berekeningswijze van de bpm voor personenauto's.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/personenauto-bpm-tarief-berekenen",
      },
      {
        label: "Belastingdienst",
        title: "Hoe bereken ik de bpm voor een kampeerauto?",
        description: "Berekeningswijze van de bpm voor kampeerauto's.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/kampeerauto-bpm-tarief-berekenen",
      },
      {
        label: "Rijksoverheid",
        title: "Auto uit het buitenland importeren",
        description: "Algemene uitleg over het importeren van een auto naar Nederland.",
        href: "https://www.rijksoverheid.nl/vraag-en-antwoord/auto/hoe-kan-ik-een-auto-uit-het-buitenland-in-nederland-importeren-invoeren",
      },
    ],
  },
  {
    id: "btw",
    slug: "btw-calculator",
    url: "/btw-calculator/",
    title: "BTW calculator",
    shortTitle: "BTW berekenen",
    recommendationTitle: "BTW Calculator",
    description: "Bereken btw inclusief of exclusief met 21%, 9% of 0% tarief. Zie direct bedrag exclusief, btw-bedrag en inclusief. Gebaseerd op Belastingdienst tarieven.",
    shortDescription: "Bereken 21%, 9% of 0% btw, exclusief en inclusief.",
    category: "Belasting",
    iconKey: "calc",
    keywords: ["btw", "belasting", "21", "9", "exclusief", "inclusief", "omrekenen"],
    intents: ["minder belasting", "btw", "belasting", "btw berekenen"],
    related: ["btw-terugrekenen", "btw-inclusief-exclusief", "zzp", "auto-importkosten"],
    difficulty: "beginner",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: true,
    popular: true,
    isNew: false,
    badge: "Populair",
    lastUpdated: "2026-07-01",
    question: "Hoeveel btw moet ik berekenen?",
    quickLinkLabel: "BTW",
    seo: {
      title: "BTW Calculator — Bereken 21%, 9% en 0% btw | Calculatieloket.nl",
      description: "Bereken btw inclusief of exclusief met 21%, 9% of 0% tarief. Zie direct bedrag exclusief, btw-bedrag en inclusief. Gebaseerd op Belastingdienst tarieven.",
    },
    schema: {
      howTo: {
        name: "BTW berekenen over een bedrag",
        description: "Stappen om btw te berekenen over een bedrag in 2026.",
        totalTime: "PT30S",
        steps: [
          { name: "Vul het bedrag in", text: "Voer het bedrag in waarover je btw wilt berekenen." },
          { name: "Kies het btw-tarief", text: "Selecteer 21%, 9% of 0% btw." },
          { name: "Kies de richting", text: "Kies of je van exclusief naar inclusief wilt rekenen, of andersom." },
          { name: "Bekijk het resultaat", text: "De calculator toont het bedrag exclusief, het btw-bedrag en het bedrag inclusief." },
        ],
      },
    },
    officialSources: [
      {
        label: "Officiële bron",
        title: "Belastingdienst — BTW-tarieven",
        description: "Actuele btw-tarieven: 21%, 9% en 0%.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/btw_tarief/btw_tarief",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Rekenvoorbeeld btw berekenen",
        description: "Voorbeelden van btw berekenen inclusief en exclusief.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/rekenvoorbeeld_btw_berekenen",
      },
    ],
  },
  {
    id: "btw-terugrekenen",
    slug: "btw-terugrekenen",
    url: "/btw-terugrekenen/",
    title: "BTW terugrekenen",
    shortTitle: "BTW terugrekenen",
    recommendationTitle: "BTW terugrekenen",
    description: "Reken btw terug van inclusief naar exclusief. Kies 21%, 9% of 0% btw en zie direct het exclusieve bedrag en het btw-bedrag. Gebaseerd op officiële tarieven.",
    shortDescription: "Reken snel een inclusief bedrag om naar exclusief.",
    category: "Belasting",
    iconKey: "percent",
    keywords: ["btw", "terugrekenen", "inclusief", "exclusief", "belasting"],
    intents: ["minder belasting", "btw terugrekenen", "inclusief exclusief"],
    related: ["btw", "btw-inclusief-exclusief", "zzp", "auto-importkosten"],
    difficulty: "beginner",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: false,
    popular: false,
    isNew: false,
    lastUpdated: "2026-07-02",
    seo: {
      title: "BTW terugrekenen — van inclusief naar exclusief | Calculatieloket.nl",
      description: "Reken btw terug van inclusief naar exclusief. Kies 21%, 9% of 0% btw en zie direct het exclusieve bedrag en het btw-bedrag. Gebaseerd op officiële tarieven.",
    },
    schema: {
      howTo: {
        name: "BTW terugrekenen van inclusief naar exclusief",
        description: "Stappen om btw terug te rekenen van een inclusief bedrag naar een exclusief bedrag.",
        totalTime: "PT30S",
        steps: [
          { name: "Vul het bedrag inclusief btw in", text: "Voer het totaalbedrag inclusief btw in." },
          { name: "Kies het btw-tarief", text: "Selecteer 21%, 9% of 0% btw." },
          { name: "Bekijk het exclusieve bedrag", text: "De calculator toont het bedrag exclusief btw en het btw-bedrag." },
        ],
      },
    },
    officialSources: [
      {
        label: "Officiële bron",
        title: "Belastingdienst — BTW-tarieven",
        description: "Actuele btw-tarieven: 21%, 9% en 0%.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/btw_tarief/btw_tarief",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Rekenvoorbeeld btw berekenen",
        description: "Voorbeelden van btw berekenen inclusief en exclusief.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/rekenvoorbeeld_btw_berekenen",
      },
    ],
  },
  {
    id: "btw-inclusief-exclusief",
    slug: "btw-inclusief-exclusief",
    url: "/btw-inclusief-exclusief/",
    title: "BTW inclusief/exclusief",
    shortTitle: "BTW inclusief/exclusief",
    recommendationTitle: "BTW inclusief/exclusief",
    description: "Bereken btw inclusief en exclusief met 21%, 9% of 0% tarief. Zie direct bedrag exclusief, btw-bedrag en inclusief. Gebaseerd op Belastingdienst tarieven.",
    shortDescription: "Omrekenen in beide richtingen met alle gangbare tarieven.",
    category: "Belasting",
    iconKey: "switch",
    keywords: ["btw", "inclusief", "exclusief", "omrekenen", "belasting"],
    intents: ["minder belasting", "btw inclusief exclusief", "inclusief exclusief"],
    related: ["btw", "btw-terugrekenen", "zzp", "auto-importkosten"],
    difficulty: "beginner",
    country: "NL",
    language: "nl",
    status: "active",
    year: 2026,
    featured: false,
    popular: false,
    isNew: false,
    lastUpdated: "2026-07-02",
    seo: {
      title: "BTW inclusief en exclusief berekenen — 21%, 9% en 0% | Calculatieloket.nl",
      description: "Bereken btw inclusief en exclusief met 21%, 9% of 0% tarief. Zie direct bedrag exclusief, btw-bedrag en inclusief. Gebaseerd op Belastingdienst tarieven.",
    },
    schema: {
      howTo: {
        name: "BTW inclusief en exclusief berekenen",
        description: "Stappen om btw te berekenen tussen exclusief en inclusief bedragen.",
        totalTime: "PT30S",
        steps: [
          { name: "Vul het bedrag in", text: "Voer het bedrag in dat je wilt omrekenen." },
          { name: "Kies de richting", text: "Kies of je van exclusief naar inclusief of andersom wilt rekenen." },
          { name: "Kies het btw-tarief", text: "Selecteer 21%, 9% of 0% btw." },
          { name: "Bekijk beide bedragen", text: "De calculator toont het bedrag exclusief, het btw-bedrag en het bedrag inclusief." },
        ],
      },
    },
    officialSources: [
      {
        label: "Officiële bron",
        title: "Belastingdienst — BTW-tarieven",
        description: "Actuele btw-tarieven: 21%, 9% en 0%.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/btw_tarief/btw_tarief",
      },
      {
        label: "Officiële bron",
        title: "Belastingdienst — Rekenvoorbeeld btw berekenen",
        description: "Voorbeelden van btw berekenen inclusief en exclusief.",
        href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/rekenvoorbeeld_btw_berekenen",
      },
    ],
  },
];

// ============================================================================
// Helpers
// ============================================================================

export function getActiveCalculators(): CalculatorDefinition[] {
  return calculators.filter((c) => c.status === "active");
}

export function getCalculatorById(id: string): CalculatorDefinition | undefined {
  return calculators.find((c) => c.id === id);
}

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorByUrl(url: string): CalculatorDefinition | undefined {
  return calculators.find((c) => c.url === url);
}

export function getCategoryById(id: string): CalculatorCategory | undefined {
  return calculatorCategories.find((c) => c.id === id);
}

export function getCategories(): (CalculatorCategory & { icon: string })[] {
  return calculatorCategories.map((category) => ({
    ...category,
    icon: icons[category.iconKey] ?? icons.calc,
  }));
}

export function getCategoryList(): CategoryListItem[] {
  return calculatorCategories
    .filter((c) => c.hasPage)
    .map(({ id, label, href }) => ({ id, label, href }));
}

export function getHomeCategories(): HomeCategoryItem[] {
  return calculatorCategories
    .filter((c) => c.showOnHome)
    .map((category) => ({
      id: category.id,
      label: category.label,
      href: category.href,
      icon: icons[category.iconKey] ?? icons.calc,
    }));
}

export function getCalculatorsByCategory(categoryId: string): CalculatorDefinition[] {
  return getActiveCalculators().filter(
    (c) => c.category === categoryId || c.secondaryCategories?.includes(categoryId),
  );
}

export function getFeaturedCalculators(): CalculatorDefinition[] {
  return getActiveCalculators().filter((c) => c.featured);
}

export function getPopularCalculators(): CalculatorDefinition[] {
  return getActiveCalculators().filter((c) => c.popular);
}

export function getNewCalculators(): CalculatorDefinition[] {
  return getActiveCalculators().filter((c) => c.isNew);
}

const FEATURED_CARD_ORDER = [
  "bruto-netto",
  "btw",
  "hypotheek",
  "toeslagen",
  "zzp",
  "auto-importkosten",
];

export function getFeaturedCards(): FeaturedCardItem[] {
  const featured = getActiveCalculators().filter((c) => c.featured);
  return FEATURED_CARD_ORDER.map((id) => featured.find((c) => c.id === id))
    .filter((c): c is CalculatorDefinition => c !== undefined)
    .map((c) => ({
      id: c.id,
      title: c.shortTitle,
      href: c.url,
      keywords: c.keywords.join(" "),
      icon: icons[c.iconKey] ?? icons.calc,
      accent: getCategoryById(c.category)?.accent ?? "#2563eb",
      question: c.question ?? "",
    }));
}

const QUICK_LINK_ORDER = [
  "bruto-netto",
  "btw",
  "hypotheek",
  "toeslagen",
  "zzp",
  "auto-importkosten",
];

export function getQuickLinks(): QuickLinkItem[] {
  return QUICK_LINK_ORDER.map((id) => getCalculatorById(id))
    .filter((c): c is CalculatorDefinition => c !== undefined && c.quickLinkLabel)
    .map((c) => ({
      label: c.quickLinkLabel!,
      href: c.url,
    }));
}

function getCategoryAccent(calculator: CalculatorDefinition): string {
  return getCategoryById(calculator.category)?.accent ?? "#2563eb";
}

function getBadge(calculator: CalculatorDefinition): string | undefined {
  return calculator.badge ?? (calculator.isNew ? "Nieuw" : calculator.popular ? "Populair" : undefined);
}

export function toCategoryGridItem(calculator: CalculatorDefinition): CalculatorGridItem {
  return {
    title: calculator.title,
    href: calculator.url,
    description: calculator.shortDescription,
    badge: getBadge(calculator),
    icon: icons[calculator.iconKey] ?? icons.calc,
    accent: getCategoryAccent(calculator),
  };
}

export function getCalculatorGroupsForHub(): CalculatorHubGroup[] {
  return getCategoryList().map((category) => ({
    category: category.label,
    accent: getCategoryById(category.id)?.accent ?? "#2563eb",
    items: getCalculatorsByCategory(category.id).map(toCategoryGridItem),
  }));
}

export function getSearchIndex(): SearchItem[] {
  return getActiveCalculators().map((calculator) => ({
    title: calculator.title,
    url: calculator.url,
    keywords: calculator.keywords,
    category: calculator.category,
    description: calculator.shortDescription,
    intents: calculator.intents,
    icon: calculator.iconKey,
  }));
}

export function getSearchIcons(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const calculator of getActiveCalculators()) {
    map[calculator.iconKey] = icons[calculator.iconKey] ?? icons.calc;
  }
  return map;
}

export function getRecommendationIcon(id: string, title: string): string {
  const calc = getCalculatorById(id);
  if (calc) return icons[calc.iconKey] ?? icons.calc;
  const key = `${id} ${title}`.toLowerCase();
  if (key.includes("vakantiegeld") || key.includes("vakantie")) return icons.sun;
  if (key.includes("hypotheek") || key.includes("wonen") || key.includes("huis")) return icons.house;
  if (key.includes("salaris") || key.includes("netto") || key.includes("bruto") || key.includes("loon")) return icons.money;
  if (key.includes("zzp") || key.includes("ondernemen") || key.includes("bedrijf") || key.includes("zzp'er")) return icons.person;
  if (key.includes("auto") || key.includes("import") || key.includes("car") || key.includes("voertuig")) return icons.car;
  if (key.includes("btw") || key.includes("tarief") || key.includes("percent") || key.includes("percentage")) return icons.percent;
  if (key.includes("toeslagen") || key.includes("zorgtoeslag") || key.includes("huurtoeslag")) return icons.house;
  return icons.calc;
}

export function recommendationFromRegistry(
  calculatorId: string,
  overrides: {
    id?: string;
    title?: string;
    description?: string;
    url?: string;
    priority: number;
    reason: string;
  },
): Recommendation {
  const calc = getCalculatorById(calculatorId);
  if (!calc) {
    throw new Error(`Calculator "${calculatorId}" not found in registry.`);
  }
  return {
    id: overrides.id ?? calc.id,
    title: overrides.title ?? calc.recommendationTitle ?? calc.shortTitle ?? calc.title,
    description: overrides.description ?? calc.description,
    url: overrides.url ?? calc.url,
    priority: overrides.priority,
    reason: overrides.reason,
  };
}
