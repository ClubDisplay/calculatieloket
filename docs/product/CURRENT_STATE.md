# CURRENT_STATE — Calculatieloket.nl

> **Datum:** 2026-07-05
> **Laatst bijgewerkt:** 2026-07-05
> **Laatste ontwerpdocument:** `docs/product/UX_MASTERPLAN.md`
> **Laatste main commit:** `99deef5028686ceb779f247f1b8da6b0019ba024`
> **Productie:** https://calculatieloket.nl/

---

| | |
|---|---|
| **Laatste sprint** | Hotfix PR #52 — P0 zorgtoeslag 2026 (afgerond) |
| **Huidige versie** | v1.0.0+ |
| **Main commit** | `99deef5028686ceb779f247f1b8da6b0019ba024` |
| **Calculators** | 10 uniek (hub toont 11 cards; homepage toont 6) |
| **Categoriepagina's** | 5 |
| **Knowledge Objects** | 25 |
| **Teststatus** | 233 passed, 0 failed |
| **Atlas status** | ✅ Groen |
| **Lighthouse status** | ✅ 13/13 pagina's halen drempels |
| **Product Completion %** | 95% |
| **Open blockers** | Geen |
| **Huidige focus** | Productie-stabiliteit na Registry + hero hotfix + zorgtoeslag hotfix |
| **Eerstvolgende sprint** | SEO-sprint: technische & semantische SEO versterken (ad-hoc, geen P0) |
| **Open PR's** | Geen |
| **Open feature branches** | Geen |

---

## Belangrijkste cijfers

### Lighthouse (lokaal, ads enabled, consent niet gegeven, median 3 runs)

| Pagina | Perf | A11y | BP | SEO |
|---|---|---:|---:|---:|---:|
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
- `test` ✅ (233 tests)
- `qa:rules` ✅ (17 lookups, 0 failures)
- `build` ✅ (23 pagina's)

---

## Status per domein

| Domein | Score | Status |
|---|---|---:|
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

## Laatst gedeployde PR's

### PR #52 — P0 hotfix zorgtoeslag 2026

- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/52
- **Merge commit:** `99deef5028686ceb779f247f1b8da6b0019ba024`
- **Status:** ✅ Gemerged en gedeployed naar productie
- **Productie:** https://calculatieloket.nl/
- **Deployment URL:** https://c689e0e0.calculatieloket.pages.dev
- **Aangepaste bestanden:** `src/lib/calculators/allowances.ts`, `src/pages/toeslagen-calculator.astro`, `tests/calculators/allowances.test.ts`
- **Wat:** Zorgtoeslag 2026 wordt tabelgebaseerd berekend volgens Dienst Toeslagen. De bug `/toeslagen-calculator/?inkomen=25000&huur=700&partner=0` toont nu Zorgtoeslag per maand €129 in plaats van €0. Zorgtoeslag en huurtoeslag worden apart getoond. Huurtoeslag blijft een vereenvoudigde indicatie met duidelijke waarschuwing.
- **Tests:** 233/233 geslaagd.
- **Build:** 23 pagina's.
- **Console errors:** 0.

### PR #51 — Homepage hero-regressie hotfix

- **Merge commit:** `81dd1ba10689481f047bdde1ba756868eef8a6ab`
- **Status:** ✅ Gemerged en gedeployed
- **Wat:** Lichtblauwe hero-gradient hersteld en groene checkmark-iconen teruggebracht bij de trust-items: Gratis, Geen account, Geen opslag, Officiële bronnen. Geen SEO-copy, metadata, calculatorlogica of registry-wijzigingen.

### PR #50 — Calculator Registry

- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/50
- **Merge commit:** `5b2ea06dee9fea1de9187d5feaf4af25d757dc56`
- **Status:** ✅ Gemerged en gedeployed
- **Wat:** Centrale Calculator Registry (`src/lib/calculators/registry.ts`) is live als Single Source of Truth. Smart Search, homepage, calculator hub, categoriepagina's, navigatie/footer en recommendations metadata zijn registry-driven. Alle 10 calculators staan in de registry. `auto-importkosten` verschijnt in zowel Auto als Ondernemen via `secondaryCategories`. Sitemap-index opnieuw gegenereerd met 23 pagina's.

---

## Openstaand werk

**Geen blockers voor 1.0.**

P1 (kort na 1.0):

- ~~OG-image 1200×630 optimaliseren~~ ✅ Afgerond in Sprint 112.
- ~~Productie Lighthouse baseline met AdSense~~ ✅ Afgerond in Sprint 112 (lokaal; echte productiewaarden volgen na launch).
- ~~Calculator Registry live~~ ✅ Afgerond in PR #50.
- ~~Homepage hero-regressie opgelost~~ ✅ Afgerond in PR #51.
- ~~P0 zorgtoeslag hotfix 2026~~ ✅ Afgerond in PR #52.
- AdSense A/B-test posities/formaten
- Resultaat-label contrast uniform aanpakken
- Analytics-provider aansluiten
- SEO-sprint: semantische structuur, schema-validatie, interne linkstructuur versterken

P2 (na stabiele 1.0):

- Dashboard
- FiscalMesh Agents
- Internationale uitrol

---

## Bekende waarschuwingen

- Dev-build kan een bestaande `CookieConsent.astro_astro_type_script_index_0_lang` empty-chunk warning geven; deze is niet door PR #50/#51/#52 geïntroduceerd en heeft geen impact op productie.
- Lokale `.env` staat op `PUBLIC_ADS_ENABLED=false`. Productie-builds gebruiken `PUBLIC_ADS_ENABLED=true`.
- Knowledge registry heeft 2 verwachte draft waarschuwingen.

---

## Eerstvolgende sprint

**SEO-sprint** (ad-hoc, geen P0):

- Schema-markup audit en validatie (HowTo, FAQPage, BreadcrumbList, CollectionPage, WebSite/SearchAction).
- Interne linkstructuur versterken, vooral naar/binnen categoriepagina's.
- Meta description audit op alle 23 pagina's (lengte, uniekheid, keyword-intent).
- Lighthouse-SEO quick wins (canonical, hreflang-voorbereiding, sitemap-index kwaliteit).
- Controleer of Calculator Registry metadata consistent wordt gebruikt voor OG-title/description.

---

> Bron: `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md`
> Aanvullende context: `docs/product/MASTER_PROJECT_CONTEXT.md`
