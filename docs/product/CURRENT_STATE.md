# CURRENT_STATE — Calculatieloket.nl

> **Datum:** 2026-07-03  
> **Laatst bijgewerkt:** 2026-07-03  
> **Laatste ontwerpdocument:** `docs/product/UX_MASTERPLAN.md`

---

| | |
|---|---|
| **Laatste sprint** | Sprint 117A — Homepage UX Iteration (in review) |
| **Huidige versie** | v1.0.0 |
| **Main commit** | `1365a39` |
| **Calculators** | 10 uniek (hub toont 11 cards; homepage toont 6) |
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

**Sprint 117A — Homepage UX Iteration**

Doel: de homepage verder stroomlijnen zodat een gebruiker binnen 10 seconden bij de juiste berekening is.

### Wat is opgeleverd

- **Kortere pagina:** verwijderd: hero-dashboard preview cards, uitgebreide trust-band, volledige "Snel starten" module, 2 van de 5 FAQ-items. Minder scroll = sneller naar de juiste keuze.
- **Rustiger hero:** single-column, gecentreerde layout met een kalme titel ("Krijg inzicht in je financiële vraag") en subtitel. Geen visuele ruis aan de zijkant.
- **Dominante zoekbalk:** pill-shaped, full-width binnen de hero-container, met duidelijke focus-ring. Dat is het primaire startpunt.
- **Maximaal 6 populaire berekeningen:** gereduceerd van 8 naar 6 compacte cards. Geen badge-noise, alleen een duidelijke vraag per card.
- **Compacter categorieënblok:** zes categorieën in een strakke rij, met rustige lijn-iconen zonder achtergrondkleur en zonder beschrijvingstekst.
- **FAQ minder dominant:** teruggebracht naar 3 essentiële vragen, compacter opgemaakt.
- **Trust extreem compact:** samengeperst tot één regel onder de zoekbalk: "Gratis · Geen account · Geen opslag · Officiële bronnen".
- **Copy-shift:** verder van "calculator" naar "berekening / vraag / inzicht": titel "Meestgezocht", CTA "Alle berekeningen", FAQ "Zijn de berekeningen gratis?", etc.
- **Interne links:** `/calculators/` en alle categoriepagina's blijven bereikbaar.

### Status

- Branch: `feat/sprint-117-homepage-v2`
- PR: #43
- `npm run atlas:check`: ✅
- `npm run build`: ✅
- `npm run audit:lighthouse`: ✅

---

## Eerstvolgende sprint

**Sprint 118 — TBD** (na review en merge van Sprint 117).

---

> Bron: `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md`
