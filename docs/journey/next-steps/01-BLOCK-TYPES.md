# 01 — Block Types

> **Doel:** Catalogus van alle typen Next Step Blocks en hun gebruikssituaties.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Overzicht block-typen](#overzicht-block-typen)
2. [Type 1: Journey-blok](#type-1-journey-blok)
3. [Type 2: Ontdek-blok](#type-2-ontdek-blok)
4. [Type 3: Bron-blok](#type-3-bron-blok)
5. [Type 4: Actie-blok](#type-4-actie-blok)
6. [Type 5: Seizoensblok](#type-5-seizoensblok)
7. [Keuzehulp](#keuzehulp)

---

## Overzicht block-typen

| Type | Doel | Context | Voorbeeld |
|------|------|---------|-----------|
| **Journey-blok** | Bezoeker door de journey leiden | Altijd zichtbaar | "Bereken je zorgtoeslag" na bruto-netto |
| **Ontdek-blok** | Nieuwe calculators introduceren | Wanneer er geen directe journey-stap is | "Ontdek ook onze Datumtools" |
| **Bron-blok** | Bezoeker wijzen op officiële bronnen | Bij gevoelige resultaten | "Doe de officiële proefberekening op Toeslagen.nl" |
| **Actie-blok** | Commerciële of praktische vervolgstap | Bij duidelijke behoefte | "Schakel een hypotheekadviseur in" |
| **Seizoensblok** | Tijdelijke relevante calculators tonen | Seizoensgebonden | "Bereken je vakantiegeld" (mei) |

## Type 1: Journey-blok

- **Doel:** De bezoeker door een vooraf gedefinieerde journey leiden.
- **Kenmerken:** Toont 3-5 logische vervolgcalculators. Datahergebruik mogelijk.
- **Voorbeeld:** Na `/bruto-netto-2026/`:
  - "Bereken je zorgtoeslag"
  - "Bekijk je maximale hypotheek"
  - "Bereken je vakantiegeld"

## Type 2: Ontdek-blok

- **Doel:** Cross-sell naar calculators buiten de huidige journey.
- **Kenmerken:** Algemene aanbevelingen, niet contextgevoelig.
- **Voorbeeld:** Na `/toeslagen-calculator/`:
  - "Ontdek ook onze Datumtools"
  - "Bereken je energiekosten"

## Type 3: Bron-blok

- **Doel:** Verwijzen naar officiële bronnen (Belastingdienst, RDW, Rijksoverheid).
- **Kenmerken:** Eén tot drie bronlinks met `target="_blank" rel="noopener"`.
- **Voorbeeld:** Na `/auto-importkosten-berekenen/`:
  - "Controleer de officiële BPM-informatie van de Belastingdienst"

## Type 4: Actie-blok

- **Doel:** Commerciële of praktische vervolgactie suggereren.
- **Kenmerken:** Geen calculator — een externe link of contact-oproep.
- **Voorbeeld:** Na `/hypotheek-calculator/`:
  - "Schakel een hypotheekadviseur in"

## Type 5: Seizoensblok

- **Doel:** Tijdelijke aandacht voor seizoensgebonden calculators.
- **Kenmerken:** Kort zichtbaar (bv. 4 weken in mei voor vakantiegeld). Automatisch in-/uitschakelen op datum.
- **Voorbeeld:** Mei:
  - "Bereken je vakantiegeld — je ontvangt het deze maand"

## Keuzehulp

| Situatie | Aanbevolen type |
|----------|----------------|
| Bezoeker heeft net een inkomen berekend | Journey-blok (toeslagen/hypotheek) |
| Bezoeker zit in een niche-calculator | Ontdek-blok (verwante clusters) |
| Calculator raakt overheidsregels | Bron-blok (Belastingdienst/RDW) |
| Calculator heeft duidelijke commerciële behoefte | Actie-blok |
| Seizoensgebonden onderwerp (vakantiegeld, feestdagen) | Seizoensblok |
