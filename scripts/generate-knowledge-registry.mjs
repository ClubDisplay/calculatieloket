#!/usr/bin/env node
// scripts/generate-knowledge-registry.mjs
// Atlas v2 — Knowledge Layer Registry Generator v0.1
// Reads YAML Knowledge Objects and generates src/lib/knowledge/generated-objects.ts

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const OBJECTS_DIR = path.resolve(__dirname, "../docs/v2/knowledge/objects");
export const OUTPUT_FILE = path.resolve(__dirname, "../src/lib/knowledge/generated-objects.ts");

const HEADER = `/**
 * AUTO-GENERATED FILE.
 * Do not edit manually.
 * Source: docs/v2/knowledge/objects/*.yml
 */`;

export function readKnowledgeObjects() {
  if (!fs.existsSync(OBJECTS_DIR)) {
    throw new Error(`Kennisobjecten-map niet gevonden: ${OBJECTS_DIR}`);
  }

  const files = fs
    .readdirSync(OBJECTS_DIR)
    .filter((name) => name.endsWith(".yml"))
    .map((name) => path.join(OBJECTS_DIR, name));

  const objects = [];

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = load(raw);

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error(`Ongeldig YAML-object in ${filePath}`);
    }

    if (!data.id || typeof data.id !== "string") {
      throw new Error(`Ontbrekend of ongeldig id in ${filePath}`);
    }

    objects.push(data);
  }

  return objects.sort((a, b) => a.id.localeCompare(b.id, "en"));
}

export function generateRegistry(objects) {
  const serialized = JSON.stringify(objects, null, 2);

  return `${HEADER}\n\nimport type { KnowledgeObject } from "./types";\n\nexport const generatedKnowledgeObjects = ${serialized} satisfies KnowledgeObject[];\n`;
}

function main() {
  console.log("Atlas v2 — Knowledge Layer Registry Generator v0.1\n");

  const objects = readKnowledgeObjects();
  const output = generateRegistry(objects);

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, output, "utf8");

  console.log(`✅ ${objects.length} kennisobjecten gegenereerd.`);
  console.log(`   Output: ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}

if (path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
