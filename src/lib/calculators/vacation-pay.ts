/**
 * Atlas Calculator Engine — Vacation Pay module v0.1
 *
 * Pure functions for estimating Dutch net vacation pay in 2026.
 * Reuses the existing tax engine via calculateNetIncomeEstimate2026().
 * No DOM, no HTML, no formatting, no storage.
 */

import { calculateNetIncomeEstimate2026 } from "./tax";

/** Input for the vacation pay estimate. */
export interface VacationPayInput {
  /** Gross monthly salary in EUR (the salary figure excluding vacation pay). */
  grossMonthlySalary: number;
  /** Vacation pay percentage (0–100). Defaults to 8. */
  vacationPayPercentage?: number;
  /** Whether to apply loonheffingskorting (general + labour tax credits). */
  applyLoonheffingskorting: boolean;
  /** Employee pension contribution as a fixed monthly amount in EUR. */
  pensionAmount?: number;
}

/** Detailed breakdown of the vacation pay estimate. */
export interface VacationPayBreakdown {
  totalGrossYearly: number;
  totalNetYearly: number;
  noVacationGrossYearly: number;
  noVacationNetYearly: number;
}

/** Result of the vacation pay estimate. */
export interface VacationPayResult {
  valid: boolean;
  grossMonthlySalary: number;
  vacationPayPercentage: number;
  grossVacationPay: number;
  estimatedTax: number;
  netVacationPay: number;
  effectiveRate: number;
  breakdown: VacationPayBreakdown;
  error?: string;
}

const DEFAULT_VACATION_PAY_PERCENTAGE = 8;
const TAX_ENGINE_HOLIDAY_PAY_MULTIPLIER = 1.08; // 12 months + 8% holiday pay

/**
 * Estimate the 2026 net vacation pay.
 *
 * The tax engine always assumes a yearly salary of 12.96 months (12 + 8%
 * holiday pay). To support arbitrary vacation pay percentages, we translate
 * the user's gross monthly salary into the virtual monthly salary that the
 * tax engine needs to arrive at the correct total/no-vacation yearly amounts.
 *
 * @param input The gross salary, vacation pay percentage, pension and LHK flag.
 * @returns A detailed VacationPayResult.
 */
export function calculateVacationPay(
  input: VacationPayInput,
): VacationPayResult {
  if (!Number.isFinite(input.grossMonthlySalary) || input.grossMonthlySalary <= 0) {
    return invalidResult("Vul een geldig bruto maandsalaris in (hoger dan 0).");
  }

  const percentage =
    input.vacationPayPercentage === undefined
      ? DEFAULT_VACATION_PAY_PERCENTAGE
      : input.vacationPayPercentage;

  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
    return invalidResult("Vul een geldig vakantiegeldpercentage in (tussen 0 en 100).");
  }

  const pensionAmount =
    input.pensionAmount !== undefined && Number.isFinite(input.pensionAmount)
      ? Math.max(0, input.pensionAmount)
      : 0;

  // Virtual monthly salary so that the tax engine's gross yearly equals the
  // user's total gross yearly including the chosen vacation pay percentage.
  const totalMonthlySalary =
    (input.grossMonthlySalary * (1 + percentage / 100)) / TAX_ENGINE_HOLIDAY_PAY_MULTIPLIER;

  // Virtual monthly salary that represents the same gross monthly salary without
  // any vacation pay: 12 * grossMonthlySalary / 12.96 = grossMonthlySalary / 1.08.
  const noVacationMonthlySalary = input.grossMonthlySalary / TAX_ENGINE_HOLIDAY_PAY_MULTIPLIER;

  const totalResult = calculateNetIncomeEstimate2026({
    grossMonthlySalary: totalMonthlySalary,
    pensionAmount,
    applyLoonheffingskorting: input.applyLoonheffingskorting,
  });

  const noVacationResult = calculateNetIncomeEstimate2026({
    grossMonthlySalary: noVacationMonthlySalary,
    pensionAmount,
    applyLoonheffingskorting: input.applyLoonheffingskorting,
  });

  if (!totalResult.valid || !noVacationResult.valid) {
    return invalidResult("De tax engine kon de berekening niet afronden.");
  }

  const grossVacationPay = input.grossMonthlySalary * 12 * (percentage / 100);
  const netVacationPay = totalResult.netYearly - noVacationResult.netYearly;
  const estimatedTax = Math.max(0, grossVacationPay - netVacationPay);
  const effectiveRate = grossVacationPay > 0 ? estimatedTax / grossVacationPay : 0;

  return {
    valid: true,
    grossMonthlySalary: input.grossMonthlySalary,
    vacationPayPercentage: percentage,
    grossVacationPay,
    estimatedTax,
    netVacationPay,
    effectiveRate,
    breakdown: {
      totalGrossYearly: totalResult.grossYearly,
      totalNetYearly: totalResult.netYearly,
      noVacationGrossYearly: noVacationResult.grossYearly,
      noVacationNetYearly: noVacationResult.netYearly,
    },
  };
}

function invalidResult(error: string): VacationPayResult {
  return {
    valid: false,
    grossMonthlySalary: 0,
    vacationPayPercentage: 0,
    grossVacationPay: 0,
    estimatedTax: 0,
    netVacationPay: 0,
    effectiveRate: 0,
    breakdown: {
      totalGrossYearly: 0,
      totalNetYearly: 0,
      noVacationGrossYearly: 0,
      noVacationNetYearly: 0,
    },
    error,
  };
}
