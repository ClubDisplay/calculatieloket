# 01 — Current Site Audit

> **Doel:** Objectief beoordelen wat er al goed is aan Calculatieloket.nl en waar de app/tool-ervaring nog tekortschiet.  
> **Laatst bijgewerkt:** 2026-06-30

---

## Methode

De audit is uitgevoerd door de bestaande calculatorpagina’s in `src/pages/` en de gedeelde componenten in `src/components/` te bekijken. De beoordeling richt zich op:

- Snelheid van interactie
- Overzichtelijkheid van invoer en resultaat
- Vertrouwenssignalen (bronnen, disclaimer, update-datum)
- Mobiele bruikbaarheid
- Herbruikbaarheid van componenten

---

## Wat is al goed

| Onderdeel | Beoordeling |
|-----------|-------------|
| **Shared layout** | `BaseLayout.astro` biedt een consistente header, navigatie, footer, SEO-tags en schema.org. |
| **Sticky header** | De header blijft zichtbaar, zodat navigatie altijd binnen handbereik is. |
| **Client-side routing** | `ClientRouter` is geactiveerd, wat pagina-overgangen sneller maakt. |
| **Central engines** | BTW, Tax, ZZP, Mortgage, Allowance en Import Cost zitten in `src/lib/calculators/`. Geen inline rekenlogica meer. |
| **Resultaat-componenten** | `CrossSellCards` en `SourceCards` zijn generiek en herbruikbaar. |
| **Responsive grid** | De huidige CSS gebruikt flex/grid en past zich aan tot kleine schermen. |
| **Inline berekeningen** | De meeste pagina’s rekenen direct bij invoer of klik; er is geen serverroundtrip. |
| **Bronvermelding** | Per pagina staan officiële bronnen onderaan (Belastingdienst, RDW, Nibud, etc.). |
| **Disclaimers** | Bijna elke pagina noemt expliciet dat de uitkomst een indicatie is. |
| **Contentstructuur** | `bruto-netto-2026.astro` heeft veel context: uitleg, voorbeelden, veelgemaakte fouten, FAQ. |

---

## Wat mist of nog niet app-like is

| Onderdeel | Probleem | Impact |
|-----------|----------|--------|
| **Resultaat verborgen** | Bij `bruto-netto-2026`, `salaris-calculator`, `btw-calculator` en `auto-importkosten` is het resultaat initieel `display:none`. De gebruiker ziet een leeg scherm tot hij klikt. | Voelt niet als een directe tool. |
| **Scheiding invoer/resultaat** | Invoer en resultaat zitten in dezelfde kaart of staan ver uit elkaar. Er is geen duidelijk “dit is je antwoord”-moment. | Minder focus. |
| **Onnodige scroll** | Op mobiel moet de gebruiker scrollen om het resultaat te zien na invoer. | Traag, frustrerend. |
| **Geen primary CTA op resultaat** | Na het antwoord is er geen duidelijke volgende actie behalve cross-sell cards. | Geen natuurlijke vervolgflow. |
| **Geen “Wat kun je hiermee?”** | Pagina’s leggen wel uit hoe het werkt, maar niet wat je er concreet mee kunt doen. | Minder relevantie voor de gebruiker. |
| **Inconsistente resultaatweergave** | `hypotheek-calculator` toont het resultaat direct, maar met `&mdash;` placeholders; `toeslagen-calculator` heeft twee losse resultaatboxen. | Geen uniform patroon. |
| **Input overload** | `auto-importkosten` en `zzp-calculator` hebben veel velden. Zonder stapsgewijze opbouw voelen ze als een formulier, niet als een tool. | Hogere drempel. |
| **Geen URL state** | Invulling is niet deelbaar via de URL. Herladen = invoer kwijt. | Geen deeplinks, geen social sharing. |
| **Geen FAQ-component** | FAQ staat als platte HTML in elke pagina. Herbruikbaarheid en ontwerp inconsistent. | Onderhoudslast. |
| **Radio buttons als custom buttons** | De radio-group styling is herhaald in pagina-styles; soms onduidelijk welke optie actief is. | Inconsistente UX. |
| **Mobiele input spacing** | Inputvelden, prefixes en labels kunnen op smalle schermen te compact staan. | Moeilijker te gebruiken. |
| **Ad slots storen de flow** | Advertenties staan tussen invoer/resultaat en context. Op mobiel kan dit de tool-ervaring onderbreken. | Lagere focus. |

