#!/usr/bin/env node
// scripts/knowledge-changelog.mjs
// Atlas v2 — Knowledge Changelog Generator v0.4
// Genereert Markdown op basis van de JSON output van rule-impact.mjs,
// of op basis van git diff --name-status voor Knowledge Objects.
// Bevat geen PII.

import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { load } from "js-yaml";
import { compareObjects } from "./rule-impact.mjs";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RULE_IMPACT_SCRIPT = path.resolve(__dirname, "rule-impact.mjs");

function parseArgs() {
  const args = process.argv.slice(2);
  const fromIdx = args.indexOf("--from");
  const toIdx = args.indexOf("--to");
  const outputIdx = args.indexOf("--output");
  const baseIdx = args.indexOf("--base");
  const gitDiff = args.includes("--git-diff");
  const auto = args.includes("--auto");
  const fromId = fromIdx !== -1 ? args[fromIdx + 1] : undefined;
  const toId = toIdx !== -1 ? args[toIdx + 1] : undefined;
  const output = outputIdx !== -1 ? args[outputIdx + 1] : undefined;
  const base = baseIdx !== -1 ? args[baseIdx + 1] : "HEAD~1";
  return { fromId, toId, output, gitDiff, auto, base };
}

function formatValue(value) {
  if (value === undefined || value === null) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function formatRelationship(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") {
    const desc = item.description ? ` — ${item.description}` : "";
    return `${item.relation || "?"} → ${item.target || "?"}${desc}`;
  }
  return formatValue(item);
}

function formatSource(item) {
  if (item && typeof item === "object") {
    return item.label || item.url || formatValue(item);
  }
  return formatValue(item);
}

function renderList(items, formatter = formatValue) {
  if (!items || items.length === 0) return "_None_";
  return items.map((item) => `- ${formatter(item)}`).join("\n");
}

function renderDiffSection(title, diff, formatter = formatValue) {
  const lines = [`## ${title}`, ""];
  if (!diff || (diff.only_in_from?.length === 0 && diff.only_in_to?.length === 0 && diff.shared?.length === 0)) {
    lines.push("_No differences._", "");
    return lines.join("\n");
  }

  if (diff.only_in_from?.length > 0) {
    lines.push("### Removed from source", "", renderList(diff.only_in_from, formatter), "");
  }
  if (diff.shared?.length > 0) {
    lines.push("### Shared", "", renderList(diff.shared, formatter), "");
  }
  if (diff.only_in_to?.length > 0) {
    lines.push("### Added in target", "", renderList(diff.only_in_to, formatter), "");
  }
  return lines.join("\n");
}

function buildMarkdown(report) {
  const { from, to, differences, impact } = report;

  const lines = [
    "# Knowledge Object Change",
    "",
    "## From",
    "",
    `| Field | Value |`,
    `|---|---|`,
    `| id | ${formatValue(from.id)} |`,
    `| type | ${formatValue(from.type)} |`,
    `| country | ${formatValue(from.country)} |`,
    `| locale | ${formatValue(from.locale)} |`,
    `| version | ${formatValue(from.version)} |`,
    `| effective_from | ${formatValue(from.effective_from)} |`,
    `| effective_until | ${formatValue(from.effective_until)} |`,
    "",
    "## To",
    "",
    `| Field | Value |`,
    `|---|---|`,
    `| id | ${formatValue(to.id)} |`,
    `| type | ${formatValue(to.type)} |`,
    `| country | ${formatValue(to.country)} |`,
    `| locale | ${formatValue(to.locale)} |`,
    `| version | ${formatValue(to.version)} |`,
    `| effective_from | ${formatValue(to.effective_from)} |`,
    `| effective_until | ${formatValue(to.effective_until)} |`,
    "",
  ];

  // Context differences
  lines.push("## Context", "");
  if (differences.context && differences.context.length > 0) {
    lines.push(`| Field | From | To |`, `|---|---|---|`);
    for (const diff of differences.context) {
      lines.push(`| ${diff.field} | ${formatValue(diff.from)} | ${formatValue(diff.to)} |`);
    }
  } else {
    lines.push("_No differences._");
  }
  lines.push("");

  // Data differences
  lines.push("## Data", "");
  if (differences.data && differences.data.length > 0) {
    lines.push(`| Field | From | To |`, `|---|---|---|`);
    for (const diff of differences.data) {
      lines.push(`| ${diff.path} | ${formatValue(diff.from)} | ${formatValue(diff.to)} |`);
    }
  } else {
    lines.push("_No differences._");
  }
  lines.push("");

  // Sources
  lines.push(renderDiffSection("Sources", differences.sources, formatSource));

  // Used by
  lines.push(renderDiffSection("Used by", differences.used_by));

  // Relationships
  lines.push(renderDiffSection("Relationships", differences.relationships, formatRelationship));

  // Impact
  lines.push(
    "## Impact",
    "",
    `**Risk:** ${impact.risk_level.toUpperCase()}`,
    "",
    "### Affected calculators / engines",
    "",
    impact.affected && impact.affected.length > 0
      ? impact.affected.map((item) => `- ${item}`).join("\n")
      : "_None_",
    "",
  );

  return lines.join("\n");
}

