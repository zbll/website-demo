import type { RefObject } from 'react';
import { useEffect } from 'react';
import ProductListItem from './ProductListItem';
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
                <ProductListItem
                  key={product.id}
                  product={product}
                  count={cartCounts[product.id] ?? 0}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
