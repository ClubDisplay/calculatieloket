# 02 — Calculator Definition Language

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Ontwerp een eerste **declarative YAML-structuur** waarmee calculators in Atlas v2 beschreven kunnen worden. Deze taal moet leesbaar zijn voor mensen én machine-verwerkbaar door de Generator, Rule Engine en AI Engine.

---

## Ontwerpprincipes

1. **Eén bron van waarheid** per calculator.
2. **Locale-agnostic** structuur: land-specifieke waarden komen uit regelbestanden.
3. **Input/output-gedreven:** definieer eerst wat er ingevoerd en berekend wordt.
4. **SEO-embedded:** metadata, FAQ, schema en content zitten in de definitie.
5. **AI-schrijfbaar:** AI-assistenten kunnen de YAML genereren en wijzigen zonder de hele pagina te herschrijven.

---

## Voorgestelde structuur

```yaml
id: btw-calculator
slug: /btw-calculator/
product: calculatieloket.nl
locale: nl-NL
country: NL
category: btw
subcategory: standaard
priority: 1

status: live
engine_version: "1.0"
component_version: "2.0"
content_version: "2.0"

owner: Barry
last_review: "2026-06-29"

title:
  nl-NL: "BTW Calculator"
  en-US: "VAT Calculator"

description:
  nl-NL: "Bereken direct btw inclusief of exclusief. Reken met 21%, 9% of 0% btw."
  en-US: "Calculate VAT inclusive or exclusive. Use 21%, 9% or 0% rates."

inputs:
  - id: amount
    label:
      nl-NL: "Bedrag"
      en-US: "Amount"
    type: number
    prefix: currency
    min: 0
    step: 0.01
    default: 100
    required: true

  - id: btwRate
    label:
      nl-NL: "BTW-tarief"
      en-US: "VAT rate"
    type: radio
    options:
      - value: 21
        label:
          nl-NL: "21% — hoog tarief"
          en-US: "21% — standard rate"
      - value: 9
        label:
          nl-NL: "9% — laag tarief"
          en-US: "9% — reduced rate"
      - value: 0
        label:
          nl-NL: "0% — nultarief"
          en-US: "0% — zero rate"
    default: 21

  - id: direction
    label:
      nl-NL: "Bereken"
      en-US: "Calculate"
    type: radio
    options:
      - value: exclusive_to_inclusive
        label:
          nl-NL: "Bedrag is exclusief btw"
          en-US: "Amount is exclusive of VAT"
      - value: inclusive_to_exclusive
        label:
          nl-NL: "Bedrag is inclusief btw"
          en-US: "Amount is inclusive of VAT"
    default: exclusive_to_inclusive

outputs:
  - id: amountExcl
    label:
      nl-NL: "Bedrag exclusief btw"
      en-US: "Amount exclusive of VAT"
    format: currency
    decimals: 2

  - id: btwAmount
    label:
      nl-NL: "btw-bedrag"
      en-US: "VAT amount"
    format: currency
    decimals: 2

  - id: amountIncl
    label:
      nl-NL: "Bedrag inclusief btw"
      en-US: "Amount inclusive of VAT"
    format: currency
    decimals: 2

rules:
  - name: valid_btw_rates
    source: locale
    reference: vat.rates

  - name: validate_amount
    type: non_negative
    input: amount
    message:
      nl-NL: "Vul een geldig bedrag in (0 of hoger)."
      en-US: "Enter a valid amount (0 or higher)."

calculator_module: btw

journey:
  next_steps:
    - target: btw-terugrekenen
      label:
        nl-NL: "Btw terugrekenen"
      condition: always
    - target: zzp-calculator
      label:
        nl-NL: "ZZP Calculator"
      condition: always

seo:
  title:
    nl-NL: "BTW Calculator — Bereken 21%, 9% en 0% BTW"
  description:
    nl-NL: "Bereken direct btw inclusief of exclusief."
  schema:
    - WebSite
    - FAQPage
    - HowTo

sources:
  - name:
      nl-NL: "Belastingdienst — BTW-tarief"
    url:
      nl-NL: "https://www.belastingdienst.nl/.../btw_tarief"
    domain: belastingdienst.nl

faq:
  - question:
      nl-NL: "Hoe bereken je btw over een bedrag?"
    answer:
      nl-NL: "Vermenigvuldig het bedrag exclusief btw met het btw-percentage gedeeld door 100."

examples:
  - title:
      nl-NL: "Voorbeeldberekening 21%"
    values:
      amount: 100
      btwRate: 21
      direction: exclusive_to_inclusive
    expected:
      amountExcl: 100
      btwAmount: 21
      amountIncl: 121

disclaimers:
  nl-NL: "Deze berekening is een indicatie. Controleer belangrijke bedragen altijd via officiële bronnen."
  en-US: "This calculation is an indication. Always verify important amounts with official sources."
```

---

## Verplichte velden

| Veld | Doel |
|---|---|
| `id` | Unieke identifier binnen Atlas. |
| `slug` | Route, altijd met trailing slash. |
| `product` | Product waarvoor de calculator actief is. |
| `locale` | Standaardtaal/regio. |
| `country` | Land voor regels en bronnen. |
| `category` | Cluster voor navigatie en cross-sell. |
| `status` | `live`, `planned`, `draft`, `deprecated`. |
| `calculator_module` | Naam van de rekenmodule in `src/lib/calculators/`. |
| `inputs` | Lijst met invoervelden. |
| `outputs` | Lijst met berekende resultaten. |

---

## Optionele velden

| Veld | Doel |
|---|---|
| `subcategory` | Verdere onderverdeling binnen cluster. |
| `priority` | Rangorde in overzichten. |
| `engine_version` | Versie van de rekenmodule. |
| `component_version` | Versie van de UI-laag. |
| `content_version` | Versie van content (FAQ, uitleg). |
| `rules` | Validatie- en businessregels. |
| `journey` | Next steps en data reuse. |
| `seo` | Titel, description, schema. |
| `sources` | Officiële bronnen per locale. |
| `faq` | Veelgestelde vragen. |
| `examples` | Testcases voor ontwikkeling en documentatie. |
| `disclaimers` | Indicatie-disclaimers per locale. |

---

## Relatie met bestaande catalogus

De huidige `docs/catalog/calculators.yml` blijft de **operationele catalogus** voor Calculatieloket.nl v1. De Calculator Definition Language in Atlas v2 is de **toekomstige opvolger** en zal de v1-catalogus geleidelijk vervangen tijdens de migratie.

---

## Volgende stap

In v2 Sprint 002 wordt de YAML-structuur verder uitgewerkt en afgestemd op de bestaande calculators in `docs/catalog/calculators.yml`.
