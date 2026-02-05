import Carousel from '~/components/Carousel';
import FeatureCarouselIndicators from '~/components/feature/FeatureCarouselIndicators';
import FeatureCarouselNavigation from '~/components/feature/FeatureCarouselNavigation';

type FeatureMobileBannersProps = {
  sides: React.ReactElement[];
};

export default function FeatureMobileBanners({
  sides,
}: FeatureMobileBannersProps): React.ReactElement {
  return (
    <>
      <div className="px-4 pt-3">
        <Carousel
          heightClassName="h-[170px]"
          className="rounded-2xl border border-white/10 bg-white/5 shadow-none"
          loop
          Indicator={FeatureCarouselIndicators}
          NavigationSlot={FeatureCarouselNavigation}
        />
      </div>
      <div className="px-4 pt-4">
        <Carousel
          spaceBetween={10}
          cssMode
          touchStartPreventDefault={false}
          slides={sides}
          Indicator={undefined}
          NavigationSlot={undefined}
          showBackground={false}
          showBorder={false}
          showShadow={false}
        />
      </div>
    </>
  );
}
