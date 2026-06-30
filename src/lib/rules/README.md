# Atlas Rule Resolver v1

> **Status:** v1 + Version Selection v0.1 + Fallback Diagnostics v0.1 + Runtime Fallback Warnings v1 + BE Country Fallback Object + Engine Acceptance Tests (BTW/Tax/ZZP/Mortgage/Allowances/Import) + Mortgage/Allowance/Import Constants Wired + Allowance Naming Cleanup + Explicit Fallback Warning Test (`fr-BE` → `BE`) + Version Parameter (`version?: string`) + QA Script Version Checks + Multi-version Selection Test Scenario + Rule Impact Analysis Tool v0.4 (with relationships diff + JSON export + importable `compareObjects`) + Knowledge Changelog Generator v0.4 (with Git Diff Auto Impact Reports incl. same-id historical diffs) + Local CI Check Script v0.4 (with Markdown + JSON reports + Timings) + GitHub Actions CI Workflow v0.1 + GitHub Readiness Checklist (push checklist, branch protection, Actions runbook) + Active German Income Tax Object 2026 (`de.tax.income.2026`) + Active Belgian Income Tax Object 2026 (`be.tax.income.2026`) + Active Belgian Income Tax Country Fallback Object 2026 (`be.tax.income.country_fallback.2026`) + Draft French Income Tax Object 2026 (`fr.tax.income.2026`) + Draft Spanish Income Tax Object 2026 (`es.tax.income.2026`) + GitHub Activation Runbook (`docs/v2/ci/03-GITHUB-ACTIVATION-RUNBOOK.md`) + CI docs index (`docs/v2/ci/README.md`) — Atlas v2 Sprint 075
> **Location:** `src/lib/rules/`

---

## Purpose

The Rule Resolver is the thin boundary between the **Knowledge Layer** and the **Calculator Engines**.

```
Knowledge Layer (YAML → generated-objects.ts)
              ↓
      Rule Resolver (resolveRule)
              ↓
   Calculator Engine (tax.ts, btw.ts, ...)
```

Calculator engines must **never** read `knowledgeObjects` directly. They call `resolveRule()` with a `type`, `country`, `locale`, and `year`. The resolver selects the most appropriate active Knowledge Object and returns it. The engine then extracts the parameters it needs from the object's `data` field.

This separation guarantees that:

- Engines stay generic and reusable across countries.
- Knowledge stays in the Knowledge Layer, which remains the source of truth.
- Fallback, versioning, and locale handling can be added in one place without touching every calculator.

---

## Files

| File | Role |
|---|---|
| `types.ts` | Rule types, resolver input and result types. |
| `resolver.ts` | `resolveRule()` and `resolveRuleFromRegistry()` implementation. |
| `README.md` | This documentation. |

---

## API

```ts
import { resolveRule } from "../rules/resolver";

const vat = resolveRule({
  type: "vat_rate",
  country: "NL",
  locale: "nl-NL",
  year: 2026,
});

// Optional: request a specific object version
const vatVersioned = resolveRule({
  type: "vat_rate",
  country: "NL",
  locale: "nl-NL",
  year: 2026,
  version: "2026-01-01",
});

if (vat) {
  const { standard, reduced, zero } = vat.data; // engine-specific extraction
}
```

Input fields:

- `type`: one of the supported `RuleType` values.
- `country`: ISO 3166-1 alpha-2 country code.
- `locale`: BCP-47 locale string.
- `year`: the year the rule must be active for.
- `id` (optional): exact Knowledge Object id to match.
- `version` (optional): exact Knowledge Object `version` to match. When omitted, the most recent active object within the requested year is selected.
- `warnOnFallback` (optional): when `true`, the resolver may invoke `onFallback` for fallback locale matches.
- `onFallback` (optional): callback invoked when a fallback locale is used and `warnOnFallback` is `true`.

Return value: a `KnowledgeObject` or `undefined` if no matching active rule is found.

---

## Matching rules

`resolveRule` performs the following steps:

1. Filter by `type`, `country`, `locale`.
2. Require `status === "active"`.
3. Check that the requested `year` overlaps with `effective_from` / `effective_until`.
4. If `id` is provided, return only an object with that exact id. If no such object matches, return `undefined`.
5. Otherwise, return the most recently effective object (`effective_from` descending).

