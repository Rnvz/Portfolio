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
  const titleRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const contextRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const anchorInnerRef = useRef<HTMLDivElement>(null)
  const anchorRingRef = useRef<HTMLDivElement>(null)
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
        iteration += 1 / 3
      }, 65)
    }, 1800)

    // ─── Intro Animation (on load) ───
    const introTl = gsap.timeline({ delay: 1.8 })
    introTl.fromTo(titleRef.current,
      { opacity: 0, y: 40, scale: 0.92, filter: 'blur(12px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out' }
    )
    introTl.fromTo(labelRef.current,
      { opacity: 0, x: -20 },
      { opacity: 0.7, x: 0, duration: 1, ease: 'power3.out' },
      "-=0.9"
    )
    introTl.fromTo(anchorRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' },
      "-=0.7"
    )

    // ─── Scroll Timeline (Compositional Transformation) ───
    // Total timeline duration = 5 units across ~220vh
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    })

    // ════════════════════════════════════════════
    // PHASE 1 → 2: IDENTITY → ROLE (0 – 1.5)
    // Name rises and scales down subtly
    // Role sweeps in from below
    // Anchor evolves
    // ════════════════════════════════════════════

    // Name: scale down, move up, reduce opacity slightly
    scrollTl.to(titleRef.current, {
      scale: 0.88,
      y: -30,
      opacity: 0.85,
      letterSpacing: '-0.02em',
      duration: 1.5,
      ease: 'power2.inOut',
    }, 0)

    // Role: appear from below with spatial movement
    scrollTl.fromTo(roleRef.current,
      { opacity: 0, y: 35, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      0.3
    )

    // Anchor: inner dot grows, becomes more visible
    scrollTl.to(anchorInnerRef.current, {
      scale: 2,
      opacity: 0.8,
      duration: 1.5,
      ease: 'power2.inOut',
    }, 0)

    // Anchor: ring shifts down slightly
    scrollTl.to(anchorRef.current, {
      y: 10,
      duration: 1.5,
      ease: 'power2.inOut',
    }, 0)

    // ════════════════════════════════════════════
    // PHASE 2 → 3: ROLE → CONTEXT (1.5 – 3.0)
    // Name scales further, becomes quieter
    // Role shifts up slightly
    // Context/Education appears
    // Composition densifies
    // ════════════════════════════════════════════

    // Name: further reduction
    scrollTl.to(titleRef.current, {
      scale: 0.78,
      y: -50,
      opacity: 0.55,
      duration: 1.5,
      ease: 'power2.inOut',
    }, 1.5)

    // Role: shift up, reduce slightly
    scrollTl.to(roleRef.current, {
      y: -15,
      opacity: 0.7,
      duration: 1.5,
      ease: 'power2.inOut',
    }, 1.5)

    // Context: reveal with spatial entry
    scrollTl.fromTo(contextRef.current,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 0.85, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      1.8
    )

    // Anchor: ring border becomes warm, subtle glow
    scrollTl.to(anchorRingRef.current, {
      borderColor: 'rgba(212, 185, 150, 0.5)',
      boxShadow: '0 0 12px rgba(212, 185, 150, 0.15)',
      duration: 1.5,
      ease: 'power2.inOut',
    }, 1.5)

    // Anchor: shift down more
    scrollTl.to(anchorRef.current, {
      y: 25,
      duration: 1.5,
      ease: 'power2.inOut',
    }, 1.5)

    // ════════════════════════════════════════════
    // PHASE 3 → 4: CONTEXT → EXIT (3.0 – 5.0)
    // Everything collapses upward and fades
    // Anchor becomes the last visible element
    // Composition dissolves into transition
    // ════════════════════════════════════════════

    // Name: exit
    scrollTl.to(titleRef.current, {
      y: -100,
      opacity: 0,
      scale: 0.7,
      duration: 1.5,
      ease: 'power2.in',
    }, 3.2)

    // Role: exit (slightly delayed)
    scrollTl.to(roleRef.current, {
      y: -60,
      opacity: 0,
      duration: 1.3,
      ease: 'power2.in',
    }, 3.4)

    // Context: exit (slightly more delayed)
    scrollTl.to(contextRef.current, {
      y: -40,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.in',
    }, 3.6)

    // Label: exit
    scrollTl.to(labelRef.current, {
      opacity: 0,
      x: -15,
      duration: 1,
      ease: 'power2.in',
    }, 3.5)

    // Anchor: last to go, drifts down then fades
    scrollTl.to(anchorRef.current, {
      y: 60,
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: 'power2.in',
    }, 3.8)

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
      introTl.kill()
      scrollTl.kill()
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
          <h1
            ref={titleRef}
            className="text-hero font-display text-[var(--accent-warm)] leading-none tracking-tighter opacity-0 will-change-transform"
          >
            {scrambleText}
          </h1>

          {/* Spacer between name and role */}
          <div className="h-6 md:h-10" />

          {/* Role — Secondary Information */}
          <div
            ref={roleRef}
            className="font-mono text-[10px] md:text-[12px] text-[var(--text-secondary)] uppercase tracking-[0.18em] opacity-0 will-change-transform flex flex-wrap justify-center items-center gap-y-1"
          >
            <span>Full Stack Developer</span>
            <span className="mx-2 md:mx-4 text-[var(--border-mid)] select-none">/</span>
            <span>UI/UX Designer</span>
            <span className="mx-2 md:mx-4 text-[var(--border-mid)] select-none">/</span>
            <span>AI Engineer</span>
          </div>

          {/* Spacer between role and context */}
          <div className="h-6 md:h-8" />

          {/* Context / Education — Tertiary Information */}
          <div
            ref={contextRef}
            className="font-mono text-[9px] md:text-[10px] text-[var(--text-dim)] uppercase tracking-[0.2em] opacity-0 will-change-transform flex flex-col items-center gap-1"
          >
            <span>BINUS UNIVERSITY</span>
            <span className="text-[var(--border-mid)]">·</span>
            <span>MASTER OF INFORMATION TECHNOLOGY</span>
          </div>
        </div>

        {/* Central Circular Anchor — Visual Progress Indicator */}
        <div
          ref={anchorRef}
          className="absolute bottom-[15vh] md:bottom-[18vh] flex items-center justify-center opacity-0 will-change-transform"
        >
          <div
            ref={anchorRingRef}
            className="w-8 h-8 rounded-full border border-[var(--border-mid)] flex items-center justify-center transition-colors duration-700"
          >
            <div
              ref={anchorInnerRef}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent-warm)] opacity-40 will-change-transform"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
