import { FiShoppingCart } from 'react-icons/fi';

type FeatureMobileCartBarProps = {
  totalCount: number;
  totalPrice: number;
};

export default function FeatureMobileCartBar({
  totalCount,
  totalPrice,
}: FeatureMobileCartBarProps): React.ReactElement {
  return (
    <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-30 px-3 pb-3">
      <div className="pointer-events-auto flex h-14 items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/95 px-3 text-[11px] text-slate-100 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.8)]">
        <div className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <FiShoppingCart className="h-5 w-5 text-white/90" />
            {totalCount > 0 ? (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-400 px-1 text-[9px] font-semibold text-white">
                {totalCount}
              </span>
            ) : null}
          </div>
          <div className="text-[10px] text-slate-300">购物车</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-400">合计</div>
          <div className="text-[13px] font-semibold text-rose-300">¥{totalPrice.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
}
