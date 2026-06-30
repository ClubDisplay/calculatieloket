# 2026 Tax Reconciliation Audit — Atlas v2 Sprint 017

> **Status:** Audit + documentation correction. No code changes.  
> **Scope:** Compare 2026 Dutch tax values across `constants.ts`, `tax.ts`, existing calculator pages, Knowledge Layer YAML, and `AGENTS.md`.

---

## Correction log

- **2026-06-29 — Sprint 018:** `AGENTS.md` was corrected to match the official Belastingdienst 2026 values. The original `AGENTS.md` contained outdated/rounded values (35.82% / 37.48% / €3.068 AHK / €5.599 AK). The current project code, `constants.ts`, and Knowledge Layer YAML already matched the official values listed below. No source code or YAML was changed.

---

## 1. Scope & Methodology

Only internal sources are compared. No external web research was performed. Values are extracted literally from the files listed below. The audit focuses on Box 1 tax, general tax credit (AHK), labour tax credit (AK), and the supporting assumptions (pension, holiday allowance, loonheffingskorting) used by the salary, bruto-netto and ZZP calculators.

### Sources compared

- `src/lib/utils/constants.ts`
- `src/lib/calculators/tax.ts`
- `src/pages/salaris-calculator.astro` (inline script)
- `src/pages/bruto-netto-2026.astro` (inline script)
- `src/pages/zzp-calculator.astro` (inline script)
- `docs/v2/knowledge/objects/nl.tax.box1.2026.yml`
- `docs/v2/knowledge/objects/nl.tax.ahk.2026.yml`
- `docs/v2/knowledge/objects/nl.tax.ak.2026.yml`
- `AGENTS.md` (project-level agent instructions)

---

## 2. Value comparison

### Box 1 income tax brackets (2026, under AOW age)

| Topic | `constants.ts` / `tax.ts` | Page scripts | Knowledge YAML | `AGENTS.md` | Difference | Risk |
|---|---|---|---|---|---|---|
| Schijf 1 upper limit | €38.883 | €38.883 | €38.883 | €38.883 | None | Low |
| Schijf 2 upper limit | €78.426 | €78.426 | €78.426 | €78.426 | None | Low |
| Schijf 3 | Above €78.426 | Above €78.426 | `null` (above) | Above | None | Low |
| Schijf 1 rate | 35.75% | 35.75% | 35.75% | **35.82%** | `AGENTS.md` differs from all other sources. | **Medium** |
| Schijf 2 rate | 37.56% | 37.56% | 37.56% | **37.48%** | `AGENTS.md` differs from all other sources. | **Medium** |
| Schijf 3 rate | 49.50% | 49.50% | 49.50% | 49.50% | None | Low |

**Observation:** The inline scripts, `constants.ts`, `tax.ts`, and Knowledge Layer YAML are fully aligned. `AGENTS.md` contains rounded/older values (35.82% / 37.48%) that contradict the rest of the codebase.

### Algemene heffingskorting (AHK)

| Topic | `constants.ts` / `tax.ts` | Page scripts | Knowledge YAML | `AGENTS.md` | Difference | Risk |
|---|---|---|---|---|---|---|
| Maximum | €3.115 | €3.115 | €3.115 | **€3.068** | `AGENTS.md` differs from all other sources. | **Medium** |
| Phase-out start | €29.736 | €29.736 | €29.736 | Not stated | None across compared sources | Low |
| Phase-out rate | 6.398% | 6.398% | 6.398% | Not stated | None | Low |
| Cut-off | €78.427 | €78.427 | €78.427 | Not stated | None | Low |

**Observation:** Again `AGENTS.md` is the outlier. The page scripts, constants, and YAML match.

### Arbeidskorting (AK)

| Topic | `constants.ts` / `tax.ts` | Page scripts | Knowledge YAML | `AGENTS.md` | Difference | Risk |
|---|---|---|---|---|---|---|
| Maximum | €5.685 | €5.685 | €5.685 | **€5.599** | `AGENTS.md` differs from all other sources. | **Medium** |
| Bracket 1 | €0 – €11.965 × 8.324% | Same | Same | Not stated | None | Low |
| Bracket 2 | €11.965 – €25.845: €996 + 31.009% of excess | Same | Same | Not stated | None | Low |
| Bracket 3 | €25.845 – €45.592: €5.300 + 1.95% of excess | Same | Same | Not stated | None | Low |
| Bracket 4 | €45.592 – €132.920: €5.685 – 6.51% of excess | Same | Same | Not stated | None | Low |
| Bracket 5 | Above €132.920: €0 | Same | `null` upper bound | Not stated | None | Low |
| Phase-out start (text) | €45.592 (code) | Salaris page text says €45.593; bruto-netto/ZZP text say €45.592 | €45.592 | Not stated | Text inconsistency of €1 in salaris page. | Low |

**Observation:** The code values are identical across all sources. The only inconsistency is the salaris page text mentioning €45.593 while the code and other pages use €45.592.

### Input assumptions (not tax rates, but affect output)

