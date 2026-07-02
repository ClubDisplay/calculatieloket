#!/usr/bin/env node
/**
 * Atlas v2 — Lighthouse Quality Monitoring
 *
 * Draait Lighthouse op een lokaal statisch preview-server tegen de productiebuild
 * in dist/. Genereert een console summary en een Markdown rapport in reports/.
 *
 * Gebruik:
 *   npm run audit:lighthouse
 *
 * Vereisten:
 *   - Chrome/Chromium moet beschikbaar zijn (chrome-launcher zoekt automatisch).
 *   - dist/ moet bestaan; het script bouwt voor de zekerheid opnieuw.
 */

import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;
const DIST_DIR = "dist";
const REPORTS_DIR = "reports";
const REPORT_FILE = "lighthouse-audit-report.md";
const JSON_FILE = "lighthouse-audit-report.json";

const PAGES = [
  { path: "/", label: "Homepage" },
  { path: "/calculators/", label: "Calculator hub" },
  { path: "/bruto-netto-2026/", label: "Bruto netto 2026" },
  { path: "/categorie/inkomen/", label: "Categorie Inkomen" },
  { path: "/btw-calculator/", label: "BTW calculator" },
  { path: "/zzp-calculator/", label: "ZZP calculator" },
];

const THRESHOLDS = {
  performance: 90,
  accessibility: 95,
  "best-practices": 95,
  seo: 95,
};

const CATEGORY_LABELS = {
  performance: "Performance",
  accessibility: "Accessibility",
  "best-practices": "Best Practices",
  seo: "SEO",
};

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".webp": "image/webp",
};

async function ensureDist() {
  try {
    await fs.access(DIST_DIR);
  } catch {
    console.log("dist/ niet gevonden, bouw opnieuw...");
    execSync("npm run build", { stdio: "inherit" });
  }
}

