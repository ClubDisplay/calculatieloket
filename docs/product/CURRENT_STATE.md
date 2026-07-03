# CURRENT_STATE — Calculatieloket.nl

> **Datum:** 2026-07-03  
> **Laatst bijgewerkt:** 2026-07-03  
> **Laatste ontwerpdocument:** `docs/product/UX_MASTERPLAN.md`

---

| | |
|---|---|
| **Laatste sprint** | Sprint 115 — UX Foundation (Information Architecture) |
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
| **Eerstvolgende sprint** | Sprint 116 — Navigation v2 |

---

## Belangrijkste cijfers

### Lighthouse (lokaal, ads enabled, consent niet gegeven, median 3 runs)

| Pagina | Perf | A11y | BP | SEO |
|---|---:|---:|---:|---:|
| Homepage | 100 | 100 | 100 | 100 |
| Calculator hub | 100 | 100 | 100 | 100 |
| Categorie Inkomen | 100 | 100 | 100 | 100 |
| Bruto netto 2026 | 99 | 97 | 100 | 100 |
| Salaris calculator | 99 | 97 | 100 | 100 |
| Vakantiegeld calculator | 99 | 96 | 100 | 100 |
| Toeslagen calculator | 100 | 96 | 100 | 100 |
| Hypotheek calculator | 99 | 96 | 100 | 100 |
| BTW calculator | 99 | 96 | 100 | 100 |
| BTW terugrekenen | 99 | 96 | 100 | 100 |
| BTW inclusief/exclusief | 99 | 96 | 100 | 100 |
| ZZP calculator | 99 | 96 | 100 | 100 |
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

**Sprint 116 — Navigation v2**

Doel: de site-navigatie (header, mobile menu, footer, breadcrumbs) herbouwen volgens `docs/product/UX_MASTERPLAN.md` zodat deze geschikt is voor 500+ calculators.

1. Header v2 met dropdowns: Home, Calculators, Categorieën, Kennisbank, Nieuws.
2. Mobile hamburger menu met zoek, Calculators, Categorieën, Kennisbank, Nieuws, Over/Contact.
3. Footer v2 met dynamische categoriekolommen, Explorer-link en Kennisbank/Over.
4. Breadcrumbs consistent voor Explorer, categorieën en calculators.
5. Geen directe calculator-links meer in header; geen handmatige "Alle calculators"-lijst in footer.

---

> Bron: `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md`
