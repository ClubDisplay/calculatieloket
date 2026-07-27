# Calculatieloket.nl — SEO & AdSense Growth Dashboard

> **Doel:** Centrale documentatie voor het monitoren, plannen en groeien van Calculatieloket.nl op SEO, AdSense, content en technische kwaliteit.  
> **Laatst bijgewerkt:** 2026-07-27  
> **Status:** Actief — groeit mee met data.  
> **Agents:** Zie `docs/agents/` voor vaste werkinstructies. Agents gebruiken dit dashboard als bron van waarheid.

---

## 1. Huidige status

| Onderdeel | Status | Laatste controle | Opmerking |
|---|---|---|---|
| Productie-URL | Live | 2026-07-05 | https://calculatieloket.nl/ |
| Dashboarddomein | Gepland | 2026-07-05 | dashboard.fiscalmesh.com (toekomstig intern control center) |
| AdSense-status | Getting ready / review loopt | 2026-07-05 | Review aangevraagd na PR #60 |
| Ads.txt-status | Authorised | 2026-07-05 | `google.com, pub-6003900314370739, DIRECT, f08c47fec0942fa0` |
| Aantal pagina’s | 23 | 2026-07-05 | Na laatste build |
| Laatste bekende tests | 253/253 passed | 2026-07-06 | Vitest suite |
| Laatste bekende build | Groen | 2026-07-06 | `npm run atlas:check` ✅; controleer na deze sprint opnieuw |
| Laatste deploy | 2026-07-06 | 2026-07-06 | PR #65 live |
| Open risico’s | AdSense review afwachten | 2026-07-05 | Geen grote productie-wijzigingen tijdens review |

---

## 2. AdSense status

| Datum | Status in AdSense | Ads.txt status | Actie uitgevoerd | Volgende actie | Opmerking |
|---|---|---|---|---|---|
| 2026-07-05 | Getting ready / review loopt | Authorised | ads.txt live gezet, AdSense-review aangevraagd | 24–72 uur monitoren | Geen grote productie-wijzigingen tijdens review |

Zie ook: `docs/dashboard/adsense-status-log.md`.

---

## 3. Search Console baseline

| Datum export | Periode | Klikken | Vertoningen | CTR | Gem. positie | Belangrijkste groei | Belangrijkste daling | Actie |
|---|---|---|---|---|---|---|---|---|---|
| 2026-07-27 | laatste 3 maanden | 4 | 1.127 | 0,35% | circa 60 | /btw-terugrekenen/ (583 vertoningen) | /bruto-netto-2026/ (positie 15,81) | Content op /bruto-netto-2026/ en /btw-terugrekenen/ versterken |
| 2026-07-06 | laatste 28 dagen | 4 | 228 | 1,75% | 55 | /bruto-netto-2026/ (positie 17,13) | — | Sitemap-dekking controleren; PR #59 en PR #65 monitoren |

- **Laatste baseline:** `docs/dashboard/search-console/2026-07-27-baseline.md`
- **Eerdere baseline:** `docs/dashboard/search-console/2026-07-baseline.md`
- **Status:** ✅ 27 juli 2026 baseline ingevuld
- **Quick win:** `/bruto-netto-2026/` — 135 vertoningen, positie 15,81, 0 klikken (dichtst bij pagina 1)
- **Hoogste volume:** `/btw-terugrekenen/` — 583 vertoningen, positie 57,56, 0 klikken
- **Sitemapstatus:** Success, 15 ontdekte pagina’s (laatst bekend); audit uitgevoerd (`docs/audits/sitemap-coverage-audit.md`)
- **Sitemap audit conclusie:** 23 buildpagina’s, 22 sitemap-URL’s, geen belangrijke pagina’s ontbrekend; verschil 15 discovered pages waarschijnlijk Search Console-vertraging
- **Volgende actie:** Sitemap opnieuw indienen in Search Console na deploy; PR #59 en PR #65 2–4 weken monitoren; deze content-sprint monitoren
- **Template:** zie ook `docs/dashboard/monthly-seo-baseline-template.md` en `docs/dashboard/search-console/README.md`

---

## 4. Top pagina’s