Future versions will add:

- ✅ In-memory caching for repeated lookups (added in Sprint 025).
- ✅ Locale fallback (`nl-NL` → `nl` → `country` → `default`) (added in Sprint 026).
- ✅ Version selection when multiple versions exist for the same year (added in Sprint 040).
- ✅ Fallback diagnostics counters for dev/test/AI QA (added in Sprint 042).
- ✅ Runtime fallback warnings via `warnOnFallback` + `onFallback` (added in Sprint 044).
- ✅ Explicit `version` parameter for exact version matching (added in Sprint 053).
- Explicit rule priority/override markers.

---

## Caching

`resolveRule()` keeps an in-memory cache of recent lookups. The cache key is built from `type`, `country`, `locale`, `year`, `id` (when provided), and `version` (when provided). Both positive results and `undefined` are cached, so repeated calls with the same input do not re-scan the registry.

The cache is private to the module. To reset it (for example in tests or after a hot-reload of the registry), call `clearRuleResolverCache()`:

```ts
import { clearRuleResolverCache } from "../rules/resolver";

clearRuleResolverCache();
```

`resolveRuleFromRegistry()` is intentionally uncached; it remains the testable, pure filtering function.

---

## Diagnostics (dev/test/AI QA only)

`resolveRule()` collects aggregated, non-PII counters that can be used to detect unexpected fallback usage or cache misses during development, testing or AI QA:

```ts
import { getRuleResolverDiagnostics, clearRuleResolverDiagnostics } from "../rules/resolver";

const d = getRuleResolverDiagnostics();
// d.totalLookups
// d.cacheHits
// d.cacheMisses
// d.notFoundLookups
// d.fallbackLocaleHits

clearRuleResolverDiagnostics(); // resets counters, does not clear cache
```

Rules:

- No personal data, input values or user identifiers are stored.
- The resolver exposes only a snapshot via `getRuleResolverDiagnostics()`.
- Counters are updated only inside `resolveRule()`; `resolveRuleFromRegistry()` stays pure.
- These diagnostics are not intended for user tracking or production analytics.

---

## Runtime fallback warnings (v1)

`resolveRule()` supports an optional callback that is invoked when a rule is resolved through a less-specific fallback locale:

```ts
import { resolveRule } from "../rules/resolver";

const vat = resolveRule({
  type: "vat_rate",
  country: "BE",
  locale: "fr-BE",
  year: 2026,
  warnOnFallback: true,
  onFallback: (info) => {
    // info.requestedCountry
    // info.requestedLocale
    // info.resolvedCountry
    // info.resolvedLocale
    // info.requestedType
    // info.resolvedId
  },
});
```

Rules:

- The callback is only invoked when `warnOnFallback: true` **and** `onFallback` is provided **and** the result came from a fallback locale (`result.locale !== input.locale`).
- It is invoked on both cache misses and cache hits, so every `resolveRule()` call can be observed.
- The resolver never uses `console.log`; warnings are delivered only through the caller-supplied callback.
- The callback receives no input values, user data, or PII — only resolution metadata.

Use cases include QA assertions that verify a specific calculator does not silently fall back, dev tooling that surfaces missing locales, and future UI warnings when a rule originates from another locale. For example, `resolveRule({ type: "vat_rate", country: "BE", locale: "fr-BE", year: 2026, warnOnFallback: true, onFallback: ... })` resolves to `be.vat.country_fallback` (locale `BE`) and reports the fallback via the callback. Similarly, `resolveRule({ type: "tax_bracket", country: "BE", locale: "fr-BE", year: 2026, warnOnFallback: true, onFallback: ... })` resolves to `be.tax.income.country_fallback.2026` (locale `BE`) and reports the fallback.

**Verified in Sprint 052:** `tests/rules/resolver.test.ts` contains explicit tests for both the `fr-BE` → `BE` VAT fallback warning and the `nl-BE` exact match (no callback). `scripts/qa-rule-resolver.mjs` also performs a live warning check against the YAML sources. Sprint 072 added the same coverage for Belgian income tax.

---

## Multi-version selection (test-only scenario)

