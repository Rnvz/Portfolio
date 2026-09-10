'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NoiseBackground } from '@/components/ui/NoiseBackground'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleWrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const anchorInnerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const [scrambleText, setScrambleText] = useState("YOHANES WENANTA")

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return
    const section = sectionRef.current
    if (!section) return

    // Scramble Effect via State
    let iteration = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const originalText = "YOHANES WENANTA"
    
    // Initial fully scrambled state
    const fixedScramble = originalText.split("").map(l => l === " " ? " " : letters[Math.floor(Math.random() * 26)])
    setScrambleText(fixedScramble.join(""))

    let interval: NodeJS.Timeout;
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setScrambleText(originalText.split("").map((letter, index) => {
          if (letter === " ") return " "
          
          if(index < Math.floor(iteration)) {
            return originalText[index];
          }
          
          // Only actively flicker a small window of characters for smoothness
          if(index < Math.floor(iteration) + 3) {
            return letters[Math.floor(Math.random() * 26)];
          }
          
          // The rest remain fixed random characters
          return fixedScramble[index];
        }).join(""))
        
        if(iteration >= originalText.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3; // Slower resolve
      }, 65); 
    }, 1800);

    // Intro Animation (on load)
    const introTl = gsap.timeline({ delay: 1.8 })
    introTl.fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }
    )
    introTl.fromTo(labelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    introTl.fromTo(anchorRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' },
      "-=0.6"
    )

    // Scroll Sequence (Layered Progression)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%', // Approx 200vh
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    // Phase 1: Identity is already visible. (Timeline starts at 0)
    
    // Phase 2: Role Reveal
    scrollTl.fromTo(roleRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }, 
      0.5
    )

    // Evolve Anchor
    scrollTl.to(anchorInnerRef.current, 
      { scale: 1.5, opacity: 1, backgroundColor: 'var(--accent-warm)', duration: 1 }, 
      0.5
    )

    // Phase 3: Context Reveal
    scrollTl.fromTo(contextRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }, 
      1.5
    )

    // Evolve Anchor further
    scrollTl.to(anchorRef.current, 
      { borderColor: 'var(--accent-warm)', duration: 1 }, 
      1.5
    )

    // Phase 4: Transition Out
    scrollTl.to([titleWrapperRef.current, roleRef.current, contextRef.current], 
      { opacity: 0, y: -40, duration: 1.5, stagger: 0.1, ease: 'power2.inOut' }, 
      3.0
    )
    
    scrollTl.to([labelRef.current, anchorRef.current], 
      { opacity: 0, duration: 1, ease: 'power2.inOut' }, 
      3.2
    )

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
      introTl.kill()
      scrollTl.kill()
    }
  }, [reducedMotion])

  return (
    <section id="hero" ref={sectionRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <NoiseBackground />
      
      {/* Section Label */}
      <div ref={labelRef} className="absolute top-[var(--section-py)] left-[var(--section-px)] opacity-0">
        <SectionLabel text="00 — INTRO" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
        {/* Name / Identity */}
        <div ref={titleWrapperRef} className="relative z-20">
          <h1 
            ref={titleRef} 
            className="text-hero font-display text-[var(--accent-warm)] leading-none mb-6 md:mb-8 tracking-tighter opacity-0"
          >
            {scrambleText}
          </h1>
        </div>
        
        {/* Role */}
        <div 
          ref={roleRef} 
          className="font-mono text-[10px] md:text-[13px] text-[var(--text-secondary)] uppercase tracking-[0.15em] md:tracking-[0.2em] mb-8 md:mb-10 opacity-0 max-w-[90vw] leading-relaxed flex flex-wrap justify-center items-center"
        >
          <span>Full Stack Developer</span>
          <span className="mx-2 md:mx-4 text-[var(--border-mid)]">/</span>
          <span>UI/UX Designer</span>
          <span className="mx-2 md:mx-4 text-[var(--border-mid)]">/</span>
          <span>AI Engineer</span>
        </div>
        
        {/* Context / Education */}
        <div 
          ref={contextRef} 
          className="font-mono text-[9px] md:text-[11px] text-[var(--text-dim)] uppercase tracking-widest opacity-0 max-w-[80vw] leading-loose flex flex-col md:flex-row items-center justify-center"
        >
          <span>BINUS UNIVERSITY</span>
          <span className="hidden md:inline mx-3 text-[var(--border-mid)]">·</span>
          <span className="md:hidden h-1" />
          <span>MASTER OF INFORMATION TECHNOLOGY</span>
        </div>
      </div>

      {/* Central Circular Anchor */}
      <div ref={anchorRef} className="absolute bottom-[15vh] md:bottom-[20vh] w-8 h-8 rounded-full border border-[var(--border-mid)] flex items-center justify-center opacity-0">
        <div ref={anchorInnerRef} className="w-1.5 h-1.5 rounded-full bg-[var(--text-dim)] opacity-40 transition-colors duration-500" />
      </div>
    </section>
  )
}
