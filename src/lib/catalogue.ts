import data from '../data/products.json';
import collectionData from '../data/collections.json';
import type { Product } from '../types/catalogue';

export const products = data as Product[];
export const money = (value: number) => `Dh ${value.toFixed(2)} MAD`;
export const minPrice = (product: Product) => Math.min(...product.variants.map((variant) => variant.price));
export const isFrom = (product: Product) => new Set(product.variants.map((variant) => variant.price)).size > 1;

export const collectionRecords = collectionData;
export const collections = collectionRecords.map((collection) => [collection.slug, collection.title] as const);

export function collectionProducts(slug: string): Product[] {
  const collection = collectionRecords.find((entry) => entry.slug === slug);
  if (!collection) return [];
  const productsById = new Map(products.map((product) => [product.id, product]));
  return collection.productIds.flatMap((id) => {
    const product = productsById.get(id);
    return product ? [product] : [];
  });
}
