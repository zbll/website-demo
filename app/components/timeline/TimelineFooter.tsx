import { useInView } from '~/hooks/useInView';
import { cn } from '~/utils/utils';

export default function TimelineFooter(): React.ReactElement {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="relative -mt-2 flex flex-col items-start pl-10 text-left md:items-center md:pl-0 md:text-center"
    >
      <span
        className={cn(
          'absolute top-0 left-4 h-10 w-px origin-top -translate-x-1/2 bg-slate-700 transition-transform duration-700 md:left-1/2',
          isVisible ? 'scale-y-100' : 'scale-y-0'
        )}
      />
      <span
        className={cn(
          'absolute top-8 left-4 z-20 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-300/70 bg-slate-950 transition-all duration-500 md:left-1/2',
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
      />
      <div
        className={cn(
          'relative z-10 pt-4 transition-all duration-700 md:self-center md:pt-12',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        )}
      >
        <div className="inline-block rounded-full bg-slate-950/90 px-3 py-1.5">
          <p className="text-xs tracking-[0.35em] text-cyan-200/80 uppercase">Still In Progress</p>
          <p className="mt-1 text-sm text-slate-400">仍在继续...</p>
        </div>
      </div>
    </div>
  );
}
