# ZZP Reverse Solver Design

> **Status:** Ontwerpdocument — Atlas v2 Sprint 029, geïmplementeerd in Sprint 030  
> **Scope:** Analyse en API-ontwerp. Implementatie in `src/lib/calculators/zzp.ts` en `tests/calculators/zzp.test.ts`.  
> **Laatst bijgewerkt:** 2026-06-30

---

## 1. Context

De `zzp-calculator.astro` pagina is de laatste calculator die nog een inline `<script>` met belastinglogica gebruikt. De andere salaris-pagina’s (`salaris-calculator.astro` en `bruto-netto-2026.astro`) zijn al gemigreerd naar `calculateNetIncomeEstimate2026()` in `src/lib/calculators/tax.ts`.

De ZZP-pagina is fundamenteel anders: in plaats van een **gegeven bruto** inkomen naar netto te rekenen, rekent de pagina **terug** van een gewenst netto inkomen naar het benodigde uurtarief. Dit vereist een **reverse solver**.

Dit document beschrijft:

- de huidige inline berekenflow;
- welke onderdelen al door de bestaande Tax Engine kunnen worden hergebruikt;
- welke onderdelen ontbreken;
- een voorgestelde engine-API in een nieuwe `zzp.ts` module;
- de reverse-solver aanpak;
- testcases, migratievolgorde en risico’s.

---

## 2. Huidige inline berekenflow

Bron: `src/pages/zzp-calculator.astro` (regels 130–176).

```text
Input:
  desiredNet        (gewenst netto per maand)
  billableDays      (declarabele dagen per jaar)
  hoursPerDay       (declarabele uren per dag)
  businessCosts     (zakelijke kosten per maand)
  pensionSavings    (pensioenopbouw per maand)
  hasZA             (zelfstandigenaftrek aan/uit)
  hasStarter        (startersaftrek aan/uit)
  hasMKB            (MKB-winstvrijstelling aan/uit)

Stap 1: jaarlijkse getallen
  hours          = billableDays * hoursPerDay
  yearlyCosts    = businessCosts * 12
  yearlyPension  = pensionSavings * 12
  yearlyNet      = desiredNet * 12
  zaAmount       = hasZA ? 1200 : 0
  starterAmount  = hasStarter ? 2123 : 0
  totalAftrek    = zaAmount + starterAmount

Stap 2: iteratief zoeken naar revenue
  revenue = 0
  herhaal maximaal 30 keer:
    taxable = revenue - yearlyCosts
    if hasMKB && taxable > totalAftrek:
      taxable = (taxable - totalAftrek) * (1 - 0.127) + totalAftrek
    taxable = taxable - totalAftrek

    tax       = calcTax(max(0, taxable))
    ahk       = calcAHK(max(0, taxable))
    ak        = calcAK(max(0, taxable))
    totalTax  = max(0, tax - ahk - ak)
    resultNet = revenue - yearlyCosts - totalTax

    if |resultNet - yearlyPension - yearlyNet| < 10:
      break
    revenue += (yearlyNet - (resultNet - yearlyPension)) * 0.7

Stap 3: output
  hourlyRate = revenue / hours
  toon details: omzet, kosten, pensioen, aftrekposten, nettowinst, belasting
```

### 2.1 Lokale belastingfuncties in de pagina

De pagina bevat drie lokale functies die identiek zijn aan de huidige Tax Engine:

| Functie | Inline pagina | Tax Engine |
|---|---|---|
| `calcTax(income)` | regels 112–116 | `calculateBox1Tax2026()` |
| `calcAHK(income)` | regels 117–121 | `calculateGeneralTaxCredit2026()` |
| `calcAK(income)` | regels 122–128 | `calculateLabourTaxCredit2026()` |

De gebruikte drempels en percentages (35,75% / 37,56% / 49,50%, AHK €3.115, AK t/m €132.920) komen overeen met `src/lib/utils/constants.ts` en met de huidige Tax Engine.

---

## 3. Inputs en outputs

### 3.1 Huidige pagina-inputs

