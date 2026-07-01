import type { Recommendation, RecommendationInput } from "./types";
import { recommendationRegistry } from "./registry";

export function getRecommendations(input: RecommendationInput): Recommendation[] {
  const rules = recommendationRegistry[input.calculator];
  if (!rules) return [];

  const recs = rules(input).filter((rec) => rec.id !== input.calculator);
  const seen = new Set<string>();

  return recs
    .sort((a, b) => a.priority - b.priority)
    .filter((rec) => {
      if (seen.has(rec.id)) return false;
      seen.add(rec.id);
      return true;
    });
}
