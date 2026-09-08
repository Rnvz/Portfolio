interface SectionLabelProps {
  text: string
  accent?: 'warm' | 'cool'
}

export function SectionLabel({ text, accent = 'cool' }: SectionLabelProps) {
  return (
    <span
      className="font-mono text-xs tracking-widest uppercase block mb-8"
      style={{ color: accent === 'warm' ? 'var(--accent-warm)' : 'var(--accent-cool)' }}
    >
      {text}
    </span>
  )
}
