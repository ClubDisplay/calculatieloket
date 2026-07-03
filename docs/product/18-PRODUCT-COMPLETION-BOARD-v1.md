# 18 — Product Completion Board v1

> **Sprint:** 112
> **Doel:** Één centrale statuspagina die exact laat zien wat nog nodig is vóór Calculatieloket 1.0.
> **Scope:** Alleen documentatie. Geen code, geen engines, geen Knowledge Objects, geen Rule Resolver, geen Recommendation Engine, geen deploy, geen dependencies.
> **Datum:** 2026-07-03
> **Laatst bijgewerkt:** 2026-07-03

---

## Samenvatting

| Vraag | Oordeel |
|---|---|
| Is Calculatieloket **technisch** klaar voor 1.0? | **Ja**. Lokale CI groen, Lighthouse groen, AdSense laadt alleen na consent, OG-image is 1200×630. |
| Is Calculatieloket **productmatig** klaar voor 1.0? | **Ja**. Alle P0-items voor de publieke site zijn af. |
| Moet er nog iets vóór Dashboard / Agents? | **Nee**. Dashboard, Agents en internationalisering zijn expliciet buiten scope van 1.0. |
| Aanbevolen Sprint 113 | **Release & Launch Readiness** — tag `v1.0.0`, finale deploy-check, analytics-provider kiezen, eventuele AdSense A/B-test voorbereiden. |

**Overall 1.0 readiness:** 95/100 (groen).

---

## 1. Product Completion status per domein

### 1.1 Platform

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 98 | 🟢 Groen | Header, footer, mobiel menu, breadcrumbs, skip-link, homepage, calculator hub, 5 categoriepagina’s, 5 statische pagina’s, 404-vriendelijke fallback, consistente navigatie. | Geen functionele ontbrekende delen; alleen iteratieve finetuning mogelijk. | Nee | Monitor nav gedrag na launch; overweeg micro-verbeteringen op basis van analytics. |

### 1.2 Calculator Experience

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 97 | 🟢 Groen | Alle 10 calculators zitten in de Calculator App Shell (`CalculatorShell`, `InputPanel`, `ResultPanel`, `UseCasesPanel`, `SourceCards`, `FaqAccordion`, `ToolFooter`, `FinancialJourney`, `HowToSchema`, `InlineSources`). URL state, copy-link, quick-chips, preset chips, live herberekening, TrustPanel, bronnen, use cases, FAQ, disclaimer aanwezig. | Geen P0-ontbrekende delen. | Nee | Verzamel gebruiksdata en prioriteer P1-verbeteringen (sticky hero, scenario slider). |

### 1.3 SEO

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 97 | 🟢 Groen | Unieke title/description per pagina (120–160 tekens), canonical, BreadcrumbList, FAQPage, HowTo, CollectionPage, WebSite + SearchAction schema, exact één H1, server-rendered links. OG-image 1200×630 PNG + WebP met absolute URL, width/height, alt, og:url, og:site_name, og:locale, twitter:card summary_large_image. | Geen P0-tekorten. | Nee | Monitor social snippet previews na launch. |

### 1.4 Content

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 94 | 🟢 Groen | Content Quality Standard gedocumenteerd; alle 10 calculators hebben intro, calculator, resultaat, TrustPanel, “waarom vertrouwen”, praktijkvoorbeeld, veelgemaakte fouten, FAQ, bronnen, disclaimer, gerelateerde calculators. | Geen P0-tekorten; verdere optimalisatie is data-gedreven. | Nee | Plan halfjaarlijkse contentreview; prioriteit laag. |

### 1.5 Trust

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 97 | 🟢 Groen | `TrustPanel` op alle 10 calculators, trust-mention in footer, bronvermeldingen, “Gebaseerd op officiële bronnen” badges, geen fake reviews/sterren. | Geen. | Nee | Monitor conversie-impact; overweeg subtiele trust-uitbreidingen na launch. |

### 1.6 Accessibility

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 95 | 🟢 Groen | Lokale Lighthouse accessibility ≥ 95 op alle 13 publieke pagina’s; skip-link, focus-visible, aria-labels, aria-current, radio-group labels, quick-chip labels, contrast fixes op Auto importkosten. | Enkele calculators scoren 96 door licht-grijze labels in resultaat; net boven drempel. | Nee | Pas op termijn ResultPanel-label kleur aan voor extra marge (P1). |

