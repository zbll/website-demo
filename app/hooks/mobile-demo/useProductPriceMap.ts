import { useMemo } from 'react';
import type { ShopSection } from './types';

export default function useProductPriceMap(shopProducts: ShopSection[]): Map<string, number> {
  return useMemo(() => {
    const map = new Map<string, number>();
    shopProducts.forEach((section) => {
      section.items.forEach((item) => {
        map.set(item.id, item.price);
      });
    });
    return map;
  }, [shopProducts]);
}
