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
    introTl.fromTo(anchorRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' },
      "-=0.5"
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
    // PHASE 1: IDENTITY HOLD (0 – 2.0)
    // Nothing moves. The name breathes.
    // Only the anchor has a tiny pulse.
    // ════════════════════════════════════════════

    // Anchor inner dot: very subtle warm-up
    scrollTl.to(anchorInnerRef.current, {
      opacity: 0.6,
      scale: 1.3,
      duration: 2,
      ease: 'power1.inOut',
    }, 0)

    // ════════════════════════════════════════════
    // PHASE 2: ROLE REVEAL (2.0 – 4.5)
    // Role sweeps in from below. Name stays perfectly still.
    // Anchor evolves subtly.
    // ════════════════════════════════════════════

    // Role: appear from below
    scrollTl.fromTo(roleRef.current,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power3.out' },
      2.2
    )

    // Anchor: ring shifts down slightly
    scrollTl.to(anchorRef.current, {
      y: 5,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 2)

    // Anchor inner: grows a bit more
    scrollTl.to(anchorInnerRef.current, {
      scale: 1.8,
      opacity: 0.75,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 2)

    // ════════════════════════════════════════════
    // PHASE 3: CONTEXT REVEAL (4.5 – 7.0)
    // Role shifts up a touch.
    // Education/context enters.
    // Anchor ring warms.
    // ════════════════════════════════════════════

    // Role: slight upward drift
    scrollTl.to(roleRef.current, {
      y: -6,
      opacity: 0.9,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 4.5)

    // Context: reveal with spatial entry
    scrollTl.fromTo(contextRef.current,
      { opacity: 0, y: 16, scale: 0.98 },
      { opacity: 0.85, y: 0, scale: 1, duration: 2, ease: 'power3.out' },
      4.8
    )

    // Anchor ring: warm border, subtle glow
    scrollTl.to(anchorRingRef.current, {
      borderColor: 'rgba(212, 185, 150, 0.4)',
      boxShadow: '0 0 10px rgba(212, 185, 150, 0.1)',
      duration: 2.5,
      ease: 'power2.inOut',
    }, 4.5)

    // Anchor: small shift
    scrollTl.to(anchorRef.current, {
      y: 12,
      duration: 2.5,
      ease: 'power2.inOut',
    }, 4.5)

    // ════════════════════════════════════════════
    // PHASE 4: COMPOSITION HOLD (7.0 – 8.8)
    // Everything is visible. Near-static.
    // Only the most subtle drift to keep it alive.
    // The user appreciates the full identity.
    // ════════════════════════════════════════════

    // Anchor inner: settle
    scrollTl.to(anchorInnerRef.current, {
      scale: 2,
      opacity: 0.85,
      duration: 1.8,
      ease: 'power1.inOut',
    }, 7)

    // ════════════════════════════════════════════
    // PHASE 5: EXIT / TRANSITION (8.8 – 10.0)
    // Graceful departure. Title fades last.
    // Only 12% of the total scroll range.
    // ════════════════════════════════════════════

    // Title: exit
    scrollTl.to(titleRef.current, {
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

    // Anchor: last to go
    scrollTl.to(anchorRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.7,
      duration: 1.2,
      ease: 'power2.in',
    }, 9.2)

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
            className="font-mono text-[13px] md:text-[16px] font-semibold text-[var(--text-primary)] uppercase tracking-[0.15em] md:tracking-[0.18em] opacity-0 will-change-transform flex flex-wrap justify-center items-center gap-y-1"
          >
            <span className="opacity-90">Full Stack Developer</span>
            <span className="mx-2 md:mx-4 text-[var(--border-mid)] select-none">/</span>
            <span className="opacity-90">UI/UX Designer</span>
            <span className="mx-2 md:mx-4 text-[var(--border-mid)] select-none">/</span>
            <span className="opacity-90">AI Engineer</span>
          </div>

          {/* Spacer between role and context */}
          <div className="h-6 md:h-8" />

          {/* Context / Education — Tertiary Information */}
          <div
            ref={contextRef}
            className="font-mono text-[12px] md:text-[14px] font-semibold text-[var(--text-primary)] uppercase tracking-[0.15em] opacity-0 will-change-transform flex flex-col items-center gap-1.5"
          >
            <span className="opacity-80">BINUS UNIVERSITY</span>
            <span className="text-[var(--border-mid)]">·</span>
            <span className="opacity-80">MASTER OF INFORMATION TECHNOLOGY</span>
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
