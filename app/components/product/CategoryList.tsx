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
  return (
    <div className="min-h-0 w-20 shrink-0 bg-white/5">
      <div className="scrollbar-hidden h-full overflow-y-auto pb-20">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`w-full px-2 py-2 text-left text-[10px] transition ${
                isActive ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
