# AGENTS.md — Calculatieloket.nl

Dit document is de single source of truth voor agenten die aan calculatieloket.nl werken. Lees dit eerst voordat je wijzigingen doet.

## Stack

- **Astro 6** — static site generation, output naar `dist/`
- **No UI framework** — vanilla HTML/CSS/JS in `.astro` files
- **Node >= 22.12.0**
- **Cloudflare Pages** — hosting via Wrangler
- **GitHub** — source control, PR workflow, Atlas CI checks

## Commands

```bash
npm run dev          # local dev server (geen ads)
npm run build        # static build → dist/
npm run preview      # preview built dist/

# Atlas CI checks (moeten allemaal groen zijn voor merge)
npm run build
npm run audit:content
npm run test
npm run atlas:check

# Deploy (vereist `npx wrangler login`)
npx wrangler pages deploy dist --project-name=calculatieloket --branch=main
```

## Git workflow

`main` is protected. Alles gaat via een PR die groen Atlas CI moet halen.

### Standaard workflow

```bash
git checkout main
git pull origin main
git checkout -b feature/korte-omschrijving
# maak wijzigingen
npm run build
npm run audit:content
npm run test
npm run atlas:check
git add -A
git commit -m "feat: korte omschrijving"
git push origin feature/korte-omschrijving
gh pr create --title "feat: korte omschrijving" --body "Uitleg" --base main
# merge via GitHub na groen CI
```

### Autonomous cluster-sprint model

De eigenaar heeft aangegeven dat content- en calculator-clusters autonoom mogen worden gebouwd, met periodieke reviews. Dit geldt voor clusters binnen bestaande categorieën (BTW, Inkomen, ZZP, Toeslagen, Hypotheek, etc.).

Risicovolle wijzigingen vereisen **altijd** expliciete approval:
- Calculator logica
- Fiscale parameters (tarieven, heffingskortingen, grenzen)
- Nieuwe categorieën
- AdSense code
- Internationale expansie
- Grote wijzigingen in architectuur

## Atlas CI checks

Elke PR moet deze vier checks passeren:

1. `npm run build` — Astro build naar `dist/`, geen build errors
2. `npm run audit:content` — content-safety audit, controleert op hard claims
3. `npm run test` — vitest tests (unit + search tests)
4. `npm run atlas:check` — combineert bovenstaande checks

## Content-safety regels

De `audit:content` check faalt bij hard claims. Vermijd:

- "je hebt recht op"
- "exact"
- "garantie"
- Andere absolute financiële claims

Gebruik in plaats daarvan indicatief taalgebruik:
- "je kunt mogelijk recht hebben op"
- "indicatie"
- "circa"
- "richtlijn"

Voor hypotheekpagina's: altijd verwijzen naar een erkend hypotheekadviseur, geen persoonlijk advies geven.

## Architecture

```
src/
  pages/                        # Statische pagina's
    index.astro                 # Homepage
    calculators.astro           # Overzicht calculators
    btw-calculator.astro        # BTW calculator (bestaand)
    btw-*.astro                 # BTW cluster pagina's
    bruto-netto-2026.astro      # Inkomen cluster (bestaand)
    nettoloon-2026.astro        # Inkomen cluster (nieuw)
    salaris-2026-berekenen.astro
    loonheffing-berekenen-2026.astro
    bruto-netto-berekenen-2026.astro
    salaris-calculator.astro
    vakantiegeld-calculator.astro
    zzp-calculator.astro        # ZZP cluster (bestaand)
    zzp-*.astro                 # ZZP cluster pagina's
    toeslagen-calculator.astro  # Toeslagen cluster (bestaand)
    huurtoeslag-berekenen.astro
    zorgtoeslag-berekenen.astro
    kindgebonden-budget-berekenen.astro
    toeslagen-2026.astro
    hypotheek-calculator.astro  # Hypotheek cluster (bestaand)
    hypotheek-*.astro
    maximale-hypotheek-berekenen.astro
    hypotheek-maandlasten-berekenen.astro
    hypotheek-rente-berekenen.astro
    hypotheek-2026.astro
    auto-importkosten-berekenen.astro
    categorie/
      inkomen.astro
      wonen.astro
      belasting.astro
      ondernemen.astro
      auto.astro
  layouts/
    BaseLayout.astro            # Shared shell: meta, header, nav, footer, ads
  components/
    calculator/
      BtwCalculatorPage.astro   # Herbruikbaar voor BTW cluster
      IncomeCalculatorPage.astro # Herbruikbaar voor Inkomen cluster
      ContentHubPage.astro      # Herbruikbaar voor content-only clusters
      CalculatorShell.astro
      InputPanel.astro
      ResultPanel.astro
      FaqAccordion.astro
      UseCasesPanel.astro
      CrossSellCards.astro
      TrustPanel.astro
      ToolFooter.astro
      SourceCards.astro
      HowToSchema.astro
      InlineSources.astro
      FinancialJourney.astro
    AdSlot.astro                # Handmatige AdSense placement
    Breadcrumbs.astro
    CookieConsent.astro         # GDPR banner — laadt AdSense na consent
    CrossSellCards.astro
    SourceCards.astro
  lib/
    calculators/
      registry.ts               # Single source of truth voor alle calculators
      tax.ts                    # Bruto-netto logica
      btw.ts                    # BTW logica
    category-icons.ts           # SVG iconen per category
    search-index.ts             # Zoekindex op basis van registry
    recommendations/            # Recommendation engine
    format/                     # Format helpers (currency, template)
  styles/
    global.css                  # Alle CSS via custom properties
public/
  favicon.svg
  favicon.ico
  logo-calculatieloket-header.png
  logo_Calculatieloket-og.png
  robots.txt
```

