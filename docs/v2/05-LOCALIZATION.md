# 05 — Localization

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf hoe valuta, taal, bronnen, wetgeving en formatting per land gescheiden blijven in Atlas v2. Een calculator moet in meerdere landen kunnen draaien zonder code te dupliceren.

---

## Principes

1. **Locale = language + country + rules.** `nl-NL` is niet hetzelfde als `nl-BE`.
2. **Valuta en formatting zijn los van taal.** België gebruikt Euro en Nederlandse notatie, maar andere regels.
3. **Bronnen en wetgeving zijn per land.** NL verwijst naar Belastingdienst, BE naar SPF Finances.
4. **Content is vertaalbaar.** FAQ, uitleg, disclaimers per locale.
5. **Fallback is expliciet.** `be-FR` valt terug op `be-NL` voor regels, niet voor content.

---

## Locale-identificatie

| Locale | Taal | Land | Valuta | Product-voorbeeld |
|---|---|---|---|---|
| `nl-NL` | Nederlands | Nederland | EUR | calculatieloket.nl |
| `nl-BE` | Nederlands | België | EUR | calculatieloket.be (NL) |
| `fr-BE` | Frans | België | EUR | calculatieloket.be (FR) |
| `de-DE` | Duits | Duitsland | EUR | (toekomstig) |
| `es-ES` | Spaans | Spanje | EUR | (toekomstig) |
| `fr-FR` | Frans | Frankrijk | EUR | (toekomstig) |

---

## Wat is per locale gescheiden?

| Onderdeel | Locatie | Voorbeeld |
|---|---|---|
| **Regels** | `src/lib/rules/{locale}/` | BTW-tarieven, belastingschijven. |
| **Valuta-instellingen** | `src/lib/localization/currency.yml` | EUR, duizendtallen, decimalen. |
| **Formatting** | `src/lib/localization/format.yml` | Datum, percentage, getal. |
| **Content** | `content/{locale}/{calculator}/` | FAQ, uitleg, voorbeelden. |
| **Bronnen** | `src/lib/localization/sources.yml` | Officiële overheidswebsites. |
| **Foutmeldingen** | `src/lib/localization/messages.yml` | "Vul een geldig bedrag in." |
| **SEO** | `seo/{locale}/{calculator}.yml` | Titel, description, keywords. |

---

## Valuta en formatting

```yaml
# src/lib/localization/currency.yml
locales:
  nl-NL:
    currency: EUR
    symbol: "€"
    position: prefix_with_space
    thousands_separator: "."
    decimal_separator: ","
  en-US:
    currency: USD
    symbol: "$"
    position: prefix
    thousands_separator: ","
    decimal_separator: "."
```

---

## Officiële bronnen per land

```yaml
# src/lib/localization/sources.yml
NL:
  tax: "https://www.belastingdienst.nl"
  vehicle: "https://www.rdw.nl"
  government: "https://www.rijksoverheid.nl"
  benefits: "https://www.toeslagen.nl"
BE:
  tax: "https://finances.belgium.be"
  vehicle: "https://www.dmv.be"
  government: "https://www.belgium.be"
```

---

## Content fallback

```
content/fr-BE/btw-calculator/faq.yml
        ↓ (niet gevonden)
content/nl-BE/btw-calculator/faq.yml
        ↓ (niet gevonden)
content/nl-NL/btw-calculator/faq.yml
        ↓ (niet gevonden)
content/default/btw-calculator/faq.yml
```

> **Regel:** content valt terug op dezelfde taal in hetzelfde land, daarna op de default locale, daarna op `default`.

---

## RTL en toegankelijkheid

Atlas v2 houdt rekening met:
- Taalrichting (`ltr` default, `rtl` voorbereid).
- Toegankelijke labels en ARIA-attributen per locale.
- Kleur en cultuur (bijv. groen/rood gebruik in financiële context).

---

## Product-specifieke overrides

Een product kan een locale-instelling overschrijven:

```yaml
# calculatieloket.nl/product.yml
overrides:
  nl-NL:
    sources:
      tax: "https://www.belastingdienst.nl"
    disclaimers:
      default: "Deze berekening is een indicatie."
```

---

## Migratie van huidige v1

In v1 is alles `nl-NL`. De migratie naar v2 begint met het isoleren van NL-specifieke regels en content, zodat later andere locales toegevoegd kunnen worden zonder refactoring.
