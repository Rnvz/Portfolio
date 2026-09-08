'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CERTIFICATIONS } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SplitText } from '@/components/ui/SplitText'

export function Journey() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') {
      const items = listRef.current?.querySelectorAll('.cert-item')
      if (items) gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    const section = sectionRef.current
    if (!section) return

    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.cert-item')
      
      gsap.fromTo(items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
          }
        }
      )
    }
  }, [reducedMotion])

  return (
    <section ref={sectionRef} id="journey" className="relative w-full min-h-screen px-[var(--section-px)] py-[var(--section-py)] bg-[var(--scene-journey)] overflow-hidden flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full relative">
        <SectionLabel text="04 — Certifications" accent="cool" />
        
        <div className="text-h2 font-display text-[var(--text-primary)] mb-16 mt-4">
          <SplitText text="Professional Certifications." />
        </div>
        
        <div ref={listRef} className="flex flex-col border-t border-[var(--border)]">
          {CERTIFICATIONS.map((cert) => {
            const isExpanded = expandedId === cert.id;
            return (
              <div 
                key={cert.id} 
                onClick={() => setExpandedId(isExpanded ? null : cert.id)}
                className="cert-item flex flex-col py-8 border-b border-[var(--border)] group hover:bg-[rgba(255,255,255,0.02)] transition-colors px-4 -mx-4 rounded-xl cursor-pointer"
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 mb-4 md:mb-0">
                    <span className="font-mono text-sm text-[var(--text-dim)] md:w-16 shrink-0">
                      {cert.year}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent-cool)] transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6 justify-between md:justify-end">
                    <div className="font-mono text-sm uppercase tracking-wider text-[var(--text-secondary)]">
                      {cert.issuer}
                    </div>
                    {/* Arrow Icon */}
                    <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] group-hover:border-[var(--accent-cool)] group-hover:text-[var(--accent-cool)] transition-colors shrink-0">
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expandable Image Container */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] mt-8 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'}`}
                >
                  <div className="overflow-hidden bg-[#0a0a0a] rounded-xl flex items-center justify-center p-4">
                    <img 
                      src={cert.image} 
                      alt={`${cert.title} Certificate`} 
                      className="w-full h-auto max-h-[600px] object-contain rounded-lg border border-[var(--border)] shadow-xl"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
