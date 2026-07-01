# 10 — Product Polish Backlog

> **Doel:** Prioriteren van alle verbeterpunten voor `bruto-netto-2026.astro` zodat de pagina de beste Nederlandse bruto-netto calculator wordt.  
> **Laatst bijgewerkt:** 2026-07-02  
> **Scope:** UX, conversie, vertrouwen, SEO, AdSense. Geen engine wijzigingen, geen nieuwe calculator, geen Knowledge Layer, geen deploy.

---

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

### Update: Sprint 087 — Financial Recommendation Engine v1 (huidige aanbeveling)

Sprint 087 bouwt een generieke, rule-based Financial Recommendation Engine in `src/lib/recommendations/` en breidt `FinancialJourney.astro` uit zodat deze `recommendations` kan renderen. Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, `.env`, deploy of bestaande calculatorpagina’s.

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

### Direct na Sprint 087 (P1 sprints)

1. Sprint 088: Recommendation Engine integreren in alle 8 gemigreerde calculators.
2. Herpak daarna de P1 polish items:

- #10 HowTo schema op gemigreerde calculators
- #12 Bronnen onder resultaat
- #13 LHK vergelijking
- #14 People also ask content
- #15 Contextuele interne links
- #16 Sticky resultaat hero
- #18 AdSense A/B test
- #19 Inputvelden full-width + 16px font op mobiel
Herpak de P1 polish items uit de backlog:

- #10 HowTo schema op gemigreerde calculators
- #12 Bronnen onder resultaat
- #13 LHK vergelijking
- #14 People also ask content
- #15 Contextuele interne links
- #16 Sticky resultaat hero
- #18 AdSense A/B test
- #19 Inputvelden full-width + 16px font op mobiel

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

**Wachten op Sprint 088.**
