/**
 * Atlas Knowledge Layer — In-memory registry v0.2
 *
 * Prototype for Atlas v2 Sprint 010.
 * This module re-exports the generated Knowledge Object registry from
 * `generated-objects.ts`. The generated file is produced by
 * `npm run generate:knowledge` from the YAML sources in
 * `docs/v2/knowledge/objects/`.
 */

import type { KnowledgeObject } from "./types";
import { generatedKnowledgeObjects } from "./generated-objects";

/**
 * In-memory registry of all active Knowledge Objects.
 * This is a shallow copy of the generated registry so consumers can safely
 * import and iterate without mutating the generated source.
 */
export const knowledgeObjects: KnowledgeObject[] = [...generatedKnowledgeObjects];

export function getKnowledgeObject(id: string): KnowledgeObject | undefined {
  return knowledgeObjects.find((obj) => obj.id === id);
}

export function getKnowledgeObjectsByType(type: string): KnowledgeObject[] {
  return knowledgeObjects.filter((obj) => obj.type === type);
}

/**
 * @deprecated Legacy compatibility helper. New code should use the Rule
 * Resolver instead: `resolveRule({ type: "vat_rate", country: "NL", locale:
 * "nl-NL", year: 2026 })`. This helper remains functional until all consumers
 * are migrated and the deprecated API can be safely removed.
 */

