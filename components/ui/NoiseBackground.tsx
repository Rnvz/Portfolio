export function NoiseBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none noise-overlay">
      <div className="orb orb-jade" />
      <div className="orb orb-warm" />
    </div>
  )
}
