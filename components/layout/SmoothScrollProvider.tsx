'use client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
// import { SplitText } from 'gsap/SplitText'
// import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  // gsap.registerPlugin(SplitText, DrawSVGPlugin) // Comment out for now until we confirm they exist in standard gsap
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force scroll to top on every page load, before Lenis initializes
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    }

    const lenis = new Lenis({
      duration    : 1.2,
      easing      : (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation : 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel : true,
      // @ts-ignore
      syncToNative: false,
    })

    lenis.scrollTo(0, { immediate: true })

    // Wire Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Prevent GSAP lag smoothing from conflicting with Lenis
    gsap.ticker.lagSmoothing(0)

    // Window scroll handler for NavDots
    window.lenis = lenis

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
      ScrollTrigger.killAll()
      window.lenis = undefined
    }
  }, [])

  return <>{children}</>
}
