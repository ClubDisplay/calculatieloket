# 03 — Data Handoff

> **Doel:** Documenteert hoe data tussen calculators kan bewegen — de principes, de grenzen en de v0.1-aanpak.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Principe](#principe)
2. [Wat kan wél (v0.1)](#wat-kan-wél-v01)
3. [Wat kan níet (v0.1)](#wat-kan-níet-v01)
4. [Query-parameter-ontwerp](#query-parameter-ontwerp)
5. [localStorage-protocol](#localstorage-protocol)
6. [Datamapping per journey](#datamapping-per-journey)
7. [Privacy- en GDPR-overwegingen](#privacy--en-gdpr-overwegingen)
8. [Toekomstige uitbreiding (v0.2+)](#toekomstige-uitbreiding-v02)

---

## Principe

> **Geen automatische opslag of doorgifte van persoonlijke gegevens zonder expliciete, geïnformeerde toestemming.**

Dit betekent:

- Geen `fetch`/`POST` van calculatorinvoer naar een server.
- Geen cookies met invulwaarden.
- Geen koppeling aan IP-adres, vingerafdruk of derde partijen.
- Alle berekeningen in de browser.

## Wat kan wél (v0.1)

| Methode | Privacy | Toelichting |
|---------|---------|------------|
| **Query-parameter** (URL) | ✓ | Data in de URL, zichtbaar en deelbaar. Niet persistent. |
| **localStorage** (browser) | ✓ | Data blijft lokaal, enkel na opt-in. Max 7 dagen bewaren. |
| **Cross-sell link met query params** | ✓ | De volgende calculator kan automatisch velden invullen via `?income=28000`. |
| **"Gebruik deze data" knop** | ✓ | Bezoeker klikt zelf om data over te zetten. |

## Wat kan níet (v0.1)

| Methode | Reden |
|---------|-------|
| Server-side opslag | Geen backend; geen database |
| Cookie-tracking | Geen toestemming-model voor tracking-cookies op dit niveau |
| Session-koppeling | Geen account, geen sessie-ID |
| Auto-invullen zonder consent | Bezoeker moet actief kiezen om data te hergebruiken |

## Query-parameter-ontwerp

Standaard patroon voor het doorgeven van data:

```
/toeslagen-calculator/?income=36300&household=single
```

| Parameter | Type | Bron-calculator |
|-----------|------|----------------|
| `income` | `number` | bruto-netto-2026 → taxable_income |
| `household` | `string` | toeslagen → handmatig |
| `gross` | `number` | salaris-calculator → gross_monthly |
| `pension` | `number` | salaris-calculator → pension_amount |

**Regels:**

- De ontvangende calculator leest `URLSearchParams` en vult **alleen** velden die expliciet gematched worden.
- Als een parameter ontbreekt, blijft de standaardwaarde staan.
- Als een parameter ongeldig is (bv. negatief), wordt deze genegeerd.
- Geen `POST` — alleen `GET` (idempotent, deelbaar).

## localStorage-protocol

Alleen te gebruiken **na expliciete opt-in** door de bezoeker:

1. Na een calculatorresultaat toont de site een kleine, onopvallende suggestie:  
   _"Deze gegevens onthouden voor andere calculators? (alleen lokaal, 7 dagen)"_
2. Bij **"Ja"** → `localStorage.setItem("calculatieloket:income", "36300")` met een TTL-attribuut.
3. Bij een volgende calculator: als de sleutel bestaat en niet verlopen is, en de bezoeker in dezelfde sessie zit, kan de waarde worden voor-ingevuld.
4. Na 7 dagen of bij **"Verwijder mijn gegevens"** → `localStorage.removeItem()`.

## Datamapping per journey

Zie `journeys.yml` voor de velddefinities per journey.

Voorbeeld mapping:

| Journey | Herbruikbare data | Doel-calculator | Parameter |
|---------|------------------|----------------|-----------|
| Salaris → Toeslagen | `belastbaar_jaarinkomen` | `toeslagen-calculator` | `?income=X` |
| Salaris → Hypotheek | `bruto_jaarsalaris` | `hypotheek-calculator` | `?income=X` |
| ZZP → BTW | `uurtarief` | `btw-calculator` | geen automatische mapping (handmatig) |
| Auto-import → BPM | `aankoopprijs`, `co2` | _toekomstig_ | — |

## Privacy- en GDPR-overwegingen

- **Alle berekeningen zijn client-side** — er is geen server die invoer verwerkt.
- **Geen persistentie zonder opt-in** — en alleen in de browser van de gebruiker.
- **Geen third-party scripts** met toegang tot calculatorinvoer (AdSense laadt separaat, na CookieConsent).
- **Geen koppeling aan Google Analytics** zonder apart cookie-consent.
- **AVG-grondslag:** gerechtvaardigd belang (functioneel noodzakelijk) voor het tijdelijk doorgeven van niet-persoonsgegevens (anonieme getallen) via query-parameters.

## Toekomstige uitbreiding (v0.2+)

- **Encrypted profile** — lokaal versleuteld profiel in `localStorage` of IndexedDB.
- **Optioneel Calclatieloket-account** met minimale gegevens (alleen e-mail, opt-in).
- **"Mijn dashboard"** met alle eerdere berekeningen en hun resultaten.
- **Widget-export** — calculator embedden op andere sites met de huidige waarden.

> Deze uitbreidingen worden pas geïmplementeerd NADAT:
> - Een DPIA (Data Protection Impact Assessment) is uitgevoerd.
> - GDPR-compliance is bevestigd door een jurist.
> - Er een werkend cookie-consent- en privacy-mechanisme is (meer dan alleen AdSense).