Sprint 055 proved that `resolveRule()` handles multiple active versions of the same object correctly. Because no real Knowledge Objects currently have multiple active versions, the test uses a custom in-memory registry in `tests/rules/resolver.test.ts`:

- Two mock objects: `nl.vat.standard.2025` (`version: "2025-01-01"`, `standard: 21`) and `nl.vat.standard.2026` (`version: "2026-01-01"`, `standard: 22`).
- Without `version` and `year: 2026`, the resolver picks the most recently effective active version: `nl.vat.standard.2026`.
- With `version: "2025-01-01"`, the resolver explicitly selects the 2025 version, even for year 2026.
- With `version: "2026-01-01"`, the resolver selects the 2026 version.
- With an unknown `version`, the resolver returns `undefined`.
- With `year: 2025` and no `version`, the resolver selects the 2025 version (the 2026 version is excluded by its effective date).
- `id` + `version` work together: an exact `id` within the requested version is returned; an `id` with a mismatched `version` returns `undefined`.

This test does not touch real YAML Knowledge Objects, so production data remains unchanged.

---

## Why engines must not read knowledgeObjects directly

The Knowledge Layer stores facts: tax brackets, VAT rates, thresholds, etc. The Rule Resolver decides which fact applies to a specific calculation context. The engine only knows how to calculate.

If an engine read `knowledgeObjects` directly, it would have to embed the same selection logic (active status, effective dates, locale fallback, version selection) in every engine. The Rule Resolver centralises that logic, keeping engines small and reusable.

---

## Wired engines

| Engine | Rule type | Status |
|---|---|---|
| `src/lib/calculators/btw.ts` | `vat_rate` | Wired in Sprint 020 via `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })`. Falls back to `VAT_RATES` when the resolver returns nothing. |
| `src/lib/calculators/tax.ts` | `tax_bracket`, `tax_credit` | Wired in Sprint 021 via `resolveRule({ type: "tax_bracket", ... })`, `resolveRule({ type: "tax_credit", id: "nl.tax.ahk.2026", ... })` and `resolveRule({ type: "tax_credit", id: "nl.tax.ak.2026", ... })`. Falls back to `TAX_2026`, `AHK_2026` and `AK_2026` when the resolver returns nothing. |

---

## Next steps

- Migrate calculator pages to central engines instead of inline scripts.
  - ✅ `bruto-netto-2026.astro` — migrated in Sprint 022.
  - ✅ `salaris-calculator.astro` — migrated in Sprint 023.
  - ✅ `zzp-calculator.astro` — migrated in Sprint 031.
  - ✅ `hypotheek-calculator.astro` — migrated in Sprint 034.
  - ✅ `toeslagen-calculator.astro` — migrated in Sprint 035.
  - ✅ `auto-importkosten-berekenen.astro` — migrated in Sprint 036.
- ✅ Remove/deprecate `getVatRates()` from `src/lib/knowledge/objects.ts` — completed in Sprint 028.
- Add multi-country support and exercise the locale fallback with non-NL objects.
  - ✅ `be.vat.standard` added in Sprint 037; `resolveRule({ type: "vat_rate", country: "BE", locale: "nl-BE", year: 2026 })` returns the Belgian VAT object.
  - ✅ `fr.vat.standard` added in Sprint 038; `resolveRule({ type: "vat_rate", country: "FR", locale: "fr-FR", year: 2026 })` returns the French VAT object.
  - ✅ `de.vat.standard` added in Sprint 039; `resolveRule({ type: "vat_rate", country: "DE", locale: "de-DE", year: 2026 })` returns the German VAT object.
  - ✅ `es.vat.standard` added in Sprint 039; `resolveRule({ type: "vat_rate", country: "ES", locale: "es-ES", year: 2026 })` returns the Spanish VAT object.
  - ✅ First non-VAT multi-country object added in Sprint 041: `de.tax.income.2026` (draft `tax_bracket`).
  - ✅ `de.tax.income.2026` activated in Sprint 070 after official source review.
  - ✅ `be.tax.income.2026` added in Sprint 071 based on FOD Financiën rates for income year 2026 / assessment year 2027.
  - ✅ `be.tax.income.country_fallback.2026` added in Sprint 072 so `fr-BE` lookups fall back to the `BE` locale.
  - ✅ `fr.tax.income.2026` added in Sprint 073 as a draft because the official French income tax rates for income year 2026 / taxation 2027 are not yet published (the published "barème 2026" applies to 2025 income / 2026 taxation).
  - ✅ `es.tax.income.2026` added in Sprint 074 as a draft because the official Spanish IRPF scale for 2026 income is not yet published by the Agencia Tributaria.
  - Next: activate `fr.tax.income.2026` and/or `es.tax.income.2026` once official 2026 brackets are published, or build a Belgian/German/French/Spanish tax calculator page.

