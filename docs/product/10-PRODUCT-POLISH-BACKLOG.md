# 10 — Product Polish Backlog

> **Doel:** Prioriteren van alle verbeterpunten voor `bruto-netto-2026.astro` zodat de pagina de beste Nederlandse bruto-netto calculator wordt.  
> **Laatst bijgewerkt:** 2026-07-03  
> **Scope:** UX, conversie, vertrouwen, SEO, AdSense. Geen engine wijzigingen, geen nieuwe calculator, geen Knowledge Layer, geen deploy. Vanaf Sprint 095 is dit document onderdeel van het grotere Product Completion raamwerk dat wordt vastgelegd in `docs/product/00-FISCALMESH-PRODUCT-ROADMAP.md`.

---

## Update: Sprint 100 — Analytics Ready Foundation (afgerond)

Sprint 100 legt de markup-basis voor toekomstige analytics. Er worden nog geen tracking scripts, cookies, event listeners of externe providers toegevoegd; alleen gestandaardiseerde `data-analytics-*` attributen op interactieve elementen, zodat elke toekomstige analytics-integratie één uniforme selector-conventie kan gebruiken.

Wijzigingen:

- **Nieuwe documentatie**: `docs/product/12-ANALYTICS-READY-FOUNDATION.md` definieert de conventie: `data-analytics="<type>"`, `data-analytics-category="<context>"`, `data-analytics-action="<actie>"`, `data-analytics-label="<id>"`. Bevat de volledige element inventory en implementatie regels.
- **Gedeelde componenten**: attributen toegevoegd aan `src/layouts/BaseLayout.astro` (header/footer links), `src/components/Breadcrumbs.astro`, `src/components/category/CategoryGrid.astro` (met `analyticsCategory` prop), `src/components/category/RelatedCategories.astro` (met `analyticsCategory` prop), `src/components/CrossSellCards.astro` (met `analyticsCategory` prop), `src/components/calculator/FinancialJourney.astro`, `src/components/calculator/ToolFooter.astro` en `src/components/calculator/UseCasesPanel.astro`.
- **Homepage (`src/pages/index.astro`)**: attributen op zoekveld, cluster-chips, calculator cards, quick-start keuze-pillen, categorie links en cross-sell cards.
- **Categoriepagina’s**: `CategoryGrid` en `RelatedCategories` krijgen per pagina een specifieke `analyticsCategory` (`inkomen-page`, `belasting-page`, `wonen-page`, `ondernemen-page`, `auto-page`) zodat klikken herleidbaar zijn naar de broncategorie.
- **10 calculatorpagina’s**: attributen toegevoegd op CTA-knoppen, quick-chips, kopieer-link knoppen, radio-button groepen (tarief, richting, looptijd, voertuigtype, huishouden), toggles (ZZP aftrekposten) en select velden (aankoopland). Gewijzigde pagina’s: `bruto-netto-2026.astro`, `salaris-calculator.astro`, `vakantiegeld-calculator.astro`, `toeslagen-calculator.astro`, `hypotheek-calculator.astro`, `btw-calculator.astro`, `btw-terugrekenen.astro`, `btw-inclusief-exclusief.astro`, `zzp-calculator.astro` en `auto-importkosten-berekenen.astro`.
- Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.

## Update: Sprint 099 — Breadcrumb Consistency + Homepage Search URL State (afgerond)

Sprint 099 maakt de navigatie-consistentie compleet door breadcrumbs toe te voegen aan alle categoriepagina’s en de homepage-zoekterm deelbaar te maken via URL-state.

Wijzigingen:

- **Categoriepagina’s**: visuele breadcrumbs toegevoegd boven de hero in `src/pages/categorie/inkomen.astro`, `src/pages/categorie/belasting.astro`, `src/pages/categorie/wonen.astro`, `src/pages/categorie/ondernemen.astro` en `src/pages/categorie/auto.astro`. Patroon: `Home > Categorieën > <Categorie>`. `Categorieën` linkt naar `/#categorieen` op de homepage. Huidige categorie heeft `aria-current="page"`. Zelfde styling als calculator breadcrumbs.
- **Homepage (`src/pages/index.astro`)**: geen breadcrumb toegevoegd (semantisch niet nodig op root). Wel is de zoekfilter nu URL-gestuurd:
  - Bij typen wordt `?q=<zoekterm>` bijgewerkt via `history.replaceState`.
  - Bij laden met `?q=...` wordt het zoekveld gevuld en de filter direct toegepast.
  - Bij leegmaken wordt de queryparameter verwijderd.
  - Zonder JavaScript blijven alle calculatorcards zichtbaar.
- Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.

## Update: Sprint 098 — Visual Breadcrumbs + Codebase Cleanup (afgerond)

Sprint 098 voegt zichtbare breadcrumbs toe aan alle calculatorpagina’s en ruimt oude back-upbestanden op. Doel: betere gebruikersnavigatie, interne links, SEO topic clusters en onderhoudbaarheid.

Wijzigingen:

- **Nieuwe component**: `src/components/Breadcrumbs.astro` — herbruikbaar, compact, mobile-first, met `<nav aria-label="Breadcrumb">`, `<ol>` lijst, `aria-current="page"` op de huidige pagina, en ingebouwde microdata (`itemscope`, `itemprop="itemListElement"`).
- **Alle 10 calculatorpagina’s**: boven de `CalculatorShell` wordt een breadcrumb getoond:
  - `Home > Inkomen > Bruto netto 2026`
  - `Home > Inkomen > Salaris calculator`
  - `Home > Inkomen > Vakantiegeld calculator`
  - `Home > Inkomen > Toeslagen calculator`
  - `Home > Wonen > Hypotheek calculator`
  - `Home > Belasting > BTW calculator`
  - `Home > Belasting > BTW terugrekenen`
  - `Home > Belasting > BTW inclusief/exclusief`
  - `Home > Ondernemen > ZZP calculator`
  - `Home > Auto > Auto importkosten berekenen`
- **Bestaande BreadcrumbList JSON-LD** op de calculatorpagina’s blijft behouden.
- **Cleanup**: `src/pages/_bak/` verwijderd. De map bevatte alleen oude back-uppagina’s van calculators, contact, cookies, disclaimer, over-ons en privacy die niet meer in gebruik waren.
- **Geen wijzigingen** aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. `npm run atlas:check` slaagt: 219 tests, 22 pagina's, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.

## Update: Sprint 097 — Category Navigation Integration v1 (afgerond)

Sprint 097 maakt de categoriepagina’s uit Sprint 096 vindbaar en bruikbaar binnen de hele site. Verbeterde interne links, SEO topic clusters, gebruikersnavigatie en Product Completion.

Wijzigingen:

- **Homepage (`src/pages/index.astro`)**: cluster-chips zijn nu links naar de vijf categoriepagina’s. Link "Bekijk alle categorieën" scrollt naar een nieuwe categorieën-sectie. Zoekveld filtert nog steeds de calculator grid. Categorieën-sectie hergebruikt `RelatedCategories`.
- **Header (`src/layouts/BaseLayout.astro`)**: toegevoegd: mobiel hamburger-menu, desktop dropdown "Categorieën" met links naar alle categoriepagina’s, behoud van bestaande calculatorlinks. Navigatie is server-rendered; mobiel geen horizontale scroll.
- **Footer (`src/layouts/BaseLayout.astro`)**: opgedeeld in drie kolommen met categorie-links, alle calculators, en site-links. Categorie-links en "Alle calculators" toegevoegd.
- **Calculatorpagina’s**: `ToolFooter` component uitgebreid met `categoryLink` en `categoryLabel` props. Alle 10 calculatorpagina’s krijgen een subtiele link "Bekijk meer calculators in de categorie [X]" naar de juiste categoriepagina.
- **Componenten**: `RelatedCategories.astro` krijgt optionele `title` prop en optionele `current` prop zodat het ook als algemene categorielijst gebruikt kan worden. `ToolFooter.astro` ondersteunt nu categorie-links.

Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. `npm run atlas:check` slaagt; 22 pagina's, 219 tests, 0 TypeScript-fouten, 2 verwachte draft waarschuwingen.

## Update: Sprint 096 — Category Experience v1 (afgerond)

Sprint 096 bouwt de eerste complete categoriepagina's voor Calculatieloket.nl, als onderdeel van Product Completion uit de FiscalMesh Product Roadmap. Vijf nieuwe pagina's in `src/pages/categorie/`:

- `/categorie/inkomen/` — Bruto netto, Salaris, Vakantiegeld, Toeslagen.
- `/categorie/belasting/` — BTW calculator, BTW terugrekenen, BTW inclusief/exclusief.
- `/categorie/wonen/` — Hypotheek calculator.
- `/categorie/ondernemen/` — ZZP calculator, Auto importkosten.
- `/categorie/auto/` — Auto importkosten.

