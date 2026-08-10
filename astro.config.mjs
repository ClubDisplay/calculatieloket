// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

const deprecatedPages = [
  "/bruto-netto-berekenen-2026/",
  "/nettoloon-2026/",
  "/salaris-2026-berekenen/",
  "/loonheffing-berekenen-2026/",
  "/btw-21-procent-berekenen/",
  "/btw-9-procent-berekenen/",
  "/btw-van-bedrag-afhalen/",
  "/btw-bedrag-berekenen/",
  "/exclusief-naar-inclusief-btw/",
  "/zzp-uurtarief-berekenen/",
  "/zzp-omzet-berekenen/",
  "/zzp-inkomen-berekenen/",
  "/zzp-kosten-berekenen/",
  "/maximale-hypotheek-berekenen/",
  "/hypotheek-maandlasten-berekenen/",
  "/hypotheek-rente-berekenen/",
  "/hypotheek-2026/",
  "/huurtoeslag-berekenen/",
  "/zorgtoeslag-berekenen/",
  "/kindgebonden-budget-berekenen/",
];

// https://astro.build/config
export default defineConfig({
  site: "https://calculatieloket.nl",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/demo/") && !deprecatedPages.some((dep) => page.includes(dep)),
    }),
  ],
});
