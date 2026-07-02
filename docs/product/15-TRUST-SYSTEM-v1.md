# 15 — Trust & Credibility System v1

> **Doel:** Het vertrouwen (E-E-A-T) van Calculatieloket.nl versterken zonder nieuwe functionaliteit toe te voegen.  
> **Versie:** 1.0  
> **Laatst bijgewerkt:** 2026-07-03  
> **Status:** Afgerond — wachten op Sprint 105.

---

## 1. Executive summary

Sprint 104 voegt een uniform **Trust System** toe op alle calculatorpagina's. Iedere calculator toont nu dezelfde, controleerbare vertrouwensignalen direct onder het resultaat: officiële bronnen, jaarlijkse controle, transparante rekenmethode, update-datum en redactie. Daarnaast zijn de statische pagina's (over ons, contact, disclaimer, privacy, cookies) professioneler en vertrouwelijker gemaakt, zonder hun lengte onnodig uit te breiden. De footer benadrukt subtiel dat de site op officiële bronnen is gebaseerd.

**Belangrijkste keuzes:**
- Geen Google Reviews, sterren, testimonials of nep trust badges.
- Alleen echte, controleerbare informatie.
- TrustPanel is een gedeelde component zodat alle calculators identiek scoren op vertrouwen.

---

## 2. Gewijzigde bestanden

### Nieuwe component
- `src/components/calculator/TrustPanel.astro` — gedeelde trust-panel met badges, uitleg en bronnen-link.

### Aangepaste component
- `src/components/SourceCards.astro` — accepteert nu een optionele `id` prop zodat de trust-panel naar de bronnen kan scrollen.

### Layout
- `src/layouts/BaseLayout.astro` — footer bottom toont subtiel "Gebaseerd op officiële bronnen".

### Calculatorpagina's (10)
- `src/pages/bruto-netto-2026.astro`
- `src/pages/salaris-calculator.astro`
- `src/pages/hypotheek-calculator.astro`
- `src/pages/toeslagen-calculator.astro`
- `src/pages/btw-calculator.astro`
- `src/pages/btw-terugrekenen.astro`
- `src/pages/btw-inclusief-exclusief.astro`
- `src/pages/zzp-calculator.astro`
- `src/pages/auto-importkosten-berekenen.astro`
- `src/pages/vakantiegeld-calculator.astro`

### Statische pagina's (5)
- `src/pages/over-ons.astro`
- `src/pages/contact.astro`
- `src/pages/disclaimer.astro`
- `src/pages/privacy.astro`
- `src/pages/cookies.astro`

### Documentatie
- `docs/product/10-PRODUCT-POLISH-BACKLOG.md`
- `05_changelog.md`
- `docs/10-CHANGELOG.md`

---

## 3. Hoe TrustPanel werkt

TrustPanel is een gedeelde Astro component die onder de `ResultPanel` en boven de zijpanel-secties (use cases, bronnen, FAQ) wordt geplaatst. Omdat het in de `result`-slot van `CalculatorShell` staat, valt het op desktop onder het resultaat in de hoofdkolom en staat het op mobiel boven de bronnen/FAQ in de verticale stapel.

**Inhoud:**
1. **Trust badges** — compacte labels:
   - Gebaseerd op officiële bronnen
   - Jaarlijks gecontroleerd
   - Indicatieve berekening
   - Laatste update: `<lastUpdated>`
   - Redactie: Calculatieloket.nl
2. **Uitleg** — "Waarom kun je deze berekening vertrouwen?" met maximaal 4 bullets:
   - Officiële overheidsbronnen
   - Jaarlijks gecontroleerd
   - Transparante rekenmethode
   - Regelmatig bijgewerkt
3. **Actieknop** — "Bekijk gebruikte bronnen" linkt via anchor (`#calculator-sources`) naar de `SourceCards` sectie. Werkt zonder JavaScript, volledig toetsenbord-toegankelijk.

**Props:**
- `lastUpdated?: string` — datum van de laatste broncontrole (bijv. "30 juni 2026").
- `sourcesId?: string` — id van de bronnen-sectie om naar te scrollen (default: `calculator-sources`).

**Analytics:** de bronnen-link heeft `data-analytics-*` attributen volgens de bestaande conventie (`trust-panel-link`, `calculator-page`, `click`, `bekijk-bronnen`).

---

## 4. Welke calculators zijn aangepast

Alle 10 calculators krijgen exact hetzelfde trust-panel. De `lastUpdated` prop wordt per pagina ingevuld uit de bestaande `lastUpdated` variabele.

| Calculator | lastUpdated |
|--------------|-------------|
| Bruto netto 2026 | 30 juni 2026 |
| Salaris calculator | 30 juni 2026 |
| Hypotheek calculator | 30 juni 2026 |
| Toeslagen calculator | 30 juni 2026 |
| BTW calculator | 1 juli 2026 |
| BTW terugrekenen | 2 juli 2026 |
| BTW inclusief/exclusief | 2 juli 2026 |
| ZZP calculator | 2 juli 2026 |
| Auto importkosten | 1 juli 2026 |
| Vakantiegeld calculator | 2 juli 2026 |

