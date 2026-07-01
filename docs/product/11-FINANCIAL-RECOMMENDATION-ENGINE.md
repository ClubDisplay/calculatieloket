# 11 — Financial Recommendation Engine v1

> **Doel:** Een generieke, rule-based aanbevelingslaag bovenop bestaande calculator-resultaten, zodat elke calculator automatisch relevante vervolgstappen toont.  
> **Niet in scope:** AI, chatbot, engine-wijzigingen, Knowledge Layer-wijzigingen, Rule Resolver-wijzigingen, deploy, `.env`.  
> **Laatst bijgewerkt:** 2026-07-02

---

## Waarom rule-based en geen AI

De eerste versie van Financial Recommendation Engine bewust **geen AI**.

- **Voorspelbaarheid:** elke aanbeveling is traceerbaar tot een expliciete regel.
- **Onderhoud:** regels zijn leesbaar, testbaar en uitbreidbaar zonder modeltraining.
- **Scope:** we hebben nu geen behoefte aan natuurlijke taal, conversatie of voorspellende modellen.
- **Snelheid:** rule-based logica draait client-side en server-side zonder externe API-calls.

Als later blijkt dat rule-based aanbevelingen tekortschieten, kan de engine als laag blijven bestaan terwijl een AI-module hetzelfde `Recommendation` interface implementeert.

---

## Architectuur

```
Calculator pagina
    │
    ├─ values (inputvelden)
    ├─ result (engine output)
    │
    ▼
getRecommendations(input)
    │
    ├─ registry[calculator] ──► rule set
    │
    ▼
Recommendations
    │
    ▼
FinancialJourney component
```

De engine is een dunne laag:

1. `RecommendationInput` bundelt `calculator`, `values` en `result`.
2. `recommendationRegistry` koppelt een calculator-key aan één of meer `RecommendationRule` functies.
3. `getRecommendations()` voert de regels uit, filtert de huidige calculator eruit, sorteert op `priority` en dedupliceert op `id`.
4. Het resultaat is een platte array van `Recommendation` objecten die `FinancialJourney.astro` kan renderen.

---

## Types

```ts
// src/lib/recommendations/types.ts
export interface Recommendation {
  id: string;        // unieke sleutel, bij voorkeur overeenkomend met calculator-key
  title: string;     // korte titel
  description: string;
  url: string;       // interne link
  priority: number;  // lager = eerder getoond
  reason: string;    // waarom deze aanbeveling (debug/UX)
}

export interface RecommendationInput {
  calculator: string;
  values: Record<string, unknown>;  // ruwe inputwaarden
  result: Record<string, unknown>;  // berekende resultaten
}

export type RecommendationRule = (input: RecommendationInput) => Recommendation[];
```

---

## Registry

`src/lib/recommendations/registry.ts` is de centrale koppeltabel. Nieuwe calculators registreren zich hier door hun key + rule-set toe te voegen.

```ts
export const recommendationRegistry: Record<string, RecommendationRule> = {
  "bruto-netto": incomeRules,
  "salaris": incomeRules,
  "btw": btwRules,
  "btw-terugrekenen": btwRules,
  "btw-inclusief-exclusief": btwRules,
  "hypotheek": mortgageRules,
  "zzp": zzpRules,
  "toeslagen": allowancesRules,
  "auto-importkosten": importCostsRules,
};
```

Er is **geen grote switch statement**. De engine vraagt eenvoudig `recommendationRegistry[calculator]` op.

---

## Rule files

### `src/lib/recommendations/rules/income.ts`

Voor `bruto-netto` en `salaris`.

| Conditie | Aanbeveling | Priority | Reason |
|---|---|---|---|
| `nettoMonthly < 2500` | Toeslagen | 1 | laag netto inkomen |
| `nettoMonthly > 3200` | Hypotheek | 1 | hoog netto inkomen |
| altijd | Vakantiegeld | 3 | relevant bij loon |
| altijd | Salaris vergelijken | 4 | altijd relevant |
| altijd | ZZP uurtarief | 5 | altijd relevant |

Robuuste helpers proberen meerdere keys: `netMonthly`, `nettoMonthly`, `netto`, `net`, `nettoPerMaand`.

### `src/lib/recommendations/rules/mortgage.ts`

Voor `hypotheek`.

| Conditie | Aanbeveling | Priority | Reason |
|---|---|---|---|
| `totalYearlyIncome > 60000` of `income > 60000` | ZZP | 1 | hoog inkomen |
| `partner === true` | Bruto-netto | 2 | partner inkomen |
| altijd | Toeslagen | 3 | altijd relevant |
| altijd | Salaris | 4 | altijd relevant |

### `src/lib/recommendations/rules/btw.ts`

