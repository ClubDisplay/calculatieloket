# 08 — Competitive Benchmark: Nederlandse bruto-netto calculators

> **Doel:** Objectief in kaart brengen hoe de belangrijkste Nederlandse bruto-netto calculators scoren op UX, conversie, vertrouwen, SEO en AdSense. De uitkomst vormt de basis voor Sprint 079/080 product polish.  
> **Laatst bijgewerkt:** 2026-06-30  
> **Scope:** Geen nieuwe calculator bouwen, geen engine wijzigen, geen Knowledge Layer wijzigen. Alleen leren, niet kopiëren.

---

## 1. Methode

We hebben de volgende pagina’s bekeken (desktop én mobiel viewport, via de content die de server teruggeeft):

| Concurrent | URL bekeken | Type |
|---|---|---|
| **BerekenHet.nl** | `https://www.berekenhet.nl/werk-en-inkomen/nettoloon.html` | Algemene rekentool-portal |
| **Loonwijzer.nl / WageIndicator** | `https://wageindicator.org/nl-nl/werk-in-nederland/brutonetto-check/` (Loonwijzer.nl zelf blokkeerde bot-verkeer) | Arbeidsmarkt-data + iframe calculator |
| **SalarisNetto.nl** | `https://www.salarisnetto.nl/` | Dedicated bruto-netto calculator |
| **Nibud** | `https://www.nibud.nl/onderwerpen/werken/` | Onafhankelijke voorlichting + tools |

Daarnaast hebben we gekeken naar de huidige `calculatieloket.nl/bruto-netto-2026/` (Sprint 078 status).

Analyse criteria (12 punten, score 1-10):

1. **Snelheid naar antwoord** — hoe snel zie je een resultaat na landing?
2. **Eenvoud invoer** — aantal velden, mentale belasting, foutgevoeligheid.
3. **Mobiele UX** — touch targets, scroll, viewport gebruik, leesbaarheid.
4. **Desktop UX** — layout, whitespace, focus, zichtbaarheid van acties.
5. **Resultaatpresentatie** — helderheid, detailniveau, visuele hiërarchie.
6. **Betrouwbaarheid / transparantie** — bronnen, disclaimer, updates, vertrouwensignalen.
7. **Uitleg** — begrijpelijke context rond bruto/netto, tarieven, heffingskortingen.
8. **FAQ** — veelgestelde vragen en antwoorden, gericht op de gebruiker.
9. **Advertenties / afleiding** — zijn ads aanwezig, en verstoren ze de tool-flow?
10. **Vervolgacties** — wat kan de gebruiker doen na het resultaat?
11. **Interne links / journey** — doorverwijzing naar relevante calculators en content.
12. **SEO-structuur** — titel, meta, headings, contentdiepte, schema markup.

---

## 2. Per concurrent

### 2.1 BerekenHet.nl — nettoloon berekenen

**Screenshot / flow-beschrijving**
Boven de vouw staat een lange HTML-tabel met tientallen velden. De gebruiker moet scrollen door jaar, bruto salaris, loonperiode, vakantiegeld/13e maand, jaarinkomen vorig jaar, geboortedatum, auto/fiets van de zaak, bijtelling, onbelaste vergoedingen, pensioenpremie, loonheffingskorting en berekeningsdatum. Pas onderaan staat de “Berekenen”-knop. Het resultaat verschijnt na een server-side postback.

**Sterke punten**
- Zeer uitgebreid; dekt bijna elke persoonlijke situatie (auto van de zaak, bijtelling, loon in natura, onbelaste vergoedingen).
- Duidelijke “is dit de juiste tool?” keuzehulp bovenaan.
- Lange historie en 26 jaar merkvertrouwen; beoordeling 8,4/10 van gebruikers.
- Uitgebreide extra informatie over loonbelasting, bijtelling, etc.

