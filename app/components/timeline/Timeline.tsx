import TimelineEntry from './TimelineEntry';
import TimelineFooter from './TimelineFooter';
import type { TimelineItem } from './types';
import { useInView } from '~/hooks/useInView';
import { cn } from '~/utils/utils';

const timelineItems: TimelineItem[] = [
  {
    title: 'Phase One',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
  {
    title: 'Phase Two',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus diam.',
  },
  {
    title: 'Phase Three',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi. Nulla quis sem at nibh.',
  },
  {
    title: 'Phase Four',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis ipsum. Praesent mauris.',
  },
  {
    title: 'Phase Five',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus sed augue.',
  },
];

export default function Timeline(): React.ReactElement {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="mt-12">
      <header className="mb-6">
        <p className="text-sm tracking-[0.35em] text-slate-400 uppercase">Timeline</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">项目进度时间线</h2>
      </header>
      <div ref={ref} className="relative">
        <div className="relative pb-6">
          <span
            className={cn(
              // 进入视口时展开时间轴主线。
              'absolute top-0 left-4 h-full w-px origin-top bg-slate-700 transition-transform duration-700 md:left-1/2 md:-translate-x-1/2',
              isVisible ? 'scale-y-100' : 'scale-y-0'
            )}
          />
          <ul className="space-y-10">
            {timelineItems.map((item, index) => (
              <TimelineEntry key={item.title} item={item} index={index} />
            ))}
          </ul>
        </div>
        <TimelineFooter />
      </div>
    </section>
  );
}
