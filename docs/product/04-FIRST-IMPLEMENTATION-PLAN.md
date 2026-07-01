# 04 — First Implementation Plan

> **Doel:** Een concreet, gefaseerd plan maken om de app/tool-ervaring te realiseren zonder big bang.  
> **Laatst bijgewerkt:** 2026-07-01

---

## Strategie

Geen grote herschrijving van alle pagina’s tegelijk. De kans op fouten, inconsistentie en vertraging is dan te groot. In plaats daarvan:

1. **Eén pagina perfect maken.**
2. **Componenten generiek maken.**
3. **Tweede pagina toepassen en valideren.**
4. **Daarna pas uitrollen naar de rest.**

Dit geeft ook een duidelijk voorbeeld voor toekomstige calculators.

---

## Status update: v0.1 componenten zijn gebouwd

De eerste app/tool componenten zijn gerealiseerd in Sprint 077:

- `CalculatorShell.astro`
- `InputPanel.astro`
- `ResultPanel.astro`
- `UseCasesPanel.astro`
- `FaqAccordion.astro`
- `ToolFooter.astro`

Ze staan in `src/components/calculator/` en zijn visueel getest via de demo-pagina `/demo/calculator-shell/`. Zie `07-CALCULATOR-COMPONENT-LIBRARY-v0.1.md` voor de volledige documentatie van props, slots en gebruik.

---

## Status update: v0.1 bruto-netto-2026 migration afgerond

Sprint 078 heeft `src/pages/bruto-netto-2026.astro` gemigreerd naar de app/tool shell:

- Inputvelden (`?bruto`, `?pensioen`, `?lhk`), resultaat, use cases, FAQ, bronnen en disclaimer zitten in `CalculatorShell`.
- URL state wordt bijgewerkt via `history.replaceState`; bestaande links blijven werken.
- SEO-content (uitleg, tarieven, voorbeelden, veelgemaakte fouten) is behouden en server-rendered.
- Advertenties staan buiten de input/result flow; er is nooit een advertentie tussen invoer en resultaat.
- De demo-pagina `/demo/calculator-shell/` is voorzien van `noindex,nofollow`, uitgesloten van `robots.txt` en uit de sitemap gefilterd.

---

## Status update: Sprint 079 competitive benchmark afgerond

Sprint 079 heeft de concurrentie geanalyseerd en een product-polish backlog opgeleverd:

- Concurrentie-analyse: `BerekenHet.nl`, `Loonwijzer.nl`/`WageIndicator`, `SalarisNetto.nl`, `Nibud.nl`.
- Objectieve scorekaart op 12 criteria (snelheid, eenvoud, mobiel/desktop UX, resultaat, betrouwbaarheid, uitleg, FAQ, ads, vervolgacties, links, SEO).
- Documenten: `08-COMPETITIVE-BENCHMARK.md`, `09-BRUTO-NETTO-UX-REVIEW.md`, `10-PRODUCT-POLISH-BACKLOG.md`.
- Quick wins geïdentificeerd: dynamische use cases, deel-link, effectief tarief + schijven, FAQ/BreadcrumbList schema, mobiele viewport, bovenste ad testen, betrouwbaarheidsversterking.
- P0/P1/P2 backlog klaar voor uitvoering in Sprint 080 (mobiele polish + eerste P0 items) en daarna.

---

## Status update: Sprint 080 bruto-netto polish afgerond

Sprint 080 heeft `src/pages/bruto-netto-2026.astro` verder gepolijst op basis van de backlog:

- **Dynamische use cases** — `UseCasesPanel` toont concreet: `{{bruto}}`, `{{netto}}`, `{{bruto_jaar}}`, `{{netto_jaar}}` worden client-side vervangen bij elke inputwijziging.
- **Kopieer-link knop** — in het `ResultPanel` actions slot; kopieert de huidige URL inclusief parameters naar het klembord.
- **Effectief belastingtarief + schijven** — toegevoegd aan de resultaat-breakdown: loonheffing na kortingen, effectief percentage, en een compacte 2026 belastingschijven-tabel.
- **Schema markup** — `FAQPage` en `BreadcrumbList` JSON-LD via het `head` slot van `BaseLayout`.
- **Trust badges** — meta-badges “Bijgewerkt: 2026” en “Bron: Belastingdienst” direct onder de resultaat hero.
- **Quick chips** — € 2.500, € 3.000, € 3.500, € 4.000, € 5.000 knoppen boven het pensioenveld.
- **Mobile polish** — page-scoped CSS voor compactere chips, volledige breedte input/resultaat, betere 375/390px viewport, en kleinere SEO-content fonts.
- **Next steps in resultaat** — kleine “Verder rekenen” links (Toeslagen, Hypotheek, Salaris, ZZP) in de resultaatkaart.
- **Accessibility** — `Enter` in bruto input triggert calculate; focus management op chips.