Iedere pagina bevat een hero, calculator grid in homepage-stijl, 300–500 woorden unieke server-rendered content, minimaal 5 FAQ-items via `FaqAccordion`, officiële bronnen via `SourceCards`, gerelateerde categorieën en interne links. SEO: unieke title/meta description, canonical, exact één H1, `BreadcrumbList`, `CollectionPage` en `FAQPage` schema. Mobile-first CSS: 1 kolom op mobiel, 2 op tablet, 3–4 op desktop. AdSense alleen ná de eerste calculatorsectie.

Nieuwe herbruikbare componenten in `src/components/category/`:

- `CategoryHero.astro`
- `CategoryIntro.astro`
- `CategoryGrid.astro`
- `CategoryFaq.astro`
- `CategorySources.astro`
- `RelatedCategories.astro`

Daarnaast een gedeeld icon- en categorie-helper bestand `src/lib/category-icons.ts` zodat de pagina's consistent blijven.

Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, `.env`, deploy, dependencies of `npm ci`. `npm run atlas:check` slaagt; build telt 22 pagina's.

## Update: Sprint 095 — FiscalMesh Product Roadmap 1.0

Sprint 095 legt de strategische koers van Calculatieloket / FiscalMesh definitief vast in een centraal roadmap-document. Dit is **geen** code-sprint: er zijn geen Astro-pagina's, engines, Knowledge Objects, Rule Resolver-wijzigingen, recommendation-wijzigingen, dependencies of deploy-stappen. Alleen documentatie is gewijzigd.

Nieuw document: `docs/product/00-FISCALMESH-PRODUCT-ROADMAP.md` bevat:
- Missie: Calculatieloket als beste financiële platform van Europa, FiscalMesh als engine achter alle landen.
- Visie: Product Completion → Dashboard → Agents → International Expansion.
- Fases 1 t/m 4 met uitgebreide beschrijving, voorwaarden en eindtoestanden.
- Definition of Done per calculator (18 criteria, waaronder App Shell, Recommendation Engine, Mobile/Desktop UX, SEO, FAQ, Schema, Sources, Examples, URL State, Copy Link, Financial Journey, Accessibility, Performance, Analytics, AdSense, Internal Links, CI Green).
- Platform Definition of Done voor homepage, calculator hub, categoriepagina's, navigatie, search, footer, header, dashboard, Knowledge Layer, Recommendation Engine en CI/CD.
- Non-negotiables: geen agents voor Product Completion, geen internationale uitrol voor Nederland referentieproduct.
- Quality Rules: iedere sprint moet UX, SEO, performance, content, interne links, schaalbaarheid of onderhoudbaarheid verbeteren.
- Sprint Governance: iedere sprint krijgt Doel, Waarom, Definition of Done, Acceptatiecriteria, Risico's, Volgende sprint.
- Product Scoreboard met huidige status per land en per calculator.
- Sluit af met het leidend principe voor alle volgende Product Completion sprints.

Bijkomende wijzigingen: `05_changelog.md` en `docs/10-CHANGELOG.md` zijn bijgewerkt met deze Sprint 095 entry. `docs/product/10-PRODUCT-POLISH-BACKLOG.md` verwijst voortaan naar `00-FISCALMESH-PRODUCT-ROADMAP.md` als leidend document.

## Update: Sprint 080 — Bruto Netto WOW Polish

Sprint 080 heeft de meeste P0 items uitgewerkt op `src/pages/bruto-netto-2026.astro`. De wijzigingen zijn gebaseerd op de competitieve benchmark (Sprint 079) en de UX-review.

### Afgerond in Sprint 080

- **P0 #1 Dynamische use cases** — `UseCasesPanel` toont nu concrete bedragen (`{{bruto}}`, `{{bruto_jaar}}`, `{{netto}}`, `{{netto_jaar}}`) die door het client script worden vervangen zodra de gebruiker een bedrag invoert. De originele template wordt bewaard in `data-template`.
- **P0 #2 “Kopieer link” knop** — `ResultPanel` actions slot bevat een knop die de huidige URL (inclusief `?bruto`, `?pensioen`, `?lhk`) naar het klembord kopieert, met visuele feedback.
- **P0 #3 Effectief belastingtarief + schijven** — Resultaat toont nu het effectieve tarief (loonheffing na kortingen / bruto jaarsalaris) én een compacte belastingschijven-tabel (2026).
- **P0 #4 FAQPage schema markup** — Toegevoegd via `BaseLayout` head slot; gegenereerd uit de FAQ array.
- **P0 #5 BreadcrumbList schema markup** — Eveneens via `BaseLayout` head slot.
- **P0 #6 “Bijgewerkt per [datum]” bij resultaat** — Meta-badges “Bijgewerkt: 2026” en “Bron: Belastingdienst” direct onder de resultaat hero.
- **P0 #7 Snelle bedragen chips** — € 2.500, € 3.000, € 3.500, € 4.000, € 5.000 chips boven het pensioenveld; 1 klik vult het bruto bedrag in en triggert een nieuwe berekening.
- **P0 #8 Mobiele viewport optimalisatie** — Extra page-scoped mobile CSS: compactere chips, volledige breedte voor input/result, kleinere font-sizes in SEO-content, padding reductie.

