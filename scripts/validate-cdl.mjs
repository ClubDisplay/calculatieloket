#!/usr/bin/env node
// scripts/validate-cdl.mjs
// Atlas v2 — CDL Validator v0.3
// Valideert Calculator Definition YAML's tegen het v0.3 schema.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFINITIONS_DIR = path.resolve(__dirname, "../docs/v2/definitions");

const BTW_IDS = new Set([
  "btw-calculator",
  "btw-terugrekenen",
  "btw-inclusief-exclusief",
]);

const REQUIRED_TOP_FIELDS = [
  "id",
  "slug",
  "product",
  "locale",
  "country",
  "category",
  "title",
  "description",
  "status",
  "priority",
  "route",
  "calculator_module",
  "engine_status",
  "inputs",
  "outputs",
  "rules",
  "sources",
  "privacy",
  "maintenance",
];

const ALLOWED_STATUS = new Set(["live", "migrated", "inline", "planned", "deprecated"]);
const ALLOWED_PRIORITY = new Set(["A", "B", "C"]);
const ALLOWED_INPUT_TYPES = new Set(["money", "number", "percentage", "date", "select", "radio", "checkbox", "text"]);
const ALLOWED_OUTPUT_TYPES = new Set(["money", "number", "percentage", "text", "date"]);
const ALLOWED_PRIVACY_LEVELS = new Set(["non_personal", "financial_input", "personal_input", "sensitive"]);
const ALLOWED_RULE_TYPES = new Set(["vat_rate", "tax_bracket", "tax_credit", "allowance_threshold", "mortgage_formula", "annuity_formula", "import_cost", "manual_input", "informational"]);
const ALLOWED_RULE_STATUS = new Set(["active", "draft", "deprecated"]);
const ALLOWED_AUTHORITY_LEVELS = new Set(["official", "semi_official", "editorial", "internal"]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasLocaleValue(value) {
  if (typeof value === "string") return value.length > 0;
  if (isObject(value)) return Object.keys(value).length > 0;
  return false;
}

function validateFile(filePath) {
  const errors = [];
  let data;

  try {
    data = load(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    return [`YAML parse error: ${err.message}`];
  }

  if (!isObject(data)) {
    return ["Root is geen object."];
  }

  for (const field of REQUIRED_TOP_FIELDS) {
    if (!(field in data)) {
      errors.push(`Ontbrekend verplicht veld: ${field}`);
    }
  }

  if (!data.id) {
    errors.push("id is leeg of ontbreekt.");
  }
  if (!data.slug) {
    errors.push("slug is leeg of ontbreekt.");
  }
  if (data.slug && !data.slug.startsWith("/")) {
    errors.push(`slug '${data.slug}' begint niet met '/'.`);
  }

  if (!data.locale) {
    errors.push("locale is leeg of ontbreekt.");
  }
  if (!data.country) {
    errors.push("country is leeg of ontbreekt.");
  }
  if (!data.category) {
    errors.push("category is leeg of ontbreekt.");
  }

  if (!hasLocaleValue(data.title)) {
    errors.push("title is leeg of ontbreekt.");
  }
  if (!hasLocaleValue(data.description)) {
    errors.push("description is leeg of ontbreekt.");
  }

  if (!data.status) {
    errors.push("status is leeg of ontbreekt.");
  } else if (!ALLOWED_STATUS.has(data.status)) {
    errors.push(`status '${data.status}' is niet toegestaan. Gebruik: ${[...ALLOWED_STATUS].join(", ")}.`);
  }

  if (!data.priority) {
    errors.push("priority is leeg of ontbreekt.");
  } else if (!ALLOWED_PRIORITY.has(data.priority)) {
    errors.push(`priority '${data.priority}' is niet toegestaan. Gebruik: A, B of C.`);
  }

  if (!isObject(data.route)) {
    errors.push("route is geen object.");
  } else if (!data.route.path) {
    errors.push("route.path ontbreekt.");
  } else if (!data.route.path.startsWith("/")) {
    errors.push(`route.path '${data.route.path}' begint niet met '/'.`);
  }

  if (!Array.isArray(data.inputs)) {
    errors.push("inputs is geen array.");
  } else if (data.inputs.length === 0) {
    errors.push("inputs is leeg.");
  } else {
    data.inputs.forEach((input, index) => {
      if (!isObject(input)) {
        errors.push(`input[${index}] is geen object.`);
        return;
      }
      if (!input.name) {
        errors.push(`input[${index}] heeft geen name.`);
      }
      if (!hasLocaleValue(input.label)) {
        errors.push(`input[${index}] (${input.name || "?"}) heeft geen label.`);
      }
      if (!input.type) {
        errors.push(`input[${index}] (${input.name || "?"}) heeft geen type.`);
      } else if (!ALLOWED_INPUT_TYPES.has(input.type)) {
        errors.push(`input[${index}] (${input.name || "?"}) heeft type '${input.type}'. Gebruik: ${[...ALLOWED_INPUT_TYPES].join(", ")}.`);
      }
      if (typeof input.required !== "boolean") {
        errors.push(`input[${index}] (${input.name || "?"}) required is geen boolean.`);
      }
      if (!input.privacy_level) {
        errors.push(`input[${index}] (${input.name || "?"}) heeft geen privacy_level.`);
      } else if (!ALLOWED_PRIVACY_LEVELS.has(input.privacy_level)) {
        errors.push(`input[${index}] (${input.name || "?"}) privacy_level '${input.privacy_level}' is niet toegestaan. Gebruik: ${[...ALLOWED_PRIVACY_LEVELS].join(", ")}.`);
      }
    });
  }

  if (!Array.isArray(data.outputs)) {
    errors.push("outputs is geen array.");
  } else if (data.outputs.length === 0) {
    errors.push("outputs is leeg.");
  } else {
    data.outputs.forEach((output, index) => {
      if (!isObject(output)) {
        errors.push(`output[${index}] is geen object.`);
        return;
      }
      if (!output.name) {
        errors.push(`output[${index}] heeft geen name.`);
      }
      if (!hasLocaleValue(output.label)) {
        errors.push(`output[${index}] (${output.name || "?"}) heeft geen label.`);
      }
      if (!output.type) {
        errors.push(`output[${index}] (${output.name || "?"}) heeft geen type.`);
      } else if (!ALLOWED_OUTPUT_TYPES.has(output.type)) {
        errors.push(`output[${index}] (${output.name || "?"}) heeft type '${output.type}'. Gebruik: ${[...ALLOWED_OUTPUT_TYPES].join(", ")}.`);
      }
    });
  }

  const inputNames = new Set(Array.isArray(data.inputs) ? data.inputs.map((i) => i?.name).filter(Boolean) : []);
  const outputNames = new Set(Array.isArray(data.outputs) ? data.outputs.map((o) => o?.name).filter(Boolean) : []);

  if (!Array.isArray(data.rules)) {
    errors.push("rules is geen array.");
  } else if (data.rules.length === 0) {
    errors.push("rules is leeg.");
  } else {
    data.rules.forEach((rule, index) => {
      if (!isObject(rule)) {
        errors.push(`rule[${index}] is geen object.`);
        return;
      }
      for (const field of ["id", "type", "locale", "country", "version", "applies_to", "source", "status"]) {
        if (!(field in rule)) {
          errors.push(`rule[${index}] (${rule.id || "?"}) ontbreekt verplicht veld: ${field}.`);
        }
      }
      if (rule.type && !ALLOWED_RULE_TYPES.has(rule.type)) {
        errors.push(`rule[${index}] (${rule.id || "?"}) type '${rule.type}' is niet toegestaan. Gebruik: ${[...ALLOWED_RULE_TYPES].join(", ")}.`);
      }
      if (rule.status && !ALLOWED_RULE_STATUS.has(rule.status)) {
        errors.push(`rule[${index}] (${rule.id || "?"}) status '${rule.status}' is niet toegestaan. Gebruik: ${[...ALLOWED_RULE_STATUS].join(", ")}.`);
      }
      if (rule.applies_to && rule.applies_to !== "calculator" && !inputNames.has(rule.applies_to) && !outputNames.has(rule.applies_to)) {
        errors.push(`rule[${index}] (${rule.id || "?"}) applies_to '${rule.applies_to}' is geen bestaande input/output name of 'calculator'.`);
      }
      if (isObject(rule.source)) {
        for (const field of ["label", "url", "authority_level"]) {
          if (!(field in rule.source)) {
            errors.push(`rule[${index}] (${rule.id || "?"}) source ontbreekt: ${field}.`);
          }
        }
        if (rule.source.authority_level && !ALLOWED_AUTHORITY_LEVELS.has(rule.source.authority_level)) {
          errors.push(`rule[${index}] (${rule.id || "?"}) source.authority_level '${rule.source.authority_level}' is niet toegestaan. Gebruik: ${[...ALLOWED_AUTHORITY_LEVELS].join(", ")}.`);
        }
      } else {
        errors.push(`rule[${index}] (${rule.id || "?"}) source is geen object.`);
      }
      if (rule.locale && rule.country) {
        const crossAllowed = rule.cross_locale_allowed === true;
        if (!crossAllowed && rule.locale !== data.locale) {
          errors.push(`rule[${index}] (${rule.id || "?"}) locale '${rule.locale}' matcht niet met calculator locale '${data.locale}'.`);
        }
        if (!crossAllowed && rule.country !== data.country) {
          errors.push(`rule[${index}] (${rule.id || "?"}) country '${rule.country}' matcht niet met calculator country '${data.country}'.`);
        }
      }
    });
  }

  if (!Array.isArray(data.sources)) {
    errors.push("sources is geen array.");
  } else if (data.sources.length === 0) {
    errors.push("sources is leeg.");
  } else {
    data.sources.forEach((source, index) => {
      if (!isObject(source)) {
        errors.push(`source[${index}] is geen object.`);
        return;
      }
      if (!hasLocaleValue(source.label)) {
        errors.push(`source[${index}] heeft geen label.`);
      }
      if (!hasLocaleValue(source.url)) {
        errors.push(`source[${index}] heeft geen url.`);
      }
    });
  }

  if (!isObject(data.privacy)) {
    errors.push("privacy is geen object.");
  } else {
    if (data.privacy.no_storage !== true) {
      errors.push("privacy.no_storage is niet true.");
    }
    if (data.privacy.client_side_only !== true) {
      errors.push("privacy.client_side_only is niet true.");
    }
  }

  if (!isObject(data.maintenance)) {
    errors.push("maintenance is geen object.");
  } else {
    if (!data.maintenance.owner) {
      errors.push("maintenance.owner ontbreekt of is leeg.");
    }
    if (!data.maintenance.last_review) {
      errors.push("maintenance.last_review ontbreekt of is leeg.");
    }
    if (!data.maintenance.update_frequency) {
      errors.push("maintenance.update_frequency ontbreekt of is leeg.");
    }
    if (typeof data.maintenance.source_review_required !== "boolean") {
      errors.push("maintenance.source_review_required is geen boolean.");
    }
  }

  if (isObject(data.seo)) {
    if (!hasLocaleValue(data.seo.title)) {
      errors.push("seo.title is leeg of ontbreekt.");
    }
    if (!hasLocaleValue(data.seo.description)) {
      errors.push("seo.description is leeg of ontbreekt.");
    }
  }

  // Engine reference checks
  if (BTW_IDS.has(data.id)) {
    if (data.engine_status !== "migrated") {
      errors.push(`BTW calculator heeft engine_status '${data.engine_status}', verwacht 'migrated'.`);
    }
    if (data.engine_reference !== "src/lib/calculators/btw.ts") {
      errors.push(`BTW calculator verwijst niet naar 'src/lib/calculators/btw.ts' (engine_reference: '${data.engine_reference}').`);
    }
  } else if (data.id) {
    // Niet-gemigreerde calculators moeten naar een inline pagina-script verwijzen.
    if (data.engine_status === "migrated") {
      errors.push(`Niet-BTW calculator heeft engine_status 'migrated'; verwacht 'inline'.`);
    }
    if (data.engine_status !== "inline") {
      errors.push(`Niet-gemigreerde calculator heeft engine_status '${data.engine_status}', verwacht 'inline'.`);
    }
    if (typeof data.engine_reference !== "string" || !data.engine_reference.startsWith("src/pages/") || !data.engine_reference.endsWith(".astro")) {
      errors.push(`engine_reference '${data.engine_reference}' is geen geldig inline pagina-script pad (verwacht src/pages/...astro).`);
    }
  }

  return errors;
}

function main() {
  if (!fs.existsSync(DEFINITIONS_DIR)) {
    console.error(`[FATAL] Definities-map niet gevonden: ${DEFINITIONS_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(DEFINITIONS_DIR)
    .filter((name) => name.endsWith(".yml"))
    .map((name) => path.join(DEFINITIONS_DIR, name))
    .sort();

  let totalErrors = 0;
  let checkedFiles = 0;

  console.log("Atlas v2 — CDL Validator v0.3\n");
  console.log(`Controleren van ${files.length} calculator-definities in ${DEFINITIONS_DIR}\n`);

  for (const filePath of files) {
    checkedFiles++;
    const fileName = path.basename(filePath);
    const errors = validateFile(filePath);

    if (errors.length === 0) {
      console.log(`✅  ${fileName}`);
    } else {
      console.log(`❌  ${fileName}`);
      for (const err of errors) {
        console.log(`   - ${err}`);
      }
      totalErrors += errors.length;
    }
  }

  console.log("");
  console.log(`Bestanden gecontroleerd: ${checkedFiles}`);
  console.log(`Fouten gevonden:       ${totalErrors}`);

  if (totalErrors > 0) {
    console.log("\nValidatie mislukt.");
    process.exit(1);
  }

  console.log("\nValidatie succesvol.");
  process.exit(0);
}

main();
