export function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="font-mono text-[0.7rem] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--border-mid)] hover:text-[var(--text-secondary)] transition-colors whitespace-nowrap">
      {tech}
    </span>
  )
}