| Input | ID | Type | Default | Eenheid |
|---|---|---|---|---|
| Gewenst netto inkomen per maand | `desiredNet` | number | 4000 | EUR / maand |
| Declarabele dagen per jaar | `billableDays` | number | 210 | dagen |
| Declarabele uren per dag | `hoursPerDay` | number | 8 | uren |
| Zakelijke kosten per maand | `businessCosts` | number | 300 | EUR / maand |
| Pensioenopbouw per maand | `pensionSavings` | number | 500 | EUR / maand |
| Zelfstandigenaftrek | `zzpDeduction` | checkbox | true | boolean |
| Startersaftrek | `starterDeduction` | checkbox | false | boolean |
| MKB-winstvrijstelling | `mkbDeduction` | checkbox | true | boolean |

### 3.2 Huidige pagina-outputs

| Output | ID | Eenheid |
|---|---|---|
| Benodigd uurtarief | `resultHourlyRate` | EUR / uur |
| Benodigde jaaromzet (excl. BTW) | `detailRevenue` | EUR / jaar |
| Zakelijke kosten per jaar | `detailCost` | EUR / jaar |
| Pensioenopbouw per jaar | `detailPension` | EUR / jaar |
| Aftrekposten | `detailDeduction` | EUR / jaar |
| Nettowinst (indicatie) | `detailNet` | EUR / jaar |
| Inkomstenbelasting (indicatie) | `detailTax` | EUR / jaar |

Belangrijk semantisch detail: de pagina toont `detailNet` als **nettowinst vóór pensioenopbouw** (`resultNet = revenue - yearlyCosts - totalTax`). Het gewenste netto inkomen is daarentegen **na pensioenopbouw** (`resultNet - yearlyPension`).

---

## 4. Overlap met de bestaande Tax Engine

### 4.1 Wat hergebruikt kan worden

De volgende functies uit `src/lib/calculators/tax.ts` kunnen **direct** worden geïmporteerd en hergebruikt:

- `calculateBox1Tax2026(taxableIncome)`
- `calculateGeneralTaxCredit2026(taxableIncome)`
- `calculateLabourTaxCredit2026(taxableIncome)`

Deze functies zijn puur, hebben geen DOM-afhankelijkheid en gebruiken dezelfde 2026 drempels als de ZZP-pagina.

### 4.2 Wat niet hergebruikt kan worden

`calculateNetIncomeEstimate2026(input)` uit `tax.ts` is **niet geschikt** voor ZZP, om drie redenen:

1. **Vakantiegeld:** de functie rekent met `grossYearly = grossMonthlySalary * 12.96` (inclusief 8% vakantiegeld). ZZP-freelancers hebben in deze calculator geen vakantiegeld-component.
2. **Pensioen:** de functie trekt pensioen **af van het belastbaar inkomen** (`taxableIncome = grossYearly - pensionAmount`). In de ZZP-pagina is pensioen een **post-tax spaardoel**; het beïnvloedt het te bereiken netto, maar niet direct de belastinggrondslag.
3. **Ondernemersaftrek / MKB-vrijstelling:** de Tax Engine kent geen ZZP-specifieke aftrekposten.

Conclusie: we hebben een **nieuwe module** `src/lib/calculators/zzp.ts` nodig die de pure tax-functies importeert, maar zelf de ZZP-specifieke flow beheert.

---

## 5. Gaps in de huidige Tax Engine

| Gap | Impact | Oplossing in ontwerp |
|---|---|---|
| Geen ZZP-revenue als grondslag | `tax.ts` werkt met maandsalaris + vakantiegeld | Nieuwe `zzp.ts` module gebruikt jaaromzet als input |
| Geen ondernemersaftrek | ZZP heeft ZA (€1.200) en startersaftrek (€2.123) | Hardcoded constants in `zzp.ts` of nieuwe knowledge objecten |
| Geen MKB-winstvrijstelling | ZZP heeft 12,70% vrijstelling | Aparte helper in `zzp.ts` |
| Geen reverse solver | ZZP rekent van netto → uurtarief | `solveRequiredRevenue()` in `zzp.ts` |
| Pensioen als post-tax doel | `tax.ts` behandelt pensioen als pre-tax | `zzp.ts` trekt pensioen pas na belasting af |