function statusToWord(status) {
  switch (status) {
    case "A":
      return "added";
    case "M":
      return "modified";
    case "D":
      return "deleted";
    default:
      return status;
  }
}

function idFromContent(content) {
  if (!content) return undefined;
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^id:\s*(.+?)\s*$/);
    if (match) {
      let value = match[1];
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      return value.trim();
    }
  }
  return undefined;
}

function idFromPath(filePath) {
  return path.basename(filePath, ".yml");
}

async function readFileFromGit(ref, filePath) {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["show", `${ref}:${filePath}`],
      { cwd: path.resolve(__dirname, "..") },
    );
    return stdout;
  } catch {
    return undefined;
  }
}

function readFileFromDisk(filePath) {
  try {
    return fs.readFileSync(path.resolve(__dirname, "..", filePath), "utf8");
  } catch {
    return undefined;
  }
}

async function detectChangedKnowledgeObjects(base) {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["diff", "--name-status", "--diff-filter=AMDR", base, "--", "docs/v2/knowledge/objects/"],
      { cwd: path.resolve(__dirname, "..") },
    );

    const items = [];
    for (const line of stdout.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const parts = trimmed.split("\t");
      if (parts.length < 2) continue;

      const rawStatus = parts[0];
      const status = rawStatus.charAt(0);

      if (status === "R") {
        const oldPath = parts[1];
        const newPath = parts[2];
        if (!oldPath || !newPath) continue;
        const oldContent = await readFileFromGit(base, oldPath);
        const newContent = readFileFromDisk(newPath) || (await readFileFromGit("HEAD", newPath));
        const oldId = idFromContent(oldContent) || idFromPath(oldPath);
        const newId = idFromContent(newContent) || idFromPath(newPath);
        items.push({ status: "renamed", oldPath, newPath, oldId, newId });
      } else {
        const filePath = parts[1];
        if (!filePath.endsWith(".yml")) continue;
        const content =
          status === "D"
            ? await readFileFromGit(base, filePath)
            : readFileFromDisk(filePath) || (await readFileFromGit("HEAD", filePath));
        const id = idFromContent(content) || idFromPath(filePath);
        items.push({ status: statusToWord(status), path: filePath, id });
      }
    }

    return items;
  } catch (error) {
    throw new Error(`Git diff failed: ${error.stderr || error.message || "unknown error"}`);
  }
}

function buildGitDiffMarkdown(base, items) {
  const lines = [
    "# Knowledge Object Change Report",
    "",
    "## Git diff mode",
    "",
    `**Base:** ${base}`,
    "",
  ];

  if (items.length === 0) {
    lines.push("_No changed Knowledge Objects detected._", "");
  } else {
    lines.push("## Changed Knowledge Objects", "");
    lines.push("| Status | Object ID | Path |", "|---|---|---|");
    for (const item of items) {
      if (item.status === "renamed") {
        const idCell = `${item.oldId} → ${item.newId}`;
        const pathCell = `${item.oldPath} → ${item.newPath}`;
        lines.push(`| renamed | ${idCell} | ${pathCell} |`);
      } else {
        lines.push(`| ${item.status} | ${item.id} | ${item.path} |`);
      }
    }
    lines.push("");
  }

  lines.push(
    "## Note",
    "",
    "Use `npm run knowledge:changelog -- --git-diff --auto [--base <ref>]` to generate automatic per-object impact reports, including full historical `from`/`to` comparisons for modified objects with unchanged IDs.",
    "",
    "For an explicit comparison between two registry objects, run:",
    "",
    "```bash",
    "npm run knowledge:changelog -- --from <object-id> --to <object-id>",
    "```",
    "",
  );

  return lines.join("\n");
}

