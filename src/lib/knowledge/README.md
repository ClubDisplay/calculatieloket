# Atlas Knowledge Layer — Runtime Prototype v0.1

> **Status:** Prototype — Atlas v2 Sprint 075  
> **Locatie:** `src/lib/knowledge/`

---

## Doel

Dit is een eerste runtime-helper voor de Atlas Knowledge Layer. Het biedt een in-memory registry van Knowledge Objects die later door de Rule Engine en Calculation Engine gebruikt kan worden.

> **Belangrijk:** dit is een prototype. De YAML-bestanden in `docs/v2/knowledge/objects/` blijven de **bron van waarheid**. `src/lib/knowledge/generated-objects.ts` is een automatisch gegenereerde spiegel; `objects.ts` is de runtime wrapper die deze importeert.

---

## Bestanden

| Bestand | Rol |
|---|---|
| `types.ts` | TypeScript-types voor Knowledge Objects. |
| `generated-objects.ts` | **Auto-gegenereerde** registry van YAML (niet handmatig bewerken). |
| `objects.ts` | Runtime wrapper; importeert `generated-objects.ts` en exporteert helpers. |
| `README.md` | Deze documentatie. |

---

## Hoe het werkt

### Statische registry

`objects.ts` exporteert `knowledgeObjects`: een array met alle Knowledge Objects als plain TypeScript-objecten. De array is een kopie van `generated-objects.ts`, dat wordt gegenereerd uit de YAML-bronnen:

- Heeft de browserbundle geen YAML-parser nodig.
- Wordt er geen file-system code in de client gebundeld.
- Kan TypeScript de data statisch typen.

```ts
import { knowledgeObjects, getKnowledgeObject } from "./objects";

const vat = getKnowledgeObject("nl.vat.standard");
```

### Generatie

Om de runtime registry bij te werken na wijzigingen in YAML:

```bash
npm run generate:knowledge
```

Dit leest alle `.yml` bestanden in `docs/v2/knowledge/objects/`, sorteert ze stabiel op `id`, en schrijft `src/lib/knowledge/generated-objects.ts`. Generatie is **expliciet**; `npm run build` voert alleen een check uit en faalt bij out-of-sync.

### Sync check

Om te controleren of `generated-objects.ts` nog synchroon is met de YAML-bronnen:

```bash
npm run check:knowledge
```

Dit genereert de registry in het geheugen, vergelijkt deze byte-voor-byte met de bestaande `generated-objects.ts`, en geeft een duidelijke foutmelding als `npm run generate:knowledge` nodig is. `npm run build` voert deze check automatisch uit en faalt als de registry out-of-sync is.

### Helper functies

- `getKnowledgeObject(id)`: zoekt een object op id.
- `getKnowledgeObjectsByType(type)`: geeft alle objecten van een bepaald type.

VAT-tarieven (en alle andere regels) worden **uitsluitend via de Rule Resolver** opgevraagd:

```ts
import { resolveRule } from "../rules/resolver";

const vat = resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 });
// vat.id === "nl.vat.standard"
// vat.data.rates bevat standard (21), reduced (9), zero (0)
// vat.data.default_rate === 21
```

---

## Relatie met YAML-bronnen

De YAML-bestanden in `docs/v2/knowledge/objects/` blijven de **bron van waarheid**. `src/lib/knowledge/generated-objects.ts` is een automatisch gegenereerde kopie; handmatig bewerken wordt overschreven door `npm run generate:knowledge`.

De browser krijgt nooit YAML te zien: alleen de gegenereerde TypeScript-module wordt gebundeld.

---

## Relatie met bestaande calculators

**De BTW-engine is gekoppeld.** `src/lib/calculators/btw.ts` haalt de tarieven via `resolveRule({ type: "vat_rate", country: "NL", locale: "nl-NL", year: 2026 })` uit de Rule Resolver. Bij een ongeldige of ontbrekende lookup valt de engine terug op de hardcoded waarden in `src/lib/utils/constants.ts`.

**De Tax Engine is gekoppeld.** `src/lib/calculators/tax.ts` haalt de 2026 Box 1-schijven via `resolveRule({ type: "tax_bracket", ... })` en de algemene heffingskorting en arbeidskorting via `resolveRule({ type: "tax_credit", id: "nl.tax.ahk.2026" / "nl.tax.ak.2026", ... })` uit de Rule Resolver. Bij een ongeldige of ontbrekende lookup valt de engine terug op `TAX_2026`, `AHK_2026` en `AK_2026` in `src/lib/utils/constants.ts`.

