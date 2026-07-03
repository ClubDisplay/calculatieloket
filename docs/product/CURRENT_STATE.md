# CURRENT_STATE — Calculatieloket.nl

> **Datum:** 2026-07-03  
> **Laatst bijgewerkt:** 2026-07-03  
> **Laatste ontwerpdocument:** `docs/product/UX_MASTERPLAN.md`

---

| | |
|---|---|
| **Laatste sprint** | Sprint 117 — Homepage v2 / User Intent Portal (in review) |
| **Huidige versie** | v1.0.0 |
| **Main commit** | `1365a39` |
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
| Homepage | 99 | 100 | 100 | 100 |
| Calculator hub | 99 | 100 | 100 | 100 |
| Categorie Inkomen | 99 | 100 | 100 | 100 |
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

## Laatste sprint

**Sprint 117 — Homepage v2 / User Intent Portal**

Doel: de homepage ombouwen van een statische calculator-catalogus naar een gebruikersvraag-portal.

### Wat is opgeleverd

- **Terminologie-shift:** op de homepage wordt "calculator" vervangen door "berekening", "financiële tool" en "Waar wil je hulp bij?".
- **Hero v2:** nieuwe titel, vraaggerichte subtitel, centrale zoekbalk en compacte quick-chips (Netto salaris, BTW berekenen, Hypotheek, Toeslagen, ZZP inkomen, Auto import).
- **Populaire berekeningen:** 8 cards in plaats van het volledige grid van 10 calculators; subtiele link naar `/calculators/`.
- **Categorieën als discovery-laag:** "Waar gaat je vraag over?" met zes kaarten (Inkomen, Belasting, Wonen, Ondernemen, Auto, Toeslagen).
- **Snel starten:** compacter gemaakt en verplaatst naar onder de categorieën, zodat het niet concurreert met de hero-zoekroute.
- **Trust & FAQ:** behouden, gecompresseerd en lager op de pagina.
- **Interne links:** `/calculators/` en alle categoriepagina's blijven bereikbaar.

### Status

- Branch: `feat/sprint-117-homepage-v2`
- `npm run atlas:check`: ✅
- `npm run build`: ✅
- `npm run audit:lighthouse`: ✅

---

## Eerstvolgende sprint

**Sprint 118 — TBD** (na review en merge van Sprint 117).

---

> Bron: `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md`
