import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { cn } from '~/utils/utils';
import type { CarouselNavigationProps } from '../carousel/CarouselNavigation';

export default function FeatureCarouselNavigation({
  prevRef,
  nextRef,
  className = '',
}: CarouselNavigationProps): React.ReactElement {
  return (
    <>
      <button
        ref={prevRef}
        type="button"
        aria-label="Previous slide"
        className={cn(
          'absolute bottom-3 left-3 z-10 flex h-7 w-7 items-center justify-center',
          'rounded-full border border-white/15 bg-slate-950/60 text-white/80',
          'backdrop-blur transition-colors hover:border-white/30 hover:text-white',
          className
        )}
      >
        <HiChevronLeft className="text-base" aria-hidden="true" />
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label="Next slide"
        className={cn(
          'absolute bottom-3 left-12 z-10 flex h-7 w-7 items-center justify-center',
          'rounded-full border border-white/15 bg-slate-950/60 text-white/80',
          'backdrop-blur transition-colors hover:border-white/30 hover:text-white',
          className
        )}
      >
        <HiChevronRight className="text-base" aria-hidden="true" />
      </button>
    </>
  );
}