Deze sprint ontwerpt de oplossing; het implementeren is voorbehouden aan Sprint 030.

---

## 6. Voorgestelde engine API

### 6.1 Nieuwe module

`src/lib/calculators/zzp.ts`

Deze module importeert alleen de pure tax-functies uit `tax.ts` en de fallback-constants uit `constants.ts`. De Tax Engine zelf wordt **niet** gewijzigd.

### 6.2 Types

```ts
export interface ZzpInput {
  /** Gewenst netto inkomen per maand (na pensioenopbouw). */
  desiredNetMonthly: number;
  /** Declarabele dagen per jaar. */
  billableDaysPerYear: number;
  /** Declarabele uren per dag. */
  hoursPerDay: number;
  /** Zakelijke kosten per maand. */
  businessCostsMonthly: number;
  /** Pensioenopbouw per maand (post-tax spaardoel). */
  pensionSavingsMonthly: number;
  /** Zelfstandigenaftrek (€1.200) toepassen? */
  applySelfEmployedDeduction: boolean;
  /** Startersaftrek (€2.123) toepassen? */
  applyStarterDeduction: boolean;
  /** MKB-winstvrijstelling (12,70%) toepassen? */
  applyMkbExemption: boolean;
}

export interface ZzpDeductions {
  selfEmployedAmount: number;
  starterAmount: number;
  totalEntrepreneurDeductions: number;
  mkbRate: number;
}

export interface ZzpResult {
  valid: boolean;
  error?: string;
  /** Benodigd uurtarief exclusief BTW. */
  requiredHourlyRate: number;
  /** Benodigde jaaromzet exclusief BTW. */
  requiredYearlyRevenue: number;
  /** Totaal aantal declarabele uren per jaar. */
  totalBillableHours: number;
  yearlyCosts: number;
  yearlyPension: number;
  totalEntrepreneurDeductions: number;
  mkbExemptionAmount: number;
  taxableIncome: number;
  incomeTax: number;
  generalTaxCredit: number;
  labourTaxCredit: number;
  totalTaxDue: number;
  /** Nettowinst vóór pensioenopbouw (zoals de pagina toont). */
  netProfit: number;
  /** Netto inkomen na pensioenopbouw (doel van de gebruiker). */
  netAfterPension: number;
  iterations: number;
}

export interface ZzpReverseOptions {
  /** Jaar van de regels (nu altijd 2026). */
  year: number;
  /** Maximaal aantal iteraties voor de reverse solver. */
  maxIterations: number;
  /** Convergentie-criterium in EUR. */
  tolerance: number;
  /** Bovenste grens voor jaaromzet bij binaire zoektocht. */
  maxRevenue: number;
}
```

### 6.3 Functies

```ts
/** Bepaal de ZZP-aftrekposten op basis van de gebruikersinput. */
function calculateZzpDeductions(input: ZzpInput): ZzpDeductions;

/** Pas MKB-winstvrijstelling en ondernemersaftrek toe op de winst. */
function calculateZzpTaxableIncome(
  revenue: number,
  yearlyCosts: number,
  deductions: ZzpDeductions,
): number;

/** Bereken belasting, heffingskorting en uiteindelijke belastinglast. */
function calculateZzpTax(taxableIncome: number): {
  incomeTax: number;
  generalTaxCredit: number;
  labourTaxCredit: number;
  totalTaxDue: number;
};

/** Bereken nettowinst vóór pensioen bij een gegeven jaaromzet. */
function calculateZzpNetProfit(
  revenue: number,
  yearlyCosts: number,
  deductions: ZzpDeductions,
): { netProfit: number; taxableIncome: number; totalTaxDue: number };

/** Zoek de jaaromzet die leidt tot het gewenste netto-inkomen na pensioen. */
function solveRequiredRevenue(
  desiredNetYearly: number,
  yearlyCosts: number,
  yearlyPension: number,
  deductions: ZzpDeductions,
  options: ZzpReverseOptions,
): { revenue: number; iterations: number; converged: boolean };

/** Hoofdfunctie: van input naar uurtarief + details. */
export function calculateZzpReverse(
  input: ZzpInput,
  options?: Partial<ZzpReverseOptions>,
): ZzpResult;
```