---

## QA Script

Run `npm run qa:rules` to execute `scripts/qa-rule-resolver.mjs`. This script performs a fixed set of safe lookups against the YAML Knowledge Layer sources and reports pass/fail results plus resolver diagnostics. It verifies BE VAT and BE income tax `fr-BE` → `BE` country fallback resolution, exact `nl-BE` matches, and the `version` parameter (e.g. NL VAT with correct version, NL VAT with unknown version returning `undefined`, and `fr-BE` fallback with version). It does not touch website code, calculator engines or user data.

---

## Rule Impact Analysis Tool

Run `npm run rule:impact -- --from <object-id> --to <object-id>` to compare two Knowledge Objects and see the potential impact of their differences. Example:

```bash
npm run rule:impact -- --from nl.vat.standard --to be.vat.standard
```

Add `--json` for machine-readable output (only JSON to stdout):

```bash
npm run rule:impact -- --from nl.vat.standard --to be.vat.standard --json
```

The tool (`scripts/rule-impact.mjs`) reads the YAML sources, compares metadata, `data`, `sources`, `used_by`, and `relationships`, and reports a simple risk level (`low`/`medium`/`high`). Relationships are compared by `relation`, `target`, and optional `description`, with shared/only-in-from/only-in-to listings. JSON mode writes only JSON to stdout and is intended for CI and documentation generation. It is intended for local QA and source-change analysis, not for production use. It does not touch website code, calculator engines or user data.

---

## Knowledge Changelog Generator

Run `npm run knowledge:changelog -- --from <object-id> --to <object-id>` to generate a Markdown changelog from the Rule Impact JSON output. Example:

```bash
npm run knowledge:changelog -- --from nl.vat.standard --to be.vat.standard
```

Write to a file:

```bash
npm run knowledge:changelog -- --from nl.vat.standard --to be.vat.standard --output docs/v2/knowledge/CHANGELOG.md
```

The generator (`scripts/knowledge-changelog.mjs`) calls `rule-impact` with `--json` and transforms the result into a human-readable Markdown report. It does not reimplement the diff logic. It is intended for documentation, PR reviews, and CI reporting. It does not touch website code, calculator engines or user data.

---

## Knowledge Changelog Git Diff Mode v0.4

Since Sprint 067, `knowledge-changelog --git-diff --auto` generates full historical `from`/`to` comparisons for modified objects with unchanged IDs, in addition to the existing automatic impact reports for added, deleted, renamed and ID-changed objects.

Usage:

```bash
npm run knowledge:changelog -- --git-diff
npm run knowledge:changelog -- --git-diff --base HEAD~1
npm run knowledge:changelog -- --git-diff --auto --base HEAD~1
npm run knowledge:changelog -- --git-diff --auto --base HEAD~1 --output docs/v2/knowledge/CHANGELOG.md
```

What `--auto` does:

- Runs `git diff --name-status --diff-filter=AMDR <base> -- docs/v2/knowledge/objects/`.
- Produces a Markdown report with a “Changed Knowledge Objects” table and an “Impact details” section per object.
- Per status:
  - **Modified, same id:** reads the base version via `git show` and the current version from disk; parses both as YAML and reuses the same `rule-impact` comparison logic to produce a full context, data, sources, used_by and relationships diff, plus risk level and affected consumers.
  - **Modified, different id:** attempts `rule-impact --from <old-id> --to <new-id>` and shows risk + affected consumers.
  - **Renamed:** reads old and new ids. If both ids differ and exist in the current registry, calls `rule-impact`; otherwise shows a rename summary.
  - **Added:** reports “new object added” and shows `used_by` consumers from the new object.
  - **Deleted:** reports “object deleted” and shows `used_by` consumers from the base version (`git show <base>:<path>`).

