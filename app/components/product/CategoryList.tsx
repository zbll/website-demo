import { useEffect, useRef } from 'react';
import CategoryListItem from './CategoryListItem';

type CategoryItem = {
  id: string;
  label: string;
};

type CategoryListProps = {
  categories: CategoryItem[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
};

export default function CategoryList({
  categories,
  activeCategoryId,
  onSelect,
}: CategoryListProps): React.ReactElement {
  const categoryRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  useEffect(() => {
    const target = itemRefs.current.get(activeCategoryId);
    if (!target) {
      return;
    }
    if (!categoryRef.current) {
      return;
    }
    categoryRef.current.scrollTop = target.offsetTop;
  }, [activeCategoryId]);

  return (
    <div className="min-h-0 w-20 shrink-0 bg-white/5">
      <div className="scrollbar-hidden h-full overflow-y-auto pb-20" ref={categoryRef}>
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          return (
            <CategoryListItem
              key={category.id}
              id={category.id}
              label={category.label}
              isActive={isActive}
              onSelect={onSelect}
              itemRef={(node) => {
                if (node) {
                  itemRefs.current.set(category.id, node);
                } else {
                  itemRefs.current.delete(category.id);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
