/**
 * Atlas Calculator Engine — Allowances module v0.1
 *
 * Pure functions for Dutch 2026 housing and health allowance indications.
 * Mirrors the existing inline logic from toeslagen-calculator.astro.
 *
 * No DOM, no HTML, no formatting, no storage.
 */

/** Input for the allowance indication calculation. */
export interface AllowanceInput {
  /** Primary gross yearly income in EUR. */
  income: number;
  /** Optional partner gross yearly income in EUR. */
  partnerIncome?: number;
  /** Whether the household is a couple (true) or single (false). */
  isCouple: boolean;
  /** Monthly rent in EUR (for housing benefit calculation). */
  rent?: number;
}

/** Detailed result of an allowance indication calculation. */
export interface AllowanceResult {
  valid: boolean;
  error?: string;
  income: number;
  partnerIncome: number;
  totalIncome: number;
  isCouple: boolean;
  rent: number;
  rentBenefit: number;
  zorgBenefit: number;
}

import { resolveRule } from "../rules/resolver";

/** Data shape for a housing allowance Knowledge Object (e.g. nl.allowance.rent.2026). */
interface RentAllowanceData {
  allowance_type: string;
  currency: string;
  period: string;
  max_rent: number;
  income_limit_single: number;
  income_limit_couple: number;
  base_benefit: number;
  own_payment_threshold_single: number;
  own_payment_threshold_couple: number;
  own_payment_rate: number;
}

/** Fallback housing allowance parameters matching the previous hardcoded values. */
const FALLBACK_RENT_2026 = {
  maxRent: 932.93,
  incomeLimit: { single: 32500, couple: 43500 },
  baseBenefit: 425,
  ownPaymentThreshold: { single: 18000, couple: 21000 },
  ownPaymentRate: 0.15,
} as const;

/**
 * 2026 zorgtoeslag table amounts (per month) from Dienst Toeslagen.
 * Each row lists the inclusive income threshold and the corresponding monthly amount.
 * Income must be at or below the threshold to qualify for that amount.
 */
const HEALTHCARE_ALLOWANCE_TABLE_2026 = {
  single: [
    { threshold: 29500, amount: 129 },
    { threshold: 30000, amount: 126 },
    { threshold: 30500, amount: 120 },
    { threshold: 31000, amount: 114 },
    { threshold: 31500, amount: 109 },
    { threshold: 32000, amount: 103 },
    { threshold: 32500, amount: 97 },
    { threshold: 33000, amount: 91 },
    { threshold: 33500, amount: 86 },
    { threshold: 34000, amount: 80 },
    { threshold: 34500, amount: 74 },
    { threshold: 35000, amount: 69 },
    { threshold: 35500, amount: 63 },
    { threshold: 36000, amount: 57 },
    { threshold: 36500, amount: 51 },
    { threshold: 37000, amount: 46 },
    { threshold: 37500, amount: 40 },
    { threshold: 38000, amount: 34 },
    { threshold: 38500, amount: 28 },
    { threshold: 39000, amount: 23 },
    { threshold: 39500, amount: 17 },
    { threshold: 40000, amount: 11 },
    { threshold: 40500, amount: 6 },
  ],
  couple: [
    { threshold: 29500, amount: 246 },
    { threshold: 30000, amount: 243 },
    { threshold: 30500, amount: 238 },
    { threshold: 31000, amount: 232 },
    { threshold: 31500, amount: 226 },
    { threshold: 32000, amount: 221 },
    { threshold: 32500, amount: 215 },
    { threshold: 33000, amount: 209 },
    { threshold: 33500, amount: 203 },
    { threshold: 34000, amount: 198 },
    { threshold: 34500, amount: 192 },
    { threshold: 35000, amount: 186 },
    { threshold: 35500, amount: 180 },
    { threshold: 36000, amount: 175 },
    { threshold: 36500, amount: 169 },
    { threshold: 37000, amount: 163 },
    { threshold: 37500, amount: 158 },
    { threshold: 38000, amount: 152 },
    { threshold: 38500, amount: 146 },
    { threshold: 39000, amount: 140 },
    { threshold: 39500, amount: 135 },
    { threshold: 40000, amount: 129 },
    { threshold: 40500, amount: 123 },
    { threshold: 41000, amount: 118 },
    { threshold: 41500, amount: 112 },
    { threshold: 42000, amount: 106 },
    { threshold: 42500, amount: 100 },
    { threshold: 43000, amount: 95 },
    { threshold: 43500, amount: 89 },
    { threshold: 44000, amount: 83 },
    { threshold: 44500, amount: 78 },
    { threshold: 45000, amount: 72 },
    { threshold: 45500, amount: 66 },
    { threshold: 46000, amount: 60 },
    { threshold: 46500, amount: 55 },
    { threshold: 47000, amount: 49 },
    { threshold: 47500, amount: 43 },
    { threshold: 48000, amount: 37 },
    { threshold: 48500, amount: 32 },
    { threshold: 49000, amount: 26 },
    { threshold: 49500, amount: 20 },
    { threshold: 50000, amount: 15 },
    { threshold: 50500, amount: 9 },
    { threshold: 51000, amount: 3 },
  ],
} as const;

const HEALTHCARE_ALLOWANCE_LIMIT_2026 = {
  single: 40857,
  couple: 51142,
} as const;

