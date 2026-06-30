# 03 — Roadmap

> **Doel:** Faseringsplanning voor de uitbreiding van het calculatorplatform.  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Fase 1 — Stabiliseren (9 calcslators)](#fase-1--stabiliseren-9-calculators)
2. [Fase 2 — Eerste 25 calculators](#fase-2--eerste-25-calculators)
3. [Fase 3 — Eerste 50 calculators](#fase-3--eerste-50-calculators)
4. [Fase 4 — Eerste 100 calculators](#fase-4--eerste-100-calculators)
5. [Fase 5 — 250+ calculators](#fase-5--250-calculators)
6. [Prioriteit per fase](#prioriteit-per-fase)
7. [Uitrolstrategie](#uitrolstrategie)

---

## Fase 1 — Stabiliseren (9 calculators)

| Calculator | Cluster | Actie |
|-----------|---------|-------|
| **BTW Calculator** | Belastingen | Code-refactor; shared utility voor BTW-berekeningen |
| **BTW Terugrekenen** | Belastingen | Same als BTW Calculator |
| **BTW Inclusief/Exclusief** | Belastingen | Same als BTW Calculator |
| **Salaris Calculator** | Inkomen & Salaris | Tax-module extraheren; uniforme Box 1-library |
| **Bruto Netto 2026** | Inkomen & Salaris | Same als Salaris Calculator |
| **Hypotheek Calculator** | Wonen | Annuïteits-formule extraheren |
| **ZZP Calculator** | Ondernemen & ZZP | Iteratieve revenue-loop herzien |
| **Toeslagen Calculator** | Toeslagen & Overheid | Vermogen toevoegen; dubbele resultaatweergave herzien |
| **Auto Importkosten Berekenen** | Auto & Mobiliteit | Cluster uitbreiden met BPM-automaat en DE/FR-specifieke pagina's |

**Doel van deze fase:**
- Alle 9 calculators draaien op gedeelde utility-modules (`src/lib/`).
- Code-duplicatie geëlimineerd (BTW, tax, formatEuro, AHK/AK).
- Alle per-page `<style>`-duplicaten naar global.css.
- iCloud-node_modules opgelost; git geïnitieerd.
- Deploy via `npm run deploy` (wrangler als devDependency).

---

## Fase 2 — Eerste 25 calculators

Nieuwe calculators — selectie uit de prio-A-clusters:

| # | Calculator | Cluster |
|---|-----------|---------|
| 10 | **BPM Berekenen** | Auto & Mobiliteit |
| 11 | **Auto Importkosten Duitsland** | Auto & Mobiliteit |
| 12 | **Bruto-Netto Full** | Inkomen & Salaris |
| 13 | **Bijtelling Auto van de Zaak** | Inkomen & Salaris |
| 14 | **Vakantiegeld-Check** | Inkomen & Salaris |
| 15 | **Annuïtair/Lineair Vergelijk** | Wonen |
| 16 | **Maximale Hypotheek (uitgebreid)** | Wonen |
| 17 | **Zorgtoeslag (uitgebreid)** | Toeslagen & Overheid |
| 18 | **Huurtoeslag (uitgebreid)** | Toeslagen & Overheid |
| 19 | **Kinderopvangtoeslag (KOT)** | Toeslagen & Overheid |
| 20 | **Uurtarief-Check (uitgebreid)** | Ondernemen & ZZP |
| 21 | **ZZP vs. Loondienst** | Ondernemen & ZZP |
| 22 | **Inkomstenbelasting Indicatie** | Belastingen |
| 23 | **Box 3 Vermogensrendementsheffing** | Belastingen |
| 24 | **Schenkbelasting** | Belastingen |
| 25 | **Dagen Tussen Twee Datums** | Datum & Tijd |

**Randvoorwaarden:**
- Alle Fase-1 doelen afgerond.
- Component-bibliotheek uitgebreid met `ResultPanel` en `CalculatorShell`.
- Eerste SEO-data uit Search Console beschikbaar voor prioritering.

---

## Fase 3 — Eerste 50 calculators

Uitbreiding met 25 nieuwe calculators:

| Cluster | Aantal nieuw | Voorbeelden |
|---------|-------------|------------|
| **Belastingen** | 5 | Erfbelasting, Marge-Check, Overdrachtsbelasting, 30%-regeling, Giftenaftrek |
| **Inkomen & Salaris** | 4 | Minimumloon-Check, Overwerk-BTW, Reiskostenvergoeding, Transitievergoeding |
| **Wonen** | 4 | Oversluiten Hypotheek, Huren vs. Kopen, Verbouwingskosten, Energielabel-Subsidie |
| **Auto & Mobiliteit** | 3 | Brandstofkosten, Elektrisch vs. Brandstof, Laadkosten Thuis |
| **Ondernemen & ZZP** | 3 | Omzet-Winst Netto, FOR / Oudedagsreserve, KIA / Investeringsaftrek |
| **Toeslagen & Overheid** | 2 | Kindgebonden Budget (KGB), Studiefinanciering |
| **Pensioen & Vermogen** | 3 | Pensioen Indicatie, Jaarruimte, Sparen vs. Beleggen |
| **Datum & Tijd** | 1 | Feestdagen 2026/2027 |
| **Totaal** | **25** | |

---

## Fase 4 — Eerste 100 calculators

| Cluster | Cumulatief | Opmerking |
|---------|-----------|-----------|
| Belastingen | ~18 | Cluster voltooid |
| Inkomen & Salaris | ~15 | Cluster voltooid |
| Hypotheek & Wonen | ~12 | Cluster voltooid |
| Auto & Mobiliteit | ~10 | Cluster voltooid |
| Ondernemen & ZZP | ~12 | Cluster voltooid |
| Toeslagen & Overheid | ~8 | Cluster grotendeels voltooid |
| Pensioen & Vermogen | ~8 | Nieuw cluster, groeiend |
| Energie | ~6 | Eerste calculators live |
| Datum & Tijd | ~6 | Populaire tools |
| Consumenten | ~5 | Eerste tools |
| Verzekeringen | ~0 | Start in Fase 4 |
| Gezondheid | ~0 | Start in Fase 4 |

**Randvoorwaarden:**
- Alle clusters hebben minimaal een landingspagina.
- Cross-sell componenten gestandaardiseerd.
- Sitemap en interne linkstructuur herzien.

---

## Fase 5 — 250+ calculators

Uitbreiding naar 250+ calculators over alle 12 clusters.

- **Alle C-clusters volgroeid:** Datum & Tijd (~12), Consumenten (~14), Gezondheid (~12), Energie (~10), Verzekeringen (~10).
- **Herbruikbare generatoren** voor repetitieve calculatortypes (bv. datumtools, eenhedenconverters, formule-calculators).
- **Multi-language voorbereid** — if check `lang="nl"` vs. `lang="en"` voor internationale uitrol.
- **API-ready** — calculators als widgets embedbaar op derde partijen (bv. branche-organisaties).
- **Onderhoudsmodus** — jaarlijkse tariefupdates (belasting, toeslagen) via gedeelde configbestanden (`src/data/tax-2026.yml`).

---

## Prioriteit per cluster

| Prioriteit | Clusters | Kenmerken |
|-----------|----------|-----------|
| **A** | Belastingen, Inkomen & Salaris, Wonen, Toeslagen & Overheid | Hoogste search volume, sterkste commerciële intentie. Alle 4 in Fase 2-3 grotendeels af. |
| **B** | Auto & Mobiliteit, Ondernemen & ZZP, Pensioen & Vermogen | Sterke niches. Fase 2-4. |
| **C** | Energie, Verzekeringen, Datum & Tijd, Gezondheid, Consumenten | Lage ontwikkelkosten, hoog bereik. Fase 3-5. |

---

## Uitrolstrategie

1. **Per cluster uitbouwen**, niet gefragmenteerd over clusters. Eén cluster afronden vóór een volgende start.
2. **SEO valideren** — minimaal 30 dagen data van Search Console na livegang van een nieuwe calculator voordat het cluster wordt uitgebreid.
3. **Interne links** — elke nieuwe calculator linkt naar de cluster-landingspagina en vice versa.
4. **Bestaande calculators niet aanpassen zonder validatie** — wijzig geen werkende code zonder QA-pipeline.
5. **Documentatie bijhouden** — elke nieuwe calculator gelijk registreren in `calculators.yml` en de catalogus.
