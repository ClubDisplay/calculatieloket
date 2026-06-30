# 00 — Journey Engine

> **Doel:** Centrale documentatie van de Atlas Journey Engine — het systeem dat per calculator bepaalt wat de logische vervolgstap is voor de bezoeker.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Wat is de Journey Engine?](#wat-is-de-journey-engine)
2. [Probleemstelling](#probleemstelling)
3. [Engine-componenten](#engine-componenten)
4. [Huidige scope (v0.1)](#huidige-scope-v01)
5. [Toekomstige scope](#toekomstige-scope)
6. [Privacy-principe](#privacy-principe)
7. [Samenhang met de Atlas](#samenhang-met-de-atlas)

---

## Wat is de Journey Engine?

De Journey Engine is een **documentatie- en planningssysteem** dat per calculator definieert:

- **Waar komt de bezoeker vandaan?** (Google, homepage, andere calculator, direct)
- **Welke vraag wil hij beantwoorden?** (de search intent)
- **Welke calculator is de logische volgende stap?** (next-best-calculator)
- **Welke data kan worden hergebruikt?** (bv. bruto salaris → netto → toeslagen)
- **Welke officiële bronnen zijn nodig?** (Belastingdienst, RDW, Rijksoverheid)
- **Welke disclaimers zijn vereist?** ("indicatie", "geen recht op")
- **Welke commerciële/praktische actie volgt later?** (bv. hypotheekadviseur, boekhouder)

Dit is **geen live-systeem** dat draait in productie. Het is een **planningslaag** die documenteert hoe de bezoeker idealiter door het platform beweegt en welke technische voorzieningen daarvoor nodig zijn.

## Probleemstelling

Zonder Journey Engine staan calculators **los van elkaar**:

- De bezoeker rekent een brutonetto-salaris uit — en vertrekt.
- Geen suggestie om toeslagen te checken.
- Geen suggestie om pensioen of hypotheek te verkennen.
- Her-invoer van dezelfde gegevens.

Met een Journey Engine:

- Herkent het platform dat een `bruto 3500` ook relevant is voor `zorgtoeslag` en `maximale hypotheek`.
- Biedt het contextuele vervolgstappen ("Ook handig" wordt "Je volgende stap").
- Minimaliseert het invoerwerk door data door te geven.

## Engine-componenten

| Component | Bestand | Functie |
|-----------|---------|---------|
| Journeys | `journeys.yml` | Geregistreerde journeys met alle metadata |
| Journey-model | `01-JOURNEY-MODEL.md` | Datamodel en logica per journey |
| User-flows | `02-USER-FLOWS.md` | Visuele en tekstuele flowbeschrijvingen |
| Data-handoff | `03-DATA-HANDOFF.md` | Hoe data tussen calculators beweegt |
| Next-best-calculator | `04-NEXT-BEST-CALCULATOR.md` | Aanbevelingslogica |
| Account-visie | `05-FUTURE-ACCOUNT-VISION.md` | Lange-termijnvisie (profiel/account) |

## Huidige scope (v0.1)

- **5 journeys** gedocumenteerd in `journeys.yml`.
- **Datahergebruik** alleen client-side (via query parameters of `localStorage`, opt-in).
- **Geen opslag** van persoonlijke gegevens.
- **Geen accounts** — de bezoeker blijft anoniem.
- Cross-sell via `CrossSellCards`-component blijft de huidige implementatie; de Journey Engine dient als **herontwerp-documentatie** voor wanneer we van cross-sell naar journey-aware overstappen.

## Privacy-principe

> **Standaard wordt er geen persoonlijke data opgeslagen of gedeeld.**  
> Datahergebruik in v0.1 gebeurt uitsluitend client-side (browser `localStorage` of query parameters) en alleen als de bezoeker daar expliciet toestemming voor geeft.

Zie `03-DATA-HANDOFF.md` voor de technische uitwerking.

## Samenhang met de Atlas

- `journeys.yml` ← verrijkt door `calculators.yml` (catalogus)
- Journey Engine ← gevoed door SEO-playbook (`02-SEO-PLAYBOOK.md`) voor intent/entry mapping
- User-flows ← inspireert nieuwe calculator-ideeën in de roadmap (`03-ROADMAP.md`)
