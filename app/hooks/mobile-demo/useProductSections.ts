import { useMemo } from 'react';
import type { ProductSection, ShopCategory, ShopSection } from './types';

export default function useProductSections(
  shopProducts: ShopSection[],
  shopCategories: ShopCategory[]
): ProductSection[] {
  return useMemo(
    () =>
      shopProducts.map((section, index) => ({
        categoryId: section.categoryId,
        categoryLabel: shopCategories[index]?.label ?? '',
        items: section.items,
      })),
    [shopProducts, shopCategories]
  );
}
