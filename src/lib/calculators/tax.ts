/**
 * Atlas Calculator Engine — Tax module v0.1
 *
 * Pure functions for Dutch 2026 Box 1 income tax and tax credits.
 * Values are copied from the existing inline page scripts and constants.
 * No DOM, no HTML, no formatting, no storage.
 *
 * TODO: reconcile with official Belastingdienst tables and Knowledge Layer objects.
 */

import { resolveRule } from "../rules/resolver";
import { AHK_2026, AK_2026, TAX_2026 } from "../utils/constants";

/** Data shape for a tax_bracket Knowledge Object (e.g. nl.tax.box1.2026). */
interface TaxBracketData {
  brackets: Array<{ up_to: number | null; rate: number }>;
}

/** Data shape for the nl.tax.ahk.2026 tax_credit Knowledge Object. */
interface GeneralTaxCreditData {
  max: number;
  phase_out: { threshold: number; rate: number };
  cut_off: number;
}

/** Data shape for the nl.tax.ak.2026 tax_credit Knowledge Object. */
interface LabourTaxCreditData {
  brackets: Array<{ up_to: number | null; base?: number; rate: number }>;
}

/** Input for the Dutch 2026 net income estimate. */
export interface TaxIncomeInput {
  /** Gross monthly salary in EUR. */
  grossMonthlySalary: number;
  /** Employee pension contribution as a percentage of gross salary (0–100). */
  pensionRate?: number;
  /** Employee pension contribution as a fixed monthly amount in EUR. Takes priority over `pensionRate`. */
  pensionAmount?: number;
  /** Whether to apply loonheffingskorting (general + labour tax credits). */
  applyLoonheffingskorting: boolean;
}

/** Detailed breakdown of the 2026 net income estimate. */
export interface TaxBreakdown {
  grossYearly: number;
  holidayPay: number;
  pensionAmount: number;
  taxableIncome: number;
  incomeTax: number;
  generalTaxCredit: number;
  labourTaxCredit: number;
  totalCredits: number;
  netYearly: number;
  netMonthly: number;
}

/** Result of the 2026 net income estimate. */
export interface TaxIncomeResult {
  valid: boolean;
  grossYearly: number;
  taxableIncome: number;
  incomeTax: number;
  totalCredits: number;
  netYearly: number;
  netMonthly: number;
  breakdown: TaxBreakdown;
  error?: string;
}

/**
 * Load the active 2026 Box 1 tax brackets via the Rule Resolver.
 * Falls back to the legacy constants if the resolver cannot resolve them.
 */
function loadTaxBrackets2026(): Array<{ upTo: number; rate: number }> {
  const obj = resolveRule({
    type: "tax_bracket",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
  });

  if (obj?.data) {
    const data = obj.data as TaxBracketData;
    if (
      Array.isArray(data.brackets) &&
      data.brackets.length > 0 &&
      data.brackets.every(
        (b) => typeof b.rate === "number" && (typeof b.up_to === "number" || b.up_to === null),
      )
    ) {
      return data.brackets.map((b) => ({ upTo: b.up_to ?? Infinity, rate: b.rate }));
    }
  }

  return TAX_2026.brackets.map((b) => ({ upTo: b.upTo, rate: b.rate }));
}

/**
 * Load the active 2026 general tax credit (AHK) via the Rule Resolver.
 * Falls back to the legacy constants if the resolver cannot resolve them.
 */
function loadGeneralTaxCredit2026(): {
  max: number;
  phaseOutThreshold: number;
  phaseOutRate: number;
  cutOff: number;
} {
  const obj = resolveRule({
    type: "tax_credit",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.tax.ahk.2026",
  });

  if (obj?.data) {
    const data = obj.data as GeneralTaxCreditData;
    if (
      typeof data.max === "number" &&
      data.phase_out &&
      typeof data.phase_out.threshold === "number" &&
      typeof data.phase_out.rate === "number" &&
      typeof data.cut_off === "number"
    ) {
      return {
        max: data.max,
        phaseOutThreshold: data.phase_out.threshold,
        phaseOutRate: data.phase_out.rate,
        cutOff: data.cut_off,
      };
    }
  }

  return {
    max: AHK_2026.max,
    phaseOutThreshold: AHK_2026.phaseOutThreshold,
    phaseOutRate: AHK_2026.phaseOutRate,
    cutOff: AHK_2026.cutOff,
  };
}

/**
 * Load the active 2026 labour tax credit (AK) brackets via the Rule Resolver.
 * Falls back to the legacy constants if the resolver cannot resolve them.
 */
function loadLabourTaxCreditBrackets2026(): Array<{ upTo: number; base?: number; rate: number }> {
  const obj = resolveRule({
    type: "tax_credit",
    country: "NL",
    locale: "nl-NL",
    year: 2026,
    id: "nl.tax.ak.2026",
  });

  if (obj?.data) {
    const data = obj.data as LabourTaxCreditData;
    if (
      Array.isArray(data.brackets) &&
      data.brackets.length > 0 &&
      data.brackets.every(
        (b) => typeof b.rate === "number" && (typeof b.up_to === "number" || b.up_to === null),
      )
    ) {
      return data.brackets.map((b) => ({ upTo: b.up_to ?? Infinity, base: b.base, rate: b.rate }));
    }
  }

  return AK_2026.brackets.map((b) => ({ upTo: b.upTo, base: b.base, rate: b.rate }));
}

