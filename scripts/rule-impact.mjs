#!/usr/bin/env node
// scripts/rule-impact.mjs
// Atlas v2 — Rule Impact Analysis Tool v0.4
// Vergelijkt twee Knowledge Objects en toont impact op basis van used_by en relationships.
// Ondersteunt zowel human-readable als JSON export.
// Bevat geen PII.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { load } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OBJECTS_DIR = path.resolve(__dirname, "../docs/v2/knowledge/objects");

function parseArgs() {
  const args = process.argv.slice(2);
  const fromIdx = args.indexOf("--from");
  const toIdx = args.indexOf("--to");
  const json = args.includes("--json");
  const fromId = fromIdx !== -1 ? args[fromIdx + 1] : undefined;
  const toId = toIdx !== -1 ? args[toIdx + 1] : undefined;
  return { fromId, toId, json };
}

function loadRegistry() {
  const files = fs
    .readdirSync(OBJECTS_DIR)
    .filter((name) => name.endsWith(".yml"))
    .map((name) => path.join(OBJECTS_DIR, name))
    .sort();

  return files.map((filePath) => load(fs.readFileSync(filePath, "utf8")));
}

function findObject(registry, id) {
  return registry.find((obj) => obj.id === id);
}

function formatValue(value) {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "object") {
    const json = JSON.stringify(value);
    return json.length > 120 ? json.slice(0, 120) + "..." : json;
  }
  return String(value);
}

function simpleTopLevelDiff(a, b) {
  const changes = [];
  if (a === b) return changes;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    changes.push({ path: "data", from: a, to: b });
    return changes;
  }
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
      changes.push({ path: `data.${key}`, from: a[key], to: b[key] });
    }
  }
  return changes;
}

function arrayDiff(a, b) {
  const from = Array.isArray(a) ? a : [];
  const to = Array.isArray(b) ? b : [];
  const onlyInFrom = from.filter(
    (item) => !to.some((t) => JSON.stringify(t) === JSON.stringify(item)),
  );
  const onlyInTo = to.filter(
    (item) => !from.some((f) => JSON.stringify(f) === JSON.stringify(item)),
  );
  const shared = from.filter((item) =>
    to.some((t) => JSON.stringify(t) === JSON.stringify(item)),
  );
  return { onlyInFrom, onlyInTo, shared };
}

function sourceDiff(a, b) {
  const from = Array.isArray(a) ? a : [];
  const to = Array.isArray(b) ? b : [];
  const fromUrls = new Set(from.map((item) => item?.url));
  const toUrls = new Set(to.map((item) => item?.url));
  const onlyInFrom = from.filter((item) => !toUrls.has(item?.url));
  const onlyInTo = to.filter((item) => !fromUrls.has(item?.url));
  const shared = from.filter((item) => toUrls.has(item?.url));
  return { onlyInFrom, onlyInTo, shared };
}

function relationshipKey(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") {
    return `${item.relation || ""}:${item.target || ""}:${item.description || ""}`;
  }
  return JSON.stringify(item);
}

function relationshipsDiff(a, b) {
  const from = Array.isArray(a) ? a : [];
  const to = Array.isArray(b) ? b : [];
  const fromKeys = from.map(relationshipKey);
  const toKeys = to.map(relationshipKey);
  const onlyInFrom = from.filter((_, i) => !toKeys.includes(fromKeys[i]));
  const onlyInTo = to.filter((_, i) => !fromKeys.includes(toKeys[i]));
  const shared = from.filter((_, i) => toKeys.includes(fromKeys[i]));
  return { onlyInFrom, onlyInTo, shared };
}

function formatRelationship(item) {
  if (typeof item === "string") return item;
  if (item && typeof item === "object") {
    const desc = item.description ? ` — ${item.description}` : "";
    return `${item.relation || "?"} → ${item.target || "?"}${desc}`;
  }
  return formatValue(item);
}

function buildContextDiffs(fromObj, toObj) {
  const fields = ["type", "country", "locale", "version", "effective_from", "effective_until"];
  return fields
    .filter((field) => fromObj[field] !== toObj[field])
    .map((field) => ({ field, from: fromObj[field], to: toObj[field] }));
}

function printContextDiff(fromObj, toObj) {
  const diffs = buildContextDiffs(fromObj, toObj);
  if (diffs.length === 0) {
    console.log("  (none)");
    return;
  }
  for (const diff of diffs) {
    console.log(`  ${diff.field}:`);
    console.log(`    from: ${formatValue(diff.from)}`);
    console.log(`    to:   ${formatValue(diff.to)}`);
  }
}

