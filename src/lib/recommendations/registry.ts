import type { RecommendationRule } from "./types";
import { incomeRules } from "./rules/income";
import { btwRules } from "./rules/btw";
import { mortgageRules } from "./rules/mortgage";
import { zzpRules } from "./rules/zzp";
import { allowancesRules } from "./rules/allowances";
import { importCostsRules } from "./rules/import-costs";
import { vacationPayRules } from "./rules/vacation-pay";

export const recommendationRegistry: Record<string, RecommendationRule> = {
  "bruto-netto": incomeRules,
  salaris: incomeRules,
  btw: btwRules,
  "btw-terugrekenen": btwRules,
  "btw-inclusief-exclusief": btwRules,
  hypotheek: mortgageRules,
  zzp: zzpRules,
  toeslagen: allowancesRules,
  "auto-importkosten": importCostsRules,
  vakantiegeld: vacationPayRules,
};
