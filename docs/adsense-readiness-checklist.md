# AdSense Readiness Checklist

> Laatst bijgewerkt: 2026-07-05

Deze checklist beschrijft alle voorwaarden die op code-niveau en in de statische output moeten kloppen voordat we een AdSense-aanvraag (opnieuw) indienen of een release als “AdSense ready” beschouwen.

## 1. ads.txt

- [ ] `public/ads.txt` is aanwezig in de repository.
- [ ] Regel bevat exact de juiste publisher-id:  
  `google.com, pub-6003900314370739, DIRECT, f08c47fec0942fa0`
- [ ] Na `npm run build` is `dist/ads.txt` aanwezig en identiek aan `public/ads.txt`.
- [ ] In preview is `http://localhost:4321/ads.txt` (of de gekozen poort) bereikbaar en retourneert plaintext.
- [ ] In productie is `https://calculatieloket.nl/ads.txt` bereikbaar en identiek.

## 2. Geen placeholder / under-construction signalen

- [ ] Er staan geen teksten als “(binnenkort)”, “in aanbouw”, “work in progress” of “tijdelijk niet beschikbaar” in de zichtbare navigatie, footer of pagina’s.
- [ ] Er zijn geen links naar pagina’s die (nog) geen eigen inhoud hebben, tenzij ze een 301/302 redirect of een noindex-pagina zijn.
- [ ] Geen lege menu-items, lege categoriepagina’s of lege “Kennisbank” / “Nieuws” secties in de zichtbare site.
- [ ] De audit `npm run audit:content` slaagt zonder under-construction meldingen.

## 3. Geen lege advertentiecontainers

- [ ] `<AdSlot />` componenten renderen alleen als `PUBLIC_ADS_ENABLED=true` én `PUBLIC_ADSENSE_ID` is ingesteld.
- [ ] Lege `.adsbygoogle` containers worden verborgen (`display: none`) wanneer er geen advertentie geladen is.
- [ ] Ad slots komen alleen voor op pagina’s met voldoende inhoud (niet op 404, redirect of placeholder-pagina’s).
- [ ] Er zijn geen ad slots boven de hoofdinhoud zonder interactie ( CLS / layout-shift risico ).

## 4. Content-kwaliteit en beleid

- [ ] Geen harde claims zoals “heb ik recht op huurtoeslag / zorgtoeslag” in tekst of meta descriptions.
- [ ] Geen onbewerkte template placeholders (`{{ ... }}`) in de gerenderde HTML.
- [ ] Elke pagina heeft unieke `<title>` en `meta name="description"`.
- [ ] Content is volledig in het Nederlands en geen Lorem-ipsum of AI-ruis.

## 5. Privacy en consent

- [ ] CookieConsent component is aanwezig en blokkeert het AdSense script tot toestemming.
- [ ] Er is een geldige privacyverklaring bereikbaar via `/privacy/` (of equivalent).
- [ ] Geen persoonlijke gegevens worden in URL’s of advertentie-gerelateerde data verwerkt.

## 6. Technische output

- [ ] `npm run build` slaagt zonder fouten.
- [ ] `npm run audit:content` slaagt.
- [ ] `npm run atlas:check` slaagt (inclusief audit:content, link-check, schema-check, performance-check).
- [ ] `npm run preview` draait en de belangrijkste pagina’s zijn bereikbaar.
- [ ] `/ads.txt` is bereikbaar in de preview.

## 7. Handmatige verificatie voor AdSense

- [ ] Controleer in Google AdSense of de property `calculatieloket.nl` de melding “ads.txt niet gevonden” niet meer toont.
- [ ] Controleer of “Aandacht nodig: Lage waarde” / “Needs attention: Low value” is opgelost.
- [ ] Dien pas opnieuw een review in als alle bovenstaande punten groen zijn.

## Gerelateerde bestanden

- `public/ads.txt`
- `src/layouts/BaseLayout.astro`
- `src/components/AdSlot.astro`
- `src/components/CookieConsent.astro`
- `scripts/audit-content-safety.mjs`
