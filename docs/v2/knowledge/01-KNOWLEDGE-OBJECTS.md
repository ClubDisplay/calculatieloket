# 01 — Knowledge Objects

> **Status:** Atlas v2 Sprint 051  
> **Laatst bijgewerkt:** 2026-06-30

---

## Doel

Definieer de structuur van een kennisobject in de Atlas Knowledge Layer. Een kennisobject is een YAML-bestand met feiten over één onderwerp, zoals een BTW-tarief, belastingschijf of toeslagendrempel.

---

## Verplichte velden

| Veld | Type | Omschrijving |
|---|---|---|
| `id` | string | Unieke identifier, namespaced per land (`nl.vat.standard`) |
| `type` | string | Soort kennisobject, zie toegestane types |
| `country` | string | ISO 3166-1 alpha-2 landcode (`NL`) |
| `locale` | string | BCP-47 locale (`nl-NL`) |
| `title` | object/string | Weergavetitel per locale |
| `description` | object/string | Korte omschrijving per locale |
| `status` | string | `draft`, `active`, `superseded`, `deprecated`, `archived` |
| `effective_from` | string (date) | Datum vanaf wanneer het object geldig is |
| `effective_until` | string/null | Datum tot wanneer het object geldig is, of `null` |
| `authority` | object | Authority level en bronverantwoordelijke |
| `sources` | array | Minimaal één bron met label, url, authority_level |
| `relationships` | array | Relaties naar andere objecten |
| `used_by` | array | Verwijzingen naar calculators of andere consumers |
| `version` | string | Versie, bij voorkeur ISO-datum (`2026-01-01`) |
| `tags` | array | Tags voor filtering en zoeken |
| `notes` | object/string | Extra toelichting per locale |

---

## Optionele velden

| Veld | Type | Omschrijving |
|---|---|---|
| `data` | object | De feitelijke waarden (tarieven, schijven, drempels) |
| `owner` | string | Verantwoordelijke voor dit object |
| `review_on` | array | Triggers voor herreview |
| `replaces` | string | Id van het object dat dit object vervangt |
| `replaced_by` | string | Id van het object dat dit object vervangt |

---

## Toegestane kennisobject types

| Type | Voorbeeld | Omschrijving |
|---|---|---|
| `vat_rate` | `nl.vat.standard` | BTW-tarieven |
| `tax_bracket` | `nl.tax.box1.2026` | Belastingschijven |
| `tax_credit` | `nl.tax.ahk.2026` | Heffingskortingen en aftrekposten |
| `mortgage_formula` | `nl.mortgage.annuity` | Hypotheek- en annuïteitsformules |
| `annuity_formula` | `nl.mortgage.annuity` | Annuïteitsformule specifiek |
| `allowance_threshold` | `nl.allowance.health` | Toeslagengrenzen en drempels |
| `import_cost` | `nl.import.bpm.manual` | Importkostenregels |
| `entrepreneur_deduction` | `nl.zzp.self_employed_deduction.2026` | Ondernemersaftrekposten (zelfstandigenaftrek, startersaftrek) |
| `profit_exemption` | `nl.zzp.mkb_profit_exemption.2026` | Winstvrijstellingen (MKB-winstvrijstelling) |
| `informational` | `nl.import.bpm.manual` | Informatieve objecten zonder berekening |
| `manual_input` | `nl.import.bpm.manual` | Vereiste handmatige invoer |

---

## Voorbeeld object

```yaml
id: nl.vat.standard
type: vat_rate
country: NL
locale: nl-NL
title:
  nl-NL: Standaard BTW-tarieven Nederland
description:
  nl-NL: De standaard BTW-tarieven voor Nederland in 2026.
status: active
effective_from: "2026-01-01"
effective_until: null
authority:
  level: official
  name: belastingdienst
  last_review: "2026-06-29"
sources:
  - label: Belastingdienst — BTW-tarief
    url: https://www.belastingdienst.nl/...
    authority_level: official
    last_verified: "2026-06-29"
relationships:
  - relation: replaces
    target: nl.vat.standard.2025
    description: "Vervangt het 2025 tarievenobject."
used_by:
  - calculator.btw-calculator
  - calculator.btw-terugrekenen
  - calculator.btw-inclusief-exclusief
version: "2026-01-01"
tags:
  - vat
  - tax
  - 2026
  - netherlands
notes:
  nl-NL: Het nultarief is alleen van toepassing op specifieke goederen en diensten.
```

---

## Data-veld

Het `data` veld bevat de feitelijke waarden. De structuur hangt af van het type.

### `vat_rate`

Een `vat_rate` object beschrijft één of meer BTW-tarieven binnen één land. Nederland heeft bijvoorbeeld drie tarieven: 21%, 9% en 0%. Daarom gebruikt `vat_rate` een array `rates` in plaats van één enkele `value`.

```yaml
data:
  default_rate: 21
  currency: EUR
  rates:
    - value: 21
      label: hoog tarief
      category: standard
    - value: 9
      label: laag tarief
      category: reduced
    - value: 0
      label: nultarief
      category: zero
```