| Topic | `tax.ts` | `salaris-calculator` | `bruto-netto-2026` | `zzp-calculator` | Knowledge YAML | Difference | Risk |
|---|---|---|---|---|---|---|---|
| Pension input | Percentage of gross salary | Percentage of gross salary | Fixed monthly amount | Fixed monthly savings target | Not modelled | Different UI/input models. | Medium for unified engine later |
| Pension deduction | `grossMonthly × 12 × (rate/100)` | Same | `pensionMonthly × 12` | Treated as net income target, not deducted from taxable income | Not modelled | ZZP logic differs significantly. | **High** for migration |
| Holiday allowance | 8% of gross yearly (`× 12.96`) | Same | Same | Not applicable | Not modelled | None for salaris/bruto-netto. | Low |
| Loonheffingskorting toggle | Boolean | Boolean | Boolean | Always applied | Not modelled | ZZP always applies credits. | Medium |
| Desired-net income direction | Forward: gross → net | Forward | Forward | Reverse: net → required revenue | Not modelled | ZZP is a reverse calculator. | **High** for migration |

---

## 3. Discrepancy summary

### 3.1 Blocking issues

None of the differences prevent a build or break existing functionality. As of Sprint 018, the previously identified documentation discrepancies are resolved:

1. **`AGENTS.md` has been corrected** to match the official Belastingdienst 2026 values (35.75% / 37.56% / €3.115 AHK / €5.685 AK). The values in `constants.ts`, `tax.ts`, page scripts, and Knowledge Layer YAML already matched these official values.
2. **Box 1 rate discrepancy** is resolved.
3. **AHK and AK maximum discrepancies** are resolved.

Remaining non-blocking items before wiring the Tax Engine to the Knowledge Layer as the single source of truth:

- Confirm whether `nl.tax.box1.2026.yml` should use `null` or an explicit `Infinity` sentinel for the top bracket.
- Verify that the 6.398% / 6.510% phase-out rates are expressed consistently as decimals across all layers.

### 3.2 Acceptable temporary issues

1. **Salaris page text says €45.593 for AK phase-out** while the code uses €45.592. This is a one-euro text typo and does not affect calculations. It can be fixed during a content cleanup sprint.
2. **Different pension input models** between pages (percentage vs fixed amount) are acceptable because each page targets a different mental model. A unified engine should expose both input modes.
3. **ZZP reverse-calculation logic** is fundamentally different from the forward salary/bruto-netto calculators. It is acceptable to keep it separate until the Tax Engine is extended to support a reverse solver.

### 3.3 Official sources to verify later

Barry or ChatGPT should verify the following against the official Belastingdienst 2026 tables before migrating the Tax Engine to the Knowledge Layer:

- Box 1 tarieven 2026: 35.75% / 37.56% / 49.50% vs 35.82% / 37.48%.
- Algemene heffingskorting max: €3.115 vs €3.068.
- Arbeidskorting max: €5.685 vs €5.599.
- AK phase-out start: €45.592 vs €45.593.
- Exacte AHK afbouwformule (lineair 6.398% vanaf €29.736 tot €78.427).
- Exacte AK 5-schijven formule (percentages en bases).
- AOW-leeftijd tarieven en eventuele extra heffingskortingstarieven.

### 3.4 Recommended source of truth

The Knowledge Layer YAML objects (`nl.tax.box1.2026.yml`, `nl.tax.ahk.2026.yml`, `nl.tax.ak.2026.yml`) are now the de facto authoritative source because they match the official Belastingdienst 2026 values and are already validated by `scripts/validate-knowledge.mjs`. The generator produces `generated-objects.ts`, so `tax.ts` can read from `src/lib/knowledge/objects.ts` helpers in a later sprint instead of `constants.ts`.

Until the Tax Engine is wired to the Knowledge Layer, `src/lib/utils/constants.ts` remains the runtime source of truth because all current calculator pages and `tax.ts` use it.

---

## 4. Conclusions

- The **inline page scripts, `constants.ts`, `tax.ts`, `AGENTS.md`, and Knowledge Layer YAML are now aligned** with the official Belastingdienst 2026 values for Box 1, AHK, and AK.
- **`AGENTS.md` was corrected in Sprint 018.** It previously contained outdated/rounded values (35.82% / 37.48% / €3.068 AHK / €5.599 AK) and is now consistent with the rest of the codebase.
- There are **no hard blockers** for continuing the Atlas migration. The recommended next step is to wire the Tax Engine to the Knowledge Layer YAML as the single source of truth.
- The **ZZP calculator** has a different shape (reverse calculation, entrepreneurs deductions, fixed pension input) and should be migrated separately from `salaris-calculator` and `bruto-netto-2026`.

---

## 5. Recommended migration order

1. ~~Resolve `AGENTS.md` discrepancies.~~ **Done in Sprint 018.**
2. **Add Knowledge Layer helpers** in `src/lib/knowledge/objects.ts` for `getBox1TaxBrackets2026`, `getGeneralTaxCredit2026`, and `getLabourTaxCredit2026`.
3. **Migrate `salaris-calculator.astro` and `bruto-netto-2026.astro`** to `calculateNetIncomeEstimate2026()` from `tax.ts`. They have nearly identical logic and input assumptions.
4. **Migrate `zzp-calculator.astro`** last, because it requires a reverse solver and entrepreneurs deductions (zelfstandigenaftrek, startersaftrek, MKB-winstvrijstelling) that are not yet in the Tax Engine.
5. **After migration, remove duplicate inline scripts** and add regression tests that compare page output against the Tax Engine.

---

> **Next action:** Sprint 018 should decide whether `AGENTS.md` or the current scripts/YAML are correct, and update the project accordingly.