### Nog open / bewust uitgesteld

- **P0 #9 Verwijder bovenste advertentie of A/B testen** — De bovenste AdSlot blijft vooralsnog staan. Een A/B-test of verwijdering wordt aangeraden zodra er voldoende traffic/measurement data is (zie P1 #18).

### Nieuwe aanbeveling

De P1 items (HowTo schema, bronnen onder resultaat, LHK vergelijking, People also ask content, contextuele interne links, sticky resultaat hero, AdSense A/B test) blijven op de backlog staan. Ze worden opgepakt zodra de actieve migratiesprint (Sprint 085) is afgerond.

### Update: Sprint 083 — Toeslagen App Shell Migration (afgerond)

Sprint 083 heeft de `toeslagen-calculator.astro` pagina gemigreerd naar de Calculator App Shell. Nieuw: de `FinancialJourney` component voor de “Je volgende stap”-sectie. P0/P1 polish voor bruto-netto blijft bewust uitgesteld tot na de huidige migratiesprint.

### Update: Sprint 084 — BTW Calculator App Shell Migration (afgerond)

Sprint 084 heeft `btw-calculator.astro` gemigreerd naar de Calculator App Shell. Scope: alleen deze pagina, geen engine- of Knowledge Layer-wijzigingen, geen deploy.

### Update: Sprint 085 — BTW Terugrekenen + Inclusief/Exclusief App Shell Migration (afgerond)

Sprint 085 heeft `btw-terugrekenen.astro` en `btw-inclusief-exclusief.astro` gemigreerd naar de Calculator App Shell. Financial Journey verbindt het BTW-cluster onderling en naar ZZP uurtarief en auto importkosten.

### Update: Sprint 086 — ZZP Calculator App Shell Migration (afgerond)

Sprint 086 heeft `zzp-calculator.astro` gemigreerd naar de Calculator App Shell. Scope: alleen deze pagina, gebruik bestaande `calculateZzpReverse()`, geen engine- of Knowledge Layer-wijzigingen, geen deploy.

### Update: Sprint 087 — Financial Recommendation Engine v1 (afgerond)

Sprint 087 bouwde een generieke, rule-based Financial Recommendation Engine in `src/lib/recommendations/` en breidt `FinancialJourney.astro` uit zodat deze `recommendations` kan renderen. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, `.env`, deploy of bestaande calculatorpagina’s.

### Update: Sprint 088 — Recommendation Engine Integration (afgerond)

Sprint 088 sluit de Recommendation Engine aan op alle 8 gemigreerde calculators: `bruto-netto-2026.astro`, `salaris-calculator.astro`, `hypotheek-calculator.astro`, `toeslagen-calculator.astro`, `btw-calculator.astro`, `btw-terugrekenen.astro`, `btw-inclusief-exclusief.astro` en `zzp-calculator.astro`. Elke pagina berekent nu server-side een initiële set recommendations en herberekent deze client-side bij elke inputwijziging. Handmatige `journeySteps` arrays en de statische `result-next-steps` links zijn verwijderd. De engine blijft rule-based, traceerbaar en testbaar; er zijn geen engine-, Knowledge- of Rule Resolver-wijzigingen.

### Update: Sprint 089 — P1 Product Polish (afgerond)

Sprint 089 rondt de P1 polish items af op alle 8 gemigreerde calculators. De gedeelde componenten `HowToSchema.astro` en `InlineSources.astro` zijn toegevoegd in `src/components/calculator/`. De pagina's `hypotheek-calculator.astro`, `toeslagen-calculator.astro`, `btw-calculator.astro`, `btw-terugrekenen.astro`, `btw-inclusief-exclusief.astro` en `zzp-calculator.astro` zijn voorzien van HowTo schema markup, inline bronnen onder het resultaat, contextuele interne links in de SEO-content en opgeruimde page-scoped CSS. `bruto-netto-2026.astro` en `salaris-calculator.astro` krijgen bovendien een live loonheffingskortingvergelijking (met/zonder korting) in het resultaat. Daarnaast is `src/styles/global.css` uitgebreid met mobiele input polish: 16px font-size en verbeterde spacing voor `.form-group-row`. Geen engine-, Knowledge- of Rule Resolver-wijzigingen; geen deploy.

