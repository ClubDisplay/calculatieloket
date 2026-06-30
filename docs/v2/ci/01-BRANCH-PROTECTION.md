# 01 — Branch Protection

> Doel: `main` beschermen tegen ongewenste wijzigingen en de Atlas CI-workflow verplicht maken.

---

## Aanbevolen instellingen voor `main`

Ga in GitHub naar:

```
Settings > Branches > Branch protection rules > Add rule
```

Stel in voor branch pattern `main`:

- [ ] **Require a pull request before merging**
  - [ ] **Require approvals**: minimaal 1 (optioneel, afhankelijk van teamgrootte)
  - [ ] **Dismiss stale PR approvals when new commits are pushed** (aanbevolen)
- [ ] **Require status checks to pass before merging**
  - Status check: `Atlas CI / Run Atlas CI checks` (in de dropdown kan deze ook verschijnen als alleen `Run Atlas CI checks`)
  - In de PR zelf toont de check de naam `Atlas CI / Run Atlas CI checks (pull_request)`; in branch protection selecteer je de naam **zonder** `(pull_request)`.
- [ ] **Require branches to be up to date before merging** (aanbevolen)
- [ ] **Restrict pushes that create files larger than 100 MB** (GitHub default)
- [ ] **Do not allow bypassing the above settings** (optioneel; alleen als Barry zelf geen directe push naar `main` wil doen)

> **Belangrijk:** Op een gratis **privé-repository** wordt de branch protection regel **niet afgedwongen** totdat je de repository **public** maakt of upgrade naar GitHub Pro/Team/Enterprise. Je ziet dan de melding **“Not enforced”**. Maak de repo public via **Settings > General > Danger zone > Change repository visibility** als je wilt dat de regel technisch wordt afgedwongen. Op een public repository werkt de regel meteen.

---

## Directe push naar `main`

Standaard is directe push naar `main` **niet** toegestaan. Als Barry bewust wil kunnen pushen naar `main` zonder pull request, dan kan dat door:

- Branch protection uit te schakelen, óf
- Zichzelf als bypasser toe te voegen (alleen beschikbaar bij GitHub Pro/Team/Enterprise).

De aanbeveling is om pull requests verplicht te houden en de CI-check te laten slagen voordat er gemerged wordt.

---

## Controleren

Na het instellen:

1. Maak een nieuwe branch.
2. Doe een kleine wijziging (bijvoorbeeld een tekstfix in README).
3. Open een pull request.
4. Controleer dat de **“Atlas CI / Run Atlas CI checks”** check draait.
5. Merge pas als de check groen is.

Zie ook [02-ACTIONS-RUNBOOK.md](02-ACTIONS-RUNBOOK.md) voor wat te doen als de check faalt en [03-GITHUB-ACTIVATION-RUNBOOK.md](03-GITHUB-ACTIVATION-RUNBOOK.md) voor het stap-voor-stap activeren van GitHub en CI.
