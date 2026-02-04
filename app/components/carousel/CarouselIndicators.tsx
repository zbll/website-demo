import { cn } from '~/utils/utils';

export type CarouselIndicatorProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  autoplayDelay: number;
  className?: string;
};

export default function CarouselIndicators({
  count,
  activeIndex,
  onSelect,
  autoplayDelay,
  className = '',
}: CarouselIndicatorProps): React.ReactElement {
  return (
    <div
      className={cn(
        'pointer-events-auto absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2',
        'items-center gap-2',
        className
      )}
      role="tablist"
      aria-label="Carousel progress"
      style={{ ['--carousel-delay' as string]: `${autoplayDelay}ms` }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={`progress-${index}`}
          type="button"
          className={cn(
            'group relative h-2 overflow-hidden rounded-full bg-white/20',
            'transition-[width] duration-200',
            index === activeIndex ? 'w-12' : 'w-6'
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex}
          onClick={() => onSelect(index)}
        >
          <span
            className={cn(
              'absolute inset-y-0 left-0 w-0 rounded-full bg-white',
              index === activeIndex
                ? 'animate-[carousel-progress_var(--carousel-delay)_linear_forwards]'
                : ''
            )}
          />
        </button>
      ))}
    </div>
  );
}