function printDataDiff(fromObj, toObj) {
  const diffs = simpleTopLevelDiff(fromObj.data, toObj.data);
  if (diffs.length === 0) {
    console.log("  (none)");
    return;
  }
  for (const diff of diffs) {
    console.log(`  ${diff.path}:`);
    console.log(`    from: ${formatValue(diff.from)}`);
    console.log(`    to:   ${formatValue(diff.to)}`);
  }
}

function printArrayDiff(label, fromValue, toValue) {
  const { onlyInFrom, onlyInTo } = arrayDiff(fromValue, toValue);
  if (onlyInFrom.length === 0 && onlyInTo.length === 0) {
    console.log("  (none)");
    return;
  }
  for (const item of onlyInFrom) {
    console.log(`  - only in from: ${formatValue(item)}`);
  }
  for (const item of onlyInTo) {
    console.log(`  + only in to:   ${formatValue(item)}`);
  }
}

function calculateRisk(fromObj, toObj, dataDiffs, sourcesDiff, relationshipsDiff) {
  const typeDiff = fromObj.type !== toObj.type;
  const dataDiff = dataDiffs.length > 0;
  const contextDiff =
    fromObj.country !== toObj.country ||
    fromObj.locale !== toObj.locale ||
    fromObj.version !== toObj.version ||
    fromObj.effective_from !== toObj.effective_from ||
    fromObj.effective_until !== toObj.effective_until;
  const sourcesChanged =
    sourcesDiff.onlyInFrom.length > 0 || sourcesDiff.onlyInTo.length > 0;
  const relationshipsChanged =
    relationshipsDiff.onlyInFrom.length > 0 || relationshipsDiff.onlyInTo.length > 0;
  const notesDiff = JSON.stringify(fromObj.notes) !== JSON.stringify(toObj.notes);
  const tagsDiff = JSON.stringify(fromObj.tags) !== JSON.stringify(toObj.tags);

  if (typeDiff || dataDiff) return { level: "high", notesDiff, tagsDiff };
  if (contextDiff || sourcesChanged || relationshipsChanged) return { level: "medium", notesDiff, tagsDiff };
  if (notesDiff || tagsDiff) return { level: "low", notesDiff, tagsDiff };
  return { level: "low", notesDiff, tagsDiff };
}

export function compareObjects(fromObj, toObj) {
  const contextDiffs = buildContextDiffs(fromObj, toObj);
  const dataDiffs = simpleTopLevelDiff(fromObj.data, toObj.data);
  const sourcesDiff = sourceDiff(fromObj.sources, toObj.sources);
  const usedByDiff = arrayDiff(fromObj.used_by, toObj.used_by);
  const relDiff = relationshipsDiff(fromObj.relationships, toObj.relationships);
  const risk = calculateRisk(fromObj, toObj, dataDiffs, sourcesDiff, relDiff);

  return {
    from: {
      id: fromObj.id,
      type: fromObj.type,
      country: fromObj.country,
      locale: fromObj.locale,
      version: fromObj.version,
      effective_from: fromObj.effective_from,
      effective_until: fromObj.effective_until,
    },
    to: {
      id: toObj.id,
      type: toObj.type,
      country: toObj.country,
      locale: toObj.locale,
      version: toObj.version,
      effective_from: toObj.effective_from,
      effective_until: toObj.effective_until,
    },
    differences: {
      context: contextDiffs,
      data: dataDiffs,
      sources: {
        only_in_from: sourcesDiff.onlyInFrom,
        only_in_to: sourcesDiff.onlyInTo,
        shared: sourcesDiff.shared,
      },
      used_by: {
        only_in_from: usedByDiff.onlyInFrom,
        only_in_to: usedByDiff.onlyInTo,
        shared: usedByDiff.shared,
      },
      relationships: {
        only_in_from: relDiff.onlyInFrom,
        only_in_to: relDiff.onlyInTo,
        shared: relDiff.shared,
      },
    },
    impact: {
      affected: [...new Set([...(fromObj.used_by || []), ...(toObj.used_by || [])])],
      risk_level: risk.level,
    },
  };
}

