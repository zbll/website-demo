import type { Route } from './+types/home';
import Carousel from '../components/Carousel';
import Timeline from '../components/timeline/Timeline';
import FeatureIntro from '../components/feature/FeatureIntro';
import FeatureShowcase from '../components/feature/FeatureShowcase';

export function meta(_args: Route.MetaArgs): Route.MetaDescriptors {
  // 页面级元信息，用于 SEO 与预览。
  return [
    { title: 'Swiper Carousel Demo' },
    { name: 'description', content: 'A centered Swiper carousel with random images.' },
  ];
}

export default function Home(): React.ReactElement {
  return (
    <main className="min-h-screen overflow-x-hidden py-12 text-white">
      <section className="mx-auto w-full max-w-300">
        <header className="mb-8 space-y-2">
          <p className="text-sm tracking-[0.35em] text-slate-400 uppercase">Swiper Showcase</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">焦点轮播图</h1>
          <p className="max-w-2xl text-base text-slate-300">
            在桌面端居中显示，最大宽度 1200。每次进入页面会随机挑选 3 张图片。
          </p>
        </header>
        <Carousel loop />
        <Timeline />
        <FeatureIntro />
        <FeatureShowcase />
        {Array.from({ length: 50 }).map((_, val) => (
          <div key={val}>{val}</div>
        ))}
      </section>
    </main>
  );
}
