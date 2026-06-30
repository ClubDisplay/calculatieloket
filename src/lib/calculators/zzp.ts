/**
 * Atlas Calculator Engine — ZZP module v0.1
 *
 * Pure functions for Dutch 2026 ZZP reverse calculations:
 * from a desired net monthly income to a required hourly rate and yearly revenue.
 *
 * Reuses the generic Box 1 tax functions from `src/lib/calculators/tax.ts`.
 * ZZP-specific deductions are hardcoded here for v0.1; a TODO marks the move
 * to the Knowledge Layer once the Rule Engine supports ZZP rule types.
 *
 * No DOM, no HTML, no formatting, no storage.
 */

import {
  calculateBox1Tax2026,
  calculateGeneralTaxCredit2026,
  calculateLabourTaxCredit2026,
} from "./tax";
import { resolveRule } from "../rules/resolver";

/** Fallback ZZP-specific 2026 constants. Used when the Knowledge Layer lookup fails. */
const FALLBACK_ZZP_2026 = {
  selfEmployedDeduction: 1200,
  starterDeduction: 2123,
  mkbExemptionRate: 0.127,
} as const;

function loadSelfEmployedDeduction2026(): number {
  const obj = resolveRule({
    type: "entrepreneur_deduction",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.zzp.self_employed_deduction.2026",
  });
  if (obj?.data && typeof (obj.data as { amount?: number }).amount === "number") {
    return (obj.data as { amount: number }).amount;
  }
  return FALLBACK_ZZP_2026.selfEmployedDeduction;
}

function loadStarterDeduction2026(): number {
  const obj = resolveRule({
    type: "entrepreneur_deduction",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.zzp.starter_deduction.2026",
  });
  if (obj?.data && typeof (obj.data as { amount?: number }).amount === "number") {
    return (obj.data as { amount: number }).amount;
  }
  return FALLBACK_ZZP_2026.starterDeduction;
}

function loadMkbProfitExemption2026(): number {
  const obj = resolveRule({
    type: "profit_exemption",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.zzp.mkb_profit_exemption.2026",
  });
  if (obj?.data && typeof (obj.data as { rate?: number }).rate === "number") {
    return (obj.data as { rate: number }).rate;
  }
  return FALLBACK_ZZP_2026.mkbExemptionRate;
}

const ZZP_2026_SELF_EMPLOYED_DEDUCTION = loadSelfEmployedDeduction2026();
const ZZP_2026_STARTER_DEDUCTION = loadStarterDeduction2026();
const ZZP_2026_MKB_EXEMPTION_RATE = loadMkbProfitExemption2026();

/** Input for the ZZP reverse calculation. */
export interface ZzpInput {
  /** Desired net income per month (after pension savings). */
  desiredNetMonthly: number;
  /** Billable days per year. */
  billableDaysPerYear: number;
  /** Billable hours per day. */
  hoursPerDay: number;
  /** Business costs per month. */
  businessCostsMonthly: number;
  /** Pension savings per month (post-tax savings goal). */
  pensionSavingsMonthly: number;
  /** Apply self-employed deduction (Zelfstandigenaftrek)? */
  applySelfEmployedDeduction: boolean;
  /** Apply starter deduction (Startersaftrek)? */
  applyStarterDeduction: boolean;
  /** Apply MKB profit exemption (MKB-winstvrijstelling)? */
  applyMkbExemption: boolean;
}

/** The ZZP deductions that apply to a given input. */
export interface ZzpDeductions {
  selfEmployedAmount: number;
  starterAmount: number;
  totalEntrepreneurDeductions: number;
  mkbRate: number;
}

/** Intermediate tax calculation result. */
export interface ZzpTaxResult {
  incomeTax: number;
  generalTaxCredit: number;
  labourTaxCredit: number;
  totalTaxDue: number;
}

/** Options for the reverse solver. */
export interface ZzpReverseOptions {
  /** Year for which rules are applied. */
  year: number;
  /** Maximum number of binary-search iterations. */
  maxIterations: number;
  /** Convergence tolerance in EUR. */
  tolerance: number;
  /** Upper revenue bound for the search. */
  maxRevenue: number;
}

/** Detailed result of a ZZP reverse calculation. */
export interface ZzpResult {
  valid: boolean;
  error?: string;
  requiredHourlyRate: number;
  requiredYearlyRevenue: number;
  totalBillableHours: number;
  yearlyCosts: number;
  yearlyPension: number;
  totalEntrepreneurDeductions: number;
  mkbExemptionAmount: number;
  taxableIncome: number;
  incomeTax: number;
  generalTaxCredit: number;
  labourTaxCredit: number;
  totalTaxDue: number;
  netProfit: number;
  netAfterPension: number;
  iterations: number;
}

