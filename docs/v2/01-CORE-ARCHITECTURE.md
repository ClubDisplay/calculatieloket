# 01 — Core Architecture

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf de modulaire opbouw van Atlas v2. Elke module heeft één duidelijke verantwoordelijkheid en communiceert via goed gedefinieerde interfaces.

---

## Module-overzicht

```
Atlas v2
├── Calculation Engine      # pure rekenfuncties per domein
├── Rule Engine             # land- en product-specifieke regels
├── Validation Engine       # invoervalidatie en foutmeldingen
├── Formatting Engine       # valuta, percentages, datums
├── Journey Engine          # next steps, data reuse, flows
├── SEO Engine              # metadata, sitemap, structured data
├── Content Engine          # FAQ, uitleg, voorbeelden, disclaimers
├── Component Engine        # herbruikbare UI-componenten
├── Localization Engine     # taal, valuta, bronnen, wetgeving
├── AI Engine               # instructies, prompts, code-generatie
└── Partner / API Layer     # widgets, API, white-label
```

---

## 1. Calculation Engine

**Verantwoordelijkheid:** Alle numerieke berekeningen uitvoeren als pure functies.

- BTW, belasting, hypotheek, toeslagen, ZZP, importkosten, etc.
- Geen DOM, geen HTML, geen storage, geen tracking.
- Input → Output. Altijd testbaar zonder browser.

**Voorbeeldmodules:** `calculators/btw.ts`, `calculators/tax.ts`, `calculators/mortgage.ts`.

---

## 2. Rule Engine

**Verantwoordelijkheid:** Land- en product-specifieke regels scheiden van generieke rekenlogica.

- Bijvoorbeeld: BTW-tarieven in NL (21/9/0) vs. BE (21/12/6/0).
- Bijvoorbeeld: Box 1-tarieven in NL vs. Duitse inkomstenbelasting.
- Regels worden per locale geladen (`nl-NL`, `be-NL`, `de-DE`, etc.).

**Voordeel:** Dezelfde calculator kan werken in meerdere landen zonder code te dupliceren.

---

## 3. Validation Engine

**Verantwoordelijkheid:** Invoer veilig omzetten naar getallen en valideren.

- Parsing (komma/dot decimalen, duizendtallenscheiding).
- Range-checks, verplichte velden, afhankelijkheden tussen velden.
- Duidelijke, lokale foutmeldingen.

---

## 4. Formatting Engine

**Verantwoordelijkheid:** Getallen, valuta, percentages en datums presenteren.

- `€ 1.234,56` voor Nederland.
- `1.234,56 €` of `$1,234.56` voor andere locales indien nodig.
- Decimalen: 2 voor BTW, 0 voor salarissen, etc.

---

## 5. Journey Engine

**Verantwoordelijkheid:** Gebruikers van de ene calculator naar de volgende leiden.

- Next Step Blocks (reeds gepland in v1).
- Data reuse via query parameters of opt-in localStorage.
- Conversion opportunities en officiële bronnen per journey.

---

## 6. SEO Engine

**Verantwoordelijkheid:** Vanuit calculatordefinities metadata en structured data genereren.

- Per pagina: `title`, `meta description`, `canonical`, `og:` tags.
- Sitemap met correcte URLs en trailing slashes.
- JSON-LD: `WebSite`, `FAQPage`, `HowTo`, `WebApplication`.

---

## 7. Content Engine

**Verantwoordelijkheid:** FAQ, uitleg, voorbeelden, disclaimers en bronnen beheren.

- Content is per locale en per product configureerbaar.
- Ondersteunt placeholders voor dynamische waarden (bijv. `{{currentYear}}`).
- Geen verboden termen: “exact”, “gegarandeerd”, “je hebt recht op”.

---

## 8. Component Engine

**Verantwoordelijkheid:** Herbruikbare UI-componenten leveren.

- `CalculatorShell`, `InputField`, `ResultCard`, `RadioGroup`, `Toggle`, `FAQBlock`, etc.
- Componenten zijn framework-agnostic waar mogelijk, maar kunnen per frontendstack geïmplementeerd worden.

---

## 9. Localization Engine

**Verantwoordelijkheid:** Per land/taal de juiste instellingen laden.

- Valuta, decimalen, datumnotatie.
- Officiële bronnen (Belastingdienst, RDW, SPF Finance, etc.).
- Wetgeving en drempelwaarden per land.

---

## 10. AI Engine

**Verantwoordelijkheid:** Atlas bedienbaar maken voor AI-assistenten.

- Declarative calculator definitions (YAML).
- Standaard prompts en context voor code-generatie.
- Review-regels en guardrails (geen verboden termen, geen formulewijzigingen zonder akkoord).

---

## 11. Partner / API Layer

**Verantwoordelijkheid:** Atlas beschikbaar maken voor derden.

- White-label widgets (embedden op partnerwebsites).
- REST/JSON API voor calculatorresultaten.
- Partner-specifieke styling en branding.

---

## Integratie tussen modules

```
Calculator Definition (YAML)
        │
        ▼
┌───────────────────┐
│ Rule Engine       │ ← locale/regels
│ Validation Engine │ ← input parsing/validatie
│ Calculation Engine│ ← pure rekenfuncties
│ Formatting Engine │ ← output formatting
└───────────────────┘
        │
        ▼
Component Engine + Content Engine + SEO Engine
        │
        ▼
Static page / Widget / API response
```

---

## Migratiepad

Zie `09-MIGRATION-FROM-V1.md` voor de geleidelijke overgang van de huidige v1-implementatie naar Atlas v2.
