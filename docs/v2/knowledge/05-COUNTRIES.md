# 05 — Countries

> **Status:** Atlas v2 Sprint 039  
> **Laatst bijgewerkt:** 2026-06-30

---

## Doel

Beschrijf hoe de Atlas Knowledge Layer meerdere landen en locales ondersteunt. De scheiding tussen `country` en `locale` maakt hergebruik en fallback mogelijk.

---

## Land vs locale

| Veld | Voorbeeld | Betekenis |
|---|---|---|
| `country` | `NL` | Landcode volgens ISO 3166-1 alpha-2 |
| `locale` | `nl-NL` | Taal + regio volgens BCP-47 |

Een land kan meerdere locales hebben:

- België: `nl-BE`, `fr-BE`
- Zwitserland: `de-CH`, `fr-CH`, `it-CH`

De regels van het land zijn meestal gelijk, maar de taal verschilt.

---

## Namespacing

Ieder kennisobject begint met de landcode:

```
nl.vat.standard
be.vat.standard
fr.vat.standard
de.vat.standard
```

Op deze manier:

- Zijn objecten per land duidelijk gescheiden.
- Kan de Rule Engine snel filteren op `country`.
- Is het onmogelijk om per ongeluk een NL-object in een BE-calculator te gebruiken.

---

## Fallback-strategie

Wanneer een object niet beschikbaar is voor een gevraagde locale, gebruikt de Rule Resolver de volgende volgorde:

1. Exacte match op `locale` (bijv. `nl-BE`).
2. Taal-only fallback (bijv. `nl-BE` → `nl`).
3. Land-fallback op `country` (bijv. `BE` of `be`).
4. `default` locale.

Voorbeeld: een `fr-BE` calculator vraagt `vat.standard` in België. De Rule Resolver zoekt:

1. `fr-BE` → niet gevonden.
2. `fr` → niet gevonden.
3. `BE` / `be` → niet gevonden (momenteel is er alleen een `nl-BE` object).
4. `default` → niet gevonden.

Resultaat: `undefined`. Dit is het verwachte gedrag zolang er geen `fr-BE`-, taal- of land-level object voor België bestaat.

---

## Hoe meerdere landen naast elkaar bestaan

```
docs/v2/knowledge/objects/
  nl.vat.standard.yml
  be.vat.standard.yml
  de.vat.standard.yml
  fr.vat.standard.yml
```

Elk object is onafhankelijk. Ze kunnen verschillende tarieven, schijven en bronnen hebben. De structuur is identiek; alleen de `data` en `sources` verschillen.

Actuele objecten:

- `nl.vat.standard.yml` — Nederland
- `be.vat.standard.yml` — België
- `fr.vat.standard.yml` — Frankrijk
- `de.vat.standard.yml` — Duitsland
- `es.vat.standard.yml` — Spanje
- `nl.tax.box1.2026.yml` — Nederlandse Box 1 belasting
- `de.tax.income.2026.yml` — Duitse inkomstenbelasting (draft)

---

## Land-specifieke types

Sommige objecttypes zijn alleen relevant voor bepaalde landen:

- `nl.tax.box1` — Nederlandse Box 1 belasting.
- `de.tax.income.2026` — Duitse inkomstenbelasting (draft).
- `be.vat.standard` — Belgische BTW.
- `de.vat.standard` — Duitse BTW.
- `es.vat.standard` — Spaanse BTW.
- `fr.vat.standard` — Franse BTW.

De Rule Engine weet welke types voor welk land beschikbaar zijn. Een draft object wordt alleen opgelost als `status: active`.

---

## Voorbeeld: BTW in meerdere landen

```yaml
# nl.vat.standard
country: NL
locale: nl-NL
data:
  default_rate: 21
  rates:
    - value: 21
      category: standard
    - value: 9
      category: reduced
    - value: 0
      category: zero

# be.vat.standard
country: BE
locale: nl-BE
data:
  default_rate: 21
  rates:
    - value: 21
      category: standard
    - value: 12
      category: reduced
    - value: 6
      category: reduced_low
    - value: 0
      category: zero

# fr.vat.standard
country: FR
locale: fr-FR
data:
  default_rate: 20
  rates:
    - value: 20
      category: standard
    - value: 10
      category: reduced
    - value: 5.5
      category: reduced_low
    - value: 2.1
      category: super_reduced
    - value: 0
      category: zero

# de.vat.standard
country: DE
locale: de-DE
data:
  default_rate: 19
  rates:
    - value: 19
      category: standard
    - value: 7
      category: reduced

# es.vat.standard
country: ES
locale: es-ES
data:
  default_rate: 21
  rates:
    - value: 21
      category: standard
    - value: 10
      category: reduced
    - value: 4
      category: reduced_low
    - value: 0
      category: zero
```

---

## Openstaande vraagstukken

- Hoe definiëren we een `default` locale per land?
- Hoe om te gaan met landen die geen officiële bron hebben voor een bepaald type?
- Hoe ondersteunen we meerdere valuta?
