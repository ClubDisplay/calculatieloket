# Calculator Definition Language — Schema v0.2

> **Status:** Atlas v2 Sprint 004  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Dit document beschrijft het formele schema voor Atlas v2 Calculator Definition YAML-bestanden. Deze beschrijving is bedoeld voor menselijke developers en AI-assistenten die definities schrijven, reviewen of valideren.

---

## Top-level velden

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `id` | string | ja | Kebab-case, uniek binnen Atlas |
| `slug` | string | ja | Publieke route, eindigt op `/` |
| `product` | string | ja | Product waarvoor de definitie geldt |
| `locale` | string | ja | BCP-47, bijv. `nl-NL` |
| `country` | string | ja | ISO 3166-1 alpha-2, bijv. `NL` |
| `category` | string | ja | Hoofdcluster, bijv. `btw`, `salaris`, `wonen` |
| `subcategory` | string | nee | Verdere onderverdeling binnen de category |
| `title` | object/string | ja | Weergegeven titel per locale |
| `description` | object/string | ja | Korte omschrijving per locale |
| `status` | string | ja | `live`, `migrated`, `inline`, `planned`, `deprecated` |
| `priority` | string | ja | `A`, `B` of `C`. `A` = hoogste prioriteit |
| `route` | object | ja | Route configuratie |
| `calculator_module` | string | ja | Naam van de rekenmodule in Atlas Engine |
| `engine_status` | string | ja | `migrated`, `inline` of `planned` |
| `engine_reference` | string | ja | Pad naar engine-bestand of inline script |
| `engine_version` | string | nee | Semver, bijv. `1.0` |
| `inputs` | array | ja | Lijst met invoervelden |
| `outputs` | array | ja | Lijst met uitvoervelden |
| `rules` | array | nee | Validatie- en businessregels |
| `journeys` | object | nee | Journey- en next-step configuratie |
| `seo` | object | ja | SEO-metadata en structured data |
| `sources` | array | ja | Officiële bronnen per locale |
| `disclaimers` | object | ja | Indicatie-disclaimers per locale |
| `privacy` | object | ja | Privacy-instellingen |
| `maintenance` | object | ja | Onderhoudsmetadata |

---

### `id`

Unieke identifier van de calculator. Wordt gebruikt voor verwijzingen, file naming en interne API-calls.

```yaml
id: btw-calculator
```

---

### `slug`

De publieke URL van de calculator. Moet altijd eindigen op `/` (trailing slash).

```yaml
slug: /btw-calculator/
```

---

### `product`

Het product waarvoor deze calculator in deze definitie wordt geconfigureerd. Dezelfde calculator kan in meerdere product-definities voorkomen.

```yaml
product: calculatieloket.nl
```

---

### `locale`

Taal en regio voor deze definitie. Bepaalt formatting, regels, bronnen en content.

```yaml
locale: nl-NL
```

---

### `country`

Land voor regels, wetgeving en officiële bronnen.

```yaml
country: NL
```

---

### `category`

Hoofdcluster van de calculator.

```yaml
category: btw
```

---

### `subcategory`

Verdere onderverdeling binnen de category.

```yaml
subcategory: standaard
```

---

### `title`

Weergegeven titel van de calculator. Per locale, zodat meertalige producten ondersteund worden.

```yaml
title:
  nl-NL: "BTW Calculator"
```

---

### `description`

Korte omschrijving. Wordt gebruikt in intro-tekst, meta description en cross-sell cards.

```yaml
description:
  nl-NL: "Bereken direct btw inclusief of exclusief."
```

---

### `status`

De huidige lifecycle-status van de calculator.

**Toegestane waarden:** `live`, `migrated`, `inline`, `planned`, `deprecated`.

```yaml
status: migrated
```

---

### `priority`

Rangorde binnen de category. `A` = hoogste prioriteit, `C` = laagste.

**Toegestane waarden:** `A`, `B`, `C`.

```yaml
priority: A
```

---

### `route`

Route-instellingen.

```yaml
route:
  path: /btw-calculator/
  trailing_slash: true
  canonical: https://calculatieloket.nl/btw-calculator/
```

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `path` | string | ja | Begint altijd met `/` |
| `trailing_slash` | boolean | nee | Moet `true` zijn voor Astro static routes |
| `canonical` | string | nee | Volledige canonical URL |

---

### `calculator_module`

Naam van de rekenmodule in Atlas Engine. Bepaalt welke pure functies aangeroepen worden.

```yaml
calculator_module: btw
```

---

### `engine_status`

Geeft aan of de calculator al gebruikmaakt van een centrale engine-module of nog inline scripts heeft.

**Toegestane waarden:** `migrated`, `inline`, `planned`.

```yaml
engine_status: migrated
```

---

### `engine_reference`

Pad naar de engine of het inline script. Voor gemigreerde calculators bijvoorbeeld `src/lib/calculators/btw.ts`. Voor inline calculators `src/pages/<id>.astro`.

