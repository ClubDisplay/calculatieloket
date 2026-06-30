# 03 — Rule Engine

> **Status:** Rule Engine Specification v0.1 + Runtime Resolver v1 + Caching + Locale fallback + Version Selection v0.1 + Fallback Diagnostics v0.1 + Runtime Fallback Warnings v1 + BE Country Fallback Object + Engine Acceptance Tests (BTW/Tax/ZZP/Mortgage/Allowances/Import) + Mortgage/Allowance/Import Constants Wired + Allowance Naming Cleanup + Legacy helper removal + Version Parameter (`version?: string`) + QA Script Version Checks + Multi-version Selection Test Scenario + Rule Impact Analysis Tool v0.4 (with relationships diff + JSON export + importable `compareObjects`) + Knowledge Changelog Generator v0.4 (with Git Diff Auto Impact Reports incl. same-id historical diffs) + Local CI Check Script v0.4 (with Markdown + JSON reports + Timings) + GitHub Actions CI Workflow v0.1 + GitHub Readiness Checklist (push checklist, branch protection, Actions runbook) + Active German Income Tax Object 2026 (`de.tax.income.2026`) + Active Belgian Income Tax Object 2026 (`be.tax.income.2026`) + Active Belgian Income Tax Country Fallback Object 2026 (`be.tax.income.country_fallback.2026`) + Draft French Income Tax Object 2026 (`fr.tax.income.2026`) + Draft Spanish Income Tax Object 2026 (`es.tax.income.2026`) + GitHub Activation Runbook (`docs/v2/ci/03-GITHUB-ACTIVATION-RUNBOOK.md`) + CI docs index (`docs/v2/ci/README.md`) — Atlas v2 Sprint 075  
> **Laatst bijgewerkt:** 2026-06-30

---

## Doel

De Atlas v2 Rule Engine beheert land- en locale-specifieke regels die calculators gebruiken, maar zelf **niet** hardcoded bevatten. Hierdoor kan dezelfde generieke calculator in meerdere landen draaien zonder dat de rekenlogica per land wordt gekopieerd.

Voorbeelden van regels:

- BTW-tarieven (NL 21/9/0, BE 21/12/6/0, DE 19/7, etc.)
- Inkomstenbelasting-schijven en heffingskortingen
- Hypotheeknormen, rentetarieven en annuïteitsformules
- Toeslagengrenzen en drempels
- Importkostenregels (bpm, RDW, etc.)

---

## Verschil tussen Calculation Engine en Rule Engine

| Aspect | Calculation Engine | Rule Engine |
|---|---|---|
| **Verantwoordelijkheid** | Hoe reken je? | Wat mag je rekenen? |
| **Inhoud** | Generieke wiskundige operaties | Land-specifieke parameters en drempels |
| **Voorbeeld** | `amount * (1 + rate)` | `rate = 21%` voor `nl-NL` |
| **Kennis van locale** | Nee | Ja |
| **Hardcoded in pagina?** | Nooit | Nooit |

> **Principe:** De Calculation Engine vraagt parameters aan de Rule Engine. De Rule Engine weet niet hoe de berekening werkt; de Calculation Engine weet niet welke tarieven in een land gelden.

---

## Waarom land/locale gescheiden moeten zijn

Een land kan meerdere locales hebben (bijv. België: `be-NL` en `be-FR`). Dezelfde regels gelden voor beide locales, maar de taal verschilt. Door `country` en `locale` te scheiden:

- Hergebruik je regels over locales heen.
- Val je terug van `be-NL` → `be` → `default` als een locale ontbreekt.
- Voeg je eenvoudig een nieuwe taal toe zonder de regels te herhalen.
- Houd je bronverwijzingen per land consistent.

---

## Naast elkaar bestaan van NL, BE, DE, ES, FR regels

Atlas ondersteunt meerdere landen door gelijknamige rule-sets per locale. Bijvoorbeeld:

```
src/lib/rules/
  nl-NL/
    vat.yml
    tax-2026.yml
    benefits.yml
    mortgage.yml
  be-NL/
    vat.yml
    tax-2026.yml
    benefits.yml
  be-FR/
    vat.yml      # verwijst vaak naar be-NL via fallback
    tax-2026.yml
  de-DE/
    vat.yml
    tax-2026.yml
  es-ES/
    vat.yml
  fr-FR/
    vat.yml
```

De Rule Engine selecteert regels op basis van:

