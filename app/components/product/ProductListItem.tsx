import QuantityControl from './QuantityControl';
import type { ProductItem } from '~/hooks/mobile-demo/types';

type ProductListItemProps = {
  product: ProductItem;
  count: number;
  onAdd: (product: ProductItem) => void;
  onRemove: (productId: string) => void;
};

export default function ProductListItem({
  product,
  count,
  onAdd,
  onRemove,
}: ProductListItemProps): React.ReactElement {
  return (
    <div className="flex items-start gap-3 rounded-md border-b border-white/10 bg-white/5 px-2 py-3">
      <div className="h-18 w-18 shrink-0 overflow-hidden rounded-md bg-white/10">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="text-[12px] leading-4 font-semibold text-slate-100">{product.name}</div>
          <div className="text-[14px] font-semibold text-rose-300">¥{product.price.toFixed(1)}</div>
        </div>
        <div className="self-end">
          <QuantityControl
            count={count}
            onAdd={() => onAdd(product)}
            onRemove={() => onRemove(product.id)}
          />
        </div>
      </div>
    </div>
  );
}
