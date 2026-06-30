# 04 — Generator

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf hoe Atlas v2 later vanuit **calculator-definities** routes, pagina's, metadata, FAQ, schema en next steps kan genereren. De Generator maakt het mogelijk om snel nieuwe calculators, producten en landen te lanceren zonder handmatig HTML te schrijven.

---

## Generator-verantwoordelijkheden

| Taak | Output |
|---|---|
| Routes | Astro pagina's of framework-specifieke routes. |
| Metadata | `title`, `description`, `canonical`, `og:` tags. |
| Structured data | JSON-LD schema's. |
| FAQ | `<details>`/`<summary>` HTML of FAQPage schema. |
| Content secties | Uitleg, voorbeelden, disclaimers, bronnen. |
| Components | Geïmporteerde UI-componenten (CalculatorShell, InputField, ResultCard). |
| Next steps | CrossSellCards of NextStepBlock data. |
| Sitemap | `sitemap-index.xml` en per-product sitemaps. |

---

## Generator inputs

1. **Calculator Definition** (`calculator.yml`)
2. **Product Configuration** (`product.yml`)
3. **Locale Rules** (`rules/{locale}/*.yml`)
4. **Component Templates** (`templates/*.astro` of framework-variant)
5. **SEO Defaults** (`seo/defaults.yml`)

---

## Generator workflow

```
Calculator Definition
        │
        ▼
┌─────────────────────┐
│  Resolve Rules      │ ← locale, year
│  Resolve Content      │ ← locale, product
│  Resolve Components   │ ← component_version
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  Generate Page      │
│  - route/slug       │
│  - metadata         │
│  - form inputs      │
│  - result outputs   │
│  - FAQ              │
│  - schema           │
│  - cross-sell       │
└─────────────────────┘
        │
        ▼
   Static page / API / Widget
```

---

## Voorbeeld: product configuratie

```yaml
# product.yml — calculatieloket.nl
id: calculatieloket.nl
name: Calculatieloket
brand:
  primary_color: "#2563eb"
  logo: "/logo_Calculatieloket.png"
default_locale: nl-NL
supported_locales:
  - nl-NL
seo:
  site_name: "Calculatieloket.nl"
  base_url: "https://calculatieloket.nl"
  twitter_card: "summary"
components:
  shell: CalculatorShell
  input_field: InputField
  result_card: ResultCard
  faq_block: FAQBlock
  cross_sell: CrossSellCards
  source_cards: SourceCards
```

---

## Generatiestrategie per output

### 1. Static site (Astro)

Generator schrijft `.astro` bestanden naar `src/pages/{slug}.astro` of gebruikt dynamic routing.

### 2. Widget

Generator produceert een embeddable `<script>` tag of iframe URL met gereduceerde styling.

### 3. API

Generator produceert een JSON endpoint die input accepteert en output + errors retourneert.

---

## Voorbeeld gegenereerde pagina (concept)

```astro
---
import { getCalculator } from "@atlas/generator";
const calc = getCalculator("btw-calculator", { locale: "nl-NL" });
---

<BaseLayout title={calc.seo.title} description={calc.seo.description}>
  <CalculatorShell title={calc.title} subtitle={calc.description}>
    <InputField input={calc.inputs[0]} />
    <RadioGroup input={calc.inputs[1]} />
    <RadioGroup input={calc.inputs[2]} />
    <ResultCard outputs={calc.outputs} />
  </CalculatorShell>
  <FAQBlock items={calc.faq} />
  <CrossSellCards items={calc.journey.next_steps} />
</BaseLayout>

<script>
  import { runCalculator } from "@atlas/runtime";
  runCalculator("btw-calculator", { locale: "nl-NL" });
</script>
```

---

## Faseplanning

| Fase | Generator-mogelijkheid |
|---|---|
| v2 Sprint 001–002 | Documentatie en definitiestandaard. |
| v2 Sprint 003–004 | Prototype: 1 calculator genereren vanuit YAML. |
| v2 Sprint 005–006 | Alle BTW-calculators genereren. |
| v2 Sprint 007+ | Multi-product en multi-locale generatie. |

---

## Relatie met huidige v1

In v1 zijn de pagina's handgeschreven. De Generator zal deze pagina's geleidelijk vervangen, maar v1 blijft tijdens de migratie intact. Zie `09-MIGRATION-FROM-V1.md`.
