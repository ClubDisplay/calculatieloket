# 04 — First Implementation Plan

> **Doel:** Een concreet, gefaseerd plan maken om de app/tool-ervaring te realiseren zonder big bang.  
> **Laatst bijgewerkt:** 2026-06-30

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

### Stap 3 — Mobiele UX testen en finetunen (Sprint 079)

- Test op telefoon, tablet, klein desktop venster.
- Controleer of input + resultaat binnen één viewport passen.
- Verfijn spacing, font sizes, touch targets.
- Voeg eventueel sticky CTA toe op mobiel.
- Accessibility check: tabvolgorde, focus, labels, ARIA.

### Stap 4 — Toepassen op `salaris-calculator` (Sprint 080)

- Gebruik dezelfde `CalculatorShell`.
- Verschil: `salaris-calculator` gebruikt pensioenpercentage in plaats van bedrag.
- Hergebruik `InputPanel`, `ResultPanel`, `UseCasesPanel`, `FaqAccordion`, `ToolFooter`.
- Verdeel duidelijk: `salaris-calculator` = snelle indicatie; `bruto-netto-2026` = uitgebreide uitleg.

### Stap 5 — Uitrollen naar overige calculators (Sprint 081+)

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
