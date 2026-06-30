# 03 — Placement Rules

> **Doel:** Regels voor waar en wanneer Next Step Blocks op de pagina worden getoond.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Positie op de pagina](#positie-op-de-pagina)
2. [Regels per block-type](#regels-per-block-type)
3. [Meerdere blokken](#meerdere-blokken)
4. [Responsive gedrag](#responsive-gedrag)
5. [Uitzonderingen](#uitzonderingen)

---

## Positie op de pagina

De standaardplaatsing van een Next Step Block op een calculatorpagina:

```
┌─────────────────────────────┐
│ H1 titel                    │
│ Subtitle                    │
├─────────────────────────────┤
│ AdSlot (boven calculator)   │
├─────────────────────────────┤
│ Calculator Card             │
│  (invoervelden)             │
│  [Bereken-knop]             │
├─────────────────────────────┤
│ Resultaatkaart              │
│  (resultaten + indicatie)   │
├─────────────────────────────┤
│ 📍 Next Step Block(s)       │  ← HIER
├─────────────────────────────┤
│ Uitleg / H2 / FAQ           │
│ Bronnen                     │
│ Disclaimer                  │
├─────────────────────────────┤
│ Cross-sell (ontdek-blok)    │
└─────────────────────────────┘
```

> **Principe:** Next Step Blocks staan **direct onder het resultaat** en **boven de uitlegtekst**. Ze zijn het eerste wat de bezoeker ziet na het antwoord op zijn vraag.

## Regels per block-type

| Type | Max. aantal | Wanneer verbergen? |
|------|------------|-------------------|
| **Journey-blok** | 1 | Nooit. Altijd tonen. |
| **Ontdek-blok** | 1 | Nooit. |
| **Bron-blok** | 1 | Niet tonen als de calculator al SourceCards heeft. |
| **Actie-blok** | 1 | Niet tonen bij 0 resultaat of foutmelding. |
| **Seizoensblok** | 1 | Buiten de actieve periode. |

## Meerdere blokken

Als een calculator meerdere blokken heeft, geldt deze volgorde:

1. **Journey-blok** (belangrijkste: directe volgende stap)
2. **Bron-blok** (indien relevant voor deze calculator)
3. **Ontdek-blok** (bredere cross-sell)
4. **Actie-blok** (commercieel, onderaan)
5. **Seizoensblok** (tijdelijk, bovenaan of net onder resultaat)

> Maximaal **3 blokken** tegelijk zichtbaar om visuele overload te voorkomen.

## Responsive gedrag

- **Desktop:** blokken in een 2- of 3-koloms grid (afhankelijk van het aantal items).
- **Tablet:** 2-koloms.
- **Mobiel (<600px):** 1 kolom, blokken onder elkaar.
- Items altijd als **hele kaart klikbaar** (zelfde patroon als CrossSellCards).
- Geen horizontale scroll.

## Uitzonderingen

- **Toeslagen-calculator:** deze heeft twee resultaatsecties (huurtoeslag + zorgtoeslag). Next Step Blocks staan **onder beide resultaatsecties**, boven de uitleg.
- **Auto-importkosten:** SourceCards worden **niet** vervangen door een Bron-blok — ze mogen naast elkaar bestaan.
- **Lege/ongeldige invoer:** Next Step Blocks worden **niet** verborgen — ze blijven zichtbaar als navigatiehulp, ook als het resultaat leeg is.