---

## Pagina-specificaties

### `index.astro` (homepage)
- **Goed:** heldere hero, snelle navigatie, populaire calculators direct zichtbaar.
- **Mist:** geen preview van de tool-ervaring; de pagina is een marketingpagina, geen app-launcher.

### `bruto-netto-2026.astro`
- **Goed:** veel vertrouwenwekkende content, bronnen, voorbeelden.
- **Mist:** resultaat start verborgen; enorme hoeveelheid tekst staat tussen tool en context; geen directe vervolgstappen na het resultaat.

### `salaris-calculator.astro`
- **Goed:** compacte invoer, centrale tax-engine.
- **Mist:** resultaat start verborgen; weinig context naast uitleg en FAQ; geen koppeling naar toeslagen/hypotheek/zzp.

### `btw-calculator.astro`
- **Goed:** simpele vraag, directe berekening.
- **Mist:** resultaat start verborgen; radio buttons zijn custom; geen “kopieer resultaat” of deelbaar link.

### `hypotheek-calculator.astro`
- **Goed:** resultaat is direct zichtbaar (geen `display:none`).
- **Mist:** placeholders in resultaat zien er leeg uit; geen uitleg wat de gebruiker met het bedrag kan; geen partner-toggle animation.

### `toeslagen-calculator.astro`
- **Goed:** duidelijke scheiding tussen huur- en zorgtoeslag.
- **Mist:** twee losse resultaatboxen; vermogenswaarschuwing staat bovenaan als banner; geen “geen recht”-uitleg in context.

### `zzp-calculator.astro`
- **Goed:** veel parameters voor een realistische indicatie.
- **Mist:** te veel velden in één kaart; geen progressieve openklap; resultaat is direct zichtbaar maar oogt druk.

### `auto-importkosten-berekenen.astro`
- **Goed:** uitgebreide uitleg over BPM, RDW, transport.
- **Mist:** zeer veel invoervelden; resultaat verborgen; te veel tekst voor een app-gevoel.

### `btw-terugrekenen.astro` / `btw-inclusief-exclusief.astro`
- **Goed:** gerichte varianten op BTW.
- **Mist:** dezelfde structuur als `btw-calculator`; resultaat verborgen; geen koppeling naar de andere BTW-tools.

---

## Componenten die beter moeten

| Component | Huidig | Gewenst |
|-----------|--------|---------|
| `result-box` | Herhaald in pagina’s, inconsistente styling | Één gedeeld `ResultPanel` component |
| `calculator-card` | Wordt gebruikt voor invoer, resultaat én content | Duidelijke scheiding: `InputPanel`, `ResultPanel`, `ContextPanel` |
| `radio-group` | Custom buttons, actieve status per pagina | Gedeeld component met toegankelijke states |
| `toggle-row` | Herhaald in meerdere pagina’s | Gedeeld `Toggle` component |
| `CrossSellCards` | Al generiek, maar laat na resultaat zien | Onderdeel van `NextSteps` component |
| `SourceCards` | Al generiek | Standaard onderdeel van elke calculatorpagina |
| FAQ | Platte HTML per pagina | Herbruikbaar `FaqAccordion` component |

---

## Conclusie

De technische basis is sterk: centrale engines, consistente layout, responsive CSS. Het app-gevoel ontbreekt vooral in **presentatie en interactie**: resultaten moeten directer, invoer compacter en vervolgstappen logischer. De grootste kans ligt in het maken van een gedeelde `CalculatorShell` die de structuur `invoer → resultaat → context → vervolg` afdwingt.
