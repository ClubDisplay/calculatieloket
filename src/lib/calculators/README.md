# Calculator Registry

Single Source of Truth for all calculators, categories and cross-cutting metadata on Calculatieloket.nl.

## What lives here

- `calculatorCategories` — canonical category definitions (id, label, href, icon, accent, description, flags).
- `calculators` — canonical calculator definitions (id, slug, url, title, descriptions, category, keywords, intents, related, schema, official sources, flags).
- Helper functions used by search, navigation, hub, category pages, homepage and recommendations.

## Design rules

1. **One entry per calculator.** Adding a new calculator in the future means adding one record to `calculators` and, if needed, one category to `calculatorCategories`.
2. **Categories are defined here.** `src/lib/category-icons.ts` only provides the SVG icons; it does not define the category list.
3. **All consumers read from this file.** No other file may duplicate calculator metadata (title, URL, category, keywords, etc.).
4. **No business logic.** This module only stores metadata. Tax formulas, validation and UI behaviour stay in the calculator pages and components.

## Adding a new calculator

```ts
{
  id: "my-new-calculator",
  slug: "my-new-calculator-2026",
  url: "/my-new-calculator-2026/",
  title: "My new calculator 2026",
  shortTitle: "My new calculator",
  description: "Long SEO / social description.",
  shortDescription: "Short description used in search results and cards.",
  category: "Inkomen",
  iconKey: "euro",
  keywords: ["keyword", "another"],
  intents: ["intent phrase"],
  related: ["bruto-netto", "salaris"],
  difficulty: "beginner",
  country: "NL",
  language: "nl",
  status: "active",
  year: 2026,
  featured: false,
  popular: false,
  isNew: true,
  lastUpdated: "2026-07-03",
  question: "What question does this answer?",
  quickLinkLabel: "My new",
  seo: {
    title: "My new calculator 2026 | Calculatieloket.nl",
    description: "Long SEO description.",
  },
  schema: { /* optional howTo schema */ },
  officialSources: [
    { label: "Officiële bron", title: "...", description: "...", href: "..." },
  ],
}
```

Then update the relevant helper order arrays if the calculator should appear in:

- Homepage featured cards: `FEATURED_CARD_ORDER` in `getFeaturedCards()`.
- Homepage quick links: `QUICK_LINK_ORDER` in `getQuickLinks()`.
- Recommendations: add a rule file in `src/lib/recommendations/rules/` and wire it in `src/lib/recommendations/registry.ts`.

## Consumers

| Consumer | What it uses |
|---|---|
| `src/lib/search-index.ts` | `getSearchIndex()` |
| `src/layouts/BaseLayout.astro` | `getCategoryList()` |
| `src/pages/index.astro` | `getSearchIndex()`, `getSearchIcons()`, `getFeaturedCards()`, `getHomeCategories()`, `getQuickLinks()` |
| `src/pages/calculators.astro` | `getCalculatorGroupsForHub()`, `getCategoryList()` |
| `src/pages/categorie/*.astro` | `getCalculatorsByCategory()`, `toCategoryGridItem()`, `getCategoryList()` |
| `src/lib/recommendations/rules/*.ts` | `recommendationFromRegistry()` |
| `src/lib/recommendations/client.ts` | `getRecommendationIcon()` |

## Internationalisation readiness

Every calculator has `country` and `language` fields. The site currently only supports `NL` / `nl`, but the structure is ready for future locale-specific calculators without changing the registry shape.
