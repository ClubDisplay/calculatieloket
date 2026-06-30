# 00 — Knowledge Architecture

> **Status:** Atlas v2 Sprint 006  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf de rol van de Atlas Knowledge Layer binnen het grotere Atlas-platform. Deze laag is **de bron van feiten** voor alle andere lagen: Rule Engine, Calculation Engine, Calculator Definitions, Generator en AI.

---

## Lagenmodel

Atlas v2 bestaat uit vijf hoofdlagen, van abstract naar concreet:

```
┌─────────────────────────────────────┐
│  Website / Pagina's / Astro          │  ← presentatie, UX, SEO
├─────────────────────────────────────┤
│  Generator                           │  ← maakt pagina's/modules van definities
├─────────────────────────────────────┤
│  Calculator Definitions (CDL)        │  ← wat een calculator is, inputs, outputs, regels
├─────────────────────────────────────┤
│  Rule Engine + Calculation Engine  │  ← welke feiten gebruiken, hoe rekenen
├─────────────────────────────────────┤
│  Knowledge Layer                     │  ← feiten, bronnen, relaties
└─────────────────────────────────────┘
```

De Knowledge Layer staat onderaan omdat deze onafhankelijk moet zijn van hoe de bovenliggende lagen werken. Wijzigingen in een Astro-pagina mogen nooit een feit in de Knowledge Layer veranderen.

---

## Scheiding van verantwoordelijkheden

| Laag | Mag weten van feiten? | Mag feiten bevatten? | Mag presentatie bevatten? |
|---|---|---|---|
| Knowledge Layer | Ja | Ja | Nee |
| Rule Engine | Ja | Nee | Nee |
| Calculation Engine | Via Rule Engine | Nee | Nee |
| Calculator Definition | Nee (verwijst naar rules) | Nee | Nee |
| Generator | Ja | Nee | Ja (output) |
| Website / Pagina | Nee | Nee | Ja |

---

## Verschil tussen Rule Engine en Knowledge Layer

- **Knowledge Layer:** bevat de feiten zelf (tarieven, schijven, drempels).
- **Rule Engine:** bepaalt welke feiten van toepassing zijn op een bepaalde locale, jaar en situatie.

Voorbeeld: de Knowledge Layer bevat `nl.tax.box1.2026` met de 2026 schijven. De Rule Engine bepaalt dat een calculator in `nl-NL` met jaar 2026 die schijven moet gebruiken, en niet `nl.tax.box1.2025`.

---

## Hoe calculators naar kennisobjecten verwijzen

Een calculator-definitie verwijst **niet** direct naar een kennisobject. Dat gebeurt in twee stappen:

1. De calculator-definitie bevat een `rules` array. Elke rule heeft een `type` (bijv. `tax_bracket`) en een `applies_to`.
2. De Rule Engine vertaalt die `type` + `locale` + `version` naar een concreet kennisobject (bijv. `nl.tax.box1.2026`).

Voorbeeld:

```yaml
# calculator definition
rules:
  - id: box1_tax_brackets_2026
    type: tax_bracket
    locale: nl-NL
    country: NL
    version: "2026"
    applies_to: calculator
```

```yaml
# knowledge layer
id: nl.tax.box1.2026
type: tax_bracket
country: NL
locale: nl-NL
version: "2026-01-01"
```

---

## Hoe de AI de Knowledge Layer gebruikt

De AI (bijv. een chatbot of content-assistent) gebruikt de Knowledge Layer als **ground truth**. Wanneer een gebruiker vraagt "wat is het hoge btw-tarief in 2026?", haalt de AI het actieve `nl.vat.standard` object op en citeert de bron. Hierdoor:

- Vermijdt de AI hallucinaties over tarieven.
- Kan de AI bronvermelding geven.
- Kan de AI uitleggen waarom een waarde geldt (via `effective_from`, `notes`, `sources`).

Zie `08-AI-USAGE.md` voor details.

---

## Hoe de Generator de Knowledge Layer gebruikt

De Generator leest kennisobjecten om:

- SEO-content te verrijken (bijv. "In 2026 geldt een hoge BTW-tarief van 21%").
- Bronvermeldingen te plaatsen.
- Indicatie-meldingen te genereren.
- Schema-markup (FAQ, HowTo) te vullen met actuele feiten.

De Generator doet zelf geen berekeningen; die blijven bij de Calculation Engine.

---

## Belangrijkste architectuurkeuzes

1. **Kennisobjecten zijn land-vooraf (namespaced).** Iedere id begint met landcode (`nl.`).
2. **Kennisobjecten zijn tijdsgebonden.** `effective_from`/`effective_until` maken jaarlijkse updates expliciet.
3. **Kennisobjecten zijn onafhankelijk van pagina's.** Ze kunnen door meerdere calculators, AI en API worden gebruikt.
4. **Bronvermelding is verplicht.** Elk feit traceert terug naar een bron.
5. **Geen code in kennisobjecten.** Formules worden beschreven, niet geïmplementeerd.

---

## Openstaande vraagstukken voor latere sprints

- Hoe koppelen we Knowledge Layer objecten aan de Rule Engine runtime? (paden, aliases, indexes)
- Hoe implementeren we een snelle lookup per locale + jaar + type?
- Hoe synchroniseren we wijzigingen in bronnen naar de Knowledge Layer?
- Hoe valideren we automatisch dat een kennisobject consistent is met de bron?
