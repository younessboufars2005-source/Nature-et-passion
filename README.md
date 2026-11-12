# Nature & Passions — migration locale Shopify vers Astro

Reproduction locale du catalogue public de `natureetpassions.net`, construite avec Astro et TypeScript. Les données viennent des endpoints publics Shopify consultés le 11 novembre 2026. La commande et le paiement sont volontairement désactivés.

## Lancer le site

```bash
npm install
npm run dev
```

Puis ouvrir l’URL indiquée par Astro (généralement `http://localhost:4321`). Pour vérifier la production :

```bash
npm run build
npm run preview
```

## Données

- `src/data/products.json` : 71 produits publics, 110 variantes. La collection « Tous nos produits » conserve ses 66 références Shopify ; cinq produits supplémentaires restent accessibles dans leurs collections secondaires.
- `public/images/products/` : copies locales des images publiques.
- Panier navigateur conservé dans `localStorage`.
- Aucune commande n’est envoyée et aucune donnée personnelle n’est collectée.

Voir les rapports dans `docs/` avant toute publication ou bascule de domaine.
