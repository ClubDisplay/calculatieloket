# CURRENT_STATE — Calculatieloket.nl

> **Datum:** 2026-07-03  
> **Laatst bijgewerkt:** 2026-07-03  
> **Laatste ontwerpdocument:** `docs/product/UX_MASTERPLAN.md`

---

| | |
|---|---|
| **Laatste sprint** | Sprint 116 — Navigation v2 (in review) |
| **Huidige versie** | v1.0.0 |
| **Main commit** | `b076155` |
| **Calculators** | 10 uniek (hub toont 11 cards) |
| **Categoriepagina's** | 5 |
| **Knowledge Objects** | 25 |
| **Teststatus** | 219 passed, 0 failed |
| **Atlas status** | ✅ Groen |
| **Lighthouse status** | ✅ 13/13 pagina's halen drempels |
| **Product Completion %** | 95% |
| **Open blockers** | Geen |
| **Huidige focus** | UX Excellence |
| **Laatste ontwerpdocument** | `docs/product/UX_MASTERPLAN.md` |
| **Eerstvolgende sprint** | Sprint 117 — Terminologie & Homepage v2 |

---

## Belangrijkste cijfers

### Lighthouse (lokaal, ads enabled, consent niet gegeven, median 3 runs)

| Pagina | Perf | A11y | BP | SEO |
|---|---:|---:|---:|---:|
| Homepage | 100 | 100 | 100 | 100 |
| Calculator hub | 100 | 100 | 100 | 100 |
| Categorie Inkomen | 100 | 100 | 100 | 100 |
| Bruto netto 2026 | 100 | 97 | 100 | 100 |
| Salaris calculator | 100 | 97 | 100 | 100 |
| Vakantiegeld calculator | 100 | 96 | 100 | 100 |
| Toeslagen calculator | 100 | 96 | 100 | 100 |
| Hypotheek calculator | 100 | 96 | 100 | 100 |
| BTW calculator | 100 | 96 | 100 | 100 |
| BTW terugrekenen | 100 | 96 | 100 | 100 |
| BTW inclusief/exclusief | 100 | 96 | 100 | 100 |
| ZZP calculator | 100 | 96 | 100 | 100 |
| Auto importkosten | 100 | 97 | 100 | 100 |

Drempels: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

### Atlas CI

- `generate:knowledge` ✅
- `check:knowledge` ✅
- `validate:knowledge` ✅ (0 errors, 2 draft waarschuwingen)
- `validate:cdl` ✅ (9/9 definities)
- `test` ✅ (219 tests)
- `qa:rules` ✅ (17 lookups, 0 failures)
- `build` ✅ (23 pagina's)

---

## Status per domein

| Domein | Score | Status |
|---|---:|---|
| Platform | 98 | 🟢 |
| Calculator Experience | 97 | 🟢 |
| SEO | 97 | 🟢 |
| Content | 94 | 🟢 |
| Trust | 97 | 🟢 |
| Accessibility | 95 | 🟢 |
| Performance | 92 | 🟢 |
| Analytics-ready | 90 | 🟢 |
| AdSense-ready | 90 | 🟢 |
| Dashboard | 0 | 🔴 (Fase 2) |
| Agents | 0 | 🔴 (Fase 3) |
| Internationalisering | 0 | 🔴 (Fase 4) |

---

## Openstaand werk

**Geen blockers voor 1.0.**

P1 (kort na 1.0):

- ~~OG-image 1200×630 optimaliseren~~ ✅ Afgerond in Sprint 112.
- ~~Productie Lighthouse baseline met AdSense~~ ✅ Afgerond in Sprint 112 (lokaal; echte productiewaarden volgen na launch).
- AdSense A/B-test posities/formaten
- Resultaat-label contrast uniform aanpakken
- Analytics-provider aansluiten

P2 (na stabiele 1.0):

- Dashboard
- FiscalMesh Agents
- Internationale uitrol

---

## Eerstvolgende sprint

**Sprint 117 — Terminologie & Homepage v2**

Doel: de site-terminologie verschuiven van tool-centrisch naar gebruikersvraag-centrisch, en de Homepage v2 als portal bouwen.

### Sprint 117-notes

- **Terminologie verschuiven van "calculator" naar gebruikerstaal:**
  - "Berekeningen"
  - "Financiële tools"
  - "Zoek een berekening of onderwerp"
  - "Waar wil je hulp bij?"
- **Niet de tool centraal zetten, maar de vraag van de gebruiker.**
- **Homepage zoekroute centraal maken.**
- **Zoeken vanaf elke pagina onderzoeken** (header zoekicoon vs. homepage zoekbalk).
- **Dubbele mobile categorieën vereenvoudigen** — categorieën alleen onder "Categorieën", niet ook nog eens onder "Calculators".
- **Populair / Nieuw-logica oplossen** — aparte logica/pagina’s of één duidelijke route.
- **Homepage v2 als portal bouwen** volgens `docs/product/UX_MASTERPLAN.md`.

---

> Bron: `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md`