| URL | Cluster | Status | Laatste update | Klikken | Vertoningen | CTR | Positie | Volgende actie |
|---|---|---|---|---|---|---|---|---|
| / | Platform | Live | 2026-07-05 | 4 | 21 | 19,05% | 47,48 | Monitoren; enige pagina met klikken |
| /calculators/ | Platform | Live | 2026-07-05 | | | | | Monitoren |
| /btw-calculator/ | BTW | Verbeterd | PR #59 | 0 | onbekend | 0% | onbekend | Monitoren |
| /btw-terugrekenen/ | BTW | Verbeterd | PR #59 | 0 | 583 | 0% | 57,56 | Content versterken; meer voorbeelden en FAQ |
| /btw-inclusief-exclusief/ | BTW | Verbeterd | PR #59 | 0 | 573 | 0% | 80,20 | Monitoren; lage prioriteit |
| /bruto-netto-2026/ | Salaris | Verbeterd | 2026-07-06 | 0 | 135 | 0% | 15,81 | **P1:** content versterken om pagina 1 te halen |
| /salaris-calculator/ | Salaris | Verbeterd | 2026-07-06 | | | | | Gedeployed; monitoren |
| /vakantiegeld-calculator/ | Salaris | Verbeterd | 2026-07-06 | | | | | Gedeployed; monitoren |
| /toeslagen-calculator/ | Toeslagen | Live | 2026-07-05 | | | | | Content verduidelijken |
| /hypotheek-calculator/ | Wonen | Live | 2026-07-05 | | | | | Content verbeteren |
| /zzp-calculator/ | ZZP | Live | 2026-07-05 | | | | | Cluster uitbreiden |
| /auto-importkosten-berekenen/ | Auto | Live | 2026-07-05 | | | | | Monitoren |
| /privacy/ | Vertrouwen | Live | 2026-07-05 | | | | | Monitoren |
| /cookies/ | Vertrouwen | Live | 2026-07-05 | | | | | Monitoren |
| /disclaimer/ | Vertrouwen | Live | 2026-07-05 | | | | | Monitoren |
| /contact/ | Vertrouwen | Live | 2026-07-05 | | | | | Monitoren |
| /over-ons/ | Vertrouwen | Live | 2026-07-05 | | | | | Monitoren |

---

## 5. Contentclusters

### BTW

- **Huidige pagina’s:** `/btw-calculator/`, `/btw-terugrekenen/`, `/btw-inclusief-exclusief/`
- **Status:** Verbeterd via PR #59; sindsdien veel meer vertoningen, maar posities nog laag
- **Kansen:**
  - `/btw-terugrekenen/` heeft 583 vertoningen maar staat op positie 57,56. Versterken met meer voorbeelden, 21%/9% subsecties en FAQ.
  - `/btw-inclusief-exclusief/` heeft 573 vertoningen maar staat op pagina 8; pas aanpakken als `/btw-terugrekenen/` op pagina 1 staat.
- **Risico’s:** 0%-tarief verkeerd toegepast
- **Officiële bronnen nodig?** Ja — Belastingdienst
- **Volgende sprint:** Content versterken op `/btw-terugrekenen/`; monitoren in Search Console

### Salaris / bruto-netto

- **Huidige pagina’s:** `/bruto-netto-2026/`, `/salaris-calculator/`, `/vakantiegeld-calculator/`
- **Status:** Contentkwaliteit verbeterd en gedeployed via PR #65; `/bruto-netto-2026/` staat nu op positie 15,81 (dichtst bij pagina 1)
- **Kansen:**
  - `/bruto-netto-2026/` is de snelste kans op klikken: 135 vertoningen, positie 15,81. Uitbreiden met meer voorbeelden, “Nettoloon 2026” en “Bruto netto berekenen 2026” secties, en FAQ.
  - `/salaris-calculator/` en `/vakantiegeld-calculator/` monitoren.
- **Risico’s:** Cannibalisatie verminderd; harde claim in use-case copy verzacht
- **Officiële bronnen nodig?** Ja — Belastingdienst, loonheffingstabellen 2026
- **Audit:** `docs/audits/salary-bruto-netto-cluster-audit.md`
- **Volgende sprint:** Content versterken op `/bruto-netto-2026/`; monitoren in Search Console

### Toeslagen

- **Huidige pagina’s:** `/toeslagen-calculator/`
- **Status:** Live, P2
- **Kansen:** Duidelijker onderscheid zorgtoeslag/huurtoeslag
- **Risico’s:** Hard claims vermijden
- **Officiële bronnen nodig?** Ja — Dienst Toeslagen
- **Volgende sprint:** Content verduidelijken

