#!/usr/bin/env node
// scripts/atlas-ci-check.mjs
// Atlas v2 — Local CI Check v0.4
// Voert alle kwaliteitschecks sequentieel uit in de juiste volgorde.
// Ondersteunt optionele Markdown en JSON report output, plus timing per stap.
// Bevat geen PII.

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";

const STEPS = [
  ["generate:knowledge", "Generate Knowledge registry"],
  ["check:knowledge", "Check Knowledge registry sync"],
  ["validate:knowledge", "Validate Knowledge Objects"],
  ["validate:cdl", "Validate Calculator Definitions"],
  ["test", "Run Vitest tests"],
  ["qa:rules", "Run Rule Resolver QA"],
  ["build", "Build Astro site"],
];

function parseArgs() {
  const args = process.argv.slice(2);
  const reportIdx = args.indexOf("--report");
  const jsonReportIdx = args.indexOf("--json-report");
  const reportPath = reportIdx !== -1 ? args[reportIdx + 1] : undefined;
  const jsonReportPath = jsonReportIdx !== -1 ? args[jsonReportIdx + 1] : undefined;
  return { reportPath, jsonReportPath };
}

function formatDuration(durationMs) {
  return `${(durationMs / 1000).toFixed(2)}s`;
}

function ensureDirectory(filePath) {
  const dir = path.dirname(filePath);
  if (dir && dir !== "." && dir !== "/") {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command exited with code ${code}`));
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

function buildMarkdownReport(results, overallStatus, totalDurationMs) {
  const now = new Date().toISOString();
  const statusBadge = overallStatus === "PASS" ? "✅ PASS" : "❌ FAIL";

  const lines = [
    "# Atlas CI Check Report",
    "",
    `**Generated:** ${now}`,
    "",
    `**Overall status:** ${statusBadge}`,
    "",
    `**Total duration:** ${formatDuration(totalDurationMs)}`,
    "",
    "## Steps",
    "",
    "| # | Step | Command | Status | Duration |",
    "|---|---|---|---|---|",
  ];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const stepStatus = result.status === "PASS" ? "✅ PASS" : "❌ FAIL";
    const errorCell = result.error ? `<br>Reason: ${result.error}` : "";
    const durationCell = formatDuration(result.durationMs);
    lines.push(`| ${i + 1} | ${result.label} | ${result.command} | ${stepStatus}${errorCell} | ${durationCell} |`);
  }

  const failedStep = results.find((r) => r.status === "FAIL");
  if (failedStep) {
    lines.push(
      "",
      "## Failure details",
      "",
      `First failing step: **${failedStep.label}**`,
      "",
      `Duration: ${formatDuration(failedStep.durationMs)}`,
      "",
      `Reason: ${failedStep.error}`,
      "",
    );
  }

  return lines.join("\n");
}

function buildJsonReport(results, overallStatus, totalDurationMs) {
  return JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      overall_status: overallStatus,
      total_duration_ms: Math.round(totalDurationMs),
      steps: results.map((result) => ({
        name: result.label,
        command: result.command,
        status: result.status,
        duration_ms: Math.round(result.durationMs),
        error: result.error || null,
      })),
    },
    null,
    2,
  );
}

async function writeReports(reportPath, jsonReportPath, results, overallStatus, totalDurationMs) {
  if (reportPath) {
    try {
      const markdown = buildMarkdownReport(results, overallStatus, totalDurationMs);
      const outPath = path.resolve(reportPath);
      ensureDirectory(outPath);
      fs.writeFileSync(outPath, markdown, "utf8");
      console.log(`\n[REPORT] Markdown report written to ${outPath}`);
    } catch (error) {
      console.error(`\n[REPORT ERROR] Failed to write Markdown report to ${reportPath}: ${error.message}`);
    }
  }

  if (jsonReportPath) {
    try {
      const json = buildJsonReport(results, overallStatus, totalDurationMs);
      const outPath = path.resolve(jsonReportPath);
      ensureDirectory(outPath);
      fs.writeFileSync(outPath, json, "utf8");
      console.log(`[REPORT] JSON report written to ${outPath}`);
    } catch (error) {
      console.error(`[REPORT ERROR] Failed to write JSON report to ${jsonReportPath}: ${error.message}`);
    }
  }
}

async function main() {
  const { reportPath, jsonReportPath } = parseArgs();
  const totalStartTime = performance.now();

  console.log("Atlas v2 — Local CI Check v0.4");
  console.log("================================\n");

  const results = [];
  let overallStatus = "PASS";

  for (const [scriptName, label] of STEPS) {
    const command = `npm run ${scriptName}`;
    const result = { label, command, status: "RUN", error: undefined, durationMs: 0 };
    results.push(result);

    console.log(`[RUN] ${label}: ${command}`);
    const stepStartTime = performance.now();
    try {
      await runCommand("npm", ["run", scriptName]);
      result.status = "PASS";
      result.durationMs = performance.now() - stepStartTime;
      console.log(`[PASS] ${label} (${formatDuration(result.durationMs)})\n`);
    } catch (error) {
      result.status = "FAIL";
      result.error = error.message;
      result.durationMs = performance.now() - stepStartTime;
      overallStatus = "FAIL";
      console.error(`[FAIL] ${label} (${formatDuration(result.durationMs)}): ${error.message}`);
      const totalDurationMs = performance.now() - totalStartTime;
      await writeReports(reportPath, jsonReportPath, results, overallStatus, totalDurationMs);
      process.exit(1);
    }
  }

  const totalDurationMs = performance.now() - totalStartTime;
  console.log(`\n✅ All Atlas CI checks passed in ${formatDuration(totalDurationMs)}.`);
  await writeReports(reportPath, jsonReportPath, results, overallStatus, totalDurationMs);
  process.exit(0);
}

main();
