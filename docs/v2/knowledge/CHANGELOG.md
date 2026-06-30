# Knowledge Object Change

## From

| Field | Value |
|---|---|
| id | nl.vat.standard |
| type | vat_rate |
| country | NL |
| locale | nl-NL |
| version | 2026-01-01 |
| effective_from | 2026-01-01 |
| effective_until | — |

## To

| Field | Value |
|---|---|
| id | be.vat.standard |
| type | vat_rate |
| country | BE |
| locale | nl-BE |
| version | 2026-01-01 |
| effective_from | 2026-01-01 |
| effective_until | — |

## Context

| Field | From | To |
|---|---|---|
| country | NL | BE |
| locale | nl-NL | nl-BE |

## Data

| Field | From | To |
|---|---|---|
| data.rates | [{"value":21,"label":"hoog tarief","category":"standard"},{"value":9,"label":"laag tarief","category":"reduced"},{"value":0,"label":"nultarief","category":"zero"}] | [{"value":21,"label":"hoog tarief","category":"standard"},{"value":12,"label":"middentarief","category":"reduced"},{"value":6,"label":"laag tarief","category":"reduced_low"},{"value":0,"label":"nultarief","category":"zero"}] |

## Sources

### Removed from source

- Belastingdienst — BTW-tarief

### Added in target

- FOD Financiën — BTW-tarieven

## Used by

### Removed from source

- calculator.btw-calculator
- calculator.btw-terugrekenen
- calculator.btw-inclusief-exclusief

## Relationships

### Removed from source

- used_by → calculator.btw-calculator — Gebruikt door de BTW Calculator.
- used_by → calculator.btw-terugrekenen — Gebruikt door BTW Terugrekenen.
- used_by → calculator.btw-inclusief-exclusief — Gebruikt door BTW Inclusief/Exclusief.

### Added in target

- replaces → be.vat.standard — Placeholder relation to satisfy required field.

## Impact

**Risk:** HIGH

### Affected calculators / engines

- calculator.btw-calculator
- calculator.btw-terugrekenen
- calculator.btw-inclusief-exclusief
