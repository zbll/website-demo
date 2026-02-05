import { useMemo } from 'react';
import type { ShopCategory, ShopSection } from './types';

const productTotalCount = 500;

function createSeededRandom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) / 4294967296;
  };
}

export default function useShopProducts(shopCategories: ShopCategory[]): ShopSection[] {
  return useMemo(() => {
    const rng = createSeededRandom(`${shopCategories.length}-${productTotalCount}`);
    const categoryCount = shopCategories.length;
    const counts = Array.from({ length: categoryCount }, () => 0);
    const fixedIndex = Math.floor(rng() * categoryCount);
    counts[fixedIndex] = 1;
    let remaining = Math.max(0, productTotalCount - 1);

    while (remaining > 0) {
      let randomIndex = Math.floor(rng() * (categoryCount - 1));
      if (randomIndex >= fixedIndex) {
        randomIndex += 1;
      }
      counts[randomIndex] += 1;
      remaining -= 1;
    }

    return shopCategories.map((category, index) => ({
      categoryId: category.id,
      items: Array.from({ length: counts[index] }, (_, itemIndex) => ({
        id: `${category.id}-product-${itemIndex + 1}`,
        name: `${category.label}商品${itemIndex + 1}`,
        price: 3.5 + index * 0.2 + itemIndex * 0.8,
        image: `https://picsum.photos/seed/${category.id}-${itemIndex + 1}/120/120`,
      })),
    }));
  }, [shopCategories]);
}
