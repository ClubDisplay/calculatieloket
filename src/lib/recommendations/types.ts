export interface Recommendation {
  id: string;
  title: string;
  description: string;
  url: string;
  priority: number;
  reason: string;
}

export interface RecommendationInput {
  calculator: string;
  values: Record<string, unknown>;
  result: Record<string, unknown>;
}

export type RecommendationRule = (input: RecommendationInput) => Recommendation[];
