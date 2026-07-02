# 00 — FiscalMesh Product Roadmap 1.0

> **Doel:** Eén centraal document dat de komende ontwikkelfase van Calculatieloket / FiscalMesh definitief vastlegt. Vanaf nu wordt iedere sprint hieraan getoetst.
> **Versie:** 1.0
> **Laatst bijgewerkt:** 2026-07-03
> **Status:** Leidend voor alle volgende Product Completion sprints.

---

## 1. Missie

Calculatieloket wordt het beste financiële platform van Europa. FiscalMesh wordt de engine achter alle landen.

- **Voor gebruikers:** snel, betrouwbaar en helder inzicht in salaris, belasting, toeslagen, wonen, ondernemen en auto-kosten.
- **Voor de business:** een schaalbare, herbruikbare knowledge- en calculatie-laag die eenvoudig naar nieuwe landen en domeinen uit te breiden is.
- **Voor ontwikkeling:** een duidelijke, gefaseerde koers waarbij geen sprongen worden gemaakt voordat de basis op orde is.

---

## 2. Visie

De ontwikkeling volgt een vaste volgorde:

1. **Eerst een perfect product.** Alle Nederlandse calculators en het platform voldoen aan een scherpe Definition of Done.
2. **Daarna dashboard.** Een centrale gebruikersomgeving voor scenario's, historie en persoonlijke instellingen.
3. **Daarna agents.** Autonome FiscalMesh Agents die SEO, content, knowledge, QA, design, analytics en product ondersteunen.
4. **Daarna internationale uitrol.** Pas als Nederland als referentieproduct staat, wordt actief gewerkt aan België, Duitsland, Frankrijk, Spanje en verder.

Deze volgorde is non-negotiable. Sprints die buiten deze volgorde willen versnellen, worden niet opgepakt.

---

## 3. Fases

### FASE 1 — Product Completion

**Doel:** Nederlandse site is afgerond, volledig getest, SEO-optimaal en gebruiksklaar.

**Omvang:**
- Alle 10 calculators in Nederland voldoen aan de **Calculator Definition of Done**.
- Homepage, calculator hub, categorieën, navigatie, header, footer, search en dashboard-voorbereiding voldoen aan de **Platform Definition of Done**.
- Knowledge Layer is volledig voor Nederland (`nl.*` objecten actief, gecontroleerd en gesourced).
- Recommendation Engine dekt alle calculators.
- CI/CD is stabiel groen; iedere PR doorloopt `Atlas CI`.
- Ads, analytics en meetplan zijn voorbereid en geïmplementeerd waar van toepassing.

**Eindtoestand:**
- Gebruiker kan vanaf de homepage in één klik bij elke calculator komen.
- Elke calculator heeft een perfecte mobiele en desktop UX, direct resultaat, URL state, deel-link, bronnen, FAQ en schema markup.
- Zoekmachines begrijpen de site-structuur, de calculators en de relaties tussen pagina's.
- Team kan met vertrouwen nieuwe landen aansluiten zonder achterstallig werk.

**Aandachtspunten:**
- Product Completion betekent ook opruimen: geen verouderde `_bak/` pagina's, geen dubbele code, geen ongebruikte componenten.
- Documentatie blijft synchroon: `05_changelog.md` en `docs/10-CHANGELOG.md` worden bij iedere sprint bijgewerkt.

---

### FASE 2 — FiscalMesh Dashboard

**Doel:** Een persoonlijke, centrale plek voor gebruikers om hun berekeningen en scenario's te beheren.

**Omvang:**
- Account / identity optioneel (bijvoorbeeld via e-mail of OAuth).
- Opslag van recente berekeningen en favoriete scenario's.
- Vergelijk-tool: twee of meer scenario's naast elkaar zetten.
- Notificaties / updates bij nieuwe belastingjaren of relevante wijzigingen.
- Voorbereiding op gepersonaliseerde recommendations.

**Voorwaarde:**
- Fase 2 start pas als Fase 1 (Product Completion) is afgerond.

**Eindtoestand:**
- Gebruiker kan zonder frictie terugkeren naar eerdere berekeningen en deze aanpassen.
- Dashboard is technisch voorbereid op latere agent-features (bijvoorbeeld FiscalMesh Agent “Personal Tax Assistant”).

---

### FASE 3 — FiscalMesh Agents

**Doel:** Autonome agents die herhaalbaar, kwalitatief onderhoudswerk overnemen.

