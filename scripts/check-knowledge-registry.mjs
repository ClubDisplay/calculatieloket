#!/usr/bin/env node
// scripts/check-knowledge-registry.mjs
// Atlas v2 — Knowledge Registry Sync Check v0.1
// Detects whether src/lib/knowledge/generated-objects.ts is in sync with YAML sources.

import fs from "node:fs";
import path from "node:path";
import {
  generateRegistry,
  readKnowledgeObjects,
  OUTPUT_FILE,
} from "./generate-knowledge-registry.mjs";

function main() {
  console.log("Atlas v2 — Knowledge Registry Sync Check v0.1\n");

  const expected = generateRegistry(readKnowledgeObjects());
  const outputPath = path.relative(process.cwd(), OUTPUT_FILE);

  if (!fs.existsSync(OUTPUT_FILE)) {
    console.error(`❌ ${outputPath} bestaat niet.`);
    console.error("   Run: npm run generate:knowledge");
    process.exit(1);
  }

  const actual = fs.readFileSync(OUTPUT_FILE, "utf8");

  if (actual === expected) {
    console.log(`✅ ${outputPath} is up-to-date.`);
    process.exit(0);
  }

  console.error(`❌ ${outputPath} is out of sync with docs/v2/knowledge/objects/*.yml.`);
  console.error("   Run: npm run generate:knowledge");
  process.exit(1);
}

main();
