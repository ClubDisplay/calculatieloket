/**
 * Atlas Calculator Engine — Mortgage module v0.1
 *
 * Pure functions for Dutch mortgage indication calculations.
 * Mirrors the existing inline logic from hypotheek-calculator.astro.
 *
 * No DOM, no HTML, no formatting, no storage.
 */

/** Input for the mortgage indication calculation. */
export interface MortgageInput {
  /** Primary gross yearly income in EUR. */
  income: number;
  /** Yearly interest rate in percent (e.g. 3.8 for 3.8%). */
  interestRate: number;
  /** Loan term in years. */
  termYears: number;
  /** Optional partner gross yearly income in EUR. */
  partnerIncome?: number;
  /** Whether to include the partner income. */
  includePartner?: boolean;
}

/** Detailed result of a mortgage indication calculation. */
export interface MortgageResult {
  valid: boolean;
  error?: string;
  income: number;
  partnerIncome: number;
  totalIncome: number;
  interestRate: number;
  termYears: number;
  incomeFactor: number;
  maxMortgage: number;
  monthlyPayment: number;
  totalInterest: number;
  netMonthlyPayment: number;
}

import { resolveRule } from "../rules/resolver";

/** Data shape for a mortgage_formula Knowledge Object (e.g. nl.mortgage.formula.2026). */
interface MortgageFormulaData {
  year: number;
  interest_deduction_rate: number;
  min_income_factor: number;
  income_factor_base: number;
  income_factor_rate_multiplier: number;
}

/** Fallback mortgage formula parameters matching the previous hardcoded values. */
const FALLBACK_MORTGAGE_FORMULA_2026 = {
  year: 2026,
  interest_deduction_rate: 0.3756,
  min_income_factor: 3.5,
  income_factor_base: 5.8,
  income_factor_rate_multiplier: 0.28,
} as const;

/**
 * Load the active 2026 mortgage formula parameters via the Rule Resolver.
 * Falls back to the legacy hardcoded values if the resolver cannot resolve them.
 */
function loadMortgageFormula2026(): MortgageFormulaData {
  const obj = resolveRule({
    type: "mortgage_formula",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.mortgage.formula.2026",
  });

  if (obj?.data) {
    const data = obj.data as MortgageFormulaData;
    if (
      typeof data.interest_deduction_rate === "number" &&
      typeof data.min_income_factor === "number" &&
      typeof data.income_factor_base === "number" &&
      typeof data.income_factor_rate_multiplier === "number"
    ) {
      return data;
    }
  }

  return { ...FALLBACK_MORTGAGE_FORMULA_2026 };
}

/** Active 2026 mortgage formula parameters. */
const MORTGAGE_FORMULA_2026 = loadMortgageFormula2026();

/**
 * Calculate the income factor based on the yearly interest rate.
 *
 * Formula: max(min_income_factor, income_factor_base - rate * income_factor_rate_multiplier)
 */
export function calculateIncomeFactor(interestRate: number): number {
  return Math.max(
    MORTGAGE_FORMULA_2026.min_income_factor,
    MORTGAGE_FORMULA_2026.income_factor_base -
      interestRate * MORTGAGE_FORMULA_2026.income_factor_rate_multiplier,
  );
}

/**
 * Calculate the maximum mortgage based on total yearly income and interest rate.
 */
export function calculateMaxMortgage(totalYearlyIncome: number, interestRate: number): number {
  return totalYearlyIncome * calculateIncomeFactor(interestRate);
}

/**
 * Calculate the monthly annuity payment for a given mortgage amount.
 *
 * Uses the standard annuity formula:
 *
 *   M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
 *
 * where r is the monthly interest rate and n is the number of months.
 * If the monthly rate is 0, the payment is simply P / n.
 */
export function calculateMonthlyPayment(
  mortgageAmount: number,
  interestRate: number,
  termYears: number,
): number {
  if (!Number.isFinite(mortgageAmount) || mortgageAmount <= 0) {
    return 0;
  }

  const months = termYears * 12;
  const monthlyRate = interestRate / 100 / 12;

  if (monthlyRate === 0) {
    return mortgageAmount / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return mortgageAmount * ((monthlyRate * factor) / (factor - 1));
}

/**
 * Calculate the total interest paid over the full term.
 */
export function calculateTotalInterest(
  monthlyPayment: number,
  mortgageAmount: number,
  termYears: number,
): number {
  return monthlyPayment * termYears * 12 - mortgageAmount;
}

/**
 * Calculate the net monthly payment after interest deduction.
 *
 * Uses the simplified model from the original page:
 *   net = gross - (totalInterest / termYears * 0.3756) / 12
 */
export function calculateNetMonthlyPayment(
  monthlyPayment: number,
  totalInterest: number,
  termYears: number,
): number {
  if (termYears <= 0) return monthlyPayment;
  return (
    monthlyPayment -
    (totalInterest / termYears * MORTGAGE_FORMULA_2026.interest_deduction_rate) / 12
  );
}

function invalidMortgageResult(error: string): MortgageResult {
  return {
    valid: false,
    error,
    income: 0,
    partnerIncome: 0,
    totalIncome: 0,
    interestRate: 0,
    termYears: 0,
    incomeFactor: 0,
    maxMortgage: 0,
    monthlyPayment: 0,
    totalInterest: 0,
    netMonthlyPayment: 0,
  };
}

/**
 * Main entry point: calculate the mortgage indication for a given input.
 */
export function calculateMortgage(input: MortgageInput): MortgageResult {
  const income = Number.isFinite(input.income) ? input.income : 0;
  const interestRate = Number.isFinite(input.interestRate) ? input.interestRate : 0;
  const termYears = Number.isFinite(input.termYears) && input.termYears > 0 ? input.termYears : 0;
  const partnerIncome =
    input.includePartner && Number.isFinite(input.partnerIncome)
      ? (input.partnerIncome ?? 0)
      : 0;
  const totalIncome = income + partnerIncome;

  if (income <= 0 || interestRate <= 0 || termYears <= 0) {
    return invalidMortgageResult("Vul een geldig inkomen, rente en looptijd in (hoger dan 0).");
  }

  const incomeFactor = calculateIncomeFactor(interestRate);
  const maxMortgage = calculateMaxMortgage(totalIncome, interestRate);
  const monthlyPayment = calculateMonthlyPayment(maxMortgage, interestRate, termYears);
  const totalInterest = calculateTotalInterest(monthlyPayment, maxMortgage, termYears);
  const netMonthlyPayment = calculateNetMonthlyPayment(monthlyPayment, totalInterest, termYears);

  return {
    valid: true,
    income,
    partnerIncome,
    totalIncome,
    interestRate,
    termYears,
    incomeFactor,
    maxMortgage,
    monthlyPayment,
    totalInterest,
    netMonthlyPayment,
  };
}
