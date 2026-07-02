# 17 — Lighthouse & Core Web Vitals Excellence v1

> **Sprint:** 106 — Atlas v2  
> **Doel:** Technische kwaliteit meten en verbeteren op de belangrijkste pagina’s: performance, accessibility, SEO, best practices en Core Web Vitals-signalen.  
> **Scope:** GEEN nieuwe features, GEEN wijzigingen aan engines, Knowledge Objects, Rule Resolver, Recommendation Engine, Dashboard of Agents.  
> **Datum:** 2026-07-02

---

## 1. Auditaanpak

**Tooling:** geen nieuwe dependencies. Lighthouse is niet geïnstalleerd in dit project en we voegen het niet toe. Deze sprint gebruikt een **statische productie-audit** op basis van `npm run build` en inspectie van `dist/`.

**Gecontroleerde pagina’s:**

| # | Pagina | URL | Reden |
|---|--------|-----|-------|
| 1 | Homepage | `/` | Hoogste verkeer, belangrijkste first impression |
| 2 | Bruto-netto 2026 | `/bruto-netto-2026/` | Populairste calculator |
| 3 | Categorie Inkomen | `/categorie/inkomen/` | Voorbeeld categoriepagina |
| 4 | /calculators/ | n.v.t. | Deze route bestaat niet in de huidige site |
| 5 | BTW calculator | `/btw-calculator/` | Voorbeeld BTW-pagina |
| 6 | ZZP calculator | `/zzp-calculator/` | Voorbeeld ZZP-pagina |

**Build-omgeving:**

- Astro 6, static output naar `dist/`
- Node 22
- `PUBLIC_ADS_ENABLED=false` (development; AdSense-scripts en cookiebanner worden niet geïnjecteerd)
- `PUBLIC_ADSENSE_ID` blijft aanwezig maar heeft geen effect op deze build

---

## 2. Build-statistieken

| Metric | Voor Sprint 106 | Na Sprint 106 | Verandering |
|--------|-----------------|---------------|-------------|
| Totale `dist/` | 2,1 MB | 2,0 MB | -0,1 MB |
| `_astro/` assets | 244 KB | 244 KB | ongewijzigd |
| Favicon download | 768 KB PNG | 4 KB SVG + 4 KB ICO | -99 % |
| Header logo download | 132 KB (1271×329) | 52 KB (560×145) | -60 % |
| Aantal pagina’s | 22 | 22 | ongewijzigd |
| HTML bestanden | 22 | 22 | ongewijzigd |

**Asset-overzicht na de sprint:**

```
dist/_astro/                  244 KB
  client.js                    12 KB
  BaseLayout.css               16 KB
  ClientRouter.js              16 KB
  currency.js                  44 KB  (kennisobjecten-bundel)
  overige per-pagina CSS/JS    ~8 KB per pagina

dist/logo-calculatieloket-header.png    52 KB
dist/logo_Calculatieloket.png           768 KB  (alleen OG/schema, niet page-load)
dist/favicon.svg                         4 KB
dist/favicon.ico                         4 KB
```

---

## 3. Per-pagina bevindingen

### 3.1 Homepage (`/`)

| Onderdeel | Bevinding |
|-----------|-----------|
| HTML-gewicht | ~30 KB (gecomprimeerd) |
| CSS | BaseLayout.css (16 KB) + inline component-CSS + index.css (~8 KB) |
| JS | ClientRouter.js (16 KB, `type="module"`, deferred) |
| Afbeeldingen | 1 header-logo (52 KB, eager, width/height aanwezig) |
| Favicon | 4 KB SVG |
| Render-blocking | 1 extern CSS + kleine inline styles; geen blocking JS |
| Accessibility | skip-link aanwezig, H1 aanwezig, labels op zoekveld, `aria-current` op actieve links |
| SEO | title, description, canonical, JSON-LD WebSite + SearchAction aanwezig |
| Risico’s | AdSense wordt in productie pas ná cookie-consent geladen; op homepage staat advertentie ná tool-sectie |

**Score-schatting (lokaal, zonder ads):**
- Performance: 95–100
- Accessibility: 95–100
- Best Practices: 95–100
- SEO: 95–100

