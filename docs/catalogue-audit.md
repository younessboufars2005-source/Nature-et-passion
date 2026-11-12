# Audit du catalogue

Source retenue : endpoint public `/collections/tous-nos-produits/products.json?limit=250`, consulté le 11 novembre 2026.

- Produits identifiés sur la collection publique : **66**.
- Produits uniques récupérés : **71**.
- Produits dans « Tous nos produits » : **66**.
- Variantes récupérées : **110**.
- Références d’images produit : **190**.
- Devise : MAD.
- L’endpoint global retournait 71 entrées ; les cinq entrées absentes de la collection publique n’ont pas été ajoutées au catalogue affiché.
- Les prix de chaque variante sont conservés séparément ; aucun prix minimum de collection n’a été recopié sur les variantes.

## Associations aux collections

Les associations ne sont plus déduites des noms. Elles proviennent des endpoints publics `/collections/{handle}/products.json?limit=250`, récupérés le 11 novembre 2026, et sont enregistrées dans `src/data/collections.json`. L'ordre des identifiants suit l'ordre public Shopify.

| Collection locale | Endpoint public | Produits intégrés parmi les 66 |
| --- | ---: | ---: |
| Tous nos produits | 66 | 66 |
| Miels et autres produits de la ruche | 19 | 19 |
| Produits du terroir | 8 | 8 |
| Préparations | 11 | 11 |
| Figues | 5 | 5 |
| Healthy Box | 7 | 7 |
| Plaisirs sains et chocolats | 6 | 6 |
| Accessoires | 10 | 10 |
| Idées Cadeaux | 12 | 12 |

Les cinq produits présents uniquement dans des collections secondaires ont été ajoutés après vérification de leurs fiches publiques : Pack Radaman 2, Pack Ramadan 3, Pack Ramadan 1, Miel de tamaris et Tablettes chocolat 75% de cacao. Ils ne sont pas ajoutés artificiellement à « Tous nos produits ».

## Limites

- Un export Shopify administrateur reste recommandé pour expliquer pourquoi cinq produits sont publiés dans des collections secondaires mais pas dans « Tous nos produits ».
- Les titres/descriptions SEO spécifiques non exposés par l’endpoint public doivent être contrôlés dans Shopify.
- Les allégations thérapeutiques présentes dans les descriptions migrées doivent être validées par le client avant publication.
