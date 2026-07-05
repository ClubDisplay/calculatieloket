# MASTER_PROJECT_CONTEXT — Calculatieloket.nl / FiscalMesh

> **Doel:** Één centrale context voor iedere nieuwe AI-sessie. Lees dit bestand eerst voordat je aan code of documentatie werkt.  
> **Laatst bijgewerkt:** 2026-07-05  
> **Productie main commit:** `99deef5028686ceb779f247f1b8da6b0019ba024`  
> **Productie-URL:** https://calculatieloket.nl/  
> **Status:** Leidend voor alle volgende sprints.

---

## 1. Projectmissie

Calculatieloket wordt het beste financiële platform van Europa. FiscalMesh wordt de engine achter alle landen.

- **Voor gebruikers:** snel, betrouwbaar en helder inzicht in salaris, belasting, toeslagen, wonen, ondernemen en auto-kosten.
- **Voor de business:** een schaalbare, herbruikbare knowledge- en calculatie-laag die eenvoudig naar nieuwe landen en domeinen uit te breiden is.
- **Voor ontwikkeling:** een duidelijke, gefaseerde koers waarbij geen sprongen worden gemaakt voordat de basis op orde is.

---

## 2. Visie

De ontwikkeling volgt een vaste, non-negotiable volgorde:

1. **Eerst een perfect product.** Alle Nederlandse calculators en het platform voldoen aan een scherpe Definition of Done.
2. **Daarna dashboard.** Een centrale gebruikersomgeving voor scenario's, historie en persoonlijke instellingen.
3. **Daarna agents.** Autonome FiscalMesh Agents die SEO, content, knowledge, QA, design, analytics en product ondersteunen.
4. **Daarna internationale uitrol.** Pas als Nederland als referentieproduct staat, wordt actief gewerkt aan België, Duitsland, Frankrijk, Spanje en verder.

---

## 3. Architectuur

### Stack

- **Astro 6** — static site generator, output naar `dist/`.
- **Geen UI framework** — vanilla HTML/CSS/JS in `.astro` bestanden.
- **Node >= 22.12.0**.
- **CSS** — custom properties in `src/styles/global.css`, geen Tailwind of CSS modules.
- **TypeScript** — voor engines, rule resolver, recommendation engine en tests.
- **Vitest** — test framework.

### Belangrijkste mappen

```
src/
  pages/              # Astro pagina's (homepage, calculators, categorieën, statisch)
  layouts/            # BaseLayout.astro (shared shell)
  components/         # Herbruikbare componenten (AdSlot, CookieConsent, Breadcrumbs, calculator components)
  styles/             # global.css
  lib/                # Engines, Rule Resolver, Recommendation Engine, Knowledge Layer helpers
  lib/calculators/    # Calculator engines (tax, btw, mortgage, zzp, allowances, vacation-pay, import-costs)
  lib/rules/          # Rule Resolver
  lib/recommendations/# Recommendation Engine
  lib/knowledge/      # Knowledge Layer runtime wrapper + generated registry
public/               # Static assets (logo's, favicon, robots.txt)
docs/                 # Product-, v2- en changelog-documentatie
scripts/              # Build/audit/QA scripts
```

### Deploy

- Static output wordt gehost op Cloudflare Pages.
- Deploy commando: `npx wrangler pages deploy dist --project-name=calculatieloket`.
- Vereist `npx wrangler login`.
- `.env` bevat `PUBLIC_ADSENSE_ID` en `PUBLIC_ADS_ENABLED`.

---

## 4. Product Roadmap

| Fase | Naam | Doel | Voorwaarde |
|---|---|---|---|
| 1 | **Product Completion** | Nederlandse site is afgerond, volledig getest, SEO-optimaal en gebruiksklaar. | — |
| 2 | **FiscalMesh Dashboard** | Persoonlijke, centrale plek voor scenario's, historie en vergelijking. | Fase 1 afgerond. |
| 3 | **FiscalMesh Agents** | Autonome agents voor SEO, knowledge, content, QA, design, analytics, product. | Fase 2 heeft MVP. |
| 4 | **International Expansion** | Uitrollen naar België, Duitsland, Frankrijk, Spanje, etc. | Nederland is referentieproduct. |

Leidend document: `docs/product/00-FISCALMESH-PRODUCT-ROADMAP.md`.

