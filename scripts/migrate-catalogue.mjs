import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const raw = JSON.parse(fs.readFileSync(path.join(root, 'collection-products-public.json'), 'utf8')).products;
fs.mkdirSync(path.join(root, 'src/data'), { recursive: true });

const safe = (value) => value.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').slice(-150);
const products = raw.map((p) => ({
  id: String(p.id),
  name: p.title,
  slug: p.handle,
  url: `/products/${p.handle}`,
  originalUrl: `https://natureetpassions.net/products/${p.handle}`,
  descriptionHtml: p.body_html || '',
  vendor: p.vendor || '',
  productType: p.product_type || '',
  tags: Array.isArray(p.tags) ? p.tags : [],
  currency: 'MAD',
  available: p.variants.some((v) => v.available),
  featured: false,
  variants: p.variants.map((v) => ({
    id: String(v.id), title: v.title, price: Number(v.price), compareAtPrice: v.compare_at_price ? Number(v.compare_at_price) : null,
    available: Boolean(v.available), option1: v.option1, option2: v.option2, option3: v.option3, sku: v.sku || '', grams: v.grams || 0
  })),
  images: p.images.map((img) => ({
    id: String(img.id), alt: img.alt || p.title, width: img.width, height: img.height,
    originalUrl: img.src, local: `/images/products/${p.handle}/${safe(new URL(img.src).pathname.split('/').pop())}`
  })),
  seo: { title: p.title, description: (p.body_html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) },
  publishedAt: p.published_at,
  updatedAt: p.updated_at
}));

fs.writeFileSync(path.join(root, 'src/data/products.json'), JSON.stringify(products, null, 2));
console.log(JSON.stringify({ products: products.length, variants: products.reduce((n,p)=>n+p.variants.length,0), images: products.reduce((n,p)=>n+p.images.length,0) }));
