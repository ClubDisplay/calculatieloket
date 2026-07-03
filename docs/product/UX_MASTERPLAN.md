# UX Masterplan — Calculatieloket Information Architecture

> Sprint 115 — UX Foundation (Information Architecture)
> Status: ontwerp / wacht op goedkeuring
> Scope: alleen UX. Geen code, geen nieuwe calculators, geen dashboard, geen agents, geen internationalisering, geen engine-wijzigingen.

---

## 1. Doel

Calculatieloket moet kunnen groeien van **10 calculators** naar **500+ calculators** zonder dat de homepage, navigatie of informatiestructuur opnieuw ontworpen hoeft te worden. Dit masterplan legt de schaalbare informatiearchitectuur (IA), homepage v2, Calculator Explorer en navigatie vast.

---

## 2. Huidige situatie (analyse)

### 2.1 Pagina-inventaris

| Pagina | Doel | Opmerking |
|--------|------|-----------|
| `/` | Homepage | Hero + Snel starten + alle calculators + categorieën + cross-sell + trust + FAQ + footer |
| `/calculators/` | Calculator hub | Overzicht per categorie, zoekveld, categorie-hero's |
| `/categorie/:slug/` | Categoriepagina | Hero + grid + intro + FAQ + bronnen + gerelateerde categorieën |
| `/:calculator-slug/` | Calculatorpagina | Breadcrumb + shell met input/resultaat + sidebar (use-cases, next-steps, bronnen, FAQ) |
| `/over-ons/`, `/contact/`, `/privacy/`, `/cookies/`, `/disclaimer/` | Contentpagina's | Statische content |
| `/demo/calculator-shell/` | Demo/shell | Niet voor productie publiek zichtbaar? |

**Componenten**

- `BaseLayout` — header, footer, cookie consent, ads preconnect
- `CategoryHero`, `CategoryGrid`, `CategoryIntro`, `CategoryFaq`, `CategorySources`, `RelatedCategories`
- `CalculatorShell`, `InputPanel`, `ResultPanel`, `TrustPanel`, `UseCasesPanel`, `FaqAccordion`, `InlineSources`, `ToolFooter`, `FinancialJourney`, `HowToSchema`
- `CrossSellCards`, `SourceCards`, `Breadcrumbs`, `AdSlot`, `CookieConsent`

**Interne links**

- Header: Home, Calculators, Categorieën dropdown, BTW, Salaris, Hypotheek, ZZP, Toeslagen, Over ons, Contact
- Footer: 3 kolommen (Categorieën, Alle calculators, Calculatieloket)
- Breadcrumbs: Home > Categorieën > [categorie] of Home > [calculator]
- Cross-sell: "Begin met je inkomen", "Voor ondernemers"
- Category pages: gerelateerde categorieën

### 2.2 Wat is goed

- **Duidelijke taal:** Nederlands, heldere labels, geen jargon zonder uitleg.
- **Trust-signalen:** gratis, geen account, geen opslag, indicatie — consistent aanwezig.
- **Calculator-shell:** moderne card-layout met input, resultaat en sidebar is solide basis.
- **SEO-hygiëne:** breadcrumbs, schema.org (FAQ, CollectionPage, BreadcrumbList), canonicals, sitemap aanwezig.
- **Cookie-consent:** AVG-conforme opt-in voor AdSense.
- **Componenten zijn herbruikbaar:** `CategoryGrid`, `CalculatorShell`, `CrossSellCards` etc. zijn geschikt voor schaalvergroting.
- **Categoriepagina's:** goede landing-page structuur met intro, FAQ en bronnen.

### 2.3 Wat is slecht / schaalt niet

