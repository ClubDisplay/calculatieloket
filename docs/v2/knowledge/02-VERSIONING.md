# 02 — Versioning

> **Status:** Atlas v2 Sprint 006  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf hoe de Atlas Knowledge Layer omgaat met veranderende feiten over tijd. Veel regels wijzigen per jaar (belastingtarieven, toeslagengrenzen) of per wetgevingswijziging. Het versioning-systeem maakt deze wijzigingen expliciet en traceerbaar.

---

## Principes

1. **Tijd is de belangrijkste dimensie.** Een object is geldig van `effective_from` tot `effective_until`.
2. **Meerdere versies van hetzelfde object kunnen naast elkaar bestaan.** Bijvoorbeeld `nl.tax.box1.2026` en `nl.tax.box1.2025`.
3. **Een object vervangt een ander object via `replaces` / `replaced_by`.**
4. **Status en effective dates zijn onafhankelijk.** Een object kan `active` zijn met een toekomstige `effective_from` (geplande wijziging).

---

## Statuswaarden

| Status | Omschrijving |
|---|---|
| `draft` | Nog niet definitief, ter review |
| `active` | Geldig en in gebruik |
| `superseded` | Verdrongen door een nieuwere versie, maar nog beschikbaar voor historische berekeningen |
| `deprecated` | Mag niet meer gebruikt worden voor nieuwe berekeningen |
| `archived` | Alleen nog relevant voor audit of historie |

---

## Effective dates

- `effective_from`: datum waarop het object geldig wordt.
- `effective_until`: laatste dag waarop het object geldig is, of `null` voor "nog onbekend".

### Voorbeeld

```yaml
id: nl.tax.box1.2026
status: active
effective_from: "2026-01-01"
effective_until: "2026-12-31"
version: "2026-01-01"
```

```yaml
id: nl.tax.box1.2025
status: superseded
effective_from: "2025-01-01"
effective_until: "2025-12-31"
version: "2025-01-01"
```

---

## Meerdere jaren naast elkaar

De Knowledge Layer ondersteunt meerdere actieve jaren door verschillende ids:

```
objects/
  nl.tax.box1.2025.yml
  nl.tax.box1.2026.yml
  nl.tax.box1.2027.yml
```

De Rule Engine selecteert het juiste object op basis van:

- Gevraagde `locale`/`country`.
- Gevraagde jaar of `effective_from`/`effective_until`.
- `status: active` (tenzij expliciet historisch wordt gevraagd).

---

## Overgangen tussen jaren

Wanneer een nieuw jaar begint:

1. Kopieer het vorige object naar een nieuwe id (bijv. `nl.tax.box1.2026`).
2. Wijzig `data` naar de nieuwe waarden.
3. Update `effective_from`, `effective_until`, `version`.
4. Zet oude object op `status: superseded`.
5. Voeg `replaces`/`replaced_by` relaties toe.
6. Controleer `used_by` en update indien nodig.

---

## Versie vs effective date

- `version` is een menselijk leesbare versie-indicator. Vaak de `effective_from` datum.
- `effective_from`/`effective_until` zijn de formele geldigheidsdata.

Voor stabiele objecten (bijv. een formulebeschrijving) kan `version` iets anders zijn dan een datum, bijvoorbeeld `"1.0"`. Voor jaarlijkse regels is `version: "2026-01-01"` aan te raden.

---

## Voorbeeld: BTW-tarieven over meerdere jaren

```
objects/
  nl.vat.standard.2025.yml
  nl.vat.standard.2026.yml
```

```yaml
id: nl.vat.standard.2026
type: vat_rate
status: active
effective_from: "2026-01-01"
effective_until: null
replaces: nl.vat.standard.2025
version: "2026-01-01"
```

```yaml
id: nl.vat.standard.2025
type: vat_rate
status: superseded
effective_from: "2025-01-01"
effective_until: "2025-12-31"
replaced_by: nl.vat.standard.2026
version: "2025-01-01"
```

---

## Openstaande vraagstukken

- Hoe bepaalt de Rule Engine welke versie actief is op een bepaalde datum?
- Hoe om te gaan met tussentijdse wijzigingen binnen een jaar?
- Hoe archiveren we objecten zonder de historie te verliezen?
