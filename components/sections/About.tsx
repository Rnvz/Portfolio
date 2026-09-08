'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitText } from '@/components/ui/SplitText'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SKILLS, STATS } from '@/lib/constants'

function animateCounter(element: HTMLElement, target: number, suffix: string) {
  let start = 0
  const duration = 1200
  const startTime = performance.now()

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    start = Math.floor(eased * target)
    element.textContent = start + suffix
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

export function About() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return
    const section = sectionRef.current
    if (!section) return

    // Bio reveal block fade
    gsap.fromTo(bioRef.current, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 95%', // increased from 85% to ensure it fires earlier
        }
      }
    )

    // Skills stagger
    if (skillsRef.current) {
      gsap.fromTo(skillsRef.current.children,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 95%',
          }
        }
      )
    }

    // Stats counter animation trigger
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.stat-counter')
      gsap.from(counters, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            counters.forEach((el, i) => {
              const targetStr = STATS[i].value
              const target = parseInt(targetStr)
              const suffix = targetStr.replace(/[0-9]/g, '')
              setTimeout(() => {
                animateCounter(el as HTMLElement, target, suffix)
              }, i * 200)
            })
          }
        }
      })
    }

  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex flex-col justify-center px-[var(--section-px)] py-[var(--section-py)]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left Column */}
        <div className="flex flex-col gap-10 lg:gap-14">
          <div>
            <SectionLabel text="02 — About" accent="cool" />
            <div className="text-h1 font-display text-[var(--text-primary)] mb-4 mt-2">
              <SplitText text="Who I am." />
            </div>
            <p ref={bioRef} className="text-base md:text-lg font-normal text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Information Technology student at Bina Nusantara University with a strong passion for web development, UI/UX design, and data-driven applications. Experienced in building full-stack production systems, from edge-deployed serverless backends to pixel-perfect, accessible frontends. Motivated to create digital solutions that are both technically robust and meaningful in real-world impact.
            </p>
          </div>

          <div ref={statsRef} className="flex justify-between md:justify-start md:gap-16 pt-8 border-t border-[var(--border)]">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col">
                <span className="stat-counter font-mono text-3xl md:text-4xl font-medium text-[var(--text-primary)] mb-2">
                  {reducedMotion ? stat.value : '0' + stat.value.replace(/[0-9]/g, '')}
                </span>
                <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  {stat.label.split(' ')[0]}<br/>{stat.label.split(' ').slice(1).join(' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex flex-col pt-8 lg:pt-0 w-full">
          <div ref={skillsRef} className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-y-10 gap-x-4 w-full justify-items-center">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center gap-3 group w-full max-w-[72px]">
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" 
                  />
                </div>
                <span className="font-mono font-semibold text-[11px] text-[var(--text-secondary)] group-hover:text-[var(--accent-cool)] transition-colors text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
