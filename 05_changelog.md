# Changelog — Calculatieloket.nl

## 2026-07-03

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 105 — Content Excellence & Topic Authority v1
**Details:** Alle 21 publieke pagina's gebracht naar één uniforme redactionele kwaliteitsstandaard. Nieuwe documentatie `docs/product/16-CONTENT-QUALITY-STANDARD-v1.md` definieert de vereiste structuur per calculatorpagina, meta description-standaard (120–160 tekens), content-richtlijnen, en sjablonen voor categorie- en statische pagina's. Meta descriptions aangepast op alle 21 publieke pagina's (homepage, 10 calculators, 5 categorieën, 5 statische pagina's). Alle 10 calculatorpagina's gecontroleerd op structuur (intro, calculator, resultaat, TrustPanel, waarom vertrouwen, praktijkvoorbeeld, veelgemaakte fouten, FAQ, bronnen, disclaimer, gerelateerde calculators). `hypotheek-calculator.astro` kreeg een uitgebreide content-uitbreiding (hoe de berekening werkt, waarom je deze kunt vertrouwen, concreet voorbeeld, veelgemaakte fouten). De overige 9 calculators kregen de sectie "Waarom kun je deze berekening vertrouwen?" met verwijzingen naar officiële bronnen; waar relevant aangevuld met voorbeeld en veelgemaakte fouten. Categoriepagina's en statische pagina's kregen geoptimaliseerde meta descriptions. Geen fake content, testimonials, sterren of nep badges. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, Dashboard, Agents, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-03

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 104 — Trust & Credibility Excellence v1
**Details:** Uniform Trust System toegevoegd aan alle 10 calculatorpagina's. Nieuwe component `src/components/calculator/TrustPanel.astro` met badges (Gebaseerd op officiële bronnen, Jaarlijks gecontroleerd, Indicatieve berekening, Laatste update, Redactie: Calculatieloket.nl), compacte uitleg en anchor-link naar bronnen. `src/components/SourceCards.astro` krijgt optionele `id` prop. TrustPanel staat in de `result`-slot direct onder `ResultPanel` op alle calculators: bruto-netto-2026, salaris, hypotheek, toeslagen, btw, btw-terugrekenen, btw-inclusief-exclusief, zzp, auto-importkosten en vakantiegeld. Statische pagina's over-ons, contact, disclaimer, privacy en cookies krijgen verlengde meta descriptions (120–160 tekens) en trust-secties. `src/layouts/BaseLayout.astro` footer bottom toont subtiel "Gebaseerd op officiële bronnen". Geen Google Reviews, sterren, testimonials of nep badges. Nieuwe documentatie `docs/product/15-TRUST-SYSTEM-v1.md`. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-03

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 103 — Product & UX Review v1
**Details:** Platform-wide product- en UX-review uitgevoerd vanuit 5 perspectieven (UX Designer, Product Owner, SEO-specialist, Google Quality Rater, eerste bezoeker). Nieuw document `docs/product/14-PRODUCT-UX-REVIEW-v1.md` met 12-categorie scorecard (gemiddelde 8.0/10), per-pagina first-visitor journey, concurrentievergelijking met SalarisNetto, BerekenHet, Nibud en Loonwijzer, top 25 verbeterpunten (P0/P1/P2), top 10 user-happiness UX items, risico's en voorstel voor Sprint 104. Scorecard: 9× groen, 2× geel, 0× rood. Gele vlaggen: advertenties/afleiding (top-ad eet eerste viewport) en first impression/trust (sociale proof mist nog). P0-items: Lighthouse audit, meta descriptions statische pagina's, trust badges, top-ad evaluatie, viewport optimalisatie, consistente resultaatpresentatie, copy-link consistentie, quick chips, trust bar, search empty state. Advies: Product Completion is technisch af; Sprint 104 richt zich op Lighthouse, trust bar en content. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` is niet beïnvloed; 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 102 — Platform Quality Audit v1
**Details:** Volledige kwaliteitsaudit op het bestaande platform. Nieuw document `docs/product/13-PLATFORM-QUALITY-AUDIT-v1.md` met scorecard (10× groen, 1× geel, 0× rood), per-pagina resultaten, P0/P1/P2 backlog, risico’s en advies voor Sprint 103. Nieuw audit script `scripts/audit-static-site.mjs` (geen dependencies) scannt `dist/` op H1, canonical, title/description, robots, JSON-LD schema, breadcrumbs, skip link, focus-visible, aria-current, mobiel menu, ad-containers en analytics attributen. Quick win: breadcrumbs en `BreadcrumbList` schema toegevoegd aan statische pagina’s `contact.astro`, `cookies.astro`, `disclaimer.astro`, `over-ons.astro` en `privacy.astro`. 21 publieke pagina’s gescand; allemaal exact één H1, canonical, title/meta description en schema. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 101 — Performance & Accessibility Excellence v1
**Details:** Performance-, accessibility- en mobile-UX quick wins op het bestaande platform. Skip link toegevoegd in `src/layouts/BaseLayout.astro` ("Spring naar inhoud", target `main id="main-content"`). Consistente `:focus-visible` stijl voor links, buttons, inputs, selects, summaries en focusbare elementen in `src/styles/global.css`; custom toggle switch krijgt zichtbare focus ring. `prefers-reduced-motion: reduce` media query schakelt animaties/transities uit, ook in `src/components/CookieConsent.astro`. `aria-current="page"` toegevoegd aan actieve links in header en footer. Mobiele menu toggle krijgt zichtbare focus ring, dynamisch `aria-label` (openen/sluiten) en sluit met `Escape`. Logo in `BaseLayout` krijgt `width`/`height`, `loading="eager"` en `decoding="async"` voor minder CLS. Oude, door `BaseLayout` overschreven `.site-header`/`.site-header-inner`/`.site-nav` CSS verwijderd uit `global.css`. FAQ summary focus stijl toegevoegd in `FaqAccordion.astro`. Homepage zoekresultaten "geen resultaten" krijgen `aria-live="polite"`. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 100 — Analytics Ready Foundation
**Details:** Analytics-ready markup toegevoegd zonder tracking scripts, cookies, event listeners of externe providers. Nieuwe conventie documentatie in `docs/product/12-ANALYTICS-READY-FOUNDATION.md`: `data-analytics`, `data-analytics-category`, `data-analytics-action`, `data-analytics-label`. Gedeelde componenten voorzien van data-attributen: `BaseLayout` (header/footer links), `Breadcrumbs`, `CategoryGrid` (met `analyticsCategory` prop), `RelatedCategories` (met `analyticsCategory` prop), `CrossSellCards` (met `analyticsCategory` prop), `FinancialJourney`, `ToolFooter` en `UseCasesPanel`. Homepage (`src/pages/index.astro`) attributen op zoekveld, cluster-chips, calculator cards, quick-start keuze-pillen, categorie links en cross-sell cards. Categoriepagina’s (`categorie/inkomen.astro`, `belasting.astro`, `wonen.astro`, `ondernemen.astro`, `auto.astro`) gebruiken per pagina een specifieke `analyticsCategory` voor `CategoryGrid` en `RelatedCategories`. Alle 10 calculatorpagina’s krijgen attributen op CTA-knoppen, quick-chips, kopieer-link knoppen, radio-button groepen (tarief, richting, looptijd, voertuigtype, huishouden), toggles (ZZP aftrekposten) en select velden (aankoopland). Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-03

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 099 — Breadcrumb Consistency + Homepage Search URL State
**Details:** Navigatie-consistentie compleet gemaakt. Categoriepagina’s krijgen visuele breadcrumbs `Home > Categorieën > <Categorie>` boven de hero: Inkomen, Belasting, Wonen, Ondernemen en Auto. `Categorieën` linkt naar `/#categorieen` op de homepage; huidige categorie heeft `aria-current="page"`; zelfde styling als calculator breadcrumbs. Homepage krijgt geen extra breadcrumb (root). Homepage zoekfilter is nu URL-gestuurd: bij typen wordt `?q=<zoekterm>` bijgewerkt via `history.replaceState`; bij laden met `?q=...` wordt het zoekveld gevuld en filter direct toegepast; bij leegmaken wordt de queryparameter verwijderd. Zonder JavaScript blijven alle calculatorcards zichtbaar. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-03

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 098 — Visual Breadcrumbs + Codebase Cleanup
**Details:** Nieuwe herbruikbare component `src/components/Breadcrumbs.astro` toegevoegd. Breadcrumbs zijn zichtbaar boven de calculator-shell op alle 10 calculatorpagina’s: `Home > Categorie > Calculator` (bijvoorbeeld `Home > Inkomen > Bruto netto 2026`, `Home > Belasting > BTW calculator`, `Home > Wonen > Hypotheek calculator`, `Home > Ondernemen > ZZP calculator`, `Home > Auto > Auto importkosten berekenen`). Component gebruikt `<nav aria-label="Breadcrumb">`, `<ol>` lijst, `aria-current="page"` op de huidige pagina, en microdata. Bestaande `BreadcrumbList` JSON-LD schema blijft behouden. Exact één H1 per pagina blijft intact; alle breadcrumbs zijn server-rendered. Styling is rustig, compact en mobile-first. Oude back-up map `src/pages/_bak/` verwijderd; inhoud was niet meer in gebruik. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-03

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 097 — Category Navigation Integration v1
**Details:** Categoriepagina’s uit Sprint 096 zijn nu volledig geïntegreerd in de site-navigatie. Homepage: cluster-chips zijn klikbare links naar `/categorie/inkomen/`, `/categorie/belasting/`, `/categorie/wonen/`, `/categorie/ondernemen/` en `/categorie/auto/`; link "Bekijk alle categorieën" scrollt naar nieuwe categorieën-sectie; zoekveld filtert nog steeds de calculator grid. Header (`src/layouts/BaseLayout.astro`): mobiel hamburger-menu, desktop dropdown "Categorieën", behoud van bestaande calculatorlinks. Footer: drie kolommen met categorie-links, alle calculators en site-links. Calculatorpagina’s: `ToolFooter` component uitgebreid met `categoryLink`/`categoryLabel`; alle 10 calculatorpagina’s tonen subtiele link "Bekijk meer calculators in de categorie [X]". `RelatedCategories.astro` krijgt optionele `title` en `current` props voor hergebruik als algemene categorielijst. Interne links zijn server-rendered, anchor-teksten beschrijvend, exact één H1 per pagina behouden, mobiel geen horizontale scroll, AdSense niet verplaatst boven primaire navigatie/tool. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-03

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 096 — Category Experience v1
**Details:** Vijf nieuwe categoriepagina's gebouwd in `src/pages/categorie/`: inkomen, belasting, wonen, ondernemen en auto. Iedere pagina bevat een hero, calculator grid in homepage-stijl, 300–500 woorden unieke server-rendered content, minimaal 5 FAQ-items via `FaqAccordion`, officiële bronnen via `SourceCards`, gerelateerde categorieën en interne links. Nieuwe herbruikbare componenten in `src/components/category/`: `CategoryHero.astro`, `CategoryIntro.astro`, `CategoryGrid.astro`, `CategoryFaq.astro`, `CategorySources.astro` en `RelatedCategories.astro`. Gedeeld helper bestand `src/lib/category-icons.ts` voor iconen en categorielijst. SEO per pagina: unieke title/meta description, canonical, exact één H1, `BreadcrumbList`, `CollectionPage` en `FAQPage` JSON-LD schema. Mobile-first CSS: 1 kolom op mobiel, 2 op tablet, 3–4 op desktop; grote klikvlakken. AdSense (`AdSlot`) alleen ná de eerste calculatorsectie. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.
**Status:** In ontwikkeling
**Build:** 22 pagina's, sitemap met 21 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-03

**Type:** Product/Strategie
**Wijziging:** Atlas v2 Sprint 095 — FiscalMesh Product Roadmap 1.0
**Details:** Centraal roadmap-document toegevoegd in `docs/product/00-FISCALMESH-PRODUCT-ROADMAP.md`. Het document legt de strategische koers van Calculatieloket / FiscalMesh definitief vast en wordt leidend voor alle volgende Product Completion sprints. Bevat missie, visie (Product Completion → Dashboard → Agents → International Expansion), uitgebreide beschrijving van fase 1 t/m 4, Definition of Done per calculator (18 criteria), Platform Definition of Done voor homepage, hub, categorieën, navigatie, search, footer, header, dashboard, Knowledge Layer, Recommendation Engine en CI/CD, non-negotiables (geen agents voor Product Completion, geen internationale uitrol voor Nederland referentieproduct), Quality Rules, Sprint Governance-formulier, Product Scoreboard en afsluitend leidend principe. Geen code-wijzigingen: geen Astro pagina's, calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, deploy of dependencies aangeraakt. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md` verwijst naar de roadmap, `05_changelog.md` en `docs/10-CHANGELOG.md` bevatten deze entry. `npm run atlas:check` is niet beïnvloed; alle 17 pagina's en 219 tests blijven ongewijzigd.
**Status:** In ontwikkeling
**Build:** Geen build-impact; 17 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.

---

