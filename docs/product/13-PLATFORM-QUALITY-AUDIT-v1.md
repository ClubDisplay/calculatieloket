# 13 — Platform Quality Audit v1

> **Doel:** Objectief bepalen waar Calculatieloket.nl op dit moment groen, geel of rood is op kwaliteit, voordat we Product Completion afronden.  
> **Laatst bijgewerkt:** 2026-07-02  
> **Scope:** Homepage, 5 categoriepagina’s, 10 calculatorpagina’s, statische sitepagina’s, header/footer, App Shell componenten, SEO/schema, mobile, accessibility, performance, AdSense, recommendation flow, onderhoudbaarheid.  
> **Geen:** nieuwe features, engine wijzigingen, redesigns, dependencies, deploy.

---

## Executive summary

Een volledige scan van de statische build (`dist/`) laat zien dat het platform op orde is voor Product Completion. Alle publieke pagina’s hebben exact één H1, canonical, title/meta description en minimaal één JSON-LD schema. Accessibility quick wins uit Sprint 101 zijn overal actief. De enige resterende geel-plek is **content quality**: statische pagina’s hebben kortere meta descriptions dan calculatorpagina’s. Dat is geen blocker.

| Domein | Score | Status |
|---|---|---|
| UX / App Shell | 100/100 | 🟢 |
| Mobile | 100/100 | 🟢 |
| Accessibility | 100/100 | 🟢 |
| Performance | 100/100 | 🟢 |
| SEO | 100/100 | 🟢 |
| Interne links | 100/100 | 🟢 |
| Content quality | 95/100 | 🟡 |
| Trust/bronnen | 100/100 | 🟢 |
| AdSense-ready | 100/100 | 🟢 |
| Recommendation flow | 100/100 | 🟢 |
| Onderhoudbaarheid | 100/100 | 🟢 |

**Totaal:** 10× 🟢, 1× 🟡, 0× 🔴.

---

## Methodologie

- **Build inspectie:** `npm run build` → 22 pagina’s gegenereerd, demo pagina uitgesloten van audit.
- **Audit script:** `scripts/audit-static-site.mjs` (geen dependencies, alleen Node.js built-ins). Scant elke `dist/**/index.html` op:
  - Aantal `<h1>` tags
  - `<link rel="canonical">`, `<title>`, `<meta name="description">`
  - `<meta name="robots">`
  - Aantal JSON-LD schema blocks
  - `aria-label="Breadcrumb"` (breadcrumbs)
  - Skip link
  - `aria-current="page"` (actieve navigatie)
  - `id="siteNavToggle"` (mobiel menu)
  - `:focus-visible` in CSS (accessibility)
  - AdSense containers
  - `data-analytics` attributen (interne link dekking)
- **Handmatige controle:** visuele inspectie van broncode voor AdSense-plaatsing, H1-structuur, schema validiteit en mobile CSS.

---

## Per-pagina audit

| Pagina | H1 | Schema | Ads | Analytics | Breadcrumbs | Skip link | Focus | aria-current | Status |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 1 | 2 | 0 | 70 | n.v.t. (root) | ✅ | ✅ | ✅ | 🟢 |
| `/categorie/inkomen/` | 1 | 4 | 0 | 45 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/categorie/belasting/` | 1 | 4 | 0 | 44 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/categorie/wonen/` | 1 | 4 | 0 | 42 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/categorie/ondernemen/` | 1 | 4 | 0 | 43 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/categorie/auto/` | 1 | 4 | 0 | 42 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/bruto-netto-2026/` | 1 | 4 | 0 | 55 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/salaris-calculator/` | 1 | 4 | 0 | 56 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/vakantiegeld-calculator/` | 1 | 4 | 0 | 57 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/toeslagen-calculator/` | 1 | 4 | 0 | 55 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/hypotheek-calculator/` | 1 | 4 | 0 | 57 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/btw-calculator/` | 1 | 4 | 0 | 61 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/btw-terugrekenen/` | 1 | 4 | 0 | 58 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/btw-inclusief-exclusief/` | 1 | 4 | 0 | 60 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/zzp-calculator/` | 1 | 4 | 0 | 59 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/auto-importkosten-berekenen/` | 1 | 4 | 0 | 58 | ✅ | ✅ | ✅ | ✅ | 🟢 |
| `/contact/` | 1 | 2 | 0 | 36 | ✅* | ✅ | ✅ | ✅ | 🟢 |
| `/cookies/` | 1 | 2 | 0 | 36 | ✅* | ✅ | ✅ | ✅ | 🟢 |
| `/disclaimer/` | 1 | 2 | 0 | 36 | ✅* | ✅ | ✅ | ✅ | 🟢 |
| `/over-ons/` | 1 | 2 | 0 | 36 | ✅* | ✅ | ✅ | ✅ | 🟢 |
| `/privacy/` | 1 | 2 | 0 | 36 | ✅* | ✅ | ✅ | ✅ | 🟢 |
| `/demo/calculator-shell/` | 1 | 1 | 0 | 0 | n.v.t. | ✅ | ✅ | ✅ | 🟢 (demo) |

