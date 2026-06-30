# AGENTS.md — Calculatieloket.nl (Boring Websites)

## Stack
- **Astro 6** (static output to `dist/`)
- **No UI framework** — vanilla HTML/CSS/JS in `.astro` files
- **Node >= 22.12.0**

## Commands

```bash
npm run dev          # local dev server (no ads loaded)
npm run build        # static build → dist/
npm run preview      # preview built dist/

# Deploy (requires `npx wrangler login` first)
npx wrangler pages deploy dist --project-name=calculatieloket
```

## Architecture

```
src/
  pages/
    index.astro                  # Landing page with tool overview
    btw-calculator.astro         # BTW calculator (21%/9%, incl↔excl)
    salaris-calculator.astro     # Dutch salary calculator (2026 tax)
  layouts/
    BaseLayout.astro             # Shared shell: meta, header, footer, ads
  components/
    AdSlot.astro                 # Manual AdSense ad placement
    CookieConsent.astro          # GDPR banner — loads AdSense after consent
  styles/
    global.css                   # All site styling (CSS custom properties)
public/
  logo_Calculatieloket.png       # Site logo & favicon
  robots.txt                     # Points to sitemap-index.xml
```

## Environment

`.env` (gitignored):
```
PUBLIC_ADSENSE_ID=ca-pub-6003900314370739
PUBLIC_ADS_ENABLED=true
```

- `PUBLIC_ADS_ENABLED=false` during development — prevents ads and cookie banner.
- Build with `true` for production deploys.

## Critical gotchas

- **Disk space**: build hangs silently with zero output when disk is full (ENOSPC). Check with `df -h`.
- **shiki module missing**: if `npm install` was interrupted, delete `node_modules` and reinstall.
- **Ads only load after cookie consent**: the CookieConsent component blocks AdSense script until user clicks Accept.
- **Calculator logic is client-side vanilla JS** inside inline `<script>` tags — no shared utility modules.

## Styling

All CSS lives in `src/styles/global.css` using CSS custom properties on `:root`. No Tailwind or CSS modules. Design system variables: `--color-primary`, `--radius`, `--shadow`, `--max-width`, etc.

## Dutch-specific details

- Number formatting: euro with comma decimals (€ 1.234,56)
- 2026 Box 1 tax brackets: 35.75% / 37.56% / 49.50%
- Algemene heffingskorting max €3.115, Arbeidskorting max €5.685
- AHK phase-out: vanaf €29.736, 6.398%, nul vanaf €78.427
- AK brackets: t/m €11.965 (8.324%), €11.966–€25.845 (€996 + 31.009%), €25.846–€45.592 (€5.300 + 1.950%), €45.593–€132.920 (€5.685 – 6.510%), €0 vanaf €132.921
- Bron: Belastingdienst — voorlopige aanslag 2026, algemene heffingskorting 2026, arbeidskorting 2026
- Domain: `calculatieloket.nl`
- All page content in Dutch (`lang="nl"`)
