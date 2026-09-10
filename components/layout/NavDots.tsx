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
    <div className="fixed right-[var(--section-px)] top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50">
      <div className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest font-semibold mb-2">
        {String(displayIndex).padStart(2, '0')}
      </div>
      {SECTIONS.map((section, idx) => {
        const isActive = activeSection === section
        return (
          <button
            key={section}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 hover:scale-150 ${
              isActive 
                ? 'bg-[var(--accent-warm)] shadow-[0_0_8px_rgba(212,185,150,0.4)]' 
                : 'border border-[var(--border-mid)] bg-transparent opacity-40 hover:opacity-100 hover:border-[var(--accent-warm)]'
            }`}
            onClick={() => scrollTo(section)}
            aria-label={`Scroll to ${section}`}
          />
        )
      })}
    </div>
  )
}
