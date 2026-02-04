import { useInView } from '~/hooks/useInView';
import { cn } from '~/utils/utils';
import type { TimelineItem } from './types';

type TimelineEntryProps = {
  item: TimelineItem;
  index: number;
};

export default function TimelineEntry({ item, index }: TimelineEntryProps): React.ReactElement {
  const { ref, isVisible } = useInView<HTMLLIElement>({ threshold: 0.35 });
  const isLeft = index % 2 === 0;

  return (
    <li ref={ref} className="relative grid gap-6 md:grid-cols-2">
      <span
        className={cn(
          'absolute top-6 left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 ring-4 ring-slate-950 transition-all duration-500 md:left-1/2',
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
      />
      <div
        className={cn(
          isLeft
            ? 'pl-10 md:col-start-1 md:pr-12 md:pl-0 md:text-right'
            : 'pl-10 md:col-start-2 md:pl-12',
          'transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        )}
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.35)]">
          <p className="text-xs tracking-[0.3em] text-slate-400 uppercase">Step {index + 1}</p>
          <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{item.body}</p>
        </div>
      </div>
    </li>
  );
}