---

## 7. Reverse solver aanpak

### 7.1 Probleem

We zoeken een jaaromzet `R` waarvoor geldt:

```
netAfterPension(R) = desiredNetYearly
```

waarbij:

```
profit(R)        = R - yearlyCosts
taxableIncome(R) = f(profit(R), deductions)
taxDue(R)        = calcTax(taxableIncome) - calcAHK(taxableIncome) - calcAK(taxableIncome)
netProfit(R)     = R - yearlyCosts - taxDue(R)
netAfterPension  = netProfit(R) - yearlyPension
```

`netAfterPension(R)` is monotoon stijgend in `R` (hogere omzet leidt altijd tot hoger netto, ook al neemt de marginale belastingdruk toe). Daarom is een binaire zoektocht veilig en robuust.

### 7.2 Voorgestelde implementatie

1. **Validatie:** controleer `desiredNetMonthly >= 0`, `billableDays > 0`, `hoursPerDay > 0`, `businessCosts >= 0`, `pensionSavings >= 0`.
2. **Initiële grenzen:**
   - `low = 0`
   - `high = (desiredNetYearly + yearlyCosts + yearlyPension) * 3` (ruime bovengrens; in de praktijk zal de oplossing veel lager liggen).
3. **Binaire zoektocht:** herhaal tot `high - low < tolerance` of `maxIterations` bereikt:
   - `mid = (low + high) / 2`
   - `netAfterPension = calculateZzpNetProfit(mid) - yearlyPension`
   - als `netAfterPension < desiredNetYearly`: `low = mid`
   - anders: `high = mid`
4. **Resultaat:** `revenue = (low + high) / 2`.

### 7.3 Vergelijking met huidige pagina

De huidige pagina gebruikt een **Newton-achtige** update met dempingsfactor `0.7` en een vaste `30` iteraties. Dit werkt voor de meeste default inputs, maar is minder voorspelbaar voor extreme waarden. Binaire zoektocht is:

- deterministisch;
- gegarandeerd convergent (zolang de functie monotoon is);
- eenvoudiger te testen op convergentie;
- makkelijker aan te passen naar een strakkere `tolerance` (bijv. €1 i.p.v. €10).

Voor backward compatibility kunnen we de tolerance op €10 houden (zoals de huidige pagina). Voor tests gebruiken we €1 om afrondingsverschillen te minimaliseren.

---

## 8. Testcases

### 8.1 Regressietests (huidige default input)

| Input | Waarde |
|---|---|
| desiredNetMonthly | 4000 |
| billableDaysPerYear | 210 |
| hoursPerDay | 8 |
| businessCostsMonthly | 300 |
| pensionSavingsMonthly | 500 |
| applySelfEmployedDeduction | true |
| applyStarterDeduction | false |
| applyMkbExemption | true |

**Verwacht (huidige inline output):**

- `requiredHourlyRate` ≈ €72 (afhankelijk van precieze afronding en convergentie)
- `requiredYearlyRevenue` ≈ €120.960
- `taxableIncome` ≈ €85.000 – €90.000
- `totalTaxDue` positief
- `netAfterPension` ≈ €48.000

Exacte verwachte waarden moeten worden vastgelegd na de eerste implementatie-run door de huidige inline script-output te loggen.

### 8.2 Varianten

1. **Met startersaftrek:** zelfde input, maar `applyStarterDeduction = true` → uurtarief lager.
2. **Zonder MKB:** `applyMkbExemption = false` → uurtarief hoger.
3. **Zonder ZA en starter:** beide aftrekposten uit → uurtarief hoger.
4. **Geen pensioen:** `pensionSavingsMonthly = 0` → uurtarief lager.
5. **Hoge kosten:** `businessCostsMonthly = 2000` → uurtarief hoger.
6. **Invalid input:** `billableDaysPerYear = 0` → `valid: false` met foutmelding.
7. **Extreem laag gewenst netto:** `desiredNetMonthly = 100` → kleine revenue, lage belasting.
8. **Extreem hoog gewenst netto:** `desiredNetMonthly = 15000` → solver moet convergeren tot een hoog uurtarief.

