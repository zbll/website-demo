import { FiMinus, FiPlus } from 'react-icons/fi';

type QuantityControlProps = {
  count: number;
  onAdd: () => void;
  onRemove: () => void;
};

export default function QuantityControl({
  count,
  onAdd,
  onRemove,
}: QuantityControlProps): React.ReactElement {
  const handleAdd = (event: React.PointerEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onAdd();
  };

  const handleRemove = (event: React.PointerEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onRemove();
  };

  return (
    <div className="flex items-center gap-1">
      {count > 0 ? (
        <>
          <button
            type="button"
            aria-label="减少商品"
            onPointerDown={handleRemove}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[14px] text-white/90"
          >
            <FiMinus className="h-3 w-3" />
          </button>
          <span className="min-w-[18px] text-center text-[11px] text-white/80">{count}</span>
        </>
      ) : null}
      <button
        type="button"
        aria-label="增加商品"
        onPointerDown={handleAdd}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[14px] text-white/90"
      >
        <FiPlus className="h-3 w-3" />
      </button>
    </div>
  );
}
