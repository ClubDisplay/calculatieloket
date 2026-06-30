# 07 — Knowledge Lifecycle

> **Status:** Atlas v2 Sprint 006  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf de levenscyclus van een kennisobject van ontwerp tot archief. De lifecycle maakt expliciet wanneer een object geldig, verouderd of niet meer gebruikt mag worden.

---

## Statusoverzicht

| Status | Mag gebruikt worden? | Review nodig? | Omschrijving |
|---|---|---|---|
| `draft` | Nee | Ja | Nog niet definitief |
| `active` | Ja | Ja | Geldig en actueel |
| `superseded` | Alleen historisch | Ja | Vervangen door nieuwere versie |
| `deprecated` | Nee | Ja | Mag niet meer gebruikt worden |
| `archived` | Nee | Nee | Alleen voor audit |

---

## Levenscyclus flow

```
draft → active → superseded → deprecated → archived
```

1. **Draft:** object wordt voorbereid, feiten worden gecontroleerd.
2. **Active:** object wordt goedgekeurd en is beschikbaar voor calculators.
3. **Superseded:** er is een nieuwere versie; oude versie blijft beschikbaar voor historie.
4. **Deprecated:** oude versie mag niet meer voor nieuwe berekeningen worden gebruikt.
5. **Archived:** object wordt alleen bewaard voor compliance/audit.

---

## Wanneer een object updaten

Een object moet worden herzien bij:

- Jaarwisseling (bijv. nieuwe belastingtarieven).
- Wetgevingswijziging.
- Bronwijziging (URL, bedrag, drempel).
- Nieuwe officiële publicatie.
- Bug of correctie in bestaand object.

---

## Owner en review

Elk object heeft een eigenaar. De eigenaar is verantwoordelijk voor:

- Juistheid van de feiten.
- Tijdige update bij wijzigingen.
- Broncontrole.
- Communicatie naar consumers (`used_by`).

```yaml
owner: Barry
review_on:
  - tax_year_change
  - legislation_change
```

---

## Impact van wijzigingen

Wanneer een `active` object wordt gewijzigd, moet Atlas bepalen welke consumers erdoor worden geraakt:

1. Lees `used_by` en `relationships`.
2. Identificeer calculators, AI-context en gegenereerde pagina's.
3. Trigger een review van gerelateerde calculator-definities.
4. Update `last_review` en `version` indien nodig.

---

## Voorbeeld

```yaml
id: nl.tax.box1.2026
status: active
effective_from: "2026-01-01"
effective_until: null
owner: Barry
review_on:
  - tax_year_change
  - legislation_change
```

In 2027 wordt dit object:

```yaml
status: superseded
effective_until: "2026-12-31"
replaced_by: nl.tax.box1.2027
```

---

## Openstaande vraagstukken

- Automatische notificatie naar owners bij bronwijzigingen.
- Impact-analyse workflow.
- Archiveringsbeleid (hoelang bewaren?).
