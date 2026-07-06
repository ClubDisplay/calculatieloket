# Calculatieloket.nl Agents

> **Doel:** Vaste interne werkinstructies voor SEO-groei, contentkwaliteit, AdSense-readiness, technische QA en sprintplanning.  
> **Laatst bijgewerkt:** 2026-07-05  
> **Status:** Actief — agents gebruiken `docs/dashboard/` als bron van waarheid.

---

## Belangrijke regels

- Deze Agents zijn **interne werkinstructies**; ze mogen niet zelfstandig live wijzigingen uitvoeren.
- Elke wijziging aan productie vereist **expliciet akkoord van Barry**.
- Dashboarddocumentatie in `docs/dashboard/` is de bron van waarheid voor status, backlog en beslissingen.
- Fiscale/financiële inhoud vereist altijd officiële bronnen.
- Geen SEO-spam, geen dunne pagina’s, geen harde claims.
- Gebruik “indicatie” bij financiële berekeningen.
- Internationale uitbreiding blijft geparkeerd totdat de Nederlandse basis stabiel is.

---

## Overzicht van Agents

| Agent | Doel | Output | Mag wijzigen? | Vereiste bronnen/checks |
|---|---|---|---|---|
| [SEO Strategist Agent](seo-strategist-agent.md) | SEO-prioriteiten bepalen | Analyse + prioriteiten + prompt | Nee | Search Console, bestaande URL’s, officiële bronnen |
| [Content Quality Agent](content-quality-agent.md) | Bestaande pagina’s verbeteren | Contentanalyse + prompt | Nee | Officiële bronnen, content-safety audit, calculator registry |
| [AdSense Readiness Agent](adsense-readiness-agent.md) | AdSense-risico’s bewaken | Readiness-check + prompt | Nee | AdSense-status, live site, privacy/vertrouwen pagina’s |
| [Technical QA Agent](technical-qa-agent.md) | Technische kwaliteit bewaken | QA-rapport + prompt | Nee | `npm run test`, `npm run build`, `npm run audit:content`, `npm run atlas:check` |
| [Sprint Coordinator Agent](sprint-coordinator-agent.md) | Volgorde en scope bewaken | Sprintadvies + prompt | Nee | Backlog, PR-statussen, AdSense-status, Search Console |

---

## Gebruik

1. Start elke agent-taak met het lezen van `docs/dashboard/CALCULATIELOKET_GROWTH_DASHBOARD.md`.
2. Gebruik de specifieke agent voor het onderwerp.
3. De agent produceert altijd een analyse in het voorgeschreven outputformat.
4. Als de agent code- of documentatiewijzigingen voorstelt, levert deze een exacte OpenCode-prompt af.
5. Barry beoordeelt de prompt en geeft akkoord voor uitvoering.

---

> Zie ook: `docs/dashboard/CALCULATIELOKET_GROWTH_DASHBOARD.md`, `docs/dashboard/sprint-backlog.md`.
