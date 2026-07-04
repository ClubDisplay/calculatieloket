import { getSearchIndex } from "./calculators/registry";
import type { SearchItem } from "./calculators/registry";

export type { SearchItem };
export { getSearchIndex };

export const searchIndex: SearchItem[] = getSearchIndex();

export function search(query: string): SearchItem[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];
  const words = normalized.split(/\s+/).filter(Boolean);

  return searchIndex
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const titleWords = title.split(/\s+/);
      const description = item.description.toLowerCase();
      const category = item.category.toLowerCase();
      const url = item.url.toLowerCase();
      const keywords = item.keywords.map((k) => k.toLowerCase());
      const allText = [title, description, category, url, ...keywords].join(" ");

      // Intent matching — highest priority
      item.intents.forEach((intent) => {
        const intentNorm = intent.toLowerCase();
        if (intentNorm === normalized) score += 200;
        else if (intentNorm.includes(normalized)) score += 160;
        else if (normalized.includes(intentNorm)) score += 140;
        else {
          const intentWords = intentNorm.split(/\s+/);
          words.forEach((word) => {
            if (intentWords.some((iw) => iw === word)) score += 80;
            else if (intentWords.some((iw) => iw.startsWith(word))) score += 50;
            else if (intentWords.some((iw) => iw.includes(word))) score += 30;
          });
        }
      });

      if (allText.includes(normalized)) score += 10;

      words.forEach((word) => {
        if (titleWords.some((t) => t === word)) score += 120;
        else if (titleWords.some((t) => t.startsWith(word))) score += 100;
        else if (title.includes(word)) score += 70;

        if (keywords.some((k) => k === word)) score += 90;
        else if (keywords.some((k) => k.startsWith(word))) score += 60;
        else if (keywords.some((k) => k.includes(word))) score += 50;

        if (description.includes(word)) score += 30;
        if (category.includes(word)) score += 20;
        if (url.includes(word)) score += 20;
      });

      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.item);
}
