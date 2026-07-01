import type { Recommendation } from "./types";

export const MAX_RECOMMENDATIONS = 4;

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
        <a href="${rec.url}" class="calc-financial-journey-step" data-step="${rec.id}">
          <span class="step-check">✓</span>
          <span class="step-content">
            <span class="step-label">${rec.title}</span>
            <span class="step-desc">${rec.description}</span>
            <span class="step-reason">${rec.reason}</span>
          </span>
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
