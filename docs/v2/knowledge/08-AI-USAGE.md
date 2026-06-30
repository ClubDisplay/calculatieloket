# 08 — AI Usage

> **Status:** Atlas v2 Sprint 006  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf hoe AI de Atlas Knowledge Layer gebruikt als ground truth. De Knowledge Layer voorkomt dat AI hallucineert over tarieven, drempels en regels.

---

## Principes

1. **AI gebruikt alleen feiten uit de Knowledge Layer.** Geen aannames.
2. **AI citeert bronnen.** Elk antwoord bevat een verwijzing naar `source`.
3. **AI respecteert effective dates.** Een antwoord over 2025 gebruikt 2025-objecten, niet 2026.
4. **AI geeft indicaties aan.** Bij `editorial` of `internal` authority levels meldt de AI dat het een indicatie betreft.
5. **AI wijzigt nooit objecten.** Alleen menselijke owners mogen kennisobjecten wijzigen.

---

## Hoe AI feiten ophaalt

Wanneer een gebruiker een vraag stelt, doorloopt de AI deze stappen:

1. Identificeer het relevante kennisobject (bijv. `nl.vat.standard`).
2. Controleer `status` en `effective_from`/`effective_until`.
3. Lees `data` en `sources`.
4. Formuleer een antwoord met bronvermelding.
5. Voeg `notes` toe als extra context.

Voorbeeld:

> **Vraag:** Wat is het hoge BTW-tarief in 2026?
>
> **AI-antwoord:** Het hoge BTW-tarief in Nederland is 21% in 2026. Bron: Belastingdienst — BTW-tarief (officieel).

---

## AI prompt context

De AI kan een geselecteerd kennisobject in de prompt opnemen als gestructureerde context:

```yaml
context:
  object: nl.vat.standard
  status: active
  effective_from: "2026-01-01"
  data:
    rates: [21, 9, 0]
  sources:
    - Belastingdienst — BTW-tarief
```

Dit voorkomt dat het model verouderde of verkeerde tarieven gebruikt.

---

## AI en relaties

De AI kan `relationships` en `used_by` gebruiken om antwoorden te verrijken:

- "Welke calculators gebruiken dit tarief?"
- "Wat was het tarief vorig jaar?" (via `replaces`/`replaced_by`)
- "Welke regels hangen af van deze schijf?" (via `depends_on`)

---

## AI en contentgeneratie

De AI kan de Knowledge Layer gebruiken om SEO-content, FAQ's en voorbeelden te genereren:

- **SEO tekst:** "In 2026 geldt in Nederland een hoge BTW-tarief van 21%, een laag tarief van 9% en een nultarief van 0%."
- **FAQ:** "Wat is het hoge BTW-tarief?" → 21%.
- **Voorbeelden:** Reële berekeningen gebaseerd op actuele tarieven.

Alle gegenereerde content moet worden gecontroleerd door een mens voordat deze live gaat.

---

## AI en de Rule Engine

De AI raadtpleegt de Rule Engine om te weten welk object van toepassing is. De Rule Engine bepaalt:

- Welk land en locale.
- Welk jaar.
- Welke versie.

De AI zelf bepaalt nooit welke tarieven van toepassing zijn.

---

## Veiligheidsafspraken

- De AI mag geen juridisch advies geven.
- De AI verwijst altijd naar officiële bronnen voor belangrijke beslissingen.
- De AI merkt `internal`/`editorial` authority levels expliciet als indicatie.
- De AI toont `effective_from`/`effective_until` bij tijdsgevoelige vragen.

---

## Openstaande vraagstukken

- Hoe RAG-indexeren we kennisobjecten voor snelle retrieval?
- Hoe voorkomen we dat AI onbedoeld conclusies trekt uit `draft` objecten?
- Hoe kunnen we AI-gegenereerde content herleiden naar gebruikte objecten?
