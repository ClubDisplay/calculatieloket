# 00 — Atlas v2 Overview

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Visie

**Atlas v2** is een herbruikbaar platform voor het bouwen, hosten en schalen van calculatorwebsites. Het is géén product op zich, maar de motor onder producten zoals Calculatieloket.nl.

> **Build once. Use everywhere.**

Calculatieloket.nl is de **eerste implementatie** van Atlas v2. Lessen, componenten, rekenlogica en contentpatronen die we daar ontwikkelen, worden structureel geschikt gemaakt voor hergebruik in andere producten, landen en kanalen.

---

## Kernprincipes

| Principe | Betekenis |
|---|---|
| **Product-agnostic** | Atlas kent geen specifieke productnaam, kleur of content. Producten configureren Atlas. |
| **Country-aware** | Regels, valuta, bronnen, wetgeving en taal zijn per land geïsoleerd. |
| **Calculator-first** | Calculators zijn eerste-class citizens: definieerbaar, testbaar, herbruikbaar. |
| **SEO-native** | Elke calculator genereert routes, metadata, structured data en FAQ. |
| **Journey-aware** | Calculators kunnen elkaar aansturen via next steps en data reuse. |
| **AI-native** | AI-assistenten kunnen calculators bouwen, wijzigen en optimaliseren via een declarative DSL. |
| **Static-first** | Productie-output blijft static HTML waar mogelijk, voor performance en hostingflexibiliteit. |

---

## Relatie tussen Atlas v2 en Calculatieloket.nl

```
┌─────────────────────────────────────────────┐
│  Atlas v2 Platform                           │
│  ├── Calculation Engine                     │
│  ├── Rule Engine                            │
│  ├── Validation Engine                      │
│  ├── Formatting Engine                      │
│  ├── Journey Engine                         │
│  ├── SEO Engine                             │
│  ├── Content Engine                         │
│  ├── Component Engine                       │
│  ├── Localization Engine                    │
│  ├── AI Engine                              │
│  └── Partner / API Layer                    │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  Product configuratie                        │
│  calculatieloket.nl / calculatieloket.be / ...│
└─────────────────────────────────────────────┘
```

---

## Doelen

1. Verdeel rekenlogica, content, regels en presentatie over aparte lagen.
2. Maak het mogelijk om dezelfde calculator op meerdere producten en landen te deployen.
3. Biedt een declarative definitietaal voor calculators (YAML) die AI-assistenten kunnen lezen en schrijven.
4. Behoud de huidige website (v1) tijdens de migratie: geen onderbreking van Calculatieloket.nl.

---

## Scope v2 Sprint 001

Deze sprint richt zich uitsluitend op **architectuurvoorbereiding** en documentatie. Er wordt nog geen code geschreven en er worden geen bestaande pagina's gewijzigd.

---

## Volgende stappen

Zie `atlas-v2-roadmap.yml` voor de faseplanning. Sprint 002 zal zich richten op het concrete ontwerp van de **Calculator Definition Language** en de eerste aanzet van de **Rule Engine**.