**De Mortgage Engine is gekoppeld.** `src/lib/calculators/mortgage.ts` haalt de 2026 hypotheekformule parameters (inkomensfactor, hypotheekrenteaftrekpercentage, enz.) via `resolveRule({ type: "mortgage_formula", id: "nl.mortgage.formula.2026", ... })` uit de Rule Resolver. Bij een ongeldige of ontbrekende lookup valt de engine terug op de vroeger hardcoded waarden.

**De Allowance Engine is gekoppeld.** `src/lib/calculators/allowances.ts` haalt de 2026 huurtoeslag- en zorgtoeslagparameters via `resolveRule({ type: "allowance_threshold", id: "nl.allowance.rent.2026" / "nl.allowance.health.2026", ... })` uit de Rule Resolver. Bij een ongeldige of ontbrekende lookup valt de engine terug op de vroeger hardcoded waarden. De algemene referentie-objecten `nl.allowance.rent` en `nl.allowance.health` blijven bestaan voor bredere beleidsdrempels; de `.2026` objecten zijn de engine-parameters.

**De Import Cost Engine is gekoppeld.** `src/lib/calculators/import-costs.ts` haalt de 2026 importkosten-standaardwaarden via `resolveRule({ type: "import_cost", id: "nl.import.costs.2026", ... })` uit de Rule Resolver. Bij een ongeldige of ontbrekende lookup valt de engine terug op de vroeger hardcoded waarden. De bpm blijft handmatige invoer via `nl.import.bpm.manual`.

**Multi-country proof:** de VAT Knowledge Objects `be.vat.standard` (Sprint 037), `fr.vat.standard` (Sprint 038), `de.vat.standard` en `es.vat.standard` (Sprint 039) zijn toegevoegd. De Rule Resolver ondersteunt BE, FR, DE en ES voor hun respectievelijke locales. **Eerste non-VAT multi-country proof:** `de.tax.income.2026` (Sprint 041) is geactiveerd in Sprint 070 op basis van § 32a EStG voor veranlagingsperiode 2026. **Tweede non-VAT multi-country object:** `be.tax.income.2026` (Sprint 071) is toegevoegd als actief `tax_bracket` object voor inkomstenjaar 2026 / aanslagjaar 2027, gebaseerd op FOD Financiën. Een `fr-BE` lookup retourneert momenteel `undefined` omdat er (nog) geen `fr-BE`, taal- of land-level object voor België is.

Alle calculatorpagina’s zijn gemigreerd naar centrale engines; de pagina-scripts importeren de engines in plaats van inline logica te gebruiken.

---

## Testen

Atlas v2 gebruikt Vitest voor automatische tests. Relevante tests staan in `tests/`:

- `tests/calculators/btw.test.ts` — BTW-engine berekeningen en tarief-validatie.
- `tests/calculators/tax.test.ts` — Nederlandse 2026 Box 1 belasting, heffingskortingen en netto-inkomenschatting.
- `tests/knowledge/vat-rates.test.ts` — `resolveRule` VAT lookup via de Rule Resolver.
- `tests/knowledge/registry.test.ts` — Knowledge registry inhoud en uniciteit.

```bash
npm run test        # eenmalig
npm run test:watch  # watch mode
```

---

## Lokale analyse tools

Sprint 056 voegt een impact-analyse tool toe voor Knowledge Objects:

```bash
npm run rule:impact -- --from <object-id> --to <object-id>
```

JSON export (machine-readable, alleen JSON naar stdout):

```bash
npm run rule:impact -- --from <object-id> --to <object-id> --json
```

Markdown changelog generator:

```bash
npm run knowledge:changelog -- --from <object-id> --to <object-id>
```

`scripts/rule-impact.mjs` leest de YAML-bronnen, vergelijkt twee objecten op metadata, `data`, `sources`, `used_by` en `relationships`, en rapporteert een risico-inschatting (`low`/`medium`/`high`). Verschillen in `relationships` (bijv. `used_by`, `depends_on`, `replaces`, `fallback_for`) worden expliciet getoond als shared/only-in-from/only-in-to. De `--json` flag is bedoeld voor CI-integratie en documentatiegeneratie; zonder `--json` blijft de human-readable output ongewijzigd.

