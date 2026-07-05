# CURRENT_STATE — Calculatieloket.nl

> **Datum:** 2026-07-05
> **Laatst bijgewerkt:** 2026-07-05
> **Laatste ontwerpdocument:** `docs/product/UX_MASTERPLAN.md`
> **Laatste main commit:** `84b2cf06cf363995995923784273d5bd6948bf0e`
> **Productie:** https://calculatieloket.nl/

---

| | |
|---|---|
| **Laatste sprint** | PR #60 — AdSense readiness: onder-construction placeholders verwijderd en audit/checklist toegevoegd (in review, niet gedeployed) |
| **Huidige versie** | v1.0.0+ |
| **Main commit** | `84b2cf06cf363995995923784273d5bd6948bf0e` |
| **Calculators** | 10 uniek (hub toont 11 cards; homepage toont 6) |
| **Categoriepagina's** | 5 |
| **Knowledge Objects** | 25 |
| **Teststatus** | 253 passed, 0 failed |
| **Atlas status** | ✅ Groen |
| **Lighthouse status** | ✅ 13/13 pagina's halen drempels |
| **Product Completion %** | 95% |
| **Open blockers** | Geen |
| **Huidige focus** | AdSense readiness afronden: PR #60 reviewen en na merge/deploy AdSense status verifiëren; SEO PR #59 niet mergen zonder akkoord |
| **Eerstvolgende sprint** | SEO-sprint + homepage search UX versterken (ad-hoc, geen P0); PR #59 pas inzetten na expliciet akkoord |
| **Open PR's** | PR #60 (fix/adsense-readiness-blockers); PR #59 (seo/btw-cluster-content-quality, niet mergen zonder akkoord) |
| **Open feature branches** | `fix/adsense-readiness-blockers`; `seo/btw-cluster-content-quality` |

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
- `test` ✅ (241 tests)
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

## In review / niet gedeployde PR's

### PR #60 — AdSense readiness: remove under-construction placeholders and add checklist

- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/60
- **Branch:** `fix/adsense-readiness-blockers`
- **Status:** ⏳ Open ter review; niet gemerged of gedeployed
- **Aangepaste bestanden:** `src/layouts/BaseLayout.astro`, `scripts/audit-content-safety.mjs`, `docs/adsense-readiness-checklist.md`, `05_changelog.md`, `docs/10-CHANGELOG.md`, `docs/product/CURRENT_STATE.md`, `docs/product/MASTER_PROJECT_CONTEXT.md`
- **Wat:** Verwijderd alle zichtbare under-construction placeholders ("Kennisbank (binnenkort)", "Calculator Explorer (binnenkort)", "Toeslagen (binnenkort)", "Nieuws (binnenkort)") uit header en footer. Uitgebreide content-safety audit detecteert nu automatisch "binnenkort", "in aanbouw", "work in progress", "tijdelijk niet beschikbaar" en placeholder-klassen. Nieuw AdSense readiness checklist document.
- **Tests:** 253/253 geslaagd.
- **Build:** 23 pagina's.
- **Console errors:** 0.
- **Noot:** Niet deployen zonder expliciet akkoord. PR #59 (`seo/btw-cluster-content-quality`) blijft open maar mag niet gemerged/gedeployed worden in deze context.

## Laatst gedeployde PR's

### PR #56 — Live calculator button UX fix

- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/56
- **Merge commit:** `84b2cf06cf363995995923784273d5bd6948bf0e`
- **Status:** ✅ Gemerged en gedeployed naar productie
- **Productie:** https://calculatieloket.nl/
- **Aangepaste bestanden:** `src/components/calculator/CalculatorShell.astro`, `src/pages/bruto-netto-2026.astro`, `src/pages/salaris-calculator.astro`, `src/pages/hypotheek-calculator.astro`, `src/pages/toeslagen-calculator.astro`, `src/pages/btw-calculator.astro`, `src/pages/btw-terugrekenen.astro`, `src/pages/btw-inclusief-exclusief.astro`, `src/pages/zzp-calculator.astro`, `src/pages/vakantiegeld-calculator.astro`, `src/pages/auto-importkosten-berekenen.astro`
- **Wat:** Verwijderd van alle 10 actieve calculators de redundante primaire "Bereken"-knop. De knop was overbodig omdat het resultaat al live bijgewerkt wordt. In de plaats komt een neutrale statusregel "Resultaat wordt automatisch bijgewerkt." met `aria-live="polite"`. De `CalculatorShell.astro` krijgt de bijbehorende `.calc-live-status` CSS. JavaScript-event listeners op de verwijderde knoppen zijn opgeruimd. Geen wijzigingen aan rekenlogica, fiscale parameters, content, SEO, metadata, sitemap, privacy/cookie/consent of advertentiecode.
- **Tests:** 241/241 geslaagd.
- **Build:** 23 pagina's.
- **Console errors:** 0.

### PR #55 — Content-safety fix (harde claims + placeholders)

- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/55
- **Merge commit:** `8246c7c049776097a9b1d77a743c380584047406`
- **Status:** ✅ Gemerged en gedeployed naar productie
- **Productie:** https://calculatieloket.nl/
- **Aangepaste bestanden:** `scripts/audit-content-safety.mjs`, `package.json`, `src/lib/format/template.ts`, `src/lib/calculators/registry.ts`, `src/components/calculator/UseCasesPanel.astro`, `src/pages/bruto-netto-2026.astro`, `src/pages/salaris-calculator.astro`, `src/pages/hypotheek-calculator.astro`, `src/pages/toeslagen-calculator.astro`, `src/pages/btw-calculator.astro`, `src/pages/btw-terugrekenen.astro`, `src/pages/btw-inclusief-exclusief.astro`, `src/pages/zzp-calculator.astro`, `tests/format/template.test.ts`
- **Wat:** Harde claim-copy (bijv. "heb je recht op ...") omgezet naar indicatie-copy op publieke pagina's, met name in toeslagen-gerelateerde teksten. Ruwe `{{placeholder}}`-tokens vervangen door een veilige `fillTemplate()` helper in `src/lib/format/template.ts` die terugvalt naar fallback-tekst als een waarde ontbreekt, zodat gebruikers nooit raw placeholders zien. Nieuw content-safety audit-script `scripts/audit-content-safety.mjs` via `npm run audit:content` faalt de build als er nog raw placeholders of hard claim-copy in de statische output of paginabron voorkomen. Bijbehorende unit tests in `tests/format/template.test.ts`.
- **Tests:** 241/241 geslaagd (toevoeging 8 tests voor template helper).
- **Build:** 23 pagina's.
- **Console errors:** 0.

### PR #54 — Overbodige calculator buttons (gesloten)

- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/54
- **Status:** ❌ Gesloten (niet gemerged)
- **Wat:** Oorspronkelijke poging om de overbodige "Bereken"-knoppen op calculators aan te pakken. PR #54 is gesloten omdat PR #56 dezelfde probleemstelling opgelost heeft met een schonere, completere aanpak voor alle 10 calculators. Geen productie-impact.

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
- ~~Productie Lighthouse baseline meten met AdSense~~ ✅ Afgerond in Sprint 112 (lokaal; echte productiewaarden volgen na launch).
- ~~Calculator Registry live~~ ✅ Afgerond in PR #50.
- ~~Homepage hero-regressie opgelost~~ ✅ Afgerond in PR #51.
- ~~P0 zorgtoeslag hotfix 2026~~ ✅ Afgerond in PR #52.
- ~~Content-safety: harde claims en raw placeholders opruimen~~ ✅ Afgerond in PR #55.
- ~~Live-button UX: redundante "Bereken"-knoppen verwijderen~~ ✅ Afgerond in PR #56.
- AdSense A/B-test posities/formaten
- Resultaat-label contrast uniform aanpakken
- Analytics-provider aansluiten
- SEO-sprint: semantische structuur, schema-validatie, interne linkstructuur versterken
- Homepage search: zichtbaarheid en interactie evalueren/verbeteren (geen visuele regressie, juiste focus/tap target)
- `npm run audit:content` opnemen in Atlas CI zodat content-safety standaard gecontroleerd wordt

P2 (na stabiele 1.0):

- Dashboard
- FiscalMesh Agents
- Internationale uitrol

---

## Bekende waarschuwingen

- Dev-build kan een bestaande `CookieConsent.astro_astro_type_script_index_0_lang` empty-chunk warning geven; deze is niet door PR #50/#51/#52/#55/#56 geïntroduceerd en heeft geen impact op productie.
- Lokale `.env` staat op `PUBLIC_ADS_ENABLED=false`. Productie-builds gebruiken `PUBLIC_ADS_ENABLED=true`.
- Knowledge registry heeft 2 verwachte draft waarschuwingen.
- PR #54 is gesloten zonder merge; PR #56 heeft dezelfde button-UX opgelost.
- Homepage search is functioneel, maar zichtbaarheid en interactie (focus, tap target, visuele hierarchie) moeten visueel gecontroleerd en waar nodig verbeterd worden.

---

## Eerstvolgende sprint

**AdSense readiness afronden + SEO-sprint voorbereiden** (ad-hoc, geen P0):

- Na merge/deploy van PR #60: verifiëren in Google AdSense dat `ads.txt` wordt gevonden en dat "Lage waarde" / "Needs attention" verdwijnt.
- AdSense A/B-test: posities en formaten evalueren (pas na AdSense approval).
- SEO-sprint pas starten na expliciet akkoord: PR #59 (`seo/btw-cluster-content-quality`) mag niet gemerged/gedeployed worden zonder toestemming.
- Schema-markup audit en validatie (HowTo, FAQPage, BreadcrumbList, CollectionPage, WebSite/SearchAction).
- Interne linkstructuur versterken, vooral naar/binnen categoriepagina's.
- Meta description audit op alle 23 pagina's (lengte, uniekheid, keyword-intent).
- Lighthouse-SEO quick wins (canonical, hreflang-voorbereiding, sitemap-index kwaliteit).
- Controleer of Calculator Registry metadata consistent wordt gebruikt voor OG-title/description.
- Homepage search UX-check: zoekveld moet binnen 1-2 seconden zichtbaar en interactief zijn op mobiel en desktop; focus/tap target vergroten indien nodig.
- `npm run audit:content` is nu opgenomen in `npm run atlas:check`.

---

> Bron: `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md`
> Aanvullende context: `docs/product/MASTER_PROJECT_CONTEXT.md`
