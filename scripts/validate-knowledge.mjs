#!/usr/bin/env node
// scripts/validate-knowledge.mjs
// Atlas v2 — Knowledge Layer Validator v0.1
// Valideert kennisobjecten in docs/v2/knowledge/objects/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OBJECTS_DIR = path.resolve(__dirname, "../docs/v2/knowledge/objects");
const DEFINITIONS_DIR = path.resolve(__dirname, "../docs/v2/definitions");

const REQUIRED_FIELDS = [
  "id",
  "type",
  "country",
  "locale",
  "title",
  "description",
  "status",
  "effective_from",
  "authority",
  "sources",
  "relationships",
  "used_by",
  "version",
  "tags",
  "notes",
];

const ALLOWED_STATUS = new Set(["active", "draft", "deprecated"]);
const ALLOWED_AUTHORITY_LEVELS = new Set(["official", "semi_official", "editorial", "internal"]);
const OFFICIAL_REQUIRED_TYPES = new Set([
  "tax_bracket",
  "tax_credit",
  "allowance_threshold",
  "import_cost",
  "entrepreneur_deduction",
  "profit_exemption",
]);

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isValidIsoDate(value) {
  return typeof value === "string" && ISO_DATE_REGEX.test(value);
}

function loadKnownCalculatorIds() {
  const ids = new Set();
  if (!fs.existsSync(DEFINITIONS_DIR)) return ids;
  const files = fs
    .readdirSync(DEFINITIONS_DIR)
    .filter((name) => name.endsWith(".yml"))
    .map((name) => path.join(DEFINITIONS_DIR, name));
  for (const filePath of files) {
    try {
      const data = load(fs.readFileSync(filePath, "utf8"));
      if (data && data.id) ids.add(data.id);
    } catch {
      // ignore parse errors here
    }
  }
  return ids;
}

function validateVatRateData(data, errors) {
  if (!isObject(data.data)) {
    errors.push("vat_rate object mist data.");
    return;
  }

  if (!Array.isArray(data.data.rates) || data.data.rates.length === 0) {
    errors.push("vat_rate.data.rates moet een niet-lege array zijn.");
    return;
  }

  const values = [];
  for (let i = 0; i < data.data.rates.length; i++) {
    const rate = data.data.rates[i];

    if (!isObject(rate)) {
      errors.push(`vat_rate.data.rates[${i}] is geen object.`);
      continue;
    }

    if (!("label" in rate)) {
      errors.push(`vat_rate.data.rates[${i}].label ontbreekt.`);
    } else if (typeof rate.label !== "string") {
      errors.push(`vat_rate.data.rates[${i}].label moet een string zijn.`);
    }

    if (!("value" in rate)) {
      errors.push(`vat_rate.data.rates[${i}].value ontbreekt.`);
    } else if (typeof rate.value !== "number") {
      errors.push(`vat_rate.data.rates[${i}].value moet een number zijn.`);
    } else {
      values.push(rate.value);
    }

    if (!("category" in rate)) {
      errors.push(`vat_rate.data.rates[${i}].category ontbreekt.`);
    } else if (typeof rate.category !== "string") {
      errors.push(`vat_rate.data.rates[${i}].category moet een string zijn.`);
    }
  }

  if (!("default_rate" in data.data)) {
    errors.push("vat_rate.data.default_rate ontbreekt.");
  } else if (typeof data.data.default_rate !== "number") {
    errors.push("vat_rate.data.default_rate moet een number zijn.");
  } else if (!values.includes(data.data.default_rate)) {
    errors.push("vat_rate.data.default_rate moet overeenkomen met een value in data.rates.");
  }
}

function validateEntrepreneurDeductionData(data, errors) {
  if (!isObject(data.data)) {
    errors.push("entrepreneur_deduction object mist data.");
    return;
  }

  if (!("deduction_type" in data.data)) {
    errors.push("entrepreneur_deduction.data.deduction_type ontbreekt.");
  } else if (typeof data.data.deduction_type !== "string") {
    errors.push("entrepreneur_deduction.data.deduction_type moet een string zijn.");
  }

  if (!("amount" in data.data)) {
    errors.push("entrepreneur_deduction.data.amount ontbreekt.");
  } else if (typeof data.data.amount !== "number") {
    errors.push("entrepreneur_deduction.data.amount moet een number zijn.");
  }

  if (!("currency" in data.data)) {
    errors.push("entrepreneur_deduction.data.currency ontbreekt.");
  } else if (typeof data.data.currency !== "string") {
    errors.push("entrepreneur_deduction.data.currency moet een string zijn.");
  }
}

