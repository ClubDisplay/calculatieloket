# Salaris / bruto-netto cluster audit

> **Doel:** SEO- en contentkwaliteitsaudit van de salaris/bruto-netto cluster op Calculatieloket.nl.  
> **Type:** Docs-only — geen code, geen contentwijzigingen, geen deploy.  
> **Gemaakt:** 2026-07-06  
> **Gebaseerd op:** `docs/agents/seo-strategist-agent.md`, `docs/agents/content-quality-agent.md`, `docs/agents/adsense-readiness-agent.md`, `docs/dashboard/CALCULATIELOKET_GROWTH_DASHBOARD.md` en `docs/dashboard/sprint-backlog.md`.  

---

## 1. Samenvatting

De Salaris / bruto-netto cluster is **redelijk sterk**. Alle drie de pagina’s hebben vertrouwenscomponenten, datum, bronvermelding, indicatie-disclaimers, voorbeelden en FAQ’s. Er zijn echter concrete SEO- en contentkwaliteitkansen:

- De pagina’s `/bruto-netto-2026/` en `/salaris-calculator/` overlappen mogelijk qua zoekintentie (“bruto netto” en “salaris berekenen”). De rolverdeling moet scherper.
- De cluster mist een consistente interne crosslink-sectie zoals de BTW-cluster met “Ook handig binnen btw”.
- In `/vakantiegeld-calculator.astro` is een harde toeslagclaim aanwezig die moet worden verzacht.
- Sommige pagina’s gebruiken 30 juni 2026, andere 1 juli 2026. Bij wijzigingen gelijk trekken.
- AdSense staat in review; advertentieplaatsing en ad code blijven buiten scope.

Deze audit stelt **geen wijzigingen voor aan rekenlogica, rekenformules, fiscale parameters, URL’s, SEO metadata, privacy/cookie/consent of advertentiecode**. De voorgestelde volgende stap is een kleine content-PR op basis van sectie 10.

---

## 2. Geanalyseerde pagina’s

| URL | Bestand | Doel | Zoekintentie | Status | Belangrijkste risico | Belangrijkste kans |
|---|---|---|---|---|---|---|
| `/bruto-netto-2026/` | `src/pages/bruto-netto-2026.astro` | Algemene bruto-netto uitleg + tabel + indicatie | “bruto netto 2026”, “hoeveel netto bij bruto”, “loonheffing tabel 2026” | Live | Cannibalisatie met `/salaris-calculator/` | Rol als algemene landingspagina versterken |
| `/salaris-calculator/` | `src/pages/salaris-calculator.astro` | Interactieve salarisberekening | “salaris calculator”, “bruto netto calculator”, “netto salaris berekenen” | Live | Niet duidelijk genoeg onderscheid van `/bruto-netto-2026/` | Rol als interactieve tool met pensioenpercentage benadrukken |
| `/vakantiegeld-calculator/` | `src/pages/vakantiegeld-calculator.astro` | Vakantiegeld-indicatie | “vakantiegeld bruto netto”, “vakantiegeld berekenen 2026” | Live | Harde claim in use-case copy | Cluster-crosslinking toevoegen + claim verzachten |

---

## 3. Sterke punten

- **Bronvermelding aanwezig** — Belastingdienst / Dienst Toeslagen / Rijksoverheid genoemd.
- **Datum/actualiteit aanwezig** — “Laatst bijgewerkt” op de pagina’s.
- **Indicatie-disclaimer aanwezig** — teksten markeren uitkomsten als indicatie.
- **Voorbeelden aanwezig** — concrete rekenvoorbeelden per pagina.
- **FAQ’s aanwezig** — veelgestelde vragen per pagina.
- **Geen grote technische blockers gevonden** — build, tests en content-audit waren recent groen.

---

## 4. Risico’s en kansen

### 4.1 Cannibalisatie / dubbele intentie

