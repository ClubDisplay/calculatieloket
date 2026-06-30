# 10 — Changelog

> **Doel:** Geconsolideerd changelog van alle releases. Dit is een synchrone kopie van `05_changelog.md` in de project-root.  
> **Laatst bijgewerkt:** 2026-06-30

---

## Inhoudsopgave

1. [2026-06-30](#2026-06-30)
2. [2026-06-30](#2026-06-30)
3. [2026-06-30](#2026-06-30)
4. [2026-06-30](#2026-06-30)
5. [2026-06-30](#2026-06-30)
6. [2026-06-30](#2026-06-30)
7. [2026-06-30](#2026-06-30)
8. [2026-06-30](#2026-06-30)
9. [2026-06-30](#2026-06-30)
10. [2026-06-30](#2026-06-30)
11. [2026-06-30](#2026-06-30)
12. [2026-06-30](#2026-06-30)
13. [2026-06-30](#2026-06-30)
14. [2026-06-29](#2026-06-29)
15. [2026-06-27](#2026-06-27)
16. [2026-06-26](#2026-06-26)

17. [2026-06-30](#2026-06-30)
18. [2026-06-30](#2026-06-30)
19. [2026-06-30](#2026-06-30)

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — GitHub Activation Runbook + CI docs index
**Details:** Nieuwe documentatie `docs/v2/ci/03-GITHUB-ACTIVATION-RUNBOOK.md` aangemaakt. Bevat een stap-voor-stap runbook met exacte terminalcommando's om de lokale Atlas repository veilig naar GitHub te pushen en Atlas CI live te activeren: pre-push checklist, `git init`, `git status`, `git check-ignore .env`, `git add`, eerste commit, lege GitHub repo aanmaken, remote toevoegen, push naar `main`, post-push checklist (Actions tab, artifact download, branch protection), test PR maken en troubleshooting voor `npm ci` falen, `atlas:check` falen, workflow niet zichtbaar, branch protection status check naam niet gevonden, `.env` per ongeluk gecommit en push conflicts. Ook `docs/v2/ci/README.md` aangemaakt als index voor de vier CI-handleidingen. Bestaande CI-docs (`00-GITHUB-READINESS.md`, `01-BRANCH-PROTECTION.md`, `02-ACTIONS-RUNBOOK.md`) bijgewerkt met verwijzingen naar het nieuwe runbook en de index. `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt: status headers Sprint 075 en verwijzingen naar `docs/v2/ci/README.md` en `03-GITHUB-ACTIVATION-RUNBOOK.md`. Geen code gewijzigd; geen websitepagina's, calculatorpagina's, Knowledge Objects, UI/SEO-content, runtime code, engines, Rule Resolver, `.env`, deploy, secrets of dependencies aangeraakt. `npm run atlas:check` uitgevoerd; alle zeven stappen slagen in `3.69s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Draft Spanish Income Tax Object 2026
**Details:** Nieuw Knowledge Object `docs/v2/knowledge/objects/es.tax.income.2026.yml` aangemaakt met `status: draft`, `type: tax_bracket`, `country: ES`, `locale: es-ES`. Bronnen: Agencia Tributaria — IRPF, `https://sede.agenciatributaria.gob.es/Sede/irpf.html`, en BOE — Ley 35/2006 del Impuesto sobre la Renta de las Personas Físicas, `https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764`. Toelichting: de officiële Spaanse IRPF-schaal voor het belastingjaar 2026 (inkomsten 2026) is op 30 juni 2026 nog niet gepubliceerd op de Sede electrónica van de Agencia Tributaria; de huidige campagne “Renta 2025” betreft inkomsten 2025. Het object bevat daarom lege `data.brackets` en een note in `es-ES`, `en-US` en `nl-BE` die aangeeft dat het pas naar `active` wordt gezet zodra de Agencia Tributaria / Ley de Presupuestos de 2026 de schaal publiceert. Data: `year: 2026`, `currency: EUR`, `applies_to: individual`, `brackets: []`. `src/lib/knowledge/generated-objects.ts` opnieuw gegenereerd via `npm run generate:knowledge`; registry telt nu 25 objecten. `npm run validate:knowledge` rapporteert 0 fouten en 2 verwachte waarschuwingen (lege brackets voor `es.tax.income.2026` en `fr.tax.income.2026`, beide draft). Geen wijzigingen aan websitepagina’s, calculatorpagina’s, calculator engines, UI, SEO-content, runtime code, Rule Resolver, `scripts/qa-rule-resolver.mjs`, andere Knowledge Objects, `.env` of dependencies. `docs/v2/knowledge/README.md`, `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt: status headers Sprint 074, Spaanse object in objectlijst, roadmap items en notities over beide draft-objecten. Alle opdracht-gegeven commando’s uitgevoerd: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run build`, `npm run atlas:check`; alles slaagt. `npm run validate:knowledge` rapporteert 0 fouten en 2 waarschuwingen. `npm run test` rapporteert 185 passed tests. `npm run qa:rules` rapporteert 16 lookups, 0 failures, 1 verwachte `notFoundLookups` (NL VAT bad version), 5 `fallbackLocaleHits`. `npm run atlas:check` eindigt met `✅ All Atlas CI checks passed in 3.07s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Draft French Income Tax Object 2026
**Details:** Nieuw Knowledge Object `docs/v2/knowledge/objects/fr.tax.income.2026.yml` aangemaakt met `status: draft`, `type: tax_bracket`, `country: FR`, `locale: fr-FR`. Bron: Service Public / DILA, `https://www.service-public.fr/particuliers/vosdroits/F1419`. Toelichting: de Franse "barème 2026" op die pagina is van toepassing op inkomsten 2025 (aanslag 2026); de officiële tarieven voor inkomsten 2026 (aanslag 2027) zijn op 30 juni 2026 nog niet gepubliceerd. Het object bevat daarom lege `data.brackets` en een duidelijke note in `fr-FR`, `en-US` en `nl-BE` dat het pas naar `active` wordt gezet zodra de loi de finances pour 2027 de schijven publiceert. Data: `year: 2026`, `assessment_year: 2027`, `currency: EUR`, `applies_to: individual`, `brackets: []`. `src/lib/knowledge/generated-objects.ts` opnieuw gegenereerd via `npm run generate:knowledge`; registry telt nu 24 objecten. `npm run validate:knowledge` rapporteert 0 fouten en 1 verwachte waarschuwing (`tax_bracket.data.brackets is leeg; object is draft, dus toegestaan pending review`). Geen wijzigingen aan websitepagina’s, calculatorpagina’s, calculator engines, UI, SEO-content, runtime code, Rule Resolver, `scripts/qa-rule-resolver.mjs`, andere Knowledge Objects, `.env` of dependencies. `docs/v2/knowledge/README.md`, `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt: status headers Sprint 073, Franse object in objectlijst, roadmap item en notitie over draft. Alle opdracht-gegeven commando’s uitgevoerd: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run build`, `npm run atlas:check`; alles slaagt. `npm run validate:knowledge` rapporteert 0 fouten en 1 waarschuwing. `npm run test` rapporteert 185 passed tests. `npm run qa:rules` rapporteert 16 lookups, 0 failures, 1 verwachte `notFoundLookups` (NL VAT bad version), 5 `fallbackLocaleHits`. `npm run atlas:check` eindigt met `✅ All Atlas CI checks passed in 3.19s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

**Type:** Technisch/Architectuur
**Wijziging:** Atlas v2 — Active Belgian Income Tax Country Fallback Object 2026
**Details:** Nieuw Knowledge Object `docs/v2/knowledge/objects/be.tax.income.country_fallback.2026.yml` aangemaakt met `status: active`, `type: tax_bracket`, `country: BE`, `locale: BE`. Bevat identieke data als `be.tax.income.2026` (inkomstenjaar 2026 / aanslagjaar 2027, vier belastingschijven, belastingvrije som 11.180 euro tegen 25%, `splitting: false`). Het object heeft een `relationships`-vermelding `fallback_for` naar `be.tax.income.2026` zodat de relatie duidelijk is. Doel: een `fr-BE` lookup voor Belgische inkomstenbelasting kan terugvallen op een land-level `BE` object zonder de exacte `nl-BE` taalversie te vervangen. `tests/rules/resolver.test.ts` uitgebreid met vijf nieuwe tests in een `describe("Belgian income tax locale fallback")` blok: fr-BE income tax resolveert naar `be.tax.income.country_fallback.2026`; exacte nl-BE lookup blijft `be.tax.income.2026`; `onFallback` callback wordt correct aangeroepen voor fr-BE → BE income tax; `fallbackLocaleHits` wordt opgehoogd; exacte nl-BE match roept `onFallback` niet aan. `scripts/qa-rule-resolver.mjs` uitgebreid met lookups voor BE Income Tax (nl-BE) en BE Income Tax fr-BE fallback, plus een tweede fallback-warning check voor income tax. `src/lib/knowledge/generated-objects.ts` opnieuw gegenereerd via `npm run generate:knowledge`; registry telt nu 23 objecten. Geen wijzigingen aan websitepagina’s, calculatorpagina’s, calculator engines, UI, SEO-content, runtime code, Rule Resolver, andere Knowledge Objects, `.env` of dependencies. `docs/v2/knowledge/README.md`, `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `05_changelog.md` en `docs/10-CHANGELOG.md` bijgewerkt: status headers Sprint 072, voorbeelden en openstaande punten. Alle opdracht-gegeven commando’s uitgevoerd: `npm run generate:knowledge`, `npm run check:knowledge`, `npm run validate:knowledge`, `npm run validate:cdl`, `npm run test`, `npm run qa:rules`, `npm run build`, `npm run atlas:check`; alles slaagt. `npm run validate:knowledge` rapporteert 0 fouten en 0 waarschuwingen. `npm run test` rapporteert 185 passed tests. `npm run qa:rules` rapporteert `BE Income Tax` en `BE Income Tax fr-BE fallback` als PASS. `npm run atlas:check` eindigt met `✅ All Atlas CI checks passed in 3.09s`.
**Status:** In ontwikkeling
**Build:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-30

### Atlas v2 — Active Belgian Income Tax Object 2026

- **New Knowledge Object:** `docs/v2/knowledge/objects/be.tax.income.2026.yml` created and set to `active`.
- **Official source:** FOD Financiën / SPF Finances — `https://fin.belgium.be/nl/particulieren/belastingaangifte/inkomsten/belastingtarieven`.
- **Scope:** income year 2026 (assessment year 2027) for Belgian personal income tax.
- **Data structure:**
  - `year`: 2026
  - `assessment_year`: 2027
  - `currency`: EUR
  - `tax_free_amount`: 11,180 EUR (base amount, reduces the calculated tax at the 25% bracket)
  - `tax_free_amount_rate`: 0.25
  - `splitting`: false
  - `brackets`:
    - 0 – 16,720 EUR: 25%
    - 16,720 – 29,510 EUR: 40%
    - 29,510 – 51,070 EUR: 45%
    - 51,070 EUR and above: 50%
- **Notes:** explains the Belgian tax-free amount mechanism (reduces tax, not taxable income) and the income year / assessment year distinction.
- **Registry:** `src/lib/knowledge/generated-objects.ts` regenerated; now 22 objects.
- **No engine, calculator, or QA changes:** the object is not consumed by any engine yet and `qa:rules` was intentionally left unchanged per Sprint 071 scope.
- **No website pages, calculator pages, UI/SEO, runtime, or other Knowledge Objects changed.**
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `src/lib/knowledge/README.md`, `05_changelog.md`, `docs/10-CHANGELOG.md`.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 180 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Active German Income Tax Object 2026

- **Updated Knowledge Object:** `docs/v2/knowledge/objects/de.tax.income.2026.yml` changed from `draft` to `active` after official source review.
- **Official source:** `§ 32a EStG` as published on `gesetze-im-internet.de` for the assessment period 2026.
- **Data added:**
  - `basic_allowance`: 12,348 EUR (Grundfreibetrag).
  - `splitting`: `true` (spousal splitting procedure applies).
  - Five brackets covering the German income tax tariff:
    - 0 – 12,348 EUR: 0%
    - 12,349 – 17,799 EUR: `(914.51 * y + 1400) * y`
    - 17,800 – 69,878 EUR: `(173.10 * z + 2397) * z + 1034.87`
    - 69,879 – 277,825 EUR: `0.42 * x - 11135.63`
    - 277,826 EUR and above: `0.45 * x - 19470.38`
- **Metadata updated:** title and description changed from “draft” to active German income tax 2026; notes explain the basic tariff and spousal splitting; the placeholder self-referential relationship was removed.
- **QA script updated:** `scripts/qa-rule-resolver.mjs` now expects `de.tax.income.2026` for the German income tax lookup instead of `missing`.
- **Tests updated:**
  - `tests/rules/resolver.test.ts`: draft-handling test now uses a mock draft object; added test proving the active German object is returned by `resolveRule()`.
  - `tests/knowledge/registry.test.ts`: German tax object status expectation changed from `draft` to `active`.
- **Registry regenerated:** `src/lib/knowledge/generated-objects.ts` updated via `npm run generate:knowledge`.
- **No website, calculator, or runtime changes:** the German object is not yet consumed by any calculator engine.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `src/lib/knowledge/README.md`, `05_changelog.md`, `docs/10-CHANGELOG.md`.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 180 tests passed (was 179).
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — GitHub Readiness Checklist

- **New documentation:** `docs/v2/ci/` created with three guides.
  - `00-GITHUB-READINESS.md`: pre-push checklist (`.env` not committed, `package-lock.json` present, local `npm run atlas:check` passes, workflow present, no deploy/secrets/Cloudflare in workflow).
  - `01-BRANCH-PROTECTION.md`: recommended branch protection settings for `main`, including required PR, required status check `Atlas CI / Run Atlas CI checks`, and optional “require branches to be up to date”.
  - `02-ACTIONS-RUNBOOK.md`: where to find Actions runs, how to view failures, where artifacts live, expected files in `reports/`, and troubleshooting per failing step (`npm ci`, `validate:knowledge`, `validate:cdl`, `test`, `qa:rules`, `build`).
- **No code changes:** no website pages, calculator pages, calculator engines, UI/SEO content, runtime code, Knowledge Objects, `.env`, or dependencies changed.
- **READMEs updated:** `src/lib/rules/README.md`, `src/lib/knowledge/README.md`, and `docs/v2/03-RULE-ENGINE.md` now reference the new `docs/v2/ci/` guides.
- **Status lines updated:** Sprint 069 in relevant READMEs and rule engine spec.
- **Manually tested locally:** `npm run atlas:check` passes all 7 steps.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, `src/lib/knowledge/README.md`, `05_changelog.md`, `docs/10-CHANGELOG.md`.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — GitHub Actions CI Workflow v0.1

- **New workflow:** `.github/workflows/atlas-ci.yml` added.
- **Triggers:** `pull_request` and `push` to `main`.
- **Runner:** `ubuntu-latest`.
- **Node:** Node.js 22 via `actions/setup-node@v4`.
- **Dependency install:** `npm ci` (chosen because `package-lock.json` is present; it gives a clean, reproducible install without mutating the lockfile).
- **Main step:** `npm run atlas:check -- --report reports/atlas-check-report.md --json-report reports/atlas-check-report.json`.
- **Artifacts:** both reports are uploaded with `actions/upload-artifact@v4` and `if: always()`, so reports are available even on failure.
- **No deploy, no secrets, no Cloudflare/Wrangler:** the workflow is purely for validation, testing and building.
- **Manually tested locally:** `npm run atlas:check` passes all 7 steps.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Changelog Git Diff Auto Impact Mode v0.4

- **Updated script:** `scripts/knowledge-changelog.mjs` now generates full historical `from`/`to` comparisons for modified objects with unchanged IDs when running in `--git-diff --auto` mode.
- **Reuses `rule-impact` logic:** the script imports `compareObjects` from `scripts/rule-impact.mjs` and parses the base (via `git show`) and current YAML versions, so it does not reimplement the diff.
- **Per-status behaviour:**
  - **Modified, same id:** full diff report (context, data, sources, used_by, relationships) with risk level and affected consumers.
  - **Modified, different id:** still calls `rule-impact --from <old-id> --to <new-id>`.
  - **Renamed:** still calls `rule-impact` when both old and new ids exist.
  - **Added:** shows `used_by` from the new object.
  - **Deleted:** shows `used_by` from the base version.
- **Backward compatibility:** `--git-diff` without `--auto` still produces only the table; `--from`/`--to` mode is unchanged.
- **Manually tested:** in a temporary git repository with `nl.vat.standard` modified to add a consumer (LOW risk) and to change `data.default_rate` (HIGH risk). Both produced the expected risk level and diff details.
- **Non-git repo behaviour:** exits with a clear `Git diff failed` error when not inside a git repository.
- **No runtime changes:** does not touch `resolveRule()`, calculator engines, website pages, or YAML objects.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Local CI Check JSON Report Mode v0.4

- **Updated script:** `scripts/atlas-ci-check.mjs` now supports a `--json-report <path>` option for machine-readable JSON reporting.
- **New CLI option:** `--json-report <path>`.
- **Usage:**
  ```bash
  npm run atlas:check -- --json-report atlas-check-report.json
  npm run atlas:check -- --report atlas-check-report.md --json-report atlas-check-report.json
  ```
- **JSON report contents:**
  - `generated_at`: ISO timestamp.
  - `overall_status`: `PASS` or `FAIL`.
  - `total_duration_ms`: total duration in milliseconds.
  - `steps`: array of `{ name, command, status, duration_ms, error }`.
- **Behaviour:**
  - Without `--json-report`, console output is unchanged.
  - Output directories are created automatically.
  - Can be combined with `--report`.
  - On failure, the JSON report is still written before the script exits with code `1`.
- **No behaviour change:** the underlying commands and their order are unchanged.
- **Manually tested:** `npm run atlas:check -- --json-report reports/atlas-check-report.json` and combined with `--report`.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Local CI Check Timings v0.3

- **Updated script:** `scripts/atlas-ci-check.mjs` now measures and reports the duration of each CI step.
- **Console output:**
  - `[PASS] <step> (<duration>)` — e.g. `[PASS] Build Astro site (2.08s)`.
  - `[FAIL] <step> (<duration>): <reason>` — e.g. `[FAIL] Build Astro site (0.45s): Command exited with code 1`.
  - Final summary: `✅ All Atlas CI checks passed in <total duration>.`.
- **Markdown report:**
  - New `Duration` column in the steps table.
  - New `Total duration` line at the top of the report.
  - Failure details include the failing step’s duration.
- **No behaviour change:** the underlying commands and their order are unchanged; only timing metadata is added.
- **Manually tested:**
  - `npm run atlas:check` — passed with timings shown in console.
  - `npm run atlas:check -- --report atlas-check-report.md` — passed with report generated; the test file was removed afterwards and is not kept as permanent documentation.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Local CI Check Report Mode v0.2

- **Updated script:** `scripts/atlas-ci-check.mjs` now supports a `--report <path>` option for Markdown reporting.
- **New CLI option:** `--report <path>`.
- **Usage:**
  ```bash
  npm run atlas:check
  npm run atlas:check -- --report atlas-check-report.md
  ```
- **Report contents:**
  - Title: `# Atlas CI Check Report`
  - Generation timestamp
  - Overall status: ✅ PASS or ❌ FAIL
  - Steps table with `#`, step name, command, and status
  - Failure details section (first failing step + reason) when applicable
- **Behaviour:**
  - Without `--report`, console output is unchanged.
  - With `--report`, the Markdown file is written after successful completion.
  - On failure, the report is still written before the script exits with code `1`.
  - The script still stops at the first failing step.
- **No output hidden:** stdout/stderr of underlying commands remain visible.
- **No deploy or install:** does not run deploy, `npm ci`, or `rm -rf node_modules`.
- **Manually tested:**
  - `npm run atlas:check` — passed, no report file.
  - `npm run atlas:check -- --report atlas-check-report.md` — passed, report generated; the test file was removed afterwards and is not kept as permanent documentation.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Local CI Check Script v0.1

- **New script:** `scripts/atlas-ci-check.mjs` orchestrates all Atlas quality checks in the correct order.
- **New package.json script:** `"atlas:check": "node scripts/atlas-ci-check.mjs"`.
- **Usage:**
  ```bash
  npm run atlas:check
  ```
- **Steps (in order):**
  1. `npm run generate:knowledge`
  2. `npm run check:knowledge`
  3. `npm run validate:knowledge`
  4. `npm run validate:cdl`
  5. `npm run test`
  6. `npm run qa:rules`
  7. `npm run build`
- **Output per step:**
  - `[RUN] <label>: npm run <script>`
  - `[PASS] <label>` on success
  - `[FAIL] <label>: <reason>` on failure
- **Exit behaviour:** stops at the first failure with exit code `1`; exits with `0` and `✅ All Atlas CI checks passed.` when all steps pass.
- **No deploy or install:** does not run a deploy, `npm ci`, or `rm -rf node_modules`.
- **Output visibility:** does not hide stdout/stderr from underlying commands.
- **Intended use:** local development and pre-PR checks.
- **No runtime changes:** does not touch `resolveRule()`, calculator engines, website pages, or YAML objects.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Changelog Git Diff Auto Impact Mode v0.3

- **Updated script:** `scripts/knowledge-changelog.mjs` now supports `--git-diff --auto` to generate automatic impact reports for changed Knowledge Objects.
- **New CLI option:** `--auto` (must be combined with `--git-diff`).
- **Usage:**
  ```bash
  npm run knowledge:changelog -- --git-diff --auto
  npm run knowledge:changelog -- --git-diff --auto --base HEAD~1
  npm run knowledge:changelog -- --git-diff --auto --base HEAD~1 --output docs/v2/knowledge/CHANGELOG.md
  ```
- **Detection:** still uses `git diff --name-status --diff-filter=AMDR <base> -- docs/v2/knowledge/objects/`.
- **Report sections:**
  - “Changed Knowledge Objects” table (status, id, path).
  - “Impact details” per changed object.
- **Per-status behaviour:**
  - **Modified, same id:** notes content changed with same id; compares `used_by` between base and current versions and reports added/removed/unchanged consumers.
  - **Modified, different id:** calls `rule-impact --from <old-id> --to <new-id>` and shows risk + affected consumers.
  - **Renamed:** reads old and new ids; if both ids differ and exist in the current registry, calls `rule-impact`; otherwise shows a rename summary.
  - **Added:** reports “new object added” and shows `used_by` consumers from the new object.
  - **Deleted:** reports “object deleted” and shows `used_by` consumers from the base version (`git show`).
- **Object id / `used_by` parsing:** reads file content via `git show` or from disk and parses `id:` and `used_by:` lines with a lightweight regex; falls back to filename if parsing fails.
- **Backward compatibility:** `--git-diff` without `--auto` still produces only the table; `--from`/`--to` mode is unchanged.
- **Manually tested:** in a temporary git repository with all four statuses:
  - `modified` — `nl.vat.standard` (added consumer `calculator.new-btw-tool`)
  - `added` — `new.added.object` (consumers `calculator.new-tool`, `calculator.another-tool`)
  - `deleted` — `old.deleted.object` (previous consumers `calculator.legacy-one`, `calculator.legacy-two`)
  - `renamed` — `tobe.renamed.object.yml → renamed.object.yml` (same id, rename summary)
- **Also tested:** modified object with id change (`nl.vat.standard` → `nl.vat.standard.2026`) automatically triggers `rule-impact` and reports risk/affected consumers.
- **Non-git repo behaviour:** exits with a clear `Git diff failed` error when not inside a git repository.
- **No runtime changes:** does not touch `resolveRule()`, calculator engines, website pages, or YAML objects.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Changelog Git Diff Mode v0.2 (AMDR support)

- **Updated script:** `scripts/knowledge-changelog.mjs` now supports all git status codes in `--git-diff` mode: **A** (added), **M** (modified), **D** (deleted), **R** (renamed).
- **New git command:** `git diff --name-status --diff-filter=AMDR <base> -- docs/v2/knowledge/objects/`.
- **Output per item:** status, object id, path, and for renamed files `old path → new path` plus `old id → new id`.
- **Object id resolution:**
  - Deleted files: reads `git show <base>:<path>` and parses the `id` line.
  - Renamed files: reads old id from base version and new id from current version.
  - Added/modified files: reads current file and parses the `id` line.
  - Fallback: filename (`<id>.yml`) if `id` cannot be parsed.
- **Usage:**
  ```bash
  npm run knowledge:changelog -- --git-diff
  npm run knowledge:changelog -- --git-diff --base HEAD~1
  npm run knowledge:changelog -- --git-diff --base HEAD~1 --output docs/v2/knowledge/CHANGELOG.md
  ```
- **Backward compatibility:** existing `--from`/`--to` mode is unchanged.
- **Manually tested:** in a temporary git repository with all four statuses:
  - `modified` — `nl.vat.standard.yml`
  - `added` — `new.added.object.yml`
  - `deleted` — `old.deleted.object.yml`
  - `renamed` — `tobe.renamed.object.yml → renamed.object.yml`
- **Non-git repo behaviour:** exits with a clear `Git diff failed` error when not inside a git repository.
- **No runtime changes:** does not touch `resolveRule()`, calculator engines, website pages, or YAML objects.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Changelog Git Diff Mode v0.1

- **Updated script:** `scripts/knowledge-changelog.mjs` now supports a `--git-diff` flag to detect changed Knowledge Object YAML files via git.
- **New CLI options:**
  - `--git-diff`: enable git diff mode.
  - `--base <ref>`: base ref to compare against (default `HEAD~1`).
- **Usage:**
  ```bash
  npm run knowledge:changelog -- --git-diff
  npm run knowledge:changelog -- --git-diff --base HEAD~1
  npm run knowledge:changelog -- --git-diff --base HEAD~1 --output docs/v2/knowledge/CHANGELOG.md
  ```
- **Detection:** runs `git diff --name-only --diff-filter=AM <base> -- docs/v2/knowledge/objects/` and reports changed `.yml` files.
- **Output:** Markdown report with sections: Git diff mode, Changed Knowledge Objects (file path + object id), and a v0.1 TODO explaining that per-object `from`/`to` comparison is not yet automated.
- **No duplicate diff logic:** git diff only detects file names; object comparison remains delegated to `rule-impact` via the existing `--from`/`--to` mode.
- **Backward compatibility:** the existing `--from`/`--to` mode is unchanged.
- **Limitations:**
  - Automatic `from`/`to` comparison per changed object is not implemented (v0.1 TODO).
  - Requires a git repository; outside a git repository the script exits with a clear error.
  - Only added and modified files (`--diff-filter=AM`) are reported; deleted objects are not explicitly handled.
- **Manually tested:**
  - In a temporary git repository with a modified `nl.vat.standard.yml`: changed object detected correctly, output to stdout and to `--output git-diff-report.md`.
  - In the current project directory (not a git repository): script exits with a clear git error.
- **No runtime changes:** does not touch `resolveRule()`, calculator engines, website pages, or YAML objects.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Changelog Generator v0.1

- **New script:** `scripts/knowledge-changelog.mjs` generates Markdown changelogs from `rule-impact` JSON output.
- **Usage:** `npm run knowledge:changelog -- --from <object-id> --to <object-id> [--output <file.md>]`.
- **Reuses rule-impact:** internally calls `rule-impact --json`; does not reimplement diff logic.
- **Output:** Markdown sections: From, To, Context, Data, Sources, Used by, Relationships, and Impact (risk + affected calculators).
- **Output modes:** writes to stdout if `--output` is omitted; writes to the specified file if `--output` is provided.
- **Exit codes:** `0` on success; `1` on missing arguments or unknown objects.
- **package.json:** new script `"knowledge:changelog": "node scripts/knowledge-changelog.mjs"`.
- **Manually tested scenarios:**
  - `nl.vat.standard` → `be.vat.standard`: Markdown to stdout, high risk.
  - `nl.vat.standard` → `be.vat.standard --output docs/v2/knowledge/CHANGELOG.md`: Markdown written to file.
  - `unknown.object` → `nl.vat.standard`: exit code 1.
- **No runtime changes:** does not touch `resolveRule()`, calculator engines, website pages, or YAML objects.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Impact Analysis Tool v0.3 (JSON Export)

- **Updated script:** `scripts/rule-impact.mjs` now supports a `--json` flag for machine-readable output.
- **JSON mode:** writes only JSON to stdout; human-readable output is suppressed. Exit code `0` on success, `1` on missing arguments or unknown objects. Errors are written to stderr as `{"error": "..."}`.
- **JSON output schema:**
  - `from` / `to`: `{ id, type, country, locale, version, effective_from, effective_until }`.
  - `differences`: `{ context, data, sources, used_by, relationships }`.
  - `context`: array of `{ field, from, to }`.
  - `data`: array of `{ path, from, to }`.
  - `sources`, `used_by`, `relationships`: each with `only_in_from`, `only_in_to`, `shared` arrays.
  - `impact`: `{ affected: [], risk_level: "low" | "medium" | "high" }`.
- **Human output unchanged:** without `--json`, the existing human-readable output remains identical.
- **Manually tested scenarios:**
  - `nl.vat.standard` → `be.vat.standard` (human output): high risk.
  - `nl.vat.standard` → `be.vat.standard --json`: valid JSON, high risk.
  - `unknown.object` → `nl.vat.standard --json`: exit code 1 with JSON error.
- **No real Knowledge Objects changed:** production data is untouched.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Impact Analysis Tool v0.2 (Relationships Diff)

- **Updated script:** `scripts/rule-impact.mjs` now compares `relationships` arrays in addition to existing fields.
- **Relationship comparison:** compares `relation`, `target`, and optional `description`; plain strings are also supported.
- **Output:** shows relationship counts, shared relationships, relationships only in `from`, and relationships only in `to`.
- **Risk rules updated:**
  - `high` if `type` or `data` differs.
  - `medium` if `country`, `locale`, `version`, `effective_from`, `effective_until`, `sources`, or `relationships` differs (and `data` does not).
  - `low` if only `notes`/`tags` differ.
- **Backward compatible:** existing output format is preserved.
- **Manually tested scenarios:**
  - `nl.vat.standard` → `be.vat.standard`: high risk, data and relationships differ.
  - `nl.allowance.health` → `nl.allowance.health.2026`: high risk, data differs, relationship shared.
  - `nl.import.bpm.manual` → `nl.import.costs.2026`: high risk, data and relationships differ.
- **No real Knowledge Objects changed:** production data is untouched.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Impact Analysis Tool v0.1

- **New script:** `scripts/rule-impact.mjs` for local Knowledge Object impact analysis.
- **Usage:** `npm run rule:impact -- --from <object-id> --to <object-id>`.
- **Reads:** YAML sources from `docs/v2/knowledge/objects/`.
- **Compares:** `id`, `type`, `country`, `locale`, `version`, `effective_from`, `effective_until`, `data` (top-level keys), `sources` (by URL), and `used_by`.
- **Output:** context differences, data differences, source differences, `used_by` differences, affected calculators/engines, and risk level (`low`/`medium`/`high`).
- **Risk rules:**
  - `high` if `type` or `data` differs.
  - `medium` if `country`, `locale`, `version`, `effective_from`, `effective_until`, or `sources` differs.
  - `low` if only `notes`/`tags` differ.
- **Exit codes:** `0` when both objects are found; `1` on missing arguments or unknown objects.
- **package.json:** new script `"rule:impact": "node scripts/rule-impact.mjs"`.
- **Manually tested scenarios:**
  - `nl.vat.standard` → `be.vat.standard`: high risk, affects BTW calculators.
  - `nl.allowance.health` → `nl.allowance.health.2026`: high risk, affects allowance calculator.
  - `unknown.object` → `nl.vat.standard`: exit code 1.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md`, `src/lib/rules/README.md`, and `src/lib/knowledge/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, real Knowledge Objects, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Multi-version Rule Selection Test Scenario

- **Test-only scenario:** `tests/rules/resolver.test.ts` now proves multi-version selection using a custom in-memory registry via `resolveRuleFromRegistry()`.
- **Mock objects:**
  - `nl.vat.standard.2025` (`version: "2025-01-01"`, `effective_from: "2025-01-01"`, `standard: 21`).
  - `nl.vat.standard.2026` (`version: "2026-01-01"`, `effective_from: "2026-01-01"`, `standard: 22`).
- **Covered behavior:**
  - No `version` + `year: 2026` selects the most recent active 2026 version.
  - `version: "2025-01-01"` selects the 2025 version even for year 2026.
  - `version: "2026-01-01"` selects the 2026 version.
  - Unknown `version` returns `undefined`.
  - `year: 2025` without `version` selects the 2025 version (2026 object is excluded by effective date).
  - `id` + `version` work together: an exact `id` within the requested version is returned; an `id` with a mismatched `version` returns `undefined`.
- **Resolver behavior clarification:** when `id` is provided but not found, `resolveRule()` and `resolveRuleFromRegistry()` now return `undefined` instead of falling back to the most recent object. This makes `id` truly leading and prevents silent selection of the wrong object when combined with `version`.
- **No real Knowledge Objects changed:** production data is untouched.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 179 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — QA Rules Version Parameter Checks

- **QA script updated:** `scripts/qa-rule-resolver.mjs` v0.2 now includes explicit `version` parameter checks.
- **New checks:**
  - NL VAT with correct `version` (`2026-01-01`) returns `nl.vat.standard`.
  - NL VAT with unknown `version` (`2025-01-01`) returns `missing` (expected, not counted as failure).
  - BE `fr-BE` fallback with correct `version` returns `be.vat.country_fallback`.
- **Diagnostics remain clear:** `totalLookups`, `cacheHits`, `cacheMisses`, `notFoundLookups`, and `fallbackLocaleHits` are still reported.
- **Exit behavior unchanged:** `0` on success, `1` on unexpected mismatch.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 172 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Resolver Version Parameter

- **New API option:** `version?: string` added to `RuleResolverInput` in `src/lib/rules/types.ts`.
- **Behavior:** when `version` is provided, `resolveRule()` filters to objects with `object.version === version`. When omitted, existing behavior (most recent active object within the requested year) is unchanged.
- **`id` remains leading:** an exact `id` match is still applied within the version-filtered candidate set.
- **Locale fallback preserved:** fallback works with `version`, e.g. `resolveRule({ type: "vat_rate", country: "BE", locale: "fr-BE", year: 2026, version: "2026-01-01" })` returns `be.vat.country_fallback`.
- **Cache key updated:** includes `version`, so the same lookup with different versions is cached separately.
- **Tests added:** `tests/rules/resolver.test.ts` `version parameter` describe block covers:
  - lookup without version remains unchanged;
  - lookup with correct version returns the object;
  - lookup with unknown version returns `undefined`;
  - cache distinguishes versions;
  - locale fallback with version;
  - `id` + version together;
  - `id` with wrong version returns `undefined`.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md`.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 172 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Explicit Fallback Warning Test

- **New explicit test:** `tests/rules/resolver.test.ts` now proves that `resolveRule({ type: "vat_rate", country: "BE", locale: "fr-BE", year: 2026, warnOnFallback: true, onFallback: ... })` invokes the callback with `resolvedId === "be.vat.country_fallback"`, `resolvedLocale === "BE"`, and matching `requestedLocale === "fr-BE"`.
- **Exact-match test:** `resolveRule({ type: "vat_rate", country: "BE", locale: "nl-BE", year: 2026, warnOnFallback: true, onFallback: ... })` returns `be.vat.standard` and does **not** invoke the callback.
- **QA script:** `scripts/qa-rule-resolver.mjs` now performs a live fallback-warning check and validates the callback metadata.
- **Documentation updated:** `docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md`.
- **Geen wijzigingen** aan engine code, resolver code, website pages, calculator pages, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 165 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Allowance Knowledge Object Naming Cleanup

- **No ID or data changes:** `nl.allowance.health`, `nl.allowance.rent`, `nl.allowance.health.2026`, and `nl.allowance.rent.2026` keep their existing IDs and data values.
- **Tags added:**
  - `reference` + `general` on `nl.allowance.health` and `nl.allowance.rent`.
  - `engine_parameters` on `nl.allowance.health.2026` and `nl.allowance.rent.2026`.
- **Notes updated:** each object now explicitly references the other object, clarifying the general/reference vs engine-parameter roles.
- **New documentation:** `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` added a section "Algemene vs engine-parameter objecten" describing the convention.
- **`src/lib/knowledge/README.md` updated:** status header and a note explaining that `nl.allowance.rent`/`nl.allowance.health` are general reference objects while the `.2026` variants are engine parameters.
- **`docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md` updated:** status headers.
- **Geen wijzigingen** aan engine code, resolver code, website pages, calculator pages, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 164 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Import Cost Constants naar Knowledge Layer

- **New knowledge object:** `docs/v2/knowledge/objects/nl.import.costs.2026.yml` (`type: import_cost`, `status: active`).
  - Contains default cost values (all 0): `estimatedBpm`, `rdwCosts`, `transportCosts`, `exportCosts`, `inspectionCosts`, `plateCosts`, `otherCosts`.
  - BPM remains manual input; no automatic BPM calculation added.
- **`src/lib/calculators/import-costs.ts` updated:**
  - `loadImportCosts2026()` loads default values via `resolveRule({ type: "import_cost", id: "nl.import.costs.2026", ... })`.
  - Safe fallback to the previous hardcoded defaults (all 0) remains intact.
  - `calculateImportCosts()` uses the loaded defaults when input fields are missing.
  - Output of `calculateImportCosts()` remains unchanged.
- **`tests/calculators/import-costs.test.ts` updated:** added test that `resolveRule()` finds the new import cost object and returns the expected default values.
- **`tests/calculators/engine-acceptance.test.ts` updated:** import cost acceptance test now asserts `totalLookups > 0` while still requiring `notFoundLookups === 0` and `fallbackLocaleHits === 0`.
- **`docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` updated:** status header and `import_cost` data example.
- **`src/lib/knowledge/README.md` updated:** status header and note that Import Cost Engine is now wired to the Rule Resolver.
- **`docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md` updated:** status headers.
- **Geen wijzigingen** aan website pages, calculator pages, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 164 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Allowance Constants naar Knowledge Layer

- **New knowledge objects:**
  - `docs/v2/knowledge/objects/nl.allowance.health.2026.yml` (`type: allowance_threshold`, `status: active`).
  - `docs/v2/knowledge/objects/nl.allowance.rent.2026.yml` (`type: allowance_threshold`, `status: active`).
  - Health data: `income_limit_single: 40857`, `income_limit_couple: 51142`, `base_benefit: 131`, `reduction_threshold_single: 23000`, `reduction_threshold_couple: 26000`, `reduction_rate: 0.15`.
  - Rent data: `max_rent: 932.93`, `income_limit_single: 32500`, `income_limit_couple: 43500`, `base_benefit: 425`, `own_payment_threshold_single: 18000`, `own_payment_threshold_couple: 21000`, `own_payment_rate: 0.15`.
- **`src/lib/calculators/allowances.ts` updated:**
  - `loadRentAllowance2026()` and `loadHealthAllowance2026()` load parameters via `resolveRule({ type: "allowance_threshold", id: "nl.allowance.rent.2026" / "nl.allowance.health.2026", ... })`.
  - Safe fallback to the previous hardcoded `RENT_2026` and `ZORG_2026` values remains intact.
  - Output of `calculateAllowances()` remains unchanged.
- **`tests/calculators/allowances.test.ts` updated:** added tests that `resolveRule()` finds both new allowance objects and returns the expected values.
- **`tests/calculators/engine-acceptance.test.ts` updated:** allowance acceptance test now asserts `totalLookups > 0` while still requiring `notFoundLookups === 0` and `fallbackLocaleHits === 0`.
- **`docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` updated:** status header and `allowance_threshold` data examples.
- **`src/lib/knowledge/README.md` updated:** status header and note that Allowance Engine is now wired to the Rule Resolver.
- **`docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md` updated:** status headers.
- **Geen wijzigingen** aan website pages, calculator pages, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 163 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Mortgage Constants naar Knowledge Layer

- **New knowledge object:** `docs/v2/knowledge/objects/nl.mortgage.formula.2026.yml`.
  - `id: nl.mortgage.formula.2026`, `type: mortgage_formula`, `country: NL`, `locale: nl-NL`, `status: active`.
  - Contains 2026 mortgage parameters:
    - `interest_deduction_rate: 0.3756`
    - `min_income_factor: 3.5`
    - `income_factor_base: 5.8`
    - `income_factor_rate_multiplier: 0.28`
- **`src/lib/calculators/mortgage.ts` updated:**
  - `loadMortgageFormula2026()` loads parameters via `resolveRule({ type: "mortgage_formula", id: "nl.mortgage.formula.2026", ... })`.
  - Safe fallback to the previous hardcoded values remains intact.
  - `calculateIncomeFactor()` and `calculateNetMonthlyPayment()` use the loaded values.
  - Output of `calculateMortgage()` remains unchanged.
- **`tests/calculators/mortgage.test.ts` updated:** added test that `resolveRule()` finds the new mortgage formula object and returns the expected values.
- **`tests/calculators/engine-acceptance.test.ts` updated:** mortgage acceptance test now asserts `totalLookups > 0` while still requiring `notFoundLookups === 0` and `fallbackLocaleHits === 0`.
- **`docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` updated:** status header and `mortgage_formula` data example.
- **`src/lib/knowledge/README.md` updated:** status header and note that Mortgage Engine is now wired to the Rule Resolver.
- **`docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md` updated:** status headers.
- **Geen wijzigingen** aan website pages, calculator pages, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 161 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Engine Acceptance Tests uitbreiden (Mortgage, Allowances, Import Costs)

- **`tests/calculators/engine-acceptance.test.ts` extended:** from 3 to 6 covered engines.
  - Added Mortgage engine acceptance test (`calculateMortgage`).
  - Added Allowance engine acceptance test (`calculateAllowances`).
  - Added Import Cost engine acceptance test (`calculateImportCosts`).
  - Each test still resets resolver cache/diagnostics, dynamically imports the engine, runs a normal NL calculation, and asserts `notFoundLookups === 0` and `fallbackLocaleHits === 0`.
- **Engines without Knowledge Layer rules:** Mortgage, Allowance, and Import Cost currently show 0 lookups and produce no `notFoundLookups` or `fallbackLocaleHits`.
- **`docs/v2/03-RULE-ENGINE.md` updated:** status header and Engine acceptatietests section now list all six engines.
- **`src/lib/rules/README.md` updated:** status header and Engine acceptance tests section now list all six engines.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 160 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Engine Acceptance Tests: No Unexpected Fallbacks

- **New test file:** `tests/calculators/engine-acceptance.test.ts`.
  - Verifies that BTW, Tax, and ZZP engines resolve rules without missing lookups or unexpected locale fallbacks.
  - Each test resets resolver cache and diagnostics, dynamically imports the engine, runs a normal NL calculation, and asserts `notFoundLookups === 0` and `fallbackLocaleHits === 0`.
  - Helper `assertNoUnexpectedFallbacks()` keeps assertions concise.
- **`src/lib/rules/types.ts` extended:** `RuleType` now includes `entrepreneur_deduction` and `profit_exemption`, matching the existing ZZP Knowledge Objects (`nl.zzp.self_employed_deduction.2026`, `nl.zzp.starter_deduction.2026`, `nl.zzp.mkb_profit_exemption.2026`).
- **`docs/v2/03-RULE-ENGINE.md` updated:** status header and new "Engine acceptatietests" section.
- **`src/lib/rules/README.md` updated:** status header and new "Engine acceptance tests" section.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines (except the `RuleType` consistency fix), UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 157 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — QA Fallback Object + Fallback Warning Test

- **New knowledge object:** `docs/v2/knowledge/objects/be.vat.country_fallback.yml`.
  - `id: be.vat.country_fallback`, `type: vat_rate`, `country: BE`, `locale: BE`, `status: active`.
  - Contains same rates as `be.vat.standard`: standard 21, reduced 12, reduced_low 6, zero 0, default_rate 21.
  - Acts as a country-level fallback for Belgian locales that do not have their own object (e.g., `fr-BE`).
- **Registry update:** `npm run generate:knowledge` now produces 17 objects; `src/lib/knowledge/generated-objects.ts` updated automatically.
- **`scripts/qa-rule-resolver.mjs` updated:** added `BE VAT fr-BE fallback` lookup expecting `be.vat.country_fallback`; QA diagnostics now show `fallbackLocaleHits: 1`.
- **`tests/rules/resolver.test.ts` updated:**
  - Existing `fr-BE` test now asserts fallback to `be.vat.country_fallback` instead of `undefined`.
  - New tests for `fr-BE -> BE` fallback, `onFallback` callback with correct info, and `fallbackLocaleHits` increment.
- **`tests/knowledge/registry.test.ts` updated:**
  - Object count expectation updated to 17.
  - New tests locating `be.vat.country_fallback`, comparing its rates to `be.vat.standard`, and confirming inclusion in `vat_rate` results.
- **`docs/v2/03-RULE-ENGINE.md` and `src/lib/rules/README.md` updated:** status headers and QA Script section.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 154 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Resolver Runtime Fallback Warnings v1

- **`src/lib/rules/types.ts`** extended:
  - New `RuleResolverFallbackInfo` interface: `requestedCountry`, `requestedLocale`, `resolvedCountry`, `resolvedLocale`, `requestedType`, `resolvedId`.
  - `RuleResolverInput` extended with optional `warnOnFallback?: boolean` and `onFallback?: (info) => void`.
- **`src/lib/rules/resolver.ts`** extended:
  - `maybeWarnOnFallback()` helper invokes the callback on both cache misses and cache hits.
  - Callback is only invoked when `warnOnFallback: true`, `onFallback` is provided, and the result came from a fallback locale (`result.locale !== requestedLocale`).
  - No `console.log`; no PII; only resolution metadata is passed to the callback.
- **`tests/rules/resolver.test.ts`** extended with 5 new tests:
  - `onFallback` is called when a fallback locale is used.
  - `onFallback` is not called on exact locale match.
  - `onFallback` receives correct `RuleResolverFallbackInfo`.
  - `onFallback` is called again on cached fallback results (works with caching).
  - Diagnostics counters stay correct when fallback warnings are active.
- **`docs/v2/03-RULE-ENGINE.md` updated:** status header, new "Runtime fallback warnings v1" section, fallback strategy updated to opt-in callback instead of always logging.
- **`src/lib/rules/README.md` updated:** status header, input field list, new "Runtime fallback warnings" section, future versions list updated.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, knowledge objects, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 143 tests passed (38 resolver tests).
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Resolver QA Script v0.1

- **New script:** `scripts/qa-rule-resolver.mjs`.
  - Reads YAML Knowledge Objects from `docs/v2/knowledge/objects/`.
  - Applies the same resolver selection rules as `src/lib/rules/resolver.ts`.
  - Runs a fixed set of safe lookups:
    - NL/BE/FR/DE/ES VAT
    - NL Box 1 (`tax_bracket`)
    - NL AHK and AK (`tax_credit` with exact id)
    - DE `tax_bracket` (expected missing because `de.tax.income.2026` is draft)
  - Reports expected vs actual id, pass/fail, and diagnostics counters.
  - Exit code `0` on success, `1` on unexpected mismatch.
- **No new dependency:** script does not import TypeScript directly; it reads YAML to avoid adding a TS loader dependency.
- **`package.json` updated:** added `"qa:rules": "node scripts/qa-rule-resolver.mjs"`.
- **`docs/v2/03-RULE-ENGINE.md` updated:** added QA Script section.
- **`src/lib/rules/README.md` updated:** added QA Script section.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, knowledge objects, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (Sprint 041 draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 143 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Resolver Fallback Diagnostics v0.1

- **`src/lib/rules/resolver.ts`** added safe diagnostics layer:
  - New exports: `getRuleResolverDiagnostics()`, `clearRuleResolverDiagnostics()`.
  - Counters: `totalLookups`, `cacheHits`, `cacheMisses`, `notFoundLookups`, `fallbackLocaleHits`.
  - No PII, no `console.log`, no external logging.
- **`src/lib/rules/types.ts`** extended with `RuleResolverDiagnostics` interface.
- **API unchanged:** `resolveRule()` and `resolveRuleFromRegistry()` keep the same signatures; `resolveRuleFromRegistry()` remains pure.
- **Tests extended in `tests/rules/resolver.test.ts`:**
  - `totalLookups` increments.
  - `cacheHits`/`cacheMisses` on repeated lookup.
  - `notFoundLookups` on unknown lookup.
  - `clearRuleResolverDiagnostics()` resets counters.
  - `fallbackLocaleHits` increments when a fallback locale is used.
- **`docs/v2/03-RULE-ENGINE.md` updated:** status, resolver description and new Diagnostics section.
- **`src/lib/rules/README.md` updated:** status, future versions and Diagnostics section.
- **Geen wijzigingen** aan website pages, calculator pages, calculator engines, UI, SEO content, knowledge objects, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 nieuwe waarschuwingen (1 verwachte waarschuwing uit Sprint 041 blijft bestaan).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 143 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Non-VAT Multi-country Proof: DE Income Tax Object

- **New Knowledge Object** `docs/v2/knowledge/objects/de.tax.income.2026.yml`:
  - type: `tax_bracket`, country: `DE`, locale: `de-DE`, status: `draft`.
  - Placeholder data: `year: 2026`, `brackets: []`, `notes: Draft placeholder pending official review`.
  - Authority: Bundesministerium der Finanzen, level `official`.
  - Source URL marked with TODO for official review.
- **Why draft:** German income tax is complex and not yet officially validated by us; production engines must not use it.
- **Validator update:** `scripts/validate-knowledge.mjs` extended with `validateTaxBracketData()`:
  - `data.year` must be a number.
  - `data.brackets` must be an array.
  - Empty brackets are allowed for `draft` (warning) but not for `active`.
- **Consistency fix:** `docs/v2/knowledge/objects/nl.tax.box1.2026.yml` updated with `data.year: 2026`.
- **`npm run generate:knowledge` ran:** registry now contains 16 objects.
- **Tests extended:**
  - `tests/rules/resolver.test.ts` — draft DE `tax_bracket` returns `undefined`; active mock returns the object.
  - `tests/knowledge/registry.test.ts` — ≥16 objects, `de.tax.income.2026` findable, `tax_bracket` type includes NL and DE.
- **`docs/v2/knowledge/05-COUNTRIES.md` updated:** object list and land-specific types.
- **`src/lib/knowledge/README.md` and `src/lib/rules/README.md` updated:** first non-VAT multi-country proof.
- **Knowledge validatie:** 0 fouten, 1 verwachte waarschuwing (empty brackets in draft object).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 138 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Resolver Version Selection v0.1

- **`src/lib/rules/resolver.ts` refined:** version selection logic formalised.
  - Only `status: active`.
  - `effective_from` must be before or within the requested year.
  - `effective_until` must be `null` or after/beginning within the requested year.
  - When multiple objects match, the object with the most recent `effective_from` is returned.
  - Cache key unchanged: `type:country:locale:year:id`.
- **No changes to calculator engines or website pages.**
- **Tests extended in `tests/rules/resolver.test.ts`:**
  - Most recent version wins when multiple versions overlap.
  - Correct version is returned per requested year.
  - Expired objects are ignored.
  - Future objects are ignored for earlier years.
  - Exact `id` matching works with multiple versions.
  - Locale fallback still works with multiple versions.
- **`docs/v2/03-RULE-ENGINE.md` updated:** status includes Version Selection v0.1, resolver description clarified, versioning marked as done.
- **`src/lib/rules/README.md` updated:** status, future versions and next steps.
- **`src/lib/knowledge/README.md` updated:** version selection marked as done.
- **Geen wijzigingen** aan `src/lib/rules/types.ts`, knowledge objects, UI, SEO content, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 134 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Multi-country Proof 3: DE + ES VAT Knowledge Objects

- **New Knowledge Objects:**
  - `docs/v2/knowledge/objects/de.vat.standard.yml` — country `DE`, locale `de-DE`, rates standard 19%, reduced 7%, default_rate 19%.
  - `docs/v2/knowledge/objects/es.vat.standard.yml` — country `ES`, locale `es-ES`, rates standard 21%, reduced 10%, reduced_low 4%, zero 0%, default_rate 21%.
- **Authorities:** Bundeszentralamt für Steuern (DE) and Agencia Tributaria (ES), both `official`.
- **Source URLs:** marked with TODO for next official source review.
- **No validator changes needed:** decimal values and all categories are accepted.
- **`npm run generate:knowledge` ran:** registry now contains 15 objects.
- **Tests extended:**
  - `tests/rules/resolver.test.ts` — DE and ES lookups; unknown country → PT.
  - `tests/knowledge/registry.test.ts` — ≥15 objects, DE/ES findable.
  - `tests/knowledge/vat-rates.test.ts` — DE/ES rate checks.
- **`docs/v2/knowledge/05-COUNTRIES.md` updated:** Sprint 039 status, object list, DE/ES examples.
- **`src/lib/knowledge/README.md` and `src/lib/rules/README.md` updated:** multi-country VAT proof complete for NL/BE/FR/DE/ES.
- **Geen wijzigingen** aan website pages, calculator pages, UI, SEO content, text, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 128 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Multi-country Proof 2: BE VAT source fix + FR VAT Knowledge Object

- **BE source URL fixed** in `docs/v2/knowledge/objects/be.vat.standard.yml`: `tariezen` → `tarieven` (`https://finances.belgium.be/nl/ondernemingen/btw/tarieven`).
- **New Knowledge Object** `docs/v2/knowledge/objects/fr.vat.standard.yml`:
  - type: `vat_rate`, country: `FR`, locale: `fr-FR`, status: `active`.
  - French VAT rates: standard 20%, reduced 10%, reduced_low 5.5%, super_reduced 2.1%, zero 0%, default_rate 20%.
  - Authority: Direction générale des Finances publiques, level `official`.
- **No validator changes needed:** decimal values and `super_reduced` category are accepted as strings/numbers.
- **`npm run generate:knowledge` ran:** registry now contains 13 objects.
- **Tests extended:**
  - `tests/rules/resolver.test.ts` — FR VAT lookup.
  - `tests/knowledge/registry.test.ts` — ≥13 objects, FR VAT findable.
  - `tests/knowledge/vat-rates.test.ts` — FR VAT lookup and rate checks.
- **`docs/v2/knowledge/05-COUNTRIES.md` updated:** Sprint 038 status, current object list, FR example.
- **`src/lib/knowledge/README.md` and `src/lib/rules/README.md` updated:** FR VAT as multi-country proof.
- **Geen wijzigingen** aan website pages, calculator pages, UI, SEO content, text, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 121 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Multi-country Proof: BE VAT Knowledge Object

- **New Knowledge Object** `docs/v2/knowledge/objects/be.vat.standard.yml`:
  - type: `vat_rate`, country: `BE`, locale: `nl-BE`, status: `active`.
  - Belgian VAT rates: standard 21%, reduced 12%, reduced_low 6%, zero 0%, default_rate 21%.
  - Authority: FOD Financiën, level `official`.
- **`npm run generate:knowledge` ran:** registry now contains 12 objects.
- **`docs/v2/knowledge/05-COUNTRIES.md` updated:** current fallback order, correct Belgian locales, and `be.vat.standard` example.
- **`src/lib/knowledge/README.md` and `src/lib/rules/README.md` updated:** BE VAT mentioned as multi-country proof.
- **`tests/rules/resolver.test.ts` extended:** BE VAT lookup returns `be.vat.standard`; `fr-BE` lookup returns `undefined` by design; unknown-country test changed to `DE`.
- **`tests/knowledge/registry.test.ts` extended:** registry has ≥12 objects, BE VAT object findable, `vat_rate` type includes both NL and BE.
- **`tests/knowledge/vat-rates.test.ts` extended:** BE VAT lookup returns `be.vat.standard` with correct rates; unknown-country test changed to `DE`.
- **No validator changes needed:** `reduced_low` category is accepted as a string.
- **Geen wijzigingen** aan website pages, calculator pages, UI, SEO content, text, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 117 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Import Cost Engine v0.1 + Auto Importkosten Calculator migration

- **New module** `src/lib/calculators/import-costs.ts`:
  - Pure function: `calculateImportCosts`.
  - Mirrors existing inline addition without changes; negative inputs are treated as 0.
- **`src/pages/auto-importkosten-berekenen.astro` migrated:**
  - Removed local `formatEuro` and inline calculation.
  - Imports `calculateImportCosts()` from `src/lib/calculators/import-costs.ts` and `formatEuroHtml()` from `src/lib/format/currency.ts`.
  - All existing HTML ids, event handlers, vehicle type selector, error box, comparison logic and styling preserved.
- **`docs/catalog/calculators.yml` updated:** `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/import-costs.ts`.
- **New testfile** `tests/calculators/import-costs.test.ts` with 7 tests.
- **Geen wijzigingen** aan other website pages, UI, SEO content, text, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 111 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Allowance Engine v0.1 + Toeslagen Calculator migration

- **New module** `src/lib/calculators/allowances.ts`:
  - Pure functions: `calculateRentBenefit`, `calculateZorgBenefit`, `calculateAllowances`.
  - Mirrors existing inline formulas without changes.
- **`src/pages/toeslagen-calculator.astro` migrated:**
  - Removed local `formatEuro`, `calcRent` and `calcZorg`.
  - Imports `calculateAllowances()` from `src/lib/calculators/allowances.ts` and `formatEuroHtml()` from `src/lib/format/currency.ts`.
  - All existing HTML ids, event handlers, household selector and styling preserved.
- **`docs/catalog/calculators.yml` updated:** `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/allowances.ts`.
- **New testfile** `tests/calculators/allowances.test.ts` with 14 tests.
- **`src/lib/knowledge/README.md` and `src/lib/rules/README.md` updated:** toeslagen migration marked as completed.
- **Geen wijzigingen** aan other website pages, UI, SEO content, text, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 104 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Mortgage Engine v0.1 + Hypotheek Calculator migration

- **New module** `src/lib/calculators/mortgage.ts`:
  - Pure functions: `calculateIncomeFactor`, `calculateMaxMortgage`, `calculateMonthlyPayment`, `calculateTotalInterest`, `calculateNetMonthlyPayment`, `calculateMortgage`.
  - Mirrors existing inline formulas without changes.
- **`src/pages/hypotheek-calculator.astro` migrated:**
  - Removed local `formatEuro` and inline calculations.
  - Imports `calculateMortgage()` from `src/lib/calculators/mortgage.ts` and `formatEuroHtml()` from `src/lib/format/currency.ts`.
  - All existing HTML ids, event handlers, error box and styling preserved.
- **`docs/catalog/calculators.yml` updated:** `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/mortgage.ts`.
- **New testfile** `tests/calculators/mortgage.test.ts` with 13 tests.
- **`src/lib/knowledge/README.md` and `src/lib/rules/README.md` updated:** hypotheek migration marked as completed.
- **Geen wijzigingen** aan other website pages, UI, SEO content, text, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 90 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Formatter Cleanup for migrated calculator pages

- **Removed local `formatEuro` functions** from:
  - `src/pages/salaris-calculator.astro`
  - `src/pages/bruto-netto-2026.astro`
  - `src/pages/zzp-calculator.astro`
- **Added `formatEuroHtml` to `src/lib/format/currency.ts`:**
  - HTML-aware variant with `&euro;` and `&nbsp;` for `innerHTML` output.
  - Keeps visual output identical to the old local functions.
- **BTW pages already used shared utility** (`formatEuro` from `src/lib/format/currency.ts`) and were left unchanged.
- **New testfile `tests/format/currency.test.ts`** with 6 tests.
- **Geen wijzigingen** aan UI styling, SEO content, calculation logic, HTML ids, DOM wiring, other pages, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 77 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — ZZP Constants moved to Knowledge Layer

- **New Knowledge Objects:**
  - `docs/v2/knowledge/objects/nl.zzp.self_employed_deduction.2026.yml` — self-employed deduction €1.200.
  - `docs/v2/knowledge/objects/nl.zzp.starter_deduction.2026.yml` — starter deduction €2.123.
  - `docs/v2/knowledge/objects/nl.zzp.mkb_profit_exemption.2026.yml` — MKB profit exemption 12.70%.
- **New types:** `entrepreneur_deduction` and `profit_exemption`.
- **`scripts/validate-knowledge.mjs` extended:**
  - Validation for `entrepreneur_deduction` (`deduction_type`, `amount`, `currency`).
  - Validation for `profit_exemption` (`exemption_type`, `rate` between 0 and 1, `currency`).
  - Both types added to official-authority requirement list.
- **`src/lib/knowledge/types.ts` extended:** new interfaces for the two types.
- **`src/lib/calculators/zzp.ts` updated:** ZZP constants now loaded via `resolveRule()` with fallback to hardcoded values.
- **`src/lib/knowledge/generated-objects.ts` regenerated.**
- **`tests/calculators/zzp.test.ts` extended:** resolver tests for the three new objects.
- **`docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` updated:** new types, examples and validation notes.
- **`src/lib/knowledge/README.md` updated:** next steps.
- **Geen wijzigingen** aan website pages, calculator pages, UI, SEO content, text, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 71 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — ZZP Calculator migrated to ZZP Engine

- **`src/pages/zzp-calculator.astro` migrated:**
  - Removed local `calcTax`, `calcAHK`, `calcAK` and iterative reverse-solver loop.
  - Imports `calculateZzpReverse()` from `src/lib/calculators/zzp.ts`.
  - All existing HTML ids, event handlers, error box and output fields preserved.
- **Adapter in page script:** maps input ids to `ZzpInput` and fills output fields from `ZzpResult`.
- **`tests/calculators/zzp.test.ts` extended:**
  - Zero business costs scenario.
  - Zero pension scenario.
  - All deductions off scenario.
  - Negative desired net income scenario.
- **`docs/catalog/calculators.yml` updated:** `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/zzp.ts`.
- **`src/lib/knowledge/README.md` and `src/lib/rules/README.md` updated:** ZZP migration marked as completed.
- **Geen wijzigingen** aan other website pages, UI, SEO content, text, `.env` or dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 68 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — ZZP Engine v0.1 + Tests

- **Nieuwe module** `src/lib/calculators/zzp.ts`:
  - Importeert `calculateBox1Tax2026`, `calculateGeneralTaxCredit2026` en `calculateLabourTaxCredit2026` uit `src/lib/calculators/tax.ts`.
  - Voegt ZZP-specifieke functies toe: `calculateZzpDeductions`, `calculateZzpTaxableIncome`, `calculateZzpTax`, `calculateZzpNetProfit`, `solveRequiredRevenue`, `calculateZzpReverse`.
- **Reverse solver** met binaire zoektocht van gewenst netto maandinkomen naar benodigd uurtarief en jaaromzet.
- **Hardcoded 2026 ZZP-constanten** in `zzp.ts`:
  - Zelfstandigenaftrek €1.200
  - Startersaftrek €2.123
  - MKB-winstvrijstelling 12,70%
  - TODO: verplaatsen naar Knowledge Layer.
- **Nieuwe testfile** `tests/calculators/zzp.test.ts` (12 tests):
  - Aftrekposten met/without starter.
  - Taxable income nooit negatief in winstscenario's.
  - Netto stijgt bij hogere omzet.
  - Solver convergeert binnen max iteraties.
  - Valid resultaat bij normaal scenario.
  - Ongeldige input geeft `valid: false`.
  - Output binnen tolerantie van huidige inline calculator voor 2 scenario's.
- **`docs/v2/zzp/reverse-solver-design.md` aangevuld** met implementatiestatus.
- **Geen wijzigingen** aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 64 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Legacy `getVatRates()` helper removed

- **`getVatRates()` removed from `src/lib/knowledge/objects.ts`:**
  - No production consumers remained; BTW-engine already uses `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })`.
- **`tests/knowledge/vat-rates.test.ts` rewritten:**
  - Tests `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })`.
  - Verifies returned object id is `nl.vat.standard`.
  - Verifies `data.rates` contains `standard: 21`, `reduced: 9`, `zero: 0` and `data.default_rate: 21`.
  - Verifies unknown country `BE` returns `undefined`.
- **`src/lib/knowledge/README.md` updated:**
  - Removed `getVatRates` from the helper list.
  - Code example shows `resolveRule()` only.
  - Status updated to Sprint 028; limitations and next steps updated.
- **`src/lib/rules/README.md` updated:** `getVatRates` removal marked as completed.
- **`docs/v2/03-RULE-ENGINE.md` updated:** openstaande punten reflect `getVatRates` removal in Sprint 028.
- **Geen wijzigingen** aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 51 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Legacy `getVatRates()` helper deprecated

- **`src/lib/knowledge/objects.ts` `getVatRates()` deprecated:**
  - JSDoc `@deprecated` toegevoegd boven de functie.
  - Verwijst naar `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })` als voorkeursoplossing.
  - De functie blijft functioneel ongewijzigd; geen breaking change.
- **`src/lib/knowledge/README.md` bijgewerkt:**
  - `getVatRates` nu gemarkeerd als **legacy compatibility helper**.
  - Voorkeursvoorbeeld toont `resolveRule()` in plaats van `getVatRates()`.
  - Status bijgewerkt naar Sprint 027; beperkingen en volgende stappen aangepast.
- **`docs/v2/03-RULE-ENGINE.md` bijgewerkt:**
  - Openstaande punten: deprecate `getVatRates()` als afgerond in Sprint 027.
- **`tests/knowledge/vat-rates.test.ts` ongewijzigd:**
  - Dekking blijft behouden zolang de helper bestaat.
- **Geen wijzigingen** aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 51 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — BTW Engine via Rule Resolver

- **`src/lib/calculators/btw.ts` gekoppeld aan Rule Resolver:**
  - Haalt actieve BTW-tarieven nu via `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })` uit `src/lib/rules/resolver.ts`.
  - Extraheert `standard`, `reduced` en `zero` uit `data.rates` op basis van `category`.
  - Val terug op `VAT_RATES` in `src/lib/utils/constants.ts` als de resolver niets teruggeeft.
  - Rekenoutput blijft identiek.
- **`tests/calculators/btw.test.ts` uitgebreid:** extra test controleert dat de tarieven uit de Rule Resolver door `isValidBtwRate` worden geaccepteerd.
- **`src/lib/rules/README.md` bijgewerkt:** status Sprint 020, tabel van gekoppelde engines (`btw.ts` wired, `tax.ts` pending), volgende stappen aangescherpt.
- **`src/lib/knowledge/README.md` bijgewerkt:** BTW-engine wordt nu als gekoppeld via de Rule Resolver beschreven; `getVatRates` blijft als legacy helper beschikbaar.
- **Geen wijzigingen** aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 32+ tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Tax Engine via Rule Resolver

- **`src/lib/calculators/tax.ts` gekoppeld aan Rule Resolver:**
  - Box 1-schijven via `resolveRule({ type: "tax_bracket", country: "NL", locale: "nl-NL", year: 2026 })` → `nl.tax.box1.2026`.
  - Algemene heffingskorting via `resolveRule({ type: "tax_credit", country: "NL", locale: "nl-NL", year: 2026, id: "nl.tax.ahk.2026" })`.
  - Arbeidskorting via `resolveRule({ type: "tax_credit", country: "NL", locale: "nl-NL", year: 2026, id: "nl.tax.ak.2026" })`.
  - Data uit `data.brackets`, `data.phase_out`, `data.cut_off` en `data.max` wordt geëxtraheerd en getransformeerd naar de interne reken-shape.
  - Val terug op `TAX_2026`, `AHK_2026` en `AK_2026` in `src/lib/utils/constants.ts` als de resolver niets teruggeeft.
  - Rekenoutput blijft identiek.
- **`tests/calculators/tax.test.ts` uitgebreid:** resolver-wiring tests controleren dat `tax_bracket`, `nl.tax.ahk.2026` en `nl.tax.ak.2026` correct worden gevonden.
- **`src/lib/rules/README.md` bijgewerkt:** status Sprint 021, tabel van gekoppelde engines (`btw.ts` en `tax.ts` wired), volgende stappen aangescherpt naar pagina-migratie.
- **`src/lib/knowledge/README.md` bijgewerkt:** BTW- en Tax-engine worden nu als gekoppeld via de Rule Resolver beschreven; pagina-migratie is een aparte stap.
- **Geen wijzigingen** aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 36 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Bruto Netto 2026 gemigreerd naar Tax Engine

- **`src/pages/bruto-netto-2026.astro` gemigreerd:**
  - Inline `berekenBelasting`, `berekenAHK` en `berekenAK` verwijderd.
  - Gebruikt nu `calculateNetIncomeEstimate2026()` uit `src/lib/calculators/tax.ts`.
  - Adapter binnen de pagina: `pensionRate = (pensionMonthly / grossMonthly) * 100` omdat de pagina een vast pensioenbedrag per maand vraagt en de Tax Engine een percentage verwacht.
  - Alle HTML-id's, resultaatvelden, foutmeldingen en styling ongewijzigd.
  - Rekenoutput numeriek identiek aan de oude inline berekening.
- **`tests/calculators/tax.test.ts` uitgebreid:** regressietests voor de voorbeelden uit `bruto-netto-2026.astro`:
  - €3.000 bruto + €150 pensioen → netto per maand circa €2.665,67.
  - €4.000 bruto + €200 pensioen → netto per maand circa €3.238,99.
- **`docs/catalog/calculators.yml` bijgewerkt:** `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/tax.ts`.
- **`src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt:** `bruto-netto-2026.astro` gemarkeerd als gemigreerd; `salaris-calculator.astro` en `zzp-calculator.astro` nog pending.
- **Geen wijzigingen** aan andere websitepagina’s, UI, SEO-content, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 38 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Salaris Calculator gemigreerd naar Tax Engine

- **`src/pages/salaris-calculator.astro` gemigreerd:**
  - Inline `berekenBelasting`, `berekenAHK` en `berekenAK` verwijderd.
  - Gebruikt nu `calculateNetIncomeEstimate2026()` uit `src/lib/calculators/tax.ts`.
  - Geen adapter nodig: de pagina vraagt al een pensioenpercentage, dat direct wordt doorgegeven als `pensionRate`.
  - Alle HTML-id's, resultaatvelden, foutmeldingen, toggle, event handlers en styling ongewijzigd.
  - Rekenoutput numeriek identiek aan de oude inline berekening.
- **`tests/calculators/tax.test.ts` uitgebreid:** regressietest voor het salaris-calculator voorbeeld met **0% pensioen**:
  - €3.500 bruto + 0% pensioen → netto per maand circa €3.068,52.
- **`docs/catalog/calculators.yml` bijgewerkt:** `engine_version: "1.0"`, `last_review: "2026-06-30"`, notes `Gemigreerd naar src/lib/calculators/tax.ts`.
- **`src/lib/rules/README.md` en `src/lib/knowledge/README.md` bijgewerkt:** `salaris-calculator.astro` gemarkeerd als gemigreerd; alleen `zzp-calculator.astro` nog pending.
- **Geen wijzigingen** aan andere websitepagina’s, UI, SEO-content, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 39 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Tax Engine Input Cleanup: pensionAmount

- **`TaxIncomeInput` uitgebreid in `src/lib/calculators/tax.ts`:**
  - Nieuw optioneel veld `pensionAmount?: number` (maandelijks pensioenbedrag in EUR).
  - `pensionRate` is nu optioneel.
  - Als `pensionAmount` is meegegeven, heeft dit voorrang op `pensionRate`.
  - Negatieve `pensionAmount` wordt veilig als 0 behandeld.
- **`src/pages/bruto-netto-2026.astro` bijgewerkt:**
  - Lokale adapter (`pensionRate = (pensionMonthly / grossMonthly) * 100`) verwijderd.
  - Pagina geeft `pensionAmount` direct door aan `calculateNetIncomeEstimate2026()`.
  - Geen visuele wijziging; output blijft identiek.
- **`salaris-calculator.astro` ongewijzigd:** blijft gebruikmaken van `pensionRate`.
- **`tests/calculators/tax.test.ts` uitgebreid:**
  - `pensionRate` 5% en `pensionAmount` €200 zijn equivalent bij €4.000 bruto.
  - `pensionAmount` heeft prioriteit over `pensionRate`.
  - Bruto-netto-2026 voorbeeld 2 werkt via `pensionAmount`.
  - Negatieve `pensionAmount` wordt als 0 behandeld.
- **Geen wijzigingen** aan UI, SEO-content, andere pagina’s, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 43 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Resolver Caching v0.1

- **`src/lib/rules/resolver.ts` uitgebreid met in-memory cache:**
  - Cache-sleutel gebaseerd op `type`, `country`, `locale`, `year` en optioneel `id`.
  - Zowel gevonden `KnowledgeObject` als `undefined` worden gecached.
  - Herhaalde `resolveRule()`-calls met dezelfde input scannen de registry niet opnieuw.
- **`resolveRule()` API ongewijzigd;** `resolveRuleFromRegistry()` blijft ongecached en testbaar.
- **Nieuwe export `clearRuleResolverCache()`** toegevoegd voor tests en runtime resets.
- **`tests/rules/resolver.test.ts` uitgebreid:**
  - Cache test met `beforeEach(clearRuleResolverCache)` voor isolatie.
  - Herhaalde identieke lookups retourneren hetzelfde object.
  - Onbekende lookups blijven `undefined` en worden gecached.
  - `clearRuleResolverCache()` reset de cache.
- **`src/lib/rules/README.md` bijgewerkt** met Caching-sectie.
- **Geen wijzigingen** aan websitepagina’s, calculatorpagina’s, UI, SEO-content, `.env` of dependencies.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 46 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

---

## 2026-06-29

### Atlas v2 — Atlas Rule Resolver v1

- **Nieuwe module** `src/lib/rules/` met:
  - `resolver.ts` — `resolveRule()` en `resolveRuleFromRegistry()`.
  - `types.ts` — `RuleType`, `RuleResolverInput`, `RuleResolverResult`.
  - `README.md` — architectuur documentatie.
- **Nieuwe testfile** `tests/rules/resolver.test.ts` met 6 tests.
- **Resolver selecteert** actieve Knowledge Objects op `type`, `country`, `locale`, `year` en optioneel `id`.
- **`docs/v2/03-RULE-ENGINE.md` bijgewerkt** met de runtime resolver.
- **Bestaande engines (`btw.ts`, `tax.ts`) nog niet gekoppeld**; voorbehouden aan Sprint 020.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 26+ tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Official Tax Source Alignment 2026

- **`AGENTS.md` gecorrigeerd:** 2026-belastingwaarden aangepast naar officiële Belastingdienst-waarden.
  - Box 1: 35,75% / 37,56% / 49,50% (was 35,82% / 37,48%).
  - AHK max: €3.115 (was €3.068).
  - AK max: €5.685 (was €5.599).
  - AHK- en AK-schijven/brackets toegevoegd.
- **Bronvermelding toegevoegd:** Belastingdienst — voorlopige aanslag 2026, algemene heffingskorting 2026, arbeidskorting 2026.
- **Audit-document bijgewerkt:** `docs/v2/tax/2026-reconciliation-audit.md` bevat nu een correction log en de conclusie dat alle bronnen consistent zijn.
- **Geen wijzigingen** aan websitepagina’s, calculatorlogica, `constants.ts` of Knowledge YAML.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Testresultaat:** 26 tests passed.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Tax Engine v0.1 + Tests

- **Nieuwe module** `src/lib/calculators/tax.ts` met pure functions:
  - `calculateBox1Tax2026(taxableIncome)`
  - `calculateGeneralTaxCredit2026(taxableIncome)`
  - `calculateLabourTaxCredit2026(labourIncome)`
  - `calculateNetIncomeEstimate2026(input)`
- **Nieuwe types:** `TaxIncomeInput`, `TaxIncomeResult`, `TaxBreakdown`.
- **Waarden uit `src/lib/utils/constants.ts`** en consistent met bestaande `salaris-calculator.astro` script.
- **Nieuwe testfile** `tests/calculators/tax.test.ts` met 13 tests.
- **Documentatie bijgewerkt:** `src/lib/knowledge/README.md`.
- **Testresultaat:** 26 tests passed.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Permanent Test Runner + BTW/Knowledge Tests

- **Vitest toegevoegd** als devDependency via `npm install --save-dev vitest`.
- **`package.json` scripts toegevoegd:** `"test": "vitest run"` en `"test:watch": "vitest"`.
- **Teststructuur aangemaakt:**
  - `tests/calculators/btw.test.ts` — 7 tests voor BTW tarief-validatie en berekeningen.
  - `tests/knowledge/vat-rates.test.ts` — 2 tests voor `getVatRates` output en fallback.
  - `tests/knowledge/registry.test.ts` — 4 tests voor registry-inhoud en unieke ids.
- **Testresultaat:** 13 tests passed.
- **Documentatie bijgewerkt:** `src/lib/knowledge/README.md`.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Robuustere VAT Lookup op basis van category

- **`src/lib/knowledge/types.ts` uitgebreid:** nieuw type `VatRateCategory = "standard" | "reduced" | "zero"`; `VatRateData.rates` vereist nu `category`.
- **`src/lib/knowledge/objects.ts` `getVatRates()` aangepast:** selecteert tarieven op `rate.category` in plaats van hardcoded `value`s.
- **Output identiek:** `{ standard: 21, reduced: 9, zero: 0, defaultRate: 21 }`.
- **Veilige fallback:** bij ontbrekende category retourneert `getVatRates()` `undefined`; BTW-engine valt terug op `VAT_RATES`.
- **Documentatie bijgewerkt:** `src/lib/knowledge/README.md` en `docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md`.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Schema Cleanup: VAT Rates

- **`scripts/validate-knowledge.mjs` bijgewerkt:** nieuw `validateVatRateData()` schema voor `type: vat_rate`:
  - `data.rates` moet een niet-lege array zijn.
  - Elke rate moet `label`, `value` (number) en `category` (string) hebben.
  - `data.default_rate` moet een number zijn en overeenkomen met een `value` in `data.rates`.
  - Oude waarschuwing op `data.value` verwijderd.
- **`docs/v2/knowledge/objects/nl.vat.standard.yml` aangevuld:** elke rate heeft nu een `category` (`standard`, `reduced`, `zero`).
- **`docs/v2/knowledge/01-KNOWLEDGE-OBJECTS.md` bijgewerkt:** documentatie van het `vat_rate` data-schema en uitleg over meerdere rates per land.
- **Knowledge validatie:** 0 fouten, 0 waarschuwingen.
- **CDL validatie:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Sync in Build

- **`package.json` build-script aangepast:** `"build": "npm run check:knowledge && astro build"`.
- **Build faalt bij out-of-sync:** `npm run build` controleert eerst of `src/lib/knowledge/generated-objects.ts` synchroon is met de YAML-bronnen.
- **Generatie blijft expliciet:** `npm run generate:knowledge` moet handmatig worden gedraaid; `check:knowledge` genereert en schrijft niet.
- **Getest:** tijdelijke out-of-sync situatie liet `npm run build` correct falen (exit code 1); na regeneratie slaagde de build weer.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.
- **Knowledge validatie:** 0 fouten, 1 waarschuwing (`nl.vat.standard.yml` mist `data.value`).
- **CDL validatie:** 0 fouten over 9 definities.

### Atlas v2 — Knowledge Registry Sync Check v0.1

- **Sync check script** `scripts/check-knowledge-registry.mjs` aangemaakt:
  - Importeert gedeelde functies uit `scripts/generate-knowledge-registry.mjs`.
  - Genereert de registry in het geheugen en vergelijkt byte-voor-byte met `src/lib/knowledge/generated-objects.ts`.
  - Bij verschil: duidelijke foutmelding + instructie `npm run generate:knowledge`.
  - Bij succes: melding dat de registry up-to-date is.
- **Generator gerefactored** (`scripts/generate-knowledge-registry.mjs`):
  - Exporteert `readKnowledgeObjects()` en `generateRegistry()` voor hergebruik.
  - Heeft een guard zodat `generate:knowledge` niet per ongeluk loopt bij import.
- **`package.json` bijgewerkt:** `"check:knowledge": "node scripts/check-knowledge-registry.mjs"`.
- **Generatie blijft expliciet:** geen prebuild toegevoegd.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.
- **Knowledge validatie:** 0 fouten, 1 waarschuwing (`nl.vat.standard.yml` mist `data.value`).
- **CDL validatie:** 0 fouten over 9 definities.

### Atlas v2 — Knowledge Objects Generator v0.1

- **Generator script** `scripts/generate-knowledge-registry.mjs` aangemaakt:
  - Leest alle `.yml` bestanden uit `docs/v2/knowledge/objects/`.
  - Parseert met `js-yaml` en sorteert stabiel op `id`.
  - Genereert `src/lib/knowledge/generated-objects.ts` met `export const generatedKnowledgeObjects = [...] satisfies KnowledgeObject[]`.
- **`src/lib/knowledge/objects.ts` herschreven** tot dunne wrapper:
  - Importeert `generatedKnowledgeObjects`.
  - Houdt `knowledgeObjects`, `getKnowledgeObject`, `getKnowledgeObjectsByType` en `getVatRates` intact.
  - Bevat geen handmatige objectdata meer.
- **`package.json` bijgewerkt:** `"generate:knowledge": "node scripts/generate-knowledge-registry.mjs"`.
- **Generatie is expliciet:** geen automatische generatie in `validate:knowledge` en geen prebuild.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.
- **Knowledge validatie:** 0 fouten, 1 waarschuwing (`nl.vat.standard.yml` mist `data.value`).
- **CDL validatie:** 0 fouten over 9 definities.

### Atlas v2 — BTW-engine gekoppeld aan Knowledge Layer

- **BTW-engine koppeling** in `src/lib/calculators/btw.ts`:
  - `isValidBtwRate`, `validateBtwInput` en de foutmelding gebruiken nu de tarieven uit `getVatRates("NL", "nl-NL")`.
  - `calculateBtw`, `calculateBtwFromExclusive` en `calculateBtwFromInclusive` gebruiken dezelfde rekenlogica; alleen de bron van de tarieven is gewijzigd.
  - Fallback op `VAT_RATES` in `src/lib/utils/constants.ts` als `getVatRates()` `undefined` retourneert.
  - Rekenoutput is identiek aan vóór Sprint 009.
- **Type-only import fix** in `src/lib/knowledge/objects.ts`: `import type { KnowledgeObject, VatRateKnowledgeObject }` zodat Vite geen runtime-waarschuwing meer geeft.
- **Documentatie bijgewerkt:** `src/lib/knowledge/README.md` aangepast.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.
- **Knowledge validatie:** 0 fouten, 1 waarschuwing (`nl.vat.standard.yml` mist `data.value`).
- **CDL validatie:** 0 fouten over 9 definities.
- **Testcases BTW-engine:** 0 fouten.

### Atlas Calculator Engine — BTW-cluster gemigreerd

- **Atlas Calculator Engine basis aangemaakt** in `src/lib/`:
  - `src/lib/format/currency.ts` — gedeelde formatting voor euro's en getallen.
  - `src/lib/validation/input.ts` — veilige invoer-parsing.
  - `src/lib/validation/rules.ts` — herbruikbare validatieregels.
  - `src/lib/utils/constants.ts` — gedeelde constanten (BTW-tarieven, 2026 belastingtarieven).
  - `src/lib/types/calculator.ts` — gedeelde TypeScript-types.
- **BTW-engine toegevoegd** in `src/lib/calculators/btw.ts`:
  - `calculateBtw`, `calculateBtwFromExclusive`, `calculateBtwFromInclusive`, `isValidBtwRate`.
  - Ondersteuning voor 0%, 9% en 21%.
  - Pure functies, geen DOM, geen HTML, geen storage.
- **3 BTW-calculators gemigreerd** naar de centrale engine:
  - `src/pages/btw-calculator.astro`
  - `src/pages/btw-terugrekenen.astro`
  - `src/pages/btw-inclusief-exclusief.astro`
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.
- **Documentatie bijgewerkt:** `04-COMPONENT-LIBRARY.md`, `05-CALCULATOR-STANDARDS.md`, `catalog/calculators.yml`.

### Atlas v2 — Calculator Definition Language v0.1 compleet

- **CDL-definities voor alle 9 calculators** toegevoegd in `docs/v2/definitions/`:
  - `btw-calculator.yml`, `btw-terugrekenen.yml`, `btw-inclusief-exclusief.yml`
  - `salaris-calculator.yml`, `bruto-netto-2026.yml`
  - `hypotheek-calculator.yml`
  - `zzp-calculator.yml`
  - `toeslagen-calculator.yml`
  - `auto-importkosten-berekenen.yml`
- Elke definitie beschrijft inputs, outputs, regels, journeys, SEO, bronnen, disclaimers en privacy op basis van bestaande pagina's en `docs/catalog/calculators.yml`.
- **YAML-validatie:** alle 9 definities laden succesvol via `js-yaml`.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — CDL Validator v0.1

- **Validator toegevoegd** in `scripts/validate-cdl.mjs`:
  - Leest alle `.yml` bestanden in `docs/v2/definitions/` (slaat `README.md` en `calculator-definition.schema.md` over).
  - Controleert verplichte velden, `id`, `slug`, `route`, `locale`, `country`, `inputs`, `outputs`, `sources`, `privacy`, `maintenance`.
  - Controleert engine-referentie afhankelijk van migratie-status: BTW → `src/lib/calculators/btw.ts`, niet-gemigreerd → `src/pages/...astro`.
  - Eindigt met exit code `0` bij succes, `1` bij fouten.
- **Script toegevoegd** aan `package.json`: `"validate:cdl": "node scripts/validate-cdl.mjs"`.
- **Validator slaagt** voor alle 9 calculator-definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

> **Let op:** js-yaml is op dit moment beschikbaar als transitieve dependency. Voor robuustheid kan deze expliciet als `devDependency` worden toegevoegd.

### Atlas v2 — CDL Schema v0.2 + Validator v0.2 + dependency fix

- **Dependency fix:** `js-yaml` expliciet toegevoegd als `devDependency` (`npm install --save-dev js-yaml`). `package.json` en `package-lock.json` bijgewerkt.
- **Schema hardening:** `docs/v2/definitions/calculator-definition.schema.md` bijgewerkt naar v0.2 met formele specificaties voor top-level velden, inputs, outputs, privacy levels, sources en maintenance.
- **Validator uitgebreid:** `scripts/validate-cdl.mjs` v0.2 controleert nu:
  - `priority`: A/B/C
  - `status`, `category`, `title`, `description`
  - inputs: `name`, `label`, `type`, `required`, `privacy_level`
  - input types: `money`, `number`, `percentage`, `date`, `select`, `radio`, `checkbox`, `text`
  - outputs: `name`, `label`, `type`
  - output types: `money`, `number`, `percentage`, `text`, `date`
  - privacy levels: `non_personal`, `financial_input`, `personal_input`, `sensitive`
  - `maintenance.update_frequency`, `maintenance.source_review_required`
  - `seo.title` en `seo.description`
  - sources: `label` en `url` per bron
- **YAML-definities aangepast:** alle 9 bestanden in `docs/v2/definitions/` geautomatiseerd geconverteerd naar v0.2:
  - input/output identifiers van `id` naar `name`
  - format-velden naar semantische types (`money`, `percentage`, `number`, `text`)
  - `privacy_level` toegevoegd aan inputs
  - bron `name` → `label`
  - `maintenance.source_review_required` toegevoegd
  - priority integers → A/B/C
- **Validator slaagt:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Rule Engine Specification v0.1 + CDL Validator v0.3

- **Rule Engine spec:** `docs/v2/03-RULE-ENGINE.md` herschreven naar v0.1:
  - Doel en scheiding van Calculation Engine vs Rule Engine.
  - Land/locale scheiding en multi-country architectuur (NL, BE, DE, ES, FR).
  - Bronkoppeling met `authority_level` (`official`, `semi_official`, `editorial`, `internal`).
  - Rule versions en hardcoded-regel verbod.
  - Aansluiting op `calculator_module` en `engine_reference`.
- **CDL schema update:** `docs/v2/definitions/calculator-definition.schema.md` rule-sectie bijgewerkt naar v0.1 met verplichte velden, toegestane rule types, source-structuur en optionele velden.
- **Validator v0.3:** `scripts/validate-cdl.mjs` controleert nu:
  - `rules` is een niet-lege array.
  - Elke rule heeft `id`, `type`, `locale`, `country`, `version`, `applies_to`, `source`, `status`.
  - `rule.type` is één van de 9 toegestane types.
  - `rule.status` is `active`, `draft` of `deprecated`.
  - `rule.source` heeft `label`, `url`, `authority_level` met geldige waarde.
  - `rule.applies_to` wijst naar bestaande input/output `name` of `calculator`.
  - `rule.locale`/`country` matchen de calculator, tenzij `cross_locale_allowed: true`.
- **YAML-definities geconverteerd:** alle 9 calculators hebben gestandaardiseerde `rules`:
  - BTW: `vat_rate`, `manual_input`
  - Salaris/Bruto-netto/ZZP: `tax_bracket`, `tax_credit`, `manual_input`
  - Hypotheek: `mortgage_formula`, `annuity_formula`, `manual_input`
  - Toeslagen: `allowance_threshold`, `informational`, `manual_input`
  - Auto import: `import_cost`, `manual_input`, `informational`
- **Validator slaagt:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Layer v1

- **Nieuwe documentatiemap** `docs/v2/knowledge/` met:
  - `README.md` — overzicht en principes.
  - `00-KNOWLEDGE-ARCHITECTURE.md` — lagenmodel en scheiding van verantwoordelijkheden.
  - `01-KNOWLEDGE-OBJECTS.md` — structuur van kennisobjecten.
  - `02-VERSIONING.md` — versionering en levensduur.
  - `03-OFFICIAL-SOURCES.md` — bronkoppeling en authority levels.
  - `04-RELATIONSHIPS.md` — relaties tussen objecten en calculators.
  - `05-COUNTRIES.md` — multi-country en locale fallback.
  - `06-AUTHORITY-SYSTEM.md` — vertrouwensniveaus.
  - `07-KNOWLEDGE-LIFECYCLE.md` — levenscyclus van objecten.
  - `08-AI-USAGE.md` — AI gebruik als ground truth.
- **Concrete kennisobjecten** in `docs/v2/knowledge/objects/`:
  - `nl.vat.standard.yml` — BTW-tarieven.
  - `nl.tax.box1.2026.yml` — Box 1 schijven.
  - `nl.tax.ahk.2026.yml` — Algemene heffingskorting.
  - `nl.tax.ak.2026.yml` — Arbeidskorting.
  - `nl.mortgage.annuity.yml` — Annuïteitsformule.
  - `nl.allowance.health.yml` — Zorgtoeslag drempels.
  - `nl.allowance.rent.yml` — Huurtoeslag drempels.
  - `nl.import.bpm.manual.yml` — Bpm handmatige invoer.
- **Principes:** kennisobjecten bevatten alleen feiten, geen HTML, Astro, JavaScript of berekeningen.
- **Alle kennisobjecten geladen** als geldige YAML.
- **Validator slaagt:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

### Atlas v2 — Knowledge Layer Validator v0.1

- **Validator toegevoegd:** `scripts/validate-knowledge.mjs`.
- **Script toegevoegd aan `package.json`:** `"validate:knowledge": "node scripts/validate-knowledge.mjs"`.
- **Validatieregels:**
  - Verplichte velden: `id`, `type`, `country`, `locale`, `title`, `description`, `status`, `effective_from`, `authority`, `sources`, `relationships`, `used_by`, `version`, `tags`, `notes`.
  - `id` matcht bestandsnaam zonder `.yml`.
  - `id` begint met landnamespace (`nl.`, etc.).
  - `status` is `active`, `draft` of `deprecated`.
  - `effective_from` en `effective_until` zijn geldige ISO-datum of `null`.
  - `effective_until` ligt niet vóór `effective_from`.
  - `authority` bevat `name` en `level`.
  - `authority.level` is `official`, `semi_official`, `editorial` of `internal`.
  - `sources` is een niet-lege array; elke source heeft `label`, `url` en `authority_level`.
  - `relationships`, `used_by` en `tags` zijn arrays.
  - `notes` is aanwezig.
- **Extra controles:**
  - Waarschuwing als `used_by` verwijst naar een onbekende calculator-id.
  - Waarschuwing als `type: vat_rate` maar `data.value` ontbreekt.
  - Waarschuwing als belasting/toeslagen/BPM-object geen `authority.level: official` heeft.
- **Kennisobjecten gecorrigeerd:** `authority.source` omgenoemd naar `authority.name` in alle 8 objecten.
- **Validatie resultaat:** 8 objecten gecontroleerd, 0 fouten, 1 waarschuwing (`nl.vat.standard.yml` mist `data.value`).
- **CDL validatie:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

> **Let op:** Dit is een documentatie-update. De primaire changelog blijft `05_changelog.md` in de project-root. Synchroniseer wijzigingen in beide bestanden.

### Atlas v2 — Rule Resolver Prototype v0.1

- **Nieuwe runtime module** `src/lib/knowledge/`:
  - `types.ts` — TypeScript interfaces: `AuthorityLevel`, `KnowledgeStatus`, `KnowledgeSource`, `KnowledgeAuthority`, `KnowledgeObject`, `VatRateKnowledgeObject`.
  - `objects.ts` — In-memory registry met 8 Knowledge Objects, plus helper functies:
    - `getKnowledgeObject(id)`
    - `getKnowledgeObjectsByType(type)`
    - `getVatRates(country, locale)`
  - `README.md` — Prototype documentatie.
- **Static mirror:** `objects.ts` bevat een kopie van de YAML-objecten uit `docs/v2/knowledge/objects/`, gegenereerd via een tijdelijk script. De browserbundle bevat geen YAML-parser of file-system reads.
- **VAT helper:** `getVatRates("NL", "nl-NL")` retourneert `{ standard: 21, reduced: 9, zero: 0, defaultRate: 21, sourceLabel }`.
- **Nog niet gekoppeld:** bestaande calculators en `src/lib/calculators/btw.ts` blijven ongewijzigd.
- **Knowledge object fix:** tags gestringified naar tekst voor TypeScript-compatibiliteit.
- **Knowledge validatie:** 0 fouten, 1 waarschuwing (`data.value` in `nl.vat.standard`).
- **CDL validatie:** 0 fouten over 9 definities.
- **Build succesvol:** 15 pagina's, sitemap met 15 HTTPS-URL's, geen TypeScript-fouten.

> **Let op:** Dit is een documentatie-update. De primaire changelog blijft `05_changelog.md` in de project-root. Synchroniseer wijzigingen in beide bestanden.

## 2026-06-27

_Zie root `05_changelog.md` voor actuele inhoud._

## 2026-06-26

_Zie root `05_changelog.md` voor actuele inhoud._

---

> **Let op:** Dit bestand is een kopie. De primaire changelog is en blijft `05_changelog.md` in de project-root.  
> Synchroniseer wijzigingen in beide bestanden.
