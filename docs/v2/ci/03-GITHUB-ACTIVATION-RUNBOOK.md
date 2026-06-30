# 03 — GitHub Activation Runbook

> Doel: de lokale Atlas repository veilig naar GitHub pushen en Atlas CI live activeren.

> Dit runbook wordt **lokaal** uitgevoerd door de eigenaar van de repository. Het voert **geen deploy** uit, vraagt **geen secrets** aan en maakt **geen code-wijzigingen**.

---

## Stap 0 — Pre-push checklist (lokaal)

Voordat je git gebruikt, controleer:

- [ ] `npm run atlas:check` slaagt groen.
- [ ] `package-lock.json` bestaat en is up-to-date.
- [ ] `.github/workflows/atlas-ci.yml` bestaat.
- [ ] `.env` staat in `.gitignore`.
- [ ] De workflow bevat geen deploy-stap, geen secrets en geen Cloudflare/Wrangler commando's.

Terminal:

```bash
npm run atlas:check
ls package-lock.json
ls .github/workflows/atlas-ci.yml
grep -E "^\\.env(\\.|$)" .gitignore
```

> **Belangrijk:** als `npm run atlas:check` lokaal faalt, push dan **niet** naar GitHub. Fix eerst de fout.

---

## Stap 1 — Initialiseer git

```bash
git init
git status
```

Verwachte output: een lijst van untracked files, **geen** `.env`.

---

## Stap 2 — Controleer dat .env niet wordt meegenomen

```bash
git check-ignore -v .env
```

Verwacht: pad naar `.gitignore` en de regel die `.env` matcht.

Als `.env` toch wordt getoond in `git status`, voeg dan toe aan `.gitignore` **vóór** de eerste commit:

```bash
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore
```

---

## Stap 3 — Voeg bestanden toe

```bash
git add .
```

Of selectief:

```bash
git add src/ docs/ public/ .github/ package*.json *.md .gitignore
```

Nooit toevoegen:

```bash
git add .env
git add node_modules/
git add dist/
git add .wrangler/
```

---

## Stap 4 — Eerste commit

```bash
git commit -m "Initial commit: Atlas v2 static site with Knowledge Layer and CI"
```

---

## Stap 5 — Maak een lege GitHub repository

1. Ga naar https://github.com/new
2. Vul repository name in (bijvoorbeeld `calculatieloket`).
3. Kies **Private** of **Public**.
4. **Niet** initialiseren met README, .gitignore of LICENSE — die zitten al lokaal.
5. Klik **Create repository**.

---

## Stap 6 — Voeg remote toe en push

### Optie A — HTTPS (met Personal Access Token)

```bash
git remote add origin https://github.com/GEBRUIKERSNAAM/calculatieloket.git
git branch -M main
git push -u origin main
```

Vul bij de prompt:

- **Gebruikersnaam:** je GitHub gebruikersnaam
- **Wachtwoord:** je Personal Access Token

> ⚠️ Het token heeft minimaal de scopes **`repo`** en **`workflow`** nodig. De `workflow` scope is verplicht omdat de repository een `.github/workflows/atlas-ci.yml` bestand bevat.

Vervang:

- `GEBRUIKERSNAAM` door je GitHub gebruikersnaam.
- `calculatieloket` door de repository naam die je in stap 5 hebt gekozen.

### Optie B — SSH (aanbevolen)

Als je al een SSH-key hebt:

```bash
git remote add origin git@github.com:GEBRUIKERSNAAM/calculatieloket.git
git branch -M main
git push -u origin main
```

Voeg je publieke SSH-key toe aan GitHub: https://github.com/settings/keys

Als je nog geen SSH-key hebt, genereer er een:

```bash
ssh-keygen -t ed25519 -C "jouw@email.com"
cat ~/.ssh/id_ed25519.pub
```

Kopieer de output naar GitHub onder **Settings > SSH and GPG keys > New SSH key**.

> Bij een eerste SSH-push op macOS kan de fout `Host key verification failed` optreden. Zie de troubleshooting hieronder voor de oplossing.

---

## Stap 7 — Controleer na push

- [ ] Open de repository op GitHub.
- [ ] Klik op de **Actions** tab.
- [ ] Controleer dat de workflow **Atlas CI** zichtbaar is.
- [ ] Open de eerste run en wacht tot deze klaar is.
- [ ] Download artifacts via **Actions > Run > Summary > Artifacts**:
  - `atlas-check-report.md`
  - `atlas-check-report.json`

---

## Stap 8 — Branch protection instellen

Zie [01-BRANCH-PROTECTION.md](01-BRANCH-PROTECTION.md) voor de volledige instellingen.

Samenvatting:

1. Ga in GitHub naar **Settings > Branches > Branch protection rules > Add rule**.
2. Branch pattern: `main`.
3. Vink aan:
   - **Require a pull request before merging**
   - **Require status checks to pass before merging**
   - Status check: `Atlas CI / Run Atlas CI checks`
   - **Require branches to be up to date before merging** (aanbevolen)

> Let op: de status check naam is pas beschikbaar nadat de workflow minstens één keer heeft gedraaid. Gebruik hiervoor stap 9.

---

## Stap 9 — Test PR maken

```bash
git checkout -b test/ci-status
# Doe een kleine tekstwijziging in README of changelog, of gebruik een empty commit:
# git commit --allow-empty -m "test: verify CI status check on PR"
git add .
git commit -m "test: verify CI status check on PR"
git push -u origin test/ci-status
```