| Probleem | Impact bij 500 calculators |
|----------|----------------------------|
| **Homepage toont alle calculators** in een vast grid van 10 cards | Grid van 500 cards is onbruikbaar; homepage wordt een eindeloze lijst. |
| **Geen centrale "Explorer"** met filter/sort | Gebruiker kan niet ontdekken of doorzoeken; SEO-facets ontbreken. |
| **Categorieën zijn hardcoded** in `category-icons.ts` en per `.astro` pagina | Nieuwe categorieën vereisen code-wijzigingen en nieuwe pagina's. |
| **Header bevat directe links naar 5 calculators** | Bij 500 calculators is dat willekeurig en oneerlijk; er is geen ruimte. |
| **Footer "Alle calculators"-lijst** is handmatig en statisch | Kan niet 500 items tonen; moet dynamisch en gelaagd worden. |
| **"Snel starten" staat prominent op homepage** | Bij 500 calculators is één generieke quick-start te beperkt; moet contextafhankelijk worden. |
| **Cross-sell "Begin met je inkomen" / "Voor ondernemers"** zijn hardcoded | Moet vervangen door dynamische, data-gedreven collecties. |
| **Geen kennisbank / nieuws-sectie** | Bij 500 calculators is er meer content nodig dan alleen tools; gebruikers zoeken ook uitleg en actuele tarieven. |
| **URL-structuur is plat en inconsistent** | Sommige calculators staan onder `/categorie/`, sommige op root; geen duidig namespace voor toekomstige schaal. |
| **Geen tagging/labelsysteem** | "Populair" en "Nieuw" zijn handmatige badges; geen metadata voor filteren. |

### 2.4 Wat moet verdwijnen / veranderen

1. **Alle calculators grid op homepage** verdwijnt. Homepage wordt een ontdekkingsportal, geen catalogus.
2. **"Snel starten" blok** verdwijnt van homepage; komt terug als contextafhankelijke quick-action op calculatorpagina's en in explorer.
3. **Hardcoded cross-sell blokken** op homepage verdwijnen; vervangen door "Populair", "Nieuw", "Aanbevolen voor jou" collecties.
4. **Directe calculator-links in header** (BTW, Salaris, Hypotheek, ZZP, Toeslagen) verdwijnen.
5. **Statische "Alle calculators"-lijst in footer** verdwijnt; vervangen door link naar Explorer + categorieën.
6. **Handmatige categoriepagina's** per categorie verdwijnen op termijn; vervangen door een generieke categorie-template die uit een centrale categorie-/calculator-databron leest.
7. **`/demo/calculator-shell/`** hoort niet in productie-IA; afschermen of verwijderen.

---

## 3. Nieuwe Information Architecture (IA)

### 3.1 Ontwerpprincipes

1. **Zoeken is de hoofdingang.** Bij 500 calculators is een goede zoek- en filterervaring essentieel.
2. **Categorieën zijn stabiele landing pages.** Elke categorie krijgt een eigen URL, SEO, intro en FAQ.
3. **Collecties zijn dynamisch.** "Populair", "Nieuw", "Aanbevolen" zijn data-gedreven, niet handmatig.
4. **Platte URLs voor calculators.** Een calculator is een product; URL moet kort en blijvend zijn.
5. **Content en tools gescheiden.** Kennisbank en Nieuws krijgen eigen secties, niet verstopt in calculators.
6. **Mobile-first navigatie.** Hetzelfde menu werkt op desktop en mobiel zonder complexe mega-menu's.

### 3.2 Sitemap v2

```
Home /

Calculators
  /calculators/explorer/          → Calculator Explorer (centrale ontdekkingspagina)
  /calculators/populair/          → Populaire calculators
  /calculators/nieuw/             → Nieuw toegevoegde calculators
  /calculators/:slug/             → Individuele calculator (bestaande + nieuwe)

Categorieën
  /categorieen/                   → Overzicht van alle categorieën
  /categorie/:slug/               → Categorie landing page (generiek template)

Kennisbank
  /kennisbank/                    → Overzicht artikelen
  /kennisbank/:slug/              → Individueel artikel

Nieuws
  /nieuws/                        → Overzicht updates (tarieven, nieuwe tools)
  /nieuws/:slug/                  → Individueel nieuwsartikel

Over
  /over-ons/
  /contact/
  /privacy/
  /cookies/
  /disclaimer/
```

### 3.3 Toekomstige categorieën (voor 500+ calculators)

| Categorie | Voorbeeld calculators |
|-----------|----------------------|
| Inkomen | bruto-netto, salaris, vakantiegeld, toeslagen, dertiende maand, netto-uren |
| Belasting | btw, inkomstenbelasting, vermogensbelasting, schenkbelasting, erfbelasting |
| Ondernemen | zzp-tarief, kvk-inschrijving, urencriterium, mkb-winstvrijstelling |
| Wonen | hypotheek, huurtoeslag, overdrachtsbelasting, energiebesparing, verhuiskosten |
| Auto | importkosten, bijtelling, wegenbelasting, lease, tankkosten |
| Pensioen | pensioengat, AOW-leeftijd, lijfrente, annuïteit |
| Vermogen | spaarrendement, beleggingsrendement, box-3, crypto-belasting |
| Familie | kinderopvangtoeslag, kindgebonden budget, alimentatie, ouderschapsverlof |
| Studeren | studiefinanciering, reiskosten, collegegeld, studieschuld |
| Internationaal | 30%-regeling, buitenlandse werkgever, emigratie, verhuisdip |
| Duurzaam | zonnepanelen, isolatiesubsidie, warmtepomp, salderen |