`scripts/knowledge-changelog.mjs` roept `rule-impact --json` aan en produceert een Markdown changelog (stdout of `--output`). Het is bedoeld voor documentatie, PR-reviews en CI-rapportage. Sinds Sprint 062 ondersteunt `knowledge-changelog` een `--git-diff --auto` modus; sinds Sprint 067 genereert deze modus voor gewijzigde objecten met ongewijzigde id ook een volledige historische `from`/`to` vergelijking door dezelfde diff-logica als `rule-impact` te importeren:

```bash
npm run knowledge:changelog -- --git-diff --auto
npm run knowledge:changelog -- --git-diff --auto --base HEAD~1
npm run knowledge:changelog -- --git-diff --auto --base HEAD~1 --output docs/v2/knowledge/CHANGELOG.md
```

De `--git-diff --auto` modus voert `git diff --name-status --diff-filter=AMDR` uit en genereert per gewijzigd Knowledge Object een impactsectie:

- modified (zelfde id): leest de basisversie via `git show` en de huidige versie van disk, parsed beide als YAML en produceert een volledig diff-rapport (context, data, sources, used_by, relationships) inclusief risico en affected consumers.
- modified (ander id): roept `rule-impact` aan voor risico + affected consumers.
- renamed: roept `rule-impact` aan indien oude en nieuwe id beide in de huidige registry bestaan.
- added: toont `used_by` van het nieuwe object.
- deleted: toont `used_by` uit de basisversie (`git show`).
- Zonder `--auto` blijft de `--git-diff` tabelmodus beschikbaar.

Beide scripts raken geen runtime code of websitepagina's aan.

---

## Lokale CI Check

Sprint 063 voegt `scripts/atlas-ci-check.mjs` toe: één commando dat alle Atlas kwaliteitschecks in de juiste volgorde uitvoert. Sprint 064 voegt `--report <pad>` toe. Sprint 065 voegt **timing** per stap toe. Sprint 066 voegt `--json-report <pad>` toe.

```bash
npm run atlas:check
npm run atlas:check -- --report atlas-check-report.md
npm run atlas:check -- --json-report atlas-check-report.json
npm run atlas:check -- --report atlas-check-report.md --json-report atlas-check-report.json
```

Stappen:

1. `npm run generate:knowledge`
2. `npm run check:knowledge`
3. `npm run validate:knowledge`
4. `npm run validate:cdl`
5. `npm run test`
6. `npm run qa:rules`
7. `npm run build`

Het script toont per stap `[RUN]`, `[PASS] <stap> (<duration>)` of `[FAIL] <stap> (<duration>): <reden>`, stopt bij de eerste fout (exit code `1`) en eindigt met `✅ All Atlas CI checks passed in <totale duur>.` bij succes (exit code `0`). Met `--report` wordt een Markdown-bestand geschreven met datum/tijd, overall status, **totale duur**, een stappen-tabel inclusief duration-kolom en faalredenen. Ook bij fout wordt het rapport nog geschreven. Met `--json-report` wordt een machine-readable JSON-rapport geschreven met `generated_at`, `overall_status`, `total_duration_ms` en een `steps` array; uitvoermappen worden automatisch aangemaakt en de JSON-rapportage kan gecombineerd worden met `--report`. Het doet geen deploy, geen `npm ci` en verbergt geen output. Het is bedoeld voor lokale ontwikkeling, voor-PR-checks en als lokale stap voor de GitHub Actions CI workflow (Sprint 068).

---

## GitHub Actions CI Workflow

Sprint 068 voegt `.github/workflows/atlas-ci.yml` toe. Deze workflow draait `npm run atlas:check` bij elke pull request en elke push naar `main`.

Trigger:

- `pull_request`
- `push` naar `main`

Stappen:

1. Checkout van de repository via `actions/checkout@v4`.
2. Node.js 22 installeren via `actions/setup-node@v4` met npm cache.
3. Dependencies installeren via `npm ci`.
   - Keuze voor `npm ci`: `package-lock.json` is aanwezig, dus dit geeft een schone, reproduceerbare installatie zonder het lockbestand te wijzigen.
4. Atlas CI checks draaien:
   ```bash
   npm run atlas:check -- --report reports/atlas-check-report.md --json-report reports/atlas-check-report.json
   ```
5. Rapporten uploaden als artifact via `actions/upload-artifact@v4` met `if: always()`, zodat ze ook bij falen beschikbaar zijn.

De workflow doet geen deploy, gebruikt geen secrets en roept geen Cloudflare/Wrangler aan. Hij is puur bedoeld voor validatie, testen en bouwen.