function stripQuotes(value) {
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1);
  return value;
}

function parseInlineArray(value) {
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }
  return value ? [stripQuotes(value)] : [];
}

function extractUsedBy(content) {
  if (!content) return [];
  const lines = content.split(/\r?\n/);
  let inUsedBy = false;
  let baseIndent = null;
  const items = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "");
    const match = line.match(/^(\s*)used_by:\s*(.*)$/);
    if (match) {
      inUsedBy = true;
      const rest = match[2].trim();
      if (rest) {
        items.push(...parseInlineArray(rest));
      }
      baseIndent = match[1].length;
      continue;
    }

    if (inUsedBy) {
      const trimmed = line.trim();
      if (trimmed === "") continue;
      const indentMatch = line.match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1].length : 0;
      if (baseIndent !== null && indent <= baseIndent) break;

      const itemMatch = line.match(/^(\s*)-\s*(.*)$/);
      if (itemMatch) {
        const value = itemMatch[2].trim();
        if (value) items.push(stripQuotes(value));
      }
    }
  }

  return items;
}

async function runRuleImpact(fromId, toId) {
  try {
    const { stdout, stderr } = await execFileAsync(
      "node",
      [RULE_IMPACT_SCRIPT, "--from", fromId, "--to", toId, "--json"],
      { cwd: path.resolve(__dirname, "..") },
    );
    if (stderr) return null;
    return JSON.parse(stdout);
  } catch {
    return null;
  }
}

function renderAffectedConsumers(report) {
  if (!report || !report.impact) return "none";
  return report.impact.affected && report.impact.affected.length > 0
    ? report.impact.affected.join(", ")
    : "none";
}

function formatCompactDiffTable(diffs) {
  if (!diffs || diffs.length === 0) return "_No differences._";
  return [
    "| Field | From | To |",
    "|---|---|---|",
    ...diffs.map((diff) => `| ${diff.field || diff.path} | ${formatValue(diff.from)} | ${formatValue(diff.to)} |`),
  ].join("\n");
}

function renderCompactDiffSection(title, diff, formatter = formatValue) {
  const lines = [`**${title}**`, ""];
  if (!diff || (diff.only_in_from?.length === 0 && diff.only_in_to?.length === 0 && diff.shared?.length === 0)) {
    lines.push("_No differences._", "");
    return lines.join("\n");
  }

  if (diff.only_in_from?.length > 0) {
    lines.push("_Removed from source:_", renderList(diff.only_in_from, formatter), "");
  }
  if (diff.shared?.length > 0) {
    lines.push("_Shared:_", renderList(diff.shared, formatter), "");
  }
  if (diff.only_in_to?.length > 0) {
    lines.push("_Added in target:_", renderList(diff.only_in_to, formatter), "");
  }
  return lines.join("\n");
}

function renderCompactReport(report) {
  const lines = [];
  lines.push(`**From:** ${formatValue(report.from.id)} (${formatValue(report.from.version)})`);
  lines.push(`**To:** ${formatValue(report.to.id)} (${formatValue(report.to.version)})`);
  lines.push("");
  lines.push("**Context differences**", "", formatCompactDiffTable(report.differences.context), "");
  lines.push("**Data differences**", "", formatCompactDiffTable(report.differences.data), "");
  lines.push(renderCompactDiffSection("Sources", report.differences.sources, formatSource));
  lines.push(renderCompactDiffSection("Used by", report.differences.used_by));
  lines.push(renderCompactDiffSection("Relationships", report.differences.relationships, formatRelationship));
  lines.push("**Impact**", "");
  lines.push(`- **Risk:** ${report.impact.risk_level.toUpperCase()}`);
  lines.push(`- **Affected calculators / engines:** ${report.impact.affected && report.impact.affected.length > 0 ? report.impact.affected.join(", ") : "_None_"}`);
  lines.push("");
  return lines.join("\n");
}

