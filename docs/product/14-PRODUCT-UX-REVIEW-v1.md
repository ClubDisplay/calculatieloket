# 14 — Product & UX Review v1

> **Doel:** Een kritische, multi-perspectief review van Calculatieloket.nl als product, UX, SEO en concurrentiepositie, met een concrete verbeteragenda voor de laatste fase van Product Completion.  
> **Versie:** 1.0  
> **Laatst bijgewerkt:** 2026-07-03  
> **Status:** Afgerond — input voor Sprint 104

---

## 1. Executive summary

Na Sprints 100–102 is Calculatieloket.nl technisch en structureel op orde. De Platform Quality Audit (Sprint 102) toonde 10× groen en 1× geel (content quality). Deze review bekijkt het platform door de ogen van een UX-designer, Product Owner, SEO-specialist, Google Quality Rater en eerste bezoeker.

**Conclusie:** Het product is sterk op snelheid, eenvoud, navigatie en toegankelijkheid. De grootste kansen liggen in:
1. Betrouwbaarheid / sociale proof versterken.
2. Mobiele eerste viewport optimaliseren.
3. Resultaatpresentatie consistent verrijken.
4. Content quality van statische pagina's verbeteren.
5. Echte performance metrics verzamelen.

**Gemiddelde score:** 8.0 / 10

---

## 2. Sprint context

**Doel:** Objectief bepalen welke product- en UX-verbeteringen nog nodig zijn voor Product Completion.

**Waarom:** De technische basis is af (Sprints 100–102). Nu moeten we zeker zijn dat het product ook *voelt* als het beste financiële platform van Nederland.

**Scope:** Volledig platform: homepage, 5 categoriepagina's, 10 calculatorpagina's, statische pagina's, header/footer, App Shell, navigatie, AdSense, schema, content.

**Definition of Done:**
- [x] Review uit 5 perspectieven.
- [x] Scorecard over 12 categorieën.
- [x] Concurrentievergelijking.
- [x] Top 25 verbeterpunten.
- [x] Top 10 user-happiness UX items.
- [x] Backlog en changelog bijgewerkt.

**Geen code-wijzigingen:** geen Astro-pagina's, engines, Knowledge Objects, Rule Resolver, Recommendation Engine, deploy, dependencies of `npm ci`.

---

## 3. Review methodologie

We beoordeelden het platform vanuit 5 rollen:

1. **UX Designer** — kijkt naar flow, hiërarchie, feedback, patronen, mobile-first.
2. **Product Owner** — kijkt naar conversie, prioriteit, scope, roadmap-pasvorm.
3. **SEO-specialist** — kijkt naar meta-data, schema, contentstructuur, interne links.
4. **Google Quality Rater** — beoordeelt E-E-A-T, YMYL, trust, bronvermelding.
5. **Eerste bezoeker** — komt binnen via Google, wil in 5 seconden weten: "Krijg ik hier een betrouwbaar antwoord?"

Elke categorie scoorden we 1–10. De score is gebaseerd op bestaande audits, concurrentiebenchmark en handmatige inspectie van de statische build.

---

## 4. Scorecard (12 categorieën)

| # | Categorie | Score | Status | Rationale |
|---|-----------|------:|--------|-----------|
| 1 | **Snelheid naar antwoord** | 9 | 🟢 | Direct resultaat bij laden op alle 10 calculators; live update bij input; URL state. |
| 2 | **Eenvoud invoer** | 9 | 🟢 | Minimale velden, slimme defaults, quick chips. |
| 3 | **Resultaatpresentatie** | 8 | 🟢 | Hero + breakdown; effectief tarief + schijven op inkomenscalculators. Kan nog visueler en consistenter. |
| 4 | **Mobile UX** | 8 | 🟢 | Goed, maar top-ad duwt tool omlaag; input + resultaat niet altijd in één viewport. |
| 5 | **Desktop UX** | 8 | 🟢 | Rustige layout; side panel kan op sommige calculators lichter. |
| 6 | **Navigatie / findability** | 9 | 🟢 | Breadcrumbs, header, footer, zoek, categorieën. Alle calculators binnen 2 klikken. |
| 7 | **SEO / content quality** | 8 | 🟢 | Sterke schema, interne links, content. Statische pagina's hebben kortere meta descriptions. |
| 8 | **Toegankelijkheid** | 9 | 🟢 | Skip link, focus-visible, aria-current, reduced motion, mobiel menu Escape. |
| 9 | **Vervolgacties / journey** | 8 | 🟢 | Recommendation Engine, dynamische use cases, copy link. Kan prominenter en consistenter. |
| 10 | **Advertenties / afleiding** | 6 | 🟡 | Ads zijn bewust geplaatst, maar top-ad eet eerste viewport. A/B-test nodig. |
| 11 | **Betrouwbaarheid / transparantie** | 8 | 🟢 | Bronnen, disclaimer, bijgewerkt-badge. Geen sociale proof of ratings. |
| 12 | **First impression / trust** | 7 | 🟡 | Snel en helder, maar mist vertrouwssignalen als beoordelingen, aantal berekeningen, trust bar. |

