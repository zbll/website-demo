import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureShowcase(): React.ReactElement {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phonePinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const phone = phonePinRef.current;

      if (!section || !phone) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const getPinStartOffset = (): number =>
          Math.max(0, (window.innerHeight - phone.offsetHeight) / 2);
        const getPinEndOffset = (): number =>
          Math.max(0, (window.innerHeight + phone.offsetHeight) / 2);

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: () => `top ${getPinStartOffset()}px`,
          end: () => `bottom ${getPinEndOffset()}px`,
          pin: phone,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        return () => {
          trigger.kill();
        };
      });

      return () => {
        mm.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-16 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
    >
      <div className="space-y-[50vh]">
        <p className="text-sm tracking-[0.35em] text-slate-400 uppercase">Feature Showcase</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">功能展示</h2>
        <p className="max-w-xl text-base text-slate-300">
          这里先用文字占位。之后可以补充产品能力、使用场景或亮点摘要，用于引导用户关注右侧的移动端体验。
        </p>
        <p className="max-w-xl text-sm leading-relaxed text-slate-400">
          进一步补充一段信息，描述移动端体验或关键功能点，为后续的内容铺垫。
        </p>
        <p className="max-w-xl text-sm leading-relaxed text-slate-400">
          这里可以继续写更具体的流程或价值点，强调可视化、响应速度或协作效率等优势。
        </p>
        <p className="max-w-xl text-sm leading-relaxed text-slate-400">
          如果需要引导用户浏览更多内容，可以在此处添加简短提示或关键数字摘要。
        </p>
        <p className="max-w-xl text-sm leading-relaxed text-slate-400">
          也可以写一段更具情绪化的描述，增强用户对移动端场景的想象与代入感。
        </p>
      </div>
      <div
        ref={(node) => {
          phonePinRef.current = node;
        }}
        className="flex items-center justify-center"
      >
        <div className="aspect-[9/19] w-full max-w-[320px] overflow-hidden rounded-[32px] border border-slate-700/60 bg-slate-900 shadow-[0_40px_80px_-50px_rgba(15,23,42,0.9)]">
          <iframe title="mobile-demo" src="/mobile/demo" className="h-full w-full border-0" />
        </div>
      </div>
    </section>
  );
}
