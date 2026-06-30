# 04 — Component Library

> **Doel:** Volledige catalogus van alle herbruikbare Astro-componenten — bestaand en gepland.  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Bestaande componenten](#bestaande-componenten)
   - [BaseLayout](#baselayout)
   - [AdSlot](#adslot)
   - [CookieConsent](#cookieconsent)
   - [CrossSellCards](#crosssellcards)
   - [SourceCards](#sourcecards)
2. [Atlas Calculator Engine](#atlas-calculator-engine)
   - [Format](#format)
   - [Validation](#validation)
   - [Utils](#utils)
   - [Types](#types)
   - [Calculators](#calculators)
3. [Geplande componenten](#geplande-componenten)
   - [NextStepBlock](#nextstepblock)
   - [CalculatorShell](#calculatorshell)
   - [ResultCard](#resultcard)
   - [InputField](#inputfield)
   - [FAQBlock](#faqblock)
   - [Breadcrumbs](#breadcrumbs)
   - [OfficialSourceBlock](#officialsourceblock)
4. [Component toevoegen](#component-toevoegen)

---

## Bestaande componenten

### BaseLayout

| Veld | Waarde |
|------|--------|
| **Status** | ✅ Live |
| **Locatie** | `src/layouts/BaseLayout.astro` |
| **Type** | Layout shell |

**Doel:** Gedeelde `<html>`-shell voor álle pagina's. Bevat `<head>` (meta, canonical, JSON-LD, AdSense-preconnect, noindex-script), `<header>` (logo + nav), `<footer>` (links + copyright), `<slot>` voor pagina-inhoud, en `@import` van `global.css` via `<style is:global>`.

**Minimale props:**

```ts
interface Props {
  title: string;
  description: string;
  containerClass?: string;  // default "container"
}
```

**Gebruik:**
```astro
<BaseLayout title="..." description="...">
  <!-- pagina-inhoud -->
</BaseLayout>
```

**SEO:** `title`, `meta description`, `canonical`, `og:title/description`, `twitter:`, JSON-LD `WebSite`, `google-site-verification`. Robuust — alle 15 pagina's gebruiken dit.

**Privacy:** Geen tracking. AdSense-preconnect alleen als `PUBLIC_ADS_ENABLED=true`. `noindex` alleen op `*.pages.dev`.

**Performance:** `<link rel="preconnect">` voor 3 Google-advertentiedomeinen indien ads aan. ClientRouter voor snelle SPA-navigatie.

---

### AdSlot

| Veld | Waarde |
|------|--------|
| **Status** | ✅ Live |
| **Locatie** | `src/components/AdSlot.astro` |

**Doel:** Manuele AdSense `ins`-placeholder. Rendert alleen als `PUBLIC_ADS_ENABLED=true`.

**Minimale props:**

```ts
interface Props {
  slot: string;          // AdSense slot-ID
  format?: string;       // default "auto"
  style?: string;        // extra inline CSS
}
```

**Gebruik:**
```astro
<AdSlot slot="1234567890" format="auto" style="min-height:100px" />
```

**SEO/Privacy:** Geen impact — laadt pas na CookieConsent. Geen CLS door `min-height`.

**Plaatsing:** Boven de calculator-card (na subtitle) en/of tussen calculator-card en uitleg. **Nooit** tussen invoervelden en berekenknop/resultaat.

---

### CookieConsent

| Veld | Waarde |
|------|--------|
| **Status** | ✅ Live |
| **Locatie** | `src/components/CookieConsent.astro` |

**Doel:** GDPR-cookiebanner. Blokkeert AdSense-script tot gebruiker "Accepteren" klikt. Geen props.

**Gebruik:** `<CookieConsent />` (eenmalig in BaseLayout, net voor `</body>`).

**Privacy:** Lokale cookie (`calculatieloket-consent`). Geen externe dependency.

---

### CrossSellCards

| Veld | Waarde |
|------|--------|
| **Status** | ✅ Live |
| **Locatie** | `src/components/CrossSellCards.astro` |

**Doel:** Vervanger van de oude emoji-linkrijen. Toont 3-5 gerelateerde calculators als aanklikbare cards onderaan de pagina.

**Minimale props:**

```ts
interface Item {
  href: string;
  title: string;
  description: string;
  accent?: string;  // optionele accentkleur (CSS custom property)
}

interface Props {
  title: string;     // "Ook handig om te berekenen"
  items: Item[];     // max 5 items
}
```

**Gebruik:**
```astro
<CrossSellCards
  title="Meer over btw berekenen"
  items={[
    { href: "/btw-terugrekenen/", title: "Btw terugrekenen", description: "..." },
  ]}
/>
```

**Styling:** Eigen `<style>`-blok in de component — onafhankelijk van `global.css`. Grid: `auto-fit minmax(220px,1fr)`, 1 kolom ≤560px.

**SEO:** Interne links met trailing slash. Geen emoji. Geen nested `<a>`.

**Performance:** Puur HTML/CSS — geen JS.

---

### SourceCards

| Veld | Waarde |
|------|--------|
| **Status** | ✅ Live |
| **Locatie** | `src/components/SourceCards.astro` |

**Doel:** Officiële bronnen tonen als moderne resource-cards (vervangt bulletlist met blauwe links).

**Minimale props:**

```ts
interface Item {
  label: string;        // "RDW" / "Belastingdienst" / "Rijksoverheid"
  title: string;
  description: string;
  href: string;
}

interface Props {
  title: string;        // "Bronnen en informatie"
  items: Item[];
}
```

**Gebruik:**
```astro
<SourceCards
  title="Bronnen en informatie"
  items={[
    { label: "RDW", title: "Voertuig invoeren...", description: "...", href: "https://..." },
  ]}
/>
```

**SEO:** Alle links `target="_blank" rel="noopener"`. Alleen officiële domeinen (rdw.nl, belastingdienst.nl, rijksoverheid.nl). Geen commerciële bronnen.

**Styling:** Eigen `<style>` — `srcc-grid`, `srcc-card`, `srcc-label`, `srcc-cta` "Bekijk bron →".

---

## Atlas Calculator Engine

De **Atlas Calculator Engine** is geen UI-component, maar een set gedeelde TypeScript-modules in `src/lib/` die de rekenlogica van de calculators centraliseert. De engine bestaat uit pure functies zonder DOM-afhankelijkheden, zodat ze herbruikbaar zijn tussen pagina's en testbaar zijn zonder browser.

### Huidige engine-bestanden

| Module | Bestand | Doel |
|--------|---------|------|
| **Format** | `src/lib/format/currency.ts` | `formatEuro(value, decimals)` en `formatNumber(value, decimals)` in Nederlandse notatie. |
| **Validation** | `src/lib/validation/input.ts` | `parseNumber(value, fallback)` en `parseInputNumber(input, fallback)` voor veilige numerieke invoer. |
| **Validation** | `src/lib/validation/rules.ts` | `validatePositive`, `validateNonNegative`, `validateRange` en het `ValidationResult`-type. |
| **Utils** | `src/lib/utils/constants.ts` | Gedeelde constanten: `VAT_RATES`, `TAX_2026`, `AHK_2026`, `AK_2026`. |
| **Types** | `src/lib/types/calculator.ts` | Gedeelde interfaces: `CalculatorResult`, `FieldError`, `CalculatorStatus`. |
| **Calculators** | `src/lib/calculators/btw.ts` | BTW-berekeningen voor 0%, 9% en 21%, inclusief `calculateBtw`, `calculateBtwFromExclusive`, `calculateBtwFromInclusive`. |

### Migratiestatus

- **BTW-cluster** (3 calculators) is volledig gemigreerd naar `src/lib/calculators/btw.ts`:
  - `src/pages/btw-calculator.astro`
  - `src/pages/btw-terugrekenen.astro`
  - `src/pages/btw-inclusief-exclusief.astro`
- Deze pagina's importeren nu `calculateBtw` uit `src/lib/calculators/btw.ts` en `formatEuro` uit `src/lib/format/currency.ts`.
- Overige calculators gebruiken nog hun eigen inline scripts en worden in latere sprints gemigreerd.

### Ontwerpregels voor engine-modules

- **Pure functions** waar mogelijk: geen DOM, geen HTML, geen `document`, geen `window`.
- **Geen tracking of storage**: geen `localStorage`, `fetch`, cookies of event-logging.
- **Geen formatting in rekenmodules**: numerieke modules retourneren ruwe getallen; formatting gebeurt in de pagina of in `src/lib/format/`.
- **Pagina-scripts doen alleen DOM-wiring**: invoer uitlezen, engine aanroepen, resultaat in DOM tonen, foutmeldingen toggelen.

---

## Geplande componenten

### NextStepBlock

| Veld | Waarde |
|------|--------|
| **Status** | 📋 Gepland (v0.2) |
| **Locatie** | `src/components/NextStepBlock.astro` (toekomstig) |

**Doel:** Journey-gebaseerde vervolgstappen-blok onder calculatorresultaten. Leest uit `next-step-blocks.yml` (of een API).

**Minimale props (ontwerp):**
```ts
interface NextStepItem {
  label: string;
  href: string;
  reason: string;
}
interface Props {
  source_calculator: string;   // welke calculator staat de bezoeker op?
  items: NextStepItem[];        // max 5
}
```

**SEO/Privacy:** Alleen tonen na resultaat. Geen data automatisch doorgeven zonder opt-in.

---

### CalculatorShell

| Veld | Waarde |
|------|--------|
| **Status** | 📋 Gepland (v0.2) |
| **Locatie** | `src/components/CalculatorShell.astro` (toekomstig) |

**Doel:** Herbruikbare wrapper voor elke calculatorpagina — vervangt handmatig gedupliceerde `<div class="calculator-card calc-modern">`-structuur.

**Minimale props (ontwerp):**
```ts
interface Props {
  title: string;
  subtitle: string;
  // slot voor calculator-inhoud
}
```

**Gebruik (toekomst):**
```astro
<CalculatorShell title="BTW Calculator" subtitle="...">
  <CalculatorFields>...</CalculatorFields>
  <ResultCard>...</ResultCard>
</CalculatorShell>
```

---

### ResultCard

| Veld | Waarde |
|------|--------|
| **Status** | 📋 Gepland (v0.2) |
| **Locatie** | `src/components/ResultCard.astro` (toekomstig) |

**Doel:** Gestandaardiseerde resultaatkaart met indicatiebadge, result-value, rijen, en result-note. Vervangt per-pagina result-box markup.

**Minimale props (ontwerp):**
```ts
interface Row {
  label: string;
  valueId: string;   // ID voor JS-update
}
interface Props {
  heading: string;
  isIndicatie?: boolean;   // toon badge "Indicatie"
  rows: Row[];
}
```

---

### InputField

| Veld | Waarde |
|------|--------|
| **Status** | 📋 Gepland (v0.2) |
| **Locatie** | `src/components/InputField.astro` (toekomstig) |

**Doel:** Gestandaardiseerd invoerveld met label, hint, prefix/suffix. Vervangt handmatig gedupliceerde `<div class="form-group">`-structuur.

**Minimale props (ontwerp):**
```ts
interface Props {
  id: string;
  label: string;
  hint?: string;
  prefix?: string;     // "€"
  suffix?: string;     // "%"
  type?: string;       // "number" | "text" | "select"
  placeholder?: string;
  min?: number;
  step?: number;
  value?: number | string;
}
```

---

### FAQBlock

| Veld | Waarde |
|------|--------|
| **Status** | 📋 Gepland (v0.3) |
| **Locatie** | `src/components/FAQBlock.astro` (toekomstig) |

**Doel:** Gestandaardiseerd FAQ-blok met `<details>`/`<summary>`-elementen. Vervangt handmatige per-pagina FAQ-structuur.

**Minimale props (ontwerp):**
```ts
interface QA { question: string; answer: string; }
interface Props {
  heading?: string;     // "Veelgestelde vragen"
  items: QA[];
}
```

**SEO:** FAQ items komen in aanmerking voor rich results (Google FAQ-snippet). Voeg structured data toe indien mogelijk.

---

### Breadcrumbs

| Veld | Waarde |
|------|--------|
| **Status** | 📋 Gepland (v0.3) |
| **Locatie** | `src/components/Breadcrumbs.astro` (toekomstig) |

**Doel:** Breadcrumb-navigatie bovenaan elke pagina. Verbetert SEO (Google toont breadcrumbs in SERP) en gebruikersnavigatie.

**Minimale props (ontwerp):**
```ts
interface Crumb { label: string; href: string; }
interface Props { crumbs: Crumb[]; }
```

**Voorbeeld:** Home › Inkomen & Salaris › Bruto Netto 2026

**SEO:** `<ol>` met `itemprop`/`itemscope` (Schema.org `BreadcrumbList`).

---

### OfficialSourceBlock

| Veld | Waarde |
|------|--------|
| **Status** | 📋 Gepland (v0.2) |
| **Locatie** | `src/components/OfficialSourceBlock.astro` (toekomstig) |

**Doel:** Kleiner, compacter blok voor bronverwijzing (vervangt SourceCards waar 1-3 bronnen voldoende zijn). Voor gebruik in de uitlegsectie (niet als vervanging van de bronnenkaart).

**Minimale props (ontwerp):**
```ts
interface Source { name: string; url: string; }
interface Props { sources: Source[]; }
```

---

## Component toevoegen

Nieuwe componenten volgen deze stappen:

1. **Bestand aanmaken:** `src/components/Naam.astro`
2. **Props definiëren** in de frontmatter (TypeScript `interface`).
3. **Eigen `<style>`** — component moet onafhankelijk zijn van `global.css` voor herbruikbaarheid.
4. **Documenteren** in deze file (`04-COMPONENT-LIBRARY.md`).
5. **Vermelden in de changelog** bij de eerstvolgende deploy.
6. **Geen externe dependencies** — Astro + vanilla HTML/CSS/TS is voldoende.