function main() {
  const { fromId, toId, json } = parseArgs();

  if (!fromId || !toId) {
    const message = "Usage: npm run rule:impact -- --from <object-id> --to <object-id> [--json]";
    if (json) {
      console.error(JSON.stringify({ error: message }));
    } else {
      console.error(message);
    }
    process.exit(1);
  }

  const registry = loadRegistry();
  const fromObj = findObject(registry, fromId);
  const toObj = findObject(registry, toId);

  const missing = [];
  if (!fromObj) missing.push(fromId);
  if (!toObj) missing.push(toId);

  if (missing.length > 0) {
    const message = `Object(s) not found: ${missing.join(", ")}`;
    if (json) {
      console.error(JSON.stringify({ error: message }));
    } else {
      console.error(message);
    }
    process.exit(1);
  }

  const contextDiffs = buildContextDiffs(fromObj, toObj);
  const dataDiffs = simpleTopLevelDiff(fromObj.data, toObj.data);
  const sourcesDiff = sourceDiff(fromObj.sources, toObj.sources);
  const usedByDiff = arrayDiff(fromObj.used_by, toObj.used_by);
  const relDiff = relationshipsDiff(fromObj.relationships, toObj.relationships);
  const risk = calculateRisk(fromObj, toObj, dataDiffs, sourcesDiff, relDiff);

  const report = compareObjects(fromObj, toObj);

  if (json) {
    console.log(JSON.stringify(report, null, 2));
    process.exit(0);
  }

  // Human-readable output
  console.log("Atlas v2 — Rule Impact Analysis v0.4\n");
  console.log(`From: ${fromObj.id}`);
  console.log(`To:   ${toObj.id}\n`);

  console.log("Context differences:");
  printContextDiff(fromObj, toObj);

  console.log("\nData differences (top-level keys only):");
  printDataDiff(fromObj, toObj);

  console.log("\nSources differences:");
  if (sourcesDiff.onlyInFrom.length === 0 && sourcesDiff.onlyInTo.length === 0) {
    console.log("  (none)");
  } else {
    for (const item of sourcesDiff.onlyInFrom) {
      console.log(`  - only in from: ${item?.label || item?.url || formatValue(item)}`);
    }
    for (const item of sourcesDiff.onlyInTo) {
      console.log(`  + only in to:   ${item?.label || item?.url || formatValue(item)}`);
    }
  }

  console.log("\nUsed by differences:");
  console.log(`  from: ${fromObj.used_by && fromObj.used_by.length ? fromObj.used_by.join(", ") : "(none)"}`);
  console.log(`  to:   ${toObj.used_by && toObj.used_by.length ? toObj.used_by.join(", ") : "(none)"}`);
  if (usedByDiff.onlyInFrom.length > 0 || usedByDiff.onlyInTo.length > 0) {
    for (const item of usedByDiff.onlyInFrom) {
      console.log(`  - only in from: ${formatValue(item)}`);
    }
    for (const item of usedByDiff.onlyInTo) {
      console.log(`  + only in to:   ${formatValue(item)}`);
    }
  }

  console.log("\nRelationships differences:");
  console.log(`  from: ${fromObj.relationships && fromObj.relationships.length ? fromObj.relationships.length + " item(s)" : "(none)"}`);
  console.log(`  to:   ${toObj.relationships && toObj.relationships.length ? toObj.relationships.length + " item(s)" : "(none)"}`);
  if (relDiff.onlyInFrom.length > 0 || relDiff.onlyInTo.length > 0 || relDiff.shared.length > 0) {
    for (const item of relDiff.onlyInFrom) {
      console.log(`  - only in from: ${formatRelationship(item)}`);
    }
    for (const item of relDiff.shared) {
      console.log(`  = shared:         ${formatRelationship(item)}`);
    }
    for (const item of relDiff.onlyInTo) {
      console.log(`  + only in to:   ${formatRelationship(item)}`);
    }
  }
  if (relDiff.onlyInFrom.length === 0 && relDiff.onlyInTo.length === 0) {
    console.log("  (no differences)");
  }

  const affected = new Set();
  for (const item of toObj.used_by || []) affected.add(formatValue(item));
  for (const item of fromObj.used_by || []) affected.add(formatValue(item));

  console.log("\nImpact summary:");
  console.log(`  affected calculators / engines: ${affected.size > 0 ? [...affected].join(", ") : "(none)"}`);
  console.log(`  risk level: ${risk.level}`);
  if (risk.level === "low" && (risk.notesDiff || risk.tagsDiff)) {
    console.log("  note: only notes/tags differ; no rule-value impact");
  }

  process.exit(0);
}

if (pathToFileURL(process.argv[1] || "").href === import.meta.url) {
  main();
}
