# 07 — Calculator Component Library v0.1

> **Doel:** Documenteren van de eerste herbruikbare app/tool componenten voor Calculatieloket.nl.  
> **Laatst bijgewerkt:** 2026-06-30

---

## Status

De eerste versie (v0.1) van de calculator component library is gebouwd. De componenten staan in `src/components/calculator/` en zijn getest via de demo-pagina `/demo/calculator-shell/`.

**Belangrijk:** deze componenten zijn nog niet op bestaande calculatorpagina’s toegepast. Dat gebeurt in Sprint 078.

---

## Componenten

### 1. `CalculatorShell.astro`

Container voor een complete calculatorpagina. Biedt een responsive two-column layout: links de tool (input + resultaat), rechts context (use cases, next steps, bronnen, FAQ). Op mobiel wordt dit één kolom.

**Props:**

| Prop | Type | Verplicht | Omschrijving |
|------|------|-----------|--------------|
| `title` | `string` | nee | H1-titel van de pagina. |
| `subtitle` | `string` | nee | Korte omschrijving onder de titel. |

**Slots:**

- `input` — invoerkaart
- `result` — resultaatkaart
- `useCases` — “Wat kun je hiermee?”
- `nextSteps` — gerelateerde calculators
- `sources` — bronnen
- `faq` — FAQ accordion
- `footer` — disclaimer en update-datum

---

### 2. `InputPanel.astro`

Kaart voor alle invoervelden.

**Props:**

| Prop | Type | Verplicht | Omschrijving |
|------|------|-----------|--------------|
| `title` | `string` | nee | Titel bovenaan de kaart. |

**Slot:** default — invoervelden, radio’s, toggles, primaire CTA.

---

### 3. `ResultPanel.astro`

Kaart voor het antwoord. Toont een groot hero-getal, optionele badge, breakdown en acties.

**Props:**

| Prop | Type | Verplicht | Omschrijving |
|------|------|-----------|--------------|
| `heroValue` | `string` | ja | Het hoofdresultaat (bijv. "€ 2.970"). |
| `title` | `string` | nee | Titel bovenaan de kaart. |
| `heroLabel` | `string` | nee | Label boven het hero-getal. Default: "Resultaat". |
| `badge` | `string` | nee | Badge naast het label. Default: "Indicatie". |

**Slots:**

- default — breakdown rijen
- `actions` — knoppen onder het resultaat (bijv. kopieer, deel, reset)

---

### 4. `UseCasesPanel.astro`

Panel met 3 tot 4 contextuele use-case kaartjes die de gebruiker naar gerelateerde tools leiden.

**Props:**

| Prop | Type | Verplicht | Omschrijving |
|------|------|-----------|--------------|
| `items` | `Array` | ja | Use-case objecten. |
| `title` | `string` | nee | Titel. Default: "Wat kun je hiermee?". |

**Item structuur:**

```ts
{
  title: string;
  description: string;
  href: string;
  accent?: string; // hex-kleur voor hover-accent
}
```

---

### 5. `FaqAccordion.astro`

Herbruikbare FAQ op basis van native `<details>`/`<summary>`.

**Props:**

| Prop | Type | Verplicht | Omschrijving |
|------|------|-----------|--------------|
| `items` | `Array` | ja | Vraag/antwoord paren. |
| `title` | `string` | nee | Titel. Default: "Veelgestelde vragen". |

**Item structuur:**

```ts
{
  question: string;
  answer: string; // kan HTML bevatten
}
```

**Toegankelijkheid:** het eerste item is standaard open; de rest is dicht. Geen JavaScript nodig.

---

### 6. `ToolFooter.astro`

Footer met disclaimer en laatste-update-datum.

**Props:**

| Prop | Type | Verplicht | Omschrijving |
|------|------|-----------|--------------|
| `disclaimer` | `string` | nee | Disclaimer tekst. |
| `lastUpdated` | `string` | nee | Datum string. |

---

## Demo-pagina

- **URL:** `/demo/calculator-shell/`
- **Bestand:** `src/pages/demo/calculator-shell.astro`
- **Doel:** Visueel testen van de componenten met een bruto-netto voorbeeld.
- **Data:** gebruikt de bestaande `calculateNetIncomeEstimate2026` engine.

---

## Ontwerprincipes

- **Mobile-first:** op schermen kleiner dan 900px staan input, resultaat en side-content onder elkaar.
- **App/tool gevoel:** grote hero-getallen, duidelijke badges, compacte input.
- **Server-rendered:** invoervelden, initiële resultaat, uitleg, FAQ en bronnen zijn in de statische HTML.
- **Geen ads in tool-flow:** advertenties mogen nooit tussen input en resultaat staan.
- **Generiek:** de componenten zijn geschikt voor bruto-netto, toeslagen, hypotheek, BTW en ZZP.

---

## Gebruiksvoorbeeld

```astro
---
import CalculatorShell from "../components/calculator/CalculatorShell.astro";
import InputPanel from "../components/calculator/InputPanel.astro";
import ResultPanel from "../components/calculator/ResultPanel.astro";
import UseCasesPanel from "../components/calculator/UseCasesPanel.astro";
import FaqAccordion from "../components/calculator/FaqAccordion.astro";
import ToolFooter from "../components/calculator/ToolFooter.astro";
---

<CalculatorShell title="Wat houd ik netto over?" subtitle="Vul je bruto maandsalaris in.">
  <InputPanel title="Jouw situatie" slot="input">
    <!-- invoervelden -->
  </InputPanel>
  <ResultPanel heroValue="€ 2.970" slot="result">
    <!-- breakdown -->
  </ResultPanel>
  <UseCasesPanel items={useCases} slot="useCases" />
  <FaqAccordion items={faq} slot="faq" />
  <ToolFooter slot="footer" lastUpdated="30 juni 2026" />
</CalculatorShell>
```

---

## Volgende stappen

1. **Sprint 078:** toepassen op `bruto-netto-2026.astro`.
2. **Sprint 079:** mobiele UX testen en finetunen.
3. **Sprint 080:** toepassen op `salaris-calculator.astro`.
4. **Sprint 081+:** uitrollen naar overige calculators.

Zie ook `04-FIRST-IMPLEMENTATION-PLAN.md` voor het volledige plan.