1. Gevraagde `locale` (bijv. `nl-NL`).
2. Gevraagde `country` als fallback (bijv. `be`).
3. `default` locale als laatste fallback.

Een calculator-definitie specificeert de `locale` en `country` waarvoor hij geldt. De regels in die definitie moeten overeenkomen, tenzij expliciet `cross_locale_allowed: true` is gezet.

---

## Koppeling van officiële bronnen

Elke rule heeft een `source` blok met:

- `label`: weergavenaam van de bron.
- `url`: link naar de officiële bron.
- `authority_level`: mate van officiële status.

**Toegestane authority levels:**

| Level | Omschrijving | Voorbeeld |
|---|---|---|
| `official` | Wettelijk of overheid | Belastingdienst, RDW, Dienst Toeslagen |
| `semi_official` | Erkende branche-/budgetorganisatie | Nibud, Ondernemersplein |
| `editorial` | Redactionele toelichting van Calculatieloket | Interne indicatie-hulp |
| `internal` | Interne validatie of afgeleide regel | Input-range checks |

De `source` in een calculator-definitie verwijst altijd naar de bron die de rule onderbouwt. Dit maakt het mogelijk om per rule te rapporteren welke bron gebruikt is, en welke regels bij een bronwijziging herzien moeten worden.

---

## Rule versions

Regels veranderen per jaar of per wetgevingswijziging. Daarom heeft elke rule een `version` veld. Voorbeelden:

- `version: "2026"` voor jaarlijkse tarieven en drempels.
- `version: "1.0"` voor stabiele formules of interne validatieregels.

De Rule Engine kan meerdere versies van dezelfde rule naast elkaar ontsluiten. Als een definitie geen versie specificeert, gebruikt de engine de actiefste (`status: active`) versie voor de gevraagde locale, waarbij het object met de meest recente `effective_from` wint.

---

## Regels mogen nooit hardcoded in pagina’s eindigen

In de huidige v1 calculators staan tarieven, schijven en drempels vaak in inline scripts. In Atlas v2 geldt:

> **Een pagina-script mag nooit zelf beslissen welke tarieven of drempels gebruikt worden.**

Het pagina-script:

1. Leest invoer.
2. Roept de Calculation Engine aan met die invoer.
3. Toont resultaten.

De Calculation Engine vraagt regels op bij de Rule Engine. Hierdoor:

- Wijzigt één bronwijziging niet op 15 plekken in de code.
- Is auditing eenvoudig: elke rule heeft bron, owner en version.
- Kan dezelfde calculator zonder codewijziging in een ander land draaien.

---

## Aansluiting op calculator_module en engine_reference

Een calculator-definitie bevat:

- `calculator_module`: welke generieke module rekent (bijv. `btw`, `tax`, `mortgage`, `benefits`, `import`, `zzp`).
- `engine_status`: `migrated` (centrale engine) of `inline` (nog v1 inline script).
- `engine_reference`: pad naar het engine-bestand of inline script.
- `rules`: de land-specifieke regels die de engine gebruikt.

Voorbeeld:

```yaml
calculator_module: btw
engine_status: migrated
engine_reference: src/lib/calculators/btw.ts
rules:
  - id: vat_rates_nl_2026
    type: vat_rate
    locale: nl-NL
    country: NL
    version: "2026"
    applies_to: calculator
    source:
      label: "Belastingdienst — BTW-tarief"
      url: "https://www.belastingdienst.nl/..."
      authority_level: official
    status: active
```

De `calculator_module` weet hoe het een BTW-berekening doet. De Rule Engine levert via `vat_rates_nl_2026` de tarieven. Zo blijft de engine generiek en de regels specifiek.

---

## Rule types v0.1

| Type | Gebruik |
|---|---|
| `vat_rate` | BTW-tarieven per land/jaar |
| `tax_bracket` | Belastingschijven (Box 1, etc.) |
| `tax_credit` | Heffingskortingen, aftrekposten, vrijstellingen |
| `allowance_threshold` | Toeslagengrenzen, drempels, maximumbedragen |
| `mortgage_formula` | Hypotheekberekeningsregels, leencapaciteit |
| `annuity_formula` | Annuïteitsformule voor maandlasten |
| `import_cost` | Importkostenregels (bpm, RDW, etc.) |
| `manual_input` | Regels rond handmatige/gebruikersinvoer |
| `informational` | Informatieve/waarschuwende regels zonder berekening |

