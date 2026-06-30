# 05 — Calculator Standards

> **Doel:** Blauwdruk voor het bouwen en onderhouden van calculatorpagina's. Iedere calculator volgt deze standaard.  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Standaardpagina-opbouw](#standaardpagina-opbouw)
   - [1. Hero / Titel](#1-hero--titel)
   - [2. Intro / Subtitle](#2-intro--subtitle)
   - [3. AdSlot](#3-adslot)
   - [4. Calculator-formulier](#4-calculator-formulier)
   - [5. Resultaat](#5-resultaat)
   - [6. Next Step Block (toekomst)](#6-next-step-block-toekomst)
   - [7. Uitleg](#7-uitleg)
   - [8. Voorbeelden](#8-voorbeelden)
   - [9. FAQ](#9-faq)
   - [10. Officiële bronnen](#10-officiële-bronnen)
   - [11. Gerelateerde calculators](#11-gerelateerde-calculators)
   - [12. Disclaimer](#12-disclaimer)
   - [13. Laatste update](#13-laatste-update)
2. [Naming conventions](#naming-conventions)
3. [Input/output-regels](#inputoutput-regels)
4. [Foutmeldingen](#foutmeldingen)
5. [Indicatie-disclaimers](#indicatie-disclaimers)
6. [Officiële bronnen](#officiële-bronnen-1)
7. [Structured data per calculator](#structured-data-per-calculator)
8. [Client-side privacy](#client-side-privacy)
9. [Data reuse (toekomst)](#data-reuse-toekomst)
10. [Calculator Engine](#calculator-engine)

---

## Standaardpagina-opbouw

```
┌─────────────────────────────────┐
│ BaseLayout                      │
│   <title> + <meta description>  │  ← per pagina uniek, via props
│                                 │
│ 1. H1 Hero / Titel              │  ← page-title
│ 2. Intro / Subtitle             │  ← page-subtitle
│ 3. AdSlot                       │  ← boven de calculator
│                                 │
│ 4. Calculator-formulier          │  ← .calculator-card.calc-modern
│    ┌───────────────────────────┐│
│    │ .calc-fields              ││  ← rustig invoerblok
│    │   .form-group × n         ││  ← elk veld: label + input
│    │   .calc-group-title (opt) ││  ← subkopjes voor groepen
│    │   .calc-field-hint (opt)  ││  ← bv. BPM-hint
│    │ [Bereken-knop]             ││  ← .btn.btn-primary.btn-lg.calc-btn
│    │ .calc-error                ││  ← foutmelding (verborgen)
│    ├───────────────────────────┤│
│    │ .result-box               ││  ← resultaatkaart
│    │   <h3> + .badge-indicatie ││
│    │   .result-value           ││  ← hoofdgetal (bv. netto p/m)
│    │   .result-row × n         ││  ← detailregels
│    │   .result-note            ││  ← "Deze berekening is een indicatie."
│    └───────────────────────────┘│
│                                 │
│ 6. Next Step Block (toekomst)   │  ← journey-gestuurde vervolgstap
│                                 │
│ 7. Uitleg                       │  ← H2: Hoe werkt deze berekening?
│ 8. Voorbeelden                  │  ← H3: Voorbeelden met bedragen
│ 9. FAQ                          │  ← H2: Veelgestelde vragen + <details>
│ 10. Officiële bronnen            │  ← SourceCards of <ul> met links
│ 11. Gerelateerde calculators     │  ← CrossSellCards
│ 12. Disclaimer                  │  ← .disclaimer
│ 13. Laatste update              │  ← .last-updated
└─────────────────────────────────┘
```

### 1. Hero / Titel

- `<h1 class="page-title">...</h1>`
- Kort, exact keyword. Geen marketingtaal.
- Voorbeeld: `Auto importkosten berekenen` (niet: "Bereken nu snel je auto-importkosten!")

### 2. Intro / Subtitle

- `<p class="page-subtitle">...</p>`
- Maximaal 2 zinnen. Vermeld altijd dat het een indicatie is.
- Voorbeeld: "Bereken een indicatie van de totale kosten voor het importeren van een auto of camper naar Nederland. De uitkomst is een indicatie."

### 3. AdSlot

- `<AdSlot slot="..." format="auto" style="min-height:100px" />`
- **Altijd boven** de calculator-card (tussen subtitle en formulier).
- Optioneel een tweede AdSlot **na** de calculator-card (tussen kaart en uitleg).
- **Nooit** in het formulier zelf (tussen invoervelden en knop/resultaat).

### 4. Calculator-formulier

- Container: `<div class="calculator-card calc-modern">`
- Velden in `<div class="calc-fields">` (rustig grijs invoerblok).
- Elk veld: `<div class="form-group">` met `<label>` + input/select/radio-group/toggle.
- **Prefix €:** `<div class="input-prefix"><span class="prefix">€</span><input .../></div>` — de CSS zorgt voor `padding-left: 2.5rem` zodat het €-teken niet overlapt.
- **Suffix %:** `<div class="input-suffix"><input .../><span class="suffix">%</span></div>` — `padding-right: 3rem`.
- **Keuze-knoppen:** `<div class="radio-group" id="...">` met `<button data-... class="active">` — de CSS styleert ze als moderne cards.
- **Toggles:** `<div class="toggle-row">` met `<label class="toggle"><input type="checkbox"><span class="slider"></span></label>`.
- **Bereken-knop:** `<button id="berekenBtn" class="btn btn-primary btn-lg calc-btn">Bereken ...</button>` — full-width, primair blauw.
- **Foutmelding:** `<p class="calc-error" id="calcError" style="display:none;">...</p>` — amber-kleurig, getoond bij ongeldige invoer, anders verborgen.

### 5. Resultaat

- `<div class="result-box" id="result">` (met `style="display:none;"` indien alleen getoond bij geldige invoer).
- **Kop:** `<h3>... <span class="badge-indicatie">Indicatie</span></h3>` — badge naast de titel.
- **Hoofdgetal:** `<div class="result-value" id="result...">—</div>` — groot, dikgedrukt.
- **Detailregels:** `<div class="result-row"><span class="label">...</span><span class="value" id="...">—</span></div>` — tussenkopjes met `.result-divider`.
- **Indicatie-note:** `<p class="result-note">Deze berekening is een indicatie.</p>` — verplicht in elke resultaat-box.
- Bij twee resultaatsecties (zoals toeslagen) krijgt elke sectie een eigen `.result-box`.

### 6. Next Step Block (toekomst)

- Vervangt of vult de CrossSellCards aan als journey-gestuurde vervolgstap direct onder het resultaat.
- Zie `/docs/journey/next-steps/` voor de specificatie.

### 7. Uitleg

- `<h2>Hoe werkt deze berekening?</h2>` of een descriptieve variant.
- Leg de methode uit — inclusief aannames (bv. 8% vakantiegeld, schijfgrenzen, rentepercentage).
- Gebruik `<ul>`/`<ol>` voor stappen.
- Toon formules in `.formula-box` waar relevant (bv. btw-terugrekenen).

### 8. Voorbeelden

- `<h3>Voorbeeldberekening</h3>` of meerdere voorbeelden.
- Gebruik concrete bedragen: "Stel, je verdient € 3.500 bruto per maand..."
- Rond af op hele euro's met "circa" of "ongeveer" bij indicatieve uitkomsten.
- Geef minimaal 1 voorbeeld met standaardwaarden en 1 randgeval (bv. zonder loonheffingskorting, of met 0% btw).

### 9. FAQ

- `<h2>Veelgestelde vragen</h2>` gevolgd door `<details>`-elementen met `<summary>`.
- 5 tot 8 vragen — dekt de belangrijkste gebruikersvragen en veelgemaakte fouten.
- Geen marketingtaal in antwoorden — feitelijk, verwijzend naar officiële bronnen.
- Minimaal één vraag over "Waarom is dit een indicatie?".

### 10. Officiële bronnen

- `<SourceCards>` voor 4+ bronnen of `<OfficialSourceBlock>` (toekomst) voor 1-3 bronnen.
- Altijd `target="_blank" rel="noopener"` voor externe links.
- Uitsluitend officiële domeinen: `belastingdienst.nl`, `rdw.nl`, `rijksoverheid.nl`, `toeslagen.nl`, `nibud.nl`, `ondernemersplein.overheid.nl`.
- Geen commerciële bronnen, blogs, vergelijkingssites.

### 11. Gerelateerde calculators

- `<CrossSellCards>` met 3-5 gerelateerde calculators.
- Titel: "Ook handig om te berekenen" of "Meer over [cluster]".
- In de toekomst: `<NextStepBlock>` voor contextuele aanbevelingen.

### 12. Disclaimer

- `<p class="disclaimer">...</p>` — minimaal 2 zinnen:
  1. "Deze berekening is een indicatie."
  2. "Controleer belangrijke bedragen altijd via de officiële bronnen van [Belastingdienst / RDW / ...]."
- Aanvullend: "Aan deze indicatie kunnen geen rechten worden ontleend."

### 13. Laatste update

- `<p class="last-updated">Laatst bijgewerkt: [datum]</p>`
- Datum bijwerken bij elke inhoudelijke wijziging (niet bij alleen CSS-fixes).
- Formaat: `12 juni 2026` (Nederlands, maand uitgeschreven).

---

## Naming conventions

| Element | Conventie | Voorbeeld |
|---------|-----------|-----------|
| **Bestandsnaam** | kebab-case | `btw-calculator.astro` |
| **Route** | `/` + kebab-case + `/` | `/btw-calculator/` |
| **CSS-klasse** | kebab-case | `.calc-modern`, `.result-box` |
| **Input-ID** | camelCase | `grossSalary`, `purchasePrice` |
| **Functienaam** | camelCase | `calculate`, `formatEuro`, `berekenBelasting` |
| **Variabele** | camelCase | `btwRate`, `nlPrice` |
| **TypeScript type** | string union | `"excl" \| "incl"` |
| **Component** | PascalCase | `CrossSellCards`, `SourceCards` |

---

## Input/output-regels

### Input
| Regel | Toelichting |
|-------|-------------|
| `min="0"` op alle geldvelden en aantallen | Voorkomt negatieve browser-invoer (type="number" ondersteunt min) |
| `step="0.01"` voor BTW-gerelateerde velden | Cent-nauwkeurigheid |
| `step="1"` voor salarisvelden | Hele euro's |
| Placeholder met "Bijv. 15000" | Suggestief, maar ontworpen om te werken met de standaard `value` |
| Standaard `value` op het meest voorkomende bedrag | Verlaagt invoerwerk |
| Validatie in `calculate()` | `isNaN(x) \|\| x < 0` voor verberg/error |

### Output
| Regel | Toelichting |
|-------|-------------|
| `formatEuro(n)` | `€ 1.234,56` — punt voor duizendtallen, komma voor decimalen |
| Hele euro's via `Math.round(n).toFixed(0)` | Geen centen bij salarissen |
| Decimalen via `n.toFixed(2)` | Bij BTW-bedragen |
| "—" (em-dash) als initiële waarde | Placeholder vóór berekening |
| "circa" / "ongeveer" bij uitkomsten die afronding of iteratieve benadering gebruiken | Transparantie over precisie |

---

## Foutmeldingen

| Situatie | Gedrag |
|----------|--------|
| **Leeg veld** | Resultaat verbergen of "—" tonen. `.calc-error` tonen met: "Vul een geldig bedrag in." |
| **Negatieve invoer** | Idem. |
| **Nul-waarde in cruciaal veld** | Idem (bv. aankoopprijs ≤ 0). |
| **Berekening onmogelijk** (bv. deling door 0) | Resultaat verbergen, geen crash. |

**Tekst-stijl foutmeldingen:**
- Kort en vriendelijk: "Vul een geldig bruto maandsalaris in (hoger dan 0)."
- Kleur: amber `#b45309` tekst op `#fffbeb` achtergrond, `#fcd34d` border.
- Geen "Error!" / "Fout!" — te technisch. Gebruik "Let op" of directe instructie.
- De `.calc-error` staat **buiten** de `.calc-fields`, **boven** de `.result-box`.

---

## Indicatie-disclaimers

**Verplichte elementen:**

1. **Badge** op de resultaatkop: `<span class="badge-indicatie">Indicatie</span>`
2. **Note** in de resultaatbox: `<p class="result-note">Deze berekening is een indicatie.</p>`
3. **Disclaimer** onderaan de pagina: minimaal "Deze berekening is een indicatie. Controleer belangrijke bedragen altijd via de officiële bronnen van [instantie]."
4. **Intro-tekst** vermeldt al dat de uitkomst een indicatie is.

**Optioneel (contextueel):**
5. Inline-waarschuwing bij specifieke velden: bv. BPM-veld "wordt niet automatisch berekend."

**Verboden termen in/nabij resultaten:**
- "exact", "foutloos", "gegarandeerd", "100% zeker", "officiële berekening"
- "je hebt recht op", "dit is je bpm", "definitieve bpm/kosten"
- "je bespaart altijd", "gegarandeerd goedkoper"

---

## Officiële bronnen

**Toegestane domeinen:**
- `belastingdienst.nl` — BTW, Box 1, BPM, heffingskortingen, toeslagen
- `rdw.nl` — voertuiginvoer, kenteken, keuring
- `rijksoverheid.nl` — hypotheek, import, wetgeving
- `toeslagen.nl` — toeslagen (Dienst Toeslagen)
- `nibud.nl` — budgetvoorlichting
- `ondernemersplein.overheid.nl` — subsidies, MKB-regelingen, startersaftrek

**Niet toegestaan:**
- Commerciële partijen, blogs, vergelijkingssites, fora, nieuwsartikelen.
- Links naar niet-bestaande pagina's (`_bak/`).
- Links zonder `target="_blank" rel="noopener"` (extern).

---

## Structured data per calculator

**Huidig:** alleen `WebSite`-schema via BaseLayout (site-breed). Geldig JSON-LD, geen claims.

**Toekomst:** per calculator een `FAQPage`- of `HowTo`-schema waar relevant:
- `FAQPage` via de FAQ-sectie (Google toont rich results).
- `HowTo` via de stappen in de uitleg.
- `SoftwareApplication` of `WebApplication` voor de calculator als tool.

Wordt toegevoegd in Fase 2. **Geen calculatorresultaten in structured data** — alleen statische FAQ/stappen, niet de dynamische uitkomsten.

---

## Client-side privacy

Zie ook `03-DEVELOPMENT-STANDARDS.md` en `docs/journey/03-DATA-HANDOFF.md`.

- **Geen invoeropslag** — geen `localStorage`, geen `fetch`, geen `form.submit`.
- **Berekeningen in de browser** — geen server-side processing.
- **Geen persoonsgegevens** — calculators vragen nooit om naam, e-mail, BSN, adres.
- **Geen tracking** — geen Google Analytics, geen event-tracking, geen heatmaps.
- **AdSense apart** — laadt pas na CookieConsent; geen koppeling aan calculator-invoer.

---

## Data reuse (toekomst)

Vanaf Fase 2 (zie roadmap):

1. **Query parameters:** `/toeslagen-calculator/?income=36300` — de volgende calculator leest `URLSearchParams`.
2. **localStorage opt-in:** "Deze gegevens onthouden? (alleen lokaal, 7 dagen)" — knop onder het resultaat.
3. **Geen automatische doorgifte** zonder expliciete actie van de bezoeker.
4. **Altijd anoniem** — geen koppeling aan persoon, sessie of IP-adres.

Zie `docs/journey/03-DATA-HANDOFF.md` voor de volledige specificatie.

---

## 10. Calculator Engine

Alle nieuwe calculatorlogica moet — waar mogelijk — ondergebracht worden in `src/lib/` in plaats van inline in pagina-scripts. De pagina-scripts zelf beperken zich tot **DOM-wiring**: invoer uitlezen, de engine aanroepen en resultaten tonen.

### Regels voor engine-modules

| Regel | Toelichting |
|-------|-------------|
| **Pure functies** | Rekenfuncties mogen geen DOM, HTML, `document` of `window` gebruiken. |
| **Geen tracking** | Geen Google Analytics, event-tracking, heatmaps of andere meetpixels. |
| **Geen storage** | Geen `localStorage`, `sessionStorage`, `fetch`, `form.submit` of cookies. |
| **Geen formatting in rekenmodules** | Rekenmodules retourneren ruwe getallen; formatting gebeurt in `src/lib/format/` of in de pagina. |
| **Geen persoonsgegevens** | Engine-modules vragen nooit om naam, e-mail, BSN, adres of andere identificerende gegevens. |

### Regels voor pagina-scripts

| Regel | Toelichting |
|-------|-------------|
| **Alleen DOM-wiring** | Pagina-scripts lezen invoer uit, roepen engine-functies aan, en schrijven resultaten terug naar het DOM. |
| **Geen formules in pagina's** | Herhaal geen rekenformules in `<script>`-tags; importeer ze uit `src/lib/calculators/`. |
| **Geen duplicatie** | Formatting en validatie worden geïmporteerd uit `src/lib/format/` en `src/lib/validation/`. |
| **Foutmeldingstructuur behouden** | Gebruik de bestaande `.calc-error` en `.result-box` structuur; pas alleen de getoonde waarden aan. |
