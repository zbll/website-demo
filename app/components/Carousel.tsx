import { useEffect, useMemo, useRef, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { cn } from '~/utils/utils';
import CarouselIndicators, { type CarouselIndicatorProps } from './carousel/CarouselIndicators';
import CarouselNavigation, { type CarouselNavigationProps } from './carousel/CarouselNavigation';
import CarouselDefaultSlide from './carousel/CarouselDefaultSlide';

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
  /** 自定义轮播内容，传入后将忽略默认图片轮播。 */
  slides?: React.ReactNode[];
  /** 默认图片数组。 */
  images?: string[];
  /** 默认图片随机展示数量。 */
  randomCount?: number;
  /** 容器自定义 className。 */
  className?: string;
  /** 轮播区域高度 className。 */
  heightClassName?: string;
  /** 指示器组件。 */
  Indicator?: React.ComponentType<CarouselIndicatorProps>;
  /** 指示器额外 className。 */
  indicatorClassName?: string;
  /** 导航组件。 */
  NavigationSlot?: React.ComponentType<CarouselNavigationProps>;
  /** 导航组件额外 className。 */
  navigationClassName?: string;
  /** 是否自动播放。 */
  autoplay?: boolean;
  /** 是否循环。 */
  loop?: boolean;
  /** 是否显示边框。 */
  showBorder?: boolean;
  /** 是否显示背景。 */
  showBackground?: boolean;
  /** 是否显示阴影。 */
  showShadow?: boolean;
  /** 幻灯片之间的间距（px）。 */
  spaceBetween?: number;
  /** 是否嵌套在其它 Swiper 内部。 */
  nested?: boolean;
  /** 触发滑动的最小拖动距离（px）。 */
  threshold?: number;
  /** 是否在触摸开始时阻止默认事件。 */
  touchStartPreventDefault?: boolean;
};

/**
 * 通用轮播组件。
 * - 默认展示图片轮播，可通过 `slides` 传入自定义内容。
 * - 支持自定义指示器与导航组件。
 * - 可配置自动播放、循环、间距与基础样式开关。
 */
export default function Carousel({
  slides,
  images = defaultImages,
  randomCount = 3,
  className = '',
  heightClassName = 'h-[280px] sm:h-[420px]',
  Indicator = CarouselIndicators,
  indicatorClassName = '',
  NavigationSlot = CarouselNavigation,
  navigationClassName = '',
  autoplay = true,
  loop = false,
  showBorder = true,
  showBackground = true,
  showShadow = true,
  spaceBetween = 0,
  nested = false,
  threshold = 5,
  touchStartPreventDefault = true,
}: CarouselProps): React.ReactElement {
  const autoplayDelay = 3500;
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<import('swiper').Swiper | null>(null);
  const hasCustomSlides = Boolean(slides && slides.length > 0);
  const allImages = useMemo(() => images, [images]);
  const [visibleImages, setVisibleImages] = useState<string[]>(() =>
    allImages.slice(0, randomCount)
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (hasCustomSlides) {
      return;
    }
    // 每次进入页面随机打散，取最新的图片子集。
    const shuffled = [...allImages];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setVisibleImages(shuffled.slice(0, randomCount));
  }, [allImages, hasCustomSlides, randomCount]);

  const totalSlides = hasCustomSlides ? (slides ?? []) : visibleImages;
  const slideCount = totalSlides.length;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl',
        showBackground && 'bg-white/5',
        showBorder && 'border border-white/10',
        showShadow && 'shadow-[0_30px_60px_-30px_rgba(15,23,42,0.8)]',
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
        spaceBetween={spaceBetween}
        nested={nested}
        threshold={threshold}
        touchStartPreventDefault={touchStartPreventDefault}
        autoplay={autoplay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
        loop={loop}
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
        {hasCustomSlides
          ? totalSlides.map((slide, index) => (
              <SwiperSlide key={`custom-slide-${index}`}>{slide}</SwiperSlide>
            ))
          : visibleImages.map((src, index) => (
              <SwiperSlide key={`${src}-${index}`}>
                <CarouselDefaultSlide src={src} index={index} />
              </SwiperSlide>
            ))}
      </Swiper>
      <Indicator
        count={slideCount}
        activeIndex={activeIndex}
        autoplayDelay={autoplayDelay}
        className={indicatorClassName}
        onSelect={(index) => swiperRef.current?.slideToLoop(index)}
      />
      <NavigationSlot prevRef={prevRef} nextRef={nextRef} className={navigationClassName} />
    </div>
  );
}