---

## 5. Recente PR's

> Overzicht van de laatste drie productiewijzigingen. Details staan in `docs/product/CURRENT_STATE.md` en `docs/10-CHANGELOG.md`.

### PR #50 — Calculator Registry

- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/50
- **Merge commit:** `5b2ea06dee9fea1de9187d5feaf4af25d757dc56`
- **Status:** ✅ Gemerged en gedeployed
- **Wat:** Centrale Calculator Registry (`src/lib/calculators/registry.ts`) is live als Single Source of Truth. Smart Search, homepage, calculator hub, categoriepagina's, navigatie/footer en recommendations metadata zijn registry-driven. Alle 10 calculators staan in de registry; `auto-importkosten` verschijnt in zowel Auto als Ondernemen via `secondaryCategories`.

### PR #51 — Homepage hero-regressie hotfix

- **Merge commit:** `81dd1ba10689481f047bdde1ba756868eef8a6ab`
- **Status:** ✅ Gemerged en gedeployed
- **Wat:** Lichtblauwe hero-gradient hersteld en groene checkmark-iconen teruggebracht bij trust-items. Geen SEO-copy, metadata, calculatorlogica of registry-wijzigingen.

### PR #52 — P0 hotfix zorgtoeslag 2026

- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/52
- **Merge commit:** `99deef5028686ceb779f247f1b8da6b0019ba024`
- **Status:** ✅ Gemerged en gedeployed
- **Wat:** Fout opgelost waarbij `/toeslagen-calculator/?inkomen=25000&huur=700&partner=0` onterecht €0 toonde. Zorgtoeslag 2026 wordt nu tabelgebaseerd berekend volgens Dienst Toeslagen. Zorgtoeslag en huurtoeslag worden apart getoond; huurtoeslag blijft een vereenvoudigde indicatie met waarschuwing. 233/233 tests geslaagd, 23 pagina's gebouwd, 0 console errors.

---

## 6. Non-negotiables

> Deze regels zijn absoluut. Sprints die ze negeren, worden niet opgepakt.

1. **Niet bouwen aan agents voordat Product Completion klaar is.**
2. **Niet internationaal uitrollen voordat Nederland referentieproduct is.**
3. **Niet nieuwe calculators toevoegen buiten de huidige Product Completion set zonder expliciete goedkeuring.**
4. **Niet deployen zonder groene `npm run atlas:check`.**
5. **Geen engine-, Knowledge Object-, Rule Resolver- of Recommendation Engine-wijzigingen in pure documentatie-/UX-sprints, tenzij de sprint expliciet daarvoor is.**

---

## 7. Development workflow

### Commando's

```bash
npm run dev          # lokale dev server (geen ads)
npm run build        # static build → dist/
npm run preview      # preview built dist/
npm run test         # Vitest tests
npm run atlas:check  # volledige lokale CI-check
npm run audit:lighthouse  # Lighthouse audit op 13 pagina's (3 runs median)
```

### Branching & CI

- Werk in feature branches vanaf `main`.
- Open een PR; `Atlas CI` moet groen zijn.
- `main` heeft branch protection: PR + groene status check verplicht.
- Merge via merge commit.
- Na merge: `main` pullen, feature branch verwijderen.

### Definition of Done per sprint