function validateProfitExemptionData(data, errors) {
  if (!isObject(data.data)) {
    errors.push("profit_exemption object mist data.");
    return;
  }

  if (!("exemption_type" in data.data)) {
    errors.push("profit_exemption.data.exemption_type ontbreekt.");
  } else if (typeof data.data.exemption_type !== "string") {
    errors.push("profit_exemption.data.exemption_type moet een string zijn.");
  }

  if (!("rate" in data.data)) {
    errors.push("profit_exemption.data.rate ontbreekt.");
  } else if (typeof data.data.rate !== "number") {
    errors.push("profit_exemption.data.rate moet een number zijn.");
  } else if (data.data.rate < 0 || data.data.rate > 1) {
    errors.push("profit_exemption.data.rate moet tussen 0 en 1 liggen.");
  }

  if (!("currency" in data.data)) {
    errors.push("profit_exemption.data.currency ontbreekt.");
  } else if (typeof data.data.currency !== "string") {
    errors.push("profit_exemption.data.currency moet een string zijn.");
  }
}

function validateTaxBracketData(data, errors, warnings) {
  if (!isObject(data.data)) {
    errors.push("tax_bracket object mist data.");
    return;
  }

  if (!("year" in data.data)) {
    errors.push("tax_bracket.data.year ontbreekt.");
  } else if (typeof data.data.year !== "number") {
    errors.push("tax_bracket.data.year moet een number zijn.");
  }

  if (!Array.isArray(data.data.brackets)) {
    errors.push("tax_bracket.data.brackets moet een array zijn.");
  } else if (data.data.brackets.length === 0) {
    if (data.status === "active") {
      errors.push("tax_bracket.data.brackets mag niet leeg zijn voor een actief object.");
    } else if (data.status === "draft") {
      warnings.push("tax_bracket.data.brackets is leeg; object is draft, dus toegestaan pending review.");
    }
  }
}

