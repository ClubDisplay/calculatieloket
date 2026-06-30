# Calculator Definitions (v2)

> **Status:** Calculator Definition Language v0.1 — Atlas v2 Sprint 002  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Deze map bevat de eerste concrete **Calculator Definitions** voor Atlas v2. Elke definitie beschrijft één calculator op een gestructureerde manier die later door de Atlas Generator verwerkt kan worden.

> **Belangrijk:** deze definities genereren nog **geen** code of pagina's. Ze dienen om de Calculator Definition Language (CDL) te testen en de toekomstige generator voor te bereiden.

---

## Bestanden

| Bestand | Calculator |
|---|---|
| `calculator-definition.schema.md` | Beschrijving van alle velden in CDL v0.1 |
| `btw-calculator.yml` | BTW Calculator |
| `btw-terugrekenen.yml` | BTW Terugrekenen |
| `btw-inclusief-exclusief.yml` | BTW Inclusief/Exclusief |
| `salaris-calculator.yml` | Salaris Calculator |
| `bruto-netto-2026.yml` | Bruto Netto 2026 |
| `hypotheek-calculator.yml` | Hypotheek Calculator |
| `zzp-calculator.yml` | ZZP Calculator |
| `toeslagen-calculator.yml` | Toeslagen Calculator |
| `auto-importkosten-berekenen.yml` | Auto Importkosten Berekenen |

---

## Gebruikte bronnen

Definities zijn gebaseerd op:

- `docs/catalog/calculators.yml` — centrale calculator catalogus.
- Bestaande calculatorpagina's in `src/pages/*.astro` — inputvelden, resultaten, SEO, content.
- `docs/journey/journeys.yml` — journeys en next steps.
- `docs/journey/next-steps/next-step-blocks.yml` — concrete next step blocks.
- `src/lib/calculators/btw.ts` — voor de gemigreerde BTW-cluster.

---

## Status mapping

| Status in definitie | Betekenis |
|---|---|
| `live` | Calculator is publiek beschikbaar. |
| `migrated` | Calculator draait op Atlas Engine (v1 → v2 overgang). |
| `inline` | Calculator gebruikt nog inline scripts (v1). |
| `planned` | Nog niet ontwikkeld. |
| `deprecated` | Niet meer ondersteund. |

---

## Engine status

| Calculator | calculator_module | engine_status |
|---|---|---|
| BTW Calculator | `btw` | `migrated` → `src/lib/calculators/btw.ts` |
| BTW Terugrekenen | `btw` | `migrated` → `src/lib/calculators/btw.ts` |
| BTW Inclusief/Exclusief | `btw` | `migrated` → `src/lib/calculators/btw.ts` |
| Salaris Calculator | `tax` | `inline` → pagina inline script |
| Bruto Netto 2026 | `tax` | `inline` → pagina inline script |
| Hypotheek Calculator | `mortgage` | `inline` → pagina inline script |
| ZZP Calculator | `zzp` | `inline` → pagina inline script |
| Toeslagen Calculator | `benefits` | `inline` → pagina inline script |
| Auto Importkosten | `import` | `inline` → pagina inline script |

---

## Volgende stap

In Atlas v2 Sprint 003 wordt de Calculator Definition Language verder aangescherpt en mogelijk getoetst tegen een klein generator-prototype.
