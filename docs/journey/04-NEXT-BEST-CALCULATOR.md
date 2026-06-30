# 04 — Next-Best Calculator

> **Doel:** Documenteert de logica en de regels voor het aanbevelen van de volgende calculator.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Doel van aanbevelingen](#doel-van-aanbevelingen)
2. [Huidige implementatie](#huidige-implementatie)
3. [Aanbevelingsregels](#aanbevelingsregels)
4. [Scoremodel](#scoremodel)
5. [Van Cross-sell naar Journey-aware](#van-cross-sell-naar-journey-aware)
6. [Metriek en evaluatie](#metriek-en-evaluatie)

---

## Doel van aanbevelingen

De Next-Best Calculator (NBC) is de calculator die de bezoeker het meest waarschijnlijk relevant vindt na de huidige calculator. Het doel is:

1. **Verlagen van bounce** — bezoekers langer op de site houden.
2. **Verhogen van pagina's per sessie** — meer calculators gebruikt.
3. **Verbeteren van gebruikerservaring** — bezoeker hoeft niet terug naar Google om de volgende vraag te stellen.

## Huidige implementatie

In **v0.1** is de aanbeveling handmatig:

- Elke calculator heeft een `<CrossSellCards>`-component met een vaste set vervolgcalculators.
- De vervolgcalculators zijn **statisch** en **niet contextgevoelig** (dezelfde set wordt getoond ongeacht de invoer).
- Er is **geen dynamische** aanbeveling op basis van de ingevoerde waarden.

**Voorbeeld:** op `/salaris-calculator/` staan altijd vier cross-sell cards (Bruto Netto, Toeslagen, ZZP, Hypotheek) — ongeacht of de bezoeker 1500 of 5000 bruto invoert.

## Aanbevelingsregels

Wanneer de Journey Engine live gaat (v0.2+), gelden deze regels:

1. **Relevantie boven kwantiteit** — maximaal 3 aanbevelingen, niet 6.
2. **Contextueel** — de aanbeveling mag afhangen van de ingevoerde waarden.
3. **Niet-commercieel** — aanbevelingen zijn calculators, geen producten of diensten.
4. **Toon altijd een indicatie** — "Deze berekening is een indicatie."
5. **Vermijd keuzeverlamming** — als er meer dan 3 aanbevelingen zijn, toon de top-3.

## Scoremodel

Voor v0.2+ — conceptueel model:

| Factor | Gewicht | Toelichting |
|--------|---------|------------|
| **Journey-match** | 40% | Staat de volgende calculator in dezelfde journey als de huidige? |
| **Datarelevantie** | 30% | Kan data worden doorgegeven? |
| **Populartiteit** | 20% | Hoe vaak wordt deze combinatie gebruikt? (geaggregeerd, anoniem) |
| **Diversiteit** | 10% | Straf af als alle aanbevelingen uit hetzelfde cluster komen. |

## Van Cross-sell naar Journey-aware

| Nu (v0.1) | Straks (v0.2+) |
|-----------|----------------|
| Handmatige CrossSellCards per pagina | Dynamische NBC op basis van journey-model |
| Altijd dezelfde set | Contextgevoelig op invoer |
| Titel "Ook handig om te berekenen" | Titel "Jouw volgende stap" of "Op basis van jouw inkomen" |
| Alleen calculators tonen | Ook contextuele text: "Met jouw inkomen kom je mogelijk in aanmerking voor..." |
| Geen datahergebruik | Query parameters doorgeven waar mogelijk |

De `<CrossSellCards>`-component blijft bestaan, maar de **data** die erin gaat wordt niet langer per pagina handmatig gedefinieerd maar uit `journeys.yml` gehaald.

## Metriek en evaluatie

Te tracken (v0.2+):

- **NBC-CTR** — klikt de bezoeker op een aanbevolen calculator?
- **Journey-voltooiing** — hoeveel bezoekers doorlopen een hele journey?
- **Dwell time** — gemiddelde tijd per sessie.
- **Bounce rate** — percentage dat na 1 pagina vertrekt.

> In v0.1 worden deze metrieken nog niet gemeten. Deze sectie dient als **planning**.
