# Search Console — Calculatieloket.nl

Deze map bevat maandelijkse Search Console baselines voor Calculatieloket.nl. De data is bedoeld om contentclusters te prioriteren, SEO-vooruitgang te meten en onderhoud te plannen.

## Doel

- Eenmaal per maand een gestructureerde export opslaan.
- Trends in klikken, vertoningen, CTR en positie bijhouden.
- Indexeringsproblemen signaleren en oplossen.
- Input leveren voor de groeidashboard-besluiten in `docs/dashboard/CALCULATIELOKET_GROWTH_DASHBOARD.md`.

## Vereiste exports (maandelijks)

1. **Prestaties > Zoekresultaten > Pagina’s**
   - Periode: laatste 28 dagen.
   - Format: CSV (standaard Google-export).
   - Bevat: URL, klikken, vertoningen, CTR, gemiddelde positie.

2. **Prestaties > Zoekresultaten > Zoekopdrachten**
   - Periode: laatste 28 dagen.
   - Format: CSV.
   - Bevat: zoekopdracht, URL, klikken, vertoningen, CTR, positie.

3. **Indexering > Pagina’s**
   - Export of screenshot van de indexeringsstatus.
   - Bevat: geïndexeerde pagina’s, niet-geïndexeerde pagina’s, belangrijkste redenen.

Optioneel:

4. **Sitemap > status**
   - Screenshot of export van sitemap-index status.

## Privacy en veiligheid

- Search Console-data is eigendom van Calculatieloket.nl en mag niet publiek worden gedeeld.
- CSV’s worden lokaal in deze repo opgeslagen, niet in publieke branches.
- Geen persoonlijke gebruikersdata in de exports; alleen geaggregeerde zoekprestaties.

## Gebruik

- Vul het maandelijkse baselinebestand in met de CSV-export.
- Voeg interpretatie toe onder “Eerste interpretatie”.
- Gebruik de data om contentclusters te prioriteren, niet om SEO-besluiten te forceren zonder context.
- Koppel terug naar het dashboard en sprint-backlog.

## Bestanden

- `README.md` — deze instructie.
- `YYYY-MM-baseline.md` — maandelijkse baseline-templates.
