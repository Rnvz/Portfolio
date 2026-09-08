'use client'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTIONS = ['hero', 'about', 'work', 'journey', 'contact']

export function NavDots() {
  const activeSection = useActiveSection()

  const scrollTo = (id: string) => {
    if (window.lenis) {
      window.lenis.scrollTo(`#${id}`, { duration: 1.2 })
    } else {
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="nav-dots">
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
