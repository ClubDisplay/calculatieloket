# 09 — Bruto-netto-2026 UX Review

> **Doel:** De huidige `bruto-netto-2026.astro` pagina (na Sprint 078) kritisch beoordelen op basis van de concurrentie-benchmark. Output: sterke punten, zwakke punten, concrete verbeterpunten en quick wins.  
> **Laatst bijgewerkt:** 2026-06-30  
> **Scope:** Geen engine wijzigingen, geen Knowledge Layer, geen nieuwe calculator. Alleen UX, conversie, vertrouwen, SEO en AdSense.

---

## 1. Huidige pagina (Sprint 078)

De pagina bestaat uit:

1. **AdSense-advertentie** boven de tool (maximaal 1 ad).
2. **CalculatorShell** met:
   - `InputPanel`: bruto maandsalaris, pensioenpremie, loonheffingskorting toggle, “Bereken netto” knop.
   - `ResultPanel`: hero netto per maand, breakdown (bruto, vakantiegeld, pensioen, belastbaar inkomen, inkomstenbelasting, heffingskortingen, netto per jaar).
   - `UseCasesPanel`: toeslagen, hypotheek, salaris, ZZP.
   - `SourceCards`: bronnen van de Belastingdienst.
   - `FaqAccordion`: 6 veelgestelde vragen.
   - `ToolFooter`: disclaimer + laatst bijgewerkt.
3. **AdSense-advertentie** onder de shell, boven de SEO-content.
4. **SEO-contentblok** met uitleg, tarieven, factoren, voorbeelden, veelgemaakte fouten.
5. **CrossSellCards** naar salaris, hypotheek, ZZP.

Belangrijke eigenschappen:
- Direct zichtbaar resultaat bij laden (default: € 3.000 bruto, € 150 pensioen, LHK aan).
- Live update bij input via client-side script.
- URL state: `?bruto`, `?pensioen`, `?lhk`.
- Server-rendered content voor SEO.
- Geen advertentie tussen input en resultaat.

---

## 2. Sterke punten

| # | Sterk punt | Waarom het helpt |
|---|---|---|
| 1 | **Direct zichtbaar resultaat** | Gebruiker hoeft niets te doen om een indicatie te zien; dit verlaagt de drempel. |
| 2 | **Snelle, eenvoudige invoer** | 3 velden + toggle; concurrent SalarisNetto is vergelijkbaar, BerekenHet is veel complexer. |
| 3 | **URL state** | Gebruiker kan resultaat delen, bookmarken of terugkomen. |
| 4 | **Use cases naast resultaat** | Directe “Wat kun je hiermee?” context: toeslagen, hypotheek, ZZP, salaris. |
| 5 | **Bronvermelding + disclaimer** | Vertrouwen door officiële Belastingdienst-bronnen en duidelijke disclaimer. |
| 6 | **Server-rendered SEO-content** | Goede content voor Google: uitleg, tarieven, voorbeelden, veelgemaakte fouten. |
| 7 | **Live update** | Wijziging van bruto/pensioen/LHK past resultaat onmiddellijk aan. |
| 8 | **Geen ad tussen input en resultaat** | De tool-flow wordt niet verstoord; betere app-ervaring. |

---

## 3. Zwakke punten

### 3.1 Conversie & interactie

| # | Zwak punt | Impact |
|---|---|---|
| 1 | **“Bereken netto” knop is overbodig** | Omdat het resultaat live bijwerkt, wordt de knop visueel minder relevant. Op mobiel kan hij echter wel als bevestiging fungeren. |
| 2 | **Use cases hebben statische links** | Ze linken naar `/toeslagen-calculator/`, `/hypotheek-calculator/`, etc. zonder de huidige inkomenswaarde mee te geven. Gebruiker moet opnieuw invoeren. |
| 3 | **Geen “kopieer/deel link”** | De URL wordt wel bijgewerkt, maar er is geen knop om deze te kopiëren. Deelbaarheid ligt onbenut. |
| 4 | **Geen snelle scenario-velden** | Gebruiker kan niet snel zien “wat als ik € 500 meer verdien?” of “wat als ik geen LHK heb?” zonder handmatig te wijzigen. |
| 5 | **Resultaat hero mist context** | Er staat alleen “Jouw netto salaris per maand”; geen effectief tarief, geen schijven, geen “dit is X% van je bruto”. |

### 3.2 Mobiele UX

