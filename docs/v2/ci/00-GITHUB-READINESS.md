# 00 — GitHub Readiness Checklist

> Doel: zorgen dat Atlas veilig naar GitHub gepusht kan worden en de CI-workflow correct werkt.

Gebruik deze checklist vóór de eerste push naar GitHub.

---

## Pre-push checklist

- [ ] `.env` staat in `.gitignore` en is **niet** gecommit.
- [ ] `package-lock.json` is aanwezig en up-to-date.
- [ ] `npm run atlas:check` slaagt lokaal.
- [ ] `.github/workflows/atlas-ci.yml` is aanwezig.
- [ ] De workflow bevat **geen** deploy-stap.
- [ ] De workflow vraagt **geen** secrets aan.
- [ ] De workflow roept **geen** Cloudflare/Wrangler commando's aan.

---

## Authenticatie

GitHub accepteert twee manieren om te pushen:

- **SSH (aanbevolen):** gebruik `git remote add origin git@github.com:...`. Zorg dat je publieke SSH-key in GitHub staat en dat `github.com` in `~/.ssh/known_hosts` staat.
- **HTTPS + Personal Access Token:** gebruik `git remote add origin https://github.com/...`. Het token heeft minimaal de scopes **`repo`** en **`workflow`** nodig omdat de repository een workflow bestand bevat.

Zie [03-GITHUB-ACTIVATION-RUNBOOK.md](03-GITHUB-ACTIVATION-RUNBOOK.md) voor exacte stappen en troubleshooting.

---

## Verifieer lokaal

```bash
# 1. Dependency installatie testen (zelfde als CI)
npm ci

# 2. Alle Atlas checks draaien
npm run atlas:check
```

---

## Wat de CI-workflow doet

Zie ook `.github/workflows/atlas-ci.yml`. De workflow:

1. Checkout van de repository.
2. Installeert Node.js 22.
3. Installeert dependencies met `npm ci`.
4. Draait `npm run atlas:check` met Markdown- en JSON-rapporten.
5. Uploadt de rapporten als artifact, ook bij falen.

---

## Wat de CI-workflow **niet** doet

- Geen deploy.
- Geen productie-build publiceren.
- Geen secrets of encrypted variables.
- Geen Cloudflare/Wrangler interactie.

---

## Na de eerste push

1. Controleer in GitHub of de Actions-tab de workflow toont.
2. Maak een test-pull-request om te zien of de check **“Atlas CI / Run Atlas CI checks”** verschijnt.
3. Zie [01-BRANCH-PROTECTION.md](01-BRANCH-PROTECTION.md) voor branch protection instellingen.
4. Zie [02-ACTIONS-RUNBOOK.md](02-ACTIONS-RUNBOOK.md) voor het omgaan met falende runs.
5. Zie [03-GITHUB-ACTIVATION-RUNBOOK.md](03-GITHUB-ACTIVATION-RUNBOOK.md) voor het stap-voor-stap pushen en activeren van Atlas CI.
6. Zie [README.md](README.md) voor het overzicht van alle CI-documentatie.
