/**
 * Atlas Calculator Engine — Validation rules
 *
 * Pure validation functions for calculator inputs.
 */

export type ValidationResult = {
  valid: boolean;
  message?: string;
};

/**
 * Validate that a value is strictly positive (greater than 0).
 */
export function validatePositive(
  value: number,
  label = "Waarde",
): ValidationResult {
  if (!Number.isFinite(value) || value <= 0) {
    return { valid: false, message: `${label} moet hoger zijn dan 0.` };
  }
  return { valid: true };
}

/**
 * Validate that a value is non-negative (0 or higher).
 */
export function validateNonNegative(
  value: number,
  label = "Waarde",
): ValidationResult {
  if (!Number.isFinite(value) || value < 0) {
    return { valid: false, message: `${label} mag niet negatief zijn.` };
  }
  return { valid: true };
}

/**
 * Validate that a value falls within an inclusive range.
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
  label = "Waarde",
): ValidationResult {
  if (!Number.isFinite(value)) {
    return { valid: false, message: `${label} is geen geldig getal.` };
  }

  if (value < min || value > max) {
    return {
      valid: false,
      message: `${label} moet tussen ${min} en ${max} liggen.`,
    };
  }

  return { valid: true };
}
