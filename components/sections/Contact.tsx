'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitText } from '@/components/ui/SplitText'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const subTextRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      }
    })

    if (subTextRef.current) {
      tl.fromTo(subTextRef.current.children, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)' },
        0.5 // Delay slightly to let SplitText start
      )
    }

    if (linksRef.current) {
      const links = gsap.utils.toArray(linksRef.current.children)
      tl.fromTo(links, 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' },
        0.7
      )
    }
    
    if (footerRef.current) {
      tl.fromTo(footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.2
      )
    }

  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col items-center justify-center text-center px-[var(--section-px)] py-[var(--section-py)] bg-[var(--scene-contact)]">
      <SectionLabel text="05 — Contact" accent="warm" />
      
      <div className="text-[var(--accent-warm)] font-display font-semibold text-[clamp(2.5rem,6vw,5rem)] leading-tight mb-8">
        <SplitText text="Let's build something." delay={0.2} />
      </div>
      
      <div ref={subTextRef} className="mb-16 max-w-3xl mx-auto overflow-hidden">
        <p className="font-mono text-[var(--text-secondary)] text-sm md:text-base uppercase tracking-widest text-center">
          Available for: Fulltime, Part time, Hybrid, Remote, Freelance
        </p>
      </div>

      <ul ref={linksRef} className="flex flex-col w-full max-w-5xl px-4 md:px-12 mb-16">
        <li className="group border-b border-[var(--border-light)] hover:border-[var(--accent-warm)] transition-colors duration-500">
          <a href="mailto:yohaneswenanta2410@gmail.com" className="flex flex-col lg:flex-row lg:items-center justify-between py-6 w-full">
            <span className="font-mono text-sm md:text-base text-[var(--text-dim)] mb-4 lg:mb-0 group-hover:text-[var(--accent-warm)] transition-colors duration-500">
              01 — Email
            </span>
            <span className="font-display font-medium text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors duration-500 tracking-tight flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto break-all lg:break-normal">
              yohaneswenanta2410@gmail.com
              <svg className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[var(--accent-warm)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </li>
        <li className="group border-b border-[var(--border-light)] hover:border-[var(--accent-warm)] transition-colors duration-500">
          <a href="https://github.com/Rnvz" target="_blank" rel="noopener noreferrer" className="flex flex-col lg:flex-row lg:items-center justify-between py-6 w-full">
            <span className="font-mono text-sm md:text-base text-[var(--text-dim)] mb-4 lg:mb-0 group-hover:text-[var(--accent-warm)] transition-colors duration-500">
              02 — GitHub
            </span>
            <span className="font-display font-medium text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors duration-500 tracking-tight flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
              github.com/Rnvz
              <svg className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[var(--accent-warm)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </li>
        <li className="group border-b border-[var(--border-light)] hover:border-[var(--accent-warm)] transition-colors duration-500">
          <a href="https://tinyurl.com/wp3y3eak" target="_blank" rel="noopener noreferrer" className="flex flex-col lg:flex-row lg:items-center justify-between py-6 w-full">
            <span className="font-mono text-sm md:text-base text-[var(--text-dim)] mb-4 lg:mb-0 group-hover:text-[var(--accent-warm)] transition-colors duration-500">
              03 — Portfolio
            </span>
            <span className="font-display font-medium text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors duration-500 tracking-tight flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
              GDrive
              <svg className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[var(--accent-warm)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </li>
        <li className="group border-b border-[var(--border-light)] hover:border-[var(--accent-warm)] transition-colors duration-500">
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col lg:flex-row lg:items-center justify-between py-6 w-full">
            <span className="font-mono text-sm md:text-base text-[var(--text-dim)] mb-4 lg:mb-0 group-hover:text-[var(--accent-warm)] transition-colors duration-500">
              04 — LinkedIn
            </span>
            <span className="font-display font-medium text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors duration-500 tracking-tight flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
              LinkedIn
              <svg className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[var(--accent-warm)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </li>
        <li className="group border-b border-[var(--border-light)] hover:border-[var(--accent-warm)] transition-colors duration-500">
          <a href="tel:+6281289992896" className="flex flex-col lg:flex-row lg:items-center justify-between py-6 w-full">
            <span className="font-mono text-sm md:text-base text-[var(--text-dim)] mb-4 lg:mb-0 group-hover:text-[var(--accent-warm)] transition-colors duration-500">
              05 — Phone
            </span>
            <span className="font-display font-medium text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[var(--text-primary)] group-hover:text-[var(--accent-warm)] transition-colors duration-500 tracking-tight flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
              +62 812 8999 2896
              <svg className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[var(--accent-warm)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </a>
        </li>
      </ul>

      <div ref={footerRef} className="mt-auto font-mono text-[0.7rem] text-[var(--text-dim)] uppercase tracking-widest flex flex-col md:flex-row gap-4 justify-between w-full max-w-5xl px-4 md:px-12">
        <span>© 2025 YOHANES WENANTA. ALL RIGHTS RESERVED.</span>
        <span className="hover:text-[var(--accent-warm)] transition-colors cursor-pointer">COPYRIGHT POLICY</span>
      </div>
    </section>
  )
}
