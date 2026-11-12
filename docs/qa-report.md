# Rapport de contrôle qualité

## Automatisé

- Validation TypeScript/Astro : à exécuter par `npm run build`.
- Génération statique de toutes les routes produits et collections.
- Prix et variantes lus directement depuis `src/data/products.json`.
- Panier localStorage : ajout, modification de quantité, suppression et sous-total.
- Bouton de finalisation désactivé.

## Limites de la session

Le service de navigateur automatisé était indisponible. Les contrôles visuels et interactions réelles aux sept largeurs demandées doivent donc être réalisés avant publication. Aucun déploiement n’a été effectué.
