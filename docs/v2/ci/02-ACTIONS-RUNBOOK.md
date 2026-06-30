# 02 — Actions Runbook

> Doel: snel handelen bij een falende GitHub Actions run van de Atlas CI-workflow.

---

## Waar vind je de runs?

1. Open de repository op GitHub.
2. Klik op de tab **Actions**.
3. Kies de workflow **Atlas CI**.
4. Klik op een specifieke run om details te zien.

---

## Een falende run bekijken

- Klik op de rode/falende job.
- Expandeer de stap die faalt.
- De console-output van de onderliggende commando's is zichtbaar (de workflow verbergt niets).

---

## Artifacts

Na elke run — ook bij falen — worden de volgende bestanden geüpload:

- `reports/atlas-check-report.md`
- `reports/atlas-check-report.json`

Je vindt ze onder:

```
Actions > Run > Summary > Artifacts
```

Download en bekijk het JSON-rapport voor een gestructureerd overzicht van welke stap faalde, met duration en error.

---

## Falende stappen: oorzaak & oplossing

### `npm ci`

**Symptoom:** installatie faalt.

**Mogelijke oorzaak:**
- `package-lock.json` is niet in sync met `package.json`.
- Een dependency verwijst naar een onbereikbare registry.

**Oplossing:**
- Lokaal `npm install` draaien en het bijgewerkte `package-lock.json` committen.
- Nooit `node_modules` committen.

---

### `validate:knowledge`

**Symptoom:** fouten in Knowledge Object YAML.

**Oplossing:**
- Controleer de foutmelding in de run.
- Pas het betreffende `.yml` bestand in `docs/v2/knowledge/objects/` aan.
- Draai lokaal `npm run validate:knowledge` om te verifiëren.

---

### `validate:cdl`

**Symptoom:** calculator-definities zijn ongeldig.

**Oplossing:**
- Controleer `docs/v2/definitions/*.yml`.
- Draai lokaal `npm run validate:cdl`.

---

### `test`

**Symptoom:** Vitest-tests falen.

**Oplossing:**
- Kijk welke test faalt.
- Reproduceer lokaal met `npm run test`.
- Fix de code of de test.

---

### `qa:rules`

**Symptoom:** Rule Resolver QA mismatch.

**Oplossing:**
- Het QA-script verwacht bepaalde object-id's voor vooraf gedefinieerde lookups.
- Controleer of Knowledge Objects verwijderd of hernoemd zijn zonder het script aan te passen.
- Draai lokaal `npm run qa:rules`.

---

### `build`

**Symptoom:** Astro build faalt.

**Oplossing:**
- Controleer de TypeScript/build-fout.
- Vaak een out-of-sync registry: draai `npm run generate:knowledge` en commit `src/lib/knowledge/generated-objects.ts`.
- Draai lokaal `npm run build`.

---

## Nog steeds fout?

1. Download het artifact van de falende run.
2. Vergelijk `reports/atlas-check-report.json` met een lokaal gegenereerd rapport.
3. Controleer of de lokaal gebruikte Node-versie overeenkomt met de workflow (22).
4. Open een issue met de run-link en het artifact.

Zie ook [00-GITHUB-READINESS.md](00-GITHUB-READINESS.md), [01-BRANCH-PROTECTION.md](01-BRANCH-PROTECTION.md), [03-GITHUB-ACTIVATION-RUNBOOK.md](03-GITHUB-ACTIVATION-RUNBOOK.md) en [README.md](README.md).