- `/bruto-netto-2026/` en `/salaris-calculator/` richten zich beide op bruto-netto en salaris berekenen.
- De content overlapt: beide pagina’s hebben tarieven, voorbeelden, FAQ en vertrouwenssecties.
- **Aanbevolen:** intro’s en FAQ’s duidelijker differentiëren.
  - `/bruto-netto-2026/` = algemene uitleg, tabel, snelle indicatie, jaarcontext 2026.
  - `/salaris-calculator/` = interactieve berekening met pensioenpercentage, heffingskortingen en nettobedrag.

### 4.2 Ontbrekende cluster-crosslinking

- De BTW-cluster heeft een consistente “Ook handig binnen btw”-sectie.
- De Salaris-cluster mist een vergelijkbare “Ook handig binnen salaris”-sectie.
- **Aanbevolen:** voeg een consistente interne link-sectie toe op alle drie de pagina’s, met links naar:
  - `/bruto-netto-2026/`
  - `/salaris-calculator/`
  - `/vakantiegeld-calculator/`

### 4.3 Harde claim in use-case

In `/vakantiegeld-calculator.astro` (gerelateerde use-case copy) staat:

> “Check of je recht hebt op huur- of zorgtoeslag.”

Dit is een **harde claim** en risicovol voor content-safety en AdSense-readiness.

**Aanbevolen zachtere formulering:**

> “Krijg een indicatie of huur- of zorgtoeslag relevant kan zijn voor jouw situatie.”

**Gebruik niet:**
- “je hebt recht op”
- “check of je recht hebt”
- “bereken of je recht hebt”

### 4.4 Datumverschillen

- Sommige pagina’s gebruiken **30 juni 2026** als laatste-update-datum.
- Andere pagina’s gebruiken **1 juli 2026**.
- **Aanbevolen:** gewijzigde pagina’s gelijk trekken naar “Laatst bijgewerkt: 1 juli 2026”.

### 4.5 AdSense

- AdSense-status: **Getting ready / review loopt** (2026-07-05).
- **Geen advertentieplaatsing aanpassen.**
- **Geen ad code wijzigen.**
- **Geen `PUBLIC_ADS_ENABLED` aanpassen.**
- Vermijd grote productiewijzigingen tijdens de review.

---

## 5. SEO-structuur

Aanbevolen rolverdeling:

- **`/bruto-netto-2026/`** — hoofdlandingspagina voor brede bruto-netto intentie. Focus op algemene uitleg, loonheffingstabel, snelle indicatie en jaarcontext 2026.
- **`/salaris-calculator/`** — interactieve salarisintentie. Focus op pensioenpercentage, heffingskortingen, nettobedrag en gebruikers die direct willen rekenen.
- **`/vakantiegeld-calculator/`** — specifieke vakantiegeldintentie. Focus op vakantiegeldindicatie, bruto-netto kanteling en timing van uitbetaling.

Alle drie de pagina’s moeten elkaar via een cluster-crosslink onder de naam “Ook handig binnen salaris” verwijzen.

---

## 6. Officiële bronnen nodig

| Onderwerp | Bron nodig | Waarom | Later te controleren URL | Prioriteit |
|---|---|---|---|---|
| Loonbelasting / loonheffing | Belastingdienst | Bruto-netto context en tarieven | [te bepalen] | Hoog |
| Heffingskortingen | Belastingdienst | Algemene uitleg over arbeidskorting, algemene heffingskorting | [te bepalen] | Hoog |
| Vakantiegeld | Rijksoverheid of Belastingdienst | Uitleg over vakantiegeld, moment van uitbetaling, belasting | [te bepalen] | Medium |
| Toeslagenverwijzing | Dienst Toeslagen | Indicatieve verwijzing naar toeslagen | [te bepalen] | Medium |

> **Let op:** dit auditdocument voegt geen nieuwe bedragen, percentages of regels toe. De exacte bron-URL’s worden later bepaald bij de content-PR.

