import { useEffect, useMemo, useRef, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { cn } from '~/utils/utils';

const defaultImages = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=80',
];

type CarouselProps = {
  images?: string[];
  randomCount?: number;
  className?: string;
  heightClassName?: string;
};

export default function Carousel({
  images = defaultImages,
  randomCount = 3,
  className = '',
  heightClassName = 'h-[280px] sm:h-[420px]',
}: CarouselProps): React.ReactElement {
  const autoplayDelay = 3500;
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<import('swiper').Swiper | null>(null);
  const allImages = useMemo(() => images, [images]);
  const [visibleImages, setVisibleImages] = useState<string[]>(() =>
    allImages.slice(0, randomCount)
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // 每次进入页面随机打散，取最新的图片子集。
    const shuffled = [...allImages];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setVisibleImages(shuffled.slice(0, randomCount));
  }, [allImages, randomCount]);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5',
        'shadow-[0_30px_60px_-30px_rgba(15,23,42,0.8)]',
        className
      )}
      style={{ ['--carousel-delay' as string]: `${autoplayDelay}ms` }}
    >
      <style>{`
        @keyframes carousel-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Swiper 需要在初始化前绑定导航按钮的 DOM 节点。
          const baseNavigation =
            typeof swiper.params.navigation === 'object' && swiper.params.navigation !== null
              ? swiper.params.navigation
              : {};
          swiper.params.navigation = {
            ...baseNavigation,
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          };
        }}
        className={cn(heightClassName)}
      >
        {visibleImages.map((src, index) => (
          <SwiperSlide key={`${src}-${index}`}>
            <div className="relative h-full w-full">
              <img
                src={src}
                alt={`carousel-${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={cn(
          'pointer-events-auto absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2',
          'items-center gap-2'
        )}
        role="tablist"
        aria-label="Carousel progress"
      >
        {visibleImages.map((_, index) => (
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
            onClick={() => swiperRef.current?.slideToLoop(index)}
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
      <button
        ref={prevRef}
        type="button"
        aria-label="Previous slide"
        className={cn(
          'pointer-events-none absolute top-1/2 left-5 z-10 flex h-11 w-11 -translate-y-1/2',
          'cursor-pointer items-center justify-center rounded-full border border-white/20',
          'bg-black/35 text-white opacity-0 backdrop-blur transition-all duration-200',
          'hover:border-white/40 hover:bg-black/60',
          'group-hover:pointer-events-auto group-hover:translate-x-2.5 group-hover:opacity-100'
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
          'group-hover:pointer-events-auto group-hover:-translate-x-2.5 group-hover:opacity-100'
        )}
      >
        <HiChevronRight className={cn('text-2xl leading-none')} aria-hidden="true" />
      </button>
    </div>
  );
}
