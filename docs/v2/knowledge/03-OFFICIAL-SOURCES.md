# 03 — Official Sources

> **Status:** Atlas v2 Sprint 006  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Leg vast hoe officiële bronnen gekoppeld worden aan kennisobjecten. Elk feit in de Knowledge Layer traceert terug naar een bron, zodat gebruikers, AI en reviewers de herkomst kunnen controleren.

---

## Bronverplichting

Elk kennisobject moet minimaal één `source` bevatten in de `sources` array. De `authority` sectie bevat het hoogste authority level van het object.

---

## Source structuur

```yaml
sources:
  - label: Belastingdienst — BTW-tarief
    url: https://www.belastingdienst.nl/...
    authority_level: official
    domain: belastingdienst.nl
    last_verified: "2026-06-29"
    section: BTW-tarief
```

| Veld | Verplicht | Omschrijving |
|---|---|---|
| `label` | ja | Leesbare naam van de bron |
| `url` | ja | Directe link naar de bron |
| `authority_level` | ja | Zie toegestane levels |
| `domain` | nee | Domein, handig voor filtering |
| `last_verified` | nee | Datum laatste controle |
| `section` | nee | Relevante sectie binnen de bron |
| `notes` | nee | Opmerkingen over de bron |

---

## Authority levels

| Level | Omschrijving | Voorbeelden |
|---|---|---|
| `official` | Overheid, wetgever, uitvoeringsorganisatie | Belastingdienst, RDW, Dienst Toeslagen, Rijksoverheid |
| `semi_official` | Erkende brancheorganisatie, budgetinstituut | Nibud, Ondernemersplein |
| `editorial` | Redactionele toelichting van Atlas zelf | Calculatieloket.nl uitleg, voorbeelden |
| `internal` | Interne validatie of afgeleide regel | Input-range checks, afgeronde waarden |

---

## Authority object

Het top-level `authority` veld geeft het hoogste authority level aan dat van toepassing is op het object:

```yaml
authority:
  level: official
  source: belastingdienst
  last_review: "2026-06-29"
```

Dit maakt het mogelijk om snel te zien hoeveel vertrouwen een object heeft, zonder alle sources te hoeven doorlopen.

---

## Broncontrole

Wanneer `maintenance.source_review_required: true` is in een calculator-definitie, moeten de sources van gerelateerde kennisobjecten bij elke review worden gecontroleerd.

De controle omvat:

- Is de URL nog bereikbaar?
- Is de inhoud nog actueel?
- Is er een nieuwe versie van het object nodig?

---

## Bronconflicten

Als twee bronnen verschillende waarden geven:

1. Gebruik `official` boven `semi_official`.
2. Gebruik `semi_official` boven `editorial`.
3. Documenteer het conflict in `notes`.
4. Plan een review met een domeinexpert.

---

## Voorbeeld

```yaml
sources:
  - label: Belastingdienst — Box 1 tarieven 2026
    url: https://www.belastingdienst.nl/...
    authority_level: official
    domain: belastingdienst.nl
    last_verified: "2026-06-29"
authority:
  level: official
  source: belastingdienst
```

---

## Openstaande vraagstukken

- Automatische URL-check en content-diff.
- Centrale broncatalogus (hergebruik van bronobjecten).
- Bronvermelding in gegenereerde pagina's.