**Omvang:**
- SEO Agent: meta-data, interne links, schema markup, content-gaps.
- Knowledge Agent: broncontrole, updates van belastingtarieven, voorstellen voor nieuwe Knowledge Objects.
- Content Agent: help-artikelen, FAQ, voorbeelden, toelichtingen bij wijzigingen.
- QA Agent: visuele regressie, Lighthouse, Core Web Vitals, toegankelijkheid.
- Design Agent: consistentie-check op componenten, kleurgebruik, typografie.
- Analytics Agent: traffic-analyse, conversie-analyse, A/B-test-voorstellen.
- Product Agent: backlog-prioritering, competitie-analyse, sprint-voorstellen.

**Voorwaarde:**
- Fase 3 start pas als Fase 2 (Dashboard) minimaal een MVP-versie heeft.
- Agents mogen nooit Product Completion vervangen; ze versnellen en verbeteren pas nadat de basis stabiel is.

**Eindtoestand:**
- Agents draaien op regelmatige basis en produceren concrete PR-voorstellen of rapportages.
- Menselijke review blijft verplicht voor iedere wijziging.

---

### FASE 4 — International Expansion

**Doel:** FiscalMesh uitrollen naar België, Duitsland, Frankrijk, Spanje en later andere Europese landen.

**Omvang:**
- Per land: locale-specifieke Knowledge Objects, calculator pagina's, SEO-content, bronvermeldingen en FAQ.
- Hergebruik van bestaande engines waar mogelijk (bijvoorbeeld VAT, belastingstructuur).
- Land-specifieke UI-patronen (bijvoorbeeld Belgische fr-BE / nl-BE, Duitse pensioenconstructies).
- Internationale hreflang-structuur en domeinstrategie.

**Voorwaarde:**
- Fase 4 start pas als Nederland als referentieproduct is afgerond (Fase 1).
- Minimaal één Engelstalig of tweetalig land dient als tussenstap voor procesverfijning.

**Eindtoestand:**
- Nederlandse site is volledig DONE en dient als blauwdruk.
- Knowledge Layer ondersteunt meerdere landen actief.
- Per land is er een lokale hub met de meest relevante calculators.

---

## 4. Definition of Done — Per calculator

Een calculator is pas **DONE** als aan alle onderstaande punten is voldaan. Ieder punt heeft een korte toelichting.

| # | Criterium | Toelichting |
|---|-----------|-------------|
| 1 | **App Shell** | Gebruikt `CalculatorShell` of een gelijkwaardige container. Input, resultaat, use cases, FAQ, bronnen en footer zijn consistent opgebouwd. |
| 2 | **Recommendation Engine** | `<FinancialJourney>` toont dynamische, contextuele recommendations via `getRecommendations()`. Updates client-side bij inputwijzigingen. |
| 3 | **Mobile UX** | Op 360px, 390px en 768px is de tool volledig bruikbaar zonder horizontale scroll; input ≥ 16px; CTA's groot genoeg om makkelijk te tikken. |
| 4 | **Desktop UX** | Op 1024px en 1440px is de layout in evenwicht; resultaat is snel zichtbaar; SEO-content is leesbaar gescheiden van de tool. |
| 5 | **SEO** | Unieke title/meta description, één H1, logische heading-structuur, canonical URL, interne links, geen client-only content. |
| 6 | **FAQ** | `FaqAccordion` component met relevante vragen; FAQPage schema in de `head` slot. |
| 7 | **Schema** | Minimaal `BreadcrumbList` + `FAQPage`; waar relevant `HowTo` schema. Schema is valide JSON-LD. |
| 8 | **Sources** | `InlineSources` of `SourceCards` tonen de officiële bronnen (Belastingdienst, FOD, etc.). “Bijgewerkt: 2026” badge aanwezig. |
| 9 | **Examples** | Minimaal één realistisch voorbeeld in de SEO-content; quick-chips bieden directe scenario's. |
| 10 | **URL State** | `history.replaceState` bijwerkt de URL bij input; pagina leest parameters bij load en toont direct resultaat. |
| 11 | **Copy Link** | Knop die de huidige URL (incl. parameters) kopieert naar klembord, met visuele feedback. |
| 12 | **Financial Journey** | `FinancialJourney` toont maximaal 4 logische vervolgstappen naar andere calculators, met actuele parameters. |
| 13 | **Accessibility** | Focus-states zichtbaar, labels gekoppeld, kleurcontrast voldoende, interactieve elementen bereikbaar met toetsenbord. |
| 14 | **Performance** | Geen render-blocking scripts, LCP < 2.5s mobiel, geen grote layout shifts. |
| 15 | **Analytics Ready** | Click-events op CTA's, quick-chips, copy-link en recommendations kunnen worden gemeten (data attributes / event hooks). |
| 16 | **AdSense Ready** | Advertenties staan nooit tussen input en resultaat; posities zijn consistent en conform AdSense-beleid. |
| 17 | **Internal Links** | Contextuele interne links naar minimaal 3 andere relevante calculators in de SEO-content. |
| 18 | **CI Green** | `npm run atlas:check` slaagt; 0 TypeScript-fouten; geen onverwachte waarschuwingen. |

