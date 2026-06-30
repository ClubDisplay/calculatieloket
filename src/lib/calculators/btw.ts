/**
 * Atlas Calculator Engine — BTW module
 *
 * Pure functions for Dutch VAT calculations.
 * Supports the three official Dutch VAT rates: 0%, 9% and 21%.
 *
 * This module returns raw numeric values only. Formatting and DOM updates
 * are the responsibility of the calculator page or UI component.
 */

import { VAT_RATES } from "../utils/constants";
import { resolveRule } from "../rules/resolver";
import type { VatRateData } from "../knowledge/types";

/** Supported VAT calculation directions. */
export type BtwDirection = "exclusive_to_inclusive" | "inclusive_to_exclusive";

/** Input for a VAT calculation. */
export interface BtwInput {
  /** The amount entered by the user. */
  amount: number;
  /** The VAT rate as a percentage (0, 9 or 21). */
  rate: number;
  /** Whether the amount is exclusive or inclusive of VAT. */
  direction: BtwDirection;
}

/** Output of a VAT calculation. */
export interface BtwResult {
  /** True when the input was valid and a calculation was performed. */
  valid: boolean;
  /** The amount excluding VAT. */
  amountExcl: number;
  /** The VAT amount. */
  btwAmount: number;
  /** The amount including VAT. */
  amountIncl: number;
  /** The VAT rate that was used. */
  rate: number;
  /** The direction that was used. */
  direction: BtwDirection;
  /** Error message, only present when valid is false. */
  error?: string;
}

/**
 * Load the active VAT rates via the Rule Resolver.
 * Falls back to the legacy constants if the resolver cannot resolve them.
 */
function loadVatRates(): number[] {
  const vatObject = resolveRule({
    type: "vat_rate",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
  });

  if (vatObject && vatObject.data) {
    const data = vatObject.data as VatRateData;
    const standard = data.rates.find((r) => r.category === "standard")?.value;
    const reduced = data.rates.find((r) => r.category === "reduced")?.value;
    const zero = data.rates.find((r) => r.category === "zero")?.value;

    if (standard !== undefined && reduced !== undefined && zero !== undefined) {
      return [zero, reduced, standard];
    }
  }

  return [...VAT_RATES];
}

/** The supported VAT rates used by this engine. */
const VAT_RATE_VALUES = loadVatRates();

/**
 * Check whether a VAT rate is one of the supported Dutch rates.
 *
 * @param rate The VAT rate to validate.
 * @returns True when the rate is 0, 9 or 21.
 */
export function isValidBtwRate(rate: number): boolean {
  return VAT_RATE_VALUES.includes(rate);
}

/**
 * Validate a BTW input and return a human-readable error if invalid.
 *
 * @param input The BTW input to validate.
 * @returns An error string, or undefined when valid.
 */
function validateBtwInput(input: BtwInput): string | undefined {
  if (!Number.isFinite(input.amount)) {
    return "Vul een geldig bedrag in.";
  }

  if (input.amount < 0) {
    return "Het bedrag mag niet negatief zijn.";
  }

  if (!isValidBtwRate(input.rate)) {
    return `Kies een geldig btw-tarief: ${VAT_RATE_VALUES.join(", ")}%.`;
  }

  return undefined;
}

/**
 * Build a failed BTW result.
 */
function failedBtwResult(
  input: BtwInput,
  error: string,
): BtwResult {
  return {
    valid: false,
    amountExcl: 0,
    btwAmount: 0,
    amountIncl: 0,
    rate: input.rate,
    direction: input.direction,
    error,
  };
}

/**
 * Calculate BTW starting from an amount exclusive of VAT.
 *
 * @param amountExcl The amount excluding VAT.
 * @param rate The VAT rate as a percentage (0, 9 or 21).
 * @returns A BtwResult with the calculated values.
 */
export function calculateBtwFromExclusive(
  amountExcl: number,
  rate: number,
): BtwResult {
  const input: BtwInput = {
    amount: amountExcl,
    rate,
    direction: "exclusive_to_inclusive",
  };

  const error = validateBtwInput(input);
  if (error) {
    return failedBtwResult(input, error);
  }

  if (rate === 0) {
    return {
      valid: true,
      amountExcl,
      btwAmount: 0,
      amountIncl: amountExcl,
      rate,
      direction: "exclusive_to_inclusive",
    };
  }

  const factor = rate / 100;
  const btwAmount = amountExcl * factor;
  const amountIncl = amountExcl + btwAmount;

  return {
    valid: true,
    amountExcl,
    btwAmount,
    amountIncl,
    rate,
    direction: "exclusive_to_inclusive",
  };
}

/**
 * Calculate BTW starting from an amount inclusive of VAT.
 *
 * @param amountIncl The amount including VAT.
 * @param rate The VAT rate as a percentage (0, 9 or 21).
 * @returns A BtwResult with the calculated values.
 */
export function calculateBtwFromInclusive(
  amountIncl: number,
  rate: number,
): BtwResult {
  const input: BtwInput = {
    amount: amountIncl,
    rate,
    direction: "inclusive_to_exclusive",
  };

  const error = validateBtwInput(input);
  if (error) {
    return failedBtwResult(input, error);
  }

  if (rate === 0) {
    return {
      valid: true,
      amountExcl: amountIncl,
      btwAmount: 0,
      amountIncl,
      rate,
      direction: "inclusive_to_exclusive",
    };
  }

  const factor = rate / 100;
  const amountExcl = amountIncl / (1 + factor);
  const btwAmount = amountIncl - amountExcl;

  return {
    valid: true,
    amountExcl,
    btwAmount,
    amountIncl,
    rate,
    direction: "inclusive_to_exclusive",
  };
}

/**
 * Calculate BTW from a generic input.
 *
 * @param input The BTW input (amount, rate, direction).
 * @returns A BtwResult with the calculated values or an error.
 */
export function calculateBtw(input: BtwInput): BtwResult {
  if (input.direction === "exclusive_to_inclusive") {
    return calculateBtwFromExclusive(input.amount, input.rate);
  }

  return calculateBtwFromInclusive(input.amount, input.rate);
}