Nog bewust open: het verwijderen/A/B-testen van de bovenste advertentie (zie P0 #9 in `10-PRODUCT-POLISH-BACKLOG.md`).

---

## Status update: Sprint 081 salaris-calculator migration afgerond

Sprint 081 heeft `src/pages/salaris-calculator.astro` gemigreerd naar dezelfde app/tool shell als `bruto-netto-2026`:

- `CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion` en `ToolFooter` zijn hergebruikt.
- Inputvelden: bruto maandsalaris, pensioenpercentage (werknemersdeel), loonheffingskorting toggle.
- Resultaat direct zichtbaar bij laden: € 3.500 bruto / 5% pensioen / LHK aan → netto indicatie.
- URL state: `?bruto`, `?pensioen` (percentage), `?lhk` (1 of 0); bijgewerkt via `history.replaceState`.
- Quick amount chips: € 2.500, € 3.000, € 3.500, € 4.000, € 5.000.
- Kopieer-link knop in `ResultPanel` actions slot.
- Effectief belastingtarief + compacte 2026 belastingschijven-tabel in resultaat.
- Dynamische use cases: Bruto-netto 2026, Toeslagen, Hypotheek, ZZP — met concrete `{{bruto}}` / `{{netto}}` / `{{bruto_jaar}}` / `{{netto_jaar}}` waarden.
- `FAQPage` en `BreadcrumbList` JSON-LD schema markup via `BaseLayout` head slot.
- SEO-content behouden: intro, “Hoe werkt deze berekening?”, voorbeeldberekening, tarieventabel.
- Disclaimer en laatst-bijgewerkt via `ToolFooter`.
- Geen advertentie tussen input en resultaat; advertentie staat boven de tool.
- Geen wijziging aan calculatorlogica, engines, Knowledge Objects of andere pagina’s.

**Verschil met bruto-netto-2026:** salaris-calculator gebruikt pensioen als percentage; bruto-netto-2026 gebruikt een vast pensioenbedrag per maand. Beide delen dezelfde `calculateNetIncomeEstimate2026()` engine.

---

## Aanbevolen eerste calculator: `bruto-netto-2026`

**Waarom deze?**

- Hoog zoekvolume en hoge waardeperceptie.
- Centraal in de “inkomen”-journey.
- Heeft al veel context (voorbeelden, FAQ, bronnen) die we kunnen herstructureren.
- Gebruikt de centrale `tax` engine, dus geen rekenlogica hoeft te veranderen.
- Is representatief voor de andere inkomenscalculators.

**Alternatieven:**

- `salaris-calculator.astro` — net iets simpeler, maar mist de rijke content.
- `btw-calculator.astro` — technisch eenvoudiger, maar minder centraal in de journey.
- `hypotheek-calculator.astro` — resultaat is al zichtbaar, maar heeft minder context.

---

## 5-stappenplan

### Stap 1 — Componenten ontwerpen (Sprint 077)

Bouw de gedeelde componenten die elke calculator gaan gebruiken:

- `CalculatorShell.astro` — container met hero, input, result, context, next steps.
- `InputPanel.astro` — invoerkaart met slot voor velden.
- `ResultPanel.astro` — resultaatkaart met hero, breakdown, actions.
- `UseCasesPanel.astro` — “Wat kun je hiermee?” kaartjes.
- `FaqAccordion.astro` — herbruikbare FAQ met schema.org markup.
- `ToolFooter.astro` — disclaimer + laatst bijgewerkt.

**Regels:**

- Geen inline `<style>` in pagina’s; styles naar `global.css` of component-scoped style.
- Gebruik bestaande CSS custom properties.
- Geen rekenlogica in componenten.

### Stap 2 — `bruto-netto-2026` herontwerpen (Sprint 078)

Pas de nieuwe componenten toe op `bruto-netto-2026.astro`:

- Inputvelden bovenaan, resultaat direct eronder.
- “Wat kun je hiermee?” met 4 use cases.
- Next steps naar toeslagen, hypotheek, ZZP, vakantiegeld.
- FAQ als accordion.
- Bronnen via `SourceCards`.
- URL state: `?bruto=3500&pensioen=150&loonheffing=1`.

**Niet in scope:** wijzigen van de tax-engine of van de berekening zelf.

### Stap 3 — Competitive benchmark + product polish backlog (Sprint 079)

- Analyseer concurrentie op snelheid, eenvoud, UX, resultaat, vertrouwen, SEO, AdSense.
- Maak objectieve scorekaart en identificeer quick wins.
- Documenteer benchmark, UX-review en P0/P1/P2 backlog.

### Stap 4 — Mobiele UX testen en finetunen + P0 quick wins (Sprint 080) ✅

- Test op telefoon, tablet, klein desktop venster.
- Controleer of input + resultaat binnen één viewport passen.
- Verfijn spacing, font sizes, touch targets.
- Voeg eventueel sticky CTA toe op mobiel.
- Accessibility check: tabvolgorde, focus, labels, ARIA.
- Voer P0 items uit de polish backlog uit (dynamische use cases, deel-link, effectief tarief + schijven, schema markup, etc.).

**Resultaat:** zie status update “Sprint 080 bruto-netto polish afgerond” hierboven. De P0 items #1 t/m #8 zijn uitgevoerd; #9 (advertentie A/B test) is bewust uitgesteld.

### Stap 5 — Toepassen op `salaris-calculator` (Sprint 081) ✅

- Gebruik dezelfde `CalculatorShell`.
- Verschil: `salaris-calculator` gebruikt pensioenpercentage in plaats van bedrag.
- Hergebruik `InputPanel`, `ResultPanel`, `UseCasesPanel`, `FaqAccordion`, `ToolFooter`.
- Verdeel duidelijk: `salaris-calculator` = snelle indicatie; `bruto-netto-2026` = uitgebreide uitleg.

**Resultaat:** zie status update “Sprint 081 salaris-calculator migration afgerond” hierboven.

### Stap 6 — Uitrollen naar overige calculators (Sprint 082+)

Volgorde:

1. `hypotheek-calculator.astro` — resultaat is al zichtbaar, dus snel te converteren.
2. `btw-calculator.astro` — eenvoudige invoer, goed voor patroonvalidatie.
3. `toeslagen-calculator.astro` — dubbele resultaten vragen om specifieke aanpak.
4. `zzp-calculator.astro` — veel invoervelden, eventueel stapsgewijs opdelen.
5. `auto-importkosten-berekenen.astro` — laatste, vanwege complexiteit.
6. `btw-terugrekenen.astro` en `btw-inclusief-exclusief.astro` hergebruiken BTW-shell.

---

## Technische aandachtspunten

- **URL state** moet backwards-compatible zijn: bestaande links blijven werken.
- **SEO** mag niet lijden: schema.org markup, canonical, title/description blijven intact; uitleg, FAQ en bronnen blijven server-rendered.
- **Ads** blijven staan, maar worden nooit geplaatst tussen invoer en resultaat; toegestane locaties: boven tool, onder resultaat, tussen contentblokken.
- **Internationale SEO** is voorbereid: componenten ondersteunen land/locale parameters; hreflang kan later worden toegevoegd.
- **Performance** blijft client-side; geen nieuwe JavaScript bundels of runtime dependencies.
- **Accessibility** is verplicht: focus states, labels, foutmeldingen, kleurcontrast.
- **Meetpunten** worden toegevoegd: calculator starts, completions, result views, next-step clicks, scroll depth, ad RPM.

---

## Definition of Done per pagina

- [ ] Pagina gebruikt `CalculatorShell`.
- [ ] Invoer en resultaat zijn direct zichtbaar bij geldige defaults (server-rendered).
- [ ] Resultaat heeft hero number, breakdown, badge “Indicatie”, acties.
- [ ] “Wat kun je hiermee?” en next steps staan onder het resultaat.
- [ ] Bronnen en FAQ zijn aanwezig en server-rendered.
- [ ] Geen advertenties tussen invoer en resultaat.
- [ ] Interne links naar minimaal 3–5 gerelateerde calculators/tools.
- [ ] URL parameters vullen de invoer in.
- [ ] Mobiele viewport toont input + resultaat zonder scroll.
- [ ] Title, meta description, canonical, H1 en schema.org markup zijn intact of verbeterd.
- [ ] Meetpunten voor starts, completions, result views, next-step clicks en scroll depth zijn toegevoegd.
- [ ] `npm run atlas:check` slaagt.
- [ ] Geen regressie in bestaande tests.

---

## Advies voor Sprint 077

Start met de **componenten** (`CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `FaqAccordion`, `ToolFooter`). Bouw ze generiek en test ze in een tijdelijke story/demo-pagina voordat je `bruto-netto-2026` aanpast. Zo krijg je een solide basis zonder bestaande pagina’s te breken.
