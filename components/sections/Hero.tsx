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
  const titleWrapperRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<HTMLDivElement>(null)
        const reducedMotion = useReducedMotion()

  const [scrambleText, setScrambleText] = useState("YOHANES WENANTA")

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return
    const wrapper = wrapperRef.current
    if (!wrapper) return

    // ─── Scramble Effect ───
    let iteration = 0
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const originalText = "YOHANES WENANTA"

    const fixedScramble = originalText.split("").map(l =>
      l === " " ? " " : letters[Math.floor(Math.random() * 26)]
    )
    setScrambleText(fixedScramble.join(""))

    let interval: NodeJS.Timeout
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setScrambleText(originalText.split("").map((letter, index) => {
          if (letter === " ") return " "
          if (index < Math.floor(iteration)) return originalText[index]
          if (index < Math.floor(iteration) + 3) return letters[Math.floor(Math.random() * 26)]
          return fixedScramble[index]
        }).join(""))
        if (iteration >= originalText.length) clearInterval(interval)
        iteration += 1 / 2.2
      }, 45)
    }, 1800)

    // ─── Intro Animation (on load) ───
    // Starts at 0.8s so title fades in (with blur) BEFORE
    // the scramble begins resolving at 1.8s. No overlap.
    const introTl = gsap.timeline({ delay: 0.8 })
    introTl.fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' }
    )
    introTl.fromTo(labelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 0.7, x: 0, duration: 1, ease: 'power3.out' },
      "-=0.6"
    )

    // ─── Scroll Timeline (Compositional Transformation) ───
    //
    // 10 units total across ~220vh for fine-grained control:
    //
    //   0   – 2.0  → IDENTITY HOLD      (0–20%)   title dominant, nothing else
    //   2.0 – 4.5  → ROLE REVEAL        (20–45%)  role enters, title subtly adjusts
    //   4.5 – 7.0  → CONTEXT REVEAL     (45–70%)  education enters, composition densifies
    //   7.0 – 8.8  → COMPOSITION HOLD   (70–88%)  everything visible, near-static
    //   8.8 – 10.0 → EXIT / TRANSITION  (88–100%) graceful departure
    //
    const mm = gsap.matchMedia()
    
    mm.add("(min-width: 768px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      })

// ════════════════════════════════════════════
    // PHASE 1: IDENTITY HOLD (0 – 2.0)
    // Nothing moves. The name breathes.
    // Only the anchor has a tiny pulse.
    // ════════════════════════════════════════════

    

    // ════════════════════════════════════════════
    // PHASE 2: ROLE REVEAL (2.0 – 4.5)
    // Role sweeps in from below. Name stays perfectly still.
    

    

    // ════════════════════════════════════════════
    // PHASE 3: CONTEXT REVEAL (4.5 – 7.0)
    // Role shifts up a touch.
    // Education/context enters.
    

    // Context: reveal with spatial entry
    scrollTl.fromTo(contextRef.current,
      { opacity: 0, y: 16, scale: 0.98 },
      { opacity: 0.85, y: 0, scale: 1, duration: 2, ease: 'power3.out' },
      4.8
    )

    

    

    // ════════════════════════════════════════════
    // PHASE 4: COMPOSITION HOLD (7.0 – 8.8)
    // Everything is visible. Near-static.
    // Only the most subtle drift to keep it alive.
    // The user appreciates the full identity.
    // ════════════════════════════════════════════

    

    // ════════════════════════════════════════════
    // PHASE 5: EXIT / TRANSITION (8.8 – 10.0)
    // Graceful departure. Title fades last.
    // Only 12% of the total scroll range.
    // ════════════════════════════════════════════

    // Title: exit
    scrollTl.to(titleWrapperRef.current, {
      y: -35,
      opacity: 0,
      scale: 0.88,
      duration: 1.2,
      ease: 'power2.in',
    }, 8.8)

    // Role: exit
    scrollTl.to(roleRef.current, {
      y: -20,
      opacity: 0,
      duration: 1.0,
      ease: 'power2.in',
    }, 8.9)

    // Context: exit
    scrollTl.to(contextRef.current, {
      y: -15,
      opacity: 0,
      duration: 1.0,
      ease: 'power2.in',
    }, 9.0)

    // Label: exit
    scrollTl.to(labelRef.current, {
      opacity: 0,
      x: -10,
      duration: 0.8,
      ease: 'power2.in',
    }, 9.0)

    
    })

    mm.add("(max-width: 767px)", () => {
      const mobileTl = gsap.timeline({ delay: 2.2 })
      
      mobileTl.fromTo(roleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.5"
      )
      mobileTl.fromTo(contextRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.85, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.5"
      )
      
    })

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
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
        <div
          ref={labelRef}
          className="absolute top-[var(--section-py)] left-[var(--section-px)] z-20 opacity-0"
        >
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--accent-cool)]">
            00 — INTRO
          </span>
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
          <div className="h-6 md:h-10" />

          {/* Role — Secondary Information */}
          <div
            ref={roleRef}
            className="font-mono text-[13px] md:text-[15px] font-semibold text-[var(--text-primary)] uppercase tracking-[0.18em] md:tracking-[0.25em] opacity-0 will-change-transform flex flex-wrap justify-center items-center gap-y-1"
          >
            <span className="opacity-90">Full Stack</span>
            <span className="mx-3 md:mx-6 text-[var(--text-secondary)] opacity-60 select-none">-</span>
            <span className="opacity-90">UI/UX</span>
            <span className="mx-3 md:mx-6 text-[var(--text-secondary)] opacity-60 select-none">-</span>
            <span className="opacity-90">AI</span>
          </div>

          {/* Spacer between role and context */}
          <div className="h-6 md:h-8" />



          {/* Context / Education — Tertiary Information */}
          <div
            ref={contextRef}
            className="font-mono text-[11px] md:text-[12px] font-medium text-[var(--text-primary)] uppercase tracking-[0.08em] opacity-0 will-change-transform flex flex-col items-center justify-center gap-1.5 mt-2"
          >
            <span className="opacity-70 text-center">BINUS UNDERGRADUATE MAJORING IN</span>
            <span className="opacity-70 text-center">MASTER OF INFORMATION TECHNOLOGY</span>
          </div>
        </div>

                {/* Navigation Button */}
        <div className="absolute bottom-[8vh] w-full flex justify-center z-30 opacity-0 animate-[fadeIn_1s_ease-in-out_3s_forwards]">
          <button 
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
            className="flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
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
