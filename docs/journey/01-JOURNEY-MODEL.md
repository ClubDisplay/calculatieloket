# 01 — Journey Model

> **Doel:** Datamodel, velddefinities en logische regels voor elke journey.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Definitie van een Journey](#definitie-van-een-journey)
2. [Velddefinities](#velddefinities)
3. [Journey-logica](#journey-logica)
4. [Voorbeeld: Salaris → Toeslagen](#voorbeeld-salaris--toeslagen)
5. [Regels voor datahergebruik](#regels-voor-datahergebruik)
6. [Validatie en foutafhandeling](#validatie-en-foutafhandeling)

---

## Definitie van een Journey

Een *journey* is een gedocumenteerde keten van **maximaal 7 stappen** die een bezoeker doorloopt binnen Calculatieloket.nl.

Elke journey heeft:

- Een **startpunt** (`primary_calculator`) — de eerste calculator die de bezoeker gebruikt.
- Een **intentie** (`entry_intent`) — waarom de bezoeker op deze calculator is.
- Een **vraag** (`user_question`) — wat de bezoeker wil weten.
- **Vervolgstappen** (`next_calculators`) — maximaal 6 logische volgende calculators.
- **Data die herbruikt kan worden** (`reusable_data`) — welke velden van de ene calculator kunnen worden doorgestuurd naar de volgende.

## Velddefinities

| Veld | Type | Verplicht | Beschrijving |
|------|------|----------|-------------|
| `id` | `string` | ✓ | Uniek ID (slug) |
| `name` | `string` | ✓ | Menselijk leesbare naam |
| `primary_calculator` | `string` | ✓ | Start-calculator (id uit `calculators.yml`) |
| `entry_intent` | `string` | ✓ | Search intent / waarom de bezoeker hier is |
| `user_question` | `string` | ✓ | De vraag die de bezoeker wil beantwoorden |
| `known_inputs` | `list[string]` | | Welke velden de start-calculator al kent |
| `derived_outputs` | `list[string]` | | Welke uitkomsten de start-calculator produceert |
| `reusable_data` | `list[string]` | | Welke data herbruikbaar is in volgende calculators |
| `next_calculators` | `list[string]` | ✓ | Logische volgende calculators (max 6) |
| `official_sources` | `list[{name,url}]` | | Officiële bronnen die bij deze journey horen |
| `warnings` | `list[string]` | | Disclaimers en waarschuwingen |
| `conversion_opportunities` | `list[string]` | | Commerciële/praktische vervolgacties (bv. hypotheekadviseur) |
| `future_features` | `list[string]` | | Toekomstige uitbreidingen (bv. account, opslaan) |
| `priority` | `string` | ✓ | A / B / C |
| `status` | `string` | ✓ | `planned`, `documented`, `implemented` |

## Journey-logica

Een journey wordt geactiveerd wanneer:

1. De bezoeker de `primary_calculator` gebruikt.
2. De `reusable_data` aanwezig is in de browser-sessie (query param of localStorage, opt-in).
3. De cross-sell-sectie toont de `next_calculators` in volgorde van relevantie.

In **v0.1** is dit documentatie — de logica wordt niet live uitgevoerd op de site.

## Voorbeeld: Salaris → Toeslagen

- **primary_calculator:** `bruto-netto-2026`
- **known_inputs:** `[ "bruto_maandsalaris", "loonheffingskorting", "pensioen_premie" ]`
- **derived_outputs:** `[ "netto_per_maand", "belastbaar_jaarinkomen", "heffingskortingen" ]`
- **reusable_data:** `[ "belastbaar_jaarinkomen" ]`
- **next_calculators:** `[ "toeslagen-calculator", "hypotheek-calculator", "bruto-netto-2026" ]`

Deze data stroomt **niet** automatisch in v0.1 — het documenteert de ideale flow.

## Regels voor datahergebruik

In v0.1:

- Datahergebruik is **documentatie-only** (geen live-implementatie).
- Als datahergebruik later live gaat:
  - Alleen via **query parameters** of **`localStorage`** (opt-in).
  - Nooit via cookies of server-side opslag (zonder GDPR-consent).
  - Altijd anoniem — geen koppeling aan een persoon of IP-adres.

## Validatie en foutafhandeling

- Als `reusable_data` ontbreekt of incorrect is, toont de volgende calculator de **standaard startwaarden**.
- Er wordt geen foutmelding getoond voor ontbrekende journey-data — de calculator functioneert stand-alone.