async function startServer() {
  const server = http.createServer(async (req, res) => {
    let filePath = path.join(DIST_DIR, req.url === "/" ? "index.html" : req.url);

    try {
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
    } catch {
      // probeer .html fallback
      if (!path.extname(filePath)) {
        filePath += ".html";
      }
    }

    try {
      const content = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      });
      res.end(content);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.listen(PORT, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  return server;
}

async function runLighthouse(chrome, page) {
  const url = `${BASE_URL}${page.path}`;
  const options = {
    logLevel: "error",
    output: "json",
    onlyCategories: Object.keys(THRESHOLDS),
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  const lhr = runnerResult.lhr;

  return {
    page,
    url,
    scores: Object.fromEntries(
      Object.keys(THRESHOLDS).map((key) => [
        key,
        Math.round(lhr.categories[key].score * 100),
      ])
    ),
    lhr,
  };
}

function checkThresholds(results) {
  let allPassed = true;
  const failures = [];

  for (const result of results) {
    for (const [category, threshold] of Object.entries(THRESHOLDS)) {
      const score = result.scores[category];
      if (score < threshold) {
        allPassed = false;
        failures.push({
          page: result.page.label,
          category: CATEGORY_LABELS[category],
          score,
          threshold,
        });
      }
    }
  }

  return { allPassed, failures };
}

function printSummary(results, { allPassed, failures }) {
  console.log("\n=== Lighthouse Audit Summary ===\n");
  console.log(
    `${"Pagina".padEnd(24)} ${"Perf".padStart(5)} ${"A11y".padStart(5)} ${"BP".padStart(5)} ${"SEO".padStart(5)}`
  );
  console.log("-".repeat(48));

  for (const result of results) {
    const s = result.scores;
    const line = `${result.page.label.padEnd(24)} ${String(s.performance).padStart(5)} ${String(s.accessibility).padStart(5)} ${String(s["best-practices"]).padStart(5)} ${String(s.seo).padStart(5)}`;
    console.log(line);
  }

  console.log("-".repeat(48));
  console.log(`Drempels: Performance ≥ ${THRESHOLDS.performance}, Accessibility ≥ ${THRESHOLDS.accessibility}, Best Practices ≥ ${THRESHOLDS["best-practices"]}, SEO ≥ ${THRESHOLDS.seo}\n`);

  if (allPassed) {
    console.log("✅ Alle pagina's halen de drempels.");
  } else {
    console.log("❌ Drempels niet overal gehaald:");
    for (const failure of failures) {
      console.log(`   - ${failure.page}: ${failure.category} = ${failure.score} (vereist ≥ ${failure.threshold})`);
    }
  }
}

async function writeReports(results, { allPassed, failures }) {
  await fs.mkdir(REPORTS_DIR, { recursive: true });

  const jsonReport = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    thresholds: THRESHOLDS,
    passed: allPassed,
    failures,
    results: results.map((r) => ({
      page: r.page,
      url: r.url,
      scores: r.scores,
    })),
  };

  await fs.writeFile(
    path.join(REPORTS_DIR, JSON_FILE),
    JSON.stringify(jsonReport, null, 2)
  );

  const rows = results
    .map((r) => {
      const s = r.scores;
      const status = Object.entries(THRESHOLDS).every(([cat, t]) => s[cat] >= t) ? "✅" : "❌";
      return `| ${r.page.label} | ${s.performance} | ${s.accessibility} | ${s["best-practices"]} | ${s.seo} | ${status} |`;
    })
    .join("\n");

  const md = `# Lighthouse Audit Report

**Generated:** ${new Date().toLocaleString("nl-NL")}
**Base URL:** ${BASE_URL}

## Drempels

| Categorie | Drempel |
|-----------|---------|
| Performance | ${THRESHOLDS.performance} |
| Accessibility | ${THRESHOLDS.accessibility} |
| Best Practices | ${THRESHOLDS["best-practices"]} |
| SEO | ${THRESHOLDS.seo} |

## Resultaten

| Pagina | Performance | Accessibility | Best Practices | SEO | Status |
|--------|-------------|---------------|----------------|-----|--------|
${rows}

## Samenvatting

${allPassed ? "✅ Alle pagina's halen de ingestelde drempels." : "❌ Niet alle pagina's halen de drempels."}

${failures.length > 0 ? "### Afwijkingen\n\n" + failures.map((f) => `- **${f.page}**: ${f.category} = ${f.score} (vereist ≥ ${f.threshold})`).join("\n") : ""}

## Opmerkingen

- Deze audit draait lokaal tegen de statische build in \`dist/\`.
- AdSense is uitgeschakeld in de lokale build; productiescores kunnen hierdoor afwijken.
- Voor CI-gebruik moet Chrome/Chromium beschikbaar zijn in de runner.
`;

  await fs.writeFile(path.join(REPORTS_DIR, REPORT_FILE), md);

  console.log(`\n📄 Rapporten opgeslagen in ${REPORTS_DIR}/`);
  console.log(`   - ${JSON_FILE}`);
  console.log(`   - ${REPORT_FILE}`);
}

async function main() {
  let server;
  let chrome;

  try {
    await ensureDist();
    server = await startServer();
    chrome = await chromeLauncher.launch({ chromeFlags: ["--headless", "--no-sandbox"] });

    console.log(`\n🔍 Lighthouse audit op ${PAGES.length} pagina's...`);
    const results = [];
    for (const page of PAGES) {
      process.stdout.write(`   ${page.label} ... `);
      const result = await runLighthouse(chrome, page);
      results.push(result);
      console.log(`✅`);
    }

    const thresholdResult = checkThresholds(results);
    printSummary(results, thresholdResult);
    await writeReports(results, thresholdResult);

    if (!thresholdResult.allPassed) {
      process.exitCode = 1;
    }
  } catch (err) {
    console.error("\n❌ Lighthouse audit mislukt:", err.message);
    if (err.stack) console.error(err.stack);
    process.exitCode = 1;
  } finally {
    if (chrome) await chrome.kill();
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  }
}

main();