**Gemiddelde:** 8.0 / 10

**Samenvatting:** 9× groen, 2× geel, 0× rood. De enige gele vlaggen (advertenties, first impression/trust) zijn strategisch/commercieel van aard en vereisen A/B-testen, niet alleen code.

---

## 5. Per-pagina first-visitor journey

### 5.1 Homepage (`/`)
- **Eerste indruk:** heldere H1 "Wat wil je berekenen?", direct zoekveld + categorie-chips.
- **Actie:** binnen 1 klik bij elke calculator.
- **Vertrouwen:** trustband onder hero; geen sociale proof.
- **Kans:** zoek-URL state werkt; lege state toont hulp maar kan visueler.

### 5.2 Categoriepagina's (`/categorie/.../`)
- **Eerste indruk:** consistente hero, duidelijke calculator grid.
- **Actie:** cards zijn herkenbaar van homepage.
- **Vertrouwen:** FAQ + bronnen aanwezig.
- **Kans:** content is 300–500 woorden; kan uitgebreider voor long-tail SEO.

### 5.3 Calculatorpagina's (`/bruto-netto-2026/`, etc.)
- **Eerste indruk:** direct resultaat, duidelijke input.
- **Actie:** velden zijn intuïtief; quick chips versnellen.
- **Vertrouwen:** bronnen + disclaimer + bijgewerkt-badge.
- **Kans:**
  - Bruto-netto en salaris tonen effectief tarief + schijven; andere calculators kunnen dat ook.
  - Top-ad duwt content naar beneden op mobiel.

### 5.4 Statische pagina's (`/contact/`, `/privacy/`, etc.)
- **Eerste indruk:** netjes, consistente shell.
- **Actie:** breadcrumbs helpen navigeren.
- **Vertrouwen:** privacy/cookies/disclaimer zijn aanwezig.
- **Kans:** meta descriptions korter dan 120 tekens; content kan meer waarde bieden.

---

## 6. Concurrentievergelijking

Gebruikmakend van `08-COMPETITIVE-BENCHMARK.md` (Sprint 079).

| Criterium | Beste concurrent | Calculatieloket | Kloof |
|-----------|------------------|-----------------|-------|
| Snelheid | SalarisNetto (9) | 9 | Geen |
| Eenvoud | SalarisNetto (9) | 9 | Geen |
| Resultaatpresentatie | SalarisNetto (8) | 8 | Geen |
| Mobiel | SalarisNetto (8) | 8 | Klein |
| Betrouwbaarheid | Nibud (10) / BerekenHet (9) | 8 | Middel |
| Uitleg | Nibud (9) | 8 | Klein |
| FAQ | Nibud (8) | 8 | Geen |
| Advertenties | Nibud (10) | 6 | Groot |
| Vervolgacties | SalarisNetto (7) | 8 | Winst |
| Interne links | BerekenHet (8) | 9 | Winst |
| SEO | BerekenHet (8) | 8 | Geen |

**Analyse:** Calculatieloket haalt SalarisNetto in op snelheid, eenvoud, resultaatpresentatie, vervolgacties en interne links. De overgebleven kloof is **betrouwbaarheid** (Nibud/BerekenHet hebben meer sociale proof en autoriteit) en **advertenties** (Nibud heeft geen). Die kloof is strategisch: we willen wel advertenties, maar niet ten koste van trust.

---

## 7. Top 25 verbeterpunten

### P0 — Moet voor Product Completion