### ZZP

- **Huidige pagina’s:** `/zzp-calculator/`
- **Status:** Live, P2
- **Kansen:** MKB-vrijstelling, startersaftrek, uurtariefvoorbeelden
- **Risico’s:** Complexe regels verkeerd vereenvoudigen
- **Officiële bronnen nodig?** Ja — Belastingdienst
- **Volgende sprint:** Cluster uitbreiden

### Hypotheek

- **Huidige pagina’s:** `/hypotheek-calculator/`
- **Status:** Live, P2
- **Kansen:** Meer context rond rentevaste periode, fiscale hypotheekregels
- **Risico’s:** Geen financieel advies geven
- **Officiële bronnen nodig?** Ja — Belastingdienst, AFM/NIBEG
- **Volgende sprint:** Content verbeteren

### Auto import

- **Huidige pagina’s:** `/auto-importkosten-berekenen/`
- **Status:** Live, P2
- **Kansen:** Voorbeelden per land, BPM-regels
- **Risico’s:** Importtarieven wijzigen
- **Officiële bronnen nodig?** Ja — Belastingdienst, RDW
- **Volgende sprint:** Monitoren

### Vertrouwen / juridische pagina’s

- **Huidige pagina’s:** `/privacy/`, `/cookies/`, `/disclaimer/`, `/contact/`, `/over-ons/`
- **Status:** Live
- **Kansen:** Helder en compleet houden voor AdSense/ePrivacy
- **Risico’s:** Verouderde informatie
- **Officiële bronnen nodig?** Nvt
- **Volgende sprint:** Monitoren

---

## 6. Technische kwaliteit

| Check | Status | Laatste controle | Tool/commando | Opmerking |
|---|---|---|---|---|
| Unit tests | ✅ | 2026-07-06 | `npm run test` | 253/253 |
| Build | ✅ | 2026-07-06 | `npm run build` | 23 pagina’s |
| Content-safety | ✅ | 2026-07-06 | `npm run audit:content` | Geen placeholders/hard claims |
| Atlas CI | ✅ | 2026-07-06 | `npm run atlas:check` | Volledig groen |
| Sitemap | ✅ | 2026-07-05 | `dist/sitemap-index.xml` | 23 pagina’s |
| Robots.txt | ✅ | 2026-07-05 | `public/robots.txt` | Naar sitemap-index |
| Canonical | ✅ | 2026-07-05 | `BaseLayout.astro` | Per pagina |
| Ads.txt | ✅ | 2026-07-05 | `public/ads.txt` | Authorised |
| Console errors | Nvt | 2026-07-05 | Browser DevTools | Niet geautomatiseerd |
| Mobile layout | Nvt | 2026-07-05 | Browser / Lighthouse | Visueel controleren |
| Broken links | Nvt | 2026-07-05 | Handmatig / tool | Nog geen tool geconfigureerd |
| Content-safety | ✅ | 2026-07-05 | `scripts/audit-content-safety.mjs` | Onderdeel van atlas:check |
| Search aliases | ✅ | 2026-07-05 | `tests/search/search.test.ts` | Onderdeel van atlas:check |
| Cookie/CMP | ✅ | 2026-07-05 | `CookieConsent.astro` | Alleen na toestemming |
| Advertentiecontainers | ✅ | 2026-07-05 | `AdSlot.astro` | Alleen bij adsEnabled |

---

## 7. AdSense readiness checklist

- [x] ads.txt live
- [x] ads.txt authorised
- [x] geen under-construction items
- [x] geen zichtbare placeholders
- [x] geen harde claims
- [x] geen loze knoppen
- [x] privacy bereikbaar
- [x] cookies bereikbaar
- [x] disclaimer bereikbaar
- [x] contact bereikbaar
- [x] over-ons bereikbaar
- [x] bronnen zichtbaar
- [x] geen zichtbare lege advertentiecontainers
- [x] cookie/CMP werkt
- [x] geen ads naast calculator-inputs/resultaten
- [x] geen grote wijzigingen tijdens review

---

## 8. PR changelog samenvatting