In Sprint 005 zijn deze types vastgelegd in `calculator-definition.schema.md` en gevalideerd in `scripts/validate-cdl.mjs`. Sprint 019 heeft de eerste generieke runtime resolver toegevoegd in `src/lib/rules/`.

---

## Runtime resolver

De eerste generieke resolver is beschikbaar in `src/lib/rules/resolver.ts`.

```ts
import { resolveRule } from "src/lib/rules/resolver";

const vat = resolveRule({
  type: "vat_rate",
  country: "NL",
  locale: "nl-NL",
  year: 2026,
});

// Optioneel: vraag een specifieke object-versie op
const vat2026 = resolveRule({
  type: "vat_rate",
  country: "NL",
  locale: "nl-NL",
  year: 2026,
  version: "2026-01-01",
});
```

De resolver:

- Filtert op `type`, `country`, `locale`.
- Eist `status: "active"`.
- Controleert of het gevraagde jaar binnen `effective_from` / `effective_until` valt.
- Ondersteunt een optioneel `id` voor exacte matching. Wanneer `id` wordt meegegeven en niet wordt gevonden, retourneert de resolver `undefined` (geen terugval naar een ander object).
- Ondersteunt een optioneel `version` voor exacte versie-matching (Sprint 053). Zonder `version` blijft het bestaande gedrag (meest recente actieve object) ongewijzigd.
- Past locale fallback toe: `locale` → taal-only → `country` → `default`.
- Cachet zowel positieve als negatieve resultaten in het geheugen.
- **Retourneert bij meerdere matches het object met de meest recente `effective_from` (version selection v0.1).**
- **Biedt veilige diagnostics** (`getRuleResolverDiagnostics()`, `clearRuleResolverDiagnostics()`) voor dev/test/AI QA: totalLookups, cacheHits, cacheMisses, notFoundLookups, fallbackLocaleHits. Geen PII.
- **Biedt optionele runtime fallback-waarschuwingen** via `warnOnFallback` + `onFallback` (Sprint 044). Alleen geactiveerd als de caller expliciet vraagt om een callback; geen console.log in productie.

Calculator engines mogen nooit direct `knowledgeObjects` lezen; ze gebruiken `resolveRule()` als enige toegangspoort tot de Knowledge Layer. Zie `src/lib/rules/README.md` voor de rationale.

---

## Diagnostics v0.1

`resolveRule()` verzamelt uitsluitend geaggregeerde, niet-persoonlijke counters voor ontwikkeling, testen en AI QA:

```ts
import { getRuleResolverDiagnostics, clearRuleResolverDiagnostics } from "src/lib/rules/resolver";

const d = getRuleResolverDiagnostics();
// d.totalLookups
// d.cacheHits
// d.cacheMisses
// d.notFoundLookups
// d.fallbackLocaleHits
```

Regels:

- Counters bevatten geen invoerwaarden, geen gebruikersdata en geen IP-adressen.
- `getRuleResolverDiagnostics()` retourneert een snapshot; de originele counters worden niet blootgelegd.
- `clearRuleResolverDiagnostics()` reset de counters zonder de cache te wissen.
- `resolveRuleFromRegistry()` blijft zuiver en testbaar; diagnostics lopen alleen via `resolveRule()`.

Deze counters helpen bij het detecteren van onverwacht fallback-gebruik en cache-misses, bijvoorbeeld tijdens QA of bij het toevoegen van een nieuw land.

---

## Runtime fallback warnings v1

`resolveRule()` ondersteunt een optionele callback die wordt aangeroepen wanneer een regel wordt gevonden via een fallback locale (dus niet via een exacte match):

