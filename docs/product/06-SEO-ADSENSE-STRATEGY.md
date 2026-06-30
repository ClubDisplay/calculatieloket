# 06 — SEO & AdSense Strategy

> **Doel:** Zorgen dat de app/tool-ervaring van Calculatieloket SEO-vriendelijk en AdSense-vriendelijk blijft. De tool staat bovenaan; SEO-content en advertenties staan eronder en verstoren de flow niet.  
> **Laatst bijgewerkt:** 2026-06-30

---

## Gouden regel

> **App-ervaring bovenaan. SEO-content daaronder. Geen advertenties tussen invoer en resultaat. Geen calculator verstoppen achter client-only flows.**

De gebruiker komt binnen voor een snel antwoord. Zoekmachines en advertentienetwerken komen binnen voor content, structuur en indexeerbare context. Beide doelgroepen krijgen wat ze nodig hebben, maar in de juiste volgorde.

---

## 1. SEO-vereisten per calculatorpagina

Elke calculatorpagina moet server-rendered zijn en de volgende SEO-elementen bevatten:

| Element | Eisen |
|---------|-------|
| **Title tag** | Duidelijk, met hoofdkeyword + jaar (bijv. “Bruto Netto 2026 berekenen — indicatie nettoloon”). Max 60 tekens. |
| **Meta description** | 1 zin met voordeel + call-to-action. Max 155 tekens. |
| **Canonical URL** | Zelf-refererend, zonder query parameters. |
| **H1** | Één H1 bovenaan, identiek of sterk verwant aan title. |
| **Schema.org** | `SoftwareApplication` + `FAQPage` (indien van toepassing) + `HowTo` voor voorbeeldberekeningen. |
| **Introductietekst** | 1–2 zinnen boven de tool, met het hoofdkeyword. |
| **Content onder de tool** | Uitleg, voorbeelden, veelgemaakte fouten, FAQ, bronnen. Minimaal 300–500 woorden. |
| **Interne links** | Minimaal 3–5 gerelateerde calculators/tools. |
| **Bronvermelding** | Links naar officiële bronnen (Belastingdienst, RDW, Nibud, etc.). |
| **Update-datum** | “Laatst bijgewerkt: …” voor freshness signal. |

**Belangrijk:** de calculator zelf mag **niet** achter een JavaScript-laag verstopt zijn. De invoervelden en het initiële resultaat moeten in de HTML staan, zodat de pagina volledig indexeerbaar is zonder JavaScript.

---

## 2. AdSense-plaatsingsregels

Advertenties mogen de tool-flow niet onderbreken. Toegestane locaties:

| Locatie | Toegestaan | Opmerking |
|---------|------------|-----------|
| **Boven de tool** | Ja, max 1 leaderboard | Mag de hero niet domineren. |
| **Onder de resultaatkaart** | Ja, max 1 medium rectangle of leaderboard | Pas ná het antwoord. |
| **Tussen contentblokken** | Ja, max 2 | Onder uitleg, voorbeelden of FAQ. |
| **Tussen invoer en resultaat** | **Nee** | Dit verstoort de app-ervaring direct. |
| **In resultaatkaart** | **Nee** | Het resultaat moet clean en vertrouwd blijven. |
| **Sticky footer met advertentie** | **Nee** | Te opdringerig op mobiel. |

**Richtlijnen:**

- Gebruik `data-ad-format="auto"` met vaste containers om layout shift te voorkomen.
- Zorg dat advertentie-containers een min-height hebben zodat de pagina niet springt.
- Houd op mobiel voldoende witruimte tussen ads en touch targets.
- Test viewability: ads onder de tool scoren beter omdat gebruikers erheen scrollen.

---

## 3. Internationale SEO-structuur per land

Calculatieloket is nu NL-georiënteerd, maar de FiscalMesh/Atlas engine ondersteunt meerdere landen. Voor toekomstige landen:

| Aspect | Aanpak |
|--------|--------|
| **URL-structuur** | Subdirectory per land: `/nl/btw-calculator/`, `/be/btw-calculator/`, `/de/btw-calculator/`. |
| **Hreflang** | Elke pagina krijgt `hreflang` tags per taal/land. Bijv. `nl-NL`, `nl-BE`, `fr-BE`, `de-DE`. |
| **Locale in HTML** | `<html lang="nl">` (of `fr`, `de`, `es`). |
| **Content** | Volledig vertaald per land, inclusief voorbeelden en FAQ. |
| **Knowledge Objects** | Per land aparte objects (`nl.vat.standard`, `be.vat.standard`, etc.). |
| **Canonical** | Per land een eigen canonical. Geen cross-country canonical zonder hreflang. |

**Huidige prioriteit:** focus op `nl-NL`. De structuur moet wel voorbereid zijn op uitbreiding.

---

