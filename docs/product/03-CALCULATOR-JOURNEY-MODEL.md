# 03 — Calculator Journey Model

> **Doel:** Definiëren hoe gebruikers straks door Calculatieloket heen reizen als het een app/tool is.  
> **Laatst bijgewerkt:** 2026-06-30

---

## Centrale journey

> **“Ik vul mijn maandinkomen in → wat betekent dit voor salaris, toeslagen, hypotheek en ZZP?”**

Deze journey is de rode draad van Calculatieloket. Iemand met een salarisverandering wil niet alleen weten wat hij netto overhoudt, maar ook wat de financiële impact is op andere gebieden. De site helpt daarbij door elke calculator als volgende stap aan te bieden.

---

## Persona

**Naam:** Lisa  
**Situatie:** Ze begint volgende maand bij een nieuwe werkgever. Haar bruto salaris wordt € 3.500 per maand. Ze wil weten:

1. Wat is mijn netto salaris?
2. Heeft dit invloed op mijn toeslagen?
3. Wat kan ik maximaal lenen voor een huis?
4. Wat zou ik als ZZP’er moeten vragen om hetzelfde netto te halen?

---

## Journey stappen

### Stap 1 — Entry

Lisa komt binnen via:

- Google zoekterm “bruto netto 2026” → `bruto-netto-2026.astro`.
- Homepage → populaire calculator “Bruto Netto 2026”.
- Directe link vanuit een artikel of loonstrook-tool.

### Stap 2 — Primaire vraag beantwoorden

Op de pagina ziet Lisa direct:

- invoervelden: bruto maandsalaris, pensioenpremie, loonheffingskorting;
- het resultaat: netto per maand, met breakdown.

### Stap 3 — Context begrijpen

Onder het resultaat ziet Lisa:

- “Wat kun je hiermee?” met 4 use cases.
- Bronnen (Belastingdienst).
- FAQ met de meest gestelde vragen.
- Disclaimer en update-datum.

### Stap 4 — Vervolgstap kiezen

Gebaseerd op haar resultaat krijgt Lisa gerichte vervolgstappen:

| Vervolgstap | Calculator | Koppeling |
|-------------|------------|-----------|
| Toeslagen checken | Toeslagen Calculator | `?inkomen=3500` |
| Hypotheek bekijken | Hypotheek Calculator | `?inkomen=42000` (jaar) |
| ZZP vergelijken | ZZP Calculator | `?gewenst_netto=2970` |
| Vakantiegeld checken | Vakantiegeld-Check (toekomstig) | `?bruto=3500` |

### Stap 5 — Dieper ingaan

Lisa kiest “Hypotheek bekijken”. De hypotheekpagina vult automatisch haar bruto jaarinkomen in. Ze speelt met rente en looptijd. Daarna keert ze terug naar de salaris-pagina of gaat naar toeslagen.

---

## State overdracht tussen calculators

Omdat er geen account is, gebruiken we URL-parameters en eventueel `sessionStorage`:

- **URL parameter** voor deelbare links: `?bruto=3500`.
- **sessionStorage** voor tijdelijke state tussen pagina’s in dezelfde sessie (bijv. netto doelbedrag voor ZZP). Wordt verwijderd bij sluiten browser.
- **Geen localStorage** zonder expliciete toestemming in cookie-consent.

---

## Aansluiting op bestaande pagina’s

| Huidige pagina | Rol in journey | Nodige aanpassing |
|----------------|----------------|-------------------|
| `bruto-netto-2026.astro` | Startpunt, flagship | Omzetten naar app-patroon; use cases en next steps toevoegen. |
| `salaris-calculator.astro` | Alternatieve start | Samenvoegen of duidelijk onderscheiden; beide gebruiken zelfde shell. |
| `hypotheek-calculator.astro` | Vervolgstap | URL parameter voor inkomen accepteren; resultaat direct tonen. |
| `toeslagen-calculator.astro` | Vervolgstap | URL parameter voor inkomen accepteren; partner/leeftijd default. |
| `zzp-calculator.astro` | Vervolgstap | URL parameter voor gewenst netto accepteren. |
| `btw-calculator.astro` | Losse tool | Direct antwoord patroon; koppeling naar BTW-varianten. |
| `auto-importkosten-berekenen.astro` | Losse tool | Verminderen van velden; resultaat direct tonen. |

---

## Nieuwe calculators die de journey versterken

De huidige set is niet compleet genoeg voor de volledige “inkomen”-reis. Aanbevolen toevoegingen (niet in deze sprint):

- **Vakantiegeld-Check** — “Hoeveel vakantiegeld krijg ik?”
- **Bijtelling Auto van de Zaak** — “Hoeveel kost een leaseauto netto?”
- **ZZP vs. Loondienst** — directe vergelijking op basis van bruto/netto.
- **Bruto-Netto Full** — uitgebreid met partner, kinderen, extra inkomsten, aftrekposten.

---

## Succescriteria voor de journey

1. Vanaf `bruto-netto-2026` kan Lisa binnen 2 klikken een gerelateerde calculator openen met vooringevulde waarde.
2. Elke tussenpagina legt uit waarom deze stap relevant is voor haar vraag.
3. De URL is op elk moment deelbaar en herstelt de invoer.
4. Er is altijd een duidelijke “terug”- of “verder”-optie.