---

## 5. Platform Definition of Done

Naast individuele calculators moet het platform als geheel voldoen aan onderstaande checklist voordat Product Completion is afgerond.

### Homepage
- [ ] H1 communiceert het platformdoel.
- [ ] Zoekveld werkt op mobiel en desktop; filtert client-side zonder server-rendered links te verbergen.
- [ ] Cluster-chips (categorieën) zijn zichtbaar en snel te tikken.
- [ ] “Snel starten” blok staat direct onder de hero en redirect naar calculators met URL state.
- [ ] Calculator cards tonen titel, vraag, belofte, badge en CTA.
- [ ] AdSense is bewust geplaatst, nooit boven de primaire tool/hero.
- [ ] `WebSite` + `SearchAction` JSON-LD schema aanwezig.
- [ ] FAQ, trustband en interne links aanwezig.
- [ ] Mobile-first CSS: 1 kolom op 360/390px, 2 kolommen op tablet, 3 kolommen op desktop.

### Calculator Hub
- [ ] Alle calculators zijn vindbaar binnen 2 klikken vanaf de homepage.
- [ ] Hub-structuur is logisch: per categorie (Inkomen, Wonen, Ondernemen, Belasting, Auto).
- [ ] Eventuele categoriepagina's zijn server-rendered en hebben eigen SEO-content.

### Categoriepagina's
- [ ] Elke categorie heeft een eigen URL, H1, beschrijving en lijst met relevante calculators.
- [ ] Interne links tussen categorieën en calculators.
- [ ] BreadcrumbList schema aanwezig.

### Navigatie
- [ ] Header bevat logo, zoekveld (mobiel: icoon) en hoofdcategorieën.
- [ ] Navigatie is toetsenbord-toegankelijk en mobiel hamburger-vriendelijk.
- [ ] Geen broken links; sitemap bevat alle publieke pagina's.

### Search
- [ ] Zoekresultaten filteren server-rendered cards; zonder JS is de pagina nog steeds bruikbaar.
- [ ] Zoekterm kan worden gedeeld via URL (optioneel).
- [ ] Lege state toont hulp en links naar categorieën.

### Footer
- [ ] Contact, privacy, cookies, disclaimer, over ons, sitemap links.
- [ ] Bronvermelding / copyright.
- [ ] Geen advertenties boven de footer op mobiel.

### Header
- [ ] Header blijft niet op mobiel te veel ruimte innemen.
- [ ] Geen sticky header die de content verbergt (tenzij bewust getest).

### Dashboard (Fase 2)
- [ ] MVP: recente berekeningen, favorieten, scenario-vergelijking.
- [ ] Optionele account / identity.
- [ ] Voldoet aan dezelfde UX, SEO, performance en accessibility normen als calculators.

### Knowledge Layer
- [ ] Alle Nederlandse objecten zijn `active` en gecontroleerd.
- [ ] `resolveRule()` heeft cache, fallback, diagnostics en version support.
- [ ] Registry is gegenereerd en gesynchroniseerd.
- [ ] Validatie, QA en rule-impact tooling werken.

### Recommendation Engine
- [ ] Registry dekt alle calculators.
- [ ] Rules zijn gedocumenteerd en getest.
- [ ] Client-side update werkt betrouwbaar.
- [ ] Maximaal 4 recommendations per pagina.

### CI/CD
- [ ] GitHub Actions workflow draait bij iedere PR en push naar `main`.
- [ ] Branch protection vereist PR + groene `Atlas CI` status.
- [ ] `npm run atlas:check` slaagt lokaal en in CI.
- [ ] Geen secrets, deploy-stappen of Cloudflare/Wrangler in de CI-workflow.

---

## 6. Roadmap volgorde

De volgende regels zijn non-negotiable:

> **NIET bouwen aan agents voordat Product Completion klaar is.**

Agents zijn ondersteunend en pas relevant als de gebruikerservaring, content, SEO en techniek van het Nederlandse platform op orde zijn. Vroegtijdige agents verhullen achterstallig werk in plaats van dat ze het oplossen.

> **NIET internationaal uitrollen voordat Nederland referentieproduct is.**

Nederland fungeert als blauwdruk. Pas als alle calculators, homepage, hub, SEO en CI/CD daar DONE zijn, wordt kennis en code hergebruikt voor België, Duitsland, Frankrijk, Spanje en verdere landen.

> **NIET nieuwe calculators toevoegen buiten de huidige Product Completion set zonder expliciete goedkeuring.**

