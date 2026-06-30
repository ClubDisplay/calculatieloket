# 04 — Privacy Rules

> **Doel:** Privacy-guardrails voor Next Step Blocks — wanneer mag data worden doorgegeven en hoe.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Kernprincipe](#kernprincipe)
2. [Wat mag wél (v0.1)](#wat-mag-wél-v01)
3. [Wat mag níet (v0.1)](#wat-mag-níet-v01)
4. [Datatypes en hun restricties](#datatypes-en-hun-restricties)
5. [Voorbeeld: goed vs. fout](#voorbeeld-goed-vs-fout)
6. [Checklist per block](#checklist-per-block)

---

## Kernprincipe

> **Datahergebruik in Next Step Blocks is alleen toegestaan via expliciete, opt-in mechanismen en altijd client-side.**  
> De bezoeker moet **altijd** kunnen zien welke data wordt doorgegeven en moet de mogelijkheid hebben om dit te weigeren.

## Wat mag wél (v0.1)

| Situatie | Methode | Voorbeeld |
|----------|---------|-----------|
| Niet-persoonsgebonden getallen | Query-parameter in de URL | `?income=36300` |
| Eenmalig, in dezelfde sessie | localStorage (opt-in, max 7 dagen) | Bruto salaris tijdelijk onthouden |
| URL is deelbaar | De bezoeker kan de URL kopiëren en delen | De parameter is zichtbaar in de adresbalk |
| Bezoeker kiest zelf | Een knop "Gebruik dit bedrag" die de query-string bouwt | "Bereken je toeslagen met dit inkomen →" |

## Wat mag níet (v0.1)

| Situatie | Reden |
|----------|-------|
| Automatisch invullen zonder toestemming | Schendt privacy-verwachting |
| Persoonsgegevens in URL (naam, e-mail, BSN) | Nooit — deze worden ook niet ingevoerd in calculators |
| Data doorgeven via cookies | Geen tracking-cookies zonder consent |
| Data doorgeven aan derden | Geen enkel veld verlaat de browser van de gebruiker |
| Data server-side opslaan | Er is geen backend |
| Query-parameter met `?bsn=...` of `?email=...` | Deze velden bestaan niet in onze calculators |

## Datatypes en hun restricties

| Data | Mag in URL? | Mag in localStorage? | Toelichting |
|------|------------|---------------------|-------------|
| Bruto salaris (getal) | ✅ | ✅ (opt-in) | Anoniem getal, niet herleidbaar |
| Belastbaar jaarinkomen | ✅ | ✅ (opt-in) | Idem |
| Leeftijd (getal) | ✅ | ✅ (opt-in) | Idem |
| Huishoudtype (`single`/`couple`) | ✅ | ✅ (opt-in) | Categorisch, niet herleidbaar |
| Huurbedrag | ✅ | ✅ (opt-in) | Anoniem getal |
| BPM-bedrag | ✅ | ✅ (opt-in) | Idem |
| **Naam** | ❌ | ❌ | Wordt nooit gevraagd |
| **E-mail** | ❌ | ❌ | Wordt nooit gevraagd (v0.1) |
| **BSN** | ❌ | ❌ | Wordt nooit gevraagd |
| **Adres** | ❌ | ❌ | Wordt nooit gevraagd |

## Voorbeeld: goed vs. fout

**✅ Goed:**
```
/toeslagen-calculator/?income=36300
```
De bezoeker ziet in de adresbalk wat er is doorgegeven. Het is een anoniem getal.

**❌ Fout:**
```
/toeslagen-calculator/?income=36300&name=Jan&bsn=123456782
```
Persoonsgegevens in een URL — dit mag nooit.

**✅ Goed (localStorage):**
```js
// Alleen na expliciete opt-in
localStorage.setItem("calculatieloket:income", "36300");
// Automatisch verwijderd na 7 dagen
```

**❌ Fout (localStorage):**
```js
// Zonder opt-in, zonder TTL
localStorage.setItem("income", "36300");
```

## Checklist per block

Bij het definiëren van elk Next Step Block:

- [ ] Bevat `reused_data` alleen niet-persoonsgebonden velden? (getallen, categorieën)
- [ ] Is de `href` een geldige interne link met optionele query-parameter?
- [ ] Staat er een `privacy`-veld met vermelding van de methode? (`none`, `query_param`, `localstorage_optin`)
- [ ] Geen automatische doorgifte zonder gebruikersactie?
- [ ] Voldoet de data aan de restricties in de tabel hierboven?
