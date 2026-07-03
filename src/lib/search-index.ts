export interface SearchItem {
  title: string;
  url: string;
  keywords: string[];
  category: string;
  description: string;
  intents: string[];
}

export const searchIndex: SearchItem[] = [
  {
    title: "Bruto netto 2026",
    url: "/bruto-netto-2026/",
    keywords: ["bruto netto", "netto", "bruto", "salaris", "loon", "inkomen", "werknemer"],
    category: "Inkomen",
    description: "Bereken je netto salaris in 2026",
    intents: ["meer salaris", "loon", "netto loon", "bruto loon", "salaris berekenen", "inkomen"],
  },
  {
    title: "Salaris calculator",
    url: "/salaris-calculator/",
    keywords: ["salaris", "loon", "bruto netto", "inkomen", "werknemer"],
    category: "Inkomen",
    description: "Vergelijk bruto bedragen en zie het netto effect",
    intents: ["meer salaris", "salaris", "salaris vergelijken"],
  },
  {
    title: "Vakantiegeld calculator",
    url: "/vakantiegeld-calculator/",
    keywords: ["vakantiegeld", "vakantie", "geld", "netto", "bruto", "salaris"],
    category: "Inkomen",
    description: "Bereken je netto vakantiegeld",
    intents: ["vakantie", "vakantiegeld", "vakantie geld"],
  },
  {
    title: "Toeslagen calculator",
    url: "/toeslagen-calculator/",
    keywords: ["toeslagen", "zorgtoeslag", "zorgtoeslagen", "huurtoeslag", "huurtoeslagen", "zorg", "huur", "wonen", "inkomen"],
    category: "Inkomen",
    description: "Bereken je huur- en zorgtoeslag",
    intents: ["zorgverzekering", "zorgtoeslag", "huurtoeslag", "zorg toeslag", "huur toeslag", "toeslag"],
  },
  {
    title: "Hypotheek calculator",
    url: "/hypotheek-calculator/",
    keywords: ["hypotheek", "huis", "woning", "wonen", "maximale hypotheek", "lenen", "maandlasten"],
    category: "Wonen",
    description: "Bereken wat je maximaal kunt lenen",
    intents: ["huis kopen", "eerste huis", "woning kopen", "huis", "woning", "hypotheek"],
  },
  {
    title: "BTW calculator",
    url: "/btw-calculator/",
    keywords: ["btw", "belasting", "21", "9", "exclusief", "inclusief", "omrekenen"],
    category: "Belasting",
    description: "Bereken btw over een bedrag",
    intents: ["minder belasting", "btw", "belasting", "btw berekenen"],
  },
  {
    title: "BTW terugrekenen",
    url: "/btw-terugrekenen/",
    keywords: ["btw", "terugrekenen", "inclusief", "exclusief", "belasting"],
    category: "Belasting",
    description: "Reken een inclusief bedrag om naar exclusief",
    intents: ["minder belasting", "btw terugrekenen", "inclusief exclusief"],
  },
  {
    title: "BTW inclusief/exclusief",
    url: "/btw-inclusief-exclusief/",
    keywords: ["btw", "inclusief", "exclusief", "omrekenen", "belasting"],
    category: "Belasting",
    description: "Reken btw in beide richtingen",
    intents: ["minder belasting", "btw inclusief exclusief", "inclusief exclusief"],
  },
  {
    title: "ZZP calculator",
    url: "/zzp-calculator/",
    keywords: ["zzp", "zelfstandig", "ondernemer", "uurtarief", "freelancer", "inkomen"],
    category: "Ondernemen",
    description: "Bereken je benodigde uurtarief",
    intents: ["minder belasting", "zzper", "zzp", "zelfstandig", "ondernemer", "freelancer", "uurtarief"],
  },
  {
    title: "Auto importkosten berekenen",
    url: "/auto-importkosten-berekenen/",
    keywords: ["auto", "import", "importkosten", "duitsland", "bpm", "rdw", "auto importeren"],
    category: "Auto",
    description: "Bereken de kosten van een auto importeren",
    intents: ["duitse auto", "auto uit duitsland", "auto importeren", "import auto"],
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
