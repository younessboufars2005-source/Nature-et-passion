import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targetIds = new Set(['8224111886647', '8224112705847', '8224109461815', '8056380784951', '8056383602999']);
const cataloguePath = path.join(root, 'src/data/products.json');
const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf8'));
const source = JSON.parse(fs.readFileSync(path.join(root, 'shopify-product-source/products.json'), 'utf8')).products;
const existingIds = new Set(catalogue.map((product) => product.id));
const safe = (value) => value.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').slice(-150);

function migrateProduct(product) {
  return {
    id: String(product.id),
    name: product.title,
    slug: product.handle,
    url: `/products/${product.handle}`,
    originalUrl: `https://natureetpassions.net/products/${product.handle}`,
    descriptionHtml: product.body_html || '',
    vendor: product.vendor || '',
    productType: product.product_type || '',
    tags: Array.isArray(product.tags) ? product.tags : [],
    currency: 'MAD',
    available: product.variants.some((variant) => variant.available),
    featured: false,
    variants: product.variants.map((variant) => ({
      id: String(variant.id),
      title: variant.title,
      price: Number(variant.price),
      compareAtPrice: variant.compare_at_price ? Number(variant.compare_at_price) : null,
      available: Boolean(variant.available),
      option1: variant.option1,
      option2: variant.option2,
      option3: variant.option3,
      sku: variant.sku || '',
      grams: variant.grams || 0
    })),
    images: product.images.map((image) => ({
      id: String(image.id),
      alt: image.alt || product.title,
      width: image.width,
      height: image.height,
      originalUrl: image.src,
      local: `/images/products/${product.handle}/${safe(new URL(image.src).pathname.split('/').pop())}`
    })),
    seo: {
      title: product.title,
      description: (product.body_html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)
    },
    publishedAt: product.published_at,
    updatedAt: product.updated_at
  };
}

const verifiedSourceProducts = source.filter((product) => targetIds.has(String(product.id)));
if (verifiedSourceProducts.length !== targetIds.size) throw new Error(`Produits vérifiés attendus: ${targetIds.size}; trouvés: ${verifiedSourceProducts.length}`);
const additions = verifiedSourceProducts.filter((product) => !existingIds.has(String(product.id))).map(migrateProduct);
catalogue.push(...additions);
if (new Set(catalogue.map((product) => product.id)).size !== catalogue.length) throw new Error('Identifiants produit dupliqués après fusion');
fs.writeFileSync(cataloguePath, `${JSON.stringify(catalogue, null, 2)}\n`);
console.log({ before: catalogue.length - additions.length, added: additions.length, total: catalogue.length, handles: additions.map((product) => product.slug) });