### Update: Sprint 091 — Auto Importkosten Recommendation Rules (afgerond)

Sprint 091 voegt `auto-importkosten` toe aan de Financial Recommendation Engine. Nieuwe rule file `src/lib/recommendations/rules/import-costs.ts` met regels voor BTW Calculator, Hypotheek/financiering bij hoge aanschafkosten (> € 5.000), Bruto-netto 2026 bij lagere kosten, ZZP uurtarief en BPM uitleg via de Belastingdienst. `src/lib/recommendations/registry.ts` is uitgebreid met `"auto-importkosten": importCostsRules`. `src/pages/auto-importkosten-berekenen.astro` gebruikt nu dynamische recommendations via `getRecommendations()` en `updateFinancialJourney()` in plaats van statische `steps`. Tests toegevoegd in `tests/recommendations/recommendations.test.ts`. Geen engine-, Knowledge- of Rule Resolver-wijzigingen; geen deploy.

### Update: Sprint 092 — Vakantiegeld Calculator (afgerond)

Sprint 092 voegt een nieuwe `vakantiegeld` calculator toe. Nieuwe engine `src/lib/calculators/vacation-pay.ts` berekent het netto vakantiegeld door de bestaande `tax.ts` engine te hergebruiken: een totaalscenario mét vakantiegeld wordt vergeleken met een zonder-vakantiegeld-scenario. De nieuwe pagina `src/pages/vakantiegeld-calculator.astro` gebruikt de Calculator App Shell (`CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion`, `ToolFooter`, `FinancialJourney`, `HowToSchema`, `InlineSources`). Input: bruto maandsalaris, vakantiegeldpercentage, pensioenpremie en loonheffingskorting. Resultaat direct zichtbaar bij laden. URL state: `?bruto`, `?percentage`, `?pensioen`, `?lhk`. Quick chips: € 2.500, € 3.000, € 3.500, € 4.000, € 5.000. Kopieer-link knop in `ResultPanel`. `FAQPage`, `BreadcrumbList` en `HowTo` JSON-LD schema markup. Vakantiegeld is toegevoegd aan de Recommendation Engine via `src/lib/recommendations/rules/vacation-pay.ts` en geregistreerd als `"vakantiegeld": vacationPayRules`. Recommendations op de vakantiegeld pagina: Bruto-netto 2026, Salaris, Toeslagen, Hypotheek, ZZP. De `vakantiegeld` placeholder in `income.ts` en `FinancialJourney.astro` is vervangen door een werkende link naar `/vakantiegeld-calculator/`. Tests toegevoegd in `tests/calculators/vacation-pay.test.ts` en `tests/recommendations/recommendations.test.ts`. Geen wijzigingen aan bestaande calculator engines, Knowledge Objects, Rule Resolver, `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` slaagt; build telt 17 pagina's.

### Update: Sprint 093 — Homepage App Experience v1 (afgerond)

Sprint 093 herontwerpt `src/pages/index.astro` tot een financiële startpagina. Hero met H1 "Wat wil je berekenen?", zoekveld en cluster-chips (Alle, Populair, Inkomen, Wonen, Ondernemen, Belasting, Auto). Hoofdgrid toont 10 actiegerichte calculator cards: Bruto netto 2026, Salaris, Vakantiegeld, Toeslagen, Hypotheek, BTW, BTW terugrekenen, BTW inclusief/exclusief, ZZP en Auto importkosten. Elke card heeft een titel, vraag, belofte, badge en CTA "Bereken direct". Secties "Begin met je inkomen" en "Voor ondernemers" gebruiken `CrossSellCards`. AdSense-advertentie is bewust pas ná de eerste toolsectie geplaatst. SEO versterkt: betere title/meta description, één H1, `WebSite` + `SearchAction` JSON-LD schema, interne links naar alle calculators, behouden FAQ en trustband. Client-side filter voor zoekveld en cluster-chips laat alle links server-rendered. Mobile-first CSS: 1 kolom op 360/390px, 2 kolommen op tablet, 3 kolommen op desktop; grote tap targets. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, shared components (behoudens hergebruik `CrossSellCards`), `.env`, deploy, `npm ci`, `rm -rf node_modules` of dependencies. `npm run atlas:check` slaagt; build telt 17 pagina's.

---

## Legenda

- **P0** — Must have; directe impact op conversie/vertrouwen/SEO; uitvoerbaar in deze sprint of direct daarna.
- **P1** — Should have; duidelijke verbetering, maar iets meer werk of afhankelijk van P0.
- **P2** — Nice to have; strategisch waardevol, maar pas nadat P0/P1 stabiel zijn.

