import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, 'shopify-collection-source');
const definitions = [
  ['tous-nos-produits', 'Tous nos produits', 'tous-nos-produits'],
  ['miels-et-autres-produits-de-la-ruche', 'Miels et autres produits de la ruche', 'miels-et-autres-produits-de-la-ruche-1'],
  ['produits-du-terroir', 'Produits du terroir', 'produits-du-terroir'],
  ['preparations', 'Préparations', 'preparations'],
  ['figues', 'Figues', 'figues'],
  ['healthy-box', 'Healthy Box', 'healthy-box'],
  ['plaisirs-sains-et-chocolats', 'Plaisirs sains et chocolats', 'plaisirs-sains-et-chocolats'],
  ['accessoires', 'Accessoires', 'accessoires'],
  ['idees-cadeaux', 'Idées Cadeaux', 'idees-cadeaux']
];
const catalogue = JSON.parse(fs.readFileSync(path.join(root, 'src/data/products.json'), 'utf8'));
const catalogueIds = new Set(catalogue.map((product) => product.id));
const collections = definitions.map(([slug, title, sourceHandle]) => {
  const source = JSON.parse(fs.readFileSync(path.join(sourceDir, `${sourceHandle}.json`), 'utf8')).products;
  const sourceIds = source.map((product) => String(product.id));
  const missingProductIds = sourceIds.filter((id) => !catalogueIds.has(id));
  return { slug, title, sourceHandle, sourceUrl: `https://natureetpassions.net/collections/${sourceHandle}`, productIds: sourceIds.filter((id) => catalogueIds.has(id)), publicEndpointCount: sourceIds.length, missingProductIds };
});
fs.writeFileSync(path.join(root, 'src/data/collections.json'), `${JSON.stringify(collections, null, 2)}\n`);
console.log(collections.map(({ slug, publicEndpointCount, productIds, missingProductIds }) => ({ slug, publicEndpointCount, integrated: productIds.length, missing: missingProductIds.length })));
