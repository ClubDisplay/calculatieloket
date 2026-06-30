# 00 — Next Step Blocks

> **Doel:** Documentatie van het herbruikbare "Next Step Blocks"-systeem — blokken onder calculatorresultaten die bezoekers begeleiden naar de volgende logische stap.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Wat zijn Next Step Blocks?](#wat-zijn-next-step-blocks)
2. [Probleemstelling](#probleemstelling)
3. [Relatie tot de Journey Engine](#relatie-tot-de-journey-engine)
4. [Anatomie van een Next Step Block](#anatomie-van-een-next-step-block)
5. [Huidige implementatie (v0.1)](#huidige-implementatie-v01)
6. [Toekomstvisie](#toekomstvisie)

---

## Wat zijn Next Step Blocks?

Next Step Blocks zijn **herbruikbare, contextbewuste blokken** die onder een calculatorresultaat verschijnen. Ze begeleiden de bezoeker naar de volgende logische calculator of uitlegpagina binnen een journey.

Een Next Step Block bevat:

- Een **korte, rustige titel** (bv. "Jouw volgende stap")
- **3 tot 5 items** — elke met een label, link, korte reden en eventueel aanwijzingen voor datahergebruik
- Optioneel een **intro-tekst** (bv. "Op basis van jouw inkomen")

## Probleemstelling

De huidige cross-sell (`CrossSellCards`) werkt, maar:

- Is **niet contextgevoelig** — dezelfde cards verschijnen ongeacht de invoer.
- Is **niet journey-georiënteerd** — handmatig per pagina gedefinieerd.
- Toont **geen "waarom"** — alleen een titel en beschrijving, niet de reden dat deze stap relevant is.

Next Step Blocks lossen dit op door:

- **Contextueel** te zijn — op basis van de ingevoerde waarden.
- **Journey-gestuurd** — uit `journeys.yml` en `next-step-blocks.yml`.
- **Met een reden** — "Omdat je inkomen invloed kan hebben op je toeslagen."
- **Datahergebruik** — waar mogelijk query parameters door te geven.

## Relatie tot de Journey Engine

- `journeys.yml` definieert de **journey** (start → vervolg).
- `next-step-blocks.yml` definieert de **blokken per bron-calculator** — meer gedetailleerd dan een journey: per bron-calculator kunnen er meerdere blokken zijn (bv. één blok met "Toeslagen", één met "Wonen").
- De Journey Engine gebruikt beide bestanden om de NBC (Next-Best Calculator) te bepalen.

## Anatomie van een Next Step Block

```
┌─────────────────────────────────────────────┐
│  Jouw volgende stap                         │  ← titel
│  Op basis van jouw inkomen                  │  ← intro (optioneel)
│                                             │
│  ☐ Bereken je zorgtoeslag                   │  ← item.label
│    Inkomen beïnvloedt je toeslagrecht.      │  ← item.reason
│    → /toeslagen-calculator/?income=36300    │  ← item.href + query params
│                                             │
│  ☐ Bekijk je maximale hypotheek             │
│    Met jouw salaris kun je een indicatie     │
│    krijgen van je leenbedrag.               │
│    → /hypotheek-calculator/?income=38880    │
│                                             │
│  ☐ Bereken je vakantiegeld                  │
│    ...                                       │
└─────────────────────────────────────────────┘
```

## Huidige implementatie (v0.1)

In **v0.1** is Next Step Blocks **documentatie-only**. De live site gebruikt nog `CrossSellCards`. De documentatie dient als:

- **Design-document** voor de component-ontwikkelaar.
- **Copy-referentie** voor de contentmanager.
- **Databron** voor de journey-engine (v0.2+).

## Toekomstvisie

- Een `NextStepBlock.astro`-component die `next-step-blocks.yml` of een API-endpoint leest.
- Dynamische volgorde op basis van het scoremodel uit `04-NEXT-BEST-CALCULATOR.md`.
- A/B-testen van copy en volgorde.