/** Active 2026 Box 1 tax brackets. */
const TAX_2026_BRACKETS = loadTaxBrackets2026();

/** Active 2026 general tax credit values. */
const AHK_2026_VALUES = loadGeneralTaxCredit2026();

/** Active 2026 labour tax credit brackets. */
const AK_2026_BRACKETS = loadLabourTaxCreditBrackets2026();

/**
 * Calculate Box 1 income tax for 2026 (under AOW age).
 *
 * @param taxableIncome Yearly taxable income in EUR.
 * @returns The income tax amount, never negative.
 */
export function calculateBox1Tax2026(taxableIncome: number): number {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) {
    return 0;
  }

  let tax = 0;
  let remaining = taxableIncome;
  let previousLimit = 0;

  for (const bracket of TAX_2026_BRACKETS) {
    const limit = bracket.upTo === Infinity ? Infinity : bracket.upTo;
    const band = limit === Infinity ? remaining : Math.min(remaining, limit - previousLimit);

    if (band <= 0) {
      break;
    }

    tax += band * bracket.rate;
    remaining -= band;
    previousLimit = limit;

    if (remaining <= 0) {
      break;
    }
  }

  return tax;
}

/**
 * Calculate the 2026 general tax credit (Algemene heffingskorting).
 *
 * @param taxableIncome Yearly taxable income in EUR.
 * @returns The credit amount, never negative.
 */
export function calculateGeneralTaxCredit2026(taxableIncome: number): number {
  if (!Number.isFinite(taxableIncome) || taxableIncome <= 0) {
    return 0;
  }

  if (taxableIncome <= AHK_2026_VALUES.phaseOutThreshold) {
    return AHK_2026_VALUES.max;
  }

  if (taxableIncome >= AHK_2026_VALUES.cutOff) {
    return 0;
  }

  return Math.max(0, AHK_2026_VALUES.max - AHK_2026_VALUES.phaseOutRate * (taxableIncome - AHK_2026_VALUES.phaseOutThreshold));
}

/**
 * Calculate the 2026 labour tax credit (Arbeidskorting).
 *
 * @param labourIncome Yearly labour income in EUR.
 * @returns The credit amount, never negative.
 */
export function calculateLabourTaxCredit2026(labourIncome: number): number {
  if (!Number.isFinite(labourIncome) || labourIncome <= 0) {
    return 0;
  }

  let previousUpTo = 0;

  for (const bracket of AK_2026_BRACKETS) {
    if (labourIncome <= bracket.upTo || bracket.upTo === Infinity) {
      const base = bracket.base ?? 0;
      return Math.max(0, base + bracket.rate * (labourIncome - previousUpTo));
    }

    previousUpTo = bracket.upTo;
  }

  return 0;
}

/**
 * Estimate the 2026 net yearly and monthly income.
 *
 * @param input The gross salary, pension rate and loonheffingskorting flag.
 * @returns A detailed TaxIncomeResult.
 */
export function calculateNetIncomeEstimate2026(input: TaxIncomeInput): TaxIncomeResult {
  if (!Number.isFinite(input.grossMonthlySalary) || input.grossMonthlySalary < 0) {
    return {
      valid: false,
      grossYearly: 0,
      taxableIncome: 0,
      incomeTax: 0,
      totalCredits: 0,
      netYearly: 0,
      netMonthly: 0,
      breakdown: {
        grossYearly: 0,
        holidayPay: 0,
        pensionAmount: 0,
        taxableIncome: 0,
        incomeTax: 0,
        generalTaxCredit: 0,
        labourTaxCredit: 0,
        totalCredits: 0,
        netYearly: 0,
        netMonthly: 0,
      },
      error: "Vul een geldig bruto maandsalaris in (hoger dan of gelijk aan 0).",
    };
  }

  const grossYearly = input.grossMonthlySalary * 12.96;
  const holidayPay = input.grossMonthlySalary * 12 * 0.08;

  // Prefer a fixed monthly pension amount over a percentage. Negative amounts are treated as 0.
  const monthlyPension =
    input.pensionAmount !== undefined && Number.isFinite(input.pensionAmount)
      ? Math.max(0, input.pensionAmount)
      : input.grossMonthlySalary * ((input.pensionRate ?? 0) / 100);
  const pensionAmount = monthlyPension * 12;

  const taxableIncome = grossYearly - pensionAmount;

  const incomeTax = calculateBox1Tax2026(taxableIncome);
  const generalTaxCredit = input.applyLoonheffingskorting ? calculateGeneralTaxCredit2026(taxableIncome) : 0;
  const labourTaxCredit = input.applyLoonheffingskorting ? calculateLabourTaxCredit2026(taxableIncome) : 0;
  const totalCredits = generalTaxCredit + labourTaxCredit;
  const netYearly = taxableIncome - incomeTax + totalCredits;
  const netMonthly = netYearly / 12;

  const breakdown: TaxBreakdown = {
    grossYearly,
    holidayPay,
    pensionAmount,
    taxableIncome,
    incomeTax,
    generalTaxCredit,
    labourTaxCredit,
    totalCredits,
    netYearly,
    netMonthly,
  };

  return {
    valid: true,
    grossYearly,
    taxableIncome,
    incomeTax,
    totalCredits,
    netYearly,
    netMonthly,
    breakdown,
  };
}