Open in GitHub een pull request naar `main`. Controleer dat:

- De PR de check **Atlas CI / Run Atlas CI checks** toont.
- De check groen wordt.
- Je de PR pas merged na een groene check.

> De status check naam in de PR is `Atlas CI / Run Atlas CI checks (pull_request)`. In de branch protection instellingen gebruik je de naam zonder `(pull_request)`: `Atlas CI / Run Atlas CI checks`.

---

## Troubleshooting

### `npm ci` faalt in GitHub Actions

**Symptoom:** de installatie-stap faalt.

**Oplossing:**

1. Lokaal `npm install` draaien.
2. `package-lock.json` committen.
3. Nooit `node_modules` committen.

```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "fix: sync package-lock.json"
git push origin main
```

---

### `atlas:check` faalt in CI maar lokaal niet

**Symptoom:** de workflow faalt op `npm run atlas:check`.

**Oplossing:**

1. Controleer Node-versie: workflow gebruikt Node 22.
2. Draai lokaal `node -v`.
3. Verwijder `node_modules` en installeer opnieuw met `npm install`.
4. Vergelijk lokale output met artifact `reports/atlas-check-report.json`.
5. Commit eventuele wijzigingen en push opnieuw.

---

### Workflow is niet zichtbaar in Actions tab

**Symptoom:** na de eerste push verschijnt **Atlas CI** niet onder Actions.

**Oplossing:**

1. Controleer dat `.github/workflows/atlas-ci.yml` in de `main` branch staat.
2. Controleer dat het pad exact is: `.github/workflows/atlas-ci.yml`.
3. Vernieuw de GitHub-pagina; soms duurt het even voordat de workflow wordt geïndexeerd.
4. Controleer of de push naar `main` is gelukt: `git log origin/main`.

---

### Branch protection status check naam niet gevonden

**Symptoom:** in de branch protection dropdown verschijnt `Atlas CI / Run Atlas CI checks` niet.

**Oplossing:**

- De exacte naam is: `Atlas CI / Run Atlas CI checks`.
- De naam is pas beschikbaar **nadat** de workflow minstens één keer heeft gedraaid.
- Maak eerst een test PR zoals beschreven in **Stap 9**; daarna verschijnt de check in de dropdown.

---

### `.env` wordt per ongeluk meegecommit

**Symptoom:** `.env` staat in `git status` of in de commit.

**Oplossing:**

```bash
echo ".env" >> .gitignore
echo ".env.*" >> .gitignore
git add .gitignore
git commit -m "fix: add .env to gitignore"
git push origin main
```

> Als `.env` al in de git-historie zit, moet je die verwijderen met `git filter-repo` of GitHub's BFG Repo-Cleaner. Raadpleeg de GitHub documentatie voor het verwijderen van gevoelige data uit de historie.

---

### Push faalt: Personal Access Token heeft geen `workflow` scope

**Symptoom:**

```text
! [remote rejected] main -> main
  (refusing to allow a Personal Access Token to create or update workflow
  `.github/workflows/atlas-ci.yml` without `workflow` scope)
```

**Oplossing:**

1. Ga naar https://github.com/settings/tokens
2. Genereer een nieuw **classic** token of pas je bestaande token aan.
3. Vink minimaal aan:
   - ✅ `repo`
   - ✅ `workflow`
4. Vervang het oude token in je credential helper (macOS Keychain):

```bash
printf "host=github.com\nprotocol=https\n\n" | git credential-osxkeychain erase
```

5. Push opnieuw en plak het nieuwe token.

---

### Push faalt: `Host key verification failed` (SSH)

**Symptoom:**

```text
Host key verification failed.
fatal: Could not read from remote repository.
```

**Oplossing:** GitHub's host key staat nog niet in `~/.ssh/known_hosts`.

```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
git push -u origin main
```

---

### Push faalt: `Device not configured` of credentials prompt blijft hangen

**Symptoom:**

```text
fatal: could not read Username for 'https://github.com': Device not configured
```

**Oplossing:**

- Voor HTTPS: je token is niet opgeslagen. Draai de push in een echte terminal (niet via een script) zodat je het token kunt plakken.
- Voor SSH: controleer dat je de publieke key aan GitHub hebt toegevoegd en dat de remote URL correct is:

```bash
git remote -v
```

Zie ook **Optie B — SSH** in stap 6.

---

### Push faalt omdat `main` al bestaat op GitHub

**Symptoom:** `git push -u origin main` geeft een error omdat `main` al bestaat.

**Oplossing:**

- Dit gebeurt als je de GitHub repository hebt geïnitialiseerd met een README.
- Gebruik:

```bash
git pull --rebase origin main
git push origin main
```

- Liever: maak de GitHub repo leeg (zonder README) en push opnieuw.

---

### Lokale `git` staat niet geconfigureerd

**Symptoom:** `git commit` vraagt om naam/e-mail.

**Oplossing:**

```bash
git config user.name "Jouw Naam"
git config user.email "jouw@email.com"
```

---

## Gerelateerde documenten

- [00 — GitHub Readiness Checklist](00-GITHUB-READINESS.md)
- [01 — Branch Protection](01-BRANCH-PROTECTION.md)
- [02 — Actions Runbook](02-ACTIONS-RUNBOOK.md)