### 1.7 Performance

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 92 | 🟢 Groen | Lokale Lighthouse performance 99–100 op alle 13 pagina’s; favicon 4 KB, header logo 52 KB, ClientRouter deferred, ad-containers hebben reservering. Productiebaseline gemeten: zonder ads en met ads-enabled (consent nog niet gegeven) identiek 100/100. | Werkelijke AdSense-rendering (met echt advertentiemateriaal) kan pas in productie gemeten worden; geen CLS waargenomen in lokale metingen. | Nee | Monitor Core Web Vitals in productie na launch; pas ad-formaten/reserveringen aan indien CLS > 0.1. |

### 1.8 Analytics-ready

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 90 | 🟢 Groen | Uniforme `data-analytics-*` attributen op alle interactieve elementen (header, footer, breadcrumbs, calculatorpagina’s, categorieën, homepage, quick-chips, toggles, selects, kopieer-link). | Er is nog geen analytics-provider aangesloten; attributen zijn klaar voor toekomstige integratie. | Nee | Koppel gewenste analytics-provider (bijv. Plausible of GA4) na launch. |

### 1.9 AdSense-ready

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 90 | 🟢 Groen | `AdSlot` component, cookie-consent banner, AdSense script injectie na consent, `adsbygoogle` pushes, ad-containers met `min-width`/`min-height`. BaseLayout injecteert AdSense script niet meer zelf; alleen `CookieConsent` laadt het na accept. | Productie-inkomsten/echte advertenties niet gevalideerd; ad-posities niet A/B-getest. | Nee | Monitor viewability, CLS, RPM en consent-rate na launch; overweeg A/B-test ad-posities. |

### 1.10 Dashboard

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 0 | 🔴 Rood | Niets. | Volledige dashboard-omgeving ontbreekt. | Ja (voor Dashboard) | Niet opnemen in 1.0; start pas ná product launch. |

### 1.11 Agents

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 0 | 🔴 Rood | Niets. | Volledige Agents-integratie ontbreekt. | Ja (voor Agents) | Niet opnemen in 1.0; roadmap-fase 2/3. |

### 1.12 Internationalisering

| Score | Status | Af | Ontbreekt | Blocker | Aanbevolen actie |
|---:|:---:|---|---|---|---|
| 0 | 🔴 Rood | Alleen Nederlands (nl-NL). | Locale-detectie, vertalingen, hreflang, landenspecifieke kennisobjecten. | Ja (voor internationale uitrol) | Niet opnemen in 1.0; start pas na product/market fit in NL. |

---

## 2. Calculator Completion Matrix

**10 unieke calculators:** Bruto netto 2026, Salaris, Vakantiegeld, Toeslagen, Hypotheek, BTW, BTW terugrekenen, BTW inclusief/exclusief, ZZP, Auto importkosten. *(De calculator hub toont 11 cards omdat Auto importkosten zowel onder Ondernemen als Auto staat.)*

Legenda: ✅ = af, ⚠️ = grotendeels af / kleine tekorten, ❌ = afwezig of significante tekorten.

| Calculator | App Shell | URL State | Recommendations | TrustPanel | Sources | FAQ | Schema | Breadcrumbs | Analytics | A11y ≥95 | Lighthouse | Content | Interne links |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bruto netto 2026 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Salaris | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Vakantiegeld | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Toeslagen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Hypotheek | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| BTW | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| BTW terugrekenen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| BTW inclusief/exclusief | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ZZP | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Auto importkosten | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Matrix totaal:** 140/140 ✅.

---

## 3. P0 / P1 / P2 backlog

### P0 — Nodig voor Calculatieloket 1.0

| # | Item | Status | Motivatie |
|---|---|---|---|
| 1 | Alle 13 publieke pagina’s halen Lighthouse drempels | ✅ Af | Lokale meting bevestigt; productieverificatie na launch. |
| 2 | `npm run atlas:check` groen | ✅ Af | 219 tests, 23 pagina’s, 0 TS-fouten. |
| 3 | Content Quality Standard op alle publieke pagina’s | ✅ Af | 10 calculators + hub + categorieën + statische pagina’s. |
| 4 | Trust system op alle calculators | ✅ Af | TrustPanel + bronnen + disclaimers. |
| 5 | Analytics-ready markup | ✅ Af | `data-analytics-*` attributen overal. |
| 6 | AdSense-integratie technisch werken | ✅ Af | Script, cookie consent, ad-containers; productieverificatie na launch. |
| 7 | Navigatie consistent over alle pagina’s | ✅ Af | Header, footer, breadcrumbs, hub. |

**P0 conclusie:** 7/7 af. Calculatieloket 1.0 kan technisch gelanceerd worden.

### P1 — Kort na 1.0

