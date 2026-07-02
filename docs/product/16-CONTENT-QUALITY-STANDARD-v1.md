# Content Quality Standard v1

## Doel

Alle publieke pagina's van Calculatieloket.nl voldoen aan één uniforme redactionele kwaliteitsstandaard. Deze standaard verhoogt de kwaliteit van de content, SEO en E-E-A-T, zonder nieuwe functionaliteit te bouwen.

## Scope

- Alle publieke calculatorpagina's.
- Homepage.
- Categoriepagina's.
- Statische pagina's (over ons, contact, privacy, cookies, disclaimer).
- Gedeelde calculatorcomponenten indien nodig voor uniformiteit.

## Wat we niet doen

- Geen wijzigingen aan calculator engines, Knowledge Objects, Rule Resolver, Recommendation Engine, Dashboard of Agents.
- Geen deploy, `.env`, nieuwe dependencies, `npm ci` of `rm -rf node_modules`.
- Geen kunstmatige tekst of content zonder toegevoegde waarde.

---

## 1. Structuur van een calculatorpagina

Iedere calculatorpagina bevat minimaal de volgende onderdelen, in deze volgorde:

1. **Intro** — korte uitleg waarvoor de calculator dient.
2. **Calculator** — het invoerformulier.
3. **Resultaat** — het resultatenpaneel.
4. **TrustPanel** — vertrouwenssignalen en link naar bronnen.
5. **Waarom kun je deze berekening vertrouwen?** — uitleg over bronnen, methodiek en beperkingen.
6. **Praktijkvoorbeeld** — concreet rekenvoorbeeld voor de doelgroep.
7. **Veelgemaakte fouten** — aandachtspunten en misvattingen.
8. **FAQ** — veelgestelde vragen.
9. **Bronnen** — officiële, controleerbare bronnen.
10. **Disclaimer** — duidelijke indicatievermelding.
11. **Gerelateerde calculators** — interne links naar relevante tools.

### 1.1 Intro

- Maximaal 2 tot 3 korte alinea's.
- Belangrijkste zoekwoord in de eerste zin.
- Link naar 1 à 3 gerelateerde calculators.

### 1.2 Waarom kun je deze berekening vertrouwen?

- Verwijs naar officiële bronnen (Belastingdienst, Dienst Toeslagen, Rijksoverheid, Nibud, RDW, KVK).
- Benoem de belangrijkste aannames.
- Vermeld duidelijk dat de uitkomst een indicatie is.
- Geen testimonials, sterren of nep badges.

### 1.3 Praktijkvoorbeeld

- Gebruik realistische getallen.
- Toon de tussenstappen.
- Sluit af met een korte uitleg.

### 1.4 Veelgemaakte fouten

- 4 tot 6 bullets.
- Elke bullet bevat een fout én een korte uitleg of correctie.
- Geen vingerwijzen; focus op begrip.

### 1.5 FAQ

- 4 tot 7 vragen.
- Vragen beantwoorden echte gebruikerssignalen.
- Geen duplicatie van de intro of het voorbeeld.

### 1.6 Bronnen

- Minimaal 2 officiële bronnen per pagina.
- Bronnen moeten controleerbaar zijn.
- Gebruik labels zoals "Officiële bron" of "Onafhankelijke bron".

---

## 2. Meta descriptions

- Lengte: 120–160 tekens.
- Belangrijkste zoekwoorden in de eerste helft.
- Duidelijke omschrijving van de pagina.
- Geen keyword stuffing.
- Elke publieke pagina heeft een unieke meta description.

---

## 3. Content kwaliteit

### 3.1 H2/H3 hiërarchie

- Exact één H1 per pagina (wordt meestal door `BaseLayout`/`CalculatorShell` geleverd).
- H2's voor de belangrijkste secties.
- H3's voor subsecties binnen een H2.
- Geen sprongen (H2 → H4 zonder H3).

### 3.2 Scanbaarheid

- Korte alinea's (2–4 zinnen).
- Bullet lists voor opsommingen.
- Vetgedrukte tussentitels in bullets.
- Witruimte tussen secties.

### 3.3 Waarschuwingen

- Belangrijke beperkingen worden visueel benadrukt (bijvoorbeeld met een hint of waarschuwingsklasse).
- Gebruik de woorden "indicatie" en "geen rechten ontlenen" waar passend.

### 3.4 Uitleg voor beginners

- Vermijd jargon zonder uitleg.
- Gebruik concrete voorbeelden.
- Leg afkortingen uit bij eerste gebruik.

### 3.5 Interne links

- Link naar gerelateerde calculators in de intro en in de tekst.
- Gebruik beschrijvende ankerteksten.
- Vermijd "klik hier".

---

## 4. Categoriepagina's

- Elke categoriepagina verwijst naar:
  - Alle calculators binnen die categorie (via `CategoryGrid`).
  - Gerelateerde categorieën (via `RelatedCategories`).
  - Homepage (via breadcrumbs en terugverwijzing in tekst).
- De intro legt uit waarom de categorie relevant is.
- De FAQ beantwoordt vragen op categorieniveau.
- De bronnen zijn relevant voor het hele thema.

---

## 5. Statische pagina's

- Over ons, Privacy, Cookies, Disclaimer en Contact zijn professioneel en beknopt.
- Geen langer dan nodig.
- Duidelijke H2-secties.
- Links naar elkaar waar relevant (bijvoorbeeld privacy → cookies → contact).

---

## 6. Uniformiteit

- Iedere calculator heeft dezelfde opbouw, toon, stijl en vertrouwen.
- Geen tegenstrijdige formuleringen tussen pagina's.
- Indicaties en disclaimers worden consistent geformuleerd.

---

## 7. Validatie

- Voer na elke contentwijziging `npm run atlas:check` uit.
- Controleer of er geen TypeScript-fouten zijn.
- Controleer of de SEO-tests (H1, meta description, canonical) slagen.
- Controleer of interne links niet dood lopen.

---

## 8. Rapportage per sprint

Bij elke content-sprint bevat het rapport:

1. Gewijzigde bestanden.
2. Welke content is verbeterd.
3. Welke pagina's zijn aangepast.
4. SEO-verbeteringen.
5. Interne-link-verbeteringen.
6. `atlas:check` resultaat.
7. PR URL + CI-status.
8. Openstaande aandachtspunten.
9. Advies voor volgende sprint.

---

Laatst bijgewerkt: 2 juli 2026