async function renderModifiedImpact(lines, item, base) {
  const oldContent = await readFileFromGit(base, item.path);
  const newContent = readFileFromDisk(item.path) || (await readFileFromGit("HEAD", item.path));
  const oldId = idFromContent(oldContent) || idFromPath(item.path);
  const newId = idFromContent(newContent) || idFromPath(item.path);

  lines.push(`### ${newId} (modified)`, "");
  lines.push(`- **Status:** modified`);
  lines.push(`- **Object ID:** ${newId}`);
  lines.push(`- **Path:** ${item.path}`);

  if (oldId !== newId) {
    const report = await runRuleImpact(oldId, newId);
    if (report) {
      lines.push(`- **Risk:** ${report.impact.risk_level.toUpperCase()}`);
      lines.push(`- **Affected consumers:** ${renderAffectedConsumers(report)}`);
    } else {
      lines.push(`- **Note:** The object ID changed from \`${oldId}\` to \`${newId}\`, but a full \`rule-impact\` report could not be generated.`);
    }
  } else {
    try {
      const oldObj = load(oldContent);
      const newObj = load(newContent);
      const report = compareObjects(oldObj, newObj);
      lines.push(`- **Risk:** ${report.impact.risk_level.toUpperCase()}`);
      lines.push(`- **Affected consumers:** ${renderAffectedConsumers(report)}`);
      lines.push("");
      lines.push(renderCompactReport(report));
    } catch (error) {
      lines.push(`- **Note:** Could not generate a full historical comparison: ${error.message || "YAML parsing failed"}. Falling back to \`used_by\` diff.`);
      const oldUsedBy = extractUsedBy(oldContent);
      const newUsedBy = extractUsedBy(newContent);
      const added = newUsedBy.filter((consumer) => !oldUsedBy.includes(consumer));
      const removed = oldUsedBy.filter((consumer) => !newUsedBy.includes(consumer));
      if (added.length > 0) lines.push(`- **New affected consumers:** ${added.join(", ")}`);
      if (removed.length > 0) lines.push(`- **Removed affected consumers:** ${removed.join(", ")}`);
      if (added.length === 0 && removed.length === 0 && newUsedBy.length > 0) {
        lines.push(`- **Affected consumers:** ${newUsedBy.join(", ")} (unchanged)`);
      }
    }
  }

  lines.push("");
}

async function renderRenamedImpact(lines, item) {
  const report = item.oldId && item.newId && item.oldId !== item.newId
    ? await runRuleImpact(item.oldId, item.newId)
    : null;

  lines.push(`### ${item.oldId} → ${item.newId} (renamed)`, "");
  lines.push(`- **Status:** renamed`);
  lines.push(`- **Old ID:** ${item.oldId}`);
  lines.push(`- **New ID:** ${item.newId}`);
  lines.push(`- **Old path:** ${item.oldPath}`);
  lines.push(`- **New path:** ${item.newPath}`);

  if (report) {
    lines.push(`- **Risk:** ${report.impact.risk_level.toUpperCase()}`);
    lines.push(`- **Affected consumers:** ${renderAffectedConsumers(report)}`);
  } else if (item.oldId === item.newId) {
    lines.push(`- **Note:** The file was renamed but the object ID stayed the same. No separate impact comparison via \`rule-impact\` is needed for the ID itself.`);
  } else {
    lines.push(`- **Note:** Could not generate a full \`rule-impact\` report (one or both IDs are not present in the current registry).`);
  }

  lines.push("");
}

function renderAddedImpact(lines, item) {
  const content = readFileFromDisk(item.path) || "";
  const usedBy = extractUsedBy(content);

  lines.push(`### ${item.id} (added)`, "");
  lines.push(`- **Status:** added`);
  lines.push(`- **Object ID:** ${item.id}`);
  lines.push(`- **Path:** ${item.path}`);
  lines.push(`- **Note:** New Knowledge Object added to the registry.`);
  if (usedBy.length > 0) {
    lines.push(`- **Affected consumers:** ${usedBy.join(", ")}`);
  }
  lines.push("");
}