| # | Verbeterpunt | Waarom | Complexiteit | Afhankelijkheid |
|---|--------------|--------|--------------|-----------------|
| 1 | **Handmatige Lighthouse audit** op home, bruto-netto, categorie Inkomen. Doel: LCP < 2.5s, CLS < 0.1, INP < 200ms. | Laatste ongemeten kwaliteitspijler; objectieve basis voor optimalisatie. | Laag | Geen |
| 2 | **Meta descriptions statische pagina's** verlengen naar 120–160 tekens. | Betere CTR; laatste geel-plek uit Platform Audit. | Laag | Geen |
| 3 | **"Laatst bijgewerkt: 2026" + "Bron: Belastingdienst"** badges standaardiseren op alle calculators. | Verhoogt trust; nu niet overal even prominent. | Laag | Geen |
| 4 | **Top-ad op mobiel evalueren** — meten of deze verplaatst/verwijderd moet worden. | Eet eerste viewport; mogelijk conversieverlies. | Laag | Lighthouse data |
| 5 | **Input + resultaat in één viewport** testen op 375/390px; fixen waar nodig. | Essentieel voor mobiele ervaring. | Middel | Geen |
| 6 | **Effectief tarief + schijven** consistent toevoegen aan alle inkomens-/belasting-gerelateerde calculators. | Concurrentiepariteit; beter begrip. | Middel | Engine output |
| 7 | **"Kopieer link" + feedback** op alle calculators standaardiseren. | Deelbaarheid; nu wel aanwezig maar consistentie checken. | Laag | Geen |
| 8 | **Quick chips** consistentie check: alle calculators hebben relevante presets. | Versnelt scenario's. | Laag | Geen |
| 9 | **Trust bar onder resultaat** — "Indicatie · Gebaseerd op Belastingdienst 2026 · Bronnen". | Sluit trust-kloof met Nibud. | Laag | Geen |
| 10 | **Search empty state** visueel versterken met categorie-links en voorbeeldzoektermen. | Betere fallback voor gebruikers. | Laag | Geen |

### P1 — Belangrijk, geen blocker

| # | Verbeterpunt | Waarom | Complexiteit | Afhankelijkheid |
|---|--------------|--------|--------------|-----------------|
| 11 | **Sticky result hero op mobiel** — netto-bedrag blijft zichtbaar bij scrollen. | Gebruiker ziet altijd het antwoord. | Middel | #5 |
| 12 | **"Meer verdienen?" scenario slider** — +€100 tot +€2.000 bruto extra. | Sterk engagement- en conversie-instrument. | Middel | Geen |
| 13 | **Visuele belastingverdeling** — progress bar/donut voor belasting/kortingen. | Maakt resultaat visueel aantrekkelijker. | Middel | #6 |
| 14 | **People also ask H2/H3 structuur** op alle calculators. | Betere SEO + scanbaarheid. | Middel | Content |
| 15 | **Contextuele interne links in SEO-content** verrijken. | Betere pagerank + journey. | Laag | Geen |
| 16 | **Lighthouse CI** toevoegen aan GitHub Actions. | Automatische performance-regressie-detectie. | Middel | Goedkeuring dependency |
| 17 | **AdSense A/B test** (1 vs 2 ads, top vs bottom). | Data-gedreven ad-strategie. | Middel | Traffic |
| 18 | **Category pages content uitbreiden** naar 500–800 woorden unieke content. | Long-tail SEO + meer waarde. | Middel | Content |
| 19 | **FAQ schema op statische pagina's** waar relevant. | Rich snippets. | Laag | Geen |
| 20 | **Calculator meta descriptions** finetunen op actiegerichte taal. | Hogere CTR. | Laag | Geen |

### P2 — Strategisch / later

| # | Verbeterpunt | Waarom | Complexiteit | Afhankelijkheid |
|---|--------------|--------|--------------|-----------------|
| 21 | **Gebruikersbeoordelingen / aantal berekeningen** integreren. | Sociale proof; juridisch/privacy check nodig. | Hoog | Juridisch |
| 22 | **Vergelijk 2025 vs 2026 toggle** — seizoensgebonden verkeer. | Meer relevantie rond jaarwisseling. | Middel | Engine 2025 |
| 23 | **Meertalige pagina's** (nl-BE, en-GB) voor internationale SEO. | Lange termijn groei. | Hoog | Fase 4 |
| 24 | **FiscalMesh Agent "UX Designer"** — periodieke review op basis van analytics. | Autonome verbetering. | Hoog | Agents fase |
| 25 | **Core Web Vitals dashboard** documenteren in roadmap. | Transparante performance-cultuur. | Laag | Lighthouse CI |

---

## 8. Top 10 user-happiness UX items

Dit zijn de kleine en grote dingen die een gebruiker *blij* maken. Sommige zijn al geïmplementeerd en moeten behouden; anderen zijn kansen voor Sprint 104.