```ts
import { resolveRule } from "src/lib/rules/resolver";

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

Regels:

- De callback wordt **alleen** aangeroepen wanneer:
  - `warnOnFallback: true` is gezet, **en**
  - `onFallback` is meegegeven, **en**
  - het resultaat afkomstig is van een fallback locale (`result.locale !== requestedLocale`).
- Bij een exacte locale match wordt de callback **niet** aangeroepen.
- De callback wordt zowel bij cache misses als bij cache hits aangeroepen, zodat elke `resolveRule()`-aanroep kan worden geobserveerd.
- De resolver zelf gebruikt **nooit** `console.log`. Waarschuwingen worden alleen doorgegeven via de callback; de caller bepaalt wat ermee gebeurt (loggen, test-assertie, analytics, etc.).
- De callback ontvangt geen invoerwaarden, geen gebruikersdata en geen PII; alleen metadata over de resolutie.

Gebruiksvoorbeelden:

- QA-tests die willen verifiëren dat een specifieke calculator geen onverwachte fallback gebruikt.
- Dev-tooling die wil zien welke locales nog geen eigen object hebben.
- Toekomstige UI-integraties die een waarschuwing willen tonen wanneer een regel uit een andere locale afkomstig is (bijv. `be-FR` valt terug op `nl-BE`).

**Getest in Sprint 052:**

- `resolveRule({ type: "vat_rate", country: "BE", locale: "fr-BE", year: 2026, warnOnFallback: true, onFallback: ... })` roept de callback aan met `resolvedId === "be.vat.country_fallback"` en `resolvedLocale === "BE"`.
- `resolveRule({ type: "vat_rate", country: "BE", locale: "nl-BE", year: 2026, warnOnFallback: true, onFallback: ... })` roept de callback **niet** aan, omdat `be.vat.standard` een exacte match is (locale `nl-BE`).

---

## QA Script v0.1

`scripts/qa-rule-resolver.mjs` voert een vaste set veilige lookups uit tegen de YAML-bronnen en rapporteert resultaten plus diagnostics:

```bash
npm run qa:rules
```

Het script:

- Leest de YAML Knowledge Objects uit `docs/v2/knowledge/objects/`.
- Voert dezelfde selectielogica uit als de runtime resolver.
- Controleert verwachte resultaten voor NL/BE/FR/DE/ES VAT, BE `fr-BE` → `BE` country fallback, NL Box 1, NL AHK/AK, en bevestigt dat het Duitse inkomstenbelasting-object (`de.tax.income.2026`) en het Belgische inkomstenbelasting-fallback-object (`be.tax.income.country_fallback.2026`) actief zijn.
- Toont een pass/fail tabel en een diagnostics-samenvatting (`fallbackLocaleHits` is > 0 dankzij de BE fallback lookups).
- Voert sinds Sprint 052 een expliciete fallback-warning check uit: `fr-BE` → `BE` roept `onFallback` aan, een exacte `nl-BE` match roept `onFallback` niet aan.
- Voert sinds Sprint 072 een expliciete fallback-warning check uit voor Belgische inkomstenbelasting: `fr-BE` → `BE` retourneert `be.tax.income.country_fallback.2026` en roept `onFallback` aan, een exacte `nl-BE` match retourneert `be.tax.income.2026` en roept `onFallback` niet aan.
- Voert sinds Sprint 054 expliciete version checks uit: NL VAT met juiste `version` retourneert `nl.vat.standard`, NL VAT met onbekende `version` retourneert `missing`, en `fr-BE` fallback met `version` retourneert `be.vat.country_fallback`.
- Eindigt met exit code `0` bij succes, `1` bij afwijkingen.

Dit script raakt geen websitecode, geen calculator engines en geen gebruikersdata aan.

---

## Multi-version selectie (test-only scenario)

Sprint 055 bewijst dat `resolveRule()` correct omgaat met meerdere actieve versies van hetzelfde object. Omdat er (op dit moment) geen echte Knowledge Objects met meerdere actieve versies bestaan, is dit bewezen via een test-only registry in `tests/rules/resolver.test.ts`:

- Twee mock objecten: `nl.vat.standard.2025` (`version: "2025-01-01"`, `standard: 21`) en `nl.vat.standard.2026` (`version: "2026-01-01"`, `standard: 22`).
- Zonder `version` en met `year: 2026` selecteert de resolver de meest recente actieve versie: `nl.vat.standard.2026`.
- Met `version: "2025-01-01"` selecteert de resolver expliciet de 2025-versie, ook al is het gevraagde jaar 2026.
- Met `version: "2026-01-01"` selecteert de resolver de 2026-versie.
- Met een onbekende `version` retourneert de resolver `undefined`.
- Met `year: 2025` en zonder `version` selecteert de resolver de 2025-versie (de 2026-versie valt buiten het gevraagde jaar).
- `id` + `version` werkt samen: een exacte `id` binnen de gevraagde versie wordt gevonden; een `id` met een verkeerde `version` retourneert `undefined`.

Deze test raakt geen echte YAML-objecten aan en verandert dus niets aan de productie-kennisaet.

---

## Engine acceptatietests

`tests/calculators/engine-acceptance.test.ts` controleert dat bestaande calculator-engines geen onverwachte fallback gebruiken en geen ontbrekende regels tegenkomen:

- Vóór elke test wordt de resolver cache en diagnostics gereset.
- De engine wordt dynamisch geïmporteerd, zodat de regels tijdens de test vanuit de Knowledge Layer worden geladen.
- Na het uitvoeren van een normale NL-berekening wordt gecontroleerd:
  - `notFoundLookups === 0`
  - `fallbackLocaleHits === 0`

Geteste engines:

- BTW engine: `calculateBtw({ amount: 100, rate: 21, direction: "exclusive_to_inclusive" })`
- Tax engine: `calculateNetIncomeEstimate2026({ grossMonthlySalary: 3500, pensionRate: 5, applyLoonheffingskorting: true })`
- ZZP engine: `calculateZzpReverse(...)` met een standaard scenario
- Mortgage engine: `calculateMortgage({ income: 60000, interestRate: 3.8, termYears: 30, partnerIncome: 30000, includePartner: true })`
- Allowance engine: `calculateAllowances({ income: 30000, partnerIncome: 0, isCouple: false, rent: 800 })`
- Import Cost engine: `calculateImportCosts(...)` met een standaard scenario

Alle zes engines laden nu regels uit de Knowledge Layer; hun acceptatietests tonen `totalLookups > 0` en eisen `notFoundLookups === 0` en `fallbackLocaleHits === 0`.

Dit garandeert dat een wijziging in de Knowledge Layer (bijvoorbeeld het per ongeluk verwijderen of wijzigen van een object) direct zichtbaar wordt in de acceptatietests, zonder dat een productiecalculator hoeft te worden gebouwd.

---

## Rule Impact Analysis Tool v0.1

Sprint 056 voegt `scripts/rule-impact.mjs` toe: een lokaal analyse-script dat twee Knowledge Objects vergelijkt en de potentiële impact toont.

Gebruik:

```bash
npm run rule:impact -- --from <object-id> --to <object-id>
```

Voorbeeld:

```bash
npm run rule:impact -- --from nl.vat.standard --to be.vat.standard
```

JSON export (machine-readable, alleen JSON naar stdout):

```bash
npm run rule:impact -- --from nl.vat.standard --to be.vat.standard --json
```

JSON output schema:

```json
{
  "from": { "id", "type", "country", "locale", "version", "effective_from", "effective_until" },
  "to": { "id", "type", "country", "locale", "version", "effective_from", "effective_until" },
  "differences": {
    "context": [{ "field", "from", "to" }],
    "data": [{ "path", "from", "to" }],
    "sources": { "only_in_from": [], "only_in_to": [], "shared": [] },
    "used_by": { "only_in_from": [], "only_in_to": [], "shared": [] },
    "relationships": { "only_in_from": [], "only_in_to": [], "shared": [] }
  },
  "impact": {
    "affected": [],
    "risk_level": "low" | "medium" | "high"
  }
}
```

Het script:

- Leest de YAML Knowledge Objects uit `docs/v2/knowledge/objects/`.
- Vergelijkt `id`, `type`, `country`, `locale`, `version`, `effective_from`, `effective_until`, `data`, `sources`, `used_by` en `relationships`.
- Toont data-verschillen op top-level velden.
- Toont sources-verschillen op basis van URL.
- Toont `used_by`-verschillen en een lijst van getroffen calculators/engines.
- Vergelijkt `relationships` (inclusief `relation`, `target` en eventuele `description`) en toont shared/only-in-from/only-in-to relaties.
- Berekent een risiconiveau:
  - **high** als `type` of `data` verschilt.
  - **medium** als `country`, `locale`, `version`, `effective_from`, `effective_until`, `sources` of `relationships` verschilt (en `data` niet).
  - **low** als alleen `notes`/`tags` verschillen.
- Retourneert exit code `0` als beide objecten gevonden zijn, `1` bij ontbrekende argumenten of onbekende objecten.
- In `--json` mode wordt alleen JSON naar stdout geschreven; human-readable output wordt onderdrukt. Bij errors wordt een JSON-object met `error` naar stderr geschreven.

Dit script raakt geen websitecode, calculator engines of gebruikersdata aan. Het is bedoeld voor lokale QA, bronwijzigings-analyse en CI-integratie.

---

## Knowledge Changelog Generator v0.1

Sprint 059 voegt `scripts/knowledge-changelog.mjs` toe. Deze generator hergebruikt de JSON output van `rule-impact` en maakt er een leesbare Markdown changelog van.

Gebruik:

```bash
npm run knowledge:changelog -- --from <object-id> --to <object-id>
```

Markdown naar stdout:

```bash
npm run knowledge:changelog -- --from nl.vat.standard --to be.vat.standard
```

Markdown naar bestand:

```bash
npm run knowledge:changelog -- --from nl.vat.standard --to be.vat.standard --output docs/v2/knowledge/CHANGELOG.md
```

Het script:

- Roept `rule-impact --json` aan; bouwt de diff-logica niet opnieuw.
- Genereert Markdown met secties: From, To, Context, Data, Sources, Used by, Relationships en Impact.
- Schrijft naar stdout als `--output` ontbreekt.
- Schrijft naar een bestand als `--output` is meegegeven.
- Retourneert exit code `0` bij succes, `1` bij ontbrekende argumenten of onbekende objecten.

Dit script raakt geen runtime code, calculator engines of websitepagina's aan. Het is bedoeld voor documentatie, PR-reviews en CI-rapportage.

---

## Knowledge Changelog Git Diff Mode v0.4

Sprint 067 breidt `--git-diff --auto` uit zodat gewijzigde objecten met een ongewijzigde id ook een volledige historische `from`/`to` vergelijking krijgen, naast de bestaande automatische impactrapporten voor added, deleted, renamed en id-gewijzigde objecten.

Gebruik:

```bash
npm run knowledge:changelog -- --git-diff --auto
npm run knowledge:changelog -- --git-diff --auto --base HEAD~1
npm run knowledge:changelog -- --git-diff --auto --base HEAD~1 --output docs/v2/knowledge/CHANGELOG.md
```

De `--git-diff` modus zonder `--auto` blijft bestaan (alleen de tabel). De `--from`/`--to` modus blijft ongewijzigd.

Wat `--auto` doet:

- Voert `git diff --name-status --diff-filter=AMDR <base> -- docs/v2/knowledge/objects/` uit.
- Genereert een Markdown rapport met:
  - “Changed Knowledge Objects” tabel (status, id, pad)
  - “Impact details” per object
- Per status:
  - **Modified, zelfde id:** leest de basisversie via `git show` en de huidige versie van disk, parsed beide als YAML en hergebruikt dezelfde diff-logica als `rule-impact` om een volledig rapport te maken (context, data, sources, used_by, relationships) inclusief risico en affected consumers.
  - **Modified, ander id:** probeert `rule-impact --from <old-id> --to <new-id>` en toont risico + affected consumers.
  - **Renamed:** leest oude en nieuwe id. Bij verschillende ids die beide in de huidige registry bestaan wordt `rule-impact` aangeroepen; anders wordt een rename-summary getoond.
  - **Added:** toont “new object added” en de `used_by` consumers uit het nieuwe object.
  - **Deleted:** toont “object deleted” en de `used_by` consumers uit de basisversie (`git show <base>:<path>`).

Object-id en `used_by` afleiding:

- Inhoud wordt gelezen via `git show` (basisversie) of via het huidige bestand.
- De `id:` regel wordt met een eenvoudige parser uit de YAML gehaald; bij falen wordt teruggevallen op de bestandsnaam.
- `used_by:` wordt op dezelfde manier uit de YAML gelezen (ondersteunt lijsten; inline arrays zijn niet verplicht).

Limitaties (v0.4):

- De volledige vergelijking voor zelfde-id objecten vereist geldige YAML in zowel de basis- als huidige versie; bij parse-fouten valt het script terug op de eerdere `used_by` diff.
- `used_by` parsing kan falen als het niet als eenvoudige lijst is opgemaakt.
- Renamed bestanden worden door git bepaald op basis van inhoudsovereenkomst.
- Werkt alleen binnen een git repository.

Dit is bedoeld voor lokale QA, PR-reviews en CI-rapportage. Het raakt geen runtime code, calculator engines of websitepagina's aan.

---

## Structuur van locale rule-bestanden (voorbeeld)

```yaml
locale: nl-NL
country: NL
year: 2026
rules:
  vat:
    rates:
      - value: 21
        label: "hoog tarief"
      - value: 9
        label: "laag tarief"
      - value: 0
        label: "nultarief"
    default_rate: 21
