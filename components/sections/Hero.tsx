'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NoiseBackground } from '@/components/ui/NoiseBackground'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const labelWrapperRef = useRef<HTMLDivElement>(null)
  const titleWrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const roleWrapperRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<HTMLDivElement>(null)
  const contextWrapperRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const buttonWrapperRef = useRef<HTMLDivElement>(null)
        const reducedMotion = useReducedMotion()

  const [scrambleText, setScrambleText] = useState("YOHANES WENANTA")

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // ─── Scramble Effect ───
    let iteration = 0
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const targetText = "YOHANES WENANTA"
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setScrambleText((prev) =>
          prev
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return targetText[index]
              }
              return letters[Math.floor(Math.random() * 26)]
            })
            .join("")
        )
        if (iteration >= targetText.length) {
          clearInterval(interval)
        }
        iteration += 1 / 5
      }, 45)
      return () => clearInterval(interval)
    }, 1800)

    // ─── Intro Animation (on load) ───
    const introTl = gsap.timeline({ delay: 1.0 })
    introTl.fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
    )
    introTl.fromTo(labelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 0.7, x: 0, duration: 1.5, ease: 'power3.out' },
      "-=0.5"
    )
    // Add a slight pause before showing role and context
    introTl.fromTo(roleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
      "+=0.2"
    )
    introTl.fromTo(contextRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.85, y: 0, duration: 1.5, ease: 'power2.out' },
      "-=1.0"
    )
    introTl.fromTo(buttonRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.7, y: 0, duration: 1.5, ease: 'power2.out' },
      "-=1.0"
    )

    const mm = gsap.matchMedia()
    
    mm.add("(min-width: 768px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Hold phase
      scrollTl.to({}, { duration: 1 })

      // Exit animations targeting wrappers (avoids conflict with introTl)
      scrollTl.to(buttonWrapperRef.current, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.in' }, 1)
      scrollTl.to(contextWrapperRef.current, { y: -15, opacity: 0, duration: 1.0, ease: 'power2.in' }, 1.2)
      scrollTl.to(roleWrapperRef.current, { y: -20, opacity: 0, duration: 1.0, ease: 'power2.in' }, 1.4)
      scrollTl.to(titleWrapperRef.current, { y: -35, opacity: 0, scale: 0.95, duration: 1.2, ease: 'power2.in' }, 1.6)
      scrollTl.to(labelWrapperRef.current, { opacity: 0, x: -10, duration: 0.8, ease: 'power2.in' }, 1.8)
    })

    return () => {
      clearTimeout(startDelay)
      introTl.kill()
      mm.revert()
    }
  }, [reducedMotion])

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Sticky Stage — the visual composition stays here while scroll drives transformation */}
      <div
        ref={stageRef}
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <NoiseBackground />

        {/* Section Label — 00 — INTRO */}
        <div ref={labelWrapperRef} className="absolute top-[var(--section-py)] left-[var(--section-px)] z-20 will-change-transform">
          <div ref={labelRef} className="opacity-0">
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--accent-cool)]">
              00 — INTRO
            </span>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center px-[var(--section-px)] w-full max-w-full">

          {/* Name / Identity — Primary Visual Anchor */}
          <div ref={titleWrapperRef} className="will-change-transform">
            <h1
              ref={titleRef}
              className="text-hero font-display text-[var(--accent-warm)] leading-[1.1] tracking-wider md:tracking-[0.1em] lg:tracking-[0.15em] opacity-0 will-change-transform"
            >
              {scrambleText}
            </h1>
          </div>

          {/* Spacer between name and role */}
          <div className="h-4 md:h-6" />

          {/* Role — Secondary Information */}
          <div ref={roleWrapperRef} className="will-change-transform">
          <div
            ref={roleRef}
            className="font-mono text-[13px] md:text-[15px] font-semibold text-[var(--text-primary)] uppercase tracking-[0.18em] md:tracking-[0.25em] opacity-0 flex flex-wrap justify-center items-center gap-y-1"
          >
            <span className="opacity-90">Full Stack</span>
            <span className="mx-3 md:mx-6 text-[var(--text-secondary)] opacity-60 select-none">-</span>
            <span className="opacity-90">UI/UX</span>
            <span className="mx-3 md:mx-6 text-[var(--text-secondary)] opacity-60 select-none">-</span>
            <span className="opacity-90">AI</span>
          </div>
        </div>

          {/* Spacer between role and context */}
          <div className="h-3 md:h-4" />



          {/* Context / Education — Tertiary Information */}
          <div ref={contextWrapperRef} className="will-change-transform mt-2">
          <div
            ref={contextRef}
            className="font-mono text-[11px] md:text-[12px] font-medium text-[var(--text-primary)] uppercase tracking-[0.08em] opacity-0 flex flex-col items-center justify-center gap-1.5"
          >
            <span className="opacity-70 text-center">BINUS UNDERGRADUATE MAJORING IN</span>
            <span className="opacity-70 text-center">MASTER OF INFORMATION TECHNOLOGY</span>
          </div>
        </div>
        </div>

                {/* Navigation Button */}
        <div ref={buttonWrapperRef} className="absolute bottom-[8vh] w-full flex justify-center z-30 will-change-transform">
          <button 
            ref={buttonRef}
            onClick={() => {
              // @ts-ignore
              if (window.lenis) {
                // @ts-ignore
                window.lenis.scrollTo('#about', { duration: 3.5, easing: (t) => 1 - Math.pow(1 - t, 4) })
              } else {
                const target = document.getElementById('about');
                if (target) {
                  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                  const startPosition = window.scrollY;
                  const distance = targetPosition - startPosition;
                  let startTime: number | null = null;
                  const duration = 2000;
                  
                  function animation(currentTime: number) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                  }
                  
                  function ease(t: number, b: number, c: number, d: number) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t * t + b;
                    t -= 2;
                    return -c / 2 * (t * t * t * t - 2) + b;
                  }
                  
                  requestAnimationFrame(animation);
                }
              }
            }}
            className="flex flex-col items-center gap-3 hover:opacity-100 transition-opacity" style={{ opacity: 0 }}
          >
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[var(--text-secondary)]">Tap to explore</span>
            <svg className="w-4 h-4 md:w-5 md:h-5 animate-bounce text-[var(--accent-warm)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        
      </div>
    </div>
  )
}
