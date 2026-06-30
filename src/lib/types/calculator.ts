/**
 * Atlas Calculator Engine — Shared calculator types
 *
 * Base types used by calculator pages and engine modules.
 */

/** Standard status of a calculator form. */
export type CalculatorStatus = "idle" | "valid" | "error";

/** Description of a single validation error. */
export interface FieldError {
  field: string;
  message: string;
}

/** Standard shape returned by any calculator engine. */
export interface CalculatorResult<T = Record<string, unknown>> {
  status: CalculatorStatus;
  errors?: FieldError[];
  data?: T;
}