Object id and `used_by` resolution:

- Content is read via `git show` (base version) or from the current file.
- The `id:` line is extracted with a simple parser; falls back to filename if not found.
- `used_by:` is extracted the same way (simple list support; inline arrays are not required).

Limitations (v0.4):

- Same-id historical comparisons depend on valid YAML in both the base and current versions; if YAML parsing fails, the script falls back to the previous `used_by` diff.
- `used_by` parsing may fail if it is not formatted as a simple list.
- Rename detection depends on git’s content similarity heuristic.
- Requires a git repository.

This is intended for local QA, PR review, and CI reporting. It does not touch runtime code, calculator engines or user data.

---

## Local CI Check Script

Run `npm run atlas:check` to execute all Atlas quality checks in the correct order:

```bash
npm run atlas:check
```

Optionally write a Markdown report, a JSON report, or both:

```bash
npm run atlas:check -- --report atlas-check-report.md
npm run atlas:check -- --json-report atlas-check-report.json
npm run atlas:check -- --report atlas-check-report.md --json-report atlas-check-report.json
```

Steps (in order):

1. `npm run generate:knowledge`
2. `npm run check:knowledge`
3. `npm run validate:knowledge`
4. `npm run validate:cdl`
5. `npm run test`
6. `npm run qa:rules`
7. `npm run build`

The script (`scripts/atlas-ci-check.mjs`) prints `[RUN]`, `[PASS]` or `[FAIL]` per step, including the duration of each step (e.g. `[PASS] Build Astro site (2.08s)`). It stops at the first failure, and exits with code `1` on failure or `0` when all steps pass. When `--report` is provided, a Markdown report is written at the end (or just before exiting on failure). The report contains the timestamp, overall status, **total duration**, a step table with a duration column, and a failure-details section with the failing step’s duration and reason. When `--json-report` is provided, a machine-readable JSON report is written with `generated_at`, `overall_status`, `total_duration_ms` and a `steps` array; output directories are created automatically, and the JSON report can be combined with `--report`. It does not run a deploy or `npm ci`, and it does not hide command output. It is intended for local development, pre-PR checks, and as the local step used by the GitHub Actions CI workflow (Sprint 068). It does not touch runtime code, calculator engines or user data.

---

## GitHub Actions CI Workflow

Sprint 068 adds `.github/workflows/atlas-ci.yml`. It runs the same `npm run atlas:check` command on every pull request and every push to `main`.

Trigger:

- `pull_request`
- `push` to `main`

Steps:

1. Check out the repository with `actions/checkout@v4`.
2. Set up Node.js 22 with `actions/setup-node@v4` and npm caching.
3. Install dependencies with `npm ci`.
   - We use `npm ci` because `package-lock.json` is present. It gives a clean, reproducible install and does not modify the lockfile, unlike `npm install`.
4. Run Atlas CI checks:
   ```bash
   npm run atlas:check -- --report reports/atlas-check-report.md --json-report reports/atlas-check-report.json
   ```
5. Upload both reports as an artifact with `actions/upload-artifact@v4` and `if: always()`, so reports are available even when the checks fail.

The workflow does not deploy, uses no secrets, and does not call Cloudflare/Wrangler. It is purely for validation, testing and building.

See `docs/v2/ci/` for the full GitHub readiness checklist, branch protection guide, failure runbook and step-by-step activation runbook. Start with `docs/v2/ci/README.md`.

---

## Engine acceptance tests

`tests/calculators/engine-acceptance.test.ts` verifies that existing calculator engines do not encounter missing rules or unexpected locale fallbacks when loading their rules:

- Resets resolver cache and diagnostics before each test.
- Dynamically imports the engine so rules are resolved during the test.
- Asserts `notFoundLookups === 0` and `fallbackLocaleHits === 0` after a normal NL calculation.

Covered engines: BTW, Tax (2026 net income), ZZP, Mortgage, Allowances, Import Costs. Engines that do not yet use Knowledge Layer rules show 0 lookups and still must not produce `notFoundLookups` or `fallbackLocaleHits`. These tests catch Knowledge Layer regressions without requiring a production calculator build.
