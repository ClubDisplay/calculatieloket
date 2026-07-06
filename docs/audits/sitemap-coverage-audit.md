# Sitemap coverage audit — Calculatieloket.nl

## 1. Samenvatting

- Search Console toont **15 ontdekte pagina’s** voor `sitemap-index.xml`.
- De lokale Astro-build genereert **23 pagina’s**.
- De lokale sitemap bevat **22 URL’s**.
- Dit auditdocument vergelijkt de build-output met de sitemap-output.
- Er worden **geen code- of sitemapwijzigingen** gedaan in deze audit.
- Belangrijkste bevinding: de sitemap is technisch correct. Het verschil tussen 22 sitemap-URL’s en 15 ontdekte pagina’s in Search Console is waarschijnlijk te verklaren doordat Search Console de sitemap sinds **30 juni 2026** niet opnieuw heeft gelezen, terwijl de site inmiddels is doorgroeid.

## 2. Bronnen

| Bron | Waarde | Datum / opmerking |
|---|---|---|
| Search Console sitemapstatus | Status: Success; Discovered pages: 15; Submitted: 12 jun 2026; Last read: 30 jun 2026 | Screenshot Barry, 6 jul 2026 |
| Lokale build-output | 23 pagina’s | `npm run build`, 6 jul 2026 |
| Lokale sitemap-index | `sitemap-index.xml` → `sitemap-0.xml` | 6 jul 2026 |
| Lokale sitemap-0 | 22 URL’s | 6 jul 2026 |
| Productie | https://calculatieloket.nl/ | laatste deploy PR #66 |
| Laatste merge | `eda1927` (PR #68) | 6 jul 2026 |

## 3. Buildpagina’s

| Route | Type | Belangrijk voor SEO? | Verwacht in sitemap? | Opmerking |
|---|---|---|---|---|
| / | Platform | Ja | Ja | Homepage |
| /calculators/ | Platform | Ja | Ja | Calculator hub |
| /btw-calculator/ | BTW | Ja | Ja | Core calculator |
| /btw-terugrekenen/ | BTW | Ja | Ja | Core calculator |
| /btw-inclusief-exclusief/ | BTW | Ja | Ja | Core calculator |
| /bruto-netto-2026/ | Salaris | Ja | Ja | Core calculator |
| /salaris-calculator/ | Salaris | Ja | Ja | Core calculator |
| /vakantiegeld-calculator/ | Salaris | Ja | Ja | Core calculator |
| /toeslagen-calculator/ | Toeslagen | Ja | Ja | Core calculator |
| /hypotheek-calculator/ | Wonen | Ja | Ja | Core calculator |
| /zzp-calculator/ | ZZP | Ja | Ja | Core calculator |
| /auto-importkosten-berekenen/ | Auto | Ja | Ja | Core calculator |
| /categorie/inkomen/ | Categorie | Ja | Ja | Clusterpagina |
| /categorie/belasting/ | Categorie | Ja | Ja | Clusterpagina |
| /categorie/auto/ | Categorie | Ja | Ja | Clusterpagina |
| /categorie/ondernemen/ | Categorie | Ja | Ja | Clusterpagina |
| /categorie/wonen/ | Categorie | Ja | Ja | Clusterpagina |
| /privacy/ | Vertrouwen | Ja | Ja | Legal |
| /cookies/ | Vertrouwen | Ja | Ja | Legal |
| /disclaimer/ | Vertrouwen | Ja | Ja | Legal |
| /contact/ | Vertrouwen | Ja | Ja | Trust |
| /over-ons/ | Vertrouwen | Ja | Ja | Trust |
| /demo/calculator-shell/ | Utility | Nee | Nee | Demo/component-pagina; bewust niet in sitemap |

## 4. Sitemap-URL’s

| URL | Type | In sitemap? | Belangrijk? | Opmerking |
|---|---|---|---|---|
| https://calculatieloket.nl/ | Platform | Ja | Ja | Homepage |
| https://calculatieloket.nl/calculators/ | Platform | Ja | Ja | Calculator hub |
| https://calculatieloket.nl/btw-calculator/ | BTW | Ja | Ja | Core calculator |
| https://calculatieloket.nl/btw-terugrekenen/ | BTW | Ja | Ja | Core calculator |
| https://calculatieloket.nl/btw-inclusief-exclusief/ | BTW | Ja | Ja | Core calculator |
| https://calculatieloket.nl/bruto-netto-2026/ | Salaris | Ja | Ja | Core calculator |
| https://calculatieloket.nl/salaris-calculator/ | Salaris | Ja | Ja | Core calculator |
| https://calculatieloket.nl/vakantiegeld-calculator/ | Salaris | Ja | Ja | Core calculator |
| https://calculatieloket.nl/toeslagen-calculator/ | Toeslagen | Ja | Ja | Core calculator |
| https://calculatieloket.nl/hypotheek-calculator/ | Wonen | Ja | Ja | Core calculator |
| https://calculatieloket.nl/zzp-calculator/ | ZZP | Ja | Ja | Core calculator |
| https://calculatieloket.nl/auto-importkosten-berekenen/ | Auto | Ja | Ja | Core calculator |
| https://calculatieloket.nl/categorie/inkomen/ | Categorie | Ja | Ja | Clusterpagina |
| https://calculatieloket.nl/categorie/belasting/ | Categorie | Ja | Ja | Clusterpagina |
| https://calculatieloket.nl/categorie/auto/ | Categorie | Ja | Ja | Clusterpagina |
| https://calculatieloket.nl/categorie/ondernemen/ | Categorie | Ja | Ja | Clusterpagina |
| https://calculatieloket.nl/categorie/wonen/ | Categorie | Ja | Ja | Clusterpagina |
| https://calculatieloket.nl/privacy/ | Vertrouwen | Ja | Ja | Legal |
| https://calculatieloket.nl/cookies/ | Vertrouwen | Ja | Ja | Legal |
| https://calculatieloket.nl/disclaimer/ | Vertrouwen | Ja | Ja | Legal |
| https://calculatieloket.nl/contact/ | Vertrouwen | Ja | Ja | Trust |
| https://calculatieloket.nl/over-ons/ | Vertrouwen | Ja | Ja | Trust |

## 5. Verschillenanalyse

| Route / URL | In build? | In sitemap? | In Search Console ontdekt? | Verwachte status | Actie nodig? |
|---|---|---|---|---|---|
| / | Ja | Ja | Waarschijnlijk ja | Normaal | Nee |
| /calculators/ | Ja | Ja | Waarschijnlijk ja | Normaal | Nee |
| /btw-calculator/ | Ja | Ja | Onbekend | Normaal | Nee |
| /btw-terugrekenen/ | Ja | Ja | Onbekend | Normaal | Nee |
| /btw-inclusief-exclusief/ | Ja | Ja | Onbekend | Normaal | Nee |
| /bruto-netto-2026/ | Ja | Ja | Mogelijk niet* | Normaal | Monitoren |
| /salaris-calculator/ | Ja | Ja | Mogelijk niet* | Normaal | Monitoren |
| /vakantiegeld-calculator/ | Ja | Ja | Mogelijk niet* | Normaal | Monitoren |
| /toeslagen-calculator/ | Ja | Ja | Onbekend | Normaal | Nee |
| /hypotheek-calculator/ | Ja | Ja | Onbekend | Normaal | Nee |
| /zzp-calculator/ | Ja | Ja | Onbekend | Normaal | Nee |
| /auto-importkosten-berekenen/ | Ja | Ja | Onbekend | Normaal | Nee |
| /categorie/inkomen/ | Ja | Ja | Mogelijk niet* | Normaal | Monitoren |
| /categorie/belasting/ | Ja | Ja | Onbekend | Normaal | Nee |
| /categorie/auto/ | Ja | Ja | Onbekend | Normaal | Nee |
| /categorie/ondernemen/ | Ja | Ja | Onbekend | Normaal | Nee |
| /categorie/wonen/ | Ja | Ja | Onbekend | Normaal | Nee |
| /privacy/ | Ja | Ja | Onbekend | Normaal | Nee |
| /cookies/ | Ja | Ja | Onbekend | Normaal | Nee |
| /disclaimer/ | Ja | Ja | Onbekend | Normaal | Nee |
| /contact/ | Ja | Ja | Onbekend | Normaal | Nee |
| /over-ons/ | Ja | Ja | Onbekend | Normaal | Nee |
| /demo/calculator-shell/ | Ja | Nee | Nee | Bewust niet in sitemap | Nee |

*Mogelijk niet ontdekt omdat Search Console de sitemap sinds 30 juni 2026 niet opnieuw heeft gelezen en de betreffende pagina’s recent zijn gewijzigd of toegevoegd.

## 6. Belangrijke pagina’s checklist

| Pagina / cluster | In sitemap? | Opmerking |
|---|---|---|
| Homepage | Ja | / |
| Calculator hub | Ja | /calculators/ |
| BTW-cluster | Ja | /btw-calculator/, /btw-terugrekenen/, /btw-inclusief-exclusief/ |
| Salaris/bruto-netto cluster | Ja | /bruto-netto-2026/, /salaris-calculator/, /vakantiegeld-calculator/ |
| Toeslagen | Ja | /toeslagen-calculator/ |
| Hypotheek | Ja | /hypotheek-calculator/ |
| ZZP | Ja | /zzp-calculator/ |
| Auto import | Ja | /auto-importkosten-berekenen/ |
| Categorie inkomen | Ja | /categorie/inkomen/ |
| Trust/legal | Ja | /privacy/, /cookies/, /disclaimer/, /contact/, /over-ons/ |

Alle belangrijke pagina’s zijn aanwezig in de sitemap.

## 7. Interpretatie

- Het verschil **23 buildpagina’s vs. 22 sitemap-URL’s** is volledig te verklaren door `/demo/calculator-shell/`. Deze utility/demo-pagina hoeft niet in de sitemap en is er ook niet in opgenomen. Dit is correct.
- Het verschil **22 sitemap-URL’s vs. 15 ontdekte pagina’s in Search Console** is waarschijnlijk te verklaren door vertraging bij Search Console. De sitemap is voor het laatst gelezen op **30 juni 2026**, terwijl de huidige build 22 URL’s bevat en PR’s #65, #66 en #68 pas in de eerste week van juli 2026 zijn gemerged.
- Er zijn **geen belangrijke pagina’s** die ontbreken in de sitemap.
- Er zijn **geen sitemap-URL’s** die niet in de build voorkomen.
- De sitemap is technisch consistent en volledig genoeg voor de huidige site.

## 8. Aanbevolen vervolgactie

| Prioriteit | Actie | Urgentie |
|---|---|---|
| P3 | Sitemap opnieuw indienen of herleiding aanvragen in Search Console | Laag; waarschijnlijk lost Google dit vanzelf op bij volgende crawl |
| P3 | 1–2 weken na herindiening Search Console monitoren op aantal discovered pages | Laag |
| P3 | Volgende baseline (augustus 2026) checkt of aantal discovered pages is gestegen naar ~22 | Laag |
| — | Geen technische PR nodig voor de sitemap; geen code- of route-wijzigingen nodig | — |

Conclusie: **geen sitemap-fix nodig**. Het verschil is vrijwel zeker Search Console-vertraging.

## 9. Exacte OpenCode-prompt voor eventuele technische fix

> **Alleen gebruiken als later blijkt dat er wél een sitemap-probleem is.**
>
> "Onderzoek waarom Astro de sitemap niet volledig genereert. Controleer `astro.config.mjs` sitemap-configuratie, `@astrojs/sitemap` versie, en eventuele `pageSize` of `filter` opties. Zorg dat alle publieke pagina’s in de sitemap terechtkomen, behalve bewust uitgesloten pagina’s zoals `/demo/`. Voer `npm run build` uit en vergelijk `dist/sitemap-0.xml` met de 23 gebouwde pagina’s. Maak een minimale PR aan zonder SEO metadata, routes, calculatorlogica of advertentiecode te wijzigen."
