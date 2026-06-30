# Atlas v2 — CI & GitHub documentatie

Deze map bevat handleidingen voor het veilig publiceren van de Atlas repository naar GitHub en het activeren van de Atlas CI-workflow.

## Documenten

- [00 — GitHub Readiness Checklist](00-GITHUB-READINESS.md)  
  Controleer vóór de eerste push of de repository veilig is.

- [01 — Branch Protection](01-BRANCH-PROTECTION.md)  
  Stel branch protection in voor `main` en maak de CI-check verplicht.

- [02 — Actions Runbook](02-ACTIONS-RUNBOOK.md)  
  Handige stappen voor het oplossen van een falende GitHub Actions run.

- [03 — GitHub Activation Runbook](03-GITHUB-ACTIVATION-RUNBOOK.md)  
  Stap-voor-stap terminalcommando's om de lokale repository naar GitHub te pushen en Atlas CI live te activeren.

## Snelstart

1. Draai lokaal `npm run atlas:check` en zorg dat alles groen is.
2. Volg [03-GITHUB-ACTIVATION-RUNBOOK.md](03-GITHUB-ACTIVATION-RUNBOOK.md).
3. Stel branch protection in zoals beschreven in [01-BRANCH-PROTECTION.md](01-BRANCH-PROTECTION.md).
4. Bij problemen, zie [02-ACTIONS-RUNBOOK.md](02-ACTIONS-RUNBOOK.md).

---

> **Belangrijk:** deze handleidingen voeren zelf geen deploy uit en vragen geen secrets. De CI-workflow is puur voor validatie, testen en bouwen.
