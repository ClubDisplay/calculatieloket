# 05 — FiscalMesh Agents Architecture

> **Doel:** Definiëren van de eerste generatie interne FiscalMesh Agents die Calculatieloket ondersteunen bij bouwen, onderhouden en optimaliseren.  
> **Laatst bijgewerkt:** 2026-06-30

---

## Belangrijke scheiding

Deze agents draaien **niet** op de publieke website. Ze zijn interne bouw- en beheeragents voor FiscalMesh/Atlas. Ze helpen het team om:

- nieuwe calculator-kansen te ontdekken;
- bronnen te controleren en bij te werken;
- content te genereren;
- kwaliteit te waarborgen;
- ontwerp consistent te houden;
- prestaties te analyseren;
- de productbacklog te prioriteren.

Geen agent neemt zonder menselijke review beslissingen die de site, tarieven of gebruikers zichtbaar wijzigen.

---

## Agent 1 — SEO Agent

**Verantwoordelijkheid:** Ontdekken en prioriteren van nieuwe calculator-kansen.

**Taken:**

- Analyseren van Search Console data (zoektermen, impressies, clicks, positie).
- Clusters maken van gerelateerde keywords (bijv. “bruto netto”, “netto salaris”, “loonheffing 2026”).
- Interne linkkansen vinden (calculators die vaak samen gebruikt worden, maar geen link hebben).
- Titles, meta descriptions en H1’s controleren op lengte, uniciteit en zoekintentie.
- Voorstellen doen voor nieuwe landingspagina’s op basis van zoekvolume en concurrentie.

**Input:** Search Console export, sitemap, huidige pagina’s, bestaande keywordlijst.  
**Output:** Keyword-cluster rapport, interne-link advies, title/description verbetersuggesties, nieuwe-pagina-voorstellen.  
**Trigger:** Wekelijks handmatig of via GitHub Actions cron.

---

## Agent 2 — Knowledge Agent

**Verantwoordelijkheid:** Bewaken van de Knowledge Layer en officieel bronnen.

**Taken:**

- Controleren of de officiële bronnen (Belastingdienst, RDW, Nibud, etc.) nog beschikbaar zijn.
- Detecteren of belastingtarieven, schijven of drempels zijn gewijzigd.
- Nieuwe Knowledge Objects voorstellen op basis van gewijzigde wetgeving.
- Draft-objecten markeren voor review naar `active` zodra bronverificatie sluitend is.
- Waarschuwen als een `active` object verouderd dreigt te raken (bijv. einde jaar).

**Input:** `docs/v2/knowledge/objects/*.yml`, bron-URL’s, `effective_from` / `last_review` datums.  
**Output:** Verificatierapport, voorstellen voor nieuwe/aangepaste Knowledge Objects, lijst van objecten die review nodig hebben.  
**Trigger:** Maandelijks en voor belangrijke datums (1 januari, 1 juli, prinsjesdag).

---

## Agent 3 — Content Agent

**Verantwoordelijkheid:** Genereren van ondersteunende content.

**Taken:**

- Schrijven van concept-uitlegpagina’s bij nieuwe calculators.
- Schrijven van FAQ-items op basis van engine output en veelgestelde vragen.
- Schrijven van voorbeeldberekeningen die aansluiten bij actuele tarieven.
- Voorstellen doen voor schema.org markup (FAQPage, HowTo, SoftwareApplication).
- Controleren of content consistent is in toon, lengte en structuur.

**Input:** Calculator-definitie, engine parameters, bestaande pagina’s, style guide.  
**Output:** Conceptteksten in markdown, FAQ-lijsten, schema.org voorstellen.  
**Trigger:** Bij aanmaak van een nieuwe calculator of jaarlijkse update.

---

## Agent 4 — QA Agent

**Verantwoordelijkheid:** Waarborgen van technische kwaliteit.

**Taken:**

- `npm run atlas:check` draaien en rapporteren.
- Build controleren (`npm run build`).
- Knowledge Layer valideren (`npm run validate:knowledge`).
- Rule Resolver testen (`npm run qa:rules`).
- Vitest tests draaien (`npm run test`).
- Nieuwe en gewijzigde pagina’s controleren op regressies.
- Pull requests voorzien van een samenvatting van checks.

**Input:** `npm run atlas:check`, testoutput, PR diff.  
**Output:** Pass/fail rapport, lijst met te onderzoeken regressies, CI-status.  
**Trigger:** Bij elke push/PR (via GitHub Actions) en handmatig op verzoek.

