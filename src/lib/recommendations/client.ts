import type { Recommendation } from "./types";
import { getRecommendationIcon } from "../calculators/registry";

export const MAX_RECOMMENDATIONS = 4;

function iconFor(id: string, title: string): string {
  return getRecommendationIcon(id, title);
}

/**
 * Re-render the FinancialJourney component container with a new set of recommendations.
 * Use this from a calculator page client script after input/result changes.
 */
export function updateFinancialJourney(container: HTMLElement, recommendations: Recommendation[]): void {
  const stepsContainer = container.querySelector(".calc-financial-journey-steps");
  if (!stepsContainer) return;

  const html = recommendations
    .slice(0, MAX_RECOMMENDATIONS)
    .map(
      (rec) => `
        <a href="${rec.url}" class="calc-financial-journey-step" data-step="${rec.id}" data-analytics="financial-journey-link" data-analytics-category="calculator-page" data-analytics-action="click" data-analytics-label="${rec.id}">
          <span class="step-icon" aria-hidden="true">${iconFor(rec.id, rec.title)}</span>
          <span class="step-content">
            <span class="step-label">${rec.title}</span>
            <span class="step-desc">${rec.description}</span>
            ${rec.reason ? `<span class="step-reason">${rec.reason}</span>` : ""}
          </span>
          <span class="step-arrow" aria-hidden="true">→</span>
        </a>
      `,
    )
    .join("");

  stepsContainer.innerHTML = html;
}

/**
 * Find the first FinancialJourney container inside a parent element.
 */
export function findFinancialJourneyContainer(parent: HTMLElement = document.body): HTMLElement | null {
  return parent.querySelector(".calc-financial-journey");
}
