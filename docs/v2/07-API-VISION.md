# 07 — API Vision

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Schets de visie op een publieke en interne API voor Atlas v2. De API maakt het mogelijk om calculators te benaderen vanuit websites, apps, widgets en partnerintegraties.

---

## API-lagen

| Laag | Doel | Voorbeeld |
|---|---|---|
| **Internal API** | Tussen Atlas-modules | `calculationEngine.calculate(input)` |
| **Runtime API** | Client-side in browser | `atlas.runCalculator(id, inputs)` |
| **Partner API** | Externe toegang | `POST /api/v1/calculate` |
| **Admin API** | Beheer van definities | `GET /admin/v1/calculators` |

---

## Interne API (TypeScript)

Modules communiceren via functies en interfaces:

```ts
import { calculateBtw } from "@atlas/engine/calculators/btw";

const result = calculateBtw({
  amount: 100,
  rate: 21,
  direction: "exclusive_to_inclusive",
});
```

---

## Runtime API (browser)

Een lightweight client-side bibliotheek voor embedden in pagina's:

```ts
import { Atlas } from "@atlas/runtime";

const atlas = new Atlas({ locale: "nl-NL", product: "calculatieloket.nl" });
const result = await atlas.calculate("btw-calculator", {
  amount: 121,
  btwRate: 21,
  direction: "inclusive_to_exclusive",
});
```

---

## Partner API (REST/JSON)

### Calculator berekenen

```http
POST /api/v1/calculate
Content-Type: application/json
X-Atlas-Product: calculatieloket.nl
X-Atlas-Locale: nl-NL

{
  "calculator": "btw-calculator",
  "inputs": {
    "amount": 100,
    "btwRate": 21,
    "direction": "exclusive_to_inclusive"
  }
}
```

### Response

```json
{
  "valid": true,
  "calculator": "btw-calculator",
  "locale": "nl-NL",
  "inputs": {
    "amount": 100,
    "btwRate": 21,
    "direction": "exclusive_to_inclusive"
  },
  "outputs": {
    "amountExcl": 100,
    "btwAmount": 21,
    "amountIncl": 121
  },
  "disclaimer": "Deze berekening is een indicatie."
}
```

### Calculator definitie ophalen

```http
GET /api/v1/calculators/{id}?locale=nl-NL
```

Response bevat: inputs, outputs, rules, FAQ, sources, SEO metadata.

---

## Rate limiting en authenticatie

| Toepassing | Authentictie | Rate limit |
|---|---|---|
| Interne API | geen | n.v.t. |
| Runtime API | geen / product key | fair use |
| Partner API | API key | per partner afgesproken |
| Admin API | OAuth2 / API key | strikt |

---

## Privacy en beveiliging

- **Geen persoonsgegevens** in API-requests.
- **Geen opslag** van invoerwaarden zonder expliciete opt-in.
- **CORS** strikt geconfigureerd per partner.
- **Inputvalidatie** aan de serverkant (naast client-side).

---

## Faseplanning

| Fase | API-onderdeel |
|---|---|
| v2 Sprint 001–003 | Interne API (verdere uitwerking). |
| v2 Sprint 004–005 | Runtime API prototype. |
| v2 Sprint 006–008 | Partner API design en MVP. |
| v2 Sprint 009+ | Admin API en documentatie. |

---

## Relatie met v1

In v1 zijn alle berekeningen client-side. Er is nog geen server-side API. De Partner API wordt pas gebouwd nadat de Calculation Engine en Rule Engine volledig zijn uitgewerkt.