---

## 4. Homepage v2

### 4.1 Doel

De homepage is geen catalogus meer, maar een **startportaal** dat binnen 2 seconden duidelijk maakt: "hier vind je elke Nederlandse calculator".

### 4.2 Secties (van boven naar beneden)

1. **Hero**
   - H1: *Wat wil je berekenen?*
   - Subtitel: *Vind 500+ gratis calculators voor inkomen, belasting, wonen, ondernemen en meer.*
   - **Prominente zoekbalk** (groot, centraal) met autocomplete/placeholder.
   - CTA's: *Bekijk alle calculators* → Explorer, *Bekijk categorieën* → /categorieen/
   - Trust bullets: Gratis · Geen account · Geen opslag · Indicatie.

2. **Populaire berekeningen**
   - 6–8 cards op basis van data (kliks, conversie, seizoen).
   - Titel: *Populair deze maand*.
   - Link: *Bekijk alle populaire calculators*.

3. **Categorieën**
   - Grid van 10–12 categorie-kaarten met icoon + korte beschrijving.
   - Titel: *Bereken per onderwerp*.
   - Link: *Alle categorieën*.

4. **Nieuw / Onlangs bijgewerkt**
   - 4–6 cards: nieuwe calculators of tools met gewijzigde 2026-tarieven.
   - Badge: *Nieuw* of *Bijgewerkt*.

5. **Waarom Calculatieloket?**
   - Behouden, maar compacter: 4 check-items in 1 rij.

6. **FAQ**
   - 5 veelgestelde vragen (bestaande FAQ kan overgenomen).

7. **Footer**
   - Zie sectie 6.

### 4.3 Onderdelen die verdwijnen

