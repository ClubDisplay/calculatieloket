# Dashboard Hosting Plan — FiscalMesh / Calculatieloket

> **Doel:** Vastleggen waar het internationale dashboard gehost wordt en hoe de domeinstrategie voor toekomstige landen wordt opgezet.  
> **Laatst bijgewerkt:** 2026-07-05  
> **Status:** Concept — ter review.

---

## Internationale domeinstrategie

### Hoofdlijnen

- **FiscalMesh** is de internationale/interne laag achter alle landen. Het bevat gedeelde infrastructuur, knowledge objects, rule resolver en calculator engines.
- **dashboard.fiscalmesh.com** wordt het interne control center voor beheer, monitoring, projecten per land en deployment-overslag.
- **Calculatieloket.nl** blijft de Nederlandse publieke calculator-site. Er wordt niet automatisch een internationaliseringslaag over deze site gelegd.
- Buitenlandse publieke sites krijgen per land een **eigen domeinstrategie**. De domeinkeuze wordt niet vooraf bepaald door de merknaam "Calculatieloket".
- **calculatieloket.de**, **calculatieloket.fr**, **calculatieloket.es** en vergelijkbare domeinen kunnen **defensief** worden geregistreerd als ze beschikbaar zijn, zodat ze niet door derden worden gebruikt.
- Deze domeinen worden **niet automatisch als hoofdmerk** gebruikt. Per land wordt onderzocht of een lokale merknaam en domein beter werkt dan een vertaalde variant van Calculatieloket.

### Verplichte bronanalyse per land

Voordat een nieuw land live gaat, wordt per land onderzocht:

- Lokale taal en taalvarianten (bijv. de-DE vs. de-AT, fr-FR vs. fr-BE, es-ES vs. es-MX).
- Lokale zoektermen voor salaris, belasting, toeslagen, wonen, ondernemen en auto.
- Lokale merknaam: is "Calculatieloket" herkenbaar, vertrouwd en uitspreekbaar, of werkt een lokale naam beter?
- Domeinbeschikbaarheid van zowel merknaam als defensieve calculatieloket-variants.
- Officiële fiscale bronnen per land (belastingdienst, toeslagen, pensioen, etc.).
- AdSense/Search Console inrichting per land en domein.
- Juridische/disclaimer eisen: benodigde vermeldingen, privacyverklaring, cookiemelding, aansprakelijkheidstekst.

### Beslisregel

> Nieuwe landen mogen pas live na aparte bronanalyse per land. Nederlandse fiscale regels, percentages, toeslaggrenzen, salarislogica of voorbeeldteksten mogen nooit automatisch worden hergebruikt voor andere landen.

---

## Voorbeeldstructuur

### Intern dashboard

Het dashboard host elk land als apart project, zodat de NL site en toekomstige landen onafhankelijk van elkaar beheerd kunnen worden:

- `dashboard.fiscalmesh.com/projects/calculatieloket-nl`
- `dashboard.fiscalmesh.com/projects/fiscalmesh-de`
- `dashboard.fiscalmesh.com/projects/fiscalmesh-fr`
- `dashboard.fiscalmesh.com/projects/fiscalmesh-es`

### Publieke sites

| Land | Publieke site | Status |
|---|---|---|
| Nederland | calculatieloket.nl | Live |
| Duitsland | domein nog te bepalen | Concept |
| Frankrijk | domein nog te bepalen | Concept |
| Spanje | domein nog te bepalen | Concept |

### Defensief te onderzoeken domeinen

Deze domeinen worden bekeken voor defensieve registratie, niet als automatisch hoofddomein:

- calculatieloket.de
- calculatieloket.fr
- calculatieloket.es
- calculatieloket.be

---

## Verplichte metadata per land/project

Elk project in `dashboard.fiscalmesh.com` bevat minimaal de volgende metadata:

| Veld | Beschrijving | Voorbeeld |
|---|---|---|
| `projectName` | Interne projectnaam | `calculatieloket-nl`, `fiscalmesh-de` |
| `publicDomain` | Gekozen publieke domein | `calculatieloket.nl`, `nog-te-bepalen.de` |
| `country` | Land | Nederland, Duitsland, Frankrijk, Spanje |
| `countryCode` | ISO 3166-1 alpha-2 | `NL`, `DE`, `FR`, `ES` |
| `language` | Hoofdtaal | `nl-NL`, `de-DE`, `fr-FR`, `es-ES` |
| `currency` | Lokale munteenheid | `EUR` |
| `officialSources` | Lijst met officiële bronnen | Belastingdienst, Dienst Toeslagen |
| `adsenseStatus` | AdSense status per domein | `pending`, `active`, `not-applicable` |
| `searchConsoleProperty` | Search Console property | `sc-domain:calculatieloket.nl` |
| `contentClusters` | Beoogde contentclusters | `inkomen, belasting, wonen, ondernemen, auto` |
| `riskLevel` | Risicoinschatting | `low`, `medium`, `high` |
| `localBrandDecision` | Keuze merknaam | `Calculatieloket.nl`, `nog te onderzoeken` |
| `domainStatus` | Domeinstatus | `live`, `defensive`, `available`, `research` |
| `lastSourceReviewDate` | Datum laatste bronreview | `2026-07-05` |
| `nextSprint` | Volgende stap | `bronanalyse`, `domeinregistratie`, `mvp-content` |

---

## Open beslispunten

- Exacte releasevolgorde van landen (DE, FR, ES of BE eerst?).
- Of en wanneer defensieve domeinen worden geregistreerd.
- Lokale merknaam per land: Calculatieloket vertalen, FiscalMesh gebruiken, of iets anders.
- Technische architectuur: subdirectory (`/de/`) vs. apart domein per land.
- Hoe de Calculator Registry en Knowledge Layer worden ingericht voor meerdere landen.

---

> Gerelateerd: `docs/product/00-FISCALMESH-PRODUCT-ROADMAP.md`, `docs/product/MASTER_PROJECT_CONTEXT.md`, `docs/product/06-SEO-ADSENSE-STRATEGY.md`.
