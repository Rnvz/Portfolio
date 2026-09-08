import { TimelineEntry } from '@/types'

export function TimelineNode({ entry }: { entry: TimelineEntry }) {
  const isLeft = entry.side === 'left'

  return (
    <div className={`timeline-node relative flex items-center justify-between w-full mb-24 md:mb-32 ${isLeft ? 'flex-row-reverse md:flex-row' : 'flex-row md:flex-row-reverse'}`}>
      
      {/* Spacer for empty side on desktop */}
      <div className="hidden md:block w-1/2" />
      
      {/* Content */}
      <div className={`w-full md:w-1/2 flex flex-col ${isLeft ? 'md:items-end md:text-right pl-12 md:pl-0 md:pr-12' : 'items-start text-left pl-12 md:pl-12'}`}>
        <span className="font-mono text-xs text-[var(--text-dim)] mb-2">{entry.year}</span>
        <h3 className="font-display text-xl text-[var(--text-primary)] font-medium mb-1">{entry.title}</h3>
        <p className="font-body text-sm text-[var(--text-secondary)] font-light">{entry.place}</p>
      </div>

      {/* Node Dot */}
      <div className="node-dot absolute left-0 md:left-1/2 top-0 md:top-1/2 w-[10px] h-[10px] rounded-full bg-[var(--border-mid)] transform md:-translate-x-1/2 md:-translate-y-1/2 -translate-x-[5px] translate-y-1 z-10 scale-0" />
    </div>
  )
}