De huidige set (10 calculators) wordt eerst afgemaakt. Nieuwe domeinen worden pas opgepakt als de bestaande set DONE is.

---

## 7. Quality Rules

Iedere Product Completion sprint moet minimaal één van de volgende doelen verbeteren:

- **Gebruikerservaring** — sneller, duidelijker, makkelijker, betere mobiele UX, betere toegankelijkheid.
- **SEO** — betere metadata, schema markup, interne links, contentstructuur, indexeerbaarheid.
- **Performance** — snellere LCP, kleinere JS/CSS, minder layout shifts, betere caching.
- **Contentkwaliteit** — betere voorbeelden, FAQ, bronvermelding, actuele cijfers, duidelijke taal.
- **Interne links** — betere journey tussen calculators, categorieën, gerelateerde content.
- **Schaalbaarheid** — herbruikbare componenten, betere engine-abstractie, schonere registry.
- **Onderhoudbaarheid** — opruimen van dead code, betere documentatie, tests, consistente code-stijl.

Als een sprint hier niet aan bijdraagt, hoort hij niet in Product Completion. Uitzonderingen zijn pure bugfixes of infrastructurele wijzigingen die direct de kwaliteit van de productieomgeving beveiligen.

---

## 8. Sprint Governance

Vanaf nu krijgt iedere Product Completion sprint de volgende velden voordat hij wordt opgepakt:

1. **Doel** — Wat gaan we concreet opleveren?
2. **Waarom** — Welke Quality Rule (zie §7) wordt verbeterd? Wat levert het op voor gebruiker, SEO of business?
3. **Definition of Done** — Welke checklist-items uit §4 en §5 moeten (deels) worden afgevinkt?
4. **Acceptatiecriteria** — Hoe weten we dat de sprint slaagt? Welke commando's, tests, metrics?
5. **Risico's** — Wat kan misgaan? Hoe mitigeren we dat?
6. **Volgende sprint** — Welke sprint hangt hier direct mee samen of komt logisch daarna?

Een sprint zonder deze velden wordt niet gestart.

---

## 9. Product Scoreboard

Huidige status op basis van de projectstatus. Percentages zijn een indicatie van volledigheid ten opzichte van Fase 1 (Product Completion).

| Categorie | Nederland | België | Duitsland | Frankrijk | Spanje | Opmerking |
|-----------|-----------|--------|-----------|-----------|--------|-----------|
| **Engine** | 90% | 20% | 20% | 10% | 10% | Nederlandse engines zijn volwassen; land-specifieke logic ontbreekt nog. |
| **Knowledge** | 95% | 75% | 75% | 40% | 40% | NL, BE, DE kennis actief; FR/ES income tax nog draft. |
| **Homepage** | 85% | — | — | — | — | Redesign, search, quick start; nog kleine polish mogelijk. |
| **Calculator Hub** | 80% | — | — | — | — | Homepage fungeert als hub; categoriepagina's ontbreken. |
| **Dashboard** | 0% | 0% | 0% | 0% | 0% | Niet gestart; Fase 2. |
| **Agents** | 0% | 0% | 0% | 0% | 0% | Niet gestart; Fase 3. |

| Calculator | App Shell | Recommendations | Mobile UX | Desktop UX | SEO | FAQ | Schema | Sources | Examples | URL State | Copy Link | Fin. Journey | A11y | Performance | Analytics | AdSense | Internal Links | CI Green | **Totaal** |
|------------|-----------|-----------------|-----------|------------|-----|-----|--------|---------|----------|-----------|-----------|--------------|------|-------------|-----------|---------|----------------|----------|-----------|
| Bruto-netto 2026 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| Salaris calculator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| Hypotheek calculator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| Toeslagen calculator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| BTW calculator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| BTW terugrekenen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| BTW inclusief/exclusief | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| ZZP calculator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| Auto importkosten | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |
| Vakantiegeld calculator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 100% |

> **Verklaring scoreboard:** 100% betekent dat de calculator voldoet aan alle 18 DoD-criteria in §4. De platform-items (homepage, hub, dashboard) zijn globale percentages. Agent- en dashboard-features staan op 0% omdat ze expliciet buiten Product Completion vallen.

---

## 10. Leidend principe

Dit document is leidend voor alle volgende Product Completion sprints.

Iedere sprint wordt afgevinkt tegen:
- de fase-volgorde in §3,
- de non-negotiables in §6,
- de Quality Rules in §7,
- de Sprint Governance in §8,
- de Definition of Done in §4 en §5,
- en het Product Scoreboard in §9.

Sprints die hier niet aan bijdragen, worden niet opgepakt.

---

**Eind van document.**
