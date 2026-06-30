/**
 * Atlas Calculator Engine — Import Costs module v0.1
 *
 * Pure functions for calculating an indication of the total costs to import a
 * vehicle into the Netherlands. Mirrors the existing inline logic from
 * auto-importkosten-berekenen.astro.
 *
 * No DOM, no HTML, no formatting, no storage.
 */

/** Input for the import cost indication calculation. */
export interface ImportCostInput {
  /** Vehicle type (e.g. "auto" or "camper"). Not used in the v0.1 calculation. */
  vehicleType?: string;
  /** Purchase price of the vehicle abroad in EUR. */
  purchasePrice: number;
  /** Estimated BPM (Dutch vehicle tax) in EUR. */
  estimatedBpm: number;
  /** RDW / registration / inspection costs in EUR. */
  rdwCosts: number;
  /** Transport or pick-up costs in EUR. */
  transportCosts: number;
  /** Export registration / temporary insurance costs in EUR. */
  exportCosts: number;
  /** Pre-purchase inspection costs in EUR. */
  inspectionCosts: number;
  /** License plate costs in EUR. */
  plateCosts: number;
  /** Other costs in EUR. */
  otherCosts: number;
  /** Optional comparable Dutch price in EUR. */
  nlPrice?: number;
}

import { resolveRule } from "../rules/resolver";

/** Detailed result of an import cost indication calculation. */
export interface ImportCostResult {
  valid: boolean;
  error?: string;
  purchasePrice: number;
  estimatedBpm: number;
  rdwCosts: number;
  transportCosts: number;
  exportCosts: number;
  inspectionCosts: number;
  plateCosts: number;
  otherCosts: number;
  totalCost: number;
  nlPrice?: number;
  priceDifference?: number;
  /** Label for the price difference when a Dutch price is provided. */
  differenceLabel?: string;
}

/** Data shape for an import_cost Knowledge Object (e.g. nl.import.costs.2026). */
interface ImportCostsData {
  cost_type: string;
  currency: string;
  estimatedBpm: number;
  rdwCosts: number;
  transportCosts: number;
  exportCosts: number;
  inspectionCosts: number;
  plateCosts: number;
  otherCosts: number;
}

/** Fallback import cost defaults matching the previous hardcoded values. */
const FALLBACK_IMPORT_COSTS_2026 = {
  estimatedBpm: 0,
  rdwCosts: 0,
  transportCosts: 0,
  exportCosts: 0,
  inspectionCosts: 0,
  plateCosts: 0,
  otherCosts: 0,
} as const;

/**
 * Load the active 2026 import cost defaults via the Rule Resolver.
 * Falls back to the legacy hardcoded values if the resolver cannot resolve them.
 */
function loadImportCosts2026(): ImportCostsData {
  const obj = resolveRule({
    type: "import_cost",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.import.costs.2026",
  });

  if (obj?.data) {
    const data = obj.data as ImportCostsData;
    if (
      typeof data.estimatedBpm === "number" &&
      typeof data.rdwCosts === "number" &&
      typeof data.transportCosts === "number" &&
      typeof data.exportCosts === "number" &&
      typeof data.inspectionCosts === "number" &&
      typeof data.plateCosts === "number" &&
      typeof data.otherCosts === "number"
    ) {
      return data;
    }
  }

  return { ...FALLBACK_IMPORT_COSTS_2026 };
}

/** Active 2026 import cost defaults. */
const IMPORT_COSTS_2026 = loadImportCosts2026();

function invalidImportCostResult(error: string): ImportCostResult {
  return {
    valid: false,
    error,
    purchasePrice: 0,
    estimatedBpm: 0,
    rdwCosts: 0,
    transportCosts: 0,
    exportCosts: 0,
    inspectionCosts: 0,
    plateCosts: 0,
    otherCosts: 0,
    totalCost: 0,
  };
}

function sanitizeNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Main entry point: calculate the total import cost indication.
 */
export function calculateImportCosts(input: ImportCostInput): ImportCostResult {
  const purchasePrice = Number.isFinite(input.purchasePrice) ? input.purchasePrice : 0;

  if (purchasePrice <= 0) {
    return invalidImportCostResult("Vul een geldige aankoopprijs in (hoger dan 0).");
  }

  const estimatedBpm = sanitizeNonNegative(input.estimatedBpm ?? IMPORT_COSTS_2026.estimatedBpm);
  const rdwCosts = sanitizeNonNegative(input.rdwCosts ?? IMPORT_COSTS_2026.rdwCosts);
  const transportCosts = sanitizeNonNegative(input.transportCosts ?? IMPORT_COSTS_2026.transportCosts);
  const exportCosts = sanitizeNonNegative(input.exportCosts ?? IMPORT_COSTS_2026.exportCosts);
  const inspectionCosts = sanitizeNonNegative(input.inspectionCosts ?? IMPORT_COSTS_2026.inspectionCosts);
  const plateCosts = sanitizeNonNegative(input.plateCosts ?? IMPORT_COSTS_2026.plateCosts);
  const otherCosts = sanitizeNonNegative(input.otherCosts ?? IMPORT_COSTS_2026.otherCosts);

  const totalCost =
    purchasePrice +
    estimatedBpm +
    rdwCosts +
    transportCosts +
    exportCosts +
    inspectionCosts +
    plateCosts +
    otherCosts;

  const result: ImportCostResult = {
    valid: true,
    purchasePrice,
    estimatedBpm,
    rdwCosts,
    transportCosts,
    exportCosts,
    inspectionCosts,
    plateCosts,
    otherCosts,
    totalCost,
  };

  const nlPrice = Number.isFinite(input.nlPrice) ? input.nlPrice : undefined;
  if (nlPrice !== undefined && nlPrice > 0) {
    result.nlPrice = nlPrice;
    result.priceDifference = nlPrice - totalCost;
    result.differenceLabel =
      result.priceDifference > 0 ? "Voordeliger (indicatie)" : "Duurder (indicatie)";
  }

  return result;
}