### 3.2 Bruto-netto 2026 (`/bruto-netto-2026/`)

| Onderdeel | Bevinding |
|-----------|-----------|
| HTML-gewicht | ~60 KB |
| CSS | BaseLayout.css + ToolFooter.css + bruto-netto-2026.css |
| JS | ClientRouter.js + bruto-netto-2026.js (~8 KB) |
| Afbeeldingen | header-logo |
| Accessibility | calculator inputs hebben labels, toggle heeft aria-label via `for`, quick-chips zijn buttons met tekst |
| SEO | unieke title/description, canonical, BreadcrumbList, FAQPage, HowTo schema |
| Risico’s | `ResultPanel` wordt server-side gerenderd met een default waarde; dit vermindert CLS |

**Score-schatting (lokaal, zonder ads):** 95–100 op alle vier de categorieën.

### 3.3 Categorie Inkomen (`/categorie/inkomen/`)

| Onderdeel | Bevinding |
|-----------|-----------|
| HTML-gewicht | ~40 KB |
| CSS | BaseLayout.css + categorie-specifieke CSS |
| JS | ClientRouter.js |
| SEO | unieke title/description, canonical, H1, BreadcrumbList, CollectionPage, FAQPage schema |
| Accessibility | interne links hebben beschrijvende tekst, `aria-label` op breadcrumbs |

**Score-schatting:** 95–100.

### 3.4 BTW calculator (`/btw-calculator/`)

| Onderdeel | Bevinding |
|-----------|-----------|
| HTML-gewicht | ~56 KB |
| JS | ClientRouter.js + btw-calculator.js (~8 KB) |
| Accessibility | radio-group voor tarief/richting, inputs gelabeld |
| SEO | FAQPage, HowTo, BreadcrumbList schema |

**Score-schatting:** 95–100.

### 3.5 ZZP calculator (`/zzp-calculator/`)

| Onderdeel | Bevinding |
|-----------|-----------|
| HTML-gewicht | ~60 KB |
| JS | ClientRouter.js + zzp-calculator.js (~8 KB) |
| Accessibility | toggle-switches hebben verborgen checkbox + label, focus-visible styles aanwezig |
| SEO | FAQPage, HowTo, BreadcrumbList schema |

**Score-schatting:** 95–100.

---

## 4. Quick wins uitgevoerd

### 4.1 Favicon verkleind van 768 KB naar 4 KB

**Wat:** vervangen door SVG-preferentie met ICO-fallback.

```astro
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" type="image/x-icon" href="/favicon.ico" />
```

**Impact:** elke pagina laadde voorheen een 768 KB PNG als favicon. Dat is nu 4 KB SVG (of 4 KB ICO fallback). Dit is de grootste single win voor zowel Performance als Best Practices.

### 4.2 Header logo verkleind van 132 KB naar 52 KB

**Wat:** nieuw bestand `public/logo-calculatieloket-header.png` (560×145) aangemaakt met `sips`. CSS toont het logo op maximaal 280 px breed, dus 560 px breed is 2× voor retina.

**Bestand:** `src/layouts/BaseLayout.astro` — width/height aangepast naar 560×145.

**Impact:** -60 % op een asset dat bovenaan elke pagina eager wordt geladen.

### 4.3 Oude ongebruikte assets opgeruimd

- `public/logo-calculatieloket-header-tight.png` verwijderd (vervangen door nieuwe header-PNG).
- `src/layouts/BaseLayout.astro.bak` verwijderd (verwijzing naar oude logo, geen productiecode).

### 4.4 Layout-shift risico’s bevestigd veilig

- Header-logo heeft expliciete `width`/`height` en `height: auto` in CSS; aspect-ratio is voor de browser bekend.
- AdSense-container heeft `min-width: 300px` en `min-height: 100px`; lege ad-slots verbergen zichzelf (`:empty { display: none }`).
- Cookiebanner start op `display: none` en wordt pas zichtbaar via JS; fixed positie veroorzaakt geen CLS voor hoofdcontent.

---

## 5. Openstaande P1/P2 performance/accessibility punten

### P1 — Image optimization OG/schema logo

