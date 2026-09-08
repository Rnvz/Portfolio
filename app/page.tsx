'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Loader } from '@/components/sections/Loader'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Work } from '@/components/sections/Work'
import { Journey } from '@/components/sections/Journey'
import { Contact } from '@/components/sections/Contact'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const sections = [
  { id: 'hero',    tint: '#1a2420' },  // jade-dark
  { id: 'about',   tint: '#0a0a0a' },  // neutral
  { id: 'work',    tint: '#1e1c18' },  // warm-dark
  { id: 'journey', tint: '#0a0a0a' },  // neutral
  { id: 'contact', tint: '#18201f' },  // cool-dark
]

export default function Page() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return

    // Background color shifts
    sections.forEach(({ id, tint }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => gsap.to('body', { backgroundColor: tint, duration: 1.2, ease: 'power2.inOut', overwrite: 'auto' }),
        onEnterBack: () => gsap.to('body', { backgroundColor: tint, duration: 1.2, ease: 'power2.inOut', overwrite: 'auto' }),
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (sections.some(s => `#${s.id}` === st.trigger?.id)) {
          st.kill()
        }
      })
    }
  }, [reducedMotion])

  return (
    <main>
      <Loader />
      <section id="hero"    data-section="0"><Hero /></section>
      <section id="about"   data-section="1"><About /></section>
      <section id="work"    data-section="2"><Work /></section>
      <section id="journey" data-section="3"><Journey /></section>
      <section id="contact" data-section="4"><Contact /></section>
    </main>
  )
}