**Zwakke punten**
- **Hoge drempel:** tientallen velden; de meeste gebruikers hebben niet alle informatie paraat.
- **Snelheid:** resultaat pas na scrollen, invullen en klikken; geen instant-feedback.
- **Mobiel:** de lange form is op een telefoon lastig te overzien; velden en uitlegteksten staan dicht op elkaar.
- **Resultaatpresentatie:** niet zichtbaar in de opgehaalde content; waarschijnlijk een tweede pagina/section.
- **Geen duidelijke “Wat kun je hiermee?”** na het resultaat; wel verwijzingen naar andere tools.

**Scoring BerekenHet.nl**

| Criterium | Score | Toelichting |
|---|---|---|
| Snelheid naar antwoord | 4 | Pas na volledig invullen + postback. |
| Eenvoud invoer | 3 | Veel velden, hoge cognitieve belasting. |
| Mobiele UX | 4 | Lange form, veel scroll. |
| Desktop UX | 6 | Overzichtelijker dan mobiel, maar nog steeds druk. |
| Resultaatpresentatie | 6 | Gedetailleerd, maar pas na actie. |
| Betrouwbaarheid | 9 | 26 jaar onafhankelijk, beoordelingen, duidelijke disclaimer. |
| Uitleg | 8 | Uitgebreide achtergrondinfo. |
| FAQ | 7 | Keuzetool + extra info; geen echte FAQ op deze pagina. |
| Advertenties / afleiding | 7 | Geen ads zichtbaar; wel veel tekst/uitleg rond tool. |
| Vervolgacties | 6 | Verwijzing naar andere tools, maar geen gerichte next steps. |
| Interne links | 8 | 65 werk-inkomen tools aan elkaar gelinkt. |
| SEO-structuur | 8 | Sterke domein, goede title/H1, 2026-tarieven. |
| **Totaal gemiddeld** | **6,3** | |

---

### 2.2 Loonwijzer.nl / WageIndicator — Bruto/Netto-Check

**Screenshot / flow-beschrijving**
De pagina zelf is een dunne landing page: H1, korte intro, en een iframe naar `https://salarissimulator.youforce.nl/pro/`. De calculator draait dus in een externe applicatie. Links naar “Uitleg werknemers”, “Uitleg werkgevers”, “Werkgeversdeel” en “Veelgestelde vragen” staan onder de iframe. De site is onderdeel van WageIndicator, een wereldwijde non-profit met arbeidsmarktdata.

**Sterke punten**
- Professioneel imago; data-gedreven en onafhankelijk.
- Duidelijke scheiding tussen uitleg, FAQ en tool.
- Ruim aanbod aan verwante tools (minimumloon, leefbaar loon, CAO’s, salarischeck).
- Geen advertenties; focus ligt op data.

**Zwakke punten**
- **Iframe:** laadtijd, afhankelijkheid van externe domein, minder SEO-waarde, mobiel vaak slechtere ervaring.
- **Snelheid:** gebruiker moet wachten tot de iframe is geladen; resultaat pas na interactie in de externe app.
- **Mobiel:** iframe calculators schalen vaak niet optimaal; touch targets en fonts kunnen afwijken.
- **Geen server-rendered resultaat:** Google ziet vooral de container-pagina.
- **Vervolgacties** zijn beperkt tot verwante pagina’s; geen persoonlijke “jouw situatie” journey.

**Scoring Loonwijzer.nl / WageIndicator**

| Criterium | Score | Toelichting |
|---|---|---|
| Snelheid naar antwoord | 5 | Iframe laadt; resultaat pas na interactie. |
| Eenvoud invoer | 5 | Onbekend; iframe-tool lijkt professioneel maar niet superminimaal. |
| Mobiele UX | 4 | Iframe is meestal een pijnpunt op mobiel. |
| Desktop UX | 5 | Landing page is netjes, maar tool is losgekoppeld. |
| Resultaatpresentatie | 6 | Professioneel, maar geen zichtbaar detail zonder iframe. |
| Betrouwbaarheid | 9 | WageIndicator is een gerenommeerde non-profit. |
| Uitleg | 7 | Aparte uitleg-pagina’s. |
| FAQ | 7 | Link naar FAQ. |
| Advertenties / afleiding | 8 | Geen ads. |
| Vervolgacties | 6 | Links naar andere tools. |
| Interne links | 8 | Veel verwante tools. |
| SEO-structuur | 6 | Weinig server-rendered content op de tool-pagina zelf. |
| **Totaal gemiddeld** | **6,0** | |