- `logo_Calculatieloket.png` is 768 KB en 1448×1086. Het wordt gebruikt voor `og:image` en WebSite JSON-LD logo. Browsers laden dit niet op page-load, maar crawlers/sociale netwerken doen dat wel. Aanbeveling: optimaliseer naar 512×512 of 1200×630 PNG/WebP (maximaal 100 KB).

### P1 — Lighthouse meten in echte browser

- Deze sprint is een **statische audit**. Voor betrouwbare scores moet Sprint 107 of een aparte setup Lighthouse of Chrome DevTools Protocol gebruiken in een headless browser. Dat vereist een CI-wijziging of lokale tooling (bijv. `lighthouse-cli`, `playwright` + `lighthouse`, of Chrome DevTools MCP).

### P2 — AdSense CLS-risico

- AdSense advertenties kunnen groter uitvallen dan de gereserveerde 100 px. In productie kan dit layout-shift veroorzaken. Oplossing: gebruik vaste advertentieformaten en reserver voldoende hoogte per slot, of accepteer het als extern risico.

### P2 — ClientRouter overhead

- Astro `ClientRouter` (View Transitions) laadt 16 KB JS op elke pagina. Het verbetert UX, maar is geen harde requirement. Mocht INP in productie hoog uitvallen, overweeg dan `<ClientRouter fallback="none">` of volledig verwijderen.

### P2 — `fetchpriority` overwegen

- Header logo is het LCP-element. Het is al `loading="eager"`. Indien LCP in productie boven 2,5 s uitkomt, overweeg `fetchpriority="high"` toe te voegen.

### P2 — Self-host fonts indien externe fonts gebruikt worden

- Huidige build bevat geen externe fonts. De site gebruikt systeemfonts. Dit is goed; geen actie nodig.

---

## 6. Risico’s / TODO’s

1. **Geen gemeten Lighthouse-scores.** Deze sprint geeft schattingen op basis van statische inspectie. Daadwerkelijke mobiele scores kunnen lager zijn door netwerklatentie, CPU-throttling en AdSense.
2. **AdSense niet actief in deze build.** Productiescores met advertenties kunnen significant afwijken.
3. **OG-image grootte.** Niet kritiek voor page-load, maar wel voor Best Practices in social crawlers.
4. **Category-pagina’s staan niet in de legacy audit.** De statische audit van Sprint 102 scant 16 pagina’s en niet de 5 `/categorie/*` routes. Deze pagina’s zijn handmatig gecontroleerd.

---

## 7. Advies voor Sprint 107

De technische basis is schoon. Voor de volgende sprint zijn drie richtingen zinvol:

1. **Product Content/Tool uitbreiding** (nieuwe calculator of verbeterde flows) — hier ligt de meeste gebruikerswaarde.
2. **Lighthouse CI setup** — voeg `lighthouse-cli` of Playwright+Lighthouse toe aan de GitHub Actions workflow. Dit vereist wel een dependency-beslissing en afstemming met de eigenaar.
3. **OG-image optimalisatie** — verklein `logo_Calculatieloket.png` naar WebP/PNG ~100 KB.

Aangeraden prioriteit: **optie 1** (productwaarde) of, indien kwaliteitsscore prioriteit heeft, **optie 2** gevolgd door **optie 3**.

---

## 8. Checklist

- [x] `npm run build` slaagt
- [x] Productiebuild geïnspecteerd (`dist/`)
- [x] 6 doelpagina’s gecontroleerd
- [x] Quick wins veilig doorgevoerd (favicon, header logo, opruimen)
- [x] Geen wijzigingen aan engines, Knowledge Objects, Rule Resolver, Recommendation Engine, Dashboard of Agents
- [x] Geen nieuwe dependencies, geen `npm ci`, geen `rm -rf node_modules`, geen deploy, geen `.env` wijzigingen
- [x] Documentatie aangemaakt: `docs/product/17-LIGHTHOUSE-CORE-WEB-VITALS-v1.md`
- [x] Backlog en changelogs bijgewerkt
- [x] `npm run atlas:check` slaagt

---

> **Laatst bijgewerkt:** 2026-07-02