## Reusable components

### BtwCalculatorPage

Gebruik voor nieuwe BTW-gerelateerde pagina's. Accepteert props voor titel, description, tarief, FAQ, etc.

### IncomeCalculatorPage

Gebruik voor inkomen-gerelateerde pagina's. Bevat de bruto-netto calculator met pensioen en loonheffingskorting.

### ContentHubPage

Gebruik voor content-heavy pagina's zonder eigen calculator (bijv. ZZP, Toeslagen, Hypotheek hubs). Bevat content slot, FAQ, bronnen, cross-sell en CTA naar bestaande calculator.

## Nieuwe pagina's toevoegen

1. **Bepaal het cluster** en kies de juiste reusable component.
2. **Maak de pagina** in `src/pages/`.
3. **Voeg toe aan registry** in `src/lib/calculators/registry.ts`.
   - Unieke `id` en `slug`
   - Correcte `category`
   - `keywords` en `intents` voor zoeken
   - `isNew: true`, `badge: "Nieuw"` indien van toepassing
   - `status: "active"`
4. **Voeg icoon toe** in `src/lib/category-icons.ts` als je een nieuw `iconKey` gebruikt.
5. **Update zoektest** in `tests/search/search.test.ts` als het aantal resultaten of volgorde verandert.
6. **Run alle Atlas checks**.
7. **PR → merge → deploy**.

## Search Console workflow

Na elke deploy met nieuwe pagina's:

1. Submit de sitemap opnieuw in Google Search Console:
   - URL: `https://calculatieloket.nl/sitemap-index.xml`
2. Wacht 24–72 uur op verwerking.
3. Monitor "Discovered URLs" en "Indexed URLs".
4. Rapporteer wekelijks over vertoningen, posities en klikken.

## Environment

`.env` (gitignored):

```
PUBLIC_ADSENSE_ID=ca-pub-6003900314370739
PUBLIC_ADS_ENABLED=true
```

- `PUBLIC_ADS_ENABLED=false` tijdens development — voorkomt ads en cookie banner.
- Build met `true` voor productie deploys.

## Critical gotchas

- **Navigatie dropdowns**: gebruik altijd `<script is:inline>` voor globale layout-scripts zoals de navigatie. Gewone `<script>` tags worden door Astro als deferred modules behandeld, waardoor click handlers niet direct beschikbaar zijn.
- **Disk space**: build hangt stil bij volle schijf (ENOSPC). Check met `df -h`.
- **shiki module missing**: verwijder `node_modules` en installeer opnieuw.
- **Ads loaden pas na cookie consent**: CookieConsent component blokkeert AdSense tot acceptatie.
- **Calculator logic is client-side vanilla JS**. Scripts voor calculators staan inline in de pagina's of componenten.
- **Audit faalt bij hard claims**: vermijd "recht op", "exact", "garantie" in nieuwe content.
- **Sitemap count**: de build toont 45 pagina's, de sitemap bevat 44 (demo pagina wordt uitgesloten). Dat is correct.
- **Google Search Console cache**: na deploy kan het 24–72 uur duren voordat Search Console de nieuwe sitemap verwerkt. Laatste read date in GSC is de beste indicator.

## Dutch-specific details

- Taal: Nederlands (`lang="nl"`)
- Valuta formatting: € 1.234,56 (comma decimalen, punt duizendtallen)
- 2026 Box 1 tarieven: 35,75% / 37,56% / 49,50%
- Algemene heffingskorting max: € 3.115
- Arbeidskorting max: € 5.685
- Vakantiegeld: 8% van bruto jaarsalaris
- Domein: `https://calculatieloket.nl`
- Officiële bronnen: Belastingdienst, Rijksoverheid, Dienst Toeslagen, AFM, NHG, KVK

## Deployment

1. Zorg dat alle Atlas CI checks groen zijn.
2. Merge de PR naar `main`.
3. Checkout `main` en pull.
4. Run `npm run build`.
5. Run `npx wrangler pages deploy dist --project-name=calculatieloket --branch=main`.
6. Check productie-URL's (HTTP 200).
7. Submit sitemap in Google Search Console.

## AdSense

- AdSense review kan lopen. Deploys van content-only wijzigingen zijn veilig.
- Geen wijzigingen aan AdSense code zonder expliciete approval.
- `PUBLIC_ADS_ENABLED=false` in development om advertenties te onderdrukken.
