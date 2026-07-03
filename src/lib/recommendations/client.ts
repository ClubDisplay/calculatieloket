import type { Recommendation } from "./types";
import { icons } from "../category-icons";

export const MAX_RECOMMENDATIONS = 4;

function iconFor(id: string, title: string): string {
  const key = `${id} ${title}`.toLowerCase();
  if (key.includes("vakantiegeld") || key.includes("vakantie")) return icons.sun;
  if (key.includes("hypotheek") || key.includes("wonen") || key.includes("huis")) return icons.house;
  if (key.includes("salaris") || key.includes("netto") || key.includes("bruto") || key.includes("loon")) return icons.money;
  if (key.includes("zzp") || key.includes("ondernemen") || key.includes("bedrijf") || key.includes("zzp'er")) return icons.person;
  if (key.includes("auto") || key.includes("import") || key.includes("car") || key.includes("voertuig")) return icons.car;
  if (key.includes("btw") || key.includes("tarief") || key.includes("percent") || key.includes("percentage")) return icons.percent;
  if (key.includes("toeslagen") || key.includes("zorgtoeslag") || key.includes("huurtoeslag")) return icons.house;
  return icons.calc;
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
