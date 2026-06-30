/**
 * Atlas Knowledge Layer — TypeScript types
 *
 * Prototype v0.1 for Atlas v2 Sprint 008.
 * These types mirror the YAML Knowledge Objects in docs/v2/knowledge/objects/.
 */

export type AuthorityLevel = "official" | "semi_official" | "editorial" | "internal";

export type KnowledgeStatus = "active" | "draft" | "deprecated";

export interface KnowledgeSource {
  label: string;
  url: string;
  authority_level: AuthorityLevel;
  domain?: string;
  last_verified?: string;
  section?: string;
  notes?: string;
}

export interface KnowledgeAuthority {
  level: AuthorityLevel;
  name: string;
  last_review?: string;
  review_frequency?: string;
}

export interface KnowledgeRelationship {
  relation: string;
  target: string;
  description?: string;
}

export interface KnowledgeObject {
  id: string;
  type: string;
  country: string;
  locale: string;
  title: string | Record<string, string>;
  description: string | Record<string, string>;
  status: KnowledgeStatus;
  effective_from: string;
  effective_until: string | null;
  authority: KnowledgeAuthority;
  sources: KnowledgeSource[];
  relationships: KnowledgeRelationship[];
  used_by: string[];
  version: string;
  tags: string[];
  notes: string | Record<string, string>;
  data?: Record<string, unknown>;
}

export type VatRateCategory = "standard" | "reduced" | "zero";

export interface VatRateData {
  default_rate: number;
  currency: string;
  rates: Array<{ value: number; label: string; category: VatRateCategory }>;
  value?: number;
}

export interface VatRateKnowledgeObject extends KnowledgeObject {
  type: "vat_rate";
  data: VatRateData;
}

export interface EntrepreneurDeductionData {
  deduction_type: string;
  amount: number;
  currency: string;
}

export interface EntrepreneurDeductionKnowledgeObject extends KnowledgeObject {
  type: "entrepreneur_deduction";
  data: EntrepreneurDeductionData;
}

export interface ProfitExemptionData {
  exemption_type: string;
  rate: number;
  currency: string;
}

export interface ProfitExemptionKnowledgeObject extends KnowledgeObject {
  type: "profit_exemption";
  data: ProfitExemptionData;
}