---

### 2.3 SalarisNetto.nl — Bruto-netto berekenen 2026

**Screenshot / flow-beschrijving**
Een dedicated, compacte calculator. Bovenaan een jaar-toggle (2025/2026) en een enkel bruto-veld (jaar/maand). Direct onder het invoerveld staat een geschat maandbedrag. Onder de input verschijnt automatisch het resultaat: netto jaarsalaris, netto per maand, bruto inclusief vakantiegeld, belastingoverzicht (inkomstenbelasting, arbeidskorting, algemene heffingskorting, loonheffing, vakantiegeld), effectief belastingtarief en belastingschijven. Onderaan een korte FAQ en links naar ZZP, BV, vergelijken, WW-uitkering.

**Sterke punten**
- **Snelheid:** resultaat is direct zichtbaar; invoer geeft instant feedback.
- **Eenvoud:** 1 hoofdveld + jaartal + vakantiegeld + partner; lage drempel.
- **Resultaatpresentatie:** helder, compact, met effectief belastingtarief en schijven.
- **Mobiel:** single-column, compact, goed leesbaar.
- **FAQ:** beknopte, relevante vragen direct onder de calculator.

**Zwakke punten**
- **Geen diepgaande uitleg:** gebruiker ziet het bedrag, maar niet waarom het exact zo is.
- **Beperkte vervolgacties:** links naar ZZP/BV/WW, maar geen “Wat betekent dit voor toeslagen/hypotheek?”
- **Geen bronvermelding** boven de vouw; betrouwbaarheid moet vooral uit disclaimer komen.
- **Geen sociale proof** (beoordelingen, aantal berekeningen).
- **Geen “delen/kopieer link”** of snelle scenario’s.

**Scoring SalarisNetto.nl**

| Criterium | Score | Toelichting |
|---|---|---|
| Snelheid naar antwoord | 9 | Direct resultaat bij laden en bij input. |
| Eenvoud invoer | 9 | Minimaal aantal velden. |
| Mobiele UX | 8 | Single-column, compact. |
| Desktop UX | 8 | Nette, gecentreerde layout. |
| Resultaatpresentatie | 8 | Duidelijk belastingoverzicht + effectief tarief. |
| Betrouwbaarheid | 7 | Disclaimer aanwezig, maar weinig bronvermelding. |
| Uitleg | 6 | Korte FAQ; geen uitgebreide achtergrond. |
| FAQ | 6 | Kort, maar relevant. |
| Advertenties / afleiding | 6 | Geen ads zichtbaar; weinig afleiding. |
| Vervolgacties | 7 | Links naar ZZP/BV/vergelijken/WW. |
| Interne links | 7 | Enkele verwante tools. |
| SEO-structuur | 7 | Goede title/H1; content is dunner. |
| **Totaal gemiddeld** | **7,3** | |

---

### 2.4 Nibud — Onderwerp Werken

**Screenshot / flow-beschrijving**
Nibud is geen bruto-netto calculator, maar de belangrijkste onafhankelijke autoriteit op het gebied van huishoudfinanciën. De “Werken”-pagina biedt uitleg over loonstrook, vakantiegeld, thuiswerken, starten op de arbeidsmarkt en heeft tools zoals de WerkUrenBerekenaar, WerkZorgBerekenaar en Geldplan Werkloosheid. De content is gericht op begrip en keuzes, niet op een snel bedrag.

**Sterke punten**
- **Absoluut vertrouwen:** onafhankelijk, door overheid en media erkend.
- **Uitleg:** heel uitgebreid, gericht op begrip van de gevolgen van werk/inkomen.
- **Tools:** WerkUrenBerekenaar geeft inzicht in meer/minder werken.
- **Geen advertenties:** geen commerciële afleiding.

