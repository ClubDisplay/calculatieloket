# 06 — Products on Atlas

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf hoe meerdere producten op dezelfde Atlas v2-engine kunnen draaien. Calculatieloket.nl is de eerste, maar niet de enige implementatie.

---

## Producttypen

| Producttype | Voorbeeld | Opmerking |
|---|---|---|
| **Nationaal product** | calculatieloket.nl | Eén land, één taal. |
| **Multi-locale product** | calculatieloket.be | België: NL + FR. |
| **Thematisch product** | belastingloket.nl | Focus op belasting calculators. |
| **Thematisch product** | hypotheekloket.nl | Focus op wonen/hypotheek. |
| **White-label widget** | partnerbank.nl/hypotheek | Embedden op externe site. |
| **Partner API** | api.calculatieloket.nl | JSON API voor derden. |

---

## Product configuratie

Elk product heeft een `product.yml`:

```yaml
id: calculatieloket.nl
name: Calculatieloket
brand:
  primary_color: "#2563eb"
  logo: "/logo_Calculatieloket.png"
  favicon: "/favicon.ico"
default_locale: nl-NL
supported_locales:
  - nl-NL
countries:
  - NL
seo:
  site_name: "Calculatieloket.nl"
  base_url: "https://calculatieloket.nl"
  default_title_suffix: "— Calculatieloket.nl"
components:
  shell: CalculatorShell
  input_field: InputField
  result_card: ResultCard
  faq_block: FAQBlock
  cross_sell: CrossSellCards
  source_cards: SourceCards
calculators:
  include:
    - btw-calculator
    - btw-terugrekenen
    - btw-inclusief-exclusief
    - salaris-calculator
    - bruto-netto-2026
    - hypotheek-calculator
    - zzp-calculator
    - toeslagen-calculator
    - auto-importkosten-berekenen
  exclude: []
features:
  ads: true
  cookie_consent: true
  journeys: true
  next_steps: false
  api: false
```

---

## Gedeelde vs. product-specifieke assets

| Asset | Gedeeld | Product-specifiek |
|---|---|---|
| Calculation Engine | ✅ | — |
| Rule Engine | ✅ | — |
| Component Engine | ✅ | styling/thema |
| Content (FAQ/uitleg) | gedeelde defaults | locale overrides |
| Logo | — | ✅ |
| Kleur | — | ✅ |
| Domain / base URL | — | ✅ |
| AdSense ID | — | ✅ |
| Analytics | — | ✅ |
| Calculator selectie | — | ✅ |

---

## Multi-product deployment

```
atlas-monorepo/
├── packages/
│   ├── engine/            # gedeelde rekenlogica
│   ├── rules/             # locale regels
│   ├── components/        # herbruikbare UI
│   ├── generator/         # pagina-generator
│   └── runtime/           # client-side runtime
├── products/
│   ├── calculatieloket.nl/
│   ├── calculatieloket.be/
│   ├── belastingloket.nl/
│   ├── hypotheekloket.nl/
│   └── widgets/
└── shared/
    ├── definitions/       # calculator YAMLs
    └── content/           # locale content
```

> **Opmerking:** in v2 Sprint 001 is dit een visie. De huidige repo blijft `calculatieloket.nl`; monorepo-structuur komt later.

---

## White-label widgets

Een widget is een minimaal product zonder eigen site:

```yaml
id: partnerbank-hypotheek-widget
product_type: widget
parent_product: hypotheekloket.nl
calculators:
  - hypotheek-calculator
branding:
  primary_color: "#004d99"
  hide_logo: true
  hide_cross_sell: true
embed:
  type: iframe
  allowed_origins:
    - "https://partnerbank.nl"
```

---

## Partner API

De Partner API biedt calculatorresultaten als JSON:

```http
POST /api/v1/calculate
Content-Type: application/json

{
  "calculator": "btw-calculator",
  "locale": "nl-NL",
  "inputs": {
    "amount": 100,
    "btwRate": 21,
    "direction": "exclusive_to_inclusive"
  }
}
```

Response:

```json
{
  "valid": true,
  "outputs": {
    "amountExcl": 100,
    "btwAmount": 21,
    "amountIncl": 121
  }
}
```

---

## Product roadmap

| Fase | Product |
|---|---|
| v1 → v2 Sprint 006 | calculatieloket.nl (bestaand) |
| v2 Sprint 008+ | calculatieloket.be |
| v2 Sprint 010+ | belastingloket.nl / hypotheekloket.nl |
| v2 Sprint 012+ | white-label widgets |
| v2 Sprint 014+ | partner API |

---

## Relatie met v1

Calculatieloket.nl v1 dient als **referentieproduct**. De engine en componenten die we voor v1 bouwen, worden geschikt gemaakt voor hergebruik. Er wordt pas een tweede product gelanceerd wanneer v1 volledig op Atlas v2 draait.