---

## Agent 5 — Design Agent

**Verantwoordelijkheid:** Bewaken van visuele consistentie.

**Taken:**

- Controleren of componenten worden gebruikt zoals bedoeld (geen duplicatie van `radio-group` of `result-box`).
- Spacing, kleurgebruik en typografie vergelijken met `global.css`.
- Mobiele UX signaleren (te kleine touch targets, scrollafstanden, overflow).
- Screenshots vergelijken met een referentie (visuele regressietest).
- Voorstellen doen voor component-hergebruik.

**Input:** `src/pages/*.astro`, `src/components/*.astro`, `src/styles/global.css`, screenshot van pagina’s.  
**Output:** Design-consistency rapport, lijst met afwijkingen, voorstellen voor nieuwe gedeelde componenten.  
**Trigger:** Bij elke PR en periodiek visuele review.

---

## Agent 6 — Analytics Agent

**Verantwoordelijkheid:** Analyseren van gebruikersgedrag en prestaties.

**Taken:**

- Search Console data analyseren (zoektermen, CTR, posities).
- AdSense data analyseren (RPM, blokkerende lay-out, viewability).
- Bezoekersgedrag interpreteren (populaire calculators, afvalpunten, terugkerende gebruikers).
- A/B-test voorstellen doen voor lay-out, CTA’s en cross-sell.
- Waarschuwen als een calculator plotseling minder gebruikt wordt.

**Input:** Search Console, AdSense, eventuele analytics (zonder PII).  
**Output:** Analyse-rapport, verbetervoorstellen, prioriteitssuggesties.  
**Trigger:** Wekelijks samenvatting en incidenteel bij opvallende trends.

---

## Agent 7 — Product Agent

**Verantwoordelijkheid:** Prioriteren van de calculator-backlog.

**Taken:**

- Backlog items beoordelen op waarde, inspanning en strategische fit.
- De roadmap (`docs/catalog/03-ROADMAP.md`) synchroniseren met nieuwe inzichten.
- Bepalen welke calculator daarna gebouwd wordt op basis van SEO Agent, Analytics Agent en roadmap.
- Releases samenvatten in changelog-voorstellen.
- Afwegingen maken tussen nieuwe calculators versus bestaande optimalisatie.

**Input:** Backlog, roadmap, SEO-rapport, analytics, technische status.  
**Output:** Geprioriteerde backlog, sprintvoorstel, changelog concept.  
**Trigger:** Voor elke sprintplanning en bij belangrijke wijzigingen in data.

---

## Agent Roadmap

### Agent v1 — Handmatige scripts (nu)

Elke agent is een lokaal script in `scripts/agents/` dat op verzoek draait:

- `scripts/agents/seo-audit.mjs`
- `scripts/agents/knowledge-monitor.mjs`
- `scripts/agents/content-drafts.mjs`
- `scripts/agents/qa-report.mjs`
- `scripts/agents/design-check.mjs`
- `scripts/agents/analytics-summary.mjs`
- `scripts/agents/product-prioritize.mjs`

Output is markdown in `reports/agents/`. Menselijke review is verplicht.

### Agent v2 — Geplande GitHub Actions (later)

Agents draaien via geplande GitHub Actions (cron). Ze openen issues of PRs met voorstellen:

- SEO Agent: maandelijks keyword-cluster issue.
- Knowledge Agent: maandelijks bronverificatie issue.
- QA Agent: bij elke PR comment met check-samenvatting.
- Analytics Agent: wekelijks summary issue.
- Product Agent: sprintplanning issue.

### Agent v3 — Gedeeltelijk autonoom (verre toekomst)

Agents kunnen, na expliciete goedkeuring, kleine wijzigingen doorvoeren:

- Content Agent: FAQ bijwerken met nieuwe tarieven.
- QA Agent: groene check automatisch mergen bij alleen documentatie-wijzigingen.
- Design Agent: kleine CSS-aanpassingen voor consistentie.

Menselijke goedkeuring blijft verplicht voor:

- wijzigingen in Knowledge Objects;
- wijzigingen in rekenlogica;
- nieuwe pagina’s;
- deploys.

---

## Niet-doelen

- Geen agent draait in de browser van bezoekers.
- Geen agent verzamelt persoonlijke gegevens van gebruikers.
- Geen agent neemt autonoom beslissingen over tarieven, belastingregels of juridische teksten.
- Geen agent vervangt menselijke redactie, design review of fiscale controle.
