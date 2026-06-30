# 03 — Development Standards

> **Doel:** Technische spelregels voor alle ontwikkeling aan Calculatieloket.nl.  
> **Status:** Live — elke developer en AI-assistent moet deze volgen.  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Architectuurprincipes](#architectuurprincipes)
2. [Stack en tooling](#stack-en-tooling)
3. [Projectstructuur](#projectstructuur)
4. [Codeerstijl](#codeerstijl)
5. [Calculatorlogica](#calculatorlogica)
6. [Styling](#styling)
7. [SEO en performance](#seo-en-performance)
8. [Privacy en data](#privacy-en-data)
9. [Build en deploy](#build-en-deploy)
10. [Wijzigen van de site](#wijzigen-van-de-site)
11. [AI-assistent regels](#ai-assistent-regels)

---

## Architectuurprincipes

| Principe | Regel |
|----------|-------|
| **Static-first** | De site is volledig statisch (Astro `output: "static"`). Geen SSR, geen Node-server in productie. |
| **Vanilla JS** | Calculatorlogica is pure TypeScript/JavaScript in `<script>`-tags. Geen React, Vue, Svelte, of andere UI-frameworks. |
| **Geen onnodige libraries** | Alleen `astro` en `@astrojs/sitemap` in `dependencies`. Geen jQuery, Lodash, Moment, Bootstrap, Tailwind. |
| **CSS-only design-system** | Alle stijl via CSS custom properties in `src/styles/global.css`. Geen CSS-in-JS, geen Tailwind. |
| **Geen database** | Er is geen backend, geen database, geen API. |
| **Client-side berekeningen** | Alle rekenwerk gebeurt in de browser. Geen server-side formules. |
| **Privacy-first** | Geen invoeropslag, geen cookies voor calculator-data, geen tracking zonder expliciete opdracht. |

## Stack en tooling

| Laag | Technologie | Locatie |
|------|------------|---------|
| Framework | Astro 6 (static) | `astro.config.mjs` |
| Runtime | Node ≥ 22.12.0 | `.nvmrc`, `package.json/engines` |
| Hosting | Cloudflare Pages | `wrangler.toml` (n.v.t., via CLI) |
| Sitemap | `@astrojs/sitemap` | `astro.config.mjs` |
| Build | `astro build` → `dist/` | `package.json/scripts` |
| Preview | `astro preview` (sirv op `dist/`) | poort 4321 |
| Deploy | `wrangler pages deploy dist --project-name=calculatieloket` | CLI |
| CSS | Vanilla `.css` met custom properties | `src/styles/global.css` |
| TypeScript | Inline in `.astro`-bestanden | `src/pages/*.astro` (`<script>`) |

## Projectstructuur

```
src/
  pages/          # 15 .astro pagina's (1 per route)
    _bak/         # underscore-prefixed → niet gebouwd
  layouts/
    BaseLayout.astro  # shell: <head>, header, footer, slot
  components/
    AdSlot.astro       # AdSense placeholder
    CookieConsent.astro # GDPR banner
    CrossSellCards.astro # moderne cross-sell cards
    SourceCards.astro    # bron-cards (officiële bronnen)
  styles/
    global.css      # volledig design-system (672 lijnen)
public/             # statische assets (robots.txt, logo, favicon, ads.txt)
dist/               # build-output (git-ignored)
docs/               # Project Atlas documentatie
```

## Codeerstijl

- **Indentatie:** 2 spaties (consistent met Astro defaults).
- **Bestandsnamen:** kebab-case, trailing slash in interne links (bv. `/btw-calculator/`).
- **Imports:** Astro-componenten via relatieve paden: `import X from "../components/X.astro"`.
- **Geen ongebruikte imports** — elke import moet actief gebruikt worden in de template.
- **`<style>`-blokken:** per pagina voor lokale overschrijvingen. Globale styling uitsluitend in `global.css`.
- **`<script>`-blokken:** TypeScript (`as`-casts, type-annotaties). Geen `any` tenzij onvermijdelijk.
- **HTML:** semantisch (`<h1>`-`<h3>`, `<ul>`/`<ol>`, `<p>`). Geen `<div>`-soep.
- **Geen inline styles** (behalve `style="display:none"` voor initiële verberging). Gebruik classes.

## Calculatorlogica

### Huidige architectuur
Elke calculator heeft een **inline `<script>`** met:
- `formatEuro(n)` — uniforme euro-notatie (`€ 1.234,56`)
- `calculate()` — de hoofdformule
- Event listeners op `input`/`change`/`click`
- Optioneel: `berekenBelasting()`, `berekenAHK()`, `berekenAK()` (gedupliceerd over salaris/bruto-netto/zzp)

### Toekomst: shared utilities
Zodra het project uit iCloud is en `git` actief is, verplaats gedeelde logica naar:

```
src/lib/
  format.ts      # formatEuro, formatNumber
  tax.ts         # berekenBelasting, berekenAHK, berekenAK (Box 1, 2026)
  btw.ts         # btw-excl-naar-incl, btw-incl-naar-excl
  mortgage.ts    # annuïtaire-formule
```

Importeer deze in pagina-scripts via `<script>` dat de functies aanroept — Astro bundelt de imports.

### Regels voor calculator-scripts

- **Geen invoeropslag** — geen `localStorage`, geen `fetch`, geen `form.submit`.
- **Alle IDs behouden** — wijzig geen `id`-attributen zonder de bijbehorende `<script>`-referenties bij te werken.
- **Resultaat altijd indicatief** — voeg altijd een `result-note` "Deze berekening is een indicatie." toe.
- **Foutafhandeling:** toon een `.calc-error`-element bij ongeldige invoer; verberg of reset het resultaat.
- **Geen automatische BPM** — BPM blijft handmatig invulveld; verwijs naar de Belastingdienst-tool.
- **Geen "je hebt recht op"** — alle uitkomsten zijn indicaties.

## Styling

### Design-system (global.css)

Alle gedeelde stijl staat in `src/styles/global.css`, geïmporteerd via `<style is:global>` in `BaseLayout.astro`. De file bevat:
- **CSS custom properties** (`:root` — kleuren, radius, shadow, spacing)
- **Basisklassen:** `.calculator-card`, `.form-group`, `input`/`select`, `.input-prefix` (€), `.input-suffix` (%), `.radio-group`, `.toggle`, `.result-box`, `.btn`
- **Moderne laag:** `.calc-modern` en afgeleiden (`.calc-fields`, `.calc-group-title`, `.calc-btn`, `.calc-error`, `.result-note`, `.badge-indicatie`)

### Nieuwe styling toevoegen

1. **Gedeelde stijl** → `global.css` (onder de juiste sectie).
2. **Paginagebonden stijl** → `<style>` in het `.astro`-bestand (alleen als het écht paginaspecifiek is).
3. **Componentstijl** → `<style>` in het component (zoals CrossSellCards/SourceCards doen).
4. **Nooit** inline styles toevoegen behalve voor initiële `display:none`.

### CSS scoping-regel
`global.css` is **ongescopet** door `<style is:global>`. Dit is een bewuste fix — verander dit niet terug naar scoped, want dan breekt alle stijl op child-pagina's.

## SEO en performance

| Eisen | Hoe |
|-------|-----|
| `title` + `meta description` | Verplicht per pagina via `BaseLayout` props |
| `<link rel="canonical">` | Automatisch via `Astro.url.pathname` |
| `sitemap-index.xml` | Automatisch via `@astrojs/sitemap` |
| `robots.txt` | Statisch in `public/`, verwijst naar sitemap |
| JSON-LD (`WebSite`) | In BaseLayout, `set:html={JSON.stringify(jsonLd)}` — geen literal `JSON.stringify` in output |
| Staging-noindex | Conditioneel `<script is:inline>` die `noindex` injecteert op `*.pages.dev` |
| Performance | Static HTML, minimale JS, geen runtime-framework |
| Afbeeldingen | Logo als PNG, favicon als SVG+ICO |
| Lighthouse-target | ≥ 95 Performance, ≥ 100 SEO |

## Privacy en data

| Wat | Regel |
|-----|-------|
| Calculatorinvoer | **Nooit** opslaan (geen `localStorage`, `fetch`, `POST`) |
| Datahergebruik (toekomst) | Alleen via query parameters of `localStorage` na **expliciete opt-in** |
| Cookies | Alleen AdSense (na CookieConsent). Geen tracking-cookies. |
| Persoonsgegevens | Worden niet gevraagd. Geen naam, e-mail, BSN, adres. |
| `.env` | Alleen `PUBLIC_ADSENSE_ID` en `PUBLIC_ADS_ENABLED`. Git-ignored. |
| Secrets/tokens | Nooit in code, nooit in `public/`, nooit in `dist/`. Gebruik env-vars en `.gitignore`. |

## Build en deploy

```bash
# Lokaal ontwikkelen (zonder ads)
npm run dev          # http://localhost:4321

# Build (schrijft naar dist/)
npm run build        # verifieer altijd: 15 pagina's, sitemap 15 URLs

# Preview
npm run preview      # serveert dist/ statisch

# Deploy (alleen na akkoord van Barry)
npx wrangler pages deploy dist --project-name=calculatieloket
```

**Let op:**
- **Geen `npm ci`** zolang het project in iCloud Drive staat (duplicaatmappen in `node_modules`).
- **Geen `rm -rf node_modules`** — risico op timeout door iCloud-sync.
- Gebruik `npm run build` op de bestaande werkende installatie.
- Als `npm install` nodig is (bv. voor een nieuwe dependency), verplaats het project eerst uit iCloud.

## Wijzigen van de site

| Actie | Vereist |
|-------|---------|
| Nieuwe pagina | Nieuwe `.astro` in `src/pages/` + vermelding in `calculators.yml` (indien calculator) |
| Nieuwe component | `.astro` in `src/components/`, gedocumenteerd in `04-COMPONENT-LIBRARY.md` |
| CSS-wijziging | `src/styles/global.css` of pagina/component `<style>` |
| Calculatorlogica wijzigen | **Niet doen zonder expliciete opdracht** — formules zijn getest en goedgekeurd |
| Deploy | **Alleen met akkoord van Barry** — nooit op eigen initiatief |
| `.env` wijzigen | **Nooit** — enkel Barry beheert de productie `.env` |

**Vóór afronding van elke taak:**
- `npm run build` moet slagen met **15 pagina's**.
- Geen nieuwe TypeScript/console errors.
- Sitemap bevat **15 HTTPS-URL's**.
- Geen hardcoded `noindex` in productie-HTML.
- `pages.dev`-staging-noindex-script intact.
- Claims-check: geen verboden termen in actieve `src/pages/`.

## AI-assistent regels

Deze regels gelden voor Opencode, Kimi, Claude of elke andere AI-assistent:

1. **Geen live deploy zonder "Barry akkoord" in de opdracht.**
2. **Wijzig nooit calculatorformules** tenzij expliciet gevraagd.
3. **Voeg nooit "exact", "gegarandeerd", "100% zeker", "je hebt recht op", "definitieve bpm/kosten", "je bespaart altijd" toe** aan content of resultaten.
4. **Gebruik `npm run build`** — geen `npm ci`/`rm -rf` tenzij het project uit iCloud is.
5. **Controleer na elke build:** 15 pagina's, sitemap 15 URLs, geen noindex.
6. **Rapporteer altijd** wat er gewijzigd is, wat de build-status is en of er een deploy nodig is.
7. **Houd de changelog** (`05_changelog.md`) bij — voeg een entry toe bij elke live deploy.
8. **Gebruik trailing slashes** in alle interne links.
9. **Geen `_bak/`-links** — die map bouwt niet mee.
10. **Geen nested `<a>`** — elke link is één `<a>`-element.
