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

/** Data shape for a health allowance Knowledge Object (e.g. nl.allowance.health.2026). */
interface HealthAllowanceData {
  allowance_type: string;
  currency: string;
  period: string;
  income_limit_single: number;
  income_limit_couple: number;
  base_benefit: number;
  reduction_threshold_single: number;
  reduction_threshold_couple: number;
  reduction_rate: number;
}

/** Fallback housing allowance parameters matching the previous hardcoded values. */
const FALLBACK_RENT_2026 = {
  maxRent: 932.93,
  incomeLimit: { single: 32500, couple: 43500 },
  baseBenefit: 425,
  ownPaymentThreshold: { single: 18000, couple: 21000 },
  ownPaymentRate: 0.15,
} as const;

/** Fallback health allowance parameters matching the previous hardcoded values. */
const FALLBACK_ZORG_2026 = {
  incomeLimit: { single: 40857, couple: 51142 },
  baseBenefit: 131,
  reductionThreshold: { single: 23000, couple: 26000 },
  reductionRate: 0.15,
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

/**
 * Load the active 2026 health allowance parameters via the Rule Resolver.
 * Falls back to the legacy hardcoded values if the resolver cannot resolve them.
 */
function loadHealthAllowance2026() {
  const obj = resolveRule({
    type: "allowance_threshold",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.allowance.health.2026",
  });

  if (obj?.data) {
    const data = obj.data as HealthAllowanceData;
    if (
      typeof data.income_limit_single === "number" &&
      typeof data.income_limit_couple === "number" &&
      typeof data.base_benefit === "number" &&
      typeof data.reduction_threshold_single === "number" &&
      typeof data.reduction_threshold_couple === "number" &&
      typeof data.reduction_rate === "number"
    ) {
      return {
        incomeLimit: { single: data.income_limit_single, couple: data.income_limit_couple },
        baseBenefit: data.base_benefit,
        reductionThreshold: {
          single: data.reduction_threshold_single,
          couple: data.reduction_threshold_couple,
        },
        reductionRate: data.reduction_rate,
      };
    }
  }

  return {
    ...FALLBACK_ZORG_2026,
    incomeLimit: { ...FALLBACK_ZORG_2026.incomeLimit },
    reductionThreshold: { ...FALLBACK_ZORG_2026.reductionThreshold },
  };
}

/** Active 2026 housing allowance parameters. */
const RENT_2026 = loadRentAllowance2026();

/** Active 2026 health allowance parameters. */
const ZORG_2026 = loadHealthAllowance2026();

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
 * Calculate the 2026 health allowance (zorgtoeslag) indication.
 */
export function calculateZorgBenefit(totalYearlyIncome: number, isCouple: boolean): number {
  if (!Number.isFinite(totalYearlyIncome)) {
    return 0;
  }

  const incomeLimit = isCouple ? ZORG_2026.incomeLimit.couple : ZORG_2026.incomeLimit.single;
  if (totalYearlyIncome > incomeLimit) {
    return 0;
  }

  const threshold = isCouple
    ? ZORG_2026.reductionThreshold.couple
    : ZORG_2026.reductionThreshold.single;
  const reduction = Math.max(0, (totalYearlyIncome - threshold) * ZORG_2026.reductionRate);

  return Math.round(Math.max(0, ZORG_2026.baseBenefit - reduction));
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
  const partnerIncome = Number.isFinite(input.partnerIncome) ? (input.partnerIncome ?? 0) : 0;
  const isCouple = input.isCouple === true;
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