### 8.3 Vergelijking met inline script

Na implementatie moeten de unit-tests voor minimaal 3 representatieve inputs dezelfde resultaten geven als de huidige inline script (met een tolerantie van maximaal €1).

---

## 9. Migratievolgorde

| Sprint | Taak | Wijzigt pagina? |
|---|---|---|
| **Sprint 030** | Implementeer `src/lib/calculators/zzp.ts` + uitgebreide tests. | Nee |
| **Sprint 031** | Verwijder inline script uit `zzp-calculator.astro`; roep `calculateZzpReverse()` aan en vull dezelfde outputvelden. | Ja |
| **Sprint 032** | Validatie op productie-achtige data; verwijder eventuele rollback/fallback code. | Ja |

Tussenstap: in Sprint 031 kan de pagina tijdelijk **zowel** de nieuwe engine **als** het inline script bevatten, waarbij het inline script wordt vervangen zodra de outputvelden identiek zijn. Dit is een conservatief rollbackplan.

---

## 10. Rollback plan

1. De nieuwe `zzp.ts` module is **additief**; bestaande pagina’s en engines worden niet aangeraakt.
2. Tijdens de pagina-migratie (Sprint 031) blijft het originele inline script in een comment-block of aparte functie beschikbaar.
3. Als de nieuwe output afwijikt, kan de pagina binnen één commit terug naar het inline script.
4. Na 2 weken productiestabiliteit (of na succesvolle tests) wordt het inline script definitief verwijderd.

---

## 11. Risico’s

| Risico | Kans | Impact | Mitigatie |
|---|---|---|---|
| **Semantisch verschil met `tax.ts`** — een toekomstige ontwikkelaar probeert `calculateNetIncomeEstimate2026()` voor ZZP te gebruiken. | Medium | Hoog | Duidelijke documentatie en types; ZZP module heeft eigen entry point. |
| **Iteratieve solver convergeert niet** voor extreme inputs. | Laag | Medium | Gebruik binaire zoektocht in plaats van Newton-achtige update. |
| **Afrondingsverschillen** tussen inline script en engine. | Medium | Laag | Tolerance in tests; formatter in pagina rondt toch af op hele euro’s. |
| **Belastingregels wijzigen** in 2027. | Laag | Medium | Tax Engine en ZZP module gebruiken dezelfde Rule Resolver; aanpassingen op één plek. |
| **Ondernemersaftrek- en MKB-waarden** zijn nu hardcoded in de pagina. | Medium | Medium | Documenteren als technische schuld; op termijn naar Knowledge Layer verplaatsen. |
| **Pensioen wordt niet van belastbaar inkomen afgetrokken** in ZZP, terwijl dit in loondienst wel gebeurt. | Laag | Medium | Duidelijk vermelden in UI/FAQ; dit is de huidige pagina-logica en blijft zo. |
| **Geen bronvalidatie** voor de ZZP-specifieke constanten (€1.200, €2.123, 12,70%). | Medium | Laag | Behouden uit huidige pagina; geen externe fiscale wijzigingen in deze sprint. |

---

## 12. Advies voor Sprint 030

Implementeer `src/lib/calculators/zzp.ts` met de bovenstaande API:

- Importeer `calculateBox1Tax2026`, `calculateGeneralTaxCredit2026` en `calculateLabourTaxCredit2026` uit `tax.ts`.
- Voeg de ZZP-specifieke aftrekposten en MKB-winstvrijstelling toe als hardcoded 2026 constants.
- Implementeer `calculateZzpReverse()` met een binaire reverse solver.
- Schrijf regressietests die de huidige inline output van `zzp-calculator.astro` reproduceren.
- Pas **nog geen** wijzigingen toe aan `src/pages/zzp-calculator.astro` of `src/lib/calculators/tax.ts`.

Wachten op Atlas v2 Sprint 030.
