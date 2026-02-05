import type { RefObject } from 'react';
import { useEffect } from 'react';
import QuantityControl from './QuantityControl';
import type { ProductItem } from '~/hooks/mobile-demo/types';
import { cn } from '~/utils/utils';

type ProductListProps = {
  sections: {
    categoryId: string;
    categoryLabel: string;
    items: ProductItem[];
  }[];
  canScroll: boolean;
  activeCategoryId: string;
  onActiveCategoryChange: (categoryId: string) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  sectionRefs: RefObject<Map<string, HTMLDivElement | null>>;
  cartCounts: Record<string, number>;
  onAdd: (product: ProductItem) => void;
  onRemove: (productId: string) => void;
};

export default function ProductList({
  sections,
  canScroll,
  activeCategoryId,
  onActiveCategoryChange,
  containerRef,
  sectionRefs,
  cartCounts,
  onAdd,
  onRemove,
}: ProductListProps): React.ReactElement {
  useEffect(() => {
    if (sections.length === 0) {
      return;
    }
    onActiveCategoryChange(sections[0].categoryId);
  }, [onActiveCategoryChange, sections]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let nextCategoryId = '';

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const target = entry.target as HTMLElement;
          const categoryId = target.dataset.categoryId;
          if (!categoryId) {
            continue;
          }
          if (entry.isIntersecting) {
            nextCategoryId = categoryId;
          }
        }

        if (nextCategoryId && nextCategoryId !== activeCategoryId) {
          onActiveCategoryChange(nextCategoryId);
        }
      },
      {
        root: container,
        threshold: [0, 1],
      }
    );

    sections.forEach((section) => {
      const node = sectionRefs.current.get(section.categoryId);
      if (node) {
        observer.observe(node);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeCategoryId, containerRef, onActiveCategoryChange, sections, sectionRefs]);

  return (
    <div className="min-h-0 flex-1 bg-white/5">
      <div
        ref={containerRef}
        className={cn(
          'scrollbar-hidden h-full min-h-0 p-3 pb-20',
          canScroll ? 'overflow-y-auto' : 'overflow-hidden'
        )}
      >
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <div key={section.categoryId} className="flex flex-col gap-3">
              <div
                ref={(node) => {
                  if (node) {
                    sectionRefs.current.set(section.categoryId, node);
                  } else {
                    sectionRefs.current.delete(section.categoryId);
                  }
                }}
                data-category-id={section.categoryId}
              />
              <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/95 px-2 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white/90 backdrop-blur">
                {section.categoryLabel}
              </div>
              {section.items.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-md border-b border-white/10 bg-white/5 px-2 py-3"
                >
                  <div className="h-18 w-18 shrink-0 overflow-hidden rounded-md bg-white/10">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="text-[12px] leading-4 font-semibold text-slate-100">
                      {product.name}
                    </div>
                    <div className="text-[14px] font-semibold text-rose-300">
                      ¥{product.price.toFixed(1)}
                    </div>
                  </div>
                  <QuantityControl
                    count={cartCounts[product.id] ?? 0}
                    onAdd={() => onAdd(product)}
                    onRemove={() => onRemove(product.id)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