- `npm run atlas:check` slaagt.
- Relevante documentatie is bijgewerkt (`05_changelog.md`, `docs/10-CHANGELOG.md`, `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, en specifieke sprint-docs).
- Geen onverwachte wijzigingen buiten scope.
- Geen secrets in commits.

---

## 8. Huidige platformstatus

Calculatieloket staat aan het einde van **Fase 1 — Product Completion**. Overall readiness: **95/100**.

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

Technisch en productmatig is Calculatieloket 1.0 klaar. De Calculator Registry is sinds PR #50 de Single Source of Truth voor homepage, hub, categoriepagina's, navigatie/footer en recommendations. PR #51 en PR #52 waren pure stabiliteits- en correctheidshotfixes zonder nieuwe functionaliteit. Dashboard, Agents en internationalisering zijn expliciet buiten scope van 1.0.

Details: `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md` en `docs/product/CURRENT_STATE.md`.

---

## 9. Overzicht van alle calculators

**10 unieke calculators** (de hub toont 11 cards omdat Auto importkosten via `secondaryCategories` in zowel Auto als Ondernemen staat). De centrale Calculator Registry in `src/lib/calculators/registry.ts` is sinds PR #50 de Single Source of Truth voor titels, beschrijvingen, URL's, categorieën en recommendation-metadata.

| # | Calculator | Categorie | URL |
|---|------------|-----------|-----|
| 1 | Bruto netto 2026 | Inkomen | `/bruto-netto-2026/` |
| 2 | Salaris calculator | Inkomen | `/salaris-calculator/` |
| 3 | Vakantiegeld calculator | Inkomen | `/vakantiegeld-calculator/` |
| 4 | Toeslagen calculator | Inkomen | `/toeslagen-calculator/` |
| 5 | Hypotheek calculator | Wonen | `/hypotheek-calculator/` |
| 6 | BTW calculator | Belasting | `/btw-calculator/` |
| 7 | BTW terugrekenen | Belasting | `/btw-terugrekenen/` |
| 8 | BTW inclusief/exclusief | Belasting | `/btw-inclusief-exclusief/` |
| 9 | ZZP calculator | Ondernemen | `/zzp-calculator/` |
| 10 | Auto importkosten berekenen | Ondernemen / Auto | `/auto-importkosten-berekenen/` |

**5 categoriepagina's:** `/categorie/inkomen/`, `/categorie/belasting/`, `/categorie/wonen/`, `/categorie/ondernemen/`, `/categorie/auto/`.

**5 statische pagina's:** `/over-ons/`, `/contact/`, `/privacy/`, `/cookies/`, `/disclaimer/`.

---

## 10. Knowledge Layer

De Knowledge Layer bevat gestructureerde feiten over belasting, toeslagen, hypotheken, BTW, etc. als YAML Knowledge Objects.

- **Locatie bron:** `docs/v2/knowledge/objects/` (25 objecten).
- **Runtime registry:** `src/lib/knowledge/generated-objects.ts` (automatisch gegenereerd).
- **Generatie:** `npm run generate:knowledge`.
- **Sync check:** `npm run check:knowledge` (ook in `npm run build`).
- **Validatie:** `npm run validate:knowledge`.

Engines lezen **nooit direct** uit `knowledgeObjects`; ze gaan via de Rule Resolver.

---

## 11. Rule Resolver

De Rule Resolver is de dunne grenslaag tussen Knowledge Layer en Calculator Engines.

- **Locatie:** `src/lib/rules/` (`resolver.ts`, `types.ts`).
- **API:** `resolveRule({ type, country, locale, year, id?, version?, warnOnFallback?, onFallback? })`.
- **Doel:** bepaalt welk Knowledge Object van toepassing is op een specifieke berekeningscontext.
- **Features:** in-memory caching, locale fallback, version selection, fallback diagnostics, runtime fallback warnings.
- **QA:** `npm run qa:rules` en `tests/rules/resolver.test.ts`.

Voorbeeld:

```ts
const vat = resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 });
```

---

## 12. Recommendation Engine

De Financial Recommendation Engine is een rule-based aanbevelingslaag bovenop calculator-resultaten.

- **Locatie:** `src/lib/recommendations/`.
- **API:** `getRecommendations(input)` — sorteert, dedupliceert en filtert de huidige calculator eruit.
- **Registry:** `src/lib/recommendations/registry.ts` koppelt calculator-keys aan rule sets.
- **Rule files:** `income.ts`, `mortgage.ts`, `btw.ts`, `zzp.ts`, `allowances.ts`, `import-costs.ts`, `vacation-pay.ts`.
- **UI:** `FinancialJourney.astro` rendert maximaal 4 recommendations per pagina.
- **Tests:** `tests/recommendations/recommendations.test.ts`.

De engine is bewust **geen AI**; regels zijn traceerbaar, testbaar en onderhoudbaar.

---

## 13. App Shell

De Calculator App Shell is de consistente UI-container voor alle calculators.

**Componenten:**

- `CalculatorShell.astro` — hoofdcontainer met hero, input- en resultaat-slots.
- `InputPanel.astro` — invoerformulier.
- `ResultPanel.astro` — resultatenpaneel met hero, breakdown, acties.
- `UseCasesPanel.astro` — "Wat kun je hiermee?"-links.
- `SourceCards.astro` / `InlineSources.astro` — bronvermeldingen.
- `FaqAccordion.astro` — FAQ.
- `ToolFooter.astro` — categorie-link en disclaimer.
- `FinancialJourney.astro` — vervolgstappen/recommendations.
- `HowToSchema.astro` — JSON-LD HowTo schema.
- `TrustPanel.astro` — vertrouwenssignalen.

Alle 10 calculators gebruiken de App Shell. Elke calculator bevat:

- URL state
- Copy-link knop
- Quick-chips / preset chips
- Live herberekening
- TrustPanel + bronnen
- FAQ + schema
- Breadcrumbs
- Analytics attributen

---

## 14. Product Completion filosofie

Product Completion betekent: **af voor gebruikers, zoekmachines en onderhoud**. Niet "af genoeg", maar echt klaar.

Een calculator is pas DONE als aan alle 18 criteria voldaan is:

App Shell, Recommendation Engine, Mobile UX, Desktop UX, SEO, FAQ, Schema, Sources, Examples, URL State, Copy Link, Financial Journey, Accessibility, Performance, Analytics Ready, AdSense Ready, Internal Links, CI Green.

Het platform is pas DONE als homepage, hub, categorieën, navigatie, search, footer, header, Knowledge Layer, Recommendation Engine en CI/CD voldoen aan de Platform Definition of Done.

Product Completion sluit expliciet uit:

- Dashboard (Fase 2)
- Agents (Fase 3)
- Internationalisering (Fase 4)

---

## 15. Open backlog

### P0 — Nodig voor 1.0 (alles af)

- Alle 13 publieke pagina's halen Lighthouse drempels ✅
- `npm run atlas:check` groen ✅
- Content Quality Standard op alle publieke pagina's ✅
- Trust system op alle calculators ✅
- Analytics-ready markup ✅
- AdSense-integratie technisch werken ✅
- Navigatie consistent over alle pagina's ✅
- Calculator Registry live als SSOT ✅ (PR #50)
- Homepage hero-regressie opgelost ✅ (PR #51)
- P0 zorgtoeslag 2026 correct berekend ✅ (PR #52)

### P1 — Kort na 1.0

- ~~OG-image optimaliseren naar 1200×630.~~ ✅ Afgerond in Sprint 112.
- ~~Productie Lighthouse baseline meten met AdSense.~~ ✅ Afgerond in Sprint 112 (lokaal; echte productiewaarden volgen na launch).
- AdSense A/B-test: posities en formaten.
- Resultaat-label contrast uniform aanpakken.
- Analytics-provider aansluiten.
- Mobiele sticky result hero evalueren.
- SEO-sprint: schema-validatie, interne linkstructuur, meta descriptions, OG-consistency.

### P2 — Later

- Dashboard voor gebruikers.
- FiscalMesh Agents.
- Internationale uitrol.
- Gebruikersbeoordelingen / sociale proof.
- Scenario slider / visuele belastingverdeling.

Gedetailleerd overzicht: `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md`.

---

## 16. Hoe een nieuwe AI-sessie moet starten

1. **Lees dit bestand** (`docs/product/MASTER_PROJECT_CONTEXT.md`).
2. **Lees daarna** `docs/product/CURRENT_STATE.md` voor de exacte status van vandaag.
3. **Controleer de actieve sprint** in `docs/product/10-PRODUCT-POLISH-BACKLOG.md`.
4. **Lees de sprint-instructies** van de gebruiker. Vraag na als Doel, Waarom, Definition of Done, Acceptatiecriteria, Risico's of Volgende sprint ontbreken.
5. **Check de branch:** werk altijd vanaf een schone `main` in een nieuwe feature branch.
6. **Run `npm run atlas:check`** vóór en na wijzigingen.
7. **Werk alleen binnen scope:** geen engine-, KO-, Rule Resolver- of Recommendation Engine-wijzigingen in documentatie/UX-sprints, en omgekeerd.
8. **Update documentatie:** `05_changelog.md`, `docs/10-CHANGELOG.md`, relevante `docs/product/*.md`.
9. **Commit, push, PR, wacht op CI, merge, pull, verwijder branch.**
10. **Rapporteer:** gewijzigde bestanden, testresultaten, CI-status, PR URL, advies volgende sprint.

---

> **Laatst bijgewerkt:** 2026-07-05