---

## P0 — Must have

| # | Item | Waarom | Files / componenten | Complexiteit | Afhankelijkheid |
|---|---|---|---|---|---|
| 1 | **Dynamische use cases** — use-case links nemen huidige bruto/netto waarden mee (`?inkomen=...`, `?bruto=...`, etc.). | Verlaagt drempel naar volgende calculator; levert journey-gevoel op dat concurrenten niet hebben. | `UseCasesPanel.astro` of client script in `bruto-netto-2026.astro` | Laag | Geen |
| 2 | **“Kopieer link” knop** — kopieert de huidige URL (`?bruto=...&pensioen=...&lhk=...`) naar klembord. | Maakt delen van resultaat extreem makkelijk; uniek voordeel ten opzichte van concurrenten. | `ResultPanel.astro` actions slot of client script | Laag | Geen |
| 3 | **Effectief belastingtarief + schijven toevoegen aan resultaat** | Concurrent SalarisNetto toont dit al; wij moeten gelijk/beter zijn. | `ResultPanel` breakdown in `bruto-netto-2026.astro` | Laag | Geen |
| 4 | **FAQPage schema markup** | Rich snippets in Google; directe SEO-winst. | `FaqAccordion.astro` of `BaseLayout` head slot | Laag | Geen |
| 5 | **BreadcrumbList schema markup** | Betere begrijpelijkheid voor Google; rich snippets. | `BaseLayout` of pagina-specifiek head | Laag | Geen |
| 6 | **“Bijgewerkt per [datum]” direct bij het resultaat** | Verhoogt vertrouwen; Nibud/BerekenHet doen dit sterker. | `ResultPanel` of `ToolFooter` | Laag | Geen |
| 7 | **Snelle bedragen chips** — € 2.500, € 3.000, € 3.500, € 4.000, € 5.000. | 1-klik scenario’s; concurrent SalarisNetto heeft period toggle, wij kunnen scenario’s bieden. | `InputPanel` slot in `bruto-netto-2026.astro` | Laag | Geen |
| 8 | **Mobiele viewport optimalisatie** — input + resultaat binnen één viewport op 375/390px. | Essentieel voor mobiele ervaring; SalarisNetto doet dit beter. | `CalculatorShell.astro`, `InputPanel.astro`, `ResultPanel.astro` scoped styles | Middel | Geen |
| 9 | **Verwijder bovenste advertentie of A/B testen** | Ad eet mobiele eerste viewport; mogelijk conversieverlies. | `bruto-netto-2026.astro` | Laag | Geen |

---

## P1 — Should have

| # | Item | Waarom | Files / componenten | Complexiteit | Afhankelijkheid |
|---|---|---|---|---|---|
| 10 | **HowTo schema markup** voor de 5 berekeningsstappen in SEO-content. | Extra rich snippets; maakt content nog beter vindbaar. | SEO-contentblok in `bruto-netto-2026.astro` | Laag | Geen |
| 11 | **Sociale proof / trust bar** naast resultaat: “Gebaseerd op Belastingdienst 2026 · Indicatie · X beoordelingen” (indien beoordelingen beschikbaar). | Sluit de betrouwbaarheidskloof met Nibud/BerekenHet. | `ResultPanel` of nieuw component | Middel | Geen |
| 12 | **Bronnen direct onder het resultaat** (niet alleen in zijpaneel). | Gebruiker ziet direct dat de berekening op officiële bronnen is gebaseerd. | `ResultPanel` actions/breakdown | Laag | #4 |
| 13 | **“Met / zonder loonheffingskorting” vergelijking** — direct het verschil tonen. | Helpt gebruiker begrijpen wat LHK waard is. | Client script + result breakdown | Middel | Geen |
| 14 | **Herstructureer SEO-content naar “People also ask” H2/H3 vragen**. | Betere SEO, betere scanbaarheid, meer long-tail verkeer. | `bruto-netto-2026.astro` SEO-content | Middel | Geen |
| 15 | **Contextuele interne links** in SEO-content naar toeslagen, hypotheek, ZZP, salaris. | Betere interne linkstructuur; hogere pagerank naar andere tools. | `bruto-netto-2026.astro` | Laag | Geen |
| 16 | **Sticky resultaat hero op mobiel** — hero blijft bovenaan zichtbaar bij scrollen. | Gebruiker ziet altijd het netto-bedrag. | Client script + CSS | Middel | #8 |
| 17 | **Verbeterde “Indicatie” badge** — badge + korte uitleg direct boven/bij resultaat. | Duidelijker dat het een indicatie is; verhoogt vertrouwen. | `ResultPanel` header | Laag | Geen |
| 18 | **A/B test AdSense posities** — variant A (1 ad onder content), variant B (2 ads). | Data-gedreven beslissing over advertentie-opbrengst vs conversie. | `bruto-netto-2026.astro` + eventueel Google Optimize / AdSense data | Middel | #9 |
| 19 | **Inputvelden full-width + 16px font op mobiel** | Voorkomt iOS zoom; betere toegankelijkheid. | `InputPanel` styles / global CSS | Laag | #8 |

