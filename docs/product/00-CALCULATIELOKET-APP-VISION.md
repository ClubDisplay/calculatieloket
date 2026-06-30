# 00 — Calculatieloket App Vision

> **Doel:** Beschrijven hoe Calculatieloket.nl moet voelen als een snelle, moderne app/tool en hoe deze ervaring aansluit op de FiscalMesh/Atlas engine.  
> **Laatst bijgewerkt:** 2026-06-30

---

## Kernidee

Calculatieloket.nl is geen traditionele website met tekstpagina’s. Het is een collectie van **gerichte tools**: elke calculator beantwoordt één duidelijke vraag in zo min mogelijk tijd. De gebruiker hoeft geen account aan te maken, geen app te installeren en geen persoonlijke gegevens achter te laten. De ervaring is:

- **Snel** — invoer wijzigen = resultaat wijzigt direct.
- **Eenvoudig** — één vraag per scherm, één duidelijk antwoord.
- **Vertrouwd** — bronvermelding, disclaimer en datum van laatste update zijn altijd zichtbaar.
- **Verbonden** — gerelateerde calculators en logische vervolgstappen staan direct na het antwoord.

---

## Gewenste gebruikersflow

```
1. Vraag herkennen          →  “Wat wil je berekenen?”
2. Gegevens invoeren        →  1 tot 3 velden, met slimme defaults
3. Direct antwoord krijgen    →  groot, leesbaar, met breakdown
4. Context begrijpen          →  “Wat kun je hiermee?”
5. Vervolgstappen zien        →  gerelateerde tools, bronnen, FAQ
```

De flow is hetzelfde op mobiel, tablet en desktop. Er is geen onderscheid tussen “mobiele app” en “website” — de site is de app.

---

## Aansluiting op FiscalMesh/Atlas

De FiscalMesh/Atlas engine maakt de app-visie mogelijk omdat berekeningen losstaan van de presentatie:

- **Knowledge Layer** levert actuele tarieven, schijven en drempels.
- **Rule Resolver** kiest automatisch de juiste regels per land/jaar.
- **Calculation Engines** (`src/lib/calculators/`) bevatten de generieke rekenlogica.
- **Pagina’s** (`src/pages/*.astro`) worden dunne schillen: ze tonen de vraag, roepen de engine aan en presenteren het antwoord.

Dit betekent dat een pagina later makkelijk herontworpen kan worden zonder de rekenlogica te raken. De app-ervaring wordt dus grotendeels een **presentatie- en interactie-opdracht**, geen backend-opdracht.

---

## Niet-doelen (nu)

- Geen native iOS/Android app.
- Geen PWA-installatie-flow (wel voorbereidbaar, maar niet in scope).
- Geen account, login, of opslag van gebruikersinvoer.
- Geen dashboard met meerdere calculators tegelijk.
- Geen chatbot of AI-assistent op de publieke site.

---

## Succescriteria

Een calculatorpagina voelt als een app als:

1. De invoer en het resultaat binnen één viewport passen (desktop).
2. Het resultaat direct zichtbaar is, zonder eerst te scrollen.
3. De primaire actie (bijv. “Bereken”) één duidelijke knop is.
4. Bronnen, disclaimer en datum van update altijd aanwezig zijn.
5. De pagina op mobiel even snel en overzichtelijk werkt als op desktop.
6. De URL deelbaar is met vooringevulde waarden.

---

## Visuele analogieën

De gewenste ervaring ligt tussen:

- **Numi / Soulver** — schone rekentool, direct resultaat.
- **Tesla range calculator** — één vraag, visueel antwoord, context.
- **Nibud budgetteren** — vertrouwd, bronvermelding, duidelijke disclaimer.
- **Apple’s native tools** — focus, consistente spacing, rustig kleurenpalet.

---

## Speerpunten voor Sprint 077+

1. Één calculatorpagina omzetten naar het nieuwe app-patroon.
2. Componenten `CalculatorShell`, `InputPanel`, `ResultPanel` en `ContextPanel` maken.
3. Delen via URL onderzoeken.
4. Mobiele UX testen.
