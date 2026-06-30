# 08 — AI Operating System

> **Status:** Architecture Foundation — v2 Sprint 001  
> **Laatst bijgewerkt:** 2026-06-29

---

## Doel

Beschrijf hoe AI-assistenten Atlas v2 kunnen bedienen: van calculator-definities schrijven tot code genereren, review uitvoeren en content optimaliseren.

---

## Visie

Atlas v2 is niet alleen een platform voor menselijke developers, maar ook een **AI Operating System**. AI-assistenten werken samen met mensen aan:

1. Calculatordefinities schrijven en wijzigen.
2. Code genereren voor engine-modules, pagina's en componenten.
3. Review uitvoeren op regels, SEO, content en toegankelijkheid.
4. Testcases genereren en output vergelijken.
5. Content en FAQ optimaliseren voor SEO en gebruikersvragen.

---

## AI-ingrediënten in Atlas v2

| Onderdeel | Hoe AI het gebruikt |
|---|---|
| **Calculator Definition Language** | AI leest en schrijft YAML. |
| **Rule Engine** | AI vult locale-regels aan op basis van officiële bronnen. |
| **Content Engine** | AI genereert FAQ en uitleg, met menselijke review. |
| **SEO Engine** | AI suggereert titels, descriptions, keywords en structured data. |
| **Component Engine** | AI genereert component-templates. |
| **Generator** | AI roept de generator aan om pagina's te maken. |
| **Validation Engine** | AI genereert testcases. |

---

## AI-prompt architectuur

Standaard prompts voor AI-assistenten:

### Prompt: calculator definitie genereren

```text
Je bent Atlas Architect. Genereer een Calculator Definition YAML voor:
- ID: {id}
- Product: {product}
- Locale: {locale}
- Doel: {doel}

Gebruik de Atlas v2 standaard. Voeg inputs, outputs, rules, FAQ, sources en disclaimers toe.
Vermijd verboden termen: exact, gegarandeerd, je hebt recht op, definitieve.
```

### Prompt: code review

```text
Je bent Atlas Code Reviewer. Review deze wijziging aan {bestand}.
Controleer:
- Geen formulewijzigingen zonder expliciete opdracht.
- Geen DOM in pure rekenfuncties.
- Geen tracking, storage of persoonsgegevens.
- Formatting alleen in format-modules.
- Build moet 15 pagina's opleveren.
```

---

## Guardrails

AI-assistenten in Atlas v2 moeten zich houden aan:

| Regel | Reden |
|---|---|
| **Nooit formules wijzigen zonder akkoord** | Financiële berekeningen zijn gevoelig. |
| **Geen verboden termen** | Juridische veiligheid en SEO. |
| **Geen persoonsgegevens** | Privacy-by-design. |
| **Altijd build controleren** | 15 pagina's, geen errors. |
| **Documentatie bijwerken** | YAML-catalogus en component library up-to-date houden. |
| **Geen deploy zonder akkoord** | Alleen Barry mag deployen. |

---

## AI-rollen (concept)

| Rol | Verantwoordelijkheid |
|---|---|
| **Atlas Architect** | Ontwerp van calculators, journeys en productconfiguraties. |
| **Atlas Developer** | Code genereren en refactoren. |
| **Atlas Content Writer** | SEO-content, FAQ, voorbeelden. |
| **Atlas Reviewer** | Code review, SEO review, compliance check. |
| **Atlas Tester** | Testcases, outputvergelijking, edge cases. |

---

## AI + menselijke review

1. AI genereert voorstel (YAML, code of content).
2. Menselijke review op financiële, juridische en SEO-correctheid.
3. Build draaien en testcases verifiëren.
4. Akkoord Barry voor deploy.

---

## Relatie met huidige v1

De huidige AI-instructies in `docs/08-AI-AGENTS.md` blijven van toepassing. Atlas v2 breidt deze uit met specifieke prompts en guardrails voor de Calculator Definition Language, Rule Engine en Generator.

---

## Volgende stap

In v2 Sprint 002 worden concrete prompts en review-checklists toegevoegd aan `docs/08-AI-AGENTS.md` of een nieuw `docs/v2/AI-OPERATING-MANUAL.md`.