- ❌ Het volledige "Alle calculators" grid met 10 cards op homepage.
- ❌ "Snel starten" blok (verhuist naar Explorer en calculatorpagina's).
- ❌ Hardcoded "Begin met je inkomen" en "Voor ondernemers" cross-sell blokken.
- ❌ Verwijzing `/#categorieen` anker; vervangen door aparte `/categorieen/` pagina.

### 4.4 ASCII wireframe — homepage desktop

```
+-----------------------------------------------------------+
| LOGO    Home  Calculators  Categorieën  Kennisbank  Nieuws |
+-----------------------------------------------------------+
|                                                           |
|     Wat wil je berekenen?                                 |
|     Vind 500+ gratis calculators...                       |
|                                                           |
|     [ Zoek een calculator bijv. salaris, btw... ]         |
|     [Alle calculators] [Alle categorieën]               |
|     Gratis · Geen account · Geen opslag · Indicatie       |
|                                                           |
+-----------------------------------------------------------+
| Populair deze maand                                       |
| [Card][Card][Card][Card][Card][Card]                      |
+-----------------------------------------------------------+
| Bereken per onderwerp                                     |
| [Inkomen] [Belasting] [Ondernemen] [Wonen] [Auto] ...     |
+-----------------------------------------------------------+
| Nieuw & Bijgewerkt                                        |
| [Card][Card][Card][Card]                                  |
+-----------------------------------------------------------+
| Waarom Calculatieloket?                                    |
| ✓ Gratis  ✓ Geen opslag  ✓ Officiële bronnen  ✓ Indicatie |
+-----------------------------------------------------------+
| Veelgestelde vragen                                       |
| ▶ Zijn de calculators gratis?                             |
| ▶ Worden mijn gegevens opgeslagen?                        |
| ...                                                       |
+-----------------------------------------------------------+
| CATEGORIEËN | ALLE CALCULATORS | KENNISBANK | OVER        |
| © 2026 Calculatieloket.nl                                  |
+-----------------------------------------------------------+
```

### 4.5 Mobile wireframe

```
+--------------------------------+
| LOGO                 [≡]       |
+--------------------------------+
| Wat wil je berekenen?          |
| [Zoek calculator...]           |
| [Alle calculators]             |
| [Alle categorieën]             |
| Gratis · Geen account ...      |
+--------------------------------+
| Populair deze maand            |
| [Card]                         |
| [Card]                         |
| [Card]                         |
+--------------------------------+
| Bereken per onderwerp          |
| [Inkomen]                      |
| [Belasting]                    |
| [Ondernemen]                   |
| ...                            |
+--------------------------------+
| Nieuw & Bijgewerkt             |
| [Card]                         |
| [Card]                         |
+--------------------------------+
| Waarom / FAQ / Footer          |
+--------------------------------+
```

---

## 5. Calculator Explorer

### 5.1 Doel

Dé centrale pagina waar alle calculators doorzoekbaar, filterbaar en sorteerbaar zijn. Deze pagina vervangt `/calculators/` als één grote catalogus.

### 5.2 URL-structuur

- `/calculators/explorer/` — standaard explorer
- `/calculators/explorer/?q=btw&categorie=belasting&sort=populair` — gefilterd
- `/calculators/populair/` — alias voor `?sort=populair`
- `/calculators/nieuw/` — alias voor `?sort=nieuw`
- `/calculators/explorer/?bron=belastingdienst` — facet op officiële bron

### 5.3 Layout

**Desktop**

```
+-----------------------------------------------------------+
| Breadcrumb: Home > Calculators > Explorer                 |
|                                                           |
|  [Filter sidebar]  |  [Zoekbalk] [Sorteer]                |
|  Categorieën         |                                    |
|    Inkomen (12)      |  [Card][Card][Card]                |
|    Belasting (8)     |  [Card][Card][Card]                |
|    Ondernemen (5)    |  ...                               |
|    Wonen (3)         |                                    |
|    Auto (2)          |  [1][2][3][4][5] paginering          |
|  Bronnen             |                                    |
|    Belastingdienst   |                                    |
|    Dienst Toeslagen  |                                    |
|    Rijksoverheid     |                                    |
|  Tags                |                                    |
|    Populair · Nieuw · 2026 · ZZP · Salaris                |
+-----------------------------------------------------------+
```

**Mobile**

```
+--------------------------------+
| [≡ Filter]  [Zoek...] [Sort]   |
+--------------------------------+
| [Card]                         |
| [Card]                         |
| [Card]                         |
| [Card]                         |
| [Meer laden]                    |
+--------------------------------+
```

### 5.4 Filters

| Filter | Type | Voorbeeld waarden |
|--------|------|-------------------|
| Categorie | checkbox/accordion | Inkomen, Belasting, Ondernemen, Wonen, Auto, Pensioen, Vermogen, Familie, Studeren, Internationaal, Duurzaam |
| Bron | checkbox | Belastingdienst, Dienst Toeslagen, Rijksoverheid, KVK, RDW, NVB, etc. |
| Type | checkbox | Salaris, BTW, Toeslagen, Hypotheek, Importkosten, etc. |
| Status | pill/toggle | Populair, Nieuw, Bijgewerkt |
| Jaar | select | 2026, 2025, etc. |

### 5.5 Sortering

1. **Relevantie** (default bij zoekterm)
2. **Populair** (meeste klicks/usage)
3. **Nieuwste** (datum toegevoegd)
4. **Alfabetisch** (titel A–Z)
5. **Meest bekeken deze week** (trending)

### 5.6 Cards in Explorer

Elke card bevat:

- Icoon (kleur per categorie)
- Titel
- Badge (Populair / Nieuw / Bijgewerkt)
- Korte vraag (bv. *Wat houd ik netto over?*)
- Meta: bron · categorie · jaar
- CTA: *Bereken direct*

### 5.7 SEO-afspraken

- Canonical URL zonder `?page=` of `?sort=` wanneer filters leeg zijn.
- `noindex` voor pagina's met interne zoektermen (`?q=...`) om duplicate content te voorkomen.
- Open Graph per filter-overzicht: `/calculators/populair/` krijgt eigen title/description.
- Schema.org `CollectionPage` + `ItemList` op Explorer.

---

## 6. Navigatie v2

### 6.1 Desktop header

```
+-----------------------------------------------------------+
| [LOGO]   Home   Calculators ▼   Categorieën ▼   Kennisbank |
|                                                    Nieuws  |
|                                           [🔍 Zoek]       |
+-----------------------------------------------------------+
```

**Dropdown "Calculators"**

- Explorer
- Populair
- Nieuw
- Mijn recente tools (localStorage)

**Dropdown "Categorieën"**

- Alle categorieën
- ---
- Inkomen
- Belasting
- Ondernemen
- Wonen
- Auto
- Pensioen
- Vermogen
- Familie
- Studeren
- Internationaal
- Duurzaam

### 6.2 Mobile header

```
+--------------------------------+
| [LOGO]                 [≡] [🔍]|
+--------------------------------+
```

Hamburger menu (fullscreen of slide-in):

```
Zoeken
[________________]

Calculators
  Explorer
  Populair
  Nieuw

Categorieën
  Inkomen
  Belasting
  Ondernemen
  Wonen
  Auto
  Pensioen
  Vermogen
  Familie
  Studeren
  Internationaal
  Duurzaam

Kennisbank
Nieuws
Over ons
Contact
```

### 6.3 Footer v2

```
+-----------------------------------------------------------+
| CATEGORIEËN        | ALLE CALCULATORS      | KENNIS & OVER  |
| Inkomen            | Explorer              | Kennisbank     |
| Belasting          | Populair              | Nieuws         |
| Ondernemen         | Nieuw                 | Over ons       |
| Wonen              | Bronnen-overzicht     | Contact        |
| Auto               |                       | Privacy        |
| Pensioen           |                       | Cookies        |
| Vermogen           |                       | Disclaimer     |
| Familie            |                       |                |
| Studeren           |                       |                |
| Internationaal     |                       |                |
| Duurzaam           |                       |                |
+-----------------------------------------------------------+
| © 2026 Calculatieloket.nl · Gebaseerd op officiële bronnen |
+-----------------------------------------------------------+
```

### 6.4 Onderdelen die verdwijnen

- ❌ Directe links in header naar BTW, Salaris, Hypotheek, ZZP, Toeslagen.
- ❌ Handmatige "Alle calculators" lijst in footer.
- ❌ Dropdown "Categorieën" met alleen 5 huidige categorieën; wordt uitgebreid naar 10+.

---

## 7. Categorie-pagina v2

Behoud de huidige structuur, maar maak **generiek** op basis van een centrale data-source.

### 7.1 URL

`/categorie/:slug/` blijft bestaan. Bestaande URLs redirecten niet.

### 7.2 Sjabloon

```
+-----------------------------------------------------------+
| Breadcrumb: Home > Categorieën > [Categorie]              |
| [Categorie icoon] [Titel]                                 |
| [Intro tekst]                                             |
+-----------------------------------------------------------+
| [Filter: subcategorieën / tags]                         |
| [Card][Card][Card]                                       |
| [Card][Card]                                             |
+-----------------------------------------------------------+
| [AdSlot]                                                  |
+-----------------------------------------------------------+
| Introductie tekst (CategoryIntro)                         |
+-----------------------------------------------------------+
| FAQ (CategoryFaq)                                         |
+-----------------------------------------------------------+
| Officiële bronnen (CategorySources)                       |
+-----------------------------------------------------------+
| Gerelateerde categorieën (RelatedCategories)              |
+-----------------------------------------------------------+
```

### 7.3 Aandachtspunten

- Categorieën krijgen een **subcategorie**-laag indien nodig (bijv. Belasting > BTW, Inkomstenbelasting, Vermogensbelasting).
- Categoriepagina's blijven belangrijke SEO-landingpages met unieke FAQ en bronnen.

---

## 8. Calculatorpagina v2

### 8.1 URL

- **Aanbevolen:** `/calculators/:slug/` voor alle nieuwe calculators.
- **Bestaande 10 calculators:** behouden huidige root-URLs (`/bruto-netto-2026/`, etc.) om backlinks te beschermen. Optioneel later een canonical/redirect naar `/calculators/` namespace.

### 8.2 Sjabloon (behouden + verbeteren)

```
+-----------------------------------------------------------+
| Breadcrumb: Home > Categorie > Calculator                 |
| [Titel]                                                   |
| [Subtitel]                                                |
+-----------------------------------------------------------+
|  [Input + Resultaat]        | [Use cases]                 |
|                             | [Volgende stap / Next steps] |
|                             | [Bronnen]                   |
|                             | [FAQ]                       |
+-----------------------------------------------------------+
| [ToolFooter: gerelateerde calculators]                    |
+-----------------------------------------------------------+
```

### 8.3 Quick-action

- Op calculatorpagina's komt een **contextafhankelijke "Snel starten"** terug: direct invullen van het belangrijkste veld en CTA *Bereken*.
- Dit vervangt het huidige generieke homepage-blok.

---

## 9. Kennisbank & Nieuws

### 9.1 Kennisbank

Doel: uitleg, begrippen en achtergrond bij berekeningen. Belangrijk voor SEO en gebruikersdiepgang.

- `/kennisbank/` — overzicht met zoek/filter op categorie
- `/kennisbank/:slug/` — artikel met schema, FAQ, gerelateerde calculators
- Voorbeeld artikelen: *Wat is bruto-netto?*, *Hoe werkt de algemene heffingskorting?*, *Wat is de 30%-regeling?*

### 9.2 Nieuws

Doel: communiceren van tariefswijzigingen, nieuwe calculators en updates.

- `/nieuws/` — chronologisch overzicht
- `/nieuws/:slug/` — artikel
- Voorbeeld: *Belastingplan 2026: wijzigingen voor zzp'ers*

---

## 10. Datastructuur (voorstel)

Om de IA te schalen is een centrale calculator-register nodig. Dit is **geen code** maar een ontwerpaanbeveling.

```yaml
calculator:
  id: bruto-netto-2026
  title: Bruto netto 2026
  slug: bruto-netto-2026
  url: /bruto-netto-2026/          # of /calculators/bruto-netto-2026/
  category: inkomen
  subcategory: salaris
  year: 2026
  badges: [populair]
  sources: [belastingdienst]
  icon: euro
  accent: "#2563eb"
  question: "Wat houd ik netto over in 2026?"
  promise: "Gebaseerd op actuele Box 1 tarieven..."
  keywords: [bruto, netto, salaris, inkomen, 2026]
  status: published
  publishedAt: 2025-01-15
  updatedAt: 2026-01-01
```

Dit register voedt:

- Explorer
- Homepage collecties
- Categoriepagina's
- Footer- en navigatielinks
- Sitemap
- Search index

---

## 11. UX Masterplan beslissingen

| Onderwerp | Beslissing |
|-----------|------------|
| **Homepage** | Portal met zoek, populaire, categorieën, nieuw. Geen volledige catalogus. |
| **Explorer** | Centrale catalogus met filters, sortering, paginering en URL-facets. |
| **Categorieën** | Generieke categoriepagina's op basis van centrale data; 10+ categorieën. |
| **Navigatie** | Hoofditems: Home, Calculators, Categorieën, Kennisbank, Nieuws. Geen directe calculator-links. |
| **Footer** | Dynamische kolommen met categorieën, Explorer, Kennisbank/Over. |
| **URL's** | Calculators op `/calculators/:slug/` voor nieuwe; bestaande root-URLs behouden. |
| **Search** | Instant client-side search in Explorer; server-side sitemap voor SEO. |
| **Content** | Kennisbank + Nieuws als aparte secties naast tools. |
| **Data** | Centraal calculator-register vervangt handmatige Astro-pagina's. |

---

## 12. Wireframes samenvatting

Zie hierboven voor:

- Homepage desktop (§4.4)
- Homepage mobile (§4.5)
- Explorer desktop (§5.3)
- Explorer mobile (§5.3)
- Header desktop (§6.1)
- Footer (§6.3)
- Categoriepagina (§7.2)
- Calculatorpagina (§8.2)

---

## 13. Implementatie roadmap (voorstel)

| Fase | Werk | Afhankelijk van |
|------|------|-----------------|
| 1 | Centraal calculator-register ontwerpen | — |
| 2 | Generieke categoriepagina + Explorer bouwen | register |
| 3 | Homepage v2 + navigatie v2 | Explorer + categorieën |
| 4 | Kennisbank + Nieuws structuur | contentplan |
| 5 | 10 bestaande calculators migreren naar register | register |
| 6 | Bulkimport nieuwe calculators | register + content |

---

## 14. Niet in scope

- ❌ Nieuwe calculators toevoegen
- ❌ Dashboard
- ❌ Agents / AI-assistent
- ❌ Internationalisering / meertaligheid
- ❌ Rule Resolver wijzigingen
- ❌ Knowledge Layer wijzigingen
- ❌ Engine / rekenkundige wijzigingen

---

## 15. Conclusie

Het huidige design is sterk voor 10 calculators, maar schaalt niet. Dit masterplan vervangt de statische, handmatige structuur door een **data-gedreven, zoekbare en categorie-gelaagde IA**. De homepage wordt een portal, de Explorer wordt het centrale ontdekkingspunt en de navigatie wordt compact en toekomstbestendig.

**Volgende stap:** goedkeuring van dit masterplan, daarna implementatie van fase 1 (centraal calculator-register).