## 4. Contentblokken die altijd server-rendered/indexeerbaar moeten blijven

De volgende onderdelen moeten in de statische HTML staan en niet later door JavaScript worden geladen:

- **Hero micro-header** (titel, korte omschrijving).
- **Invoervelden** met defaults en labels.
- **Initieel resultaat** op basis van defaults (zodat er altijd content is zonder JS).
- **Uitlegsectie** (“Hoe werkt deze berekening?”).
- **Voorbeeldberekeningen**.
- **Veelgemaakte fouten**.
- **FAQ**.
- **Bronnen**.
- **Disclaimer** en update-datum.
- **Gerelateerde calculators** (cross-sell).

Client-side mag alleen het **resultaat bijwerken** op basis van gebruikersinvoer. De structuur en SEO-content blijven statisch.

---

## 5. Interne linkstrategie

Doel: bezoekers van één tool naar meerdere tools leiden, en zoekmachines helpen de cluster-structuur te begrijpen.

### Per calculatorpagina

- **In de tool:** 1–2 contextuele next-step links onder het resultaat (bijv. “Bekijk welke toeslagen je kunt krijgen”).
- **In “Wat kun je hiermee?”:** 3–4 use-case kaartjes met anchor links naar gerelateerde calculators.
- **Onder de content:** `CrossSellCards` met 4–6 gerelateerde calculators.
- **In FAQ:** waar relevant een link naar een andere calculator (bijv. “Gebruik de toeslagen calculator voor een indicatie.”).

### Clustering

| Cluster | Voorbeeld interne linkstructuur |
|---------|--------------------------------|
| **Inkomen** | Bruto-netto → Salaris → Vakantiegeld → Bijtelling → ZZP vs. Loondienst |
| **Wonen** | Hypotheek → Annuïtair/Lineair → Huren vs. Kopen |
| **Belastingen** | BTW → BTW terugrekenen → BTW in/exclusief → Inkomstenbelasting → Box 3 |
| **Auto** | Auto importkosten → BPM berekenen → Duitsland import → Brandstofkosten |
| **Ondernemen** | ZZP → Uurtarief → Omzet-Winst-Netto → FOR → KIA |
| **Toeslagen** | Toeslagen → Zorgtoeslag → Huurtoeslag → KOT → KGB |

### Breadcrumbs

Overweeg een eenvoudige breadcrumb: `Home > Inkomen > Bruto-netto 2026`. Dit versterkt de clusterstructuur.

### Anchor teksten

Gebruik beschrijvende anchors: “Bereken je nettoloon”, “Bekijk de hypotheekindicatie”, “Controleer toeslagen”. Vermijd generieke “klik hier”.

---

## 6. Meetpunten

Meet de app-ervaring én de SEO/AdSense-prestaties. Gebruik geen PII en volg de bestaande cookie-consent.

### Gebruikersinteractie

| Metric | Definitie | Tool |
|--------|-----------|------|
| **Organic clicks** | Kliks vanuit Google zoekresultaten | Search Console |
| **Pageviews per sessie** | Gemiddeld aantal pagina’s per bezoek | Analytics / Cloudflare Web Analytics |
| **Calculator starts** | Pagina laadt met een calculator | Eigen event: `calculator_start` |
| **Calculator completions** | Gebruiker wijzigt invoer en krijgt resultaat | Eigen event: `calculator_complete` |
| **Result views** | Resultaat sectie wordt zichtbaar | Eigen event: `result_view` |
| **Next-step clicks** | Klik op een vervolgstap/use-case | Eigen event: `next_step_click` |
| **Scroll depth** | Hoe ver gebruikers scrollen | Analytics / Cloudflare Web Analytics |

### Advertenties

| Metric | Definitie | Tool |
|--------|-----------|------|
| **Ad RPM** | Opbrengst per 1000 pageviews | AdSense |
| **Viewability** | Percentage ads dat daadwerkelijk in beeld komt | AdSense |
| **Layout shift** | Cumulative Layout Shift (CLS) rondom ads | Lighthouse / Chrome UX Report |

### SEO

| Metric | Definitie | Tool |
|--------|-----------|------|
| **Average position** | Gemiddelde positie in Google | Search Console |
| **CTR** | Click-through rate per zoekterm | Search Console |
| **Core Web Vitals** | LCP, INP, CLS | Search Console / Lighthouse |
| **Indexed pages** | Aantal geïndexeerde URLs | Search Console |

---

## Samenvatting

- Tool bovenaan, direct antwoord, geen ads tussen invoer/resultaat.
- SEO-content en FAQ server-rendered onder de tool.
- Interne links leiden naar gerelateerde tools en versterken clusters.
- Hreflang + land-subdirectory voorbereiden voor internationale uitbreiding.
- Meet interactie, SEO en ads apart, maar combineer ze in een dashboard voor optimalisatie.
