'use client'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTIONS = ['hero', 'about', 'work', 'journey', 'contact']

export function NavDots() {
  const activeSection = useActiveSection()

  const activeIndex = SECTIONS.indexOf(activeSection)
  const displayIndex = activeIndex >= 0 ? activeIndex : 0

  const scrollTo = (id: string) => {
    if (window.lenis) {
      window.lenis.scrollTo(`#${id}`, { duration: 1.2 })
    } else {
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="nav-dots">
      <span className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest font-semibold mb-1 select-none">
        {String(displayIndex).padStart(2, '0')}
      </span>
      {SECTIONS.map((section) => (
        <button
          key={section}
          className={`nav-dot ${activeSection === section ? 'active' : ''}`}
          onClick={() => scrollTo(section)}
          aria-label={`Scroll to ${section}`}
        />
      ))}
    </div>
  )
}