**Zwakke punten**
- **Geen dedicated bruto-netto calculator** voor een snel antwoord.
- **Niet direct resultaatgericht:** gebruiker moet eerst veel lezen.
- **Vervolgacties** zijn voorlichtend, niet calculator-gericht.

**Scoring Nibud (informatieve concurrent)**

| Criterium | Score | Toelichting |
|---|---|---|
| Snelheid naar antwoord | N.v.t. | Geen directe bruto-netto calculator. |
| Eenvoud invoer | N.v.t. | |
| Mobiele UX | 7 | Professionele, toegankelijke site. |
| Desktop UX | 7 | |
| Resultaatpresentatie | N.v.t. | |
| Betrouwbaarheid | 10 | Onafhankelijk, autoriteit. |
| Uitleg | 9 | Zeer uitgebreid en begrijpelijk. |
| FAQ | 8 | Vraag-en-antwoord blokken. |
| Advertenties / afleiding | 10 | Geen ads. |
| Vervolgacties | 7 | Tools en stappenplannen. |
| Interne links | 7 | Verwijzing naar UWV, tools, dossiers. |
| SEO-structuur | 7 | Goede contentstructuur, maar niet op bruto-netto keywords. |
| **Totaal gemiddeld (relevante criteria)** | **8,1** | |

---

### 2.5 Calculatieloket.nl — bruto-netto-2026 (Sprint 078 status)

**Screenshot / flow-beschrijving**
Na Sprint 078 bestaat de pagina uit een app/tool shell: invoervelden (bruto maandsalaris, pensioenpremie, loonheffingskorting), een direct zichtbaar resultaat (hero), een breakdown, use cases, bronnen, FAQ en disclaimer. Onder de shell staat de behouden SEO-content (uitleg, tarieven, voorbeelden, veelgemaakte fouten). Advertenties staan buiten de input/result-flow.

**Sterke punten**
- **Direct resultaat bij laden** en live update bij input.
- **Snelle, eenvoudige invoer:** 3 velden + toggle.
- **URL state:** `?bruto`, `?pensioen`, `?lhk` maken delen en terugkomen makkelijk.
- **Geïntegreerde use cases:** toeslagen, hypotheek, salaris, ZZP direct naast het resultaat.
- **Bronnen en FAQ** in de shell, boven de SEO-content.
- **Behouden SEO-content:** uitgebreide uitleg, tarieven, voorbeelden, veelgemaakte fouten.

**Zwakke punten**
- **Resultaatpresentatie mist effectief tarief** en schijven in vergelijking met SalarisNetto.
- **Use cases zijn statisch**; ze linken niet met de huidige bruto/netto waarde mee.
- **Geen “kopieer/deel link”** knop; gebruiker moet de URL zelf kopiëren.
- **Geen FAQ schema markup** (rich snippets mogelijkheid ligt onbenut).
- **Mobiel kan compacter:** input + resultaat passen mogelijk niet in één viewport.
- **Advertentie boven de tool** duwt de app-ervaring naar beneden.
- **Geen sociale proof** (beoordelingen, aantal berekeningen) zoals BerekenHet.

**Scoring Calculatieloket.nl (huidig)**

| Criterium | Score | Toelichting |
|---|---|---|
| Snelheid naar antwoord | 8 | Direct resultaat + live update. |
| Eenvoud invoer | 8 | 3 velden + toggle. |
| Mobiele UX | 6 | Shell is nieuw; nog finetuning nodig. |
| Desktop UX | 7 | Twee-koloms layout, maar side panel kan overbodig aanvoelen. |
| Resultaatpresentatie | 7 | Hero + breakdown; mist effectief tarief/schijven. |
| Betrouwbaarheid | 7 | Bronnen + disclaimer; geen beoordelingen of social proof. |
| Uitleg | 8 | Uitgebreide content onder de tool. |
| FAQ | 7 | Accordion in shell; geen schema markup. |
| Advertenties / afleiding | 5 | Ads aanwezig, maar niet tussen input/resultaat. |
| Vervolgacties | 6 | Use cases, maar statisch. |
| Interne links | 6 | Cross-sell + use cases; kunnen slimmer. |
| SEO-structuur | 6 | Goede content, maar schema markup ontbreekt. |
| **Totaal gemiddeld** | **6,7** | |

