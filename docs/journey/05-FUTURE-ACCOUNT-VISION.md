# 05 — Future Account Vision

> **Doel:** Lange-termijnvisie voor een optioneel Calculatieloket-account.  
> **Versie:** v0.1 (visie-document — geen implementatie)  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Waarom een account?](#waarom-een-account)
2. [Wat een account níet wordt](#wat-een-account-níet-wordt)
3. [Functionaliteiten](#functionaliteiten)
4. [Technische architectuur (indicatie)](#technische-architectuur-indicatie)
5. [Privacy en GDPR](#privacy-en-gdpr)
6. [Roadmap naar account](#roadmap-naar-account)
7. [Open vragen](#open-vragen)

---

## Waarom een account?

- **Gemak voor de bezoeker** — terugkerende berekeningen, salarismutaties, jaarlijkse controles.
- **Datahergebruik** — niet elke keer opnieuw hetzelfde invullen.
- **Mogelijkheid tot notificaties** — "De belastingtarieven voor 2027 zijn gewijzigd. Bekijk wat dit betekent voor jouw nettoloon."
- **Vertrouwen en retentie** — bezoekers bouwen een relatie op met het platform.

> **Let op:** dit is een visie voor de **lange termijn** (Fase 4+). Niets hiervan wordt gebouwd voordat de basis (Fase 1-3) af is en privacy volledig is afgedicht.

## Wat een account níet wordt

- **Geen sociaal netwerk** — geen profielen, geen volgers, geen tijdlijn.
- **Geen dataverkoop** — er worden nooit persoonlijke gegevens verkocht of gedeeld.
- **Geen advertentie-targeting op persoonsniveau** — AdSense blijft contextueel, niet gepersonaliseerd.
- **Geen bankkoppeling** — we lezen nooit banksaldi of transacties uit.
- **Geen advies** — de calculators blijven indicatief; een account verandert daar niets aan.

## Functionaliteiten

| Functie | Prioriteit | Toelichting |
|---------|-----------|------------|
| **E-mailregistratie** (optioneel) | P0 | Minimale account-creatie |
| **Mijn dashboard** | P0 | Overzicht van opgeslagen berekeningen |
| **Herhaalberekening** | P1 | Eerdere berekening met één klik herhalen met bijgewerkte tarieven |
| **Salarismutatie** | P1 | Wat als je bruto wijzigt? Impact op netto en toeslagen |
| **Notificaties** (opt-in) | P2 | Jaarlijkse tariefwijzigingen, nieuwe relevante calculators |
| **Exporteren** | P2 | Berekening als PDF of CSV |
| **Vergelijken** | P2 | Twee scenario's naast elkaar (bv. 32 vs. 40 uur) |
| **Gezinsprofiel** | P3 | Partner en kinderen toevoegen voor toeslagen/hypotheek |

## Technische architectuur (indicatie)

- **Auth:** Supabase Auth (magic link, wachtwoordloos) of Cloudflare Access.
- **Opslag:** Supabase Postgres (gehost in EU) of Cloudflare D1.
- **Encryptie:** Alle financiële data versleuteld at rest. Encryptiesleutels nooit server-side leesbaar zonder gebruikerstoestemming.
- **API:** Tussen de statische Astro-site en de backend via Cloudflare Workers of Supabase Edge Functions.
- **Lokaal-first:** De calculators blijven client-side; het account synchroniseert alleen de **opgeslagen invoer en resultaten** (niet de berekeningen zelf).

## Privacy en GDPR

- **DPIA vereist** vóór implementatie.
- **Data-minimalisatie:** we slaan alleen op wat de gebruiker expliciet kiest op te slaan.
- **Recht op verwijdering:** volledige account- en dataverwijdering met één knop.
- **Geen profilering** — we bouwen geen psychologische profielen of gedragsanalyses.
- **EU-hosting** — alle data in Europese datacenters.
- **AVG-functionaris** adviseren voor de implementatie.

## Roadmap naar account

| Fase | Wanneer | Wat |
|------|---------|-----|
| Fase 1-3 | Nu | Geen account. Client-side only. |
| Fase 4 | ~100 calculators | DPIA, juridische toets, privacy-architectuur |
| Fase 5 | ~250 calculators | Optionele alpha: uitnodiging-only, early adopters |
| Fase 5+ | | Publieke beta, itereren op feedback |

## Open vragen

1. Welk auth-systeem is het meest privacy-vriendelijk en onderhoudsarm?
2. Is er draagvlak voor een freemium-model (basis gratis, premium features)?
3. Willen we een open-source of white-label versie van de calculators voor derden?
4. Hoe meten we het succes van een account (behoud vs. anoniem gebruik)?
5. Welke juridische entiteit is verantwoordelijk voor de data?

> Deze vragen hoeven nu niet beantwoord te worden. Ze dienen als gespreksstarters voor Barry.