---

## 7. AdSense-readiness

| Check | Bevinding | Opmerking |
|---|---|---|
| Unieke content | Redelijk, maar kan sterker | Cluster-crosslinking en differentiatie ontbreken |
| Geen under-construction | Geen blocker gevonden | — |
| Geen placeholders | Geen blocker gevonden | — |
| Harde claims | Één risicovolle toeslagzin gevonden | Zie sectie 4.3 |
| Loze knoppen | Geen nieuwe signalen | PR #56 heeft dit opgelost |
| Zichtbare lege ad containers | Niet browsermatig gecontroleerd | Geen wijzigingen nu |
| Privacy/cookies/disclaimer/contact/over-ons | Buiten scope | Niet geraakt in deze audit |
| Advertentieplaatsing | Niet aanpassen tijdens review | AdSense status: review loopt |

---

## 8. Aanbevolen verbeteringen

| Prioriteit | Pagina | Verbetering | Type | Risico | Verwachte impact | Bron nodig? | Eerst analyseren of direct bouwen? |
|---|---|---|---|---|---|---|---|
| P1 | `/vakantiegeld-calculator/` | Harde toeslagclaim zachter maken | Content | Laag | Middel | Nee | Direct bouwen |
| P1 | `/bruto-netto-2026/` | Intro/FAQ differentiëren als algemene landingspagina | Content | Middel | Hoog | Ja | Eerst analyse in content-PR |
| P1 | `/salaris-calculator/` | Intro/FAQ differentiëren als interactieve tool | Content | Middel | Hoog | Ja | Eerst analyse in content-PR |
| P1 | Alle drie | “Ook handig binnen salaris”-sectie toevoegen | SEO / Interne links | Laag | Hoog | Nee | Direct bouwen |
| P2 | Gewijzigde pagina’s | Datum gelijk trekken naar 1 juli 2026 | Content | Laag | Laag | Nee | Direct bouwen |
| P2 | Cluster | FAQ uitbreiden na Search Console data | Content | Laag | Middel | Ja | Eerst analyse met data |
| P3 | Cluster | Advertentieplaatsing optimaliseren | AdSense | Laag | Onbekend | Nee | Na AdSense-goedkeuring |

---

## 9. Scopevoorstel voor volgende PR

### Scope

- Alleen de drie salarisclusterpagina’s: `/bruto-netto-2026/`, `/salaris-calculator/` en `/vakantiegeld-calculator/`.
- Geen rekenlogica.
- Geen fiscale parameters.
- Geen URL’s.
- Geen SEO metadata (titles / meta descriptions).
- Geen advertentiecode.
- Geen cookie/consent.
- Geen nieuwe pagina’s.
- Geen deploy zonder akkoord.

### Voorgestelde wijzigingen

1. Introducties van `/bruto-netto-2026/` en `/salaris-calculator/` differentiëren.
2. FAQ’s licht aanscherpen zodat de rol van elke pagina duidelijker is.
3. “Ook handig binnen salaris”-sectie toevoegen op alle drie de pagina’s.
4. Harde toeslagclaim in `/vakantiegeld-calculator/` aanpassen naar indicatie-copy.
5. “Laatst bijgewerkt” op gewijzigde pagina’s gelijk trekken naar **1 juli 2026**.

---

## 10. Exacte OpenCode-prompt voor volgende PR

> **Niet uitvoeren in deze audit.** Dit prompt is bedoeld voor een latere content-PR, na akkoord.