const DEFAULT_ZZP_REVERSE_OPTIONS: ZzpReverseOptions = {
  year: 2026,
  maxIterations: 50,
  tolerance: 1,
  maxRevenue: 10_000_000,
};

/**
 * Calculate the ZZP-specific deductions for a given input.
 */
export function calculateZzpDeductions(input: ZzpInput): ZzpDeductions {
  const selfEmployedAmount = input.applySelfEmployedDeduction ? ZZP_2026_SELF_EMPLOYED_DEDUCTION : 0;
  const starterAmount = input.applyStarterDeduction ? ZZP_2026_STARTER_DEDUCTION : 0;
  return {
    selfEmployedAmount,
    starterAmount,
    totalEntrepreneurDeductions: selfEmployedAmount + starterAmount,
    mkbRate: input.applyMkbExemption ? ZZP_2026_MKB_EXEMPTION_RATE : 0,
  };
}

/**
 * Apply business costs, entrepreneur deductions and MKB exemption to revenue.
 *
 * Mirrors the flow in the inline `zzp-calculator.astro` script:
 *
 *   profit = revenue - yearlyCosts
 *   if MKB applies and profit > total deductions:
 *     profitAfterMkb = (profit - totalDeductions) * (1 - mkbRate) + totalDeductions
 *   taxableIncome = profitAfterMkb - totalDeductions
 */
export function calculateZzpTaxableIncome(
  revenue: number,
  yearlyCosts: number,
  deductions: ZzpDeductions,
): number {
  const profit = revenue - yearlyCosts;

  if (deductions.mkbRate > 0 && profit > deductions.totalEntrepreneurDeductions) {
    const profitAfterMkb =
      (profit - deductions.totalEntrepreneurDeductions) * (1 - deductions.mkbRate) +
      deductions.totalEntrepreneurDeductions;
    return profitAfterMkb - deductions.totalEntrepreneurDeductions;
  }

  return profit - deductions.totalEntrepreneurDeductions;
}

/**
 * Calculate the Box 1 tax and credits for a ZZP taxable income.
 *
 * Negative taxable income is clamped to 0 before tax calculation, matching the
 * inline script's `Math.max(0, taxable)`.
 */
export function calculateZzpTax(taxableIncome: number): ZzpTaxResult {
  const income = Math.max(0, taxableIncome);

  const incomeTax = calculateBox1Tax2026(income);
  const generalTaxCredit = calculateGeneralTaxCredit2026(income);
  const labourTaxCredit = calculateLabourTaxCredit2026(income);
  const totalTaxDue = Math.max(0, incomeTax - generalTaxCredit - labourTaxCredit);

  return {
    incomeTax,
    generalTaxCredit,
    labourTaxCredit,
    totalTaxDue,
  };
}

/**
 * Calculate net profit before pension savings for a given revenue.
 *
 * Net profit = revenue - yearlyCosts - totalTaxDue.
 */
export function calculateZzpNetProfit(
  revenue: number,
  yearlyCosts: number,
  deductions: ZzpDeductions,
): { netProfit: number; taxableIncome: number; totalTaxDue: number } {
  const taxableIncome = calculateZzpTaxableIncome(revenue, yearlyCosts, deductions);
  const { totalTaxDue } = calculateZzpTax(taxableIncome);

  return {
    netProfit: revenue - yearlyCosts - totalTaxDue,
    taxableIncome,
    totalTaxDue,
  };
}

/**
 * Find the yearly revenue that yields the desired net income after pension savings.
 *
 * Uses a binary search on the monotonically increasing function:
 *
 *   f(revenue) = netProfit(revenue) - yearlyPension - desiredNetYearly
 *
 * The search bracket is automatically expanded if the initial upper bound is
 * not sufficient. Because the marginal tax rate is always < 1, the function is
 * guaranteed to cross zero for a sufficiently large revenue.
 */