Elke pagina heeft bovendien `SourceCards` voorzien van `id="calculator-sources"` zodat de trust-panel direct naar de bronnen scrollt.

---

## 5. Verbeteringen statische pagina's

| Pagina | Meta description | Toegevoegde trust-argumentatie |
|--------|------------------|--------------------------------|
| Over ons | Verlengd naar 143 tekens; benoemt "betrouwbaar", "officiële bronnen" en "jaarlijks gecontroleerd". | Nieuwe sectie "Betrouwbaar en transparant" met bronvermelding. |
| Contact | Verlengd naar 149 tekens; benoemt "gratis" en "officiële bronnen". | Nieuwe sectie "Onze belofte" over bronnen, controle, privacy en geen advies. |
| Disclaimer | Verlengd naar 131 tekens; benoemt "officiële bronnen". | Nieuwe sectie "Controleerbare bronnen" over officiële bronnen en transparantie. |
| Privacy | 130 tekens; geen wijziging nodig. | Nieuwe sectie "Transparantie" over bronnen, geen persoonsgegevens en geen profielen. |
| Cookies | Verlengd naar 148 tekens; duidelijker onderscheid noodzakelijk vs. advertentiecookies. | Nieuwe sectie "Privacy en betrouwbaarheid" over geen opslag, geen tracking en jaarlijkse controle. |

Geen pagina is onnodig uitgebreid. De toevoegingen zijn kort, feitelijk en gericht op vertrouwen.

---

## 6. SEO / accessibility / mobile checks

### SEO
- ✅ Exact één H1 per pagina behouden.
- ✅ Geen canonical wijzigingen.
- ✅ Geen noindex wijzigingen.
- ✅ Bestaande schema markup (FAQPage, BreadcrumbList, HowTo) behouden.
- ✅ Meta descriptions van statische pagina's nu binnen 120–160 tekens.
- ✅ Geen duplicate content of keyword stuffing.

### Accessibility
- ✅ TrustPanel gebruikt een `<section>` met `aria-label`.
- ✅ De "Bekijk gebruikte bronnen"-knop is een `<a>` met `href`, dus volledig toetsenbord- en screenreader-toegankelijk.
- ✅ Focus-visible outline wordt automatisch toegepast via global.css (`.btn`, `a:focus-visible`).
- ✅ Geen nieuwe interactieve elementen zonder toetsenbordpad.
- ✅ Geen `aria-current` regressies.

### Mobile
- ✅ TrustPanel stapelend op smalle schermen (flex-wrap badges, block-level layout).
- ✅ Geen overflow of horizontale scroll.
- ✅ TrustPanel staat in de hoofdkolom, dus direct onder het resultaat op mobiel.
- ✅ Geen advertentie tussen input en resultaat gewijzigd.

---

## 7. `npm run atlas:check` resultaat

```
✅ All Atlas CI checks passed in 4.28s.
```

Details:
- 25 kennisobjecten gegenereerd.
- 0 kennis-validatie fouten; 2 verwachte draft waarschuwingen (fr.tax.income.2026, es.tax.income.2026).
- 9 calculator-definities gevalideerd; 0 fouten.
- 219 Vitest tests passed; 0 failed.
- 17 Rule Resolver lookups; 0 failures.
- 22 pagina's gebouwd; 0 TypeScript-fouten.
- Sitemap bevat 21 publieke URL's; demo uitgesloten.

---

## 8. PR URL + CI-status

- **Branch:** `feat/sprint-104-trust-system`
- **Commit:** `feat: add trust system across calculators` (`89807f6`)
- **PR:** https://github.com/ClubDisplay/calculatieloket/pull/29
- **CI-status:** `Atlas CI / Run Atlas CI checks` — groen in 22s.

---

## 9. Risico's / TODO's

| Risico | Impact | Mitigatie |
|--------|--------|-----------|
| TrustPanel duwt SEO-content verder naar beneden op mobiel | Laag | Panel is compact (~150 px); UseCasesPanel en advertenties stonden al boven de SEO-content. |
| Anchor link `#calculator-sources` conflicteert met andere id's | Laag | Id is uniek per pagina en consistent door alle 10 calculators. |
| Meta descriptions te lang voor sommige pagina's | Laag | Gecontroleerd: alle 5 statische pagina's zitten tussen 120–160 tekens. |
| Gebruikers zien TrustPanel als marketing | Laag | Geen opsmuk, geen sterren, alleen feitelijke badges en bullets. |

---

## 10. Advies Sprint 105

Sprint 104 heeft het vertrouwen versterkt. Voor Sprint 105 liggen de volgende logische stappen voor:

1. **Handmatige Lighthouse audit** — meten of TrustPanel de LCP/CLS/INP beïnvloedt.
2. **Core Web Vitals dashboard** — documenteer in de roadmap hoe we CWV structureel monitoren.
3. **Content quality verder verhogen** — categoriepagina's uitbreiden naar 500–800 woorden.
4. **AdSense A/B test** — meten of de vertrouwensopbouw de advertentie-CTR beïnvloedt.

Aangeraden titel: **Sprint 105 — Performance & Content Completion**.

---

**Wachten op Sprint 105.**

**Eind van document.**
