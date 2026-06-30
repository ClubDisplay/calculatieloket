# 02 — App UX Blueprint

> **Doel:** Ontwerp het ideale calculator-scherm voor Calculatieloket.nl als een app/tool.  
> **Laatst bijgewerkt:** 2026-06-30

---

## Ontwerprincipes

1. **Één vraag per scherm.** De gebruiker weet wat hij wil berekenen; de pagina beantwoordt dat direct.
2. **Direct resultaat.** Zodra een geldige invoer bestaat, toont het resultaat. Geen extra klik nodig.
3. **Hiërarchie.** Het antwoord is het grootste element; alles daaromheen is context.
4. **Compact op mobiel.** Invoer en resultaat passen binnen één scrollport; context is inklapbaar.
5. **Vertrouwen.** Bronnen, disclaimer en laatste-update-datum zijn altijd zichtbaar.

---

## Ideale pagina-structuur

### 1. Hero micro-header

```
[icon]  Bruto → Netto 2026
        “Bereken in één klik wat je nettoloon is.”
```

- Klein, niet dominant.
- Bevat icoon, korte titel en 1-zin-promise.
- Geen lange introductie.

### 2. Input Card

Eén kaart met alle invoervelden:

- **Veldgroepen** logisch bij elkaar (bijv. “Inkomsten”, “Pensioen”, “Opties”).
- **Slimme defaults** zodat er meteen een resultaat is.
- **Inline labels** boven het veld, geen placeholders als vervanging.
- **Hulpteksten** direct onder het veld, niet in een tooltip.
- **Foutmeldingen** direct onder het veld, in rood.
- **Radio’s en toggles** als gedeelde componenten met duidelijke actieve states.

Voorbeeld `bruto-netto-2026`:

```
┌─────────────────────────────────────┐
│  Bruto maandsalaris          [€]3500│
│  Pensioenpremie (per maand)    [€]150│
│  [✓] Loonheffingskorting toepassen  │
│                                     │
│  [        Bereken netto        ]    │
└─────────────────────────────────────┘
```

### 3. Result Card

Grote, rustige kaart met het antwoord:

- **Hero number** — het belangrijkste getal groot weergegeven (bijv. € 2.666).
- **Badge “Indicatie”** naast het getal.
- **Breakdown** — belangrijkste tussenstappen in een lijst.
- **Acties** — “Kopieer resultaat”, “Deel link”, “Reset invoer”.
- **Disclaimer** — korte zin onder het resultaat.

Voorbeeld:

```
┌─────────────────────────────────────┐
│  Jouw netto salaris per maand       │
│  [Indicatie]                        │
│                                     │
│           € 2.666                   │
│                                     │
│  Bruto jaarsalaris      € 45.360    │
│  Pensioenpremie           € 1.800    │
│  Inkomstenbelasting      € 15.545    │
│  Heffingskortingen       € 7.289    │
│  ─────────────────────────────────  │
│  Netto per jaar          € 31.988   │
│                                     │
│  [Kopieer]  [Deel]  [Reset]         │
│  Dit is een indicatie.              │
└─────────────────────────────────────┘
```

### 4. “Wat kun je hiermee?”

3 tot 4 kaartjes met concrete use cases:

- “Bekijk welke toeslagen je kunt krijgen.”
- “Bereken je maximale hypotheek.”
- “Vergelijk loondienst met ZZP.”
- “Plan je vakantiegeld.”

Deze kaartjes zijn contextueel: ze sluiten aan op het resultaat en de rekenwaarden.

### 5. Next Steps

- Gerelateerde calculators (`CrossSellCards` hergebruiken).
- Directe acties: “Open toeslagen calculator met dit inkomen” (via URL parameter).
- Optioneel: “Bewaar deze uitkomst” (alleen localStorage, nooit account).

### 6. Bronnen

`SourceCards` component:

- Officiële bronnen met label “Officiële bron”.
- Korte beschrijving per bron.
- Openen in nieuw tabblad.

### 7. FAQ

Herbruikbaar `FaqAccordion` component:

- Maximaal 5 vragen standaard zichtbaar.
- “Toon meer” voor extra vragen.
- Schema.org FAQPage markup per vraag.

### 8. Footer van de tool

- Korte disclaimer.
- “Laatst bijgewerkt: dd-mm-yyyy”.
- Terug naar overzicht.

---

## Mobiel ontwerp

- Input en resultaat staan onder elkaar.
- Hero number blijft groot (clamp 2.5rem → 3.5rem).
- Breakdown wordt een compacte lijst, eventueel inklapbaar.
- CTA-knop sticky onderaan het scherm, zodat deze altijd bereikbaar is.
- “Wat kun je hiermee?” en FAQ staan onder het resultaat, ingeklapt tot de gebruiker ze opent.

---

## Componentenarchitectuur

```
CalculatorShell
├── HeroHeader
├── InputPanel
│   ├── InputGroup
│   ├── CurrencyInput
│   ├── PercentInput
│   ├── RadioGroup
│   └── Toggle
├── ResultPanel
│   ├── ResultHero
│   ├── ResultBreakdown
│   └── ResultActions
├── UseCasesPanel
├── NextSteps (reuse CrossSellCards)
├── SourcesPanel (reuse SourceCards)
├── FaqAccordion
└── ToolFooter
```

---

## Interactiepatronen

- **Live calculation:** zodra een geldige waarde in alle verplichte velden staat, wordt het resultaat bijgewerkt. De “Bereken”-knop is een fallback voor toegankelijkheid en oude browsers.
- **URL state:** `?bruto=3500&pensioen=150&loonheffing=1` vult de velden in en toont het resultaat direct. Deelbare link wordt bij elke wijziging bijgewerkt.
- **Keyboard:** Tab door velden, Enter triggert focus op resultaat, Escape reset.
- **Error states:** velden met ongeldige invoer krijgen een rode border en een inline melding; het resultaat blijft leeg of toont “—”.
- **Loading:** niet van toepassing (client-side), maar eventueel een korte fade-in bij pagina load.

---

## Design tokens

Gebruik bestaande CSS custom properties:

- `--color-primary` voor CTA en accenten.
- `--color-surface` voor kaarten.
- `--color-border` voor scheidingen.
- `--radius` en `--radius-sm` voor afgeronde hoeken.
- `--shadow-md` en `--shadow-lg` voor diepte.
- `--font` voor typografie.

Geen nieuwe kleuren of lettertypen introduceren zonder design review.

---

## SEO, AdSense en meetpunten

De UX is ontworpen met SEO en AdSense als harde randvoorwaarden.

### AdSense-plaatsingsregels

- **Toegestaan:** boven de tool (max 1), onder de resultaatkaart, tussen contentblokken.
- **Verboden:** tussen invoer en resultaat, in de resultaatkaart, sticky ad-banners.
- Alle ad-containers krijgen een `min-height` om layout shift te voorkomen.

### Server-rendered content

De volgende blokken moeten in de statische HTML staan:

- Hero micro-header, invoervelden, initiële resultaat.
- Uitleg, voorbeelden, veelgemaakte fouten, FAQ.
- Bronnen, disclaimer, update-datum, gerelateerde calculators.

Client-side mag alleen het resultaat bijwerken op basis van gebruikersinvoer.

### Meetpunten

- Organic clicks, pageviews per sessie, scroll depth.
- Calculator starts, completions, result views, next-step clicks.
- Ad RPM, viewability, layout shift (CLS).

Zie `06-SEO-ADSENSE-STRATEGY.md` voor de volledige strategie.
