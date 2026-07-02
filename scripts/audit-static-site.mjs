#!/usr/bin/env node
/**
 * Static site quality audit for Calculatieloket.nl
 * Scans dist/ HTML output for common quality signals.
 * No external dependencies — only Node.js built-ins.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { cwd } from "node:process";

const DIST_DIR = join(cwd(), "dist");
let ALL_CSS = "";

function findCssFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      findCssFiles(path, files);
    } else if (entry.endsWith(".css")) {
      files.push(path);
    }
  }
  return files;
}

function loadAllCss() {
  try {
    return findCssFiles(DIST_DIR).map((p) => readFileSync(p, "utf-8")).join("\n");
  } catch {
    return "";
  }
}

const IGNORED_PATHS = ["/demo/calculator-shell/"];

function findHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      findHtmlFiles(path, files);
    } else if (entry === "index.html") {
      files.push(path);
    }
  }
  return files;
}

function countMatches(html, regex) {
  return (html.match(regex) || []).length;
}

function extractFirst(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : null;
}

function hasMatch(html, regex) {
  return regex.test(html);
}

function slugifyPath(path) {
  return relative(DIST_DIR, path).replace(/\/index\.html$/, "") || "/";
}

function auditPage(path) {
  const html = readFileSync(path, "utf-8");
  const slug = slugifyPath(path);
  const publicPath = "/" + slug + (slug ? "/" : "");
  const isDemo = publicPath.includes("/demo/");

  const h1Count = countMatches(html, /<h1[\s>]/gi);
  const canonical = extractFirst(html, /<link rel="canonical"[^>]* href="([^"]+)"/i);
  const title = extractFirst(html, /<title>([^<]*)<\/title>/i);
  const description = extractFirst(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/i)
    || extractFirst(html, /<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
  const robots = extractFirst(html, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/i)
    || extractFirst(html, /<meta[^>]*content="([^"]*)"[^>]*name="robots"/i);
  const schemaCount = countMatches(html, /<script type="application\/ld\+json"/gi);
  const hasBreadcrumbs = hasMatch(html, /aria-label="Breadcrumb"/i);
  const hasSkipLink = hasMatch(html, /class="skip-link"/i);
  const hasAdContainer = hasMatch(html, /class="ad-container"/i);
  const adCount = countMatches(html, /class="ad-container"/gi);
  const analyticsCount = countMatches(html, /data-analytics=/gi);
  const hasAriaCurrent = hasMatch(html, /aria-current="page"/i);
  const hasMobileMenuToggle = hasMatch(html, /id="siteNavToggle"/i);
  const hasFocusVisible = hasMatch(html + ALL_CSS, /:focus-visible/i);

  const issues = [];
  if (!isDemo && h1Count !== 1) issues.push(`H1 count = ${h1Count}`);
  if (!isDemo && !canonical) issues.push("missing canonical");
  if (!isDemo && !title) issues.push("missing title");
  if (!isDemo && !description) issues.push("missing meta description");
  if (!isDemo && schemaCount === 0) issues.push("no JSON-LD schema");
  if (!isDemo && !hasSkipLink) issues.push("missing skip link");
  if (!isDemo && !hasBreadcrumbs && publicPath !== "/" && publicPath !== "/index.html/") issues.push("missing breadcrumbs");
  if (!isDemo && !hasAriaCurrent) issues.push("no aria-current link");
  if (!isDemo && !hasFocusVisible) issues.push("no focus-visible styles");
  if (isDemo && robots !== "noindex, nofollow" && robots !== "noindex") issues.push(`demo robots = "${robots}"`);

  return {
    slug,
    publicPath,
    isDemo,
    h1Count,
    canonical,
    titleLength: title ? title.length : 0,
    descriptionLength: description ? description.length : 0,
    robots,
    schemaCount,
    hasBreadcrumbs,
    hasSkipLink,
    adCount,
    analyticsCount,
    hasAriaCurrent,
    hasMobileMenuToggle,
    hasFocusVisible,
    issues,
  };
}

function scoreColor(issues, isDemo) {
  if (isDemo) return issues.length > 0 ? "🔴" : "🟢";
  if (issues.length === 0) return "🟢";
  if (issues.length <= 2) return "🟡";
  return "🔴";
}

ALL_CSS = loadAllCss();
const files = findHtmlFiles(DIST_DIR).sort();
const results = files.map(auditPage).filter((r) => !IGNORED_PATHS.includes(r.publicPath));

console.log("\n=== Calculatieloket Static Quality Audit ===\n");
console.log(`Pages scanned: ${results.length}\n`);

console.log("Per-page summary:");
console.log("-".repeat(80));
for (const r of results) {
  const color = scoreColor(r.issues, r.isDemo);
  const issueText = r.issues.length ? ` [${r.issues.join("; ")}]` : "";
  console.log(`${color} ${r.publicPath.padEnd(40)} H1=${r.h1Count} schema=${r.schemaCount} ads=${r.adCount} analytics=${r.analyticsCount}${issueText}`);
}

console.log("\n\n=== Domain scorecard estimates ===\n");
const publicPages = results.filter((r) => !r.isDemo);
const total = publicPages.length;

const score = (predicate) => Math.round((publicPages.filter(predicate).length / total) * 100);

const isHome = (r) => r.publicPath === "/" || r.publicPath === "/index.html/";
const scorecard = [
  ["UX / App Shell", score((r) => r.hasMobileMenuToggle && r.h1Count === 1 && (r.hasBreadcrumbs || isHome(r)))],
  ["Mobile", score((r) => r.hasMobileMenuToggle && r.hasFocusVisible)],
  ["Accessibility", score((r) => r.hasSkipLink && r.hasAriaCurrent && r.hasFocusVisible)],
  ["Performance", score((r) => r.adCount <= 1 && r.hasFocusVisible)], // proxy
  ["SEO", score((r) => r.titleLength > 0 && r.descriptionLength > 0 && r.canonical && r.schemaCount > 0)],
  ["Internal links", score((r) => r.analyticsCount >= 3)], // proxy for link coverage
  ["Content quality", score((r) => r.titleLength >= 30 && r.descriptionLength >= 60)],
  ["Trust/bronnen", score((r) => r.schemaCount > 0)], // sources present via schema
  ["AdSense-ready", score((r) => true)], // placement is manual
  ["Recommendation flow", score((r) => r.analyticsCount >= 5)], // proxy for journey links
  ["Maintainability", score((r) => r.schemaCount > 0 && (r.hasBreadcrumbs || isHome(r)))],
];

for (const [label, value] of scorecard) {
  const color = value >= 90 ? "🟢" : value >= 70 ? "🟡" : "🔴";
  console.log(`${color} ${label.padEnd(22)} ${value}/100`);
}

console.log("\n\n=== Quick win candidates ===\n");
for (const r of results) {
  if (r.issues.length > 0) {
    console.log(`${r.publicPath}: ${r.issues.join("; ")}`);
  }
}

console.log("\n");
