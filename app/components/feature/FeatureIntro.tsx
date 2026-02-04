import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '~/utils/utils';

type FeatureItem = {
  id: string;
  title: string;
  body: string;
  image: string;
};

const featureItems: FeatureItem[] = [
  {
    id: '00',
    title: '全场景提效，释放你的生产力潜能',
    body: 'TRAE 覆盖从编码、调试到测试、重构、部署等多类开发任务，支持代码编写、文档生成、逻辑审查与结构优化，帮助团队减少重复操作，专注核心创新。',
    image: 'https://picsum.photos/seed/trae-00/900/600',
  },
  {
    id: '01',
    title: '支持 AI Coding Agent',
    body: '流畅推动每一步开发。让智能体协助完成任务拆解、代码实现与验证，降低心智负担，加速交付节奏。',
    image: 'https://picsum.photos/seed/trae-01/900/600',
  },
  {
    id: '02',
    title: '兼容双重开发模式',
    body: '自由切换代码编写与自然对话，在灵感、需求与实现之间无缝衔接，保持专注与节奏。',
    image: 'https://picsum.photos/seed/trae-02/900/600',
  },
  {
    id: '03',
    title: '开放智能体生态',
    body: '一切围绕解决问题，模块化扩展能力，轻松对接团队工作流，构建更灵活的智能协作体系。',
    image: 'https://picsum.photos/seed/trae-03/900/600',
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function FeatureIntro(): React.ReactElement {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const section = sectionRef.current;

      if (!track || !viewport || !section) {
        return;
      }

      // 按断点启用/销毁动画，避免在移动端创建多余的 ScrollTrigger。
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // 计算横向滚动距离：轨道总宽度 - 视口宽度。
        // 当轨道不超出视口时，不需要横向滚动。
        const getScrollDistance = (): number => track.scrollWidth - viewport.clientWidth;

        if (getScrollDistance() <= 0) {
          return undefined;
        }

        // 将轨道向左平移到最右端，配合 ScrollTrigger 实现“竖向滚动驱动横向移动”。
        const tween = gsap.to(track, {
          // 使用函数保证在刷新/尺寸变化后取到最新尺寸。
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            // 当功能区顶部到达视口顶部时开始 pin。
            start: 'top top',
            // 滚动距离等于横向需要移动的距离。
            end: () => `+=${getScrollDistance()}`,
            // 固定 section，让用户继续滚动时带动横向位移。
            pin: true,
            // 跟随滚动，不使用过渡缓动。
            scrub: true,
            // 避免 pin 时的跳动。
            anticipatePin: 1,
            // 窗口尺寸变化时重新计算距离。
            invalidateOnRefresh: true,
          },
        });

        // 断点切换时清理动画与 ScrollTrigger。
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      // 组件卸载时清理 matchMedia。
      return () => {
        mm.kill();
      };
    }, sectionRef);

    // 清理 gsap 上下文，避免残留动画/监听。
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="pt-16">
      <section
        ref={sectionRef}
        className="w-full lg:relative lg:right-1/2 lg:left-1/2 lg:-mr-[50vw] lg:-ml-[50vw] lg:h-screen lg:w-screen"
      >
        <div
          ref={viewportRef}
          className="mx-auto h-full w-full max-w-none overflow-hidden px-0 lg:flex lg:px-6"
        >
          <div
            ref={trackRef}
            className={cn(
              'flex w-full flex-col gap-6 px-0 pb-6 lg:px-6',
              'md:grid md:grid-cols-2 md:items-stretch md:gap-6 md:px-4',
              'lg:flex lg:h-full lg:w-max lg:grid-cols-none lg:flex-row lg:items-center lg:gap-10 lg:pr-16 lg:pb-8'
            )}
          >
            <div className="w-full shrink-0 space-y-4 md:col-span-2 md:text-center lg:w-[min(520px,90vw)] lg:pr-6 lg:text-left">
              <p className="text-sm tracking-[0.35em] text-slate-400 uppercase">Trae</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">TRAE为你解锁全新可能</h2>
            </div>
            {featureItems.map((item) => (
              <article
                key={item.title}
                className={cn(
                  'flex w-full flex-col rounded-3xl bg-slate-950/70',
                  'shadow-xl shadow-black/40 backdrop-blur md:min-h-[460px] lg:min-h-[520px] lg:max-w-[420px] lg:min-w-[380px]'
                )}
              >
                <span className="text-sm font-semibold tracking-[0.2em] text-emerald-300">
                  [{item.id}]
                </span>
                <h3 className="mt-4 h-16 text-2xl font-semibold text-white">{item.title}</h3>
                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-56 w-full object-cover"
                  />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-slate-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