---

## P2 — Nice to have

| # | Item | Waarom | Files / componenten | Complexiteit | Afhankelijkheid |
|---|---|---|---|---|---|
| 20 | **Visuele belastingverdeling** — progress bar of donut chart voor belasting/kortingen. | Maakt resultaat visueel aantrekkelijker; concurrenten doen dit niet. | Nieuwe component `TaxBreakdownChart.astro` + client script | Middel | #3 |
| 21 | **“Meer verdienen?” scenario slider** — sleep van +€100 tot +€2.000 bruto extra om netto-effect te zien. | Sterk conversie- en engagement-instrument. | Client script + slider component | Hoog | Geen |
| 22 | **Vergelijk 2025 vs 2026 toggle** | Seizoensgebonden waarde; helpt bij zoekverkeer “verschil 2025 2026”. | Client script + engine re-use? | Middel | Alleen als engine 2025 ondersteunt (niet in scope) |
| 23 | **Meertalige bruto-netto pagina** (nl-BE, en-GB) voor internationale SEO. | Lange termijn groei; andere calculators kunnen later meeliften. | Nieuwe pagina’s + hreflang | Hoog | P0/P1 op NL pagina |
| 24 | **Gebruikersbeoordelingen integreren** (sterren, aantal berekeningen). | Sociale proof; BerekenHet heeft sterren. | Externe tool of eigen feedback widget | Hoog | Juridisch/privacy check |
| 25 | ** FiscalMesh Agent “UX Designer”** — periodieke UX review van live pagina op basis van analytics. | Autonome verbetering op lange termijn. | Agents SDK / FiscalMesh | Hoog | Alleen FiscalMesh v2+ |

---

## Aanbevolen volgorde

### Sprint 080 (afgerond)
Focus op P0 items:

1. #1 Dynamische use cases
2. #2 Kopieer link
3. #3 Effectief tarief + schijven
4. #4 FAQPage schema
5. #5 BreadcrumbList schema
6. #6 Bijgewerkt-datum bij resultaat
7. #7 Snelle bedragen chips
8. #8 Mobiele viewport optimalisatie

### Sprint 081 (afgerond)
Toepassen shell op `salaris-calculator.astro`:

- Hergebruik `CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion`, `ToolFooter`.
- Pensioenpercentage als input (versus vast bedrag in bruto-netto-2026).
- Alle P0 UX elementen uit Sprint 080 ook op salaris-calculator toegepast.

### Sprint 082 (afgerond)
Uitrollen naar `hypotheek-calculator.astro`:

- Hergebruik `CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion`, `ToolFooter`.
- Input: bruto jaarinkomen, rente, looptijd, partner inkomen.
- Resultaat direct zichtbaar: max hypotheek, bruto/netto maandlasten, rentekosten.
- URL state, quick chips, copy link, dynamische use cases, FAQ/BreadcrumbList schema.

### Sprint 083 (afgerond)
Uitrollen naar `toeslagen-calculator.astro`:

- Hergebruik `CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion`, `ToolFooter`.
- Introductie van de `FinancialJourney` component voor “Je volgende stap”.
- Input: bruto jaarinkomen, huur, huishouden, partner inkomen, vermogen, kinderen.
- Resultaat direct zichtbaar: huurtoeslag + zorgtoeslag per maand/jaar.
- URL state, quick chips, copy link, FAQ/BreadcrumbList schema.

### Sprint 084 (afgerond)
BTW Calculator App Shell Migration:

- Hergebruik `CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion`, `ToolFooter`, `FinancialJourney`.
- Input: bedrag, btw-tarief (21%, 9%, 0%), richting (exclusief → inclusief / inclusief → exclusief).
- Resultaat direct zichtbaar: bedrag exclusief, btw-bedrag, bedrag inclusief, gebruikt tarief.
- URL state: `?bedrag=`, `?tarief=`, `?richting=`.
- Quick chips: €100, €250, €500, €1000.
- Copy link, bronnen, bijgewerkt-badge, indicatie-badge.
- FAQPage + BreadcrumbList schema.
- Geen advertentie tussen input en resultaat.