async function renderDeletedImpact(lines, item, base) {
  const content = await readFileFromGit(base, item.path);
  const usedBy = extractUsedBy(content);

  lines.push(`### ${item.id} (deleted)`, "");
  lines.push(`- **Status:** deleted`);
  lines.push(`- **Object ID:** ${item.id}`);
  lines.push(`- **Path:** ${item.path}`);
  lines.push(`- **Note:** Knowledge Object removed from the registry.`);
  if (usedBy.length > 0) {
    lines.push(`- **Previously affected consumers:** ${usedBy.join(", ")}`);
  }
  lines.push("");
}

async function buildAutoGitDiffMarkdown(base) {
  const items = await detectChangedKnowledgeObjects(base);

  const lines = [
    "# Knowledge Object Change Report — Auto Impact Mode",
    "",
    "## Git diff mode",
    "",
    `**Base:** ${base}`,
    "",
  ];

  if (items.length === 0) {
    lines.push("_No changed Knowledge Objects detected._", "");
    lines.push("## Note", "", "No changes detected, so no impact reports are generated.", "");
    return lines.join("\n");
  }

  lines.push("## Changed Knowledge Objects", "");
  lines.push("| Status | Object ID | Path |", "|---|---|---|");
  for (const item of items) {
    if (item.status === "renamed") {
      lines.push(`| renamed | ${item.oldId} → ${item.newId} | ${item.oldPath} → ${item.newPath} |`);
    } else {
      lines.push(`| ${item.status} | ${item.id} | ${item.path} |`);
    }
  }
  lines.push("");

  lines.push("## Impact details", "");
  for (const item of items) {
    if (item.status === "renamed") await renderRenamedImpact(lines, item);
    else if (item.status === "added") renderAddedImpact(lines, item);
    else if (item.status === "deleted") await renderDeletedImpact(lines, item, base);
    else if (item.status === "modified") await renderModifiedImpact(lines, item, base);
  }

  lines.push(
    "## Note",
    "",
    "v0.4: full historical `from`/`to` comparisons for modified objects with unchanged IDs are generated by reusing the same diff logic as `rule-impact`. Remaining limitations: complex renames or changes outside the `docs/v2/knowledge/objects/` directory may still require manual review.",
    "",
  );

  return lines.join("\n");
}

async function writeOutput(markdown, output) {
  if (output) {
    const outPath = path.resolve(output);
    fs.writeFileSync(outPath, markdown, "utf8");
    console.log(`Markdown changelog written to ${outPath}`);
  } else {
    console.log(markdown);
  }
}

async function main() {
  const { fromId, toId, output, gitDiff, auto, base } = parseArgs();

  try {
    if (gitDiff && auto) {
      const markdown = await buildAutoGitDiffMarkdown(base);
      await writeOutput(markdown, output);
      process.exit(0);
    }

    if (gitDiff) {
      const changedFiles = await detectChangedKnowledgeObjects(base);
      const markdown = buildGitDiffMarkdown(base, changedFiles);
      await writeOutput(markdown, output);
      process.exit(0);
    }

    if (!fromId || !toId) {
      console.error("Usage: npm run knowledge:changelog -- --from <object-id> --to <object-id> [--output <file.md>]");
      console.error("       npm run knowledge:changelog -- --git-diff [--base HEAD~1] [--output <file.md>]");
      console.error("       npm run knowledge:changelog -- --git-diff --auto [--base HEAD~1] [--output <file.md>]");
      process.exit(1);
    }


    const { stdout, stderr } = await execFileAsync(
      "node",
      [RULE_IMPACT_SCRIPT, "--from", fromId, "--to", toId, "--json"],
      { cwd: path.resolve(__dirname, "..") },
    );

    if (stderr) {
      // rule-impact writes errors to stderr as JSON
      console.error(stderr.trim());
      process.exit(1);
    }

    const report = JSON.parse(stdout);
    const markdown = buildMarkdown(report);

    if (output) {
      const outPath = path.resolve(output);
      fs.writeFileSync(outPath, markdown, "utf8");
      console.log(`Markdown changelog written to ${outPath}`);
    } else {
      console.log(markdown);
    }

    process.exit(0);
  } catch (error) {
    if (error.stderr) {
      try {
        const parsed = JSON.parse(error.stderr);
        console.error(parsed.error || error.stderr.trim());
      } catch {
        console.error(error.stderr.trim());
      }
    } else {
      console.error(error.message || "Failed to generate changelog");
    }
    process.exit(1);
  }
}

main();