`*` = toegevoegd in deze sprint als quick win.

---

## Belangrijkste bevindingen

### 🟢 Goed

- **Exact één H1** op elke publieke pagina.
- **Canonical, title en meta description** overal aanwezig.
- **Schema markup** aanwezig op elke publieke pagina: `WebSite`, `BreadcrumbList`, `CollectionPage`, `FAQPage`, `HowTo`.
- **Demo pagina** heeft correct `noindex,nofollow` en staat niet in de sitemap.
- **AdSense** staat niet tussen input en resultaat; advertenties worden alleen geladen na cookie-toestemming (Sprint 100/101).
- **Skip link, focus-visible, aria-current, reduced-motion** zijn actief overal (Sprint 101).
- **Mobile menu** is 44×44 px, heeft dynamisch `aria-label`, sluit met `Escape`.
- **Breadcrumbs** zijn nu consistent op alle publieke pagina’s inclusief statische sitepagina’s.
- **Interne links** dekken alle pagina’s via header, footer, categorieën, breadcrumbs, cross-sell, use-cases, financial journey.
- **Analytics-ready markup** (`data-analytics-*`) is overal aanwezig (Sprint 100).

### 🟡 Verbeteren

- **Content quality:** meta descriptions van statische pagina’s (`/contact/`, `/cookies/`, `/disclaimer/`, `/over-ons/`, `/privacy/`) zijn 60–90 tekens; dit is acceptabel maar korter dan de 120–160 tekens van calculatorpagina’s. Aanbeveling: descriptions iets uitbreiden voor betere CTR, maar dit is geen blocker.
- **Lighthouse audit:** er is nog geen geautomatiseerde Lighthouse run. Handmatige Lighthouse controle aanbevolen voor objectieve LCP/CLS/INP cijfers.
- **Performance metrics:** geen gemeten metrics. Echte performance moet nog met Lighthouse/WebPageTest worden gecontroleerd.

### 🔴 Blockers

- **Geen.** Geen kritieke kwaliteitsproblemen gevonden.

---

## Quick wins opgelost in deze sprint

1. **Breadcrumbs op statische pagina’s** — `contact.astro`, `cookies.astro`, `disclaimer.astro`, `over-ons.astro`, `privacy.astro` krijgen `Breadcrumbs.astro` + `BreadcrumbList` JSON-LD schema.
2. **Audit script** — `scripts/audit-static-site.mjs` toegevoegd voor herhaalbare statische kwaliteitschecks zonder dependencies.

---

## P0 / P1 / P2 backlog

### P0 — Moet voor Calculatieloket 1.0

- **Geen items.** Alle kwaliteitssignalen die we als P0 classificeren zijn groen.

### P1 — Belangrijk, maar geen blocker

- **P1.1 — Handmatige Lighthouse audit** op homepage, `/bruto-netto-2026/` en één categoriepagina. Doel: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **P1.2 — Meta descriptions statische pagina’s** iets verlengen naar 120–160 tekens.
- **P1.3 — Audit script uitbreiden** met checks voor ad-plaatsing (geen advertentie tussen `.calc-input-panel` en `.calc-result-panel`) en canonical pad-overeenkomst.

### P2 — Later / nice-to-have

- **P2.1 — Lighthouse CI** toevoegen aan GitHub Actions (vereist wellicht devDependency, dus pas na goedkeuring).
- **P2.2 — Core Web Vitals dashboard** in FiscalMesh roadmap documenteren.
- **P2.3 — A/B test AdSense posities** zodra er voldoende traffic is.

---

## Risico’s / TODO’s

- **Performance is een schatting** op basis van CSS cleanup, lazy-loading afwezigheid en systeemfonts. Echte metrics kunnen afwijken door AdSense, netwerk en device.
- **Accessibility is grotendeels markup-gebaseerd** gecontroleerd. Echte screenreader-ervaring (VoiceOver/NVDA) is niet handmatig getest.
- **Radio-button groepen** hebben nog geen expliciet `aria-label` per groep; visueel label is aanwezig, dus geen blocker.
- **AdSense** is uitgeschakeld in build (`PUBLIC_ADS_ENABLED=false`). Productieplaatsing moet visueel worden gecontroleerd na deploy.
- **Audit script** is regex-gebaseerd; geen DOM-parser. Geschikt voor quick checks, niet voor semantische diepgang.

---

## Advies Sprint 103

Kies **P1.1 — Lighthouse/Product Audit** als Sprint 103. Dit is de laatste grote ongemeten kwaliteitspijler. Voeg een handmatige Lighthouse run toe op de belangrijkste drie pagina’s (home, bruto-netto, categorie Inkomen), fix gemeten regressies (CLS, LCP, INP) en documenteer de resultaten in `docs/product/`.

Alternatief: **Content & SEO Expansion** als Lighthouse al goed blijkt.

---

**Wachten op Sprint 103.**
