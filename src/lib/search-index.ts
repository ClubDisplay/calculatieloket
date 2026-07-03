export interface SearchItem {
  title: string;
  url: string;
  keywords: string[];
  category: string;
  description: string;
}

export const searchIndex: SearchItem[] = [
  {
    title: "Bruto netto 2026",
    url: "/bruto-netto-2026/",
    keywords: ["bruto netto", "netto", "bruto", "salaris", "loon", "inkomen", "werknemer"],
    category: "Inkomen",
    description: "Bereken je netto salaris in 2026",
  },
  {
    title: "Salaris calculator",
    url: "/salaris-calculator/",
    keywords: ["salaris", "loon", "bruto netto", "inkomen", "werknemer"],
    category: "Inkomen",
    description: "Vergelijk bruto bedragen en zie het netto effect",
  },
  {
    title: "Vakantiegeld calculator",
    url: "/vakantiegeld-calculator/",
    keywords: ["vakantiegeld", "vakantie", "geld", "netto", "bruto", "salaris"],
    category: "Inkomen",
    description: "Bereken je netto vakantiegeld",
  },
  {
    title: "Toeslagen calculator",
    url: "/toeslagen-calculator/",
    keywords: ["toeslagen", "zorgtoeslag", "zorgtoeslagen", "huurtoeslag", "huurtoeslagen", "zorg", "huur", "wonen", "inkomen"],
    category: "Inkomen",
    description: "Bereken je huur- en zorgtoeslag",
  },
  {
    title: "Hypotheek calculator",
    url: "/hypotheek-calculator/",
    keywords: ["hypotheek", "huis", "woning", "wonen", "maximale hypotheek", "lenen", "maandlasten"],
    category: "Wonen",
    description: "Bereken wat je maximaal kunt lenen",
  },
  {
    title: "BTW calculator",
    url: "/btw-calculator/",
    keywords: ["btw", "belasting", "21", "9", "exclusief", "inclusief", "omrekenen"],
    category: "Belasting",
    description: "Bereken btw over een bedrag",
  },
  {
    title: "BTW terugrekenen",
    url: "/btw-terugrekenen/",
    keywords: ["btw", "terugrekenen", "inclusief", "exclusief", "belasting"],
    category: "Belasting",
    description: "Reken een inclusief bedrag om naar exclusief",
  },
  {
    title: "BTW inclusief/exclusief",
    url: "/btw-inclusief-exclusief/",
    keywords: ["btw", "inclusief", "exclusief", "omrekenen", "belasting"],
    category: "Belasting",
    description: "Reken btw in beide richtingen",
  },
  {
    title: "ZZP calculator",
    url: "/zzp-calculator/",
    keywords: ["zzp", "zelfstandig", "ondernemer", "uurtarief", "freelancer", "inkomen"],
    category: "Ondernemen",
    description: "Bereken je benodigde uurtarief",
  },
  {
    title: "Auto importkosten berekenen",
    url: "/auto-importkosten-berekenen/",
    keywords: ["auto", "import", "importkosten", "duitsland", "bpm", "rdw", "auto importeren"],
    category: "Auto",
    description: "Bereken de kosten van een auto importeren",
  },
];

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