## 2026-07-03

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 093 — Homepage App Experience v1
**Details:** Herontwerp van `src/pages/index.astro` tot een financiële startpagina. Hero met H1 "Wat wil je berekenen?", zoekveld om calculators te filteren, en cluster-chips (Alle, Populair, Inkomen, Wonen, Ondernemen, Belasting, Auto). Hoofdgrid toont 10 actiegerichte calculator cards: Bruto netto 2026, Salaris calculator, Vakantiegeld calculator, Toeslagen calculator, Hypotheek calculator, BTW calculator, BTW terugrekenen, BTW inclusief/exclusief, ZZP calculator en Auto importkosten berekenen. Elke card bevat titel, vraag, belofte, badge (Populair/Nieuw/Voor ondernemers) en CTA "Bereken direct". Secties "Begin met je inkomen" (Bruto netto, Vakantiegeld, Toeslagen, Hypotheek, ZZP) en "Voor ondernemers" (BTW, BTW terugrekenen, ZZP, Auto importkosten) gebruiken `CrossSellCards`. SEO versterkt: title en meta description aangepast, één H1, `WebSite` + `SearchAction` JSON-LD schema in `head` slot, interne links naar alle calculators, behouden FAQ en trustband. AdSense-advertentie (`AdSlot`) bewust pas ná de eerste toolsectie geplaatst. Mobile-first CSS: 1 kolom op 360/390px, 2 kolommen op tablet, 3 kolommen op desktop; grote tap targets (cluster-chips, cards, zoekveld). Client-side filter werkt op server-rendered cards; alle links blijven zichtbaar zonder JavaScript. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, shared components (alleen hergebruik `CrossSellCards`), `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md`, `05_changelog.md` en `docs/10-CHANGELOG.md`. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 17 pagina's, sitemap met 16 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-03

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 092 — Vakantiegeld Calculator
**Details:** Nieuwe calculator `src/pages/vakantiegeld-calculator.astro` gebouwd in de App Shell. Input: bruto maandsalaris, vakantiegeldpercentage, pensioenpremie per maand en loonheffingskorting toggle. Resultaat direct zichtbaar bij laden: bruto vakantiegeld, geschatte inhouding, netto vakantiegeld, effectief tarief, netto per jaar met/zonder vakantiegeld. De berekening gebruikt de nieuwe engine `src/lib/calculators/vacation-pay.ts`, die de bestaande `tax.ts` engine hergebruikt door een totaalscenario mét vakantiegeld te vergelijken met een zonder-vakantiegeld-scenario. URL state toegevoegd: `?bruto`, `?percentage`, `?pensioen`, `?lhk`. Quick chips: € 2.500, € 3.000, € 3.500, € 4.000, € 5.000. Kopieer-link knop in `ResultPanel`. `FAQPage`, `BreadcrumbList` en `HowTo` JSON-LD schema markup via `BaseLayout` head slot. SEO-content behouden: werking vakantiegeld, voorbeeldberekening, belasting, uitbetaling, veelgemaakte fouten. Vakantiegeld toegevoegd aan de Financial Recommendation Engine via `src/lib/recommendations/rules/vacation-pay.ts` en geregistreerd als `"vakantiegeld": vacationPayRules` in `src/lib/recommendations/registry.ts`. Recommendations op de vakantiegeld pagina: Bruto-netto 2026, Salaris, Toeslagen, Hypotheek, ZZP. De `vakantiegeld` placeholder in `src/lib/recommendations/rules/income.ts` en de default step in `src/components/calculator/FinancialJourney.astro` zijn vervangen door een werkende link naar `/vakantiegeld-calculator/`. Tests toegevoegd in `tests/calculators/vacation-pay.test.ts` (8 tests) en `tests/recommendations/recommendations.test.ts` (4 extra tests). Catalogus bijgewerkt in `docs/catalog/calculators.yml`. Documentatie bijgewerkt: `docs/product/10-PRODUCT-POLISH-BACKLOG.md` en `docs/product/11-FINANCIAL-RECOMMENDATION-ENGINE.md`. Geen wijzigingen aan bestaande calculator engines, Knowledge Objects, Rule Resolver, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 17 pagina's, sitemap met 16 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 091 — Auto Importkosten Recommendation Rules
**Details:** `auto-importkosten` toegevoegd aan de Financial Recommendation Engine. Nieuwe rule file `src/lib/recommendations/rules/import-costs.ts` met rule set: BTW Calculator (altijd), Hypotheek/financiering bij `totalCost > 5000`, Bruto-netto 2026 bij lagere kosten, ZZP uurtarief (zakelijke context) en BPM uitleg via Belastingdienst. Geregistreerd in `src/lib/recommendations/registry.ts` als `"auto-importkosten": importCostsRules`. `src/pages/auto-importkosten-berekenen.astro` gemigreerd van statische `steps` naar dynamische `recommendations`: server-side `getRecommendations()` voor de initiële render en client-side `updateFinancialJourney()` bij elke inputwijziging. Tests uitgebreid in `tests/recommendations/recommendations.test.ts`: registry bevat `auto-importkosten`, BTW heeft priority 1, hypotheek bij hoge kosten, bruto-netto bij lage kosten, huidige calculator wordt gefilterd, zzp en bpm-uitleg zijn aanwezig. Documentatie bijgewerkt: `docs/product/11-FINANCIAL-RECOMMENDATION-ENGINE.md` (rule set, registry, Sprint 091 integratie, gerelateerde bestanden) en `docs/product/10-PRODUCT-POLISH-BACKLOG.md` (Sprint 091 update). Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 090 — Auto Importkosten Calculator App Shell Migration
**Details:** `src/pages/auto-importkosten-berekenen.astro` gemigreerd naar de Calculator App Shell. De pagina gebruikt `CalculatorShell.astro`, `InputPanel.astro`, `ResultPanel.astro`, `UseCasesPanel.astro`, `SourceCards.astro`, `FaqAccordion.astro`, `ToolFooter.astro`, `FinancialJourney.astro`, `HowToSchema.astro` en `InlineSources.astro`. De berekening gebruikt de bestaande `calculateImportCosts()` zonder wijzigingen. Resultaat is direct zichtbaar bij laden (aankoopprijs € 15.000, bpm € 3.000, standaard importkosten). URL state toegevoegd: `?voertuig`, `?land`, `?aankoopprijs`, `?bpm`, `?rdw`, `?transport`, `?export`, `?keuring`, `?kenteken`, `?overig` en `?nl`. Quick-preset chips: "Lage kosten", "Gemiddeld", "Hoog". Kopieer-link knop in `ResultPanel` actions slot. `FinancialJourney` gebruikt de `steps` prop (de recommendation registry ondersteunt `auto-importkosten` nog niet; backward compatible met `steps`). `FAQPage`, `BreadcrumbList` en `HowTo` JSON-LD schema markup via `BaseLayout` head slot. SEO-content behouden: kostenposten, bpm-uitleg, btw-uitleg, import uit Duitsland/Frankrijk, camper aandachtspunten, voorbeeld, veelgemaakte fouten. Geen advertentie tussen input en resultaat; advertentie staat boven de tool. Mobile-first page CSS voor 360/390/768px en desktop. Geen wijzigingen aan de `import-costs` engine, Knowledge Objects, Rule Resolver, andere calculatorpagina’s, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 089 — P1 Product Polish
**Details:** P1 product polish toegepast op alle 8 gemigreerde calculators. Gedeelde componenten toegevoegd: `src/components/calculator/HowToSchema.astro` (genereert `HowTo` JSON-LD schema markup) en `src/components/calculator/InlineSources.astro` (compacte bronvermelding direct onder het resultaat). Gewijzigde pagina's: `src/pages/hypotheek-calculator.astro`, `src/pages/toeslagen-calculator.astro`, `src/pages/btw-calculator.astro`, `src/pages/btw-terugrekenen.astro`, `src/pages/btw-inclusief-exclusief.astro`, `src/pages/zzp-calculator.astro`, `src/pages/bruto-netto-2026.astro` en `src/pages/salaris-calculator.astro`. Per pagina: HowTo schema markup in de `head` slot, inline bronnen onder het resultaat, contextuele interne links in de SEO-content, opruiming van overbodige `.result-next-steps` CSS, en mobiele input polish via `src/styles/global.css` (16px font-size, `.form-group-row` responsive). `bruto-netto-2026.astro` en `salaris-calculator.astro` krijgen bovendien een live loonheffingskortingvergelijking: het resultaat toont naast de normale uitkomst ook het netto salaris zonder loonheffingskorting en het maandelijkse voordeel van de korting. Deze vergelijking wordt server-side geïnitialiseerd en client-side bijgewerkt bij elke inputwijziging. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `docs/product/10-PRODUCT-POLISH-BACKLOG.md` bijgewerkt: Sprint 089 gemarkeerd als afgerond, afgeronde P1 items afgestreept, openstaande P1 items (#14, #16, #18) terug naar backlog. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 088 — Recommendation Engine Integration
**Details:** De rule-based Financial Recommendation Engine uit Sprint 087 is aangesloten op alle 8 gemigreerde calculators. Gewijzigde pagina’s: `src/pages/bruto-netto-2026.astro`, `src/pages/salaris-calculator.astro`, `src/pages/hypotheek-calculator.astro`, `src/pages/toeslagen-calculator.astro`, `src/pages/btw-calculator.astro`, `src/pages/btw-terugrekenen.astro`, `src/pages/btw-inclusief-exclusief.astro` en `src/pages/zzp-calculator.astro`. Elke pagina berekent server-side een initiële `Recommendation[]` via `getRecommendations()` en geeft deze door aan `<FinancialJourney recommendations={...} />`. Bij inputwijzigingen wordt de set herberekend in de client via `getRecommendations()` en `updateFinancialJourney()` (`src/lib/recommendations/client.ts`). De handmatige `journeySteps` arrays in de BTW- en ZZP-pagina’s zijn verwijderd; de statische `result-next-steps` blokken in bruto-netto, salaris, hypotheek, toeslagen en BTW zijn vervangen door de recommendation-driven Financial Journey. `FinancialJourney.astro` blijft backward compatible met de `steps` prop. De engine, rule files, registry en helpers zijn ongewijzigd ten opzichte van Sprint 087; de integratie gebruikt bestaande `incomeRules`, `mortgageRules`, `btwRules`, `zzpRules` en `allowancesRules`. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `docs/product/10-PRODUCT-POLISH-BACKLOG.md` bijgewerkt: Sprint 087 gemarkeerd als afgerond, Sprint 088 toegevoegd als afgerond, P1 polish items gepromoveerd tot volgende aanbeveling. `docs/product/11-FINANCIAL-RECOMMENDATION-ENGINE.md` bijgewerkt: Sprint 088 integratieplan gemarkeerd als uitgevoerd, `client.ts` toegevoegd aan gerelateerde bestanden. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 087 — Financial Recommendation Engine v1
**Details:** Nieuwe rule-based recommendation laag toegevoegd in `src/lib/recommendations/`. Bestanden: `types.ts`, `helpers.ts`, `engine.ts`, `registry.ts` en rule files `income.ts`, `btw.ts`, `mortgage.ts`, `zzp.ts`, `allowances.ts`. Centrale API `getRecommendations(input)` leest regels uit `recommendationRegistry`, sorteert op `priority` oplopend, dedupliceert op `id` en filtert de huidige calculator eruit. Regels dekken alle 8 gemigreerde calculators: `bruto-netto`/`salaris` (income), `hypotheek` (mortgage), BTW-cluster (`btw`, `btw-terugrekenen`, `btw-inclusief-exclusief`), `zzp` en `toeslagen`. Voorbeeldregels: laag netto inkomen → toeslagen; hoog netto inkomen → hypotheek; hoog uurtarief → hypotheek; partner inkomen → bruto-netto. `src/components/calculator/FinancialJourney.astro` uitgebreid met `recommendations` prop; blijft backward compatible met bestaande `steps` prop. Default income-based steps blijven werken als fallback. Nieuwe tests in `tests/recommendations/recommendations.test.ts` (17 tests): unknown calculator, priority sorting, deduplicatie, filtering van huidige calculator, income rules, BTW rules, mortgage rules, ZZP rules, allowances rules, registry keys. Nieuwe documentatie `docs/product/11-FINANCIAL-RECOMMENDATION-ENGINE.md` met doel, architectuur, types, registry, rule files, uitbreidingsinstructie, gebruiksvoorbeelden, FinancialJourney integratie en Sprint 088 integratieplan. `docs/product/10-PRODUCT-POLISH-BACKLOG.md` bijgewerkt: Sprint 086 afgerond, Sprint 087 huidige aanbeveling, "Wachten op Sprint 088". Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 086 — ZZP Calculator App Shell Migration
**Details:** `src/pages/zzp-calculator.astro` gemigreerd naar de Calculator App Shell. De pagina gebruikt `CalculatorShell.astro`, `InputPanel.astro`, `ResultPanel.astro`, `UseCasesPanel.astro`, `SourceCards.astro`, `FaqAccordion.astro`, `ToolFooter.astro` en `FinancialJourney.astro`. Input: gewenst netto inkomen per maand, factureerbare dagen per jaar, uren per dag, zakelijke kosten per maand, pensioenreservering per maand, en toggles voor zelfstandigenaftrek, startersaftrek en MKB-winstvrijstelling. Resultaat direct zichtbaar bij laden: benodigd uurtarief, benodigde jaaromzet (excl. btw), netto doel per maand, zakelijke kosten per jaar, pensioenopbouw per jaar, ondernemersaftrek + MKB-vrijstelling, belastingindicatie, netto na belasting en netto na pensioen per jaar. De berekening gebruikt de bestaande `calculateZzpReverse()` functie zonder wijzigingen aan de ZZP engine. URL state toegevoegd: `?netto`, `?dagen`, `?uren`, `?kosten`, `?pensioen`, `?zelfstandigenaftrek`, `?startersaftrek`, `?mkb`. Quick chips: € 2.500, € 3.000, € 3.500, € 4.000, € 5.000. Kopieer-link knop in `ResultPanel` actions slot. Financial Journey toont vijf vervolgstappen: BTW berekenen, bruto-netto vergelijken, hypotheek berekenen, auto importkosten berekenen en toeslagen berekenen, met actuele omzet/inkomen parameters waar mogelijk. `FAQPage` en `BreadcrumbList` JSON-LD schema markup via `BaseLayout` head slot. SEO-content behouden: uitleg, belangrijke aannames, bronnen en disclaimer. Geen advertentie tussen input en resultaat; advertentie staat boven de tool. Mobile-first page CSS voor 360/390/768px en desktop. Geen wijzigingen aan de `zzp` engine, Knowledge Objects, FiscalMesh/Atlas, andere calculatorpagina’s, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `docs/product/10-PRODUCT-POLISH-BACKLOG.md` bijgewerkt: Sprint 085 gemarkeerd als afgerond, Sprint 086 toegevoegd als huidige aanbeveling, "Wachten op Sprint 087". `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-02

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 085 — Complete BTW Experience: BTW Terugrekenen + BTW Inclusief/Exclusief App Shell Migration
**Details:** `src/pages/btw-terugrekenen.astro` en `src/pages/btw-inclusief-exclusief.astro` gemigreerd naar de Calculator App Shell. Beide pagina's gebruiken `CalculatorShell.astro`, `InputPanel.astro`, `ResultPanel.astro`, `UseCasesPanel.astro`, `SourceCards.astro`, `FaqAccordion.astro`, `ToolFooter.astro` en `FinancialJourney.astro`. `btw-terugrekenen` berekent altijd van inclusief naar exclusief; `btw-inclusief-exclusief` ondersteunt beide richtingen. Resultaat direct zichtbaar bij laden: bedrag exclusief, btw-bedrag, bedrag inclusief, gebruikt tarief. URL state toegevoegd: `?bedrag` en `?tarief` (beide pagina's), plus `?richting` voor `btw-inclusief-exclusief`. Quick chips: € 100, € 250, € 500, € 1000. Kopieer-link knop in beide `ResultPanel` actions slots. Financial Journey verbindt het BTW-cluster onderling en naar ZZP uurtarief en auto importkosten, met actuele bedrag/tarief parameters. `FAQPage` en `BreadcrumbList` JSON-LD schema markup via `BaseLayout` head slot. SEO-content behouden: uitleg, voorbeelden, veelgemaakte fouten, bronnen. Geen advertentie tussen input en resultaat; advertentie staat boven de tool. Mobile-first page CSS voor 360/390/768px en desktop. Geen wijzigingen aan calculatorlogica, engines, Knowledge Objects, FiscalMesh/Atlas, andere calculatorpagina’s, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `docs/product/10-PRODUCT-POLISH-BACKLOG.md` bijgewerkt: Sprint 084 gemarkeerd als afgerond, Sprint 085 toegevoegd als huidige aanbeveling, "Wachten op Sprint 086". `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-01

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 082 — Hypotheek Calculator App Shell Migration
**Details:** `src/pages/hypotheek-calculator.astro` gemigreerd naar de app/tool shell. Gebruikt `CalculatorShell.astro`, `InputPanel.astro`, `ResultPanel.astro`, `UseCasesPanel.astro`, `SourceCards.astro`, `FaqAccordion.astro` en `ToolFooter.astro`. Inputvelden: bruto jaarinkomen, hypotheekrente, looptijd (10/20/30 jaar), partner toggle en partner inkomen. Resultaat direct zichtbaar bij laden: maximaal hypotheekbedrag, inkomensfactor, bruto maandlasten, netto maandlasten (incl. hypotheekrenteaftrek) en totale rentekosten. URL state toegevoegd: `?inkomen`, `?rente`, `?looptijd`, `?partner`, `?partnerInkomen`. Quick income chips: € 40.000, € 50.000, € 60.000, € 70.000, € 80.000. Kopieer-link knop en dynamische vervolgstappen (bruto-netto, salaris, toeslagen, ZZP). `FAQPage` en `BreadcrumbList` JSON-LD schema markup via `BaseLayout` head slot. SEO-content behouden: uitleg en uitgangspunten. Disclaimer en bronnen via `ToolFooter` / `SourceCards`. Geen advertentie tussen input en resultaat; advertentie staat boven de tool. Geen wijzigingen aan de `mortgage` engine, Knowledge Objects, FiscalMesh/Atlas, andere calculatorpagina’s, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-01

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 081 — Salaris Calculator App Shell Migration
**Details:** `src/pages/salaris-calculator.astro` volledig gemigreerd naar de app/tool shell. Gebruikt `CalculatorShell.astro`, `InputPanel.astro`, `ResultPanel.astro`, `UseCasesPanel.astro`, `SourceCards.astro`, `FaqAccordion.astro` en `ToolFooter.astro`. Input: bruto maandsalaris, pensioenpercentage (werknemersdeel) en loonheffingskorting toggle. Resultaat is direct zichtbaar bij laden (€ 3.500 bruto, 5% pensioen, LHK aan). URL state toegevoegd: `?bruto`, `?pensioen` (percentage), `?lhk` (1 of 0). Quick amount chips: € 2.500, 3.000, 3.500, 4.000, 5.000. Kopieer-link knop in `ResultPanel` actions slot. Effectief belastingtarief + compacte 2026 belastingschijven-tabel in resultaat. Dynamische vervolgstappen: Bruto-netto 2026, Toeslagen, Hypotheek, ZZP. `FAQPage` en `BreadcrumbList` JSON-LD schema markup via `BaseLayout` head slot. SEO-content behouden: intro, uitleg, voorbeeldberekening, tarieventabel. Disclaimer en laatst-bijgewerkt via `ToolFooter`. Geen advertentie tussen input en resultaat; advertentie staat boven de tool. Geen wijzigingen aan calculatorlogica, engines, Knowledge Objects, FiscalMesh/Atlas, andere calculatorpagina’s, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-07-01

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 080 — Bruto Netto WOW Polish
**Details:** `src/pages/bruto-netto-2026.astro` verder gepolijst op basis van de concurrentiebenchmark en product backlog. Toegevoegd: dynamische use cases (`UseCasesPanel` met `id` + `data-template`; `{{bruto}}`, `{{netto}}`, `{{bruto_jaar}}`, `{{netto_jaar}}` worden client-side vervangen bij elke inputwijziging), “Kopieer link” knop in `ResultPanel` actions slot (kopieert huidige URL met parameters naar klembord), effectief belastingtarief + compacte 2026 belastingschijven-tabel in resultaat, `FAQPage` en `BreadcrumbList` JSON-LD schema markup via `BaseLayout` head slot, “Bijgewerkt: 2026” / “Bron: Belastingdienst” meta-badges direct onder de hero, quick-amount chips (€ 2.500, 3.000, 3.500, 4.000, 5.000), mobile-first page CSS, “Verder rekenen” links in het resultaat, en Enter-key trigger op het bruto inputveld. `UseCasesPanel.astro` uitgebreid met `data-template` attribuut zodat de originele beschrijvingstemplate bewaard blijft voor dynamische updates. De bovenste AdSlot is bewust niet verwijderd; A/B-test wordt aanbevolen zodra traffic data beschikbaar is. Geen wijzigingen aan andere calculatorpagina’s, engines, Knowledge Objects, FiscalMesh/Atlas, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Product/UX
**Wijziging:** Atlas v2 Sprint 079 — Competitive UX Benchmark + Product Polish
**Details:** Concurrentie-analyse uitgevoerd voor Nederlandse bruto-netto calculators: `BerekenHet.nl`, `Loonwijzer.nl` (via `wageindicator.org` omdat `loonwijzer.nl` bot-verkeer blokkeert), `SalarisNetto.nl` en `Nibud.nl`. Productdocumentatie aangemaakt in `docs/product/`: `08-COMPETITIVE-BENCHMARK.md` (benchmark + objectieve scorekaart op 12 criteria: snelheid, eenvoud, mobiel/desktop UX, resultaatpresentatie, betrouwbaarheid, uitleg, FAQ, advertenties, vervolgacties, interne links, SEO), `09-BRUTO-NETTO-UX-REVIEW.md` (sterke/zwakke punten van de huidige `bruto-netto-2026.astro` + 28 concrete verbeterpunten + 7 quick wins), `10-PRODUCT-POLISH-BACKLOG.md` (backlog met 25 items verdeeld over P0, P1, P2). Belangrijkste conclusie: SalarisNetto is op dit moment de sterkste calculator-concurrent qua snelheid/eenvoud; Nibud wint op vertrouwen/uitleg; BerekenHet en Loonwijzer zijn uitgebreider maar minder converterend. Grootste kansen voor Calculatieloket: dynamische use cases, deel-link, effectief belastingtarief + schijven, FAQ/BreadcrumbList schema, mobiele viewport-optimalisatie, bovenste advertentie testen/verwijderen, betrouwbaarheidsversterking. Geen wijzigingen aan calculatorpagina's, engines, Knowledge Objects, FiscalMesh/Atlas, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 078 — Bruto-netto 2026 gemigreerd naar App Shell
**Details:** `src/pages/bruto-netto-2026.astro` volledig herschreven naar de nieuwe app/tool shell: `CalculatorShell.astro`, `InputPanel.astro`, `ResultPanel.astro`, `UseCasesPanel.astro`, `SourceCards.astro`, `FaqAccordion.astro` en `ToolFooter.astro`. De calculator toont direct een server-side berekende indicatie (€ 3.000 bruto, € 150 pensioen, loonheffingskorting aan). URL state toegevoegd met query parameters `bruto`, `pensioen` en `lhk`; bij wijziging van input wordt de URL via `history.replaceState` bijgewerkt. Use cases "Wat kun je hiermee?" linken naar toeslagen, hypotheek, salaris en ZZP calculators. Bronnen en FAQ zijn verplaatst naar de shell zodat het resultaat bij de tool blijft. Oorspronkelijke SEO-content (wat is bruto/netto, berekeningsstappen, tarieven, factoren, voorbeelden, veelgemaakte fouten) is behouden in een server-rendered contentblok. AdSense-plaatsing: advertenties alleen buiten de input/result flow, nooit tussen input en resultaat. Demo-pagina `/demo/calculator-shell/` voorzien van `noindex,nofollow` meta via nieuwe `noindex` prop op `BaseLayout`; `public/robots.txt` uitgebreid met `Disallow: /demo/`; `astro.config.mjs` sitemap filter zodat `/demo/` pagina's niet in de sitemap terechtkomen. `FaqAccordion` component aangepast zodat antwoorden HTML mogen bevatten (`set:html`). Geen wijzigingen aan andere calculatorpagina's, engines, Knowledge Objects, FiscalMesh/Atlas, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 16 pagina's, sitemap met 15 HTTPS-URL's (demo uitgesloten), geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 Sprint 077 — Calculator App Component Library v0.1
**Details:** Eerste herbruikbare app/tool componenten gebouwd in `src/components/calculator/`: `CalculatorShell.astro`, `InputPanel.astro`, `ResultPanel.astro`, `UseCasesPanel.astro`, `FaqAccordion.astro`, `ToolFooter.astro`. Componenten zijn mobile-first, generiek voor bruto-netto, toeslagen, hypotheek, BTW en ZZP, server-rendered waar nodig, en houden rekening met SEO/AdSense randvoorwaarden (geen advertenties tussen invoer en resultaat). Demo-pagina aangemaakt op `src/pages/demo/calculator-shell.astro` (URL `/demo/calculator-shell/`) met een bruto-netto voorbeeld: vraag "Wat houd ik netto over?", input card met bruto maandsalaris, result card met voorbeeld netto bedrag, use cases (toeslagen, hypotheek, ZZP), FAQ accordion, bronnen en footer. Documentatie toegevoegd: `docs/product/07-CALCULATOR-COMPONENT-LIBRARY-v0.1.md`; `docs/product/04-FIRST-IMPLEMENTATION-PLAN.md` bijgewerkt met status update. Geen bestaande calculatorpagina's gewijzigd; geen SEO-content, calculatorlogica, engines, FiscalMesh/Atlas, Knowledge Objects, `.env`, deploy, npm ci, node_modules verwijdering of dependencies aangeraakt. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 15 pagina's plus 1 demo-pagina, sitemap met 16 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Product/Architectuur
**Wijziging:** Atlas v2 Sprint 076 — Calculatieloket App Experience Blueprint + FiscalMesh Agents Architecture
**Details:** Nieuwe productdocumentatie aangemaakt in `docs/product/`: `00-CALCULATIELOKET-APP-VISION.md` (app/tool visie: vraag → bedrag → direct antwoord → vervolgstappen → gerelateerde calculators → bronvermelding → disclaimer; inclusief SEO/AdSense randvoorwaarden: app-ervaring bovenaan, SEO-content eronder, geen advertenties tussen invoer en resultaat, geen calculator verstoppen achter client-only flows), `01-CURRENT-SITE-AUDIT.md` (audit van huidige `src/pages` calculators: wat al goed is, wat mist, welke pagina's nog niet app-like aanvoelen, welke componenten beter moeten, pagina-specifieke beoordelingen), `02-APP-UX-BLUEPRINT.md` (ideaal calculator-scherm: hero micro-header, input card, result card, "Wat kun je hiermee?", next steps, bronnen, FAQ, mobiel gedrag, componentenarchitectuur; inclusief AdSense-plaatsingsregels, server-rendered contentblokken en meetpunten), `03-CALCULATOR-JOURNEY-MODEL.md` (eerste app-journey: "Ik vul mijn maandinkomen in → wat betekent dit voor salaris, toeslagen, hypotheek en ZZP?", persona, state overdracht via URL parameters/sessionStorage, mapping naar bestaande pagina's, interne linkstrategie, nieuwe calculators die de journey versterken), `04-FIRST-IMPLEMENTATION-PLAN.md` (5-stappen implementatieplan zonder big bang: eerst componenten, daarna `bruto-netto-2026` perfectioneren, daarna hergebruik naar andere pagina's, aanbevolen eerste calculator is `bruto-netto-2026`; inclusief SEO/AdSense in Definition of Done), `05-FISCALMESH-AGENTS-ARCHITECTURE.md` (architectuur van eerste generatie interne FiscalMesh Agents: SEO, Knowledge, Content, QA, Design, Analytics, Product; duidelijk gescheiden van publieke website; roadmap Agent v1/v2/v3), `06-SEO-ADSENSE-STRATEGY.md` (volledige SEO/AdSense strategie: SEO-vereisten per calculatorpagina, AdSense-plaatsingsregels zonder tool-flow te verstoren, internationale SEO-structuur per land, contentblokken die altijd server-rendered/indexeerbaar moeten blijven, interne linkstrategie, meetpunten: organic clicks, pageviews per sessie, calculator starts, completions, result views, next-step clicks, ad RPM, scroll depth). Geen code gewijzigd; geen websitepagina's, calculator engines, calculatorlogica, UI/SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env`, deploy, npm ci, node_modules verwijdering of dependencies aangeraakt. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Repository public gemaakt + branch protection nu afgedwongen
**Details:** De GitHub repository `ClubDisplay/calculatieloket` is van privé naar public gezet via **Settings > General > Danger zone > Change repository visibility**. Daardoor wordt de branch protection regel voor `main` (require PR + require status check `Atlas CI / Run Atlas CI checks`) technisch afgedwongen. De documentatie is bijgewerkt: `docs/v2/ci/01-BRANCH-PROTECTION.md` en `docs/v2/ci/03-GITHUB-ACTIVATION-RUNBOOK.md` bevatten nu een waarschuwing dat gratis privé-repositories op persoonlijke accounts branch protection niet afdwingen; `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` status headers en roadmap bullets bijgewerkt naar "Public Repository + Branch Protection Enforced". Geen wijzigingen aan websitepagina's, calculatorpagina's, Knowledge Objects, UI/SEO-content, runtime code, engines, Rule Resolver, `.env`, deploy, secrets of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — GitHub Activation Runbook + CI docs index + GitHub activation executed
**Details:** Nieuwe documentatie `docs/v2/ci/03-GITHUB-ACTIVATION-RUNBOOK.md` aangemaakt en bijgewerkt na praktische activatie. Bevat een stap-voor-stap runbook met exacte terminalcommando's om de lokale Atlas repository veilig naar GitHub te pushen en Atlas CI live te activeren. Aangepast: SSH wordt nu aanbevolen; HTTPS vereist een Personal Access Token met minimaal de scopes `repo` en `workflow`; troubleshooting toegevoegd voor `workflow` scope errors, `Host key verification failed`, en `Device not configured` / credentials prompt. Ook `docs/v2/ci/README.md` aangemaakt als index voor de vier CI-handleidingen. `docs/v2/ci/00-GITHUB-READINESS.md` bijgewerkt met een authenticatie-sectie (SSH vs HTTPS + token scopes). `docs/v2/ci/01-BRANCH-PROTECTION.md` bijgewerkt met notitie dat de PR-check naam `Atlas CI / Run Atlas CI checks (pull_request)` toont, maar in branch protection de naam zonder `(pull_request)` gebruikt moet worden. GitHub activatie succesvol uitgevoerd: repository gepusht naar `https://github.com/ClubDisplay/calculatieloket` via SSH (`git@github.com:ClubDisplay/calculatieloket.git`); initiële commit hash `a89cd90`; test branch `test/ci-status` gepusht; test PR geopend; Atlas CI check `Atlas CI / Run Atlas CI checks` groen in 22s. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 075 en verwijzingen naar `docs/v2/ci/README.md` en `03-GITHUB-ACTIVATION-RUNBOOK.md`. Geen wijzigingen aan websitepagina's, calculatorpagina's, Knowledge Objects, UI/SEO-content, runtime code, engines, Rule Resolver, `.env`, deploy, secrets of dependencies. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Draft Spanish Income Tax Object 2026
**Details:** Nieuw Knowledge Object `docs/v2/knowledge/objects/es.tax.income.2026.yml` aangemaakt met `status: draft`, `type: tax_bracket`, `country: ES`, `locale: es-ES`. Bronnen: Agencia Tributaria — IRPF, `https://sede.agenciatributaria.gob.es/Sede/irpf.html`, en BOE — Ley 35/2006 del Impuesto sobre la Renta de las Personas Físicas, `https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764`. Toelichting: de officiële Spaanse IRPF-schaal voor het belastingjaar 2026 (inkomsten 2026) is op 30 juni 2026 nog niet gepubliceerd op de Sede electrónica van de Agencia Tributaria; de huidige campagne “Renta 2025” betreft inkomsten 2025. Het object bevat daarom lege `data.brackets` en een note in `es-ES`, `en-US` en `nl-BE` die aangeeft dat het pas naar `active` wordt gezet zodra de Agencia Tributaria / Ley de Presupuestos de 2026 de schaal publiceert. Data: `year: 2026`, `currency: EUR`, `applies_to: individual`, `brackets: []`. `src/lib/knowledge/generated-objects.ts` opnieuw gegenereerd via `npm run generate:knowledge`; registry telt nu 25 objecten. `npm run validate:knowledge` rapporteert 0 fouten en 2 verwachte waarschuwingen (lege brackets voor `es.tax.income.2026` en `fr.tax.income.2026`, beide draft). Geen wijzigingen aan websitepagina’s, calculatorpagina’s, calculator engines, UI, SEO-content, runtime code, Rule Resolver, `scripts/qa-rule-resolver.mjs`, andere Knowledge Objects, `.env` of dependencies. `docs/v2/knowledge/README.md`, `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt: status headers Sprint 074, Spaanse object in objectlijst, roadmap items en notities over beide draft-objecten. Alle opdracht-gegeven commando’s uitgevoerd: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run build`, `npm run atlas:check`; alles slaagt. `npm run validate:knowledge` rapporteert 0 fouten en 2 waarschuwingen. `npm run test` rapporteert 185 passed tests. `npm run qa:rules` rapporteert 16 lookups, 0 failures, 1 verwachte `notFoundLookups` (NL VAT bad version), 5 `fallbackLocaleHits`. `npm run atlas:check` eindigt met `✅ All Atlas CI checks passed in 3.07s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Draft French Income Tax Object 2026
**Details:** Nieuw Knowledge Object `docs/v2/knowledge/objects/fr.tax.income.2026.yml` aangemaakt met `status: draft`, `type: tax_bracket`, `country: FR`, `locale: fr-FR`. Bron: Service Public / DILA, `https://www.service-public.fr/particuliers/vosdroits/F1419`. Toelichting: de Franse "barème 2026" op die pagina is van toepassing op inkomsten 2025 (aanslag 2026); de officiële tarieven voor inkomsten 2026 (aanslag 2027) zijn op 30 juni 2026 nog niet gepubliceerd. Het object bevat daarom lege `data.brackets` en een duidelijke note in `fr-FR`, `en-US` en `nl-BE` dat het pas naar `active` wordt gezet zodra de loi de finances pour 2027 de schijven publiceert. Data: `year: 2026`, `assessment_year: 2027`, `currency: EUR`, `applies_to: individual`, `brackets: []`. `src/lib/knowledge/generated-objects.ts` opnieuw gegenereerd via `npm run generate:knowledge`; registry telt nu 24 objecten. `npm run validate:knowledge` rapporteert 0 fouten en 1 verwachte waarschuwing (`tax_bracket.data.brackets is leeg; object is draft, dus toegestaan pending review`). Geen wijzigingen aan websitepagina’s, calculatorpagina’s, calculator engines, UI, SEO-content, runtime code, Rule Resolver, `scripts/qa-rule-resolver.mjs`, andere Knowledge Objects, `.env` of dependencies. `docs/v2/knowledge/README.md`, `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt: status headers Sprint 073, Franse object in objectlijst, roadmap item en notitie over draft. Alle opdracht-gegeven commando’s uitgevoerd: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run build`, `npm run atlas:check`; alles slaagt. `npm run validate:knowledge` rapporteert 0 fouten en 1 waarschuwing. `npm run test` rapporteert 185 passed tests. `npm run qa:rules` rapporteert 16 lookups, 0 failures, 1 verwachte `notFoundLookups` (NL VAT bad version), 5 `fallbackLocaleHits`. `npm run atlas:check` eindigt met `✅ All Atlas CI checks passed in 3.19s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Active Belgian Income Tax Country Fallback Object 2026
**Details:** Nieuw Knowledge Object `docs/v2/knowledge/objects/be.tax.income.country_fallback.2026.yml` aangemaakt met `status: active`, `type: tax_bracket`, `country: BE`, `locale: BE`. Bevat identieke data als `be.tax.income.2026` (inkomstenjaar 2026 / aanslagjaar 2027, vier belastingschijven, belastingvrije som 11.180 euro tegen 25%, `splitting: false`). Het object heeft een `relationships`-vermelding `fallback_for` naar `be.tax.income.2026` zodat de relatie duidelijk is. Doel: een `fr-BE` lookup voor Belgische inkomstenbelasting kan terugvallen op een land-level `BE` object zonder de exacte `nl-BE` taalversie te vervangen. `tests/rules/resolver.test.ts` uitgebreid met vijf nieuwe tests in een `describe("Belgian income tax locale fallback")` blok: fr-BE income tax resolveert naar `be.tax.income.country_fallback.2026`; exacte nl-BE lookup blijft `be.tax.income.2026`; `onFallback` callback wordt correct aangeroepen voor fr-BE → BE income tax; `fallbackLocaleHits` wordt opgehoogd; exacte nl-BE match roept `onFallback` niet aan. `scripts/qa-rule-resolver.mjs` uitgebreid met lookups voor BE Income Tax (nl-BE) en BE Income Tax fr-BE fallback, plus een tweede fallback-warning check voor income tax. `src/lib/knowledge/generated-objects.ts` opnieuw gegenereerd via `npm run generate:knowledge`; registry telt nu 23 objecten. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, calculator engines, UI, SEO-content, runtime code, Rule Resolver, andere Knowledge Objects, `.env` of dependencies. `docs/v2/knowledge/README.md`, `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt: status headers Sprint 072, voorbeelden en openstaande punten. Alle opdracht-gegeven commando’s uitgevoerd: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run build`, `npm run atlas:check`; alles slaagt. `npm run validate:knowledge` rapporteert 0 fouten en 0 waarschuwingen. `npm run test` rapporteert 185 passed tests. `npm run qa:rules` rapporteert `BE Income Tax` en `BE Income Tax fr-BE fallback` als PASS. `npm run atlas:check` eindigt met `✅ All Atlas CI checks passed in 3.09s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Active Belgian Income Tax Object 2026
**Details:** Nieuw Knowledge Object `docs/v2/knowledge/objects/be.tax.income.2026.yml` aangemaakt met `status: active`. Bron: FOD Financiën / SPF Finances, `https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/belastingtarieven`. Scope: inkomstenjaar 2026 (aanslagjaar 2027) voor de Belgische personenbelasting. Data: `year: 2026`, `assessment_year: 2027`, `currency: EUR`, `tax_free_amount: 11180`, `tax_free_amount_rate: 0.25`, `splitting: false`, en vier brackets: 0–16.720 (25%), 16.720–29.510 (40%), 29.510–51.070 (45%), 51.070+ (50%). De notes leggen uit dat de belastingvrije som de berekende belasting vermindert (niet het belastbare inkomen) en dat het hier om inkomstenjaar 2026 / aanslagjaar 2027 gaat. `src/lib/knowledge/generated-objects.ts` opnieuw gegenereerd via `npm run generate:knowledge`; registry telt nu 22 objecten. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, `scripts/qa-rule-resolver.mjs`, andere Knowledge Objects, `.env` of dependencies. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `src/lib/knowledge/README.md`, `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt: status headers Sprint 071 en roadmap. Alle opdracht-gegeven commando's uitgevoerd: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run build`, `npm run atlas:check`; alles slaagt. `npm run validate:knowledge` rapporteert 0 fouten en 0 waarschuwingen. `npm run test` rapporteert 180 passed tests. `npm run atlas:check` eindigt met `✅ All Atlas CI checks passed in 3.44s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Active German Income Tax Object 2026
**Details:** `docs/v2/knowledge/objects/de.tax.income.2026.yml` geactiveerd na officiële bronreview. Bron: `§ 32a EStG` op `gesetze-im-internet.de`, geldend vanaf veranlagingsperiode 2026. Object nu `status: active` met de volledige Duitse inkomstenbelastingtariefdata: `basic_allowance: 12348`, `splitting: true` en vijf brackets: 0–12.348 (0%), 12.349–17.799 (`(914,51 * y + 1400) * y`), 17.800–69.878 (`(173,10 * z + 2397) * z + 1034,87`), 69.879–277.825 (`0,42 * x - 11135,63`), en vanaf 277.826 (`0,45 * x - 19470,38`). Titel, beschrijving en notes aangepast naar actieve status; zelfverwijzende placeholder-relatie verwijderd. `scripts/qa-rule-resolver.mjs` aangepast: DE Income Tax lookup verwacht nu `de.tax.income.2026` in plaats van `missing`. `tests/rules/resolver.test.ts` aangepast: draft-handling test gebruikt nu een mock draft-object; nieuwe test toegevoegd die aantoont dat `resolveRule({ type: "tax_bracket", country: "DE", locale: "de-DE", year: 2026 })` het actieve object retourneert. `tests/knowledge/registry.test.ts` aangepast: statusverwachting van `draft` naar `active`. `src/lib/knowledge/generated-objects.ts` opnieuw gegenereerd via `npm run generate:knowledge`. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, andere Knowledge Objects, `.env` of dependencies. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `src/lib/knowledge/README.md`, `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt: status headers Sprint 070, roadmap item `de.tax.income.2026` gemarkeerd als afgerond. Alle opdracht-gegeven commando's uitgevoerd: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run build`, `npm run atlas:check`; alles slaagt. `npm run validate:knowledge` rapporteert 0 fouten en 0 waarschuwingen. `npm run test` rapporteert 180 passed tests. `npm run qa:rules` rapporteert `DE Income Tax` als PASS met expected/actual `de.tax.income.2026`. `npm run atlas:check` eindigt met `✅ All Atlas CI checks passed in 3.67s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — GitHub Readiness Checklist
**Details:** Nieuwe documentatie-map `docs/v2/ci/` aangemaakt met drie handleidingen. `00-GITHUB-READINESS.md` bevat een pre-push checklist: `.env` niet gecommit, `package-lock.json` aanwezig, `npm run atlas:check` lokaal slagen, `.github/workflows/atlas-ci.yml` aanwezig, geen deploy-stap, geen secrets, geen Cloudflare/Wrangler in de workflow. `01-BRANCH-PROTECTION.md` beschrijft aanbevolen branch protection voor `main`: verplichte pull request, required status check `Atlas CI / Run Atlas CI checks`, optioneel “Require branches to be up to date”, en het advies om directe push naar `main` alleen bewust toe te staan. `02-ACTIONS-RUNBOOK.md` legt uit waar GitHub Actions runs te vinden zijn, hoe je een falende run bekijkt, waar artifacts staan, welke bestanden in `reports/` verwacht worden en wat te doen bij falen in `npm ci`, `validate:knowledge`, `validate:cdl`, `test`, `qa:rules` of `build`. `src/lib/rules/README.md`, `src/lib/knowledge/README.md` en `docs/v2/03-RULE-ENGINE.md` bijgewerkt: status headers Sprint 069 en verwijzingen naar `docs/v2/ci/`. Geen code gewijzigd; geen websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies aangeraakt. Handmatig getest met `npm run atlas:check`; alle zeven stappen slagen. `npm run atlas:check` slaagt in zijn geheel.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — GitHub Actions CI Workflow v0.1
**Details:** Nieuwe workflow `.github/workflows/atlas-ci.yml` aangemaakt. Triggers: `pull_request` en `push` naar `main`. Draait op `ubuntu-latest` met Node.js 22 via `actions/setup-node@v4`. Dependencies worden geïnstalleerd met `npm ci` (gekozen omdat `package-lock.json` aanwezig is; dit geeft een schone, reproduceerbare installatie zonder het lockbestand te wijzigen, in tegenstelling tot `npm install`). De hoofdstap draait `npm run atlas:check -- --report reports/atlas-check-report.md --json-report reports/atlas-check-report.json`. Vervolgens worden beide rapporten geüpload als artifact via `actions/upload-artifact@v4` met `if: always()`, zodat ze ook bij een falende check beschikbaar zijn. De workflow doet geen deploy, gebruikt geen secrets en roept geen Cloudflare/Wrangler aan; hij is puur bedoeld voor validatie, testen en bouwen. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 068, nieuwe sectie “GitHub Actions CI Workflow” met triggers, stappen, keuze voor `npm ci` en artifact-upload. Handmatig getest met `npm run atlas:check`; alle zeven stappen slagen. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run atlas:check` slaagt in zijn geheel.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Knowledge Changelog Git Diff Auto Impact Mode v0.4
**Details:** `scripts/knowledge-changelog.mjs` uitgebreid zodat `--git-diff --auto` voor gewijzigde objecten met een ongewijzigde id een volledige historische `from`/`to` vergelijking genereert. Het script importeert `compareObjects` uit `scripts/rule-impact.mjs`, leest de basisversie via `git show <base>:<pad>` en de huidige versie van disk, parsed beide als YAML en produceert een compact diff-rapport (context, data, sources, used_by, relationships) inclusief risico en affected consumers. Voor modified objecten met een andere id, renamed, added en deleted objecten blijft het bestaande gedrag ongewijzigd. De `--git-diff` tabelmodus zonder `--auto` en de `--from`/`--to` modus zijn ongewijzigd. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 067, sectie “Knowledge Changelog Git Diff Mode” geüpdatet naar v0.4 met gedrag voor zelfde-id vergelijkingen, limitaties en TODO. Handmatig getest in een tijdelijke git-repository: `nl.vat.standard` aangepast met een extra consumer (LOW risk) en met `data.default_rate` gewijzigd van 21 naar 22 (HIGH risk); beide scenario's toonden het verwachte risico, affected consumers en diff-details. In de huidige projectmap (geen git repo) geeft het script correct een duidelijke foutmelding. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `scripts/rule-impact.mjs` is intern opgesplitst in een geëxporteerde `compareObjects(fromObj, toObj)` functie en een `main()` die alleen draait bij directe uitvoering; dit maakt hergebruik van de diff-logica mogelijk zonder de CLI te dupliceren. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run rule:impact`, `npm run knowledge:changelog` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Local CI Check JSON Report Mode v0.4
**Details:** `scripts/atlas-ci-check.mjs` uitgebreid met `--json-report <pad>` optie. Wanneer deze optie wordt meegegeven, schrijft het script na afloop een JSON rapport met `generated_at`, `overall_status`, `total_duration_ms` en een `steps` array. De uitvoermap wordt automatisch aangemaakt, de JSON output kan gecombineerd worden met `--report` en ook bij een falende stap wordt het rapport nog geschreven voordat het script met exit code `1` stopt. Zonder `--json-report` blijft de console-output ongewijzigd. Het script doet geen deploy, geen `npm ci` en verbergt geen output. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 066 en secties “Local CI Check Script” geüpdatet naar v0.4 met JSON report gedrag. Handmatig getest met `npm run atlas:check -- --json-report reports/atlas-check-report.json` en `npm run atlas:check -- --report reports/atlas-check-report.md --json-report reports/atlas-check-report.json`; testrapporten zijn daarna verwijderd en zijn geen permanente documentatie. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run atlas:check` slaagt.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Local CI Check Timings v0.3
**Details:** `scripts/atlas-ci-check.mjs` uitgebreid met timing per stap. De duur van elke stap wordt gemeten in milliseconden en weergegeven als seconden (bijv. `1.23s`). Console-output toont nu `[PASS] <stapnaam> (<duration>)` en `[FAIL] <stapnaam> (<duration>): <reden>`. De eindmelding toont de totale duur: `✅ All Atlas CI checks passed in <totale duur>.`. Het Markdown rapport (via `--report <pad>`) bevat nu een `Duration` kolom per stap en een `Total duration` regel bovenaan. Bij falen wordt de duur van de falende stap vastgelegd in zowel de tabel als de `Failure details` sectie. Het gedrag van de afzonderlijke checks is ongewijzigd. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 065 en secties “Local CI Check Script” geüpdatet naar v0.3 met timing gedrag. Handmatig getest met `npm run atlas:check` en `npm run atlas:check -- --report atlas-check-report.md`; het testrapport is daarna verwijderd en is geen permanente documentatie. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run atlas:check` slaagt.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Local CI Check Report Mode v0.2
**Details:** `scripts/atlas-ci-check.mjs` uitgebreid met `--report <pad>` optie. Wanneer deze optie wordt meegegeven, schrijft het script na afloop een Markdown rapport met titel `Atlas CI Check Report`, datum/tijd, overall status (PASS/FAIL), een tabel met alle stappen (stapnaam, commando, status) en een faalreden indien van toepassing. Zonder `--report` blijft de bestaande console-output ongewijzigd. Bij een falende stap wordt het rapport nog steeds geschreven voordat het script met exit code `1` stopt; bij succes is de exit code `0`. Het script doet geen deploy, geen `npm ci` en verbergt geen output. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 064 en secties “Local CI Check Script” geüpdatet naar v0.2 met `--report` gebruik, rapportinhoud en gedrag. Handmatig getest met `npm run atlas:check` (geen rapport) en `npm run atlas:check -- --report atlas-check-report.md` (rapport gegenereerd, daarna verwijderd; het bestand is geen permanente documentatie). Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run atlas:check` en `npm run atlas:check -- --report atlas-check-report.md` slagen beide.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Local CI Check Script v0.1
**Details:** Nieuw script `scripts/atlas-ci-check.mjs` aangemaakt en toegevoegd aan `package.json` als `"atlas:check": "node scripts/atlas-ci-check.mjs"`. Het script voert sequentieel alle Atlas kwaliteitschecks uit in de juiste volgorde: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build`. Per stap wordt `[RUN] <stapnaam>` getoond, gevolgd door `[PASS] <stapnaam>` bij succes of `[FAIL] <stapnaam>: <reden>` bij fout. Bij de eerste fout stopt het script direct met exit code `1`; bij succes eindigt het met `✅ All Atlas CI checks passed.` en exit code `0`. Het script doet geen deploy, geen `npm ci` en verbergt geen output van onderliggende commands. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 063 en nieuwe sectie “Local CI Check Script v0.1” met gebruik, stappen en gedrag. Handmatig getest via `npm run atlas:check`; alle zeven stappen slagen. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run atlas:check` slaagt in zijn geheel.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Knowledge Changelog Git Diff Auto Impact Mode v0.3
**Details:** `scripts/knowledge-changelog.mjs` uitgebreid met `--auto` flag voor de `--git-diff` modus. Voor gewijzigde Knowledge Objects genereert het script nu automatisch een impactrapport: modified objecten met zelfde id vergelijken `used_by` tussen basisversie en huidige versie; modified objecten met ander id roepen `rule-impact` aan; renamed objecten roepen `rule-impact` aan indien oude en nieuwe id beide in de huidige registry bestaan; added objecten tonen `used_by` uit het nieuwe object; deleted objecten tonen `used_by` uit de basisversie via `git show`. Object-id en `used_by` worden geprobeerd te lezen uit de YAML via eenvoudige regel-gebaseerde parsing; bij falen wordt teruggevallen op de bestandsnaam. De bestaande `--git-diff` tabelmodus (zonder `--auto`) en `--from`/`--to` modus blijven ongewijzigd. Handmatig getest in een tijdelijke git-repository met vier wijzigingen: modified (`nl.vat.standard` met toegevoegde consumer), added (`new.added.object`), deleted (`old.deleted.object`) en renamed (`tobe.renamed.object.yml → renamed.object.yml`). Daarnaast getest dat een modified object met id-wijziging automatisch `rule-impact` aanroept en risico/affected consumers toont. In de huidige projectmap (geen git repo) geeft het script correct een duidelijke foutmelding. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 062, sectie “Knowledge Changelog Git Diff Mode” geüpdatet naar v0.3 met `--auto` gedrag, object-id/`used_by` parsing, gebruik, limitaties en TODO. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Knowledge Changelog Git Diff Mode v0.2 (AMDR support)
**Details:** `scripts/knowledge-changelog.mjs` uitgebreid naar v0.2 zodat `--git-diff` alle git statuscodes herkent: A (added), M (modified), D (deleted) en R (renamed). Het script gebruikt nu `git diff --name-status --diff-filter=AMDR <base> -- docs/v2/knowledge/objects/`. Per gewijzigd object rapporteert het in Markdown: status, object-id (afgeleid uit `git show <base>:<path>` voor verwijderde bestanden, uit het huidige bestand voor toegevoegde/gewijzigde bestanden, of uit beide zijden voor hernoemde bestanden), pad, en voor renamed `old path → new path` plus `old id → new id`. Object-id wordt geprobeerd te lezen uit de YAML `id:` regel; bij falen wordt teruggevallen op de bestandsnaam. De bestaande `--from`/`--to` modus blijft ongewijzigd. Handmatig getest in een tijdelijke git-repository met alle vier statussen: modified (`nl.vat.standard`), added (`new.added.object`), deleted (`old.deleted.object`) en renamed (`tobe.renamed.object.yml → renamed.object.yml`). In de huidige projectmap (geen git repo) geeft het script correct een duidelijke foutmelding. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 061, sectie “Knowledge Changelog Git Diff Mode” geüpdatet naar v0.2 met AMDR details, gebruik, limitaties en TODO. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Knowledge Changelog Git Diff Mode v0.1
**Details:** `scripts/knowledge-changelog.mjs` uitgebreid naar v0.2 met een `--git-diff` modus. Nieuwe CLI-opties: `--git-diff` en optioneel `--base <ref>` (default `HEAD~1`). Het script voert `git diff --name-only --diff-filter=AM <base> -- docs/v2/knowledge/objects/` uit, detecteert gewijzigde Knowledge Object YAML-bestanden, toont hun id, en genereert een Markdown-sectie “Changed Knowledge Objects”. Voor v0.1 is automatische `from`/`to` vergelijking per gewijzigd object nog niet geïmplementeerd; dit wordt als TODO gerapporteerd in de output. Bestaande `--from`/`--to` modus blijft ongewijzigd. Geen nieuwe diff-logica: git diff gebruikt alleen naam-detectie; objectvergelijking blijft de verantwoordelijkheid van `rule-impact`. Handmatig getest in een tijdelijke git-repository: één gewijzigd object (`nl.vat.standard`) werd correct gedetecteerd, zowel naar stdout als via `--output git-diff-report.md`. In de huidige projectmap (geen git repo) geeft het script correct een duidelijke foutmelding. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 060, nieuwe sectie “Knowledge Changelog Git Diff Mode v0.1”, gebruik, limitaties en TODO. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Knowledge Changelog Generator v0.1
**Details:** Nieuw script `scripts/knowledge-changelog.mjs` aangemaakt dat een Markdown changelog genereert op basis van de JSON output van `rule-impact`. De generator roept `scripts/rule-impact.mjs` intern aan met `--json` en hergebruikt dus de bestaande diff-logica; er is geen nieuwe diff-implementatie. CLI: `npm run knowledge:changelog -- --from <object-id> --to <object-id> [--output <file.md>]`. Zonder `--output` wordt Markdown naar stdout geschreven; met `--output` wordt het naar een bestand geschreven. De Markdown bevat secties: From, To, Context, Data, Sources, Used by, Relationships en Impact (risk level + affected calculators). Exit code `0` bij succes, `1` bij ontbrekende argumenten of onbekende objecten. `package.json` uitgebreid met script `"knowledge:changelog": "node scripts/knowledge-changelog.mjs"`. Handmatig getest met: `nl.vat.standard` → `be.vat.standard` (stdout) en `--output docs/v2/knowledge/CHANGELOG.md` (bestand). Ook getest met onbekend object: correcte exit code `1`. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers en nieuwe secties over de changelog generator. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, runtime code, Rule Resolver, Knowledge Objects, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Impact Analysis Tool v0.3 (JSON Export)
**Details:** `scripts/rule-impact.mjs` uitgebreid naar v0.3 met machine-readable JSON export via de `--json` CLI-optie. In `--json` mode schrijft het script alleen JSON naar stdout, zonder human-readable tekst; bij succes is de exit code `0` en bij ontbrekende argumenten of onbekende objecten `1`. Bij errors wordt een JSON-object met `error` naar stderr geschreven. JSON output schema bevat: `from` en `to` objecten met `id`, `type`, `country`, `locale`, `version`, `effective_from` en `effective_until`; `differences` met `context` (array van `{field, from, to}`), `data` (array van `{path, from, to}`), `sources`, `used_by` en `relationships` (elk met `only_in_from`, `only_in_to` en `shared` arrays); en `impact` met `affected` (array) en `risk_level`. Zonder `--json` blijft de human-readable output exact gelijk. Handmatig getest met: `nl.vat.standard` → `be.vat.standard` (human en JSON), en `unknown.object` → `nl.vat.standard --json` (exit code 1). `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers en impact-tool secties vermelden JSON export. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, echte Knowledge Objects, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Impact Analysis Tool v0.2 (Relationships Diff)
**Details:** `scripts/rule-impact.mjs` uitgebreid naar v0.2 met een `relationships` diff. Het script vergelijkt nu naast `id`, `type`, `country`, `locale`, `version`, `effective_from`, `effective_until`, `data`, `sources` en `used_by` ook de `relationships` arrays van twee Knowledge Objects. Relaties worden vergeleken op `relation`, `target` en optionele `description`; strings worden direct vergeleken. Output toont counts, shared relaties, relaties alleen in `from` en relaties alleen in `to`. Risico-inschatting aangepast: **high** blijft als `type` of `data` verschilt; **medium** wordt toegekend als `country`, `locale`, `version`, `effective_from`, `effective_until`, `sources` of `relationships` verschilt terwijl `data` gelijk blijft; **low** als alleen `notes`/`tags` verschillen. De bestaande output structuur blijft compatibel. Handmatig getest met: `nl.vat.standard` → `be.vat.standard` (high risk, data en relationships verschillen), `nl.allowance.health` → `nl.allowance.health.2026` (high risk, data verschilt, shared relationship), en `nl.import.bpm.manual` → `nl.import.costs.2026` (high risk, data en relationships verschillen). Er zijn geen echte Knowledge Objects gewijzigd; geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, `.env` of dependencies. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers en impact-tool secties. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Impact Analysis Tool v0.1
**Details:** Nieuw script `scripts/rule-impact.mjs` aangemaakt voor lokale impact-analyse van Knowledge Object wijzigingen. Het script leest de YAML-bronnen uit `docs/v2/knowledge/objects/`, zoekt twee objecten op basis van `--from <object-id>` en `--to <object-id>` CLI-argumenten, en vergelijkt: `id`, `type`, `country`, `locale`, `version`, `effective_from`, `effective_until`, `data` (top-level velden), `sources` (op basis van URL) en `used_by`. Output bevat de context-verschillen, data-verschillen, bron-verschillen, gebruikers (`used_by`) en een impact summary met getroffen calculators/engines en een risiconiveau (`high` als `type` of `data` verschilt; `medium` als `country`/`locale`/`version`/`effective_from`/`effective_until`/`sources` verschilt; `low` als alleen `notes`/`tags` verschilt). Exit code `0` bij succes, `1` bij ontbrekende argumenten of niet-gevonden objecten. `package.json` uitgebreid met script `"rule:impact": "node scripts/rule-impact.mjs"`. Handmatig getest met: `nl.vat.standard` → `be.vat.standard` (high risk, BTW calculators affected), `nl.allowance.health` → `nl.allowance.health.2026` (high risk, toeslagen-calculator affected), en `unknown.object` → `nl.vat.standard` (exit code 1). `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers en nieuwe secties over de Rule Impact Analysis Tool. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, echte Knowledge Objects, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Multi-version Rule Selection Test Scenario
**Details:** Test-only scenario toegevoegd in `tests/rules/resolver.test.ts` die bewijst dat `resolveRule()` correct omgaat met meerdere actieve versies van hetzelfde object. Gebruikmakend van `resolveRuleFromRegistry()` en een custom in-memory registry zijn twee mock VAT objecten gedefinieerd: `nl.vat.standard.2025` (`version: "2025-01-01"`, `effective_from: "2025-01-01"`, `standard: 21`) en `nl.vat.standard.2026` (`version: "2026-01-01"`, `effective_from: "2026-01-01"`, `standard: 22`). De volgende zeven asserts zijn toegevoegd: zonder `version` en `year: 2026` selecteert de resolver de meest recente 2026-versie; met `version: "2025-01-01"` selecteert deze de 2025-versie; met `version: "2026-01-01"` selecteert deze de 2026-versie; onbekende `version` retourneert `undefined`; `year: 2025` zonder `version` selecteert de 2025-versie; `id` + `version` samen retourneren het correcte object; `id` met verkeerde `version` retourneert `undefined`. Tijdens deze sprint is de `id`-match in `src/lib/rules/resolver.ts` en `scripts/qa-rule-resolver.mjs` aangescherpt: wanneer een `id` wordt meegegeven en niet wordt gevonden, retourneert de resolver nu expliciet `undefined` in plaats van terug te vallen op het meest recente object. Dit maakt `id` echt leidend en voorkomt dat een verkeerde `version` of een ontbrekend id stilzwijgend een ander object selecteert. Er zijn geen echte Knowledge Objects toegevoegd of gewijzigd; productiegedrag blijft onveranderd voor alle bestaande callers waarbij `id` wel bestaat. `docs/v2/03-RULE-ENGINE.md` en `src/lib/rules/README.md` bijgewerkt: status headers, resolver beschrijving en nieuwe sectie "Multi-version selectie (test-only scenario)" die het scenario beschrijft. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — QA Rules Version Parameter Checks
**Details:** `scripts/qa-rule-resolver.mjs` uitgebreid naar v0.2 met expliciete version-parameter checks. Toegevoegde lookups: NL VAT met juiste `version` (`2026-01-01`) verwacht `nl.vat.standard`, NL VAT met onbekende `version` (`2025-01-01`) verwacht `missing`, en BE `fr-BE` fallback met `version` verwacht `be.vat.country_fallback`. Deze `missing` verwachtingen tellen niet als fout. De `resolveRule()` implementatie in het script ondersteunde `version` al sinds Sprint 053; nu wordt het ook in de QA-laag gecontroleerd. `docs/v2/03-RULE-ENGINE.md` bijgewerkt: status header en QA Script sectie vermelden de nieuwe version checks. `src/lib/rules/README.md` bijgewerkt: status header en QA Script sectie. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Resolver Version Parameter
**Details:** Optionele `version` parameter toegevoegd aan `RuleResolverInput` in `src/lib/rules/types.ts` en geïmplementeerd in `src/lib/rules/resolver.ts`. Gedrag: wanneer `version` is meegegeven, filtert `resolveRule()` en `resolveRuleFromRegistry()` alleen kennisobjecten waarvan `object.version === version`; zonder `version` blijft het bestaande gedrag ongewijzigd (meest recente actieve object binnen de effective date range). De `id`-filter blijft leidend indien meegegeven. Locale fallback blijft werken. De cache key in `buildRuleCacheKey` is uitgebreid met de versie, zodat lookups met verschillende `version` waarden apart worden gecached. `tests/rules/resolver.test.ts` uitgebreid met een `version parameter` describe block: zonder version blijft NL VAT lookup werken, met juiste version wordt het object gevonden, met onbekende version wordt `undefined` teruggegeven, cache onderscheidt dezelfde lookup met verschillende version, locale fallback met version werkt, en `id` + version samen werken correct. `docs/v2/03-RULE-ENGINE.md` en `src/lib/rules/README.md` bijgewerkt: status headers, resolver beschrijving, API voorbeeld met `version`, input velden, cache key beschrijving, en openstaande punten. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Explicit Fallback Warning Test
**Details:** Expliciete test toegevoegd in `tests/rules/resolver.test.ts` die bewijst dat `warnOnFallback`/`onFallback` werkt bij de `fr-BE` → `BE` country fallback. De test roept `resolveRule({ type: "vat_rate", country: "BE", locale: "fr-BE", year: 2026, warnOnFallback: true, onFallback: ... })` aan en controleert dat de callback precies één keer wordt aangeroepen met `requestedLocale === "fr-BE"`, `resolvedLocale === "BE"`, `resolvedId === "be.vat.country_fallback"` en overeenkomstige `requestedCountry`/`resolvedCountry`/`requestedType` velden. Ook een expliciete test toegevoegd voor een exacte `nl-BE` match: `resolveRule({ type: "vat_rate", country: "BE", locale: "nl-BE", year: 2026, warnOnFallback: true, onFallback: ... })` retourneert `be.vat.standard` en roept de callback niet aan. `scripts/qa-rule-resolver.mjs` uitgebreid met een live fallback-warning check die de callback metadata print en valideert; bij afwijking faalt het script. `docs/v2/03-RULE-ENGINE.md` bijgewerkt: runtime fallback warnings sectie vermeldt nu beide testcases en de QA Script sectie beschrijft de nieuwe warning check. `src/lib/rules/README.md` bijgewerkt: status header en runtime fallback warnings sectie vermelden de expliciete test. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Allowance Knowledge Object Naming Cleanup
**Details:** Duidelijk onderscheid gemaakt tussen algemene allowance-referentieobjecten (`nl.allowance.health`, `nl.allowance.rent`) en engine-parameter objecten (`nl.allowance.health.2026`, `nl.allowance.rent.2026`). IDs en datawaarden zijn ongewijzigd gebleven. Tags toegevoegd: `reference` en `general` aan `nl.allowance.health` en `nl.allowance.rent`; `engine_parameters` aan `nl.allowance.health.2026` en `nl.allowance.rent.2026`. Notes bijgewerkt zodat elk object expliciet verwijst naar het andere object. Conventie gedocumenteerd in `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` (nieuwe sectie "Algemene vs engine-parameter objecten") en `src/lib/knowledge/README.md`. Status headers bijgewerkt in `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md`. Geen wijzigingen aan engine-code, resolver-code, websitepagina's, calculatorpagina's, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Import Cost Constants naar Knowledge Layer
**Details:** Importkosten-standaardwaarden uit `src/lib/calculators/import-costs.ts` verplaatst naar de Atlas Knowledge Layer. Nieuw object: `docs/v2/knowledge/objects/nl.import.costs.2026.yml` (`type: import_cost`, `status: active`). Bevat standaardwaarden 0 voor `estimatedBpm`, `rdwCosts`, `transportCosts`, `exportCosts`, `inspectionCosts`, `plateCosts` en `otherCosts`. `src/lib/calculators/import-costs.ts` aangepast: `loadImportCosts2026()` laadt de standaardwaarden via `resolveRule({ type: "import_cost", id: "nl.import.costs.2026", ... })` met veilige fallback naar de oude hardcoded waarden (alle 0). De bpm blijft handmatige invoer; er is geen automatische BPM-berekening toegevoegd. Output van `calculateImportCosts()` blijft exact gelijk. `tests/calculators/import-costs.test.ts` uitgebreid met test die controleert dat `resolveRule()` het nieuwe object vindt en de juiste waarden bevat. `tests/calculators/engine-acceptance.test.ts` aangepast: import cost acceptatietest controleert nu dat `totalLookups > 0` en blijft eisen dat `notFoundLookups === 0` en `fallbackLocaleHits === 0`. `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` bijgewerkt: status header en data-voorbeeld voor `import_cost`. `src/lib/knowledge/README.md` bijgewerkt: status header en melding dat Import Cost Engine nu via Rule Resolver werkt. `docs/v2/03-RULE-ENGINE.md` en `src/lib/rules/README.md` status headers bijgewerkt. Geen wijzigingen aan websitepagina's, calculatorpagina's, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Allowance Constants naar Knowledge Layer
**Details:** Zorgtoeslag- en huurtoeslagparameters uit `src/lib/calculators/allowances.ts` verplaatst naar de Atlas Knowledge Layer. Nieuwe objecten: `docs/v2/knowledge/objects/nl.allowance.health.2026.yml` en `docs/v2/knowledge/objects/nl.allowance.rent.2026.yml` (beide `type: allowance_threshold`, `status: active`). `nl.allowance.health.2026` bevat `income_limit_single: 40857`, `income_limit_couple: 51142`, `base_benefit: 131`, `reduction_threshold_single: 23000`, `reduction_threshold_couple: 26000`, `reduction_rate: 0.15`. `nl.allowance.rent.2026` bevat `max_rent: 932.93`, `income_limit_single: 32500`, `income_limit_couple: 43500`, `base_benefit: 425`, `own_payment_threshold_single: 18000`, `own_payment_threshold_couple: 21000`, `own_payment_rate: 0.15`. `src/lib/calculators/allowances.ts` aangepast: `loadRentAllowance2026()` en `loadHealthAllowance2026()` laden parameters via `resolveRule({ type: "allowance_threshold", id: "nl.allowance.rent.2026" / "nl.allowance.health.2026", ... })` met veilige fallback naar de oude hardcoded waarden. Output van `calculateAllowances()` blijft exact gelijk. `tests/calculators/allowances.test.ts` uitgebreid met tests die controleren dat `resolveRule()` beide nieuwe objecten vindt en de juiste waarden bevatten. `tests/calculators/engine-acceptance.test.ts` aangepast: allowance acceptatietest controleert nu dat `totalLookups > 0` en blijft eisen dat `notFoundLookups === 0` en `fallbackLocaleHits === 0`. `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` bijgewerkt: status header en data-voorbeelden voor `allowance_threshold`. `src/lib/knowledge/README.md` bijgewerkt: status header en melding dat Allowance Engine nu via Rule Resolver werkt. `docs/v2/03-RULE-ENGINE.md` en `src/lib/rules/README.md` status headers bijgewerkt. Geen wijzigingen aan websitepagina's, calculatorpagina's, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Mortgage Constants naar Knowledge Layer
**Details:** Hypotheek-specifieke constanten uit `src/lib/calculators/mortgage.ts` verplaatst naar de Atlas Knowledge Layer. Nieuw object: `docs/v2/knowledge/objects/nl.mortgage.formula.2026.yml` (type `mortgage_formula`, id `nl.mortgage.formula.2026`) met `interest_deduction_rate: 0.3756`, `min_income_factor: 3.5`, `income_factor_base: 5.8` en `income_factor_rate_multiplier: 0.28`. `src/lib/calculators/mortgage.ts` aangepast: `loadMortgageFormula2026()` laadt parameters via `resolveRule({ type: "mortgage_formula", id: "nl.mortgage.formula.2026", ... })` met veilige fallback naar de oude hardcoded waarden. Output van `calculateMortgage()` blijft exact gelijk. `tests/calculators/mortgage.test.ts` uitgebreid met test die controleert dat `resolveRule()` het nieuwe object vindt en de juiste waarden bevat. `tests/calculators/engine-acceptance.test.ts` aangepast: mortgage acceptatietest controleert nu dat `totalLookups > 0` en blijft eisen dat `notFoundLookups === 0` en `fallbackLocaleHits === 0`. `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` bijgewerkt: status header en data-voorbeeld voor `mortgage_formula`. `src/lib/knowledge/README.md` bijgewerkt: status header en melding dat Mortgage Engine nu via Rule Resolver werkt. `docs/v2/03-RULE-ENGINE.md` en `src/lib/rules/README.md` status headers bijgewerkt. Geen wijzigingen aan websitepagina's, calculatorpagina's, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Engine Acceptance Tests uitbreiden (Mortgage, Allowances, Import Costs)
**Details:** Engine-acceptatietests in `tests/calculators/engine-acceptance.test.ts` uitgebreid van 3 naar 6 engines. Toegevoegd: Mortgage engine (`calculateMortgage` met `income: 60000`, `interestRate: 3.8`, `termYears: 30`, partner inkomen), Allowance engine (`calculateAllowances` met `income: 30000`, `isCouple: false`, `rent: 800`) en Import Cost engine (`calculateImportCosts` met standaard kosten en `nlPrice: 20000`). Voor elke test blijft gelden: reset resolver cache/diagnostics, dynamisch importeren engine, normale NL-berekening uitvoeren, en controleren dat `notFoundLookups === 0` en `fallbackLocaleHits === 0`. Mortgage, Allowance en Import Cost gebruiken nog geen Knowledge Layer-regels; zij tonen 0 lookups en veroorzaken geen notFound/fallback. `docs/v2/03-RULE-ENGINE.md` en `src/lib/rules/README.md` bijgewerkt: status header en Engine Acceptance sectie uitgebreid met de nieuwe engines. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Engine Acceptance Tests: No Unexpected Fallbacks
**Details:** Acceptatietests toegevoegd in `tests/calculators/engine-acceptance.test.ts` die verifiëren dat bestaande NL calculator-engines geen onverwachte locale fallback gebruiken en geen ontbrekende regels tegenkomen. Voor elke test wordt de resolver cache en diagnostics gereset, de engine dynamisch geïmporteerd (zodat regels tijdens de test worden geladen), en na een normale NL-berekening gecontroleerd dat `notFoundLookups` en `fallbackLocaleHits` beide 0 zijn. Getest: BTW engine (`calculateBtw`), Tax engine (`calculateNetIncomeEstimate2026`) en ZZP engine (`calculateZzpReverse`). `src/lib/rules/types.ts` uitgebreid met `entrepreneur_deduction` en `profit_exemption` in `RuleType`, zodat de ZZP-rule-typen consistent zijn met de Knowledge Layer. `docs/v2/03-RULE-ENGINE.md` en `src/lib/rules/README.md` bijgewerkt: status header en nieuwe sectie over engine acceptatietests. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines (behoudens type-uitbreiding), UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — QA Fallback Object + Fallback Warning Test
**Details:** Nieuw fallback Knowledge Object toegevoegd: `docs/v2/knowledge/objects/be.vat.country_fallback.yml` (id `be.vat.country_fallback`, type `vat_rate`, country `BE`, locale `BE`, status `active`). Bevat identieke tarieven als `be.vat.standard` (standard 21, reduced 12, reduced_low 6, zero 0, default_rate 21). Hierdoor valt `resolveRule({ type: "vat_rate", country: "BE", locale: "fr-BE", year: 2026 })` terug op het country-fallback object. `scripts/qa-rule-resolver.mjs` uitgebreid met een BE fr-BE fallback lookup die `be.vat.country_fallback` verwacht; `fallbackLocaleHits` in de QA output is nu 1. `tests/rules/resolver.test.ts`: bestaande test voor fr-BE aangepast zodat deze nu de fallback verwacht; nieuwe tests toegevoegd voor fr-BE -> BE fallback, `onFallback` callback met correcte info, en `fallbackLocaleHits` telling. `tests/knowledge/registry.test.ts`: objectenteller aangepast naar 17, tests toegevoegd voor het vinden van `be.vat.country_fallback`, vergelijking van tarieven met `be.vat.standard`, en opname in `vat_rate` resultaten. `docs/v2/03-RULE-ENGINE.md` en `src/lib/rules/README.md` bijgewerkt: status header en QA Script sectie. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Resolver Runtime Fallback Warnings v1
**Details:** Rule Resolver uitgebreid met optionele runtime fallback-waarschuwingen. `src/lib/rules/types.ts`: nieuw interface `RuleResolverFallbackInfo` (velden: requestedCountry, requestedLocale, resolvedCountry, resolvedLocale, requestedType, resolvedId) en `RuleResolverInput` uitgebreid met `warnOnFallback?: boolean` en `onFallback?: (info) => void`. `src/lib/rules/resolver.ts`: implementeert `maybeWarnOnFallback()` die de callback aanroept zowel bij cache misses als cache hits, maar alleen als `warnOnFallback: true` is gezet, `onFallback` is meegegeven, en het resultaat via een fallback locale is gevonden (`result.locale !== requestedLocale`). De callback ontvangt geen PII; de resolver gebruikt nooit `console.log`. `tests/rules/resolver.test.ts`: vijf nieuwe tests toegevoegd voor callback bij fallback, geen callback bij exacte match, correcte info, gedrag met caching, en diagnostics-correctheid. `docs/v2/03-RULE-ENGINE.md` bijgewerkt: sectie "Runtime fallback warnings v1" toegevoegd, fallback-strategie aangepast (optionele callback ipv altijd loggen), status header bijgewerkt. `src/lib/rules/README.md` bijgewerkt: sectie "Runtime fallback warnings", input velden en toekomstige features aangepast. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, knowledge objects, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Resolver QA Script v0.1
**Details:** Nieuw script `scripts/qa-rule-resolver.mjs` aangemaakt. Voert een vaste set veilige lookups uit tegen de YAML Knowledge Layer-bronnen (`docs/v2/knowledge/objects/`) en rapporteert pass/fail plus diagnostics (`totalLookups`, `cacheHits`, `cacheMisses`, `notFoundLookups`, `fallbackLocaleHits`). De lookups omvatten: NL/BE/FR/DE/ES VAT, NL Box 1, NL AHK, NL AK, en DE tax_bracket (verwacht `missing` omdat `de.tax.income.2026` draft is). Het script implementeert dezelfde selectielogica als de runtime resolver; rechtstreeks importeren van de TypeScript resolver in `.mjs` zonder extra tooling zoals `tsx` is niet gedaan om geen nieuwe dependency toe te voegen. `package.json` uitgebreid met script `"qa:rules": "node scripts/qa-rule-resolver.mjs"`. `docs/v2/03-RULE-ENGINE.md` bijgewerkt: QA Script sectie toegevoegd. `src/lib/rules/README.md` bijgewerkt: QA Script sectie. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, knowledge objects (YAML bron blijft ongewijzigd), `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Resolver Fallback Diagnostics v0.1
**Details:** Veilige diagnostieklaag toegevoegd rond `resolveRule()` in `src/lib/rules/resolver.ts`. Nieuwe exports: `getRuleResolverDiagnostics()` en `clearRuleResolverDiagnostics()`. Counters (geen PII): `totalLookups`, `cacheHits`, `cacheMisses`, `notFoundLookups`, `fallbackLocaleHits`. `resolveRule()` API ongewijzigd; `resolveRuleFromRegistry()` blijft zuiver en testbaar. Counters worden alleen bij `resolveRule()` bijgewerkt; er is geen `console.log` of externe logging. `fallbackLocaleHits` wordt geteld wanneer een resultaat wordt gevonden via een minder specifieke fallback locale dan de originele input. `src/lib/rules/types.ts` uitgebreid met `RuleResolverDiagnostics` interface. `tests/rules/resolver.test.ts` uitgebreid met `diagnostics` describe block: totalLookups, cacheHits/cacheMisses, notFoundLookups, clearRuleResolverDiagnostics, fallbackLocaleHits via tijdelijk fallback object. `docs/v2/03-RULE-ENGINE.md` bijgewerkt: status inclusief Fallback Diagnostics v0.1, resolver-beschrijving en nieuwe Diagnostics-sectie. `src/lib/rules/README.md` bijgewerkt: status, future-versions en Diagnostics-sectie. Geen wijzigingen aan websitepagina's, calculatorpagina's, calculator engines, UI, SEO-content, knowledge objects, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` (143 tests) en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Non-VAT Multi-country Proof: DE Income Tax Object
**Details:** Nieuw Knowledge Object `docs/v2/knowledge/objects/de.tax.income.2026.yml` aangemaakt (type `tax_bracket`, country `DE`, locale `de-DE`, status `draft`). Bevat een voorlopige placeholder-structuur voor Duitse inkomstenbelasting 2026 (`year: 2026`, `brackets: []`, `notes: Draft placeholder pending official review`). Authority: Bundesministerium der Finanzen (official). Source URL gemarkeerd met TODO voor officiële review. Status `draft` zodat `resolveRule()` dit object niet retourneert en productie-engines het niet gebruiken. `scripts/validate-knowledge.mjs` uitgebreid met `validateTaxBracketData()`: controleert of `data.year` een number is en `data.brackets` een array is; lege brackets zijn voor `draft` toegestaan (waarschuwing), maar voor `active` niet. Omdat `nl.tax.box1.2026.yml` nog geen `data.year` had, is deze toegevoegd (`year: 2026`) zodat de validator consistent blijft. `npm run generate:knowledge` gedraaid; registry bevat nu 16 objecten. `tests/rules/resolver.test.ts` uitgebreid: draft `tax_bracket` DE retourneert `undefined` via `resolveRule()`; `resolveRuleFromRegistry()` met status `active` retourneert het object. `tests/knowledge/registry.test.ts` uitgebreid: ≥16 objecten, `de.tax.income.2026` vindbaar, `tax_bracket` type bevat NL en DE. `docs/v2/knowledge/05-COUNTRIES.md` bijgewerkt: objectenlijst en land-specifieke types. `src/lib/knowledge/README.md` en `src/lib/rules/README.md` bijgewerkt: eerste non-VAT multi-country proof. `npm run validate:knowledge` slaagt met 0 fouten en 1 verwachte waarschuwing (lege brackets in draft object). `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:cdl`, `npm run test` (138 tests) en `npm run build` slagen allemaal. Geen wijzigingen aan websitepagina's, calculatorpagina's, UI, SEO-content, teksten, `.env` of dependencies.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Resolver Version Selection v0.1
**Details:** `src/lib/rules/resolver.ts` verfijnd zodat `resolveRule()` en `resolveRuleFromRegistry()` correct omgaan met meerdere versies van hetzelfde Knowledge Object. Selectieregels: alleen `status: active`, `effective_from` vóór/binnen het gevraagde jaar, `effective_until` null of na/binnen het gevraagde jaar, en bij meerdere matches wordt het object met de meest recente `effective_from` gekozen. De cache-key blijft gebaseerd op `type:country:locale:year:id`. Bestaande gedrag voor de huidige 15 objecten is intact; geen wijziging aan calculator engines of websitepagina's. `tests/rules/resolver.test.ts` uitgebreid met een `version selection` describe block: meest recente versie wint, actieve versie per jaar, expired objecten worden genegeerd, toekomstige objecten worden genegeerd voor eerder jaar, exact `id` filter werkt met meerdere versies, locale fallback blijft werken. `docs/v2/03-RULE-ENGINE.md` bijgewerkt: status inclusief Version Selection v0.1, resolver-beschrijving verduidelijkt, versioning als afgerond gemarkeerd. `src/lib/rules/README.md` bijgewerkt: status, future-versions en next steps. `src/lib/knowledge/README.md` bijgewerkt: versie-selectie als afgerond. Geen wijzigingen aan `src/lib/rules/types.ts`, knowledge objects, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` (134 tests) en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Multi-country Proof 3: DE + ES VAT Knowledge Objects
**Details:** Twee nieuwe VAT Knowledge Objects toegevoegd: `docs/v2/knowledge/objects/de.vat.standard.yml` (country `DE`, locale `de-DE`) en `docs/v2/knowledge/objects/es.vat.standard.yml` (country `ES`, locale `es-ES`). DE tarieven: standard 19%, reduced 7%, default_rate 19%. ES tarieven: standard 21%, reduced 10%, reduced_low 4%, zero 0%, default_rate 21%. Authorities: Bundeszentralamt für Steuern (DE) en Agencia Tributaria (ES), beide `official`. Source URLs voorzien van TODO voor volgende officiële review. `npm run generate:knowledge` gedraaid; registry bevat nu 15 objecten. `scripts/validate-knowledge.mjs` hoefde niet aangepast; decimalen en categorieën worden geaccepteerd. `tests/rules/resolver.test.ts` uitgebreid met DE- en ES-lookups; unknown-country test nu op `PT`. `tests/knowledge/registry.test.ts` uitgebreid: ≥15 objecten, DE/ES objecten vindbaar, `vat_rate` type bevat NL/BE/FR/DE/ES. `tests/knowledge/vat-rates.test.ts` uitgebreid met DE/ES tarief-checks. `docs/v2/knowledge/05-COUNTRIES.md` bijgewerkt: status Sprint 039, objectenlijst, DE/ES voorbeelden. `src/lib/knowledge/README.md` en `src/lib/rules/README.md` bijgewerkt: multi-country VAT proof compleet voor vijf landen. Geen wijzigingen aan websitepagina's, calculatorpagina's, UI, SEO-content, teksten, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` (128 tests) en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Multi-country Proof 2: BE VAT source-correctie + FR VAT Knowledge Object
**Details:** Belgische VAT source-URL gecorrigeerd in `docs/v2/knowledge/objects/be.vat.standard.yml`: `tariezen` → `tarieven` (`https://finances.belgium.be/nl/ondernemingen/btw/tarieven`). Nieuw Knowledge Object `docs/v2/knowledge/objects/fr.vat.standard.yml` aangemaakt (type `vat_rate`, country `FR`, locale `fr-FR`, status `active`). Bevat Franse BTW-tarieven: standard 20%, reduced 10%, reduced_low 5,5%, super_reduced 2,1%, zero 0%, default_rate 20%. Authority: Direction générale des Finances publiques (official). Source URL gemarkeerd met TODO voor volgende officiële review. `npm run generate:knowledge` gedraaid; registry bevat nu 13 objecten. `scripts/validate-knowledge.mjs` hoefde niet aangepast te worden: decimal values (5,5, 2,1) en `super_reduced` category worden al geaccepteerd. `tests/rules/resolver.test.ts` uitgebreid met FR VAT lookup. `tests/knowledge/registry.test.ts` uitgebreid: ≥13 objecten, FR VAT object vindbaar, `vat_rate` type bevat NL/BE/FR. `tests/knowledge/vat-rates.test.ts` uitgebreid met FR VAT lookup en tarief-checks. `docs/v2/knowledge/05-COUNTRIES.md` bijgewerkt: status Sprint 038, actuele objectenlijst, FR voorbeeld toegevoegd. `src/lib/knowledge/README.md` en `src/lib/rules/README.md` bijgewerkt: FR VAT als multi-country proof. Geen wijzigingen aan websitepagina's, calculatorpagina's, UI, SEO-content, teksten, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` (121 tests) en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Multi-country Proof: BE VAT Knowledge Object
**Details:** Eerste niet-Nederlandse Knowledge Object toegevoegd: `docs/v2/knowledge/objects/be.vat.standard.yml` (type `vat_rate`, country `BE`, locale `nl-BE`, status `active`). Bevat Belgische BTW-tarieven: standard 21%, reduced 12%, reduced_low 6%, zero 0%, default_rate 21%. Bron: FOD Financiën (official). `npm run generate:knowledge` gedraaid; `src/lib/knowledge/generated-objects.ts` bevat nu 12 objecten. `docs/v2/knowledge/05-COUNTRIES.md` bijgewerkt met actuele fallback-volgorde, juiste Belgische locales (`nl-BE`, `fr-BE`) en het voorbeeld van `be.vat.standard`. `src/lib/knowledge/README.md` en `src/lib/rules/README.md` bijgewerkt: BE VAT object vermeld als multi-country proof, locale fallback getest. `tests/rules/resolver.test.ts` uitgebreid: BE VAT lookup retourneert `be.vat.standard` met correcte tarieven/categorieën; `fr-BE` lookup retourneert `undefined` omdat er geen `fr-BE`-, taal- of land-level object is; unknown-country test nu op `DE`. `tests/knowledge/registry.test.ts` en `tests/knowledge/vat-rates.test.ts` uitgebreid: registry bevat minimaal 12 objecten, BE VAT object vindbaar, `vat_rate` type bevat zowel NL als BE. `scripts/validate-knowledge.mjs` hoefde niet aangepast te worden: de `category` voor `reduced_low` wordt al geaccepteerd als string. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` (117 tests) en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Import Cost Engine v0.1 + Auto Importkosten Calculator migratie
**Details:** Nieuwe module `src/lib/calculators/import-costs.ts` aangemaakt met pure functies voor importkosten-indicaties: `calculateImportCosts`. De bestaande optelsom uit `src/pages/auto-importkosten-berekenen.astro` (aankoopprijs + geschatte bpm + RDW/kenteken/keuring + transport + exportkenteken/verzekering + aankoopkeuring + kentekenplaten + overige kosten) is verplaatst naar de engine zonder inhoudelijke wijzigingen. Negatieve invoerwaarden worden veilig als 0 behandeld. De optionele vergelijking met een Nederlandse prijs blijft bestaan, inclusief het label "Voordeliger (indicatie)" of "Duurder (indicatie)". `src/pages/auto-importkosten-berekenen.astro` is gemigreerd: lokale `formatEuro` en inline berekening verwijderd; de pagina importeert nu `calculateImportCosts()` en `formatEuroHtml()` en vult de bestaande outputvelden (`resultTotal`, `detailPurchase`, `detailBpm`, `detailRdw`, `detailTransport`, `detailExport`, `detailInspection`, `detailPlates`, `detailOther`, `detailNlPrice`, `detailDifference`, `differenceLabel`). Alle HTML-id's, event handlers (inclusief voertuigtype-keuze), foutmeldingstructuur, vergelijkingslogica en styling zijn ongewijzigd. `docs/catalog/calculators.yml` bijgewerkt: `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/import-costs.ts`. Nieuwe testfile `tests/calculators/import-costs.test.ts` met 7 tests. Geen wijzigingen aan andere websitepagina's, UI, SEO-content, teksten, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---


**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Allowance Engine v0.1 + Toeslagen Calculator migratie
**Details:** Nieuwe module `src/lib/calculators/allowances.ts` aangemaakt met pure functies voor huurtoeslag- en zorgtoeslag-indicaties: `calculateRentBenefit`, `calculateZorgBenefit` en `calculateAllowances`. De bestaande formules uit `src/pages/toeslagen-calculator.astro` zijn verplaatst naar de engine zonder inhoudelijke wijzigingen. `src/pages/toeslagen-calculator.astro` is gemigreerd: lokale `formatEuro`, `calcRent` en `calcZorg` verwijderd; de pagina importeert nu `calculateAllowances()` en `formatEuroHtml()` en vult de bestaande outputvelden (`resultRentBenefit`, `resultZorgBenefit`). Alle HTML-id's, event handlers (inclusief huishouden-keuze en partnerinkomen toggle), foutmeldingstructuur, vermogen-waarschuwing en styling zijn ongewijzigd. `docs/catalog/calculators.yml` bijgewerkt: `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/allowances.ts`. Nieuwe testfile `tests/calculators/allowances.test.ts` met 14 tests. `src/lib/knowledge/README.md` en `src/lib/rules/README.md` bijgewerkt zodat `toeslagen-calculator.astro` als gemigreerd wordt gemarkeerd. Geen wijzigingen aan andere websitepagina’s, UI, SEO-content, teksten, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Mortgage Engine v0.1 + Hypotheek Calculator migratie
**Details:** Nieuwe module `src/lib/calculators/mortgage.ts` aangemaakt met pure functies voor hypotheekindicatieberekeningen: `calculateIncomeFactor`, `calculateMaxMortgage`, `calculateMonthlyPayment`, `calculateTotalInterest`, `calculateNetMonthlyPayment` en `calculateMortgage`. De bestaande formules uit `src/pages/hypotheek-calculator.astro` (inkomensfactor, annuïteitsformule, hypotheekrenteaftrek tegen 37,56%) zijn verplaatst naar de engine zonder inhoudelijke wijzigingen. `src/pages/hypotheek-calculator.astro` is gemigreerd: lokale `formatEuro` en inline berekeningen verwijderd; de pagina importeert nu `calculateMortgage()` en `formatEuroHtml()` en vult de bestaande outputvelden (`resultMaxMortgage`, `detailMaxMortgage`, `detailMonthly`, `detailNetMonthly`, `detailTotalInterest`). Alle HTML-id's, event handlers (inclusief partner toggle en looptijd-knoppen), foutmeldingstructuur en styling zijn ongewijzigd. `docs/catalog/calculators.yml` bijgewerkt: `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/mortgage.ts`. Nieuwe testfile `tests/calculators/mortgage.test.ts` met 13 tests. `src/lib/knowledge/README.md` en `src/lib/rules/README.md` bijgewerkt zodat `hypotheek-calculator.astro` als gemigreerd wordt gemarkeerd. Geen wijzigingen aan andere websitepagina’s, UI, SEO-content, teksten, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Formatter Cleanup voor gemigreerde calculatorpagina’s
**Details:** Lokale `formatEuro` functies verwijderd uit `src/pages/salaris-calculator.astro`, `src/pages/bruto-netto-2026.astro` en `src/pages/zzp-calculator.astro`. De pagina’s importeren nu `formatEuroHtml` uit `src/lib/format/currency.ts` en gebruiken deze voor `innerHTML` output. De BTW-pagina’s (`src/pages/btw-calculator.astro`, `src/pages/btw-terugrekenen.astro`, `src/pages/btw-inclusief-exclusief.astro`) gebruikten al de gedeelde `formatEuro` utility en zijn ongewijzigd. Nieuwe functie `formatEuroHtml` toegevoegd aan `src/lib/format/currency.ts` voor HTML-output met `&euro;` en `&nbsp;`, zodat de visuele output identiek blijft aan de oude lokale functies. Nieuwe testfile `tests/format/currency.test.ts` toegevoegd met 6 tests voor `formatNumber`, `formatEuro` en `formatEuroHtml`. Geen wijzigingen aan UI-styling, SEO-content, berekenlogica, HTML-id’s, DOM-wiring, andere pagina’s, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — ZZP Constants naar Knowledge Layer
**Details:** Drie nieuwe Knowledge Objects aangemaakt in `docs/v2/knowledge/objects/`: `nl.zzp.self_employed_deduction.2026.yml` (zelfstandigenaftrek €1.200), `nl.zzp.starter_deduction.2026.yml` (startersaftrek €2.123) en `nl.zzp.mkb_profit_exemption.2026.yml` (MKB-winstvrijstelling 12,70%). Nieuwe types `entrepreneur_deduction` en `profit_exemption` toegevoegd. `scripts/validate-knowledge.mjs` uitgebreid met validatie voor deze types, inclusief controle op `amount`/`rate` en `currency`; beide types toegevoegd aan de lijst waarvoor `authority.level: official` vereist is. `src/lib/knowledge/types.ts` uitgebreid met `EntrepreneurDeductionData`, `EntrepreneurDeductionKnowledgeObject`, `ProfitExemptionData` en `ProfitExemptionKnowledgeObject`. `src/lib/calculators/zzp.ts` aangepast: `calculateZzpDeductions()` haalt de ZZP-constanten nu via `resolveRule()` uit de Knowledge Layer, met veilige fallback op de hardcoded waarden. `npm run generate:knowledge` gedraaid om `src/lib/knowledge/generated-objects.ts` bij te werken. `tests/calculators/zzp.test.ts` uitgebreid met drie resolver-tests die aantonen dat de nieuwe objecten correct worden gevonden en de waarden 1200, 2123 en 0.127 bevatten. Totaal: 71 tests passed. `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` bijgewerkt met de nieuwe types, data-voorbeelden en validatieregels. `src/lib/knowledge/README.md` next steps bijgewerkt. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, UI, SEO-content, teksten, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — ZZP Calculator gemigreerd naar ZZP Engine
**Details:** `src/pages/zzp-calculator.astro` is gemigreerd naar de centrale ZZP Engine in `src/lib/calculators/zzp.ts`. De lokale `calcTax`, `calcAHK`, `calcAK` en iteratieve reverse-solver loop zijn verwijderd. De pagina importeert `calculateZzpReverse()` en roept deze aan met de bestaande inputwaarden (`desiredNet`, `billableDays`, `hoursPerDay`, `businessCosts`, `pensionSavings`, `zzpDeduction`, `starterDeduction`, `mkbDeduction`). Alle HTML-id's, event handlers, foutmeldingstructuur en resultaatvelden (`resultHourlyRate`, `detailRevenue`, `detailCost`, `detailPension`, `detailDeduction`, `detailNet`, `detailTax`) zijn ongewijzigd. De lokale `formatEuro` helper is behouden. `tests/calculators/zzp.test.ts` uitgebreid met regressietests voor 0 kosten, 0 pensioen, alle aftrekposten uit, en negatief netto inkomen. `docs/catalog/calculators.yml` bijgewerkt: `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/zzp.ts`. `src/lib/knowledge/README.md` en `src/lib/rules/README.md` bijgewerkt zodat `zzp-calculator.astro` als gemigreerd wordt gemarkeerd. Geen wijzigingen aan andere websitepagina’s, UI, SEO-content, teksten, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — ZZP Engine v0.1 + Tests
**Details:** Nieuwe module `src/lib/calculators/zzp.ts` aangemaakt als centrale ZZP Engine. Importeert `calculateBox1Tax2026`, `calculateGeneralTaxCredit2026` en `calculateLabourTaxCredit2026` uit `src/lib/calculators/tax.ts` en voegt ZZP-specifieke logica toe: `calculateZzpDeductions`, `calculateZzpTaxableIncome`, `calculateZzpTax`, `calculateZzpNetProfit`, `solveRequiredRevenue` en `calculateZzpReverse`. De reverse solver gebruikt een binaire zoektocht om van een gewenst netto maandinkomen naar het benodigde uurtarief en jaaromzet te rekenen. ZZP-constanten (zelfstandigenaftrek €1.200, startersaftrek €2.123, MKB-winstvrijstelling 12,70%) zijn hardcoded in `zzp.ts` met een TODO om ze later naar de Knowledge Layer te verplaatsen. Nieuwe testfile `tests/calculators/zzp.test.ts` met 12 tests, waaronder regressietests die de output binnen tolerantie vergelijken met de huidige inline logica in `src/pages/zzp-calculator.astro`. `docs/v2/zzp/reverse-solver-design.md` licht aangevuld met de implementatiestatus. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Legacy `getVatRates()` helper verwijderd
**Details:** `getVatRates()` is volledig verwijderd uit `src/lib/knowledge/objects.ts`. De helper was deprecated in Sprint 027 en had geen productie-consumer meer; `src/lib/calculators/btw.ts` haalt BTW-tarieven al via `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })`. `tests/knowledge/vat-rates.test.ts` is herschreven zodat het de Rule Resolver test in plaats van de legacy helper: het controleert dat `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })` het object `nl.vat.standard` retourneert, met `data.rates` standard 21, reduced 9, zero 0 en `data.default_rate` 21, en dat een onbekend land (`BE`) `undefined` geeft. `src/lib/knowledge/README.md` bijgewerkt: `getVatRates` verwijderd uit de helper-lijst, codevoorbeeld toont nu alleen `resolveRule()`, beperkingen en volgende stappen aangepast. `src/lib/rules/README.md` next step aangepast: `getVatRates` removal als afgerond. `docs/v2/03-RULE-ENGINE.md` openstaande punten bijgewerkt: `getVatRates` verwijdering als afgerond in Sprint 028. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env`, dependencies of rekenlogica. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Legacy `getVatRates()` helper deprecated
**Details:** `src/lib/knowledge/objects.ts` `getVatRates()` voorzien van JSDoc `@deprecated` met verwijzing naar `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })`. De functie blijft functioneel ongewijzigd en is alleen nog een legacy compatibility helper. `src/lib/knowledge/README.md` bijgewerkt: `getVatRates` nu gemarkeerd als deprecated; voorkeursvoorbeeld toont `resolveRule`. `docs/v2/03-RULE-ENGINE.md` openstaande punten bijgewerkt: `getVatRates` deprecation als afgerond. `tests/knowledge/vat-rates.test.ts` ongewijzigd; dekking blijft behouden zolang de helper bestaat. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env`, dependencies of de rekenlogica. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — BTW Engine via Rule Resolver
**Details:** `src/lib/calculators/btw.ts` is losgekoppeld van `getVatRates()` en haalt de actieve BTW-tarieven nu via `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })` uit `src/lib/rules/resolver.ts`. De tarieven (`standard`, `reduced`, `zero`) worden uit `data.rates` geëxtraheerd op basis van `category`. Bij een ontbrekende of ongeldige resolver-lookup valt de engine terug op `VAT_RATES` in `src/lib/utils/constants.ts`. Rekenoutput blijft identiek. `tests/calculators/btw.test.ts` uitgebreid met een test die controleert dat de resolver-tarieven door `isValidBtwRate` worden geaccepteerd. `src/lib/rules/README.md` bijgewerkt met een tabel van gekoppelde engines en volgende stappen. `src/lib/knowledge/README.md` bijgewerkt zodat de BTW-koppeling via de Rule Resolver wordt vermeld. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, UI of SEO-content. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Tax Engine via Rule Resolver
**Details:** `src/lib/calculators/tax.ts` is gekoppeld aan de Rule Resolver in plaats van rechtstreeks aan `src/lib/utils/constants.ts`. De 2026 Box 1-schijven worden opgehaald via `resolveRule({ type: "tax_bracket", country: "NL", locale: "nl-NL", year: 2026 })`, de algemene heffingskorting via `resolveRule({ type: "tax_credit", country: "NL", locale: "nl-NL", year: 2026, id: "nl.tax.ahk.2026" })` en de arbeidskorting via `resolveRule({ type: "tax_credit", country: "NL", locale: "nl-NL", year: 2026, id: "nl.tax.ak.2026" })`. De data wordt geëxtraheerd uit de Knowledge Object `data`-velden (`brackets`, `phase_out`, `cut_off`, `max`) en getransformeerd naar de interne shape die de rekenfuncties gebruiken. Bij een ontbrekende of ongeldige resolver-lookup valt de engine terug op `TAX_2026`, `AHK_2026` en `AK_2026` in `src/lib/utils/constants.ts`. Rekenoutput blijft identiek. `tests/calculators/tax.test.ts` uitgebreid met resolver-wiring tests die aantonen dat de juiste `tax_bracket` en `tax_credit` objecten worden gevonden. `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt zodat beide engines als gekoppeld worden vermeld. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, UI of SEO-content. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Bruto Netto 2026 gemigreerd naar Tax Engine
**Details:** `src/pages/bruto-netto-2026.astro` is gemigreerd naar de centrale Tax Engine in `src/lib/calculators/tax.ts`. De inline `berekenBelasting`, `berekenAHK` en `berekenAK` functies zijn verwijderd. De pagina importeert nu `calculateNetIncomeEstimate2026()` en roept deze aan met een adapter die het bestaande maandelijkse pensioenbedrag omrekent naar het percentage dat de Tax Engine verwacht (`pensionRate = (pensionMonthly / grossMonthly) * 100`). Alle HTML-id's, resultaatvelden, foutmeldingen en styling zijn ongewijzigd. Rekenoutput is numeriek identiek aan de oude inline berekening. `tests/calculators/tax.test.ts` uitgebreid met regressietests voor de twee voorbeeldberekeningen uit `bruto-netto-2026.astro` (€3000 + €150 pensioen en €4000 + €200 pensioen). `docs/catalog/calculators.yml` bijgewerkt: `engine_version: "1.0"`, `last_review: "2026-06-30"` en notes `Gemigreerd naar src/lib/calculators/tax.ts`. `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt zodat `bruto-netto-2026.astro` als gemigreerd wordt gemarkeerd. Geen wijzigingen aan andere websitepagina’s, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Salaris Calculator gemigreerd naar Tax Engine
**Details:** `src/pages/salaris-calculator.astro` is gemigreerd naar de centrale Tax Engine in `src/lib/calculators/tax.ts`. De inline `berekenBelasting`, `berekenAHK` en `berekenAK` functies zijn verwijderd. De pagina gebruikt nu `calculateNetIncomeEstimate2026()` en gebruikt het pensioenpercentage direct als `pensionRate` (geen adapter nodig omdat de pagina al een percentage-veld heeft). Alle HTML-id's, resultaatvelden, foutmeldingen, radio/toggle/event handlers en styling zijn ongewijzigd. Rekenoutput is numeriek identiek aan de oude inline berekening. `tests/calculators/tax.test.ts` uitgebreid met een regressietest voor het salaris-calculator voorbeeld met 0% pensioen. `docs/catalog/calculators.yml` bijgewerkt: `engine_version: "1.0"`, `last_review: "2026-06-30"` en notes `Gemigreerd naar src/lib/calculators/tax.ts`. `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt zodat `salaris-calculator.astro` als gemigreerd wordt gemarkeerd. Geen wijzigingen aan andere websitepagina’s, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Tax Engine Input Cleanup: pensionAmount
**Details:** `src/lib/calculators/tax.ts` is uitgebreid zodat `TaxIncomeInput` zowel `pensionRate` als `pensionAmount` ondersteunt. `pensionAmount` is een optioneel maandelijks pensioenbedrag in EUR en heeft voorrang op `pensionRate` als beide zijn meegegeven. Negatieve `pensionAmount` wordt veilig behandeld als 0. De berekende `pensionAmount` in `TaxBreakdown` blijft het jaarbedrag. `src/pages/bruto-netto-2026.astro` is bijgewerkt: de lokale adapter die het maandelijkse pensioenbedrag omrekende naar een percentage (`pensionRate = (pensionMonthly / grossMonthly) * 100`) is verwijderd. De pagina geeft nu `pensionAmount` direct door aan `calculateNetIncomeEstimate2026()`. `salaris-calculator.astro` blijft ongewijzigd en gebruikt nog steeds `pensionRate`. `tests/calculators/tax.test.ts` uitgebreid met tests voor: equivalentie tussen `pensionRate` 5% en `pensionAmount` €200 bij €4.000 bruto; prioriteit van `pensionAmount` over `pensionRate`; bruto-netto-2026 voorbeeld 2 via `pensionAmount`; negatieve `pensionAmount` wordt 0. Geen wijzigingen aan UI, SEO-content, andere pagina’s, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Rule Resolver Caching v0.1
**Details:** `src/lib/rules/resolver.ts` is uitgebreid met een eenvoudige in-memory cache voor `resolveRule()`. De cache-sleutel is gebaseerd op `type`, `country`, `locale`, `year` en optioneel `id`. Zowel gevonden Knowledge Objects als `undefined` worden gecached, zodat herhaalde lookups de hele registry niet opnieuw hoeven door te lopen. De publieke API van `resolveRule()` is ongewijzigd; `resolveRuleFromRegistry()` blijft ongecached en testbaar. Nieuwe export `clearRuleResolverCache()` toegevoegd voor tests en eventuele runtime resets. `tests/rules/resolver.test.ts` uitgebreid met cache-specifieke tests: herhaalde identieke lookups retourneren hetzelfde object, onbekende lookups blijven `undefined`, en `clearRuleResolverCache()` reset de cache. `src/lib/rules/README.md` bijgewerkt met een Caching-sectie. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env` of dependencies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-29

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Atlas Rule Resolver v1
**Details:** Nieuwe module `src/lib/rules/` aangemaakt met `resolver.ts`, `types.ts` en `README.md`. Implementeert `resolveRule(input)` die actieve Knowledge Objects selecteert op basis van `type`, `country`, `locale`, `year` en optioneel `id`. Controleert `status`, `effective_from` en `effective_until`. Nieuwe testfile `tests/rules/resolver.test.ts` met 6 tests. `docs/v2/03-RULE-ENGINE.md` bijgewerkt met de runtime resolver. `src/lib/calculators/btw.ts` en `src/lib/calculators/tax.ts` zijn nog niet gekoppeld; dat is voorbehouden aan Sprint 020. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Documentatie/Research
**Wijziging:** Atlas v2 — Official Tax Source Alignment 2026
**Details:** `AGENTS.md` gecorrigeerd zodat de 2026-belastingwaarden overeenkomen met de officiële Belastingdienst-waarden: Box 1 nu 35,75% / 37,56% / 49,50% (was 35,82% / 37,48% / 49,50%), algemene heffingskorting max €3.115 (was €3.068), arbeidskorting max €5.685 (was €5.599). Ook AHK- en AK-schijven/brackets zijn toegevoegd. Bronvermelding toegevoegd: Belastingdienst — voorlopige aanslag 2026, algemene heffingskorting 2026, arbeidskorting 2026. `docs/v2/tax/2026-reconciliation-audit.md` bijgewerkt met een correction log en conclusie dat code, constants, YAML en `AGENTS.md` nu met elkaar in lijn zijn. Geen wijzigingen aan websitepagina’s, calculatorlogica, `constants.ts` of Knowledge YAML. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Tax Engine v0.1 + Tests
**Details:** Nieuwe module `src/lib/calculators/tax.ts` toegevoegd met pure functions voor Nederlandse 2026 inkomstenbelasting en heffingskortingen: `calculateBox1Tax2026`, `calculateGeneralTaxCredit2026`, `calculateLabourTaxCredit2026` en `calculateNetIncomeEstimate2026`. Types toegevoegd: `TaxIncomeInput`, `TaxIncomeResult`, `TaxBreakdown`. Waarden komen uit `src/lib/utils/constants.ts` en stemmen overeen met de bestaande `salaris-calculator.astro` inline script. Nieuwe testfile `tests/calculators/tax.test.ts` met 13 tests. `src/lib/knowledge/README.md` bijgewerkt. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal; 26 tests passed.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Tooling/Architectuur
**Wijziging:** Atlas v2 — Permanent Test Runner + BTW/Knowledge Tests
**Details:** Vitest toegevoegd als devDependency (`npm install --save-dev vitest`). `package.json` scripts uitgebreid met `"test": "vitest run"` en `"test:watch": "vitest"`. Teststructuur aangemaakt in `tests/` met `tests/calculators/btw.test.ts` (7 tests voor tarief-validatie en berekeningen), `tests/knowledge/vat-rates.test.ts` (2 tests voor `getVatRates`) en `tests/knowledge/registry.test.ts` (4 tests voor registry-inhoud). `npm run test` slaagt met 13 tests. `src/lib/knowledge/README.md` bijgewerkt met test-instructies. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Robuustere VAT Lookup op basis van category
**Details:** `src/lib/knowledge/types.ts` uitgebreid met `VatRateCategory = "standard" | "reduced" | "zero"` en `VatRateData.rates` vereist nu `category`. `src/lib/knowledge/objects.ts` `getVatRates()` selecteert tarieven op basis van `rate.category` in plaats van hardcoded `value`s (21, 9, 0). Output blijft identiek: `{ standard: 21, reduced: 9, zero: 0, defaultRate: 21 }`. Bij een ontbrekende category retourneert `getVatRates()` `undefined`; de BTW-engine in `src/lib/calculators/btw.ts` valt dan terug op `VAT_RATES`. `src/lib/knowledge/README.md` en `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` bijgewerkt. `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl` en `npm run build` slagen allemaal met 0 fouten en 0 warnings.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Tooling/Architectuur
**Wijziging:** Atlas v2 — Knowledge Schema Cleanup: VAT Rates
**Details:** De terugkerende warning in `scripts/validate-knowledge.mjs` voor `vat_rate` is opgelost. Validator verwacht nu voor `type: vat_rate` dat `data.rates` een niet-lege array is, elke rate een `label`, `value` (number) en `category` (string) heeft, en `data.default_rate` bestaat als number én overeenkomt met een `value` in `data.rates`. De oude check op `data.value` is vervangen. `docs/v2/knowledge/objects/nl.vat.standard.yml` is aangevuld met `category` (`standard`, `reduced`, `zero`) voor elke rate. `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` is bijgewerkt met het `vat_rate` data-schema en uitleg waarom meerdere rates per land worden gemodelleerd. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl` en `npm run build` slagen allemaal met 0 fouten en 0 waarschuwingen.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Tooling/Architectuur
**Wijziging:** Atlas v2 — Knowledge Sync in Build
**Details:** `package.json` build-script aangepast van `"build": "astro build"` naar `"build": "npm run check:knowledge && astro build"`. Hierdoor faalt `npm run build` automatisch als `src/lib/knowledge/generated-objects.ts` niet synchroon is met `docs/v2/knowledge/objects/*.yml`. Generatie blijft expliciet: `npm run generate:knowledge` moet handmatig worden gedraaid na wijzigingen in YAML. `check:knowledge` genereert niet en schrijft niet naar schijf. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl` en `npm run build` slagen allemaal; getest met een tijdelijke out-of-sync situatie waarbij `npm run build` correct faalde met exit code 1.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Tooling/Architectuur
**Wijziging:** Atlas v2 — Knowledge Registry Sync Check v0.1
**Details:** `scripts/check-knowledge-registry.mjs` aangemaakt. Deze check importeert de gedeelde functies uit `scripts/generate-knowledge-registry.mjs`, genereert de registry in het geheugen, en vergelijkt deze byte-voor-byte met de bestaande `src/lib/knowledge/generated-objects.ts`. Bij verschil toont het een duidelijke foutmelding en de instructie `npm run generate:knowledge`; bij succes meldt het dat de registry up-to-date is. `scripts/generate-knowledge-registry.mjs` is intern gerefactored zodat `readKnowledgeObjects()` en `generateRegistry()` herbruikbaar zijn, zonder dat `generate:knowledge` bij import wordt uitgevoerd. `package.json` bijgewerkt met `"check:knowledge": "node scripts/check-knowledge-registry.mjs"`. Generatie blijft expliciet; er is nog geen prebuild. `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Tooling/Architectuur
**Wijziging:** Atlas v2 — Knowledge Objects Generator v0.1
**Details:** `scripts/generate-knowledge-registry.mjs` aangemaakt. Leest alle `.yml` bestanden uit `docs/v2/knowledge/objects/`, parseert ze met `js-yaml`, sorteert ze stabiel op `id`, en genereert `src/lib/knowledge/generated-objects.ts` als auto-generated module met `export const generatedKnowledgeObjects = [...] satisfies KnowledgeObject[]`. `src/lib/knowledge/objects.ts` is herschreven tot een dunne wrapper die `generatedKnowledgeObjects` importeert en de bestaande API (`knowledgeObjects`, `getKnowledgeObject`, `getKnowledgeObjectsByType`, `getVatRates`) intact houdt. Script toegevoegd aan `package.json`: `"generate:knowledge": "node scripts/generate-knowledge-registry.mjs"`. Generatie is expliciet; `validate:knowledge` genereert niet automatisch en er is geen prebuild. `npm run generate:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** BTW-engine gekoppeld aan Atlas v2 Knowledge Layer
**Details:** `src/lib/calculators/btw.ts` gebruikt nu `getVatRates("NL", "nl-NL")` uit `src/lib/knowledge/objects.ts` in plaats van hardcoded `VAT_RATES`. `isValidBtwRate` en `validateBtwInput` gebruiken de tarieven uit de Knowledge Layer; bij een ontbrekende of ongeldige lookup valt de engine terug op `VAT_RATES` in `src/lib/utils/constants.ts`. Rekenlogica (`calculateBtw`, `calculateBtwFromExclusive`, `calculateBtwFromInclusive`) is ongewijzigd; output is identiek aan vóór deze sprint. `src/lib/knowledge/objects.ts` gebruikt nu `import type` voor type-only imports, zodat Vite geen waarschuwing meer geeft. `src/lib/knowledge/README.md` bijgewerkt. `npm run validate:knowledge`, `npm run validate:cdl` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Architectuur/Documentatie
**Wijziging:** Atlas v2 Calculator Definition Language (CDL) v0.1 — concrete definities voor alle 9 calculators
**Details:** In `docs/v2/definitions/` zijn YAML-definities toegevoegd voor alle 9 calculators: `btw-calculator`, `btw-terugrekenen`, `btw-inclusief-exclusief`, `salaris-calculator`, `bruto-netto-2026`, `hypotheek-calculator`, `zzp-calculator`, `toeslagen-calculator` en `auto-importkosten-berekenen`. Elke definitie beschrijft inputs, outputs, regels, journeys, SEO, bronnen, disclaimers en privacy op basis van de bestaande pagina's en `docs/catalog/calculators.yml`. Definities zijn gevalideerd als geldige YAML. CDL is documentatie-only; er is nog geen generator.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Tooling/Architectuur
**Wijziging:** CDL Validator v0.1 toegevoegd
**Details:** `scripts/validate-cdl.mjs` aangemaakt. Leest alle `.yml` bestanden in `docs/v2/definitions/` (slaat README en schema over) en controleert verplichte velden, id/slug, route, locale/country, inputs/outputs, sources, privacy, maintenance, en engine-referentie afhankelijk van migratie-status. Toegevoegd aan `package.json` als `npm run validate:cdl`. Validator slaagt voor alle 9 definities. js-yaml is niet aan `package.json` toegevoegd; het is op dit moment beschikbaar als transitieve dependency.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Tooling/Architectuur
**Wijziging:** CDL Schema v0.2 + Validator v0.2 + dependency fix
**Details:** `js-yaml` expliciet toegevoegd als `devDependency` (`npm install --save-dev js-yaml`). Schema-documentatie `docs/v2/definitions/calculator-definition.schema.md` bijgewerkt naar v0.2 met formele specificaties voor alle top-level velden, inputs, outputs, privacy levels, sources en maintenance. Validator `scripts/validate-cdl.mjs` uitgebreid naar v0.2: controleert `priority` (A/B/C), `status`, `category`, `title`, `description`, input/output types, privacy levels, `maintenance.update_frequency`, `maintenance.source_review_required`, `seo.title/description` en `sources.label/url`. Alle 9 YAML-definities in `docs/v2/definitions/` zijn geautomatiseerd aangepast naar het v0.2 schema (input/output `name` i.p.v. `id`, semantische types, `privacy_level`, bronnen `label`, `maintenance.source_review_required`, priority A/B/C).
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Architectuur/Documentatie
**Wijziging:** Atlas Knowledge Layer v1
**Details:** Nieuwe map `docs/v2/knowledge/` aangemaakt met 9 documentatiebestanden: `README.md`, `00-KNOWLEDGE-ARCHITECTURE.md`, `01-KNOWLEDGE-OBJECTS.md`, `02-VERSIONING.md`, `03-OFFICIAL-SOURCES.md`, `04-RELATIONSHIPS.md`, `05-COUNTRIES.md`, `06-AUTHORITY-SYSTEM.md`, `07-KNOWLEDGE-LIFECYCLE.md` en `08-AI-USAGE.md`. Daarnaast 8 concrete kennisobjecten in `docs/v2/knowledge/objects/`: `nl.vat.standard.yml`, `nl.tax.box1.2026.yml`, `nl.tax.ahk.2026.yml`, `nl.tax.ak.2026.yml`, `nl.mortgage.annuity.yml`, `nl.allowance.health.yml`, `nl.allowance.rent.yml` en `nl.import.bpm.manual.yml`. Deze objecten bevatten alleen feiten (tarieven, schijven, drempels, formulebeschrijvingen), geen HTML, Astro, JavaScript of berekeningen. Kennisobjecten verwijzen via `used_by` en `relationships` naar bestaande calculators. `npm run validate:cdl` en `npm run build` blijven succesvol.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Tooling/Architectuur
**Wijziging:** Knowledge Layer Validator v0.1
**Details:** `scripts/validate-knowledge.mjs` aangemaakt en toegevoegd aan `package.json` als `npm run validate:knowledge`. Validator controleert verplichte velden, id matching met bestandsnaam, landnamespace, status, ISO-datum velden, authority structuur, sources, relationships, used_by, tags en notes. Daarnaast waarschuwt de validator voor `used_by` verwijzingen naar onbekende calculators, ontbrekende `data.value` bij `vat_rate`, en niet-officiële authority levels bij belasting/toeslagen/BPM-objecten. Kennisobjecten `docs/v2/knowledge/objects/*.yml` aangepast: `authority.source` omgenoemd naar `authority.name` om aan de validator te voldoen. `npm run validate:knowledge` slaagt met 1 waarschuwing (ontbrekende `data.value` in `nl.vat.standard`). `npm run validate:cdl` en `npm run build` blijven succesvol.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Technisch/Architectuur
**Wijziging:** Rule Resolver Prototype v0.1 — Knowledge Layer runtime
**Details:** Nieuwe map `src/lib/knowledge/` aangemaakt met `types.ts` (TypeScript interfaces: `AuthorityLevel`, `KnowledgeStatus`, `KnowledgeSource`, `KnowledgeAuthority`, `KnowledgeObject`, `VatRateKnowledgeObject`), `objects.ts` (in-memory registry met 8 Knowledge Objects, `getKnowledgeObject`, `getKnowledgeObjectsByType`, `getVatRates`) en `README.md`. `objects.ts` is een statische spiegel van de YAML-objecten in `docs/v2/knowledge/objects/`, gegenereerd via een tijdelijk script, zodat de browserbundle geen YAML-parser of file-system reads nodig heeft. `getVatRates("NL", "nl-NL")` retourneert de standaard NL BTW-tarieven (21/9/0) inclusief bronlabel. Bestaande calculators en `src/lib/calculators/btw.ts` zijn nog niet gekoppeld. Tags in kennisobjecten zijn gestringified naar tekst om TypeScript-compatibiliteit te waarborgen. `npm run validate:knowledge`, `npm run validate:cdl` en `npm run build` slagen allemaal.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

**Type:** Architectuur/Documentatie
**Wijziging:** Rule Engine Specification v0.1 + CDL Validator v0.3
**Details:** `docs/v2/03-RULE-ENGINE.md` herschreven met de v0.1 specificatie: doel, scheiding van Calculation Engine vs Rule Engine, land/locale scheiding, multi-country architectuur (NL/BE/DE/ES/FR), bronkoppeling, rule versions, hardcoded-regel verbod, en aansluiting op calculator_module/engine_reference. `docs/v2/definitions/calculator-definition.schema.md` uitgebreid met gestandaardiseerde `rules` structuur: verplichte velden `id`, `type`, `locale`, `country`, `version`, `applies_to`, `source`, `status`; toegestane rule types; authority levels. `scripts/validate-cdl.mjs` uitgebreid naar v0.3 en controleert nu ook `rules` array, rule types, rule status, `source.label/url/authority_level`, `applies_to` tegen bestaande inputs/outputs, en locale/country match. Alle 9 YAML-definities geautomatiseerd geconverteerd naar de v0.1 rule structuur: BTW → `vat_rate`, salaris/bruto-netto/zzp → `tax_bracket`/`tax_credit`, hypotheek → `mortgage_formula`/`annuity_formula`, toeslagen → `allowance_threshold`/`informational`, auto import → `import_cost`/`manual_input`/`informational`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-27

**Type:** UX/Technisch
**Wijziging:** Moderne calculator-UI en geldveld-prefix live gezet
**Details:** Global CSS-import in BaseLayout gecorrigeerd met is:global, waardoor de moderne calculator-UI wordt toegepast op alle calculatorpagina's. Geldveld-prefixes gecorrigeerd zodat het euroteken niet overlapt met bedragen (€-prefix en %-suffix krijgen voldoende padding binnen .calc-modern). Bpm-hint op auto-importkostenpagina voorzien van officiële Belastingdienst-link (target=_blank, rel=noopener). Rekenlogica ongewijzigd.
**Status:** Live

---

## 2026-06-26

**Type:** UX
**Wijziging:** Calculator UI-pilot live gezet
**Details:** BTW Calculator en Auto importkosten calculator visueel gemoderniseerd met moderne formulierkaart, ruimere invoervelden, duidelijke primaire knop, resultaatkaart, indicatie-melding en foutafhandeling. Rekenlogica ongewijzigd.
**Status:** Live

---

**Type:** UX/Technisch
**Wijziging:** Cross-sell en bronnenblokken structureel gemoderniseerd
**Details:** Herbruikbare componenten CrossSellCards en SourceCards toegevoegd. Oude emoji-linkrijen en blauwe standaardlinks vervangen door moderne cards op calculator- en SEO-pagina's. Bronnenblok op auto-importkostenpagina gemoderniseerd.
**Status:** Live

---

**Type:** UX/SEO
**Wijziging:** Homepage-redesign en interne calculatorlinks live gezet
**Details:** Homepage vernieuwd met full-width hero, moderne CTA-buttons, calculatorvisual, populaire calculatorcards, categorieën, trust-items en cross-links op calculatorpagina's. Node-versie vastgezet met .nvmrc en package.json engines.
**Status:** Live

---

**Type:** Bugfix
**Wijziging:** Mobiele button-overflow opgelost
**Details:** Hero-buttons op mobiel vielen buiten het scherm door ontbrekend box-sizing:border-box. Gefixt met expliciete box-sizing, max-width:100% en overflow:hidden op mobiele breakpoint.
**Status:** Live

---

**Type:** SEO
**Wijziging:** Nieuwe pagina btw terugrekenen toegevoegd
**Details:** SEO-landingspagina toegevoegd met mini-calculator, formule, voorbeelden, FAQ, officiële Belastingdienst-bronnen en interne links naar BTW Calculator en gerelateerde calculators.
**Status:** Live

---

**Type:** SEO
**Wijziging:** Nieuwe pagina btw inclusief en exclusief berekenen toegevoegd
**Details:** SEO-landingspagina toegevoegd met mini-calculator voor beide richtingen, formules, voorbeelden, FAQ, officiële Belastingdienst-bronnen en interne links naar de BTW-cluster.
**Status:** Live

---

**Type:** Bugfix / UX
**Wijziging:** Trailing slashes consistent toegevoegd aan interne links
**Details:** Alle cross-sell cards, popular cards en cat-chip links in index.astro en calculatorpagina's gebruiken nu consistent trailing slashes (/btw-calculator/ i.p.v. /btw-calculator).
**Status:** Live

---

**Type:** SEO
**Wijziging:** Nieuwe pagina bruto netto 2026 toegevoegd
**Details:** SEO-landingspagina toegevoegd met bruto-netto mini-calculator, uitleg over loonheffing, heffingskortingen, pensioenpremie, voorbeelden, FAQ, officiële Belastingdienst-bronnen en interne links naar de salariscluster.
**Status:** Live

---

**Type:** Technisch/SEO
**Wijziging:** Routeherstel uitgevoerd
**Details:** Herstelde routes uit src/pages/_bak/ teruggezet naar src/pages/, zodat hypotheek, zzp, privacy, cookies, disclaimer, over-ons en contact weer meebouwen. Interne links en trailing slashes in nav, footer, homepage en cross-sell cards gecontroleerd en gefixt.
**Status:** Live

---

**Type:** SEO
**Wijziging:** Nieuwe pagina auto importkosten berekenen toegevoegd
**Details:** SEO-landingspagina toegevoegd met handmatige importkosten-calculator, uitleg over bpm, RDW-kosten, transport, btw, campers, voorbeeldberekening, FAQ, officiële bronnen (RDW, Belastingdienst, Rijksoverheid) en interne links.
**Status:** Live

---

**Type:** SEO/Research
**Wijziging:** Nieuwe cluster Auto import / BPM voorbereid
**Details:** Officiële bronnen en keyword backlog voorbereid voor toekomstige pagina /auto-importkosten-berekenen/. Fase 1 wordt een handmatige importkosten-calculator met bpm als invulveld en duidelijke indicatie/disclaimer.
**Status:** Gepland