### Sprint 085 (afgerond)
Complete BTW Experience — BTW Terugrekenen + BTW Inclusief/Exclusief App Shell Migration:

- Hergebruik `CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion`, `ToolFooter`, `FinancialJourney`.
- Migreer `btw-terugrekenen.astro` (vaste richting: inclusief → exclusief) en `btw-inclusief-exclusief.astro` (twee richtingen).
- URL state: `?bedrag=`, `?tarief=`, en voor inclusief/exclusief ook `?richting=`.
- Quick chips: €100, €250, €500, €1000.
- Copy link, bronnen, bijgewerkt-badge, indicatie-badge op beide pagina's.
- Financial Journey links tussen alle BTW-pagina's, ZZP uurtarief en auto importkosten.
- FAQPage + BreadcrumbList schema.
- Geen advertentie tussen input en resultaat; mobile-first polish.

### Sprint 086 (afgerond)
ZZP Calculator App Shell Migration:

- Hergebruik `CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion`, `ToolFooter`, `FinancialJourney`.
- Migreer `zzp-calculator.astro`.
- Input: gewenst netto per maand, factureerbare dagen per jaar, uren per dag, zakelijke kosten, pensioenreservering, zelfstandigenaftrek, startersaftrek, MKB-winstvrijstelling.
- Resultaat direct zichtbaar: benodigd uurtarief, benodigde jaaromzet, netto doel, kosten, pensioen, aftrekposten, belastingindicatie, netto na pensioen.
- URL state: `?netto=`, `?dagen=`, `?uren=`, `?kosten=`, `?pensioen=`, `?zelfstandigenaftrek=`, `?startersaftrek=`, `?mkb=`.
- Quick chips: €2.500, €3.000, €3.500, €4.000, €5.000.
- Copy link, bronnen, bijgewerkt-badge, indicatie-badge.
- Financial Journey links naar BTW, bruto-netto, hypotheek, auto import, toeslagen.
- FAQPage + BreadcrumbList schema.
- Geen advertentie tussen input en resultaat; mobile-first polish.

### Sprint 087 (huidige aanbeveling)
Financial Recommendation Engine v1:

- Nieuwe `src/lib/recommendations/` laag: `types.ts`, `engine.ts`, `registry.ts`, `helpers.ts`.
- Rule files: `income.ts`, `btw.ts`, `mortgage.ts`, `zzp.ts`, `allowances.ts`.
- Engine API: `getRecommendations(input)` sorteert, dedupliceert en filtert de huidige calculator.
- `FinancialJourney.astro` accepteert nu `recommendations` prop; backward compatible met `steps`.
- Tests in `tests/recommendations/` dekken engine, regels, registry, prioriteit, deduplicatie en filtering.
- Documentatie: `docs/product/11-FINANCIAL-RECOMMENDATION-ENGINE.md`.
- Geen engine/Knowledge/Rule Resolver wijzigingen; geen deploy.

### Sprint 089 (afgerond)

P1 items afgerond:

- #10 HowTo schema op gemigreerde calculators
- #12 Bronnen onder resultaat
- #13 LHK vergelijking (`bruto-netto-2026.astro` en `salaris-calculator.astro`)
- #15 Contextuele interne links
- #19 Inputvelden full-width + 16px font op mobiel

Bewust niet meegenomen in Sprint 089 (blijven op backlog):

- #14 People also ask content herstructurering
- #16 Sticky resultaat hero
- #18 AdSense A/B test

### Q3/Q4 2026 (P2)
17. #20 Visuele belastingverdeling
18. #21 Scenario slider
19. #23 Meertalige pagina’s
20. #24 Gebruikersbeoordelingen

---

## Definition of Done per item

- Voldoet aan `npm run atlas:check`.
- Geen wijziging aan engine, Knowledge Layer of andere calculatorpagina’s (tenzij item expliciet een gedeelde component betreft).
- Mobiel en desktop getest op viewport 375px, 390px, 768px, 1440px.
- AdSense-plaatsing: nooit tussen input en resultaat.
- SEO-content blijft server-rendered.

---

## Succesindicatoren

- **Conversie:** meer kliks naar use cases, meer gedeelde links.
- **SEO:** meer impressions en CTR op bruto-netto zoektermen.
- **UX:** lagere bounce rate, meer scroll naar SEO-content, betere mobiele Core Web Vitals.
- **AdSense:** gelijkwaardige of hogere RPM zonder conversieverlies.

---

**Sprint 089 afgerond. P2 items staan klaar voor Q3/Q4 2026.**
