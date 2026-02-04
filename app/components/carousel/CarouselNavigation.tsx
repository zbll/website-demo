import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { cn } from '~/utils/utils';

export type CarouselNavigationProps = {
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  className?: string;
};

export default function CarouselNavigation({
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
          'pointer-events-none absolute top-1/2 left-5 z-10 flex h-11 w-11 -translate-y-1/2',
          'cursor-pointer items-center justify-center rounded-full border border-white/20',
          'bg-black/35 text-white opacity-0 backdrop-blur transition-all duration-200',
          'hover:border-white/40 hover:bg-black/60',
          'group-hover:pointer-events-auto group-hover:translate-x-2.5 group-hover:opacity-100',
          className
        )}
      >
        <HiChevronLeft className={cn('text-2xl leading-none')} aria-hidden="true" />
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label="Next slide"
        className={cn(
          'pointer-events-none absolute top-1/2 right-5 z-10 flex h-11 w-11 -translate-y-1/2',
          'cursor-pointer items-center justify-center rounded-full border border-white/20',
          'bg-black/35 text-white opacity-0 backdrop-blur transition-all duration-200',
          'hover:border-white/40 hover:bg-black/60',
          'group-hover:pointer-events-auto group-hover:-translate-x-2.5 group-hover:opacity-100',
          className
        )}
      >
        <HiChevronRight className={cn('text-2xl leading-none')} aria-hidden="true" />
      </button>
    </>
  );
}