function validateFile(filePath, knownCalculatorIds) {
  const errors = [];
  const warnings = [];
  let data;
  const fileName = path.basename(filePath);
  const expectedId = fileName.replace(/\.yml$/, "");

  try {
    data = load(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    return { errors: [`YAML parse error: ${err.message}`], warnings: [] };
  }

  if (!isObject(data)) {
    return { errors: ["Root is geen object."], warnings: [] };
  }

  for (const field of REQUIRED_FIELDS) {
    if (!(field in data)) {
      errors.push(`Ontbrekend verplicht veld: ${field}`);
    }
  }

  if (data.id !== expectedId) {
    errors.push(`id '${data.id}' matcht niet met bestandsnaam '${expectedId}'.`);
  }
  if (data.id && !data.id.match(/^[a-z]{2}\./)) {
    errors.push(`id '${data.id}' begint niet met een landnamespace (bijv. 'nl.').`);
  }

  if (!data.status) {
    errors.push("status is leeg of ontbreekt.");
  } else if (!ALLOWED_STATUS.has(data.status)) {
    errors.push(`status '${data.status}' is niet toegestaan. Gebruik: active, draft, deprecated.`);
  }

  if (!data.effective_from) {
    errors.push("effective_from is leeg of ontbreekt.");
  } else if (!isValidIsoDate(data.effective_from)) {
    errors.push(`effective_from '${data.effective_from}' is geen geldige ISO-datum (YYYY-MM-DD).`);
  }

  if (data.effective_until !== null && data.effective_until !== undefined) {
    if (!isValidIsoDate(data.effective_until)) {
      errors.push(`effective_until '${data.effective_until}' is geen geldige ISO-datum of null.`);
    } else if (isValidIsoDate(data.effective_from) && isValidIsoDate(data.effective_until)) {
      const fromDate = new Date(data.effective_from);
      const untilDate = new Date(data.effective_until);
      if (untilDate < fromDate) {
        errors.push(`effective_until '${data.effective_until}' ligt vóór effective_from '${data.effective_from}'.`);
      }
    }
  }

  if (!isObject(data.authority)) {
    errors.push("authority is geen object.");
  } else {
    if (!("name" in data.authority)) {
      errors.push("authority.name ontbreekt.");
    }
    if (!("level" in data.authority)) {
      errors.push("authority.level ontbreekt.");
    } else if (!ALLOWED_AUTHORITY_LEVELS.has(data.authority.level)) {
      errors.push(`authority.level '${data.authority.level}' is niet toegestaan. Gebruik: ${[...ALLOWED_AUTHORITY_LEVELS].join(", ")}.`);
    }
  }

  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    errors.push("sources moet een niet-lege array zijn.");
  } else {
    data.sources.forEach((source, index) => {
      if (!isObject(source)) {
        errors.push(`source[${index}] is geen object.`);
        return;
      }
      if (!("label" in source)) errors.push(`source[${index}] ontbreekt label.`);
      if (!("url" in source)) errors.push(`source[${index}] ontbreekt url.`);
      if (!("authority_level" in source)) {
        errors.push(`source[${index}] ontbreekt authority_level.`);
      } else if (!ALLOWED_AUTHORITY_LEVELS.has(source.authority_level)) {
        errors.push(`source[${index}] authority_level '${source.authority_level}' is niet toegestaan.`);
      }
    });
  }

  if (!Array.isArray(data.relationships)) {
    errors.push("relationships moet een array zijn.");
  }
  if (!Array.isArray(data.used_by)) {
    errors.push("used_by moet een array zijn.");
  } else {
    data.used_by.forEach((ref, index) => {
      if (typeof ref !== "string") {
        errors.push(`used_by[${index}] is geen string.`);
        return;
      }
      const calculatorId = ref.startsWith("calculator.") ? ref.slice("calculator.".length) : ref;
      if (!knownCalculatorIds.has(calculatorId)) {
        warnings.push(`used_by[${index}] '${ref}' verwijst naar een onbekende calculator-id.`);
      }
    });
  }

  if (!Array.isArray(data.tags)) {
    errors.push("tags moet een array zijn.");
  }
  if (!("notes" in data)) {
    errors.push("notes ontbreekt.");
  }

  // Type-specific validation
  if (data.type === "vat_rate") {
    validateVatRateData(data, errors);
  }

  if (data.type === "entrepreneur_deduction") {
    validateEntrepreneurDeductionData(data, errors);
  }

  if (data.type === "profit_exemption") {
    validateProfitExemptionData(data, errors);
  }

  if (data.type === "tax_bracket") {
    validateTaxBracketData(data, errors, warnings);
  }

  if (OFFICIAL_REQUIRED_TYPES.has(data.type)) {
    if (isObject(data.authority) && data.authority.level !== "official") {
      warnings.push(`type '${data.type}' verwacht authority.level 'official' (huidig: '${data.authority.level}').`);
    }
  }

  return { errors, warnings };
}

function main() {
  if (!fs.existsSync(OBJECTS_DIR)) {
    console.error(`[FATAL] Kennisobjecten-map niet gevonden: ${OBJECTS_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(OBJECTS_DIR)
    .filter((name) => name.endsWith(".yml"))
    .map((name) => path.join(OBJECTS_DIR, name))
    .sort();

  const knownCalculatorIds = loadKnownCalculatorIds();
  let totalErrors = 0;
  let totalWarnings = 0;
  let checkedFiles = 0;

  console.log("Atlas v2 — Knowledge Layer Validator v0.1\n");
  console.log(`Controleren van ${files.length} kennisobjecten in ${OBJECTS_DIR}\n`);

  for (const filePath of files) {
    checkedFiles++;
    const fileName = path.basename(filePath);
    const { errors, warnings } = validateFile(filePath, knownCalculatorIds);

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`✅  ${fileName}`);
    } else if (errors.length === 0) {
      console.log(`⚠️  ${fileName}`);
      for (const warning of warnings) {
        console.log(`   ! ${warning}`);
      }
      totalWarnings += warnings.length;
    } else {
      console.log(`❌  ${fileName}`);
      for (const err of errors) {
        console.log(`   - ${err}`);
      }
      for (const warning of warnings) {
        console.log(`   ! ${warning}`);
      }
      totalErrors += errors.length;
      totalWarnings += warnings.length;
    }
  }

  console.log("");
  console.log(`Bestanden gecontroleerd: ${checkedFiles}`);
  console.log(`Fouten gevonden:       ${totalErrors}`);
  console.log(`Waarschuwingen:        ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log("\nValidatie mislukt.");
    process.exit(1);
  }

  console.log("\nValidatie succesvol.");
  process.exit(0);
}

main();