Zie `docs/v2/ci/` voor de volledige checklist, branch protection handleiding, runbook voor falende runs en stap-voor-stap activatie-runbook. Start met `docs/v2/ci/README.md`.

---

## Beperkingen

- Multi-country VAT proof: `be.vat.standard`, `fr.vat.standard`, `de.vat.standard` en `es.vat.standard` zijn toegevoegd (Sprints 037–039).
- ✅ Versie-selectie en een expliciete `version` parameter zijn beschikbaar in de Rule Resolver (Sprints 053–055).
- Generatie is expliciet (`npm run generate:knowledge`); `npm run build` faalt bij out-of-sync, maar genereert niet automatisch.

---

## Volgende stappen

- ~~Verwijder `getVatRates()` zodra er geen consumenten meer zijn.~~ **Klaar in Sprint 028.**
- ~~Migreer `zzp-calculator.astro` naar de centrale ZZP Engine.~~ **Klaar in Sprint 031.**
- ~~ZZP-specifieke constanten naar Knowledge Layer verplaatsen.~~ **Klaar in Sprint 032.**
- ~~Migreer `hypotheek-calculator.astro` naar de centrale Mortgage Engine.~~ **Klaar in Sprint 034.**
- ~~Migreer `toeslagen-calculator.astro` naar de centrale Allowance Engine.~~ **Klaar in Sprint 035.**
- ~~Migreer `auto-importkosten-berekenen.astro` naar de centrale Import Cost Engine.~~ **Klaar in Sprint 036.**
- ✅ Multi-country VAT proof compleet: NL, BE, FR, DE, ES (Sprints 037–039).
- ✅ Eerste non-VAT multi-country object: `de.tax.income.2026` toegevoegd als draft in Sprint 041 en geactiveerd in Sprint 070.
- ✅ Basis versie-selectie in de Rule Resolver: bij meerdere actieve matches wint de meest recente `effective_from` (Sprint 040).
- ✅ Expliciete `version` parameter en multi-version selectie-tests (Sprints 053–055).
- ✅ Rule Impact Analysis Tool v0.1 voor lokale objectvergelijking (Sprint 056).
- ✅ Rule Impact Analysis Tool v0.2 met relationships diff (Sprint 057).
- ✅ Rule Impact Analysis Tool v0.3 met JSON export (Sprint 058).
- ✅ Knowledge Changelog Generator v0.1 op basis van Rule Impact JSON (Sprint 059).
- ✅ Knowledge Changelog Generator v0.2 met Git Diff mode (Sprint 060).
- ✅ `de.tax.income.2026` geactiveerd op basis van § 32a EStG voor veranlagingsperiode 2026 (Sprint 070).
- ✅ `be.tax.income.2026` toegevoegd op basis van FOD Financiën voor inkomstenjaar 2026 / aanslagjaar 2027 (Sprint 071).
- Overweeg een land-level (`BE`) of `fr-BE` object voor België zodra er een Belgische calculator wordt gebouwd.
- ✅ `--git-diff` v0.3 met automatische impactrapporten per gewijzigd object (Sprint 062).
- ✅ Lokale CI Check Script v0.1 (Sprint 063).
- ✅ Lokale CI Check Script v0.2 met Markdown report mode (Sprint 064).
- ✅ Lokale CI Check Script v0.3 met timing per stap (Sprint 065).
- ✅ Lokale CI Check Script v0.4 met JSON report mode (Sprint 066).
- ✅ `--git-diff` v0.4 met volledige `from`/`to` changelogs voor objecten met ongewijzigde id (Sprint 067).
- ✅ GitHub Actions CI Workflow v0.1 (Sprint 068).
- ✅ GitHub Readiness Checklist: push checklist, branch protection, Actions runbook (Sprint 069).
- ✅ `de.tax.income.2026` geactiveerd op basis van § 32a EStG voor veranlagingsperiode 2026 (Sprint 070).
- ✅ `be.tax.income.2026` toegevoegd op basis van FOD Financiën voor inkomstenjaar 2026 / aanslagjaar 2027 (Sprint 071).
- ✅ GitHub Activation Runbook toegevoegd (`docs/v2/ci/03-GITHUB-ACTIVATION-RUNBOOK.md`) met exacte terminalcommando's om de lokale repo naar GitHub te pushen en Atlas CI live te activeren (Sprint 075).
