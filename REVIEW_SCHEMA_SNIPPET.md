# Review-schema snippet voor Calculatieloket.nl

> Plaats dit pas op de website als er daadwerkelijk minstens 5–10 reviews zijn. Google kan schema straffen als de data niet overeenkomt met echte reviews.

## 1. aggregateRating + Review in één JSON-LD block

Plaats onderstaand script bij voorkeur in `<head>` (bijvoorbeeld via `slot="head"` in Astro) op de homepage of op een landingspagina.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Gratis online calculators van Calculatieloket.nl",
  "description": "Gratis, privacyvriendelijke online calculators voor BTW, salaris, hypotheek, toeslagen, ZZP en auto-kosten.",
  "brand": {
    "@type": "Brand",
    "name": "Calculatieloket.nl"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "https://calculatieloket.nl"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "12"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Anonieme gebruiker"
      },
      "datePublished": "2026-07-15",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Snelle en duidelijke bruto-netto berekening. Fijn dat ik geen account hoefde aan te maken."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Anonieme gebruiker"
      },
      "datePublished": "2026-06-28",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4",
        "bestRating": "5"
      },
      "reviewBody": "De BTW calculator gebruik ik regelmatig voor mijn facturen. Duidelijke uitleg."
    }
  ]
}
</script>
```

## 2. Belangrijke richtlijnen

- Vervang `ratingValue` en `reviewCount` door de werkelijke waarden uit je reviewverzameling.
- Zorg dat de reviews ook daadwerkelijk op de pagina of op een extern platform te zien zijn.
- Gebruik geen fictieve reviewCount. Dat kan leiden tot een handmatige actie van Google.
- Voor `review.author` kun je een generieke "Anonieme gebruiker" gebruiken, maar beter is een naam of een Google-account-link.

## 3. Reviews verzamelen

1. Maak een Google Bedrijfsprofiel aan voor Calculatieloket.nl (als dat nog niet bestaat).
2. Vraag actief om reviews:
   - Via een e-mailnieuwsbrief na gebruik van een calculator.
   - Via een kleine banner of link op de homepage: "Beoordeel ons op Google".
   - Op sociale kanalen (LinkedIn, X, etc.) met een directe link naar je Google Bedrijfsprofiel.
3. Streef naar minstens 10 reviews voordat je het schema live zet.
4. Update maandelijks het `AggregateRating` block als er nieuwe reviews binnenkomen.

## 4. Link naar Google Bedrijfsprofiel

Vervang onderstaande URL door je eigen profiel-URL:

```
https://www.google.com/search?kgmid=.../...
```

Tip: een korte `g.page/...` review-link kun je genereren in het Google Bedrijfsprofiel dashboard onder "Meer > Delen > Link kopiëren".