| # | Zwak punt | Impact |
|---|---|---|
| 6 | **Input + resultaat passen mogelijk niet in één viewport** | Op een telefoon moet de gebruiker scrollen om het resultaat te zien na het openen van de pagina. |
| 7 | **Side panel krijgt op mobiel veel ruimte** | Use cases, bronnen en FAQ staan onder elkaar en duwen het resultaat naar beneden. |
| 8 | **Advertentie boven de tool duwt content omlaag** | Op mobiel is de ad boven de H1/tool en eet waardevolle eerste viewport. |
| 9 | **Touch targets en font sizing** | `.toggle`, `.input-prefix` en knoppen zijn bruikbaar, maar niet geoptimaliseerd voor touch (bijv. `btn-lg` is goed, maar spacing kan strakker). |

### 3.3 Vertrouwen & transparantie

| # | Zwak punt | Impact |
|---|---|---|
| 10 | **Geen sociale proof** | Geen beoordeling, geen aantal uitgevoerde berekeningen, geen “bijgewerkt per …” naast het resultaat. |
| 11 | **Bronnen staan in zijpaneel, niet direct bij resultaat** | Gebruiker ziet pas na scrollen dat de bronnen van de Belastingdienst afkomstig zijn. |
| 12 | **Disclaimer is onderaan de shell** | Kan beter direct onder het resultaat staan als “Indicatie” badge plus korte zin. |
| 13 | **Geen “Laatst bijgewerkt” datum in de buurt van het resultaat** | De datum staat in de footer; niet direct zichtbaar. |

### 3.4 SEO & content

| # | Zwak punt | Impact |
|---|---|---|
| 14 | **Geen schema markup** | FAQPage, HowTo, BreadcrumbList schema ontbreken; rich snippets kunnen niet getoond worden. |
| 15 | **H1 + title zijn goed, maar h2/h3 structuur kan scherper** | De SEO-content is veel “Wat is …”, “Hoe …”, “Tarieven 2026”. Dit kan in een betere FAQ/HowTo structuur. |
| 16 | **Geen “People also ask” dekking** | Vragen zoals “Hoeveel netto over van 3000 bruto 2026?” of “Wat is loonheffingskorting?” zijn niet als aparte koppen gesteld. |
| 17 | **Interne links zijn generiek** | De CrossSellCards linken naar andere calculators zonder query params of context. |

### 3.5 AdSense

| # | Zwak punt | Impact |
|---|---|---|
| 18 | **Twee ads op de pagina** | Boven de tool en onder de tool. De bovenste ad kan op mobiel de tool naar beneden duwen en de “direct antwoord” ervaring vertragen. |
| 19 | **Geen A/B test data** | We weten niet of 1 of 2 ads meer oplevert zonder conversieverlies. |

---

## 4. Vergelijking met de beste concurrenten

| Aspect | Beste concurrent | Huidige Calculatieloket | Kloof |
|---|---|---|---|
| Snelheid | SalarisNetto (9) | 8 | Klein |
| Eenvoud | SalarisNetto (9) | 8 | Klein |
| Resultaatpresentatie | SalarisNetto (8) | 7 | Middel |
| Betrouwbaarheid | Nibud (10) / BerekenHet (9) | 7 | Groot |
| Uitleg | Nibud (9) / BerekenHet (8) | 8 | Klein |
| FAQ | Nibud (8) | 7 | Middel |
| Vervolgacties | SalarisNetto (7) | 6 | Middel |
| Advertenties | Nibud (10) / Loonwijzer (8) | 5 | Groot |
| Interne links | BerekenHet (8) / Loonwijzer (8) | 6 | Middel |
| SEO | BerekenHet (8) | 6 | Middel |

**Prioriteit:** de grootste kloof zit in **betrouwbaarheid**, **advertenties**, **interne links** en **SEO**. Deze leveren relatief veel winst voor weinig technische inspanning.

---

## 5. Concrete verbeterpunten

### 5.1 Conversie (quick wins)

1. **Voeg “Snelle bedragen” chips toe** onder het bruto-veld: € 2.500, € 3.000, € 3.500, € 4.000, € 5.000. Eén klik vult het veld en update het resultaat.
2. **Maak use cases dynamisch:** gebruik de huidige bruto/netto waarde om de href te verrijken (bijv. `/toeslagen-calculator/?inkomen=<netto_jaar>` of `/hypotheek-calculator/?bruto=<bruto_jaar>`).
3. **Voeg “Kopieer link” knop toe** naast het resultaat (of in de breakdown). Kopieert de huidige URL naar klembord.
4. **Voeg “Vergelijk situaties” toggle toe** naast loonheffingskorting: “Met / zonder LHK” toont direct het verschil in netto.
5. **Verklein de “Bereken netto” knop** tot een secundaire actie op desktop, maar houd hem prominent op mobiel als sticky CTA.

### 5.2 Resultaatpresentatie