```

De calculator-definitie verwijst via rule `type` en `applies_to` naar deze rule-sets. De exacte mapping wordt in latere sprints uitgewerkt wanneer de Rule Engine API en runtime beschikbaar komen.

---

## Fallback-strategie

1. Vraag regels op voor de gevraagde `locale`.
2. Als niet beschikbaar: val terug op `country` (bijv. `be-NL` → `be`).
3. Als nog niet beschikbaar: val terug op `default` (meestal `nl-NL` of `en-US`).
4. Optioneel: roep `onFallback` aan bij fallback (alleen als `warnOnFallback: true` is gezet; nooit `console.log`).

---

## Migratie van huidige v1

De huidige `src/lib/utils/constants.ts` bevat al een eerste aanzet van gecentraliseerde regels. In Atlas v2 worden deze regels verplaatst naar `src/lib/rules/{locale}/{domain}.yml` en via de Rule Engine ontsloten.

Zie `09-MIGRATION-FROM-V1.md` voor het stappenplan.

---

## Local CI Check Script v0.4

Sprint 063 voegt `scripts/atlas-ci-check.mjs` toe: één commando dat alle Atlas kwaliteitschecks in de juiste volgorde uitvoert. Sprint 064 voegt een `--report <path>` optie toe. Sprint 065 voegt **timing** per stap toe, zichtbaar in de console en in het Markdown rapport. Sprint 066 voegt een `--json-report <path>` optie toe voor machine-readable JSON output.

Gebruik:

```bash
npm run atlas:check
npm run atlas:check -- --report atlas-check-report.md
npm run atlas:check -- --json-report atlas-check-report.json
npm run atlas:check -- --report atlas-check-report.md --json-report atlas-check-report.json
```

Dit voert sequentieel uit:

1. `npm run generate:knowledge`
2. `npm run check:knowledge`
3. `npm run validate:knowledge`
4. `npm run validate:cdl`
5. `npm run test`
6. `npm run qa:rules`
7. `npm run build`

Per stap toont het script:

- `[RUN] <stapnaam>: npm run <script>`
- `[PASS] <stapnaam> (<duration>)` bij succes
- `[FAIL] <stapnaam> (<duration>): <reden>` bij fout

Bij de eerste fout stopt het script direct met exit code `1`, maar het rapport wordt nog wel geschreven. Als alle stappen slagen, eindigt het met `✅ All Atlas CI checks passed in <total duration>.`.

Markdown rapport inhoud:

- Titel: `# Atlas CI Check Report`
- Datum/tijd
- Overall status: ✅ PASS of ❌ FAIL
- **Total duration**
- Tabel met stappen: `#`, stapnaam, commando, status, **duration**
- Bij falen: een “Failure details” sectie met de eerste falende stap, duration en reden