Vereisten:

- `data.default_rate` is verplicht en moet een number zijn.
- `data.default_rate` moet voorkomen als `value` in `data.rates`.
- `data.rates` is een niet-lege array.
- Elke rate heeft een `label` (string), `value` (number) en `category` (`standard`, `reduced` of `zero`).
- De runtime selecteert tarieven op basis van `category` in plaats van hardcoded `value`s.

Voor een tax_bracket:

```yaml
data:
  currency: EUR
  brackets:
    - up_to: 38883
      rate: 0.3575
    - up_to: 78426
      rate: 0.3756
    - up_to: null
      rate: 0.495
```

Voor een `entrepreneur_deduction`:

```yaml
data:
  deduction_type: self_employed
  amount: 1200
  currency: EUR
```

Voor een `profit_exemption`:

```yaml
data:
  exemption_type: mkb
  rate: 0.127
  currency: EUR
```

Voor een formula:

```yaml
data:
  formula_name: annuity
  parameters:
    - name: principal
      type: money
      description: Leningbedrag
    - name: monthly_rate
      type: percentage
      description: Maandrente
    - name: periods
      type: integer
      description: Aantal maanden
```

Voor een `mortgage_formula` (hypotheekindicatie):

```yaml
data:
  year: 2026
  interest_deduction_rate: 0.3756
  min_income_factor: 3.5
  income_factor_base: 5.8
  income_factor_rate_multiplier: 0.28
```

Voor een `allowance_threshold` (huurtoeslag):

```yaml
data:
  allowance_type: huurtoeslag
  currency: EUR
  period: month
  max_rent: 932.93
  income_limit_single: 32500
  income_limit_couple: 43500
  base_benefit: 425
  own_payment_threshold_single: 18000
  own_payment_threshold_couple: 21000
  own_payment_rate: 0.15
```

Voor een `allowance_threshold` (zorgtoeslag):

```yaml
data:
  allowance_type: zorgtoeslag
  currency: EUR
  period: year
  income_limit_single: 40857
  income_limit_couple: 51142
  base_benefit: 131
  reduction_threshold_single: 23000
  reduction_threshold_couple: 26000
  reduction_rate: 0.15
```

Voor een `import_cost` (auto-importkosten):

```yaml
data:
  cost_type: import_costs
  currency: EUR
  estimatedBpm: 0
  rdwCosts: 0
  transportCosts: 0
  exportCosts: 0
  inspectionCosts: 0
  plateCosts: 0
  otherCosts: 0
```

---

## Naming conventions

- **Filename:** `{country}.{domain}.{detail}.yml`
- **Id:** `{country}.{domain}.{detail}`
- **Domain:** vat, tax, mortgage, allowance, import, etc.
- **Detail:** `standard`, `box1.2026`, `health`, `bpm.manual`

Voorbeelden:

- `nl.vat.standard.yml`
- `nl.tax.box1.2026.yml`
- `nl.allowance.health.yml`

---

## Algemene vs engine-parameter objecten

Binnen één domein kunnen meerdere Knowledge Objects naast elkaar bestaan. We onderscheiden twee rollen:

| Rol | Voorbeeld | Doel | Tags |
|---|---|---|---|
| **Algemeen referentie-object** | `nl.allowance.health` | Bevat brede beleidsdrempels, maximumbedragen, vermogensgrenzen en andere referentiegegevens. | `reference`, `general` |
| **Engine-parameter object** | `nl.allowance.health.2026` | Bevat de exacte parameters die een calculator engine gebruikt voor de berekening. | `engine_parameters` |

Regels:

- Engine-parameter objecten hebben vaak een jaartal in de id (`.{year}`) omdat de berekeningsparameters per jaar kunnen verschillen.
- Algemene referentie-objecten hoeven geen jaartal in de id te hebben; ze beschrijven het beleid voor een bepaalde periode via `effective_from` / `effective_until`.
- Beide typen kunnen hetzelfde `type` hebben (bijv. `allowance_threshold`), maar hun `data` structuur is afgestemd op hun rol.
- De `notes` van elk object verwijzen expliciet naar het andere object, zodat de relatie direct duidelijk is.

---

## Validatie

De validator (`scripts/validate-knowledge.mjs`) controleert:

- Verplichte velden zijn aanwezig.
- `type` is toegestaan.
- `sources` bevatten label, url en authority_level.
- `effective_from` is voor `effective_until` (indien niet null).
- `used_by` verwijst naar bestaande calculators.
- `data` is consistent met `type`.

Voor `vat_rate` wordt expliciet gevalideerd dat `data.rates` een niet-lege array is, elke rate `label`, `value` en `category` heeft, en `data.default_rate` overeenkomt met een van de rates.

Voor `entrepreneur_deduction` wordt gevalideerd dat `data.deduction_type`, `data.amount` en `data.currency` aanwezig zijn.

Voor `profit_exemption` wordt gevalideerd dat `data.exemption_type`, `data.rate` (tussen 0 en 1) en `data.currency` aanwezig zijn.