/**
 * Load the active 2026 housing allowance parameters via the Rule Resolver.
 * Falls back to the legacy hardcoded values if the resolver cannot resolve them.
 */
function loadRentAllowance2026() {
  const obj = resolveRule({
    type: "allowance_threshold",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.allowance.rent.2026",
  });

  if (obj?.data) {
    const data = obj.data as RentAllowanceData;
    if (
      typeof data.max_rent === "number" &&
      typeof data.income_limit_single === "number" &&
      typeof data.income_limit_couple === "number" &&
      typeof data.base_benefit === "number" &&
      typeof data.own_payment_threshold_single === "number" &&
      typeof data.own_payment_threshold_couple === "number" &&
      typeof data.own_payment_rate === "number"
    ) {
      return {
        maxRent: data.max_rent,
        incomeLimit: { single: data.income_limit_single, couple: data.income_limit_couple },
        baseBenefit: data.base_benefit,
        ownPaymentThreshold: {
          single: data.own_payment_threshold_single,
          couple: data.own_payment_threshold_couple,
        },
        ownPaymentRate: data.own_payment_rate,
      };
    }
  }

  return {
    ...FALLBACK_RENT_2026,
    incomeLimit: { ...FALLBACK_RENT_2026.incomeLimit },
    ownPaymentThreshold: { ...FALLBACK_RENT_2026.ownPaymentThreshold },
  };
}

/** Active 2026 housing allowance parameters. */
const RENT_2026 = loadRentAllowance2026();

/**
 * Calculate the 2026 housing benefit (huurtoeslag) indication.
 */
export function calculateRentBenefit(
  totalYearlyIncome: number,
  monthlyRent: number,
  isCouple: boolean,
): number {
  if (!Number.isFinite(totalYearlyIncome) || !Number.isFinite(monthlyRent)) {
    return 0;
  }
  if (monthlyRent <= 0) {
    return 0;
  }

  const incomeLimit = isCouple ? RENT_2026.incomeLimit.couple : RENT_2026.incomeLimit.single;
  if (totalYearlyIncome > incomeLimit) {
    return 0;
  }

  const threshold = isCouple
    ? RENT_2026.ownPaymentThreshold.couple
    : RENT_2026.ownPaymentThreshold.single;
  const ownPayment = Math.max(0, (totalYearlyIncome - threshold) * RENT_2026.ownPaymentRate);
  const benefit = Math.max(0, RENT_2026.baseBenefit - ownPayment);
  const rentFactor = Math.min(monthlyRent, RENT_2026.maxRent) / RENT_2026.maxRent;

  return Math.round(benefit * rentFactor);
}

/**
 * Calculate the 2026 health allowance (zorgtoeslag) indication using the
 * official Dienst Toeslagen 2026 table.
 *
 * Returns a monthly amount in EUR. The result is never negative.
 */
export function calculateHealthcareAllowance2026(
  totalYearlyIncome: number,
  isCouple: boolean,
): number {
  if (!Number.isFinite(totalYearlyIncome) || totalYearlyIncome < 0) {
    return 0;
  }

  const limit = isCouple
    ? HEALTHCARE_ALLOWANCE_LIMIT_2026.couple
    : HEALTHCARE_ALLOWANCE_LIMIT_2026.single;
  if (totalYearlyIncome > limit) {
    return 0;
  }

  const table = isCouple
    ? HEALTHCARE_ALLOWANCE_TABLE_2026.couple
    : HEALTHCARE_ALLOWANCE_TABLE_2026.single;
  for (const row of table) {
    if (totalYearlyIncome <= row.threshold) {
      return row.amount;
    }
  }

  return 0;
}

/**
 * Calculate the 2026 health allowance (zorgtoeslag) indication.
 * Delegates to the table-based 2026 implementation.
 */
export function calculateZorgBenefit(totalYearlyIncome: number, isCouple: boolean): number {
  return calculateHealthcareAllowance2026(totalYearlyIncome, isCouple);
}

function invalidAllowanceResult(error: string): AllowanceResult {
  return {
    valid: false,
    error,
    income: 0,
    partnerIncome: 0,
    totalIncome: 0,
    isCouple: false,
    rent: 0,
    rentBenefit: 0,
    zorgBenefit: 0,
  };
}

/**
 * Main entry point: calculate housing and health allowance indications.
 */
export function calculateAllowances(input: AllowanceInput): AllowanceResult {
  const income = Number.isFinite(input.income) ? input.income : 0;
  const rawPartnerIncome = Number.isFinite(input.partnerIncome) ? (input.partnerIncome ?? 0) : 0;
  const isCouple = input.isCouple === true;
  const partnerIncome = isCouple ? rawPartnerIncome : 0;
  const totalIncome = income + partnerIncome;
  const rent = Number.isFinite(input.rent) ? (input.rent ?? 0) : 0;

  if (income < 0 || partnerIncome < 0 || rent < 0) {
    return invalidAllowanceResult("Vul geldige, positieve bedragen in.");
  }

  const rentBenefit = calculateRentBenefit(totalIncome, rent, isCouple);
  const zorgBenefit = calculateZorgBenefit(totalIncome, isCouple);

  return {
    valid: true,
    income,
    partnerIncome,
    totalIncome,
    isCouple,
    rent,
    rentBenefit,
    zorgBenefit,
  };
}
