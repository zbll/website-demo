type CategoryListItemProps = {
  id: string;
  label: string;
  isActive: boolean;
  onSelect: (categoryId: string) => void;
  itemRef: (node: HTMLButtonElement | null) => void;
};

export default function CategoryListItem({
  id,
  label,
  isActive,
  onSelect,
  itemRef,
}: CategoryListItemProps): React.ReactElement {
  return (
    <button
      type="button"
      ref={itemRef}
      onClick={() => onSelect(id)}
      className={`w-full px-2 py-2 text-left text-[10px] transition ${
        isActive ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
}