6. **Toon effectief belastingtarief** in de hero of breakdown (bijv. “Effectief belastingtarief: 23,8%”).
7. **Toon belastingschijven** als kleine tabel of progress bar: hoeveel valt in schijf 1, 2, 3.
8. **Voeg “Bruto vs netto” vergelijking** toe: bruto maandsalaris naast netto maandsalaris in één oogopslag.
9. **Maak de hero flexibeler:** toon ook netto per jaar direct naast per maand, of wisselbaar via tab/toggle.
10. **Voeg “Dit is X% van je bruto”** toe, zodat gebruiker het relatieve belastingpercentage snapt.

### 5.3 Mobiele UX

11. **Test op mobiel viewport 375px en 390px.** Zorg dat input + resultaat binnen één viewport passen zonder scroll.
12. **Verplaats het bovenste advertentieblok** naar onder het resultaat, of test met alleen één ad onder de SEO-content.
13. **Verklein het side panel op mobiel:** toon alleen use cases direct onder het resultaat; bronnen en FAQ inklapbaar of pas na scrollen.
14. **Maak inputvelden full-width** op mobiel met grotere font-size (16px) om zoom op iOS te voorkomen.
15. **Sticky resultaat hero** op mobiel: als de gebruiker scrollt, blijft het netto-bedrag bovenaan zichtbaar.

### 5.4 Vertrouwen & transparantie

16. **Voeg “Bijgewerkt per 30 juni 2026”** direct naast het resultaat toe, niet alleen in de footer.
17. **Voeg sociale proof toe** indien beschikbaar: “X beoordelingen”, “Y miljoen berekeningen per jaar”, of een trust badge “Onafhankelijk · Gebaseerd op Belastingdienst 2026”.
18. **Verplaats bronnen** naar een klein blok direct onder het resultaat, niet alleen in het zijpaneel.
19. **Maak de “Indicatie” badge** tastbaarder: badge boven het resultaat plus korte uitleg (“Dit is een indicatie op basis van 2026-tarieven.”).
20. **Voeg een “Waarom klopt mijn loonstrook niet?”** callout toe met de 3 meest voorkomende redenen.

### 5.5 SEO & content

21. **Voeg FAQPage schema markup toe** voor de 6 FAQ items in `FaqAccordion`.
22. **Voeg BreadcrumbList schema toe** voor de pagina (Home > Bruto-netto 2026).
23. **Herstructureer de SEO-content** naar duidelijke “People also ask” vragen met H2/H3 koppen:
   - “Hoeveel netto krijg ik bij € 3.000 bruto in 2026?”
   - “Wat is het effect van loonheffingskorting?”
   - “Hoeveel belasting betaal ik over mijn salaris in 2026?”
   - “Wat is het verschil tussen bruto en netto?”
24. **Voeg HowTo schema toe** voor de berekeningsstappen (Stap 1: bruto jaarinkomen, Stap 2: pensioen, etc.).
25. **Interne links verrijken:** link vanuit de SEO-content naar `/salaris-calculator/`, `/toeslagen-calculator/`, `/hypotheek-calculator/`, `/zzp-calculator/` met contextuele ankertekst.

### 5.6 AdSense

26. **Test 1-ad variant:** verwijder de bovenste ad en houd alleen de ad onder de SEO-content. Meet effect op tijd op pagina, scroll, en CTR.
27. **Zorg dat ads nooit tussen input en resultaat staan.** De huidige opzet voldoet hieraan; behouden.
28. **Overweeg een native in-content ad** onder de eerste 2 alinea’s van de SEO-content, ver van de tool.

---

## 6. Quick wins (uitvoerbaar in < 1 dag)

1. **Dynamische use cases** — de links nemen de huidige waarden mee.
2. **“Kopieer link” knop** — kleine UI-toevoeging met grote deelbaarheidswaarde.
3. **Effectief belastingtarief + schijven** in de breakdown.
4. **FAQPage schema markup** — directe SEO-winst.
5. **Bovenste ad verwijderen/testen** — betere mobiele eerste viewport.
6. **“Bijgewerkt per” datum direct bij resultaat.**
7. **Snelle bedragen chips** — 1-klik scenario’s.

---

## 7. Wat we niet willen

- De pagina niet overladen met velden (BerekenHet-valkuil).
- Geen iframe of externe calculator (Loonwijzer-valkuil).
- Geen SEO-content verwijderen (SalarisNetto-valkuil).
- Geen advertentie tussen input en resultaat.
- Geen engine of berekeningslogica aanpassen.

---

## 8. Aanbeveling

De huidige pagina is een sterke basis. De grootste kans om “de beste” te worden ligt in het combineren van:

- **de snelheid en eenvoud van SalarisNetto,**
- **de betrouwbaarheid en uitleg van Nibud/BerekenHet,**
- **de gerichte vervolgstappen van een financiële journey.**

Concreet: focus eerst op de quick wins (dynamische use cases, deel-link, schema markup, effectief tarief), daarna mobiele viewport-optimalisatie en AdSense-test.
