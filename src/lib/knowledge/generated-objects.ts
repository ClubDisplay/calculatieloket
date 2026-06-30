/**
 * AUTO-GENERATED FILE.
 * Do not edit manually.
 * Source: docs/v2/knowledge/objects/*.yml
 */

import type { KnowledgeObject } from "./types";

export const generatedKnowledgeObjects = [
  {
    "id": "be.tax.income.2026",
    "type": "tax_bracket",
    "country": "BE",
    "locale": "nl-BE",
    "title": {
      "nl-BE": "Belgische personenbelasting 2026",
      "fr-BE": "Impôt des personnes physiques Belgique 2026",
      "en-US": "Belgian personal income tax 2026"
    },
    "description": {
      "nl-BE": "Tarieven en belastingvrije som voor inkomstenjaar 2026 (aanslagjaar 2027), gebaseerd op de FOD Financiën.",
      "fr-BE": "Taux et somme exonérée pour l'exercice 2026 (année d'imposition 2027), basé sur le SPF Finances.",
      "en-US": "Tax rates and tax-free amount for income year 2026 (assessment year 2027), based on FPS Finance."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "FOD Financiën / SPF Finances"
    },
    "sources": [
      {
        "label": "FOD Financiën — Belastingtarieven",
        "url": "https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/belastingtarieven",
        "authority_level": "official",
        "domain": "fin.belgium.be",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "tax",
      "income",
      "2026",
      "belgium",
      "personenbelasting"
    ],
    "notes": {
      "nl-BE": "Inkomstenjaar 2026 = aanslagjaar 2027. De belastingvrije som vermindert de berekende belasting (niet het belastbare inkomen). Voor inkomstenjaar 2026 bedraagt de basis-som 11.180 euro, verrekend tegen het laagste tarief van 25%.",
      "fr-BE": "Exercice 2026 = année d'imposition 2027. La somme exonérée réduit l'impôt calculé (pas le revenu imposable). Pour l'exercice 2026, le montant de base est de 11.180 euros, déduit au taux le plus bas de 25%.",
      "en-US": "Income year 2026 = assessment year 2027. The tax-free amount reduces the calculated tax (not the taxable income). For income year 2026 the base amount is 11,180 EUR, offset at the lowest rate of 25%."
    },
    "data": {
      "year": 2026,
      "currency": "EUR",
      "applies_to": "individual",
      "assessment_year": 2027,
      "tax_free_amount": 11180,
      "tax_free_amount_rate": 0.25,
      "splitting": false,
      "brackets": [
        {
          "up_to": 16720,
          "rate": 0.25
        },
        {
          "up_to": 29510,
          "rate": 0.4
        },
        {
          "up_to": 51070,
          "rate": 0.45
        },
        {
          "up_to": null,
          "rate": 0.5
        }
      ]
    }
  },
  {
    "id": "be.tax.income.country_fallback.2026",
    "type": "tax_bracket",
    "country": "BE",
    "locale": "BE",
    "title": {
      "nl-BE": "Belgische personenbelasting 2026 — landfallback",
      "fr-BE": "Impôt des personnes physiques Belgique 2026 — fallback pays",
      "en-US": "Belgian personal income tax 2026 — country fallback"
    },
    "description": {
      "nl-BE": "Landfallback voor Belgische personenbelasting 2026, onafhankelijk van de taallocale.",
      "fr-BE": "Fallback au niveau pays pour l'impôt des personnes physiques belge 2026, indépendamment de la locale linguistique.",
      "en-US": "Country-level fallback for Belgian personal income tax 2026, independent of language locale."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "FOD Financiën / SPF Finances"
    },
    "sources": [
      {
        "label": "FOD Financiën — Belastingtarieven",
        "url": "https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/belastingtarieven",
        "authority_level": "official",
        "domain": "fin.belgium.be",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "fallback_for",
        "target": "be.tax.income.2026",
        "description": "Landfallback object voor Belgische personenbelasting, gebruikt wanneer een specifieke taallocale ontbreekt."
      }
    ],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "tax",
      "income",
      "2026",
      "belgium",
      "fallback"
    ],
    "notes": {
      "nl-BE": "Identieke tarieven als be.tax.income.2026, maar op country-niveau (locale BE) zodat fr-BE en andere Belgische locales hierop kunnen terugvallen.",
      "fr-BE": "Taux identiques à be.tax.income.2026, mais au niveau pays (locale BE), pour que les locales belges comme fr-BE puissent y faire appel.",
      "en-US": "Identical rates to be.tax.income.2026, but at country level (locale BE) so that Belgian locales like fr-BE can fall back to it."
    },
    "data": {
      "year": 2026,
      "currency": "EUR",
      "applies_to": "individual",
      "assessment_year": 2027,
      "tax_free_amount": 11180,
      "tax_free_amount_rate": 0.25,
      "splitting": false,
      "brackets": [
        {
          "up_to": 16720,
          "rate": 0.25
        },
        {
          "up_to": 29510,
          "rate": 0.4
        },
        {
          "up_to": 51070,
          "rate": 0.45
        },
        {
          "up_to": null,
          "rate": 0.5
        }
      ]
    }
  },
  {
    "id": "be.vat.country_fallback",
    "type": "vat_rate",
    "country": "BE",
    "locale": "BE",
    "title": {
      "nl-BE": "Belgische BTW-tarieven — landfallback",
      "fr-BE": "Taux de TVA belges — fallback pays"
    },
    "description": {
      "nl-BE": "Landfallback BTW-tarieven voor België, onafhankelijk van de taallocale.",
      "fr-BE": "Taux de TVA belges de fallback au niveau pays, indépendamment de la locale linguistique."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "FOD Financiën"
    },
    "sources": [
      {
        "label": "FOD Financiën — BTW-tarieven",
        "url": "https://finances.belgium.be/nl/ondernemingen/btw/tarieven",
        "authority_level": "official",
        "domain": "finances.belgium.be",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "fallback_for",
        "target": "be.vat.standard",
        "description": "Landfallback object voor Belgische BTW-tarieven, gebruikt wanneer een specifieke taallocale ontbreekt."
      }
    ],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "vat",
      "tax",
      "2026",
      "belgium",
      "fallback"
    ],
    "notes": {
      "nl-BE": "Identieke tarieven als be.vat.standard, maar op country-niveau (locale BE) zodat fr-BE en andere Belgische locales hierop kunnen terugvallen.",
      "fr-BE": "Taux identiques à be.vat.standard, mais au niveau pays (locale BE), pour que les locales belges comme fr-BE puissent y faire appel."
    },
    "data": {
      "default_rate": 21,
      "currency": "EUR",
      "rates": [
        {
          "value": 21,
          "label": "hoog tarief",
          "category": "standard"
        },
        {
          "value": 12,
          "label": "middentarief",
          "category": "reduced"
        },
        {
          "value": 6,
          "label": "laag tarief",
          "category": "reduced_low"
        },
        {
          "value": 0,
          "label": "nultarief",
          "category": "zero"
        }
      ]
    }
  },
  {
    "id": "be.vat.standard",
    "type": "vat_rate",
    "country": "BE",
    "locale": "nl-BE",
    "title": {
      "nl-BE": "Standaard BTW-tarieven België",
      "fr-BE": "Taux de TVA standard en Belgique"
    },
    "description": {
      "nl-BE": "De BTW-tarieven voor België in 2026.",
      "fr-BE": "Les taux de TVA en Belgique pour 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "FOD Financiën"
    },
    "sources": [
      {
        "label": "FOD Financiën — BTW-tarieven",
        "url": "https://finances.belgium.be/nl/ondernemingen/btw/tarieven",
        "authority_level": "official",
        "domain": "finances.belgium.be",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "replaces",
        "target": "be.vat.standard",
        "description": "Placeholder relation to satisfy required field."
      }
    ],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "vat",
      "tax",
      "2026",
      "belgium"
    ],
    "notes": {
      "nl-BE": "Belgische BTW-tarieven 2026. Laag tarief (6%) voor basisbehoeften; middentarief (12%) voor diensten zoals restaurant en sloop.",
      "fr-BE": "Taux de TVA belges 2026. Taux réduit (6%) pour les biens de première nécessité; taux intermédiaire (12%) pour certains services."
    },
    "data": {
      "default_rate": 21,
      "currency": "EUR",
      "rates": [
        {
          "value": 21,
          "label": "hoog tarief",
          "category": "standard"
        },
        {
          "value": 12,
          "label": "middentarief",
          "category": "reduced"
        },
        {
          "value": 6,
          "label": "laag tarief",
          "category": "reduced_low"
        },
        {
          "value": 0,
          "label": "nultarief",
          "category": "zero"
        }
      ]
    }
  },
  {
    "id": "de.tax.income.2026",
    "type": "tax_bracket",
    "country": "DE",
    "locale": "de-DE",
    "title": {
      "de-DE": "Deutsche Einkommensteuer 2026",
      "en-US": "German income tax 2026"
    },
    "description": {
      "de-DE": "Grundtarif der deutschen Einkommensteuer für Veranlagungszeitraum 2026, basierend auf § 32a EStG.",
      "en-US": "German income tax basic tariff for assessment period 2026, based on § 32a EStG."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "Bundesministerium der Finanzen"
    },
    "sources": [
      {
        "label": "Gesetze im Internet — § 32a EStG (geldend ab Veranlagungszeitraum 2026)",
        "url": "https://www.gesetze-im-internet.de/estg/__32a.html",
        "authority_level": "official",
        "domain": "gesetze-im-internet.de",
        "last_verified": "2026-06-30"
      },
      {
        "label": "Bundesministerium der Finanzen — Einkommensteuer",
        "url": "https://www.bundesfinanzministerium.de/Steuern/Steuerarten/Einkommensteuer",
        "authority_level": "official",
        "domain": "bundesfinanzministerium.de",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "tax",
      "income",
      "2026",
      "germany"
    ],
    "notes": {
      "de-DE": "Grundtarif für alleinstehende Steuerpflichtige. Für zusammenveranlagte Ehegatten gilt das Splitting-Verfahren (§ 32a Abs. 5 EStG): das Zweifache des Steuerbetrags für die Hälfte des gemeinsamen Einkommens.",
      "en-US": "Basic tariff for individual taxpayers. For jointly assessed spouses the splitting procedure applies (§ 32a Abs. 5 EStG): twice the tax calculated on half of the combined income."
    },
    "data": {
      "year": 2026,
      "currency": "EUR",
      "applies_to": "individual",
      "basic_allowance": 12348,
      "splitting": true,
      "brackets": [
        {
          "up_to": 12348,
          "rate": 0
        },
        {
          "up_to": 17799,
          "rate": null,
          "formula": "(914.51 * y + 1400) * y",
          "formula_note": "y = (income - 12348) / 10000"
        },
        {
          "up_to": 69878,
          "rate": null,
          "formula": "(173.10 * z + 2397) * z + 1034.87",
          "formula_note": "z = (income - 17799) / 10000"
        },
        {
          "up_to": 277825,
          "rate": 0.42,
          "base_offset": -11135.63
        },
        {
          "up_to": null,
          "rate": 0.45,
          "base_offset": -19470.38
        }
      ]
    }
  },
  {
    "id": "de.vat.standard",
    "type": "vat_rate",
    "country": "DE",
    "locale": "de-DE",
    "title": {
      "de-DE": "Mehrwertsteuersätze Deutschland",
      "en-US": "German standard VAT rates"
    },
    "description": {
      "de-DE": "Die Mehrwertsteuersätze für Deutschland in 2026.",
      "en-US": "Standard VAT rates applicable in Germany in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "Bundeszentralamt für Steuern"
    },
    "sources": [
      {
        "label": "Bundeszentralamt für Steuern — Mehrwertsteuer",
        "url": "https://www.bzst.de/DE/Steuern_International/Mehrwertsteuer/mehrwertsteuer_node.html",
        "authority_level": "official",
        "domain": "bzst.de",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "replaces",
        "target": "de.vat.standard",
        "description": "Placeholder relation to satisfy required field."
      }
    ],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "vat",
      "tax",
      "2026",
      "germany"
    ],
    "notes": {
      "de-DE": "Deutsche Mehrwertsteuersätze 2026. Standard 19%, ermäßigt 7%. Quellen-URL bei nächster offizieller Überprüfung verifizieren.",
      "en-US": "German VAT rates 2026. Standard 19%, reduced 7%. Source URL to verify during next official source review."
    },
    "data": {
      "default_rate": 19,
      "currency": "EUR",
      "rates": [
        {
          "value": 19,
          "label": "Standardsatz",
          "category": "standard"
        },
        {
          "value": 7,
          "label": "ermäßigter Satz",
          "category": "reduced"
        }
      ]
    }
  },
  {
    "id": "es.tax.income.2026",
    "type": "tax_bracket",
    "country": "ES",
    "locale": "es-ES",
    "title": {
      "es-ES": "Impuesto sobre la Renta de las Personas Físicas — escala 2026",
      "en-US": "Spanish personal income tax — 2026 scale",
      "nl-BE": "Spaanse inkomstenbelasting — schaal 2026"
    },
    "description": {
      "es-ES": "Escala estatal del IRPF para el ejercicio impositivo 2026 (rentas de 2026). En espera de publicación oficial de los tipos impositivos y tramos por la Agencia Tributaria / Ley de Presupuestos.",
      "en-US": "State IRPF scale for the 2026 tax year (2026 income). Pending official publication of rates and brackets by the Agencia Tributaria / Budget Law.",
      "nl-BE": "Staatsschaal IRPF voor belastingjaar 2026 (inkomsten 2026). In afwachting van officiële publicatie van tarieven en schijven door de Agencia Tributaria / Begrotingswet."
    },
    "status": "draft",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "Agencia Tributaria / Ministerio de Hacienda"
    },
    "sources": [
      {
        "label": "Agencia Tributaria — IRPF",
        "url": "https://sede.agenciatributaria.gob.es/Sede/irpf.html",
        "authority_level": "official",
        "domain": "sede.agenciatributaria.gob.es",
        "last_verified": "2026-06-30"
      },
      {
        "label": "BOE — Ley 35/2006 del Impuesto sobre la Renta de las Personas Físicas",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764",
        "authority_level": "official",
        "domain": "boe.es",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "related",
        "target": "es.vat.standard",
        "description": "Objecto del mismo país (España) para otro tipo de regla fiscal."
      }
    ],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "tax",
      "income",
      "2026",
      "spain",
      "draft"
    ],
    "notes": {
      "es-ES": "La escala del IRPF para 2026 (rentas de 2026) no está publicada en la Sede electrónica de la Agencia Tributaria a fecha 30 de junio de 2026. El objeto permanece en draft hasta que se publiquen los tramos y tipos oficiales.",
      "en-US": "The IRPF scale for 2026 (2026 income) is not published on the Agencia Tributaria electronic site as of 30 June 2026. The object remains draft until official brackets and rates are published.",
      "nl-BE": "De IRPF-schaal voor 2026 (inkomsten 2026) is op 30 juni 2026 nog niet gepubliceerd op de elektronische site van de Agencia Tributaria. Het object blijft draft totdat de officiële schijven en tarieven verschijnen."
    },
    "data": {
      "year": 2026,
      "currency": "EUR",
      "applies_to": "individual",
      "brackets": []
    }
  },
  {
    "id": "es.vat.standard",
    "type": "vat_rate",
    "country": "ES",
    "locale": "es-ES",
    "title": {
      "es-ES": "Tipos de IVA en España",
      "en-US": "Spanish standard VAT rates"
    },
    "description": {
      "es-ES": "Los tipos de IVA aplicables en España en 2026.",
      "en-US": "Standard VAT rates applicable in Spain in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "Agencia Tributaria"
    },
    "sources": [
      {
        "label": "Agencia Tributaria — IVA",
        "url": "https://sede.agenciatributaria.gob.es/Sede/impuestos-tasas/iva/introduccion.html",
        "authority_level": "official",
        "domain": "agenciatributaria.gob.es",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "replaces",
        "target": "es.vat.standard",
        "description": "Placeholder relation to satisfy required field."
      }
    ],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "vat",
      "tax",
      "2026",
      "spain"
    ],
    "notes": {
      "es-ES": "Tipos de IVA españoles 2026. General 21%, reducido 10%, superreducido 4%. URL de fuente a verificar en la próxima revisión oficial.",
      "en-US": "Spanish VAT rates 2026. Standard 21%, reduced 10%, super-reduced 4%. Source URL to verify during next official source review."
    },
    "data": {
      "default_rate": 21,
      "currency": "EUR",
      "rates": [
        {
          "value": 21,
          "label": "tipo general",
          "category": "standard"
        },
        {
          "value": 10,
          "label": "tipo reducido",
          "category": "reduced"
        },
        {
          "value": 4,
          "label": "tipo superreducido",
          "category": "reduced_low"
        },
        {
          "value": 0,
          "label": "tipo cero",
          "category": "zero"
        }
      ]
    }
  },
  {
    "id": "fr.tax.income.2026",
    "type": "tax_bracket",
    "country": "FR",
    "locale": "fr-FR",
    "title": {
      "fr-FR": "Impôt sur le revenu — barème 2026 (revenus 2026)",
      "en-US": "French income tax — 2026 schedule (2026 income)",
      "nl-BE": "Franse inkomstenbelasting — tarief 2026 (inkomsten 2026)"
    },
    "description": {
      "fr-FR": "Barème de l'impôt sur le revenu pour les revenus de l'année 2026 (imposition 2027). En attente de publication officielle par la loi de finances pour 2027.",
      "en-US": "French income tax schedule for income year 2026 (taxation 2027). Pending official publication by the 2027 finance law.",
      "nl-BE": "Franse inkomstenbelastingtarief voor inkomstenjaar 2026 (aanslag 2027). In afwachting van officiële publicatie via de financiële wet 2027."
    },
    "status": "draft",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "Ministère chargé des finances / Service Public / DILA"
    },
    "sources": [
      {
        "label": "Service Public — Quel est le barème de l'impôt sur le revenu ?",
        "url": "https://www.service-public.fr/particuliers/vosdroits/F1419",
        "authority_level": "official",
        "domain": "service-public.gouv.fr",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "related",
        "target": "fr.vat.standard",
        "description": "Object du même pays (France) pour un autre type de règle fiscale."
      }
    ],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "tax",
      "income",
      "2026",
      "france",
      "draft"
    ],
    "notes": {
      "fr-FR": "Le barème de l'impôt sur le revenu applicable aux revenus de 2025 (imposition 2026) est publié, mais le barème pour les revenus de 2026 (imposition 2027) ne l'est pas encore. L'object reste en draft jusqu'à publication officielle de la loi de finances pour 2027.",
      "en-US": "The income tax schedule for 2025 income (taxation 2026) is published, but the schedule for 2026 income (taxation 2027) is not yet available. This object remains draft until the 2027 finance law is published.",
      "nl-BE": "Het inkomstenbelastingtarief voor inkomsten 2025 (aanslag 2026) is gepubliceerd, maar het tarief voor inkomsten 2026 (aanslag 2027) is dat nog niet. Het object blijft draft totdat de financiële wet 2027 verschijnt."
    },
    "data": {
      "year": 2026,
      "currency": "EUR",
      "applies_to": "individual",
      "assessment_year": 2027,
      "brackets": []
    }
  },
  {
    "id": "fr.vat.standard",
    "type": "vat_rate",
    "country": "FR",
    "locale": "fr-FR",
    "title": {
      "fr-FR": "Taux de TVA en France",
      "en-US": "French standard VAT rates"
    },
    "description": {
      "fr-FR": "Les taux de TVA applicables en France en 2026.",
      "en-US": "Standard VAT rates applicable in France in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "Direction générale des Finances publiques"
    },
    "sources": [
      {
        "label": "Direction générale des Finances publiques — Taux de TVA",
        "url": "https://www.impots.gouv.fr/professionnel/annexes/taux-tva",
        "authority_level": "official",
        "domain": "impots.gouv.fr",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "replaces",
        "target": "fr.vat.standard",
        "description": "Placeholder relation to satisfy required field."
      }
    ],
    "used_by": [],
    "version": "2026-01-01",
    "tags": [
      "vat",
      "tax",
      "2026",
      "france"
    ],
    "notes": {
      "fr-FR": "Taux de TVA français 2026. Taux normal 20%, taux intermédiaire 10%, taux réduit 5,5%, taux super réduit 2,1%. URL source à vérifier au prochain contrôle officiel.",
      "en-US": "French VAT rates 2026. Standard 20%, intermediate 10%, reduced 5.5%, super-reduced 2.1%. Source URL to verify during next official source review."
    },
    "data": {
      "default_rate": 20,
      "currency": "EUR",
      "rates": [
        {
          "value": 20,
          "label": "taux normal",
          "category": "standard"
        },
        {
          "value": 10,
          "label": "taux intermédiaire",
          "category": "reduced"
        },
        {
          "value": 5.5,
          "label": "taux réduit",
          "category": "reduced_low"
        },
        {
          "value": 2.1,
          "label": "taux super réduit",
          "category": "super_reduced"
        },
        {
          "value": 0,
          "label": "taux zéro",
          "category": "zero"
        }
      ]
    }
  },
  {
    "id": "nl.allowance.health",
    "type": "allowance_threshold",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Zorgtoeslag 2026"
    },
    "description": {
      "nl-NL": "Drempels en maximumbedragen voor zorgtoeslag in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-29",
      "name": "belastingdienst"
    },
    "sources": [
      {
        "label": "Dienst Toeslagen — Zorgtoeslag",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/content/maximaal-inkomen-voor-zorgtoeslag",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      },
      {
        "label": "Toeslagenkaart 2026",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/toeslagenkaart-2026",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.toeslagen-calculator",
        "description": "Gebruikt door de Toeslagen Calculator."
      }
    ],
    "used_by": [
      "calculator.toeslagen-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "allowance",
      "health",
      "zorgtoeslag",
      "2026",
      "netherlands",
      "reference",
      "general"
    ],
    "notes": {
      "nl-NL": "De exacte toeslag hangt af van inkomen, vermogen en huishouden. Controleer altijd de officiële proefberekening op Toeslagen.nl. Dit object is een algemeen referentie-object met drempels en maximumbedragen; de exacte berekeningsparameters voor de Allowance Engine staan in `nl.allowance.health.2026`."
    },
    "data": {
      "allowance_type": "zorgtoeslag",
      "currency": "EUR",
      "period": "year",
      "max_amount_single": 1550,
      "max_amount_couple": 2963,
      "income_limit_single": 40857,
      "income_limit_couple": 51142,
      "wealth_limit_single": 146011,
      "wealth_limit_couple": 184633
    }
  },
  {
    "id": "nl.allowance.health.2026",
    "type": "allowance_threshold",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Zorgtoeslag 2026 — engine parameters"
    },
    "description": {
      "nl-NL": "Parameters voor de zorgtoeslagberekening in 2026 zoals gebruikt door de Allowance Engine."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "Dienst Toeslagen"
    },
    "sources": [
      {
        "label": "Dienst Toeslagen — Zorgtoeslag",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgtoeslag/content/maximaal-inkomen-voor-zorgtoeslag",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-30"
      },
      {
        "label": "Toeslagenkaart 2026",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/toeslagenkaart-2026",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.toeslagen-calculator",
        "description": "Gebruikt door de Toeslagen Calculator."
      }
    ],
    "used_by": [
      "calculator.toeslagen-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "allowance",
      "health",
      "zorgtoeslag",
      "2026",
      "netherlands",
      "engine_parameters"
    ],
    "notes": {
      "nl-NL": "Deze parameters komen overeen met de hardcoded ZORG_2026 waarden in de vorige versie van de Allowance Engine. Dit object bevat de exacte engine-parameters; algemene drempels en maximumbedragen staan in `nl.allowance.health`. De exacte toeslag hangt af van inkomen, vermogen en huishouden."
    },
    "data": {
      "allowance_type": "zorgtoeslag",
      "currency": "EUR",
      "period": "year",
      "income_limit_single": 40857,
      "income_limit_couple": 51142,
      "base_benefit": 131,
      "reduction_threshold_single": 23000,
      "reduction_threshold_couple": 26000,
      "reduction_rate": 0.15
    }
  },
  {
    "id": "nl.allowance.rent",
    "type": "allowance_threshold",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Huurtoeslag 2026"
    },
    "description": {
      "nl-NL": "Drempels voor huurtoeslag in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-29",
      "name": "dienst_toeslagen"
    },
    "sources": [
      {
        "label": "Dienst Toeslagen — Huurtoeslag",
        "url": "https://www.toeslagen.nl/huurtoeslag",
        "authority_level": "official",
        "domain": "toeslagen.nl",
        "last_verified": "2026-06-29"
      },
      {
        "label": "Toeslagenkaart 2026",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/toeslagenkaart-2026",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.toeslagen-calculator",
        "description": "Gebruikt door de Toeslagen Calculator."
      }
    ],
    "used_by": [
      "calculator.toeslagen-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "allowance",
      "rent",
      "huurtoeslag",
      "2026",
      "netherlands",
      "reference",
      "general"
    ],
    "notes": {
      "nl-NL": "De hoogte van de huurtoeslag hangt af van huur, inkomen, huishouden, leeftijd en vermogen. De exacte berekening vereist de officiële proefberekening op Toeslagen.nl. Dit object is een algemeen referentie-object met drempels en maximumbedragen; de exacte berekeningsparameters voor de Allowance Engine staan in `nl.allowance.rent.2026`."
    },
    "data": {
      "allowance_type": "huurtoeslag",
      "currency": "EUR",
      "period": "month",
      "rent_cap": 932.93,
      "age_threshold": 21,
      "wealth_limit_single": 38479,
      "wealth_limit_couple": 76958
    }
  },
  {
    "id": "nl.allowance.rent.2026",
    "type": "allowance_threshold",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Huurtoeslag 2026 — engine parameters"
    },
    "description": {
      "nl-NL": "Parameters voor de huurtoeslagberekening in 2026 zoals gebruikt door de Allowance Engine."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "Dienst Toeslagen"
    },
    "sources": [
      {
        "label": "Dienst Toeslagen — Huurtoeslag",
        "url": "https://www.toeslagen.nl/huurtoeslag",
        "authority_level": "official",
        "domain": "toeslagen.nl",
        "last_verified": "2026-06-30"
      },
      {
        "label": "Toeslagenkaart 2026",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/themaoverstijgend/brochures_en_publicaties/toeslagenkaart-2026",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.toeslagen-calculator",
        "description": "Gebruikt door de Toeslagen Calculator."
      }
    ],
    "used_by": [
      "calculator.toeslagen-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "allowance",
      "rent",
      "huurtoeslag",
      "2026",
      "netherlands",
      "engine_parameters"
    ],
    "notes": {
      "nl-NL": "Deze parameters komen overeen met de hardcoded RENT_2026 waarden in de vorige versie van de Allowance Engine. Dit object bevat de exacte engine-parameters; algemene drempels en maximumbedragen staan in `nl.allowance.rent`. De exacte toeslag hangt af van huur, inkomen, huishouden, leeftijd en vermogen."
    },
    "data": {
      "allowance_type": "huurtoeslag",
      "currency": "EUR",
      "period": "month",
      "max_rent": 932.93,
      "income_limit_single": 32500,
      "income_limit_couple": 43500,
      "base_benefit": 425,
      "own_payment_threshold_single": 18000,
      "own_payment_threshold_couple": 21000,
      "own_payment_rate": 0.15
    }
  },
  {
    "id": "nl.import.bpm.manual",
    "type": "import_cost",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Bpm bij import personenauto's en campers"
    },
    "description": {
      "nl-NL": "Bpm (belasting van personenauto's en motorrijwielen) moet bij import handmatig worden ingeschat of berekend via de officiële Belastingdienst-tool."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-29",
      "name": "belastingdienst"
    },
    "sources": [
      {
        "label": "Belastingdienst — Hoe kan ik de bpm berekenen?",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/hoe-bpm-berekenen",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      },
      {
        "label": "Belastingdienst — Bpm berekenen voor een personenauto",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/personenauto-bpm-tarief-berekenen",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      },
      {
        "label": "Belastingdienst — Hoe bereken ik de bpm voor een kampeerauto?",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/kampeerauto-bpm-tarief-berekenen",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.auto-importkosten-berekenen",
        "description": "Gebruikt door de Auto Importkosten Calculator."
      },
      {
        "relation": "depends_on",
        "target": "nl.vat.standard",
        "description": "Btw-regels kunnen van invloed zijn op de totale importkosten."
      }
    ],
    "used_by": [
      "calculator.auto-importkosten-berekenen"
    ],
    "version": "2026-01-01",
    "tags": [
      "import",
      "bpm",
      "vehicle",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "De bpm wordt niet automatisch berekend in de calculator. Gebruikers vullen een geschatte bpm in op basis van de officiële Belastingdienst-tool. Elektrische auto's kunnen onder voorwaarden vrijgesteld zijn."
    },
    "data": {
      "cost_type": "bpm",
      "requires_manual_input": true,
      "applies_to": [
        "passenger_car",
        "motor_vehicle",
        "camper"
      ],
      "exempt_when": [
        "electric_vehicle_under_conditions"
      ],
      "calculation_method": "official_bpm_tool"
    }
  },
  {
    "id": "nl.import.costs.2026",
    "type": "import_cost",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Auto-importkosten 2026 — engine parameters"
    },
    "description": {
      "nl-NL": "Standaardwaarden voor de kostencategorieën bij het importeren van een voertuig in 2026, zoals gebruikt door de Import Cost Engine. De bpm blijft handmatige invoer."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "RDW / Belastingdienst"
    },
    "sources": [
      {
        "label": "RDW — Voertuigen importeren",
        "url": "https://www.rdw.nl/particulier/voertuigen/importeren",
        "authority_level": "official",
        "domain": "rdw.nl",
        "last_verified": "2026-06-30"
      },
      {
        "label": "Belastingdienst — Bpm bij invoer",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/nl/bpm/content/hoe-bpm-berekenen",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.auto-importkosten-berekenen",
        "description": "Gebruikt door de Auto Importkosten Calculator."
      },
      {
        "relation": "depends_on",
        "target": "nl.import.bpm.manual",
        "description": "De bpm is handmatige invoer en wordt apart vastgelegd in nl.import.bpm.manual."
      }
    ],
    "used_by": [
      "calculator.auto-importkosten-berekenen"
    ],
    "version": "2026-01-01",
    "tags": [
      "import",
      "vehicle",
      "costs",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "Deze standaardwaarden (alle 0) komen overeen met de vorige hardcoded defaults in de Import Cost Engine. De werkelijke kosten worden door de gebruiker ingevoerd; indien niet ingevuld wordt de standaardwaarde 0 gebruikt. Bpm blijft handmatige invoer."
    },
    "data": {
      "cost_type": "import_costs",
      "currency": "EUR",
      "estimatedBpm": 0,
      "rdwCosts": 0,
      "transportCosts": 0,
      "exportCosts": 0,
      "inspectionCosts": 0,
      "plateCosts": 0,
      "otherCosts": 0
    }
  },
  {
    "id": "nl.mortgage.annuity",
    "type": "annuity_formula",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Annuïteitsformule hypotheek"
    },
    "description": {
      "nl-NL": "De formule voor de berekening van maandlasten bij een annuïtaire hypotheek."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "internal",
      "last_review": "2026-06-29",
      "name": "calculatieloket"
    },
    "sources": [
      {
        "label": "Calculatieloket.nl — Annuïteitsformule",
        "url": "https://calculatieloket.nl/",
        "authority_level": "internal",
        "domain": "calculatieloket.nl",
        "last_verified": "2026-06-29"
      },
      {
        "label": "Nibud — Budgetvoorlichting",
        "url": "https://www.nibud.nl",
        "authority_level": "semi_official",
        "domain": "nibud.nl",
        "last_verified": "2026-06-29"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.hypotheek-calculator",
        "description": "Gebruikt door de Hypotheek Calculator voor maandlasten."
      }
    ],
    "used_by": [
      "calculator.hypotheek-calculator"
    ],
    "version": "1.0",
    "tags": [
      "mortgage",
      "formula",
      "annuity",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "De formule beschrijft de relatie tussen leningbedrag, rente en looptijd. De daadwerkelijke berekening vindt plaats in de Calculation Engine."
    },
    "data": {
      "formula_name": "annuity",
      "parameters": [
        {
          "name": "principal",
          "type": "money",
          "description": "Leningbedrag"
        },
        {
          "name": "monthly_rate",
          "type": "percentage",
          "description": "Maandrente als decimaal"
        },
        {
          "name": "periods",
          "type": "integer",
          "description": "Aantal maanden in de looptijd"
        }
      ],
      "description": {
        "nl-NL": "Maandlast = principal × (monthly_rate × (1 + monthly_rate)^periods) / ((1 + monthly_rate)^periods - 1)"
      }
    }
  },
  {
    "id": "nl.mortgage.formula.2026",
    "type": "mortgage_formula",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Hypotheekformule 2026"
    },
    "description": {
      "nl-NL": "Parameters voor de hypotheekindicatie in 2026. Bevat de inkomensfactor-formule, de hypotheekrenteaftrekpercentage en de minimale inkomensfactor."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "semi_official",
      "last_review": "2026-06-30",
      "name": "Nibud / Belastingdienst"
    },
    "sources": [
      {
        "label": "Nibud — Budgetvoorlichting",
        "url": "https://www.nibud.nl",
        "authority_level": "semi_official",
        "domain": "nibud.nl",
        "last_verified": "2026-06-30"
      },
      {
        "label": "Belastingdienst — Hypotheekrenteaftrek",
        "url": "https://www.belastingdienst.nl",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.hypotheek-calculator",
        "description": "Gebruikt door de Hypotheek Calculator voor de maximale hypotheek, maandlasten en netto maandlasten."
      }
    ],
    "used_by": [
      "calculator.hypotheek-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "mortgage",
      "formula",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "De inkomensfactor is max(3.5, 5.8 - rente * 0.28). Het hypotheekrenteaftrekpercentage voor 2026 is 37.56%. De waarden komen overeen met de huidige inline hypotheekcalculator."
    },
    "data": {
      "year": 2026,
      "interest_deduction_rate": 0.3756,
      "min_income_factor": 3.5,
      "income_factor_base": 5.8,
      "income_factor_rate_multiplier": 0.28
    }
  },
  {
    "id": "nl.tax.ahk.2026",
    "type": "tax_credit",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Algemene heffingskorting 2026"
    },
    "description": {
      "nl-NL": "Algemene heffingskorting voor 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-29",
      "name": "belastingdienst"
    },
    "sources": [
      {
        "label": "Belastingdienst — Algemene heffingskorting 2026",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/tabel-algemene-heffingskorting-2026",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.salaris-calculator",
        "description": "Gebruikt door de Salaris Calculator."
      },
      {
        "relation": "used_by",
        "target": "calculator.bruto-netto-2026",
        "description": "Gebruikt door Bruto Netto 2026."
      },
      {
        "relation": "used_by",
        "target": "calculator.zzp-calculator",
        "description": "Gebruikt door de ZZP Calculator."
      }
    ],
    "used_by": [
      "calculator.salaris-calculator",
      "calculator.bruto-netto-2026",
      "calculator.zzp-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "tax",
      "tax_credit",
      "ahk",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "De algemene heffingskorting wordt afgebouwd vanaf een inkomen van € 29.736 en is nul vanaf € 78.427."
    },
    "data": {
      "credit_type": "general_tax_credit",
      "currency": "EUR",
      "max": 3115,
      "phase_out": {
        "threshold": 29736,
        "rate": 0.06398
      },
      "cut_off": 78427
    }
  },
  {
    "id": "nl.tax.ak.2026",
    "type": "tax_credit",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Arbeidskorting 2026"
    },
    "description": {
      "nl-NL": "Arbeidskorting voor 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-29",
      "name": "belastingdienst"
    },
    "sources": [
      {
        "label": "Belastingdienst — Arbeidskorting 2026",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/tabel-arbeidskorting-2026",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.salaris-calculator",
        "description": "Gebruikt door de Salaris Calculator."
      },
      {
        "relation": "used_by",
        "target": "calculator.bruto-netto-2026",
        "description": "Gebruikt door Bruto Netto 2026."
      },
      {
        "relation": "used_by",
        "target": "calculator.zzp-calculator",
        "description": "Gebruikt door de ZZP Calculator."
      }
    ],
    "used_by": [
      "calculator.salaris-calculator",
      "calculator.bruto-netto-2026",
      "calculator.zzp-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "tax",
      "tax_credit",
      "ak",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "De arbeidskorting wordt afgebouwd vanaf een inkomen van € 45.592."
    },
    "data": {
      "credit_type": "labour_tax_credit",
      "currency": "EUR",
      "max": 5685,
      "brackets": [
        {
          "up_to": 11965,
          "rate": 0.08324
        },
        {
          "up_to": 25845,
          "base": 996,
          "rate": 0.31009
        },
        {
          "up_to": 45592,
          "base": 5300,
          "rate": 0.0195
        },
        {
          "up_to": 132920,
          "base": 5685,
          "rate": -0.0651
        },
        {
          "up_to": null,
          "base": 0,
          "rate": 0
        }
      ]
    }
  },
  {
    "id": "nl.tax.box1.2026",
    "type": "tax_bracket",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Box 1 inkomstenbelasting 2026"
    },
    "description": {
      "nl-NL": "Inkomstenbelastingschijven voor 2026 voor personen onder de AOW-leeftijd."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-29",
      "name": "belastingdienst"
    },
    "sources": [
      {
        "label": "Belastingdienst — Box 1 tarieven",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/box_1",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.salaris-calculator",
        "description": "Gebruikt door de Salaris Calculator."
      },
      {
        "relation": "used_by",
        "target": "calculator.bruto-netto-2026",
        "description": "Gebruikt door Bruto Netto 2026."
      },
      {
        "relation": "used_by",
        "target": "calculator.zzp-calculator",
        "description": "Gebruikt door de ZZP Calculator."
      }
    ],
    "used_by": [
      "calculator.salaris-calculator",
      "calculator.bruto-netto-2026",
      "calculator.zzp-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "tax",
      "box1",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "Tarieven gelden voor personen die de AOW-leeftijd nog niet hebben bereikt."
    },
    "data": {
      "year": 2026,
      "currency": "EUR",
      "applies_to": "income_under_aow_age",
      "brackets": [
        {
          "up_to": 38883,
          "rate": 0.3575
        },
        {
          "up_to": 78426,
          "rate": 0.3756
        },
        {
          "up_to": null,
          "rate": 0.495
        }
      ]
    }
  },
  {
    "id": "nl.vat.standard",
    "type": "vat_rate",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Standaard BTW-tarieven Nederland"
    },
    "description": {
      "nl-NL": "De standaard BTW-tarieven voor Nederland in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-29",
      "name": "belastingdienst"
    },
    "sources": [
      {
        "label": "Belastingdienst — BTW-tarief",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/btw_berekenen_aan_uw_klanten/btw_berekenen/btw_tarief/btw_tarief",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-29"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.btw-calculator",
        "description": "Gebruikt door de BTW Calculator."
      },
      {
        "relation": "used_by",
        "target": "calculator.btw-terugrekenen",
        "description": "Gebruikt door BTW Terugrekenen."
      },
      {
        "relation": "used_by",
        "target": "calculator.btw-inclusief-exclusief",
        "description": "Gebruikt door BTW Inclusief/Exclusief."
      }
    ],
    "used_by": [
      "calculator.btw-calculator",
      "calculator.btw-terugrekenen",
      "calculator.btw-inclusief-exclusief"
    ],
    "version": "2026-01-01",
    "tags": [
      "vat",
      "tax",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "Het nultarief (0%) is alleen van toepassing op specifieke goederen en diensten."
    },
    "data": {
      "default_rate": 21,
      "currency": "EUR",
      "rates": [
        {
          "value": 21,
          "label": "hoog tarief",
          "category": "standard"
        },
        {
          "value": 9,
          "label": "laag tarief",
          "category": "reduced"
        },
        {
          "value": 0,
          "label": "nultarief",
          "category": "zero"
        }
      ]
    }
  },
  {
    "id": "nl.zzp.mkb_profit_exemption.2026",
    "type": "profit_exemption",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "MKB-winstvrijstelling 2026"
    },
    "description": {
      "nl-NL": "MKB-winstvrijstelling voor ondernemers in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "ondernemersplein"
    },
    "sources": [
      {
        "label": "Ondernemersplein — MKB-winstvrijstelling",
        "url": "https://ondernemersplein.overheid.nl/subsidies-en-regelingen/mkb-winstvrijstelling/",
        "authority_level": "official",
        "domain": "ondernemersplein.overheid.nl",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.zzp-calculator",
        "description": "Gebruikt door de ZZP Calculator."
      }
    ],
    "used_by": [
      "calculator.zzp-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "zzp",
      "profit_exemption",
      "mkb",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "De MKB-winstvrijstelling bedraagt in 2026 12,70% van de winst na ondernemersaftrek."
    },
    "data": {
      "exemption_type": "mkb",
      "rate": 0.127,
      "currency": "EUR"
    }
  },
  {
    "id": "nl.zzp.self_employed_deduction.2026",
    "type": "entrepreneur_deduction",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Zelfstandigenaftrek 2026"
    },
    "description": {
      "nl-NL": "Zelfstandigenaftrek voor ondernemers in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "belastingdienst"
    },
    "sources": [
      {
        "label": "Belastingdienst — Zelfstandigenaftrek 2026",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/zelfstandigenaftrek-2026",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.zzp-calculator",
        "description": "Gebruikt door de ZZP Calculator."
      }
    ],
    "used_by": [
      "calculator.zzp-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "zzp",
      "entrepreneur_deduction",
      "self_employed",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "De zelfstandigenaftrek bedraagt in 2026 €1.200. Het belastingvoordeel is beperkt tot 37,56%."
    },
    "data": {
      "deduction_type": "self_employed",
      "amount": 1200,
      "currency": "EUR"
    }
  },
  {
    "id": "nl.zzp.starter_deduction.2026",
    "type": "entrepreneur_deduction",
    "country": "NL",
    "locale": "nl-NL",
    "title": {
      "nl-NL": "Startersaftrek 2026"
    },
    "description": {
      "nl-NL": "Startersaftrek voor beginnende ondernemers in 2026."
    },
    "status": "active",
    "effective_from": "2026-01-01",
    "effective_until": null,
    "authority": {
      "level": "official",
      "last_review": "2026-06-30",
      "name": "belastingdienst"
    },
    "sources": [
      {
        "label": "Belastingdienst — Startersaftrek 2026",
        "url": "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/startersaftrek-2026",
        "authority_level": "official",
        "domain": "belastingdienst.nl",
        "last_verified": "2026-06-30"
      }
    ],
    "relationships": [
      {
        "relation": "used_by",
        "target": "calculator.zzp-calculator",
        "description": "Gebruikt door de ZZP Calculator."
      }
    ],
    "used_by": [
      "calculator.zzp-calculator"
    ],
    "version": "2026-01-01",
    "tags": [
      "zzp",
      "entrepreneur_deduction",
      "starter",
      "2026",
      "netherlands"
    ],
    "notes": {
      "nl-NL": "De startersaftrek bedraagt in 2026 €2.123 en is een verhoging van de zelfstandigenaftrek."
    },
    "data": {
      "deduction_type": "starter",
      "amount": 2123,
      "currency": "EUR"
    }
  }
] satisfies KnowledgeObject[];
