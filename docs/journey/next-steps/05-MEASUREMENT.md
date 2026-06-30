# 05 — Measurement

> **Doel:** Documenteert hoe de effectiviteit van Next Step Blocks gemeten gaat worden (toekomstvisie, niet in v0.1).  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Doel van meting](#doel-van-meting)
2. [Te meten events](#te-meten-events)
3. [Meetmethoden](#meetmethoden)
4. [Dashboard en KPI's](#dashboard-en-kpis)
5. [Privacy bij meting](#privacy-bij-meting)
6. [A/B-testen](#ab-testen)

---

## Doel van meting

Meten of Next Step Blocks daadwerkelijk:

- De **click-through rate (CTR)** verhogen naar vervolgcalculators.
- De **pagina's per sessie** verhogen.
- De **bounce rate** verlagen.
- Specifieke **journeys** voltooien (bv. salaris → toeslagen → kinderopvangtoeslag).

## Te meten events

| Event | Trigger | Data |
|-------|---------|------|
| `nextstep_impression` | Een Next Step Block wordt getoond (zichtbaar in viewport) | `block_id`, `source_calculator`, `block_type` |
| `nextstep_click` | Een item in het block wordt aangeklikt | `block_id`, `item_label`, `item_href`, `journey_id` |
| `nextstep_data_reuse` | De bezoeker kiest ervoor data te hergebruiken | `block_id`, `reused_data_keys` |
| `journey_step_completed` | Een calculator in een journey wordt geopend via een Next Step Block | `journey_id`, `from_calculator`, `to_calculator` |
| `journey_completed` | Een volledige journey (3+ stappen) is doorlopen | `journey_id`, `step_count`, `duration_seconds` |

## Meetmethoden

| Methode | Scope | Privacy |
|---------|-------|---------|
| **Eigen analytics (toekomst)** | Alle events, server-side of edge | Anoniem, geaggregeerd |
| **Google Search Console** | Alleen organische entry-pagina's | Geen extra tracking |
| **Geen Google Analytics** | — | Te invasief voor minimale benodigde data |

> V0.1: **geen** meting actief. Deze sectie dient als ontwerpdocument voor v0.2+.

## Dashboard en KPI's

Voorgesteld dashboard (toekomst):

| KPI | Target | Periode |
|-----|--------|---------|
| Next Step CTR | > 8% | Maandelijks |
| Pagina's per sessie | > 2.0 | Maandelijks |
| Journey-voltooiing (3+ stappen) | > 3% van calculator-sessies | Maandelijks |
| Bounce rate calculators | < 60% | Maandelijks |
| Data-reuse opt-in rate | > 5% van sessies | Maandelijks |

## Privacy bij meting

Bij implementatie van meting:

- **Geen IP-adressen** opslaan.
- **Geen vingerafdrukken** (fingerprinting) gebruiken.
- **Geen cross-site tracking** — alleen meten op calculatieloket.nl.
- **Anonimiseren** — alle events geaggregeerd, niet herleidbaar naar individuen.
- **Opt-out** mogelijk maken (via cookie-consent).
- **Data-minimalisatie** — alleen meten wat nodig is om de effectiviteit van Next Step Blocks te beoordelen.

## A/B-testen

Toekomstige mogelijkheid:

- Twee varianten van een Next Step Block tonen aan willekeurige bezoekers.
- Variabelen: titel, volgorde van items, aantal items, wel/geen `reason`.
- Meten op CTR.
- Winnaar uitrollen na statistische significantie (min. 500 impressies per variant).

> A/B-testen vereist een cookie of localStorage-vlag. Dit valt onder de cookie-consent en mag alleen na expliciete toestemming.
