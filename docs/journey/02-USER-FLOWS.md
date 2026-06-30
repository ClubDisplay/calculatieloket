# 02 — User Flows

> **Doel:** Tekstuele en conceptuele flowbeschrijvingen van de belangrijkste bezoekersreizen.  
> **Versie:** v0.1  
> **Laatst bijgewerkt:** 2026-06-29

---

## Inhoudsopgave

1. [Flow-diagram (conceptueel)](#flow-diagram-conceptueel)
2. [Flow 1: Werknemer checkt salaris en toeslagen](#flow-1-werknemer-checkt-salaris-en-toeslagen)
3. [Flow 2: Huizenkoper oriënteert zich](#flow-2-huizenkoper-oriënteert-zich)
4. [Flow 3: ZZP'er berekent uurtarief en belasting](#flow-3-zzper-berekent-uurtarief-en-belasting)
5. [Flow 4: Auto-importeur berekent totale kosten](#flow-4-auto-importeur-berekent-totale-kosten)
6. [Flow 5: Toeslagaanvrager checkt rechten](#flow-5-toeslagaanvrager-checkt-rechten)
7. [Flow-patronen](#flow-patronen)

---

## Flow-diagram (conceptueel)

```
Google / direct / homepage
        |
        v
  Primaire calculator
   (bv. bruto-netto)
        |
        |─ Volgende logische stap ──→ Calculator 2
        |─ Alternatief 1             → Calculator 3
        |─ Alternatief 2             → Calculator 4
```

## Flow 1: Werknemer checkt salaris en toeslagen

- **Entry:** Google: "netto salaris 2026"
- **Stap 1:** `/bruto-netto-2026/`
  - Vult bruto maandsalaris 2800 in.
  - Ziet nettoloon indicatie.
- **Vervolgstap A:** `/toeslagen-calculator/`
  - Data: `belastbaar_jaarinkomen` ≈ 36300
  - Checkt zorgtoeslag en huurtoeslag.
- **Vervolgstap B:** `/salaris-calculator/`
  - Gedetailleerder model met pensioenpercentage.

## Flow 2: Huizenkoper oriënteert zich

- **Entry:** Google: "maximale hypotheek 2026"
- **Stap 1:** `/hypotheek-calculator/`
  - Vult bruto jaarinkomen 60000, rente 3.8, looptijd 30.
  - Ziet hypotheekindicatie, bruto/netto maandlasten.
- **Vervolgstap A:** `/bruto-netto-2026/`
  - Checkt netto-effect van maandlasten.
- **Vervolgstap B:** _niet bestaand_ — Overdrachtsbelasting, Eigen geld nodig (toekomstig)

## Flow 3: ZZP'er berekent uurtarief en belasting

- **Entry:** Google: "zzp uurtarief berekenen"
- **Stap 1:** `/zzp-calculator/`
  - Vult gewenst netto, dagen/uren, kosten, pensioen.
  - Ziet benodigd uurtarief en netto indicatie.
- **Vervolgstap A:** `/btw-calculator/`
  - BTW berekenen over het uurtarief.
- **Vervolgstap B:** _niet bestaand_ — Inkomstenbelasting indicatie (toekomstig)

## Flow 4: Auto-importeur berekent totale kosten

- **Entry:** Google: "auto importeren kosten"
- **Stap 1:** `/auto-importkosten-berekenen/`
  - Vult aankoopprijs, BPM, RDW, transport.
  - Ziet totale importkosten indicatie.
- **Vervolgstap A:** _niet bestaand_ — BPM Berekenen (toekomstig)
- **Vervolgstap B:** _niet bestaand_ — Auto Importkosten Duitsland (toekomstig)

## Flow 5: Toeslagaanvrager checkt rechten

- **Entry:** Google: "zorgtoeslag 2026"
- **Stap 1:** `/toeslagen-calculator/`
  - Vult inkomen 28000, alleenstaand, huur 700.
  - Ziet zorgtoeslag en huurtoeslag indicatie.
- **Vervolgstap A:** `/bruto-netto-2026/`
  - Bruto-netto check om zeker te zijn van inkomen.
- **Vervolgstap B:** _niet bestaand_ — Vermogenstoets (toekomstig)

## Flow-patronen

| Patroon | Beschrijving | Voorbeeld |
|---------|-------------|-----------|
| **Input hergebruiken** | Dezelfde data wordt ingelezen in de volgende calculator | `belastbaar_jaarinkomen` van bruto-netto naar toeslagen |
| **Bewustzijn creëren** | De eerste calculator maakt de bezoeker bewust van een andere vraag | "Je inkomen bepaalt ook je recht op toeslagen" |
| **Keten van specialisatie** | Van generiek naar specifiek | Salaris → Hypotheek → Overdrachtsbelasting |
| **Vergelijkend** | Twee of meer naast elkaar | ZZP vs. Loondienst |