1. **Instant antwoord bij openen** — geen velden invullen, geen knoppen zoeken. *(done)*
2. **Live URL die mee-updatet** — delen en bookmarken zonder gedoe. *(done)*
3. **One-tap quick chips** — "Wat is mijn netto bij € 4.000?" in één klik. *(done)*
4. **"Link gekopieerd!" micro-feedback** — bevestiging op een kleine actie. *(done)*
5. **"Verder rekenen" met jouw cijfers** — use cases en recommendations nemen het huidige resultaat mee. *(done)*
6. **Geen iOS zoom op input** — 16px font-size, volledige breedte. *(done)*
7. **Skip link + zichtbare focus** — het voelt alsof de site voor iedereen is gebouwd. *(done)*
8. **Breadcrumbs op elke pagina** — je weet altijd waar je bent. *(done)*
9. **Trust badge "Gebaseerd op Belastingdienst 2026"** direct naast het resultaat. *(proposed)*
10. **Sticky netto hero op mobiel** — je ziet het antwoord altijd. *(proposed)*

**Conclusie:** De top 10 happiness-items zijn grotendeels al geïmplementeerd. Dat is een sterk signaal: het fundament voelt goed. Sprint 104 moet focussen op het behouden en polijsten van deze 10 items, plus het toevoegen van trust/social-proof elementen.

---

## 9. Implicaties voor Product Completion

### Wat al groen is
- Alle 10 calculators voldoen aan de 18 DoD-criteria (scoreboard 100%).
- Platformstructuur (homepage, categorieën, navigatie, search, footer) is af.
- Schema markup, breadcrumbs, analytics-ready attributen, accessibility quick wins zijn overal actief.
- CI/CD is groen; `npm run atlas:check` slaagt.

### Wat nog geel is
- **Content quality** van statische pagina's (P0 #2).
- **Advertenties / afleiding** (P0 #4) — strategische A/B-test.
- **First impression / trust** (P0 #9) — trust bar + social proof.

### Wat rood is
- Niets. Geen blockers.

### Advies
Product Completion is **technisch af**. De resterende werkzaamheden zijn polish, content en strategische metingen. Sprint 104 kan de laatste P0-items opruimen: Lighthouse audit + fixes, meta descriptions, trust bar. Daarna is Fase 1 officieel DONE.

---

## 10. Risico's en aanbevelingen

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| **Lighthouse metrics vallen tegen** | Middel | Meten op home, bruto-netto, categorie; alleen fixes doorvoeren als ze geen UX schaden. |
| **AdSense verplaatsen kost omzet** | Middel | A/B-test, niet blind verwijderen. |
| **Social proof is juridisch gevoelig** | Laag | Start met trust badges ("Gebaseerd op Belastingdienst 2026") voor ratings. |
| **Content uitbreiding wordt duplicate** | Laag | Per pagina unieke content schrijven; geen templates herhalen. |

---

## 11. Voorstel Sprint 104

**Titel:** Product Completion Final Polish — Lighthouse, Trust & Content

**Doel:** De laatste P0-items uit deze review oplossen en Product Completion formeel afronden.

**Scope:**
1. Handmatige Lighthouse audit op 3 pagina's + fix gemeten regressies.
2. Meta descriptions statische pagina's verlengen.
3. Trust bar standaardiseren onder resultaten.
4. Top-ad op mobiel evalueren (eventueel quick win).
5. Input + resultaat viewport test op 375/390px.

**Definition of Done:**
- Lighthouse scores: LCP < 2.5s, CLS < 0.1, INP < 200ms op de 3 geteste pagina's.
- Alle statische pagina's hebben meta description 120–160 tekens.
- Trust bar is zichtbaar op alle 10 calculators.
- `npm run atlas:check` slaagt.
- `docs/product/10-PRODUCT-POLISH-BACKLOG.md` bijgewerkt.

---

## 12. Gerelateerde documenten

- `docs/product/00-FISCALMESH-PRODUCT-ROADMAP.md` — strategische koers en Definition of Done.
- `docs/product/13-PLATFORM-QUALITY-AUDIT-v1.md` — technische kwaliteitsscorecard.
- `docs/product/08-COMPETITIVE-BENCHMARK.md` — concurrentieanalyse.
- `docs/product/09-BRUTO-NETTO-UX-REVIEW.md` — specifieke review bruto-netto pagina.
- `docs/product/10-PRODUCT-POLISH-BACKLOG.md` — prioritering van verbeterpunten.
- `docs/product/12-ANALYTICS-READY-FOUNDATION.md` — analytics-conventie.

---

**Eind van document.**
