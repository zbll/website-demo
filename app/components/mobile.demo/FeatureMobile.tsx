import { useMemo, useRef, useState } from 'react';
import CategoryList from '../product/CategoryList';
import ProductList from '../product/ProductList';
import FeatureMobileBanners from './FeatureMobileBanners';
import FeatureMobileCartBar from './FeatureMobileCartBar';
import FeatureMobileHeader from './FeatureMobileHeader';
import {
  useCartSummary,
  useProductScrollLock,
  useProductSections,
  useShopProducts,
} from '~/hooks/mobile-demo';
import type { CartItem, ProductItem } from '~/hooks/mobile-demo/types';
import 'swiper/css';

const categoryItems = [
  { id: 'scene', label: '场景' },
  { id: 'device', label: '设备' },
  { id: 'energy', label: '能耗' },
  { id: 'security', label: '安防' },
  { id: 'notice', label: '提醒' },
  { id: 'report', label: '报表' },
  { id: 'assistant', label: '助手' },
  { id: 'schedule', label: '日程' },
  { id: 'camera', label: '摄像' },
  { id: 'network', label: '网络' },
  { id: 'family', label: '成员' },
  { id: 'access', label: '权限' },
];

const chunkSize = 8;
const categorySlides = Array.from(
  { length: Math.ceil(categoryItems.length / chunkSize) },
  (_, index) => categoryItems.slice(index * chunkSize, index * chunkSize + chunkSize)
);

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
  const sides = useMemo(
    () =>
      categorySlides.map((items, slideIndex) => {
        const placeholders = Array.from(
          { length: Math.max(0, chunkSize - items.length) },
          () => null
        );
        const slots = [...items, ...placeholders];

        return (
          <div
            key={items[0]?.id ?? `category-slide-${slideIndex}`}
            className="grid h-full w-full grid-cols-4 content-start items-start gap-2"
          >
            {slots.map((item, index) =>
              item ? (
                <button
                  key={item.id}
                  type="button"
                  className="flex flex-col items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 py-2 text-[10px] text-slate-200 transition hover:bg-white/10"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-slate-200/20 via-slate-100/5 to-white/15 text-[11px] font-semibold text-white">
                    {item.label.slice(0, 1)}
                  </span>
                  <span className="text-[10px] text-slate-300">{item.label}</span>
                </button>
              ) : (
                <div
                  key={`category-placeholder-${slideIndex}-${index}`}
                  aria-hidden="true"
                  className="flex flex-col items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 py-2 text-[10px] text-slate-200 opacity-0"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-slate-200/20 via-slate-100/5 to-white/15 text-[11px] font-semibold text-white">
                    占
                  </span>
                  <span className="text-[10px] text-slate-300">占位</span>
                </div>
              )
            )}
          </div>
        );
      }),
    []
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
    <div ref={rootRef} className="w-full bg-slate-900">
      <div className="flex flex-col">
        <FeatureMobileHeader />
        <FeatureMobileBanners sides={sides} />
        <div className="pt-4">
          <div className="relative flex h-[100dvh] min-h-0 w-full bg-white/5">
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