export function solveRequiredRevenue(
  desiredNetYearly: number,
  yearlyCosts: number,
  yearlyPension: number,
  deductions: ZzpDeductions,
  options: ZzpReverseOptions,
): { revenue: number; iterations: number; converged: boolean } {
  const { maxIterations, tolerance, maxRevenue } = options;

  let low = 0;
  let high = Math.max(1, (desiredNetYearly + yearlyCosts + yearlyPension) * 3);

  // Ensure the bracket contains a solution, up to the max revenue bound.
  let bracketAttempts = 0;
  while (bracketAttempts < maxIterations) {
    const { netProfit } = calculateZzpNetProfit(high, yearlyCosts, deductions);
    if (netProfit - yearlyPension >= desiredNetYearly || high >= maxRevenue) {
      break;
    }
    high = Math.min(high * 2, maxRevenue);
    bracketAttempts++;
  }

  let revenue = high;
  for (let i = 0; i < maxIterations; i++) {
    revenue = (low + high) / 2;
    const { netProfit } = calculateZzpNetProfit(revenue, yearlyCosts, deductions);
    const netAfterPension = netProfit - yearlyPension;

    if (Math.abs(netAfterPension - desiredNetYearly) < tolerance) {
      return { revenue, iterations: i + 1, converged: true };
    }

    if (netAfterPension < desiredNetYearly) {
      low = revenue;
    } else {
      high = revenue;
    }
  }

  // Final convergence check at the last midpoint.
  const { netProfit } = calculateZzpNetProfit(revenue, yearlyCosts, deductions);
  const converged = Math.abs(netProfit - yearlyPension - desiredNetYearly) < tolerance;
  return { revenue, iterations: maxIterations, converged };
}

function invalidZzpResult(error: string): ZzpResult {
  return {
    valid: false,
    error,
    requiredHourlyRate: 0,
    requiredYearlyRevenue: 0,
    totalBillableHours: 0,
    yearlyCosts: 0,
    yearlyPension: 0,
    totalEntrepreneurDeductions: 0,
    mkbExemptionAmount: 0,
    taxableIncome: 0,
    incomeTax: 0,
    generalTaxCredit: 0,
    labourTaxCredit: 0,
    totalTaxDue: 0,
    netProfit: 0,
    netAfterPension: 0,
    iterations: 0,
  };
}

function calculateMkbExemptionAmount(
  revenue: number,
  yearlyCosts: number,
  deductions: ZzpDeductions,
): number {
  const profit = revenue - yearlyCosts;
  if (deductions.mkbRate > 0 && profit > deductions.totalEntrepreneurDeductions) {
    return (profit - deductions.totalEntrepreneurDeductions) * deductions.mkbRate;
  }
  return 0;
}

/**
 * Main entry point: calculate the required hourly rate and revenue for a given
 * ZZP income goal.
 */
export function calculateZzpReverse(
  input: ZzpInput,
  partialOptions?: Partial<ZzpReverseOptions>,
): ZzpResult {
  const options = { ...DEFAULT_ZZP_REVERSE_OPTIONS, ...partialOptions };

  if (!Number.isFinite(input.desiredNetMonthly) || input.desiredNetMonthly < 0) {
    return invalidZzpResult("Vul een geldig gewenst netto inkomen in (hoger dan of gelijk aan 0).");
  }
  if (!Number.isFinite(input.billableDaysPerYear) || input.billableDaysPerYear <= 0) {
    return invalidZzpResult("Vul een geldig aantal declarabele dagen in (hoger dan 0).");
  }
  if (!Number.isFinite(input.hoursPerDay) || input.hoursPerDay <= 0) {
    return invalidZzpResult("Vul een geldig aantal uren per dag in (hoger dan 0).");
  }

  const yearlyCosts = Math.max(0, (input.businessCostsMonthly ?? 0) * 12);
  const yearlyPension = Math.max(0, (input.pensionSavingsMonthly ?? 0) * 12);
  const desiredNetYearly = input.desiredNetMonthly * 12;
  const totalBillableHours = input.billableDaysPerYear * input.hoursPerDay;

  const deductions = calculateZzpDeductions(input);

  const { revenue, iterations, converged } = solveRequiredRevenue(
    desiredNetYearly,
    yearlyCosts,
    yearlyPension,
    deductions,
    options,
  );

  if (!converged) {
    return invalidZzpResult(
      "Kon geen oplossing vinden voor het gewenste netto inkomen. Probeer andere invoer.",
    );
  }

  const { netProfit, taxableIncome, totalTaxDue } = calculateZzpNetProfit(
    revenue,
    yearlyCosts,
    deductions,
  );
  const { incomeTax, generalTaxCredit, labourTaxCredit } = calculateZzpTax(taxableIncome);

  return {
    valid: true,
    requiredHourlyRate: revenue / totalBillableHours,
    requiredYearlyRevenue: revenue,
    totalBillableHours,
    yearlyCosts,
    yearlyPension,
    totalEntrepreneurDeductions: deductions.totalEntrepreneurDeductions,
    mkbExemptionAmount: calculateMkbExemptionAmount(revenue, yearlyCosts, deductions),
    taxableIncome,
    incomeTax,
    generalTaxCredit,
    labourTaxCredit,
    totalTaxDue,
    netProfit,
    netAfterPension: netProfit - yearlyPension,
    iterations,
  };
}
