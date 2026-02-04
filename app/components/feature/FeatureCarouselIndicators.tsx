import { cn } from '~/utils/utils';
import type { CarouselIndicatorProps } from '../carousel/CarouselIndicators';

export default function FeatureCarouselIndicators({
  count,
  activeIndex,
  onSelect,
  className = '',
}: CarouselIndicatorProps): React.ReactElement {
  return (
    <div
      className={cn(
        'pointer-events-auto absolute top-3 right-3 z-10 flex items-center gap-1.5',
        'rounded-full border border-white/10 bg-slate-900/70 px-2 py-1 backdrop-blur',
        className
      )}
      role="tablist"
      aria-label="Feature carousel indicators"
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={`feature-indicator-${index}`}
          type="button"
          className={cn(
            'h-1.5 w-1.5 rounded-full transition-all duration-200',
            index === activeIndex
              ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]'
              : 'bg-white/40'
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
