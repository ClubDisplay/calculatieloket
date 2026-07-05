#!/usr/bin/env node
// Content-safety audit: fail the build if raw template placeholders or hard claim
// copy leak into the static output text (or source descriptions).
import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import process from "node:process";

const workspaceRoot = process.cwd();

const rawPlaceholderRegex = /\{\{[^\}]+\}\}/g;
// Hard claim: "heb ik/je/u recht op ..." or "recht op huurtoeslag/zorgtoeslag/huur- of zorgtoeslag"
const overclaimRegex = /\b(heb\s+(ik|je|u)\s+recht\s+op|recht\s+op\s+(huurtoeslag|zorgtoeslag|huur-\s*of\s*zorgtoeslag))\b/gi;

const placeholderInDescriptionRegex = /description:\s*"[^"]*\{\{[^"]*"/g;

function stripDataTemplateAttributes(content) {
  // Remove data-template="..." and data-fallback="..." attributes from HTML.
  // This lets us keep templates as JS data while auditing visible text.
  return content.replace(/\sdata-template="[^"]*"/g, "").replace(/\sdata-fallback="[^"]*"/g, "");
}

async function walk(dir, include) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path, include)));
    } else if (include.includes(extname(path))) {
      files.push(path);
    }
  }
  return files;
}

async function checkDistFiles(files) {
  const issues = [];
  for (const file of files) {
    let content = await readFile(file, "utf-8");
    content = stripDataTemplateAttributes(content);
    if (rawPlaceholderRegex.test(content)) {
      const matches = [...content.matchAll(rawPlaceholderRegex)].map((m) => m[0]);
      issues.push(`${file}: raw placeholders in visible text ${[...new Set(matches)].join(", ")}`);
    }
    if (overclaimRegex.test(content)) {
      issues.push(`${file}: hard claim ("recht op") still present`);
    }
  }
  return issues;
}

async function checkPageSource(files) {
  const issues = [];
  for (const file of files) {
    const content = await readFile(file, "utf-8");
    if (placeholderInDescriptionRegex.test(content)) {
      const matches = [...content.matchAll(placeholderInDescriptionRegex)];
      issues.push(`${file}: placeholder in description (use template instead): ${matches.map((m) => m[0]).join(" | ")}`);
    }
    if (overclaimRegex.test(content)) {
      issues.push(`${file}: hard claim ("recht op") still present`);
    }
  }
  return issues;
}

async function checkRegistry(filePath) {
  const issues = [];
  const content = await readFile(filePath, "utf-8");
  if (overclaimRegex.test(content)) {
    issues.push(`${filePath}: hard claim ("recht op") still present`);
  }
  return issues;
}

async function main() {
  const distPath = join(workspaceRoot, "dist");
  const srcPath = join(workspaceRoot, "src");
  const pagesPath = join(srcPath, "pages");
  const distExists = await stat(distPath).then(() => true).catch(() => false);
  const pagesExists = await stat(pagesPath).then(() => true).catch(() => false);
  const registryPath = join(srcPath, "lib/calculators/registry.ts");

  let issues = [];

  if (distExists) {
    const distFiles = await walk(distPath, [".html", ".js", ".css"]);
    issues.push(...(await checkDistFiles(distFiles)));
  } else {
    console.warn("⚠️  dist/ not found; run npm run build first for full output audit.");
  }

  if (pagesExists) {
    const pageFiles = await walk(pagesPath, [".astro"]);
    issues.push(...(await checkPageSource(pageFiles)));
  }

  const registryExists = await stat(registryPath).then(() => true).catch(() => false);
  if (registryExists) {
    issues.push(...(await checkRegistry(registryPath)));
  }

  if (issues.length > 0) {
    console.error("❌ Content-safety audit failed:");
    issues.forEach((issue) => console.error(`  - ${issue}`));
    process.exit(1);
  }

  console.log("✅ Content-safety audit passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