Voor `btw`, `btw-terugrekenen`, `btw-inclusief-exclusief`.

| Aanbeveling | Priority | Reason |
|---|---|---|
| BTW terugrekenen | 1 | altijd relevant |
| BTW inclusief/exclusief | 2 | altijd relevant |
| ZZP uurtarief | 3 | altijd relevant |
| Auto importkosten | 4 | altijd relevant |

De huidige calculator wordt uitgefilterd zodat een pagina nooit naar zichzelf verwijst.

### `src/lib/recommendations/rules/zzp.ts`

Voor `zzp`.

| Conditie | Aanbeveling | Priority | Reason |
|---|---|---|---|
| `requiredHourlyRate > 75` of `hourlyRate > 75` | Hypotheek | 1 | hoog uurtarief |
| altijd | BTW Calculator | 2 | altijd relevant |
| altijd | Bruto-netto | 3 | altijd relevant |
| altijd | Toeslagen | 4 | altijd relevant |

### `src/lib/recommendations/rules/allowances.ts`

Voor `toeslagen`.

| Conditie | Aanbeveling | Priority | Reason |
|---|---|---|---|
| `totalYearlyIncome < 35000` of `income < 35000` | Bruto-netto | 1 | laag inkomen |
| altijd | Hypotheek | 2 | altijd relevant |
| altijd | ZZP uurtarief | 3 | altijd relevant |

### `src/lib/recommendations/rules/import-costs.ts`

Voor `auto-importkosten`.

| Conditie | Aanbeveling | Priority | Reason |
|---|---|---|---|
| altijd | BTW Calculator | 1 | altijd relevant |
| `totalCost > 5000` | Hypotheek / financiering | 2 | hoge aanschafkosten |
| `totalCost <= 5000` | Bruto-netto | 2 | altijd relevant |
| altijd | ZZP uurtarief | 3 | zakelijke context |
| altijd | BPM uitleg (Belastingdienst) | 4 | officiële bron |

De huidige calculator `auto-importkosten` wordt door de engine automatisch uitgefilterd. De BTW- en ZZP-recommendations houden rekening met de totale importkosten door deze als query parameter mee te geven waar logisch.

---

## Engine API

`src/lib/recommendations/engine.ts` exporteert:

```ts
export function getRecommendations(input: RecommendationInput): Recommendation[]
```

Gedrag:

- Onbekende calculator → `[]`.
- Ontbrekende `values`/`result` → altijd-rules blijven werken.
- Sorteert op `priority` oplopend.
- Dedupliceert op `id`, laagste priority wint.
- Filtert de huidige calculator eruit (`rec.id !== input.calculator`).
- Geen `throw` voor normale ontbrekende data.

---

## Uitbreiden met een nieuwe calculator

1. Maak een rule file in `src/lib/recommendations/rules/<naam>.ts`.
2. Exporteer een `RecommendationRule` functie.
3. Gebruik `findNumber`, `findBoolean` uit `../helpers` voor veilige input.
4. Registreer de rule in `src/lib/recommendations/registry.ts`.
5. Voeg tests toe in `tests/recommendations/recommendations.test.ts` of een nieuw bestand.
6. (Optioneel) Koppel `FinancialJourney` in de calculatorpagina via `recommendations={...}`.

Voorbeeld van een minimale rule:

```ts
import type { RecommendationInput, Recommendation } from "../types";

export function demoRules(input: RecommendationInput): Recommendation[] {
  return [
    { id: "bruto-netto", title: "Bruto netto", url: "/bruto-netto-2026/", description: "...", priority: 1, reason: "altijd" },
  ];
}
```

---

## Voorbeeld: gebruik in een calculatorpagina

```astro
---
import FinancialJourney from "../components/calculator/FinancialJourney.astro";
import { getRecommendations } from "../lib/recommendations/engine";

const result = calculateSomething(...);
const recommendations = getRecommendations({
  calculator: "bruto-netto",
  values: { grossSalary, pensionAmount },
  result,
});
---

<FinancialJourney recommendations={recommendations} />
```

De component blijft **backward compatible**:

```astro
<FinancialJourney steps={journeySteps} />
```

Rendervolgorde:

1. Als `recommendations` aanwezig en niet leeg → render recommendations.
2. Anders als `steps` aanwezig → render custom steps.
3. Anders → render default income-based steps.

---

## Hoe dit FinancialJourney voedt

`FinancialJourney.astro` accepteert nu een `recommendations` prop. Recommendations worden visueel identiek weergegeven als de bestaande steps, met één extra regel: de `reason` verschijnt als kleine, cursieve toelichting onder de beschrijving.

Styling:

- `.calc-financial-journey` container blijft ongewijzigd.
- `.step-label` komt overeen met `Recommendation.title`.
- `.step-desc` komt overeen met `Recommendation.description`.
- `.step-reason` toont `Recommendation.reason` (nieuw).
- Bestaande `[data-step="vakantiegeld"]` styling blijft werken.

---

## Sprint 088 integratie (uitgevoerd)

De Recommendation Engine is aangesloten op alle 8 gemigreerde calculators.

Stappen die zijn uitgevoerd:

1. **`bruto-netto-2026.astro`** — `incomeRules` via `calculator: "bruto-netto"`, waarden `grossMonthly`, `pensionAmount`, `lhk`.
2. **`salaris-calculator.astro`** — `incomeRules` via `calculator: "salaris"`, waarden `grossMonthly`, `pensionRate`, `lhk`.
3. **`hypotheek-calculator.astro`** — `mortgageRules` via `calculator: "hypotheek"`, waarden `totalYearlyIncome`, `partner`.
4. **`toeslagen-calculator.astro`** — `allowancesRules` via `calculator: "toeslagen"`, waarde `totalYearlyIncome`.
5. **`btw-calculator.astro`, `btw-terugrekenen.astro`, `btw-inclusief-exclusief.astro`** — `btwRules` met `amount`, `rate`, `direction`.
6. **`zzp-calculator.astro`** — `zzpRules` met `requiredYearlyRevenue`, `requiredHourlyRate`.
7. **Handmatige `journeySteps` arrays en statische `result-next-steps` blokken verwijderd** uit de pagina’s waar recommendations de vervolgstappen overnemen.
8. **Client-side updates** — elke pagina herberekent recommendations bij inputwijzigingen via `getRecommendations()` en `updateFinancialJourney()`.

Definition of Done Sprint 088:

- Alle 8 gemigreerde calculators gebruiken de Recommendation Engine voor hun Financial Journey.
- Geen pagina verwijst meer naar zichzelf in de vervolgstappen.
- `npm run atlas:check` slaagt.
- Geen engine, Knowledge Object, Rule Resolver of `.env` wijzigingen.

---

## Sprint 091 integratie (uitgevoerd)

`auto-importkosten` is toegevoegd aan de Recommendation Engine.

- Nieuwe rule file: `src/lib/recommendations/rules/import-costs.ts`.
- Geregistreerd als `"auto-importkosten": importCostsRules` in `src/lib/recommendations/registry.ts`.
- `src/pages/auto-importkosten-berekenen.astro` gebruikt nu `getRecommendations()` en `updateFinancialJourney()` in plaats van statische `steps`.
- Regels: BTW Calculator (altijd), Hypotheek / financiering bij `totalCost > 5000`, anders Bruto-netto 2026, ZZP uurtarief (zakelijke context), BPM uitleg via Belastingdienst.
- Tests toegevoegd in `tests/recommendations/recommendations.test.ts`.

Definition of Done Sprint 091:

- `auto-importkosten` gebruikt dynamische recommendations.
- `npm run atlas:check` slaagt.
- Geen engine, Knowledge Object, Rule Resolver of `.env` wijzigingen.

---

## Risico’s / TODO’s

- **Input normalisatie:** sommige calculators gebruiken andere key-namen (`nettoMonthly` vs `net`). De huidige helpers proberen meerdere varianten, maar langere termijn zou een `calculator → key mapping` beter zijn.
- **URL parameters:** in Sprint 088 kunnen recommendations rijkere URLs krijgen (bijv. `?bruto=...` of `?inkomen=...`). De engine houdt nu nog geen state over, dat is de verantwoordelijkheid van de caller.
- **Nieuwe calculators:** een `calculator` die niet in de registry staat, krijgt lege recommendations. De pagina valt dan terug op default steps of handmatige steps.
- **Vakantiegeld placeholder:** de `vakantiegeld` recommendation verwijst naar `#` omdat de calculator nog niet bestaat. Zodra die pagina beschikbaar is, URL aanpassen.

---

## Gerelateerde bestanden

- `src/lib/recommendations/types.ts`
- `src/lib/recommendations/helpers.ts`
- `src/lib/recommendations/engine.ts`
- `src/lib/recommendations/registry.ts`
- `src/lib/recommendations/client.ts`
- `src/lib/recommendations/rules/income.ts`
- `src/lib/recommendations/rules/btw.ts`
- `src/lib/recommendations/rules/mortgage.ts`
- `src/lib/recommendations/rules/zzp.ts`
- `src/lib/recommendations/rules/allowances.ts`
- `src/lib/recommendations/rules/import-costs.ts`
- `src/components/calculator/FinancialJourney.astro`
- `tests/recommendations/recommendations.test.ts`
