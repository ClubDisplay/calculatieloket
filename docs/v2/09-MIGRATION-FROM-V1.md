# 09 — Migration from v1

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf hoe we geleidelijk van de huidige v1-implementatie (Calculatieloket.nl met inline scripts) naar Atlas v2 migreren, zonder de bestaande website te breken.

---

## Migratieprincipes

1. **Geen big bang.** Atlas v2 wordt stap voor stap ingevoerd.
2. **v1 blijft live.** De bestaande site bouwt en deployt gewoon door.
3. **Per cluster migreren.** Begin met BTW, dan salaris, etc.
4. **Code duplication is tijdelijk acceptabel.** Oude inline scripts blijven staan tot de migratie van een pagina af is.
5. **Altijd build + 15 pagina's.** Elke stap moet bouwen.
6. **Formules blijven identiek.** Alleen de locatie van de formule verandert.

---

## Huidige v1 situatie

- Astro 6 static site.
- 15 pagina's, waarvan 9 calculatorpagina's.
- Inline scripts per calculatorpagina met gedupliceerde logica.
- Begin van gedeelde engine in `src/lib/` (Sprints 002–005):
  - `src/lib/format/currency.ts`
  - `src/lib/validation/input.ts`, `rules.ts`
  - `src/lib/utils/constants.ts`
  - `src/lib/types/calculator.ts`
  - `src/lib/calculators/btw.ts`
- BTW-cluster is gemigreerd naar de engine.

---

## Migratievolgorde

| Fase | Cluster | Pagina's | Engine-module |
|---|---|---|---|
| 1 (afgerond) | BTW | btw-calculator, btw-terugrekenen, btw-inclusief-exclusief | `src/lib/calculators/btw.ts` |
| 2 | Salaris | salaris-calculator, bruto-netto-2026 | `src/lib/calculators/tax.ts` |
| 3 | ZZP | zzp-calculator | `src/lib/calculators/zzp.ts` + tax engine |
| 4 | Wonen | hypotheek-calculator | `src/lib/calculators/mortgage.ts` |
| 5 | Toeslagen | toeslagen-calculator | `src/lib/calculators/benefits.ts` |
| 6 | Auto | auto-importkosten-berekenen | `src/lib/calculators/import.ts` |

---

## Technisch migratiepad

### Stap 1: Engine-module bouwen

Maak een pure rekenmodule in `src/lib/calculators/{domein}.ts`.

### Stap 2: Testen tegen huidige pagina

Vergelijk output van engine met output van bestaande inline script.

### Stap 3: Pagina-script vervangen

- Verwijder lokale `formatEuro` en formules.
- Importeer uit `src/lib/calculators/` en `src/lib/format/`.
- Behoud DOM-wiring, IDs, event listeners, foutmeldingen.

### Stap 4: Build en vergelijking

- `npm run build` → 15 pagina's.
- Vergelijk output van belangrijkste testcases.

### Stap 5: Documentatie bijwerken

- `docs/04-COMPONENT-LIBRARY.md`
- `docs/05-CALCULATOR-STANDARDS.md`
- `docs/catalog/calculators.yml`
- `docs/10-CHANGELOG.md`

---

## V1 → v2 architectuurtransformatie

```
V1 (huidig):
  src/pages/{page}.astro
    └── inline <script> met formatting + formules + DOM

V2 (doel):
  src/pages/{page}.astro
    └── inline <script> met alleen DOM-wiring
          └── imports from src/lib/calculators/
          └── imports from src/lib/format/
          └── imports from src/lib/validation/
```

---

## Risico's en mitigatie

| Risico | Mitigatie |
|---|---|
| Formule-afwijking | Golden-master vergelijking vóór/na. |
| Build faalt | Per pagina migreren, kleine stappen. |
| iCloud sync issues | Weinig bestanden tegelijk wijzigen. |
| SEO-verlies | Metadata en structured data intact laten. |
| Scope creep | Per cluster afronden, geen parallelle migraties. |

---

## Definitieve v2-overstap

Wanneer alle calculators gemigreerd zijn en de Generator stabiel is, kan worden overgegaan naar:

- Calculator definitions in YAML.
- Rule Engine met locale-specifieke regels.
- Generator die pagina's produceert.
- Product-configuratie voor calculatieloket.nl.

Dit is pas aan de orde na v2 Sprint 006+.

---

## Wat blijft hetzelfde?

- Astro 6 static output.
- 15 pagina's, 15 sitemap URLs.
- Huidige styling en componenten.
- Privacy-first: geen opslag, geen tracking.
- Deploy alleen na akkoord van Barry.
