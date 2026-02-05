import { useMemo } from 'react';
import FeatureMobileBanners from './FeatureMobileBanners';

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

export default function FeatureMobileCategorySides(): React.ReactElement {
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

  return <FeatureMobileBanners sides={sides} />;
}
