# Atlas Knowledge Layer

> **Status:** Knowledge Layer v1 — Atlas v2 Sprint 074  
> **Laatst bijgewerkt:** 2026-06-30

---

## Doel

De Atlas Knowledge Layer is de centrale feitenbank van Atlas. Hier leven alle land-specifieke regels, tarieven, drempels, formules en bronnen die calculators gebruiken. De Knowledge Layer bevat **geen** code, HTML, presentatie of berekeningen — alleen feiten en hun onderlinge relaties.

---

## Principes

1. **Feiten gescheiden van code.** Een calculator vraagt feiten op; hij bepaalt ze niet zelf.
2. **Land en locale gescheiden.** Een object hoort bij één land en één locale, maar kan door meerdere locales binnen een land worden gebruikt.
3. **Elk feit heeft een bron.** Geen feit zonder `source` en `authority_level`.
4. **Versiebeheer via effectieve data.** Objecten hebben een `effective_from` en `effective_until`, niet alleen een versienummer.
5. **Geen presentatie.** Geen HTML, Astro, JavaScript of opmaak.
6. **Grafisch model.** Objecten verwijzen naar elkaar via `relationships` en naar gebruikers via `used_by`.

---

## Directory structuur

```
docs/v2/knowledge/
  README.md                          # Dit bestand
  00-KNOWLEDGE-ARCHITECTURE.md       # Architectuur en laagscheiding
  01-KNOWLEDGE-OBJECTS.md            # Structuur van een kennisobject
  02-VERSIONING.md                   # Versiebeheer en effectiviteit
  03-OFFICIAL-SOURCES.md             # Bronnen en authority levels
  04-RELATIONSHIPS.md                # Relaties tussen objecten
  05-COUNTRIES.md                    # Multi-country ondersteuning
  06-AUTHORITY-SYSTEM.md             # Authority levels en vertrouwen
  07-KNOWLEDGE-LIFECYCLE.md          # Levenscyclus van objecten
  08-AI-USAGE.md                     # AI gebruik van de Knowledge Layer
  objects/                            # Concrete kennisobjecten
    nl.vat.standard.yml
    nl.tax.box1.2026.yml
    nl.tax.ahk.2026.yml
    nl.tax.ak.2026.yml
    nl.mortgage.annuity.yml
    nl.allowance.health.yml
    nl.allowance.rent.yml
    nl.import.bpm.manual.yml
    de.tax.income.2026.yml
    be.tax.income.2026.yml
    be.tax.income.country_fallback.2026.yml
    fr.tax.income.2026.yml
    es.tax.income.2026.yml
```

---

## Relatie met andere Atlas lagen

| Laag | Rol | Gebruikt Knowledge Layer? |
|---|---|---|
| **Knowledge Layer** | Feiten | Nee (is de bron) |
| **Rule Engine** | Haalt juiste feiten op voor locale/jaar | Ja |
| **Calculation Engine** | Rekent met feiten | Via Rule Engine |
| **Calculator Definition** | Beschrijft inputs, outputs, regels | Via Rule Engine |
| **Generator** | Maakt pagina's/modules | Ja, voor SEO-content en bronnen |
| **AI** | Beantwoordt vragen en genereert context | Ja, als ground truth |

---

## Hoe een calculator feiten ophaalt

```
Calculator Definition
        │
        ▼
   Rule Engine
        │
        ▼
Knowledge Layer
        │
        ▼
  Calculation Engine
```

De calculator-definitie verwijst naar een rule. De Rule Engine vertaalt die rule naar een of meer kennisobjecten. De Calculation Engine gebruikt die objecten om een resultaat te berekenen.

---

## Toevoegen of wijzigen van een object

1. Bepaal het type en de id (zie `01-KNOWLEDGE-OBJECTS.md`).
2. Zorg voor een officiële bron (zie `03-OFFICIAL-SOURCES.md`).
3. Voeg `effective_from` en `effective_until` toe (zie `02-VERSIONING.md`).
4. Leg relaties vast met andere objecten en calculators (zie `04-RELATIONSHIPS.md`).
5. Update `used_by` zodat gebruikers van het object bekend zijn.
6. Review en activeer het object (zie `07-KNOWLEDGE-LIFECYCLE.md`).

---

## Status

De Knowledge Layer v1 bevat objecten voor Nederland (`nl-*`), Duitsland (`de-*`), België (`be-*`), Frankrijk (`fr-*`) en Spanje (`es-*`), inclusief landfallbacks voor BTW (`be.vat.country_fallback`) en inkomstenbelasting (`be.tax.income.country_fallback.2026`). De Franse (`fr.tax.income.2026`) en Spaanse (`es.tax.income.2026`) inkomstenbelastingobjecten zijn `draft` omdat de officiële tarieven voor inkomstenjaar 2026 (aanslag 2027) op 30 juni 2026 nog niet zijn gepubliceerd. In latere sprints worden deze geactiveerd zodra de officiële bronnen beschikbaar zijn.
