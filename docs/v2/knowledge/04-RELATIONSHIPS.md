# 04 — Relationships

> **Status:** Atlas v2 Sprint 006  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf hoe kennisobjecten onderling relaties aangaan. Deze relaties vormen een kennisgraf die de Rule Engine, AI en Generator kunnen doorlopen.

---

## Relatieveld

Elk object kan een `relationships` array bevatten:

```yaml
relationships:
  - relation: replaces
    target: nl.tax.box1.2025
    description: "Vervangt de 2025 Box 1 schijven."
  - relation: depends_on
    target: nl.tax.currency.eur
    description: "Schijven zijn in euro."
  - relation: used_by
    target: calculator.btw-calculator
    description: "Gebruikt door de BTW Calculator."
```

| Veld | Verplicht | Omschrijving |
|---|---|---|
| `relation` | ja | Type relatie |
| `target` | ja | Id van het gerelateerde object of calculator |
| `description` | nee | Menselijke uitleg |

---

## Toegestane relatietypes

| Type | Omschrijving | Voorbeeld |
|---|---|---|
| `replaces` | Dit object vervangt een ouder object | `nl.tax.box1.2026` → `nl.tax.box1.2025` |
| `replaced_by` | Dit object is vervangen door een nieuwer object | `nl.tax.box1.2025` → `nl.tax.box1.2026` |
| `depends_on` | Dit object bouwt voort op een ander object | `nl.tax.box1.2026` → `nl.tax.currency.eur` |
| `extends` | Dit object breidt een ander object uit | `nl.tax.ak.2026` → `nl.tax.box1.2026` |
| `conflicts_with` | Tijdelijk conflict tussen bronnen | `nl.vat.standard.2026` ↔ `nl.vat.temp.2026` |
| `used_by` | Dit object wordt gebruikt door een calculator of consumer | `nl.vat.standard` → `calculator.btw-calculator` |
| `part_of` | Dit object is onderdeel van een groter geheel | `nl.tax.ahk.2026` → `nl.tax.system.2026` |

---

## used_by

Naast `relationships` is er een apart `used_by` veld. Dit is een compacte lijst van consumers die dit object gebruiken:

```yaml
used_by:
  - calculator.btw-calculator
  - calculator.btw-terugrekenen
  - calculator.btw-inclusief-exclusief
```

`used_by` is niet bedoeld als volledige kennisgraf; daarvoor is `relationships`. Het geeft wel snel inzicht in wie afhankelijk is van een object.

---

## Bidirectionele relaties

Bij `replaces`/`replaced_by` en `depends_on` is het gebruikelijk om beide kanten vast te leggen:

```yaml
# nl.tax.box1.2026
relationships:
  - relation: replaces
    target: nl.tax.box1.2025

# nl.tax.box1.2025
relationships:
  - relation: replaced_by
    target: nl.tax.box1.2026
```

Dit maakt het mogelijk om zowel vooruit als achteruit door de tijd te navigeren.

---

## Relaties naar calculators

Kennisobjecten verwijzen naar calculators via de namespace `calculator.` gevolgd door de calculator id:

```yaml
used_by:
  - calculator.btw-calculator
```

Dit helpt bij impact-analyse: als een tarief wijzigt, weet Atlas direct welke calculators en pagina's beïnvloed zijn.

---

## Grafische queries (toekomst)

In latere sprints kan Atlas vragen stellen als:

- "Welke objecten hangen af van `nl.tax.box1.2026`?"
- "Welke calculators gebruiken objecten met `authority_level: official`?"
- "Welke objecten zijn vervangen sinds 2026?"

Deze queries worden mogelijk door de `relationships` en `used_by` velden.

---

## Openstaande vraagstukken

- Moeten we relaties centraal indexeren?
- Hoe voorkomen we inconsistente bidirectionele relaties?
- Hoe valideren we dat een `target` bestaat?