---

## 3. Objectieve scorekaart

| Criterium | Gewicht | BerekenHet | Loonwijzer | SalarisNetto | Nibud | Calculatieloket |
|---|---:|---:|---:|---:|---:|---:|
| Snelheid naar antwoord | 10% | 4 | 5 | 9 | — | 8 |
| Eenvoud invoer | 10% | 3 | 5 | 9 | — | 8 |
| Mobiele UX | 8% | 4 | 4 | 8 | 7 | 6 |
| Desktop UX | 8% | 6 | 5 | 8 | 7 | 7 |
| Resultaatpresentatie | 10% | 6 | 6 | 8 | — | 7 |
| Betrouwbaarheid | 10% | 9 | 9 | 7 | 10 | 7 |
| Uitleg | 8% | 8 | 7 | 6 | 9 | 8 |
| FAQ | 6% | 7 | 7 | 6 | 8 | 7 |
| Advertenties / afleiding | 8% | 7 | 8 | 6 | 10 | 5 |
| Vervolgacties | 8% | 6 | 6 | 7 | 7 | 6 |
| Interne links / journey | 6% | 8 | 8 | 7 | 7 | 6 |
| SEO-structuur | 8% | 8 | 6 | 7 | 7 | 6 |
| **Gewogen totaal** | 100% | **6,2** | **6,1** | **7,4** | **8,0**¹ | **6,9** |

¹ Nibud is een informatieve concurrent; voor criteria die niet van toepassing zijn, is het gewogen gemiddelde berekend over de relevante criteria (betrouwbaarheid, uitleg, FAQ, ads, vervolgacties, links, SEO, mobiel/desktop).

**Conclusie uit de scorekaart**
- **SalarisNetto** is op dit moment de sterkste calculator-concurrent: snel, eenvoudig, direct resultaat.
- **BerekenHet** en **Loonwijzer** zijn uitgebreider maar minder converterend door complexiteit/iframe.
- **Nibud** wint op vertrouwen en uitleg, maar biedt geen snel bedrag.
- **Calculatieloket** zit dichtbij SalarisNetto qua snelheid en eenvoud, maar moet betrouwbaarheid, resultaatpresentatie, use cases en SEO verder versterken.

---

## 4. Waar Calculatieloket kan winnen

Om de beste financiële calculator van Nederland te worden, moeten we op ieder criterium minimaal gelijk of beter zijn dan de beste concurrent. De grootste kansen liggen in:

1. **Snelheid + eenvoud blijven behouden** — we hebben al een lage drempel; dit moeten we uitbuiten.
2. **Resultaatpresentatie verrijken** — voeg effectief belastingtarief, schijven en een visuele verdeling toe.
3. **Betrouwbaarheid versterken** — beoordelingen, aantal berekeningen, “bijgewerkt tot”, bronvermelding direct bij het resultaat.
4. **Vervolgacties personaliseren** — use cases moeten de huidige bruto/netto waarde meenemen in de URL.
5. **SEO-schema’s toevoegen** — FAQPage, HowTo, BreadcrumbList schema markup.
6. **Mobiel optimaliseren** — input + resultaat in één viewport op telefoon.
7. **Advertenties niet laten afleiden** — test of een ad boven de tool de conversie schaadt; overweeg ad alleen onder resultaat.

Deze punten worden verder uitgewerkt in `09-BRUTO-NETTO-UX-REVIEW.md` en `10-PRODUCT-POLISH-BACKLOG.md`.

---

## 5. Randvoorwaarden

- Geen kopie van concurrenten; alleen leren van patronen.
- Geen nieuwe calculator, engine, of Knowledge Layer wijzigingen.
- Focus op UX, conversie, vertrouwen, SEO en AdSense.
- Geen deploy als onderdeel van deze sprint.