| # | Item | Motivatie |
|---|---|---|
| 1 | OG-image optimaliseren naar 1200×630 | Betere social previews. |
| 2 | Productie Lighthouse baseline meten met AdSense | Valideer echte performance en accessibility. |
| 3 | AdSense A/B-test: posities en formaten | Data-gedreven afweging inkomsten vs UX. |
| 4 | Resultaat-label contrast uniform aanpakken | Extra marge boven 95 op accessibility. |
| 5 | Analytics-provider aansluiten | Converteer attributen naar daadwerkelijke events. |
| 6 | Mobiele sticky result hero evalueren | Hoge conversie-impact indien bewezen. |

### P2 — Later (na stabiele 1.0)

| # | Item | Motivatie |
|---|---|---|
| 1 | Dashboard voor gebruikers | Roadmap-fase 2. |
| 2 | FiscalMesh Agents | Roadmap-fase 3. |
| 3 | Internationale uitrol (nl-BE, daarna meer landen) | Roadmap-fase 4. |
| 4 | Gebruikersbeoordelingen / sociale proof | Conversieverhoging; juridisch/privacy check nodig. |
| 5 | Scenario slider / visuele belastingverdeling | Engagement en differentiatie. |

---

## 4. Duidelijk oordeel

### Is Calculatieloket technisch klaar voor 1.0?

**Ja.** Alle P0-items zijn af. De lokale build is stabiel, tests slagen, Lighthouse drempels worden gehaald, AdSense-integratie is technisch voorbereid. Het enige voorbehoud is dat productieprestatie met echte advertenties nog gemonitord moet worden; dit is geen blocker voor launch, maar wel een P1-actie direct na launch.

### Is Calculatieloket productmatig klaar voor 1.0?

**Ja.** De gebruikersreis is compleet: homepage → hub/categorie → calculator → resultaat → gerelateerde calculators/vervolgstappen. Content, trust, SEO, accessibility en analytics-ready markup zijn overal aanwezig. Er zijn geen functionele gaten meer.

### Wat moet nog vóór Dashboard / Agents?

**Niets.** Dashboard, Agents en internationalisering zijn expliciet buiten de scope van Calculatieloket 1.0. Zij vormen de volgende fases van de roadmap (zie `docs/product/00-FISCALMESH-PRODUCT-ROADMAP.md`).

---

## 5. Advies Sprint 112

**Thema:** *Production Readiness & Verification* — de laatste niet-blokkerende verfijningen en een formele 1.0-readiness check.

**Voorgestelde acties:**

1. **OG-image optimaliseren** (P1)
   - Maak `logo_Calculatieloket-og.png` 1200×630, WebP/PNG, < 200 KB.
   - Werk `BaseLayout.astro` OG-tags bij indien nodig.

2. **Productie Lighthouse baseline** (P1)
   - Draai `npm run audit:lighthouse` tegen productie-build met AdSense uitgeschakeld vs ingeschakeld.
   - Documenteer delta in `docs/product/17-LIGHTHOUSE-CORE-WEB-VITALS-v1.md`.

3. **AdSense final check** (P0/P1)
   - Verifieer dat `PUBLIC_ADS_ENABLED=true` correct injecteert, cookie consent werkt, en advertenties renderen.
   - Controleer CLS en viewability in Chrome DevTools.

4. **Release-tag voorbereiden** (P0)
   - Maak een `v1.0.0` tag of equivalente milestone in GitHub.
   - Update `AGENTS.md` en relevante docs met “Product Completion 1.0” status.

5. **Board afsluiten** (P0)
   - Verplaats `18-PRODUCT-COMPLETION-BOARD-v1.md` status naar “1.0 Ready”.
   - Archiveer P0-items; promoveer P1-items naar actieve backlog.

**Aanbeveling:** Sprint 112 als laatste documentatie- en verificatiesprint inzetten. Geen nieuwe features, geen engines, geen deploy. Einddoel: een geverifieerde, getagde 1.0-ready state.

---

## 6. Definition of Done Sprint 111

- [x] Nieuw document `docs/product/18-PRODUCT-COMPLETION-BOARD-v1.md` aangemaakt.
- [x] Domeinstatussen opgenomen met score, status, af/ontbreekt, blocker en aanbevolen actie.
- [x] Calculator Completion Matrix voor alle 10 unieke calculators.
- [x] P0/P1/P2 backlog opgenomen.
- [x] Duidelijk oordeel over technische en productmatige 1.0-readiness.
- [x] Advies voor Sprint 112 gegeven.
- [x] `docs/product/10-PRODUCT-POLISH-BACKLOG.md` bijgewerkt.
- [x] `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt.
- [x] `npm run atlas:check` slaagt.
- [x] Geen code-wijzigingen, geen dependencies, geen deploy.

---

> **Laatst bijgewerkt:** 2026-07-03
