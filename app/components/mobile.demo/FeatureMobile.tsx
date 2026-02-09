import { useMemo, useRef, useState } from 'react';
import CategoryList from '../product/CategoryList';
import ProductList from '../product/ProductList';
import FeatureMobileCartBar from './FeatureMobileCartBar';
import FeatureMobileCategorySides from './FeatureMobileCategorySides';
import FeatureMobileHeader from './FeatureMobileHeader';
import {
  useCartSummary,
  useProductScrollLock,
  useProductSections,
  useShopProducts,
} from '~/hooks/mobile-demo';
import type { CartItem, ProductItem } from '~/hooks/mobile-demo/types';
import 'swiper/css';

const shopCategories = [
  '推荐',
  '秋冬热卖',
  '早餐热食',
  '牛奶酸奶',
  '卤味鲜食',
  '矿泉苏打',
  '雪糕冻品',
  '面包饼干',
  '轻食代餐',
  '小包零食',
  '方便速食',
  '膨化食品',
  '坚果果干',
  '辣卤肉食',
  '辣条素食',
  '网红零食',
  '糖巧果冻',
  '粮油调料',
  '茶饮冲调',
  '果蔬生鲜',
  '烘焙专区',
  '生活用纸',
  '家庭清洁',
  '蓝月亮区',
  '个人洗护',
].map((label, index) => ({ id: `category-${index}`, label }));

export default function FeatureMobile(): React.ReactElement {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const productListRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const shopProducts = useShopProducts(shopCategories);
  const productSections = useProductSections(shopProducts, shopCategories);
  const [activeCategoryId, setActiveCategoryId] = useState(shopCategories[0]?.id ?? '');
  const canScrollProducts = useProductScrollLock(rootRef);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { totalCount, totalPrice } = useCartSummary(cartItems);
  const cartCountMap = useMemo(
    () =>
      cartItems.reduce<Record<string, number>>((acc, item) => {
        acc[item.product.id] = item.count;
        return acc;
      }, {}),
    [cartItems]
  );
  const handleSelectCategory = (categoryId: string): void => {
    setActiveCategoryId(categoryId);
    const target = sectionRefs.current.get(categoryId);
    const container = productListRef.current;
    if (!target || !container) {
      return;
    }
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const handleAddProduct = (product: ProductItem): void => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);
      if (index === -1) {
        return [...prev, { product, count: 1 }];
      }
      const next = [...prev];
      const current = next[index];
      next[index] = { ...current, count: current.count + 1 };
      return next;
    });
  };
  const handleRemoveProduct = (productId: string): void => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.product.id === productId);
      if (index === -1) {
        return prev;
      }
      const current = prev[index];
      if (current.count <= 1) {
        return prev.filter((item) => item.product.id !== productId);
      }
      const next = [...prev];
      next[index] = { ...current, count: current.count - 1 };
      return next;
    });
  };

  return (
    <div ref={rootRef} className="h-full w-full">
      <div className="flex h-full flex-col">
        <FeatureMobileHeader />
        <div className="pb-4">
          <FeatureMobileCategorySides />
        </div>
        <div className="h-full">
          <div className="relative flex h-full min-h-0 w-full bg-white/5">
            <CategoryList
              categories={shopCategories}
              activeCategoryId={activeCategoryId}
              onSelect={handleSelectCategory}
            />
            <ProductList
              sections={productSections}
              canScroll={canScrollProducts}
              activeCategoryId={activeCategoryId}
              onActiveCategoryChange={setActiveCategoryId}
              containerRef={productListRef}
              sectionRefs={sectionRefs}
              cartCounts={cartCountMap}
              onAdd={handleAddProduct}
              onRemove={handleRemoveProduct}
            />
            <FeatureMobileCartBar totalCount={totalCount} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