```text
Je werkt in de codebase van Calculatieloket.nl.

Doel:
Verbeter de Salaris/bruto-netto contentcluster op basis van docs/audits/salary-bruto-netto-cluster-audit.md.

Belangrijk:
- Geen rekenlogica aanpassen.
- Geen rekenformules aanpassen.
- Geen fiscale parameters aanpassen.
- Geen URL’s wijzigen.
- Geen SEO titles/meta descriptions wijzigen.
- Geen privacy/cookie/consent wijzigen.
- Geen advertentiecode wijzigen.
- Geen PUBLIC_ADS_ENABLED wijzigen.
- Geen nieuwe pagina’s maken.
- Geen deploy uitvoeren.
- AdSense-review loopt; houd de PR klein en veilig.

Nieuwe branch:
seo/salary-cluster-content-quality

Lees:
- docs/audits/salary-bruto-netto-cluster-audit.md
- src/pages/bruto-netto-2026.astro
- src/pages/salaris-calculator.astro
- src/pages/vakantiegeld-calculator.astro
- src/components/calculator/UseCasesPanel.astro indien relevant

Taken:
1. Differentieer /bruto-netto-2026/ en /salaris-calculator/:
   - /bruto-netto-2026/ = algemene uitleg, tabel, snelle indicatie, jaarcontext 2026
   - /salaris-calculator/ = interactieve berekening met pensioenpercentage, heffingskortingen en nettobedrag

2. Voeg op alle drie pagina’s een consistente “Ook handig binnen salaris”-sectie toe.
   Link minimaal naar:
   - /bruto-netto-2026/
   - /salaris-calculator/
   - /vakantiegeld-calculator/

3. Pas de risicovolle toeslagzin aan.
   Vervang harde claims zoals:
   - “Check of je recht hebt op huur- of zorgtoeslag”
   door:
   - “Krijg een indicatie of huur- of zorgtoeslag relevant kan zijn voor jouw situatie.”

4. Trek “Laatst bijgewerkt” op gewijzigde pagina’s gelijk naar:
   1 juli 2026

5. Houd schrijfstijl helder Nederlands.
6. Gebruik “indicatie” waar financiële uitkomsten worden besproken.
7. Voeg geen nieuwe fiscale bedragen, percentages of regels toe.
8. Voeg geen nieuwe bronclaims toe zonder bestaande/officiële bron.
9. Houd de bestaande componentstructuur aan.

Voer uit:
- npm run build
- npm run audit:content
- npm run test
- git status

Maak PR naar main.

PR-titel:
seo: improve salary and bruto-netto content cluster

Rapporteer:
1. Branchnaam.
2. PR URL.
3. Welke bestanden zijn aangepast?
4. Welke teksten zijn inhoudelijk gewijzigd?
5. Is er code/calculatorlogica aangepast?
6. Zijn fiscale parameters aangepast?
7. Zijn URL’s of metadata aangepast?
8. Zijn advertentiecode of cookie/consent aangepast?
9. Resultaat npm run build.
10. Resultaat npm run audit:content.
11. Resultaat npm run test.
12. Is deploy nodig?
13. Welke pagina’s moeten browsermatig gecontroleerd worden?
14. Niet mergen/deployen zonder akkoord.
```

---

## 11. Bronverwijzingen

- `docs/agents/seo-strategist-agent.md` — werkinstructie voor SEO-analyse en clusterversterking.
- `docs/agents/content-quality-agent.md` — werkinstructie voor harde claims, indicatie-copy en bronvermelding.
- `docs/agents/adsense-readiness-agent.md` — werkinstructie voor AdSense-risico’s tijdens review.
- `docs/dashboard/CALCULATIELOKET_GROWTH_DASHBOARD.md` — bron van waarheid voor status, backlog en clusterplanning.
- `docs/dashboard/sprint-backlog.md` — sprintplanning voor content- en SEO-werk.

---

## 12. Beperkingen van deze audit

- Geen Search Console data beschikbaar; klikken, vertoningen, CTR en gemiddelde positie zijn onbekend.
- Geen browsermatige visuele controle uitgevoerd.
- Geen harde claims in hoofdcontent gevonden, met uitzondering van één use-case beschrijving.
- Geen nieuwe fiscale bedragen, percentages of regels toegevoegd.