| PR | Datum | Type | Samenvatting | Deploy | Impact | Opmerking |
|---|---|---|---|---|---|---|
| PR #65 | 2026-07-06 | Content | Salaris/bruto-netto contentkwaliteit verbeterd | Ja | Middel | “Ook handig binnen salaris” toegevoegd, harde claim verzacht, pagina’s gedifferentieerd |
| PR #64 | 2026-07-06 | Docs | Salaris/bruto-netto cluster audit toegevoegd | Nee | Laag | `docs/audits/salary-bruto-netto-cluster-audit.md` |
| PR #55 | 2026-07-05 | Content Quality | Harde claims en placeholders verwijderd | Ja | Middel | Content-safety audit geïntroduceerd |
| PR #56 | 2026-07-05 | UX | Loze "Bereken"-knoppen verwijderd | Ja | Laag | Betere UX, minder ruis |
| PR #58 | 2026-07-05 | Quality Gates | `audit:content` opgenomen in `atlas:check` + search-tests | Ja | Laag | Betere CI-dekking |
| PR #59 | 2026-07-05 | Content | BTW-cluster contentkwaliteit verbeterd | Ja | Middel | "Ook handig binnen btw" toegevoegd |
| PR #60 | 2026-07-05 | AdSense | Ads.txt en AdSense-readiness blockers opgelost | Ja | Hoog | AdSense review mogelijk gemaakt |
| PR #61 | 2026-07-05 | Docs | Internationale domeinstrategie vastgelegd | Nee | Laag | dashboard.fiscalmesh.com als control center |

---

## 9. Backlog

| Prioriteit | Thema | Taak | Type | Risico | Verwachte impact | Status |
|---|---|---|---|---|---|---|
| P1 | AdSense | AdSense status monitoren | Monitoring | Laag | Hoog | Actief |
| P1 | Content | `/bruto-netto-2026/` content versterken voor pagina 1 | Content | Middel | Hoog | **In uitvoering** in deze sprint |
| P1 | Content | `/btw-terugrekenen/` content versterken met voorbeelden en FAQ | Content | Middel | Hoog | **In uitvoering** in deze sprint |
| P1 | Content | Salaris/bruto-netto cluster analyseren | Analyse | Middel | Middel | ✅ Afgerond; zie `docs/audits/salary-bruto-netto-cluster-audit.md` |
| P1 | Content | Salaris/bruto-netto contentkwaliteit verbeteren | Content | Middel | Hoog | ✅ Afgerond en gedeployed via PR #65 |
| P1 | SEO | Search Console baseline bijwerken | Monitoring | Laag | Middel | ✅ Afgerond; zie `docs/dashboard/search-console/2026-07-27-baseline.md` |
| P2 | Content | Toeslagen content verduidelijken | Content | Middel | Middel | Open |
| P2 | Content | ZZP cluster uitbreiden | Content | Middel | Middel | Open |
| P2 | Content | Hypotheek content verbeteren | Content | Middel | Middel | Open |
| P2 | AdSense | Advertentieplaatsing ontwerpen na goedkeuring | UX | Middel | Middel | Open |
| P3 | Content | Long-tail pagina’s overwegen (`/nettoloon-2026/`, `/btw-21-procent-berekenen/`) | Content | Middel | Middel | Open; pas na data deze sprint |
| P3 | Content | Kennisbank bouwen | Product | Hoog | Middel | Open |
| P3 | Strategy | Internationale domeinen onderzoeken | Strategy | Hoog | Laag | Open |

Zie ook: `docs/dashboard/sprint-backlog.md`.

---

## 10. Beslisregels

1. Geen live wijzigingen zonder akkoord.
2. Eerst meten en analyseren.
3. Daarna prioriteren.
4. Daarna pas bouwen.
5. Geen SEO-spam of dunne pagina’s.
6. Geen fiscale of financiële claims zonder officiële bron.
7. Gebruik “indicatie” bij financiële berekeningen.
8. Geen “je hebt recht op”.
9. Geen zichtbare placeholders.
10. Geen loze knoppen.
11. Geen advertenties naast calculator-inputs/resultaten.
12. Zichtbare UX-wijzigingen moeten browsermatig gecontroleerd worden.
13. Build/test groen is niet hetzelfde als gebruikerservaring akkoord.
14. Internationale uitbreiding pas na stabiele Nederlandse basis.
15. Agents werken straks vanuit dit dashboard als bron van waarheid.

---

> Zie ook: `docs/dashboard/monthly-seo-baseline-template.md`, `docs/dashboard/adsense-status-log.md`, `docs/dashboard/sprint-backlog.md`, `docs/dashboard/search-console-import-template.csv`, `docs/agents/`.