```yaml
engine_reference: src/lib/calculators/btw.ts
```

---

### `engine_version`

Versie van de engine-module waarmee deze definitie compatibel is.

```yaml
engine_version: "1.0"
```

---

### `inputs`

Lijst met invoervelden. Zie [Input](#input).

---

### `outputs`

Lijst met berekende resultaten. Zie [Output](#output).

---

### `rules`

Validatie- en businessregels. Zie [Rule](#rule).

---

### `journeys`

Journey- en next-step configuratie.

```yaml
journeys:
  enabled: true
  primary_journey: salary-to-benefits
  next_steps:
    - target: toeslagen-calculator
      label:
        nl-NL: "Bereken je toeslagen"
      condition: always
      priority: 1
```

---

### `seo`

SEO-metadata en structured data.

```yaml
seo:
  title:
    nl-NL: "BTW Calculator — Bereken 21%, 9% en 0% BTW"
  description:
    nl-NL: "Bereken direct btw inclusief of exclusief."
  keywords:
    nl-NL: ["btw calculator", "btw berekenen", "21% btw"]
  schema:
    - WebSite
    - FAQPage
    - HowTo
```

`seo.title` en `seo.description` zijn verplicht als `seo` aanwezig is.

---

### `sources`

Officiële bronnen per locale. Elke bron moet minimaal `label` en `url` bevatten.

```yaml
sources:
  - label:
      nl-NL: "Belastingdienst — BTW-tarief"
    url:
      nl-NL: "https://www.belastingdienst.nl/..."
    domain: "belastingdienst.nl"
```

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `label` | object/string | ja | Weergavenaam van de bron |
| `url` | object/string | ja | URL per locale |
| `domain` | string | nee | Domein voor filtering/weergave |

---

### `disclaimers`

Indicatie-disclaimers. Moeten altijd vermelden dat de uitkomst een indicatie is.

```yaml
disclaimers:
  nl-NL: "Deze berekening is een indicatie. Controleer belangrijke bedragen altijd via officiële bronnen."
```

---

### `privacy`

Privacy-instellingen voor de calculator.

```yaml
privacy:
  no_storage: true
  client_side_only: true
  no_tracking: true
  no_personal_data: true
```

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `no_storage` | boolean | ja | Geen data wordt opgeslagen |
| `client_side_only` | boolean | ja | Berekening draait volledig in de browser |
| `no_tracking` | boolean | nee | Geen tracking van invoer |
| `no_personal_data` | boolean | nee | Geen persoonsgegevens vereist |

---

### `maintenance`

Onderhoudsmetadata.

```yaml
maintenance:
  owner: "Barry"
  last_review: "2026-06-29"
  update_frequency: "yearly"
  source_review_required: true
  review_on:
    - tax_year_change
    - legislation_change
```

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `owner` | string | ja | Verantwoordelijke |
| `last_review` | string (date) | ja | Laatste reviewdatum |
| `update_frequency` | string | ja | Bijv. `yearly`, `quarterly`, `monthly` |
| `source_review_required` | boolean | ja | Of bronnen bij elke review gecontroleerd moeten worden |
| `review_on` | array | nee | Triggers voor herreview |

---

## Input

```yaml
inputs:
  - name: amount
    label:
      nl-NL: "Bedrag"
    type: money
    unit: "EUR"
    prefix: "€"
    min: 0
    max: 1000000
    step: 0.01
    default: 100
    placeholder: "Bijv. 100"
    required: true
    privacy_level: financial_input
    help_text:
      nl-NL: "Vul het bedrag in waarover je btw wilt berekenen."
```

### Velden

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `name` | string | ja | Unieke identifier binnen de calculator |
| `label` | object/string | ja | Weergegeven label |
| `type` | string | ja | Zie toegestane types |
| `required` | boolean | ja | Of het veld verplicht is |
| `default` | any | nee | Standaardwaarde |
| `min` | number | nee | Minimumwaarde |
| `max` | number | nee | Maximumwaarde |
| `unit` | string | nee | Eenheid, bijv. `EUR`, `%`, `jaar` |
| `privacy_level` | string | ja | Zie toegestane privacy levels |
| `prefix` | string | nee | Bijv. `€` |
| `suffix` | string | nee | Bijv. `%` |
| `step` | number | nee | Stapgrootte |
| `placeholder` | string | nee | Placeholder tekst |
| `help_text` | object/string | nee | Extra uitleg onder veld |
| `options` | array | nee | Voor `select` of `radio` |
| `depends_on` | object | nee | Conditionele afhankelijkheid |

### Toegestane input types

| Type | Omschrijving |
|---|---|
| `money` | Geldbedrag |
| `number` | Numerieke waarde |
| `percentage` | Percentage |
| `date` | Datum |
| `select` | Dropdown |
| `radio` | Radio-opties |
| `checkbox` | Boolean (aan/uit) |
| `text` | Tekst |

### Toegestane privacy levels

| Level | Omschrijving |
|---|---|
| `non_personal` | Geen persoons- of financiële gegevens |
| `financial_input` | Financiële invoer, geen persoonsgegevens |
| `personal_input` | Persoonsgegevens (bijv. leeftijd) |
| `sensitive` | Gevoelige persoonsgegevens |

---

## Output

```yaml
outputs:
  - name: amountIncl
    label:
      nl-NL: "Bedrag inclusief btw"
    type: money
    unit: "EUR"
    format: "currency"
    description:
      nl-NL: "Totaalbedrag inclusief btw."
    decimals: 2
    group: result
    highlight: true
```

### Velden

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `name` | string | ja | Unieke identifier binnen de calculator |
| `label` | object/string | ja | Weergegeven label |
| `type` | string | ja | Zie toegestane output types |
| `unit` | string | nee | Eenheid, bijv. `EUR`, `%` |
| `format` | string | nee | Weergaveformaat binnen type |
| `description` | object/string | nee | Uitleg van de output |
| `decimals` | integer | nee | Aantal decimalen |
| `group` | string | nee | Groepeer output in resultaatkaart |
| `highlight` | boolean | nee | Markeer als hoofdresultaat |
| `static_value` | any | nee | Statische waarde voor niet-berekende outputs |
| `condition` | object | nee | Conditionele weergave |
| `dynamic_label` | object | nee | Label afhankelijk van waarde |

### Toegestane output types

| Type | Omschrijving |
|---|---|
| `money` | Geldbedrag |
| `number` | Numerieke waarde |
| `percentage` | Percentage |
| `text` | Tekstuele output |
| `date` | Datum |

---

## Rule

```yaml
rules:
  - id: vat_rates_nl_2026
    type: vat_rate
    locale: nl-NL
    country: NL
    version: "2026"
    applies_to: calculator
    cross_locale_allowed: false
    source:
      label: "Belastingdienst — BTW-tarief"
      url: "https://www.belastingdienst.nl/..."
      authority_level: official
    status: active

  - id: non_negative_amount
    type: manual_input
    locale: nl-NL
    country: NL
    version: "1.0"
    applies_to: amount
    source:
      label: "Calculatieloket.nl — interne validatie"
      url: "https://calculatieloket.nl/"
      authority_level: internal
    status: active
    message:
      nl-NL: "Vul een geldig bedrag in (0 of hoger)."
```

### Verplichte velden

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `id` | string | ja | Unieke rule id binnen de calculator |
| `type` | string | ja | Zie toegestane rule types |
| `locale` | string | ja | BCP-47 locale waarvoor de rule geldt |
| `country` | string | ja | ISO 3166-1 alpha-2 landcode |
| `version` | string | ja | Versie van de rule (bijv. `2026` of `1.0`) |
| `applies_to` | string | ja | Input/output `name` of `calculator` |
| `source` | object | ja | Bronverwijzing, zie onder |
| `status` | string | ja | `active`, `draft` of `deprecated` |

### Optionele velden

| Veld | Type | Opmerking |
|---|---|---|
| `cross_locale_allowed` | boolean | Sta toe dat deze rule afwijkt van calculator locale/country |
| `reference` | string | Pad binnen de Rule Engine, bijv. `vat.rates` of `tax.box1.brackets` |
| `message` | object/string | Foutmelding of toelichting per locale |
| `input` | string | Verwijzing naar input (legacy/optioneel, gebruik `applies_to`) |
| `min` | number | Minimumwaarde voor validatie |
| `max` | number | Maximumwaarde voor validatie |
| `params` | object | Rule-specifieke parameters |

### Source

| Veld | Type | Verplicht | Opmerking |
|---|---|---|---|
| `label` | string | ja | Weergavenaam van de bron |
| `url` | string | ja | URL naar de bron |
| `authority_level` | string | ja | `official`, `semi_official`, `editorial`, `internal` |

### Toegestane rule types

| Type | Omschrijving |
|---|---|
| `vat_rate` | BTW-tarieven per land/jaar |
| `tax_bracket` | Belastingschijven |
| `tax_credit` | Heffingskortingen, aftrekposten, vrijstellingen |
| `allowance_threshold` | Toeslagengrenzen, drempels, maximumbedragen |
| `mortgage_formula` | Hypotheekberekeningsregels, leencapaciteit |
| `annuity_formula` | Annuïteitsformule voor maandlasten |
| `import_cost` | Importkostenregels (bpm, RDW, etc.) |
| `manual_input` | Regels rond handmatige/gebruikersinvoer |
| `informational` | Informatieve/waarschuwende regels zonder berekening |

---

## Openstaande vraagstukken voor latere sprints

1. Hoe om te gaan met conditionele velden (bijv. partnerinkomen alleen tonen bij `couple`)?
2. Hoe definiëren we advanced rules (bijv. `if income > X then rate = Y`)?
3. Hoe koppelen we content (FAQ, voorbeelden) aan definities?
4. Hoe ondersteunen we multi-step calculators?

Deze punten worden in latere sprints uitgewerkt.