JSON rapport inhoud:

- `generated_at`: ISO-timestamp
- `overall_status`: `PASS` of `FAIL`
- `total_duration_ms`: totale duur in milliseconden
- `steps`: array met `{ name, command, status, duration_ms, error }`

Het JSON rapport wordt automatisch in de opgegeven directory geplaatst, kan gecombineerd worden met `--report` en wordt ook bij falen nog geschreven.

Het script:

- Voert **geen** deploy uit.
- Voert **geen** `npm ci` uit.
- Verbergt **geen** output; stdout/stderr van de onderliggende commands blijven zichtbaar.
- Is bedoeld voor lokale ontwikkeling, voor-PR-checks en als basis voor een latere CI-pipeline (zie Sprint 068).

---

## GitHub Actions CI Workflow v0.1

Sprint 068 voegt `.github/workflows/atlas-ci.yml` toe. Deze workflow draait `npm run atlas:check` automatisch bij pull requests en pushes naar `main`.

Trigger:

- `pull_request`
- `push` naar `main`

Workflow stappen:

1. **Checkout** van de repository via `actions/checkout@v4`.
2. **Node.js 22** installeren via `actions/setup-node@v4` met npm cache.
3. **Dependencies installeren** via `npm ci`.
   - Keuze voor `npm ci`: omdat `package-lock.json` aanwezig is, geeft dit een schone, reproduceerbare installatie zonder onverwachte versie-upgrades. `npm install` kan het lockbestand wijzigen, wat in CI ongewenst is.
