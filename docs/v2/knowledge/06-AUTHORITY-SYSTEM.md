# 06 — Authority System

> **Status:** Atlas v2 Sprint 006  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Leg vast hoe Atlas bepaalt hoeveel vertrouwen een feit verdient. De authority system helpt bij bronkeuze, conflictresolutie en reviewprioriteit.

---

## Authority levels

| Level | Gewicht | Omschrijving |
|---|---|---|
| `official` | 4 | Overheid, wetgever, uitvoeringsorganisatie |
| `semi_official` | 3 | Erkende brancheorganisatie, budgetinstituut, overheidspartners |
| `editorial` | 2 | Redactionele toelichting van Atlas zelf |
| `internal` | 1 | Interne validatie, afgeleide regels, afrondingen |

Hoe hoger het gewicht, hoe meer vertrouwen.

---

## Toepassing

- **Bronkeuze:** bij conflicterende bronnen gebruik Atlas het hoogste authority level.
- **Reviewprioriteit:** objecten met `authority_level: official` hebben prioriteit bij broncontrole.
- **AI-grounding:** de AI geeft voorkeur aan feiten met `official` status.
- **Indicatie-meldingen:** objecten met `editorial` of `internal` krijgen een indicatie-label.

---

## Authority in objecten

```yaml
authority:
  level: official
  source: belastingdienst
  last_review: "2026-06-29"
  review_frequency: yearly
```

Het `authority` object geeft het hoogste authority level van het object. De individuele `sources` kunnen lagere levels hebben, maar het object zelf wordt beoordeeld op basis van de hoogste.

---

## Voorbeeld: conflictresolutie

Stel `source A` (official) zegt 21% BTW en `source B` (semi_official) zegt 20% BTW. Atlas gebruikt 21% en logt een waarschuwing dat source B afwijkt.

---

## Authority per rule type

| Type | Verwacht authority level |
|---|---|
| `vat_rate` | `official` |
| `tax_bracket` | `official` |
| `tax_credit` | `official` |
| `allowance_threshold` | `official` |
| `mortgage_formula` | `semi_official` of `official` |
| `annuity_formula` | `semi_official` |
| `import_cost` | `official` |
| `manual_input` | `internal` of `official` |
| `informational` | `editorial` of `internal` |

---

## Interne validatie als authority

Regels die puur dienen om invoer te valideren (bijv. "bedrag moet positief zijn") krijgen `authority_level: internal`. Ze zijn geen feit over de wereld, maar een afspraak over geldige invoer.

---

## Openstaande vraagstukken

- Moet een object meerdere authority levels kunnen hebben per source?
- Hoe rapporteren we authority aan eindgebruikers?
- Hoe verwerken we tijdelijke bronnen (bijv. wetswijzigingen in behandeling)?
