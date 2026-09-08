'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NoiseBackground } from '@/components/ui/NoiseBackground'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleWrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const roleRef1 = useRef<HTMLDivElement>(null)
  const roleRef2 = useRef<HTMLDivElement>(null)
  const roleRef3 = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
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
        
        iteration += 1 / 3; // Slower resolve (1 letter every 3 ticks)
      }, 65); // Slower shuffle (65ms per tick instead of 45ms)
    }, 1800);

    // Intro Animation (on load)
    const introTl = gsap.timeline({ delay: 1.8 })
    introTl.fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }
    )

    // Scroll Sequence
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=4500', // Adjusted total scroll distance
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    const width1 = roleRef1.current?.scrollWidth || 0
    gsap.set(roleRef1.current, { width: 0, opacity: 0, overflow: 'hidden', whiteSpace: 'nowrap' })
    
    const width2 = roleRef2.current?.scrollWidth || 0
    gsap.set(roleRef2.current, { width: 0, opacity: 0, overflow: 'hidden', whiteSpace: 'nowrap' })

    const width3 = roleRef3.current?.scrollWidth || 0
    gsap.set(roleRef3.current, { width: 0, opacity: 0, overflow: 'hidden', whiteSpace: 'nowrap' })
    
    // Beat 1: Full Stack Developer appears
    scrollTl.to(roleRef1.current, { width: width1, opacity: 1, duration: 1 }, 0)
    
    // Beat 2: UI/UX Designer appears
    scrollTl.to(roleRef2.current, { width: width2, opacity: 1, duration: 1 }, 1)
    
    // Beat 3: AI Engineer appears
    scrollTl.to(roleRef3.current, { width: width3, opacity: 1, duration: 1 }, 2)

    // Beat 4: Education text appears
    if (educationRef.current) {
      scrollTl.fromTo(educationRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 3)
    }

    // Beat 5: Exit Animation for EVERYTHING
    // Use titleWrapperRef for exit to avoid conflict with introTl
    scrollTl.fromTo([titleWrapperRef.current, roleRef1.current, roleRef2.current, roleRef3.current, educationRef.current], 
      { y: 0, opacity: 1 },
      {
        y: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut",
        immediateRender: false
      }, 
      5
    )

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
      introTl.kill()
      scrollTl.kill()
    }
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <NoiseBackground />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div ref={titleWrapperRef}>
          <h1 
            ref={titleRef} 
            className="text-hero font-display text-[var(--accent-warm)] leading-none mb-4 tracking-tighter opacity-0"
          >
            {scrambleText}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center font-display font-light text-[var(--text-secondary)] text-xl md:text-2xl mb-4 gap-y-2">
          <div ref={roleRef1} className="opacity-0">
            Full Stack Developer
          </div>
          <div ref={roleRef2} className="flex items-center">
            <span className="text-[var(--text-dim)] mx-2">&</span>
            UI/UX Designer
          </div>
          <div ref={roleRef3} className="flex items-center">
            <span className="text-[var(--text-dim)] mx-2">&</span>
            AI Engineer
          </div>
        </div>
        
        <div ref={educationRef} className="font-mono font-medium text-sm md:text-base text-[var(--text-secondary)] max-w-lg text-center px-4 leading-relaxed opacity-0">
          BINUS University <span className="mx-1 text-[var(--text-dim)]">|</span> Master of Information Technology
        </div>
      </div>
    </section>
  )
}