4. **Atlas CI checks draaien**:
   ```bash
   npm run atlas:check -- --report reports/atlas-check-report.md --json-report reports/atlas-check-report.json
   ```
5. **Reports uploaden** als artifact via `actions/upload-artifact@v4`, met `if: always()` zodat ook bij falen de Markdown- en JSON-rapporten beschikbaar zijn.

De workflow:

- Voert **geen deploy** uit.
- Gebruikt **geen secrets**.
- Roept **geen Cloudflare/Wrangler** aan.
- Is puur bedoeld voor validatie, testen en bouwen.

Zie voor de praktische checklist, branch protection en het falen-runbook:

- `docs/v2/ci/README.md`
- `docs/v2/ci/00-GITHUB-READINESS.md`
- `docs/v2/ci/01-BRANCH-PROTECTION.md`
- `docs/v2/ci/02-ACTIONS-RUNBOOK.md`
- `docs/v2/ci/03-GITHUB-ACTIVATION-RUNBOOK.md`

---

## Openstaande punten voor latere sprints

- ~~Runtime API voor `ruleEngine.get(locale, path, version)`.~~ **Basis resolver klaar in Sprint 019.**
- ~~Caching en locale fallback.~~ **Klaar in Sprint 025/026.**
- ~~Versioning strategie.~~ **Basis version selection klaar in Sprint 040.**
- ~~Expliciete `version` parameter in `resolveRule()`.~~ **Klaar in Sprint 053.**
- ~~Fallback diagnostics.~~ **Klaar in Sprint 042.**
- ~~Runtime fallback warnings.~~ **Klaar in Sprint 044.**
- Automatische broncontrole op basis van `source_review_required`.
- Rule diff/impact analyse bij bronwijzigingen.
- ✅ `knowledge-changelog --git-diff` v0.3: automatische impactrapporten per gewijzigd object (Sprint 062).
- ✅ Lokale CI Check Script v0.1 (Sprint 063).
- ✅ Lokale CI Check Script v0.2 met Markdown report mode (Sprint 064).
- ✅ Lokale CI Check Script v0.3 met timing per stap (Sprint 065).
- ✅ Lokale CI Check Script v0.4 met JSON report mode (Sprint 066).
- ✅ `knowledge-changelog --git-diff` v0.4: volledige `from`/`to` changelogs voor objecten met ongewijzigde id (Sprint 067).
- ✅ GitHub Actions CI Workflow v0.1 (Sprint 068).
- ✅ GitHub Readiness Checklist: push checklist, branch protection, Actions runbook (Sprint 069).
- ✅ `de.tax.income.2026` geactiveerd op basis van § 32a EStG voor veranlagingsperiode 2026 (Sprint 070).
- ✅ `be.tax.income.2026` toegevoegd op basis van FOD Financiën voor inkomstenjaar 2026 / aanslagjaar 2027 (Sprint 071).
- ✅ Land-level (`BE`) fallback-object voor Belgische inkomstenbelasting toegevoegd (`be.tax.income.country_fallback.2026`) zodat `fr-BE` lookups kunnen terugvallen op `BE` (Sprint 072).
- ✅ `fr.tax.income.2026` toegevoegd als draft op basis van Service Public; officiële tarieven voor inkomstenjaar 2026 / aanslag 2027 zijn nog niet gepubliceerd (Sprint 073).
- ✅ `es.tax.income.2026` toegevoegd als draft op basis van Agencia Tributaria; officiële IRPF-schaal voor 2026 (inkomsten 2026) is nog niet gepubliceerd (Sprint 074).
- ✅ GitHub Activation Runbook toegevoegd (`docs/v2/ci/03-GITHUB-ACTIVATION-RUNBOOK.md`) met exacte terminalcommando's om de lokale repository naar GitHub te pushen en Atlas CI live te activeren, inclusief CI-docs index (`docs/v2/ci/README.md`) (Sprint 075).
- Activeer `fr.tax.income.2026` zodra de Franse loi de finances pour 2027 de barèmes publiceert.
- Activeer `es.tax.income.2026` zodra de Agencia Tributaria / Ley de Presupuestos de 2026-schaal publiceert.
- Overweeg een `fr-BE` taalspecifiek inkomstenbelasting-object voor België wanneer een Franstalige Belgian calculator wordt gebouwd.
- ~~Koppeling van `tax.ts` en `btw.ts` naar `resolveRule()`.~~ **Klaar in Sprint 020/021.**
- ~~Deprecate legacy `getVatRates()` helper.~~ **Klaar in Sprint 027.**
- ~~Verwijder `getVatRates()` helper.~~ **Klaar in Sprint 028.**
