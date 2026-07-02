# 12 — Analytics Ready Foundation

> **Doel:** Een consistente markup-conventie voor interactieve elementen, zodat later GA4, Plausible, AdSense-event-tracking of een eigen analytics-oplossing eenvoudig kan worden gekoppeld zonder de code opnieuw te doorlopen.
> **Versie:** 1.0
> **Laatst bijgewerkt:** 2026-07-03
> **Status:** Actief — ieder nieuw interactief element volgt deze conventie.

---

## Principe

Calculatieloket voegt **geen externe analytics-scripts** en **geen cookies** toe. We bereiden alleen de markup voor door consistente `data-analytics-*` attributen toe te voegen aan interactieve elementen. Een toekomstige tracking-implementatie kan deze attributen uitlezen via een centrale event-listener of via de analytics-bibliotheek van keuze.

---

## Conventie

Voor ieder interactief element gebruiken we de volgende attributen:

| Attribuut | Doel | Voorbeeld |
|-----------|------|-----------|
| `data-analytics` | Het type element. | `calculator-card`, `breadcrumb-link`, `search-input`, `quick-start-choice`, `quick-start-cta`, `category-chip`, `category-card`, `header-link`, `footer-link`, `quick-chip`, `copy-link`, `financial-journey-link`, `tool-footer-category-link`, `cta` |
| `data-analytics-category` | De sectie of pagina waar het element zich bevindt. | `homepage`, `category-page`, `calculator-page`, `header`, `footer`, `quick-start` |
| `data-analytics-action` | De actie die de gebruiker uitvoert. | `click`, `input`, `select` |
| `data-analytics-label` | Een unieke identificatie voor het specifieke element of doel. | `bruto-netto-2026`, `copy-link`, `inkomen`, `hypotheek` |

---

## Voorbeelden

### Calculator card op homepage

```html
<a
  href="/bruto-netto-2026/"
  class="hp-card"
  data-analytics="calculator-card"
  data-analytics-category="homepage"
  data-analytics-action="click"
  data-analytics-label="bruto-netto-2026"
>
  ...
</a>
```

### Breadcrumb link

```html
<a
  href="/categorie/inkomen/"
  class="breadcrumbs-link"
  data-analytics="breadcrumb-link"
  data-analytics-category="calculator-page"
  data-analytics-action="click"
  data-analytics-label="inkomen"
>
  Inkomen
</a>
```

### Quick chip op calculatorpagina

```html
<button
  type="button"
  class="quick-chip"
  data-analytics="quick-chip"
  data-analytics-category="calculator-page"
  data-analytics-action="select"
  data-analytics-label="3000"
>
  € 3.000
</button>
```

### Copy-link knop

```html
<button
  type="button"
  class="copy-link"
  data-analytics="copy-link"
  data-analytics-category="calculator-page"
  data-analytics-action="click"
  data-analytics-label="copy-link"
>
  Kopieer link
</button>
```

### Financial Journey recommendation

```html
<a
  href="/hypotheek-calculator/?inkomen=50000"
  class="recommendation-link"
  data-analytics="financial-journey-link"
  data-analytics-category="calculator-page"
  data-analytics-action="click"
  data-analytics-label="hypotheek-calculator"
>
  ...
</a>
```

---

## Elementen die zijn voorbereid

| Element | Component / Pagina | Attributen |
|---------|--------------------|------------|
| Homepage zoekveld | `src/pages/index.astro` | `data-analytics="search-input"`, `data-analytics-category="homepage"`, `data-analytics-action="input"` |
| Homepage quick-start keuze | `src/pages/index.astro` | `data-analytics="quick-start-choice"`, `data-analytics-category="quick-start"`, `data-analytics-action="select"` |
| Homepage quick-start CTA | `src/pages/index.astro` | `data-analytics="quick-start-cta"`, `data-analytics-category="quick-start"`, `data-analytics-action="click"` |
| Homepage calculator cards | `src/pages/index.astro` | `data-analytics="calculator-card"`, `data-analytics-category="homepage"`, `data-analytics-action="click"` |
| Homepage categorie-chips | `src/pages/index.astro` | `data-analytics="category-chip"`, `data-analytics-category="homepage"`, `data-analytics-action="click"` |
| Homepage categorieën sectie | `src/pages/index.astro` / `RelatedCategories` | `data-analytics="category-card"`, `data-analytics-category="homepage"`, `data-analytics-action="click"` |
| Category cards | `CategoryGrid` | `data-analytics="category-calculator-card"`, `data-analytics-category="category-page"`, `data-analytics-action="click"` |
| Breadcrumbs | `Breadcrumbs` | `data-analytics="breadcrumb-link"`, `data-analytics-category="breadcrumb"`, `data-analytics-action="click"` |
| Header links | `BaseLayout` | `data-analytics="header-link"`, `data-analytics-category="header"`, `data-analytics-action="click"` |
| Footer links | `BaseLayout` | `data-analytics="footer-link"`, `data-analytics-category="footer"`, `data-analytics-action="click"` |
| Calculator quick chips | `InputPanel` | `data-analytics="quick-chip"`, `data-analytics-category="calculator-page"`, `data-analytics-action="select"` |
| Copy-link knop | `ResultPanel` | `data-analytics="copy-link"`, `data-analytics-category="calculator-page"`, `data-analytics-action="click"` |
| Financial Journey recommendations | `FinancialJourney` | `data-analytics="financial-journey-link"`, `data-analytics-category="calculator-page"`, `data-analytics-action="click"` |
| ToolFooter categorie-link | `ToolFooter` | `data-analytics="tool-footer-category-link"`, `data-analytics-category="calculator-page"`, `data-analytics-action="click"` |
| CTA “Bereken direct” | `CategoryGrid` / calculator cards | `data-analytics="cta"`, `data-analytics-category="..."`, `data-analytics-action="click"` |

---

## Implementatie richtlijnen

1. **Geen trackingscripts in deze fase.** Alleen markup.
2. **Geen cookies.** Data-attributen bevatten geen PII.
3. **Server-rendered.** Attributen worden in Astro/JSX meegegeven, niet client-side geïnjecteerd.
4. **Geen visuele wijzigingen.** Attributen hebben geen effect op layout of styling.
5. **Consistente naming.** Gebruik altijd kebab-case voor labels en lowercase voor categories/actions.
6. **Label = slug.** Gebruik waar mogelijk de URL-slug of een duidelijke machine-readable identifier.

---

## Toekomstige tracking

Wanneer een analytics-provider wordt gekozen, kan een klein script alle elementen met `data-analytics` selecteren en events doorsturen:

```js
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-analytics]");
  if (!el) return;
  analytics.track({
    element: el.dataset.analytics,
    category: el.dataset.analyticsCategory,
    action: el.dataset.analyticsAction,
    label: el.dataset.analyticsLabel,
  });
});
```

Dit script is **niet** in deze sprint toegevoegd; het dient als voorbeeld voor de implementatie-fase.

---

## Gerelateerde bestanden

- `src/pages/index.astro`
- `src/components/Breadcrumbs.astro`
- `src/components/category/CategoryGrid.astro`
- `src/components/category/RelatedCategories.astro`
- `src/components/calculator/InputPanel.astro`
- `src/components/calculator/ResultPanel.astro`
- `src/components/calculator/FinancialJourney.astro`
- `src/components/calculator/ToolFooter.astro`
- `src/layouts/BaseLayout.astro`
- `docs/product/10-PRODUCT-POLISH-BACKLOG.md`

---

**Eind van document.**
