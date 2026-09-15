
'use client'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }

    document.addEventListener('mousemove', onMouseMove)

    let animationFrameId: number

    function animate() {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    const onMouseEnter = () => ringRef.current?.classList.add('hovering')
    const onMouseLeave = () => ringRef.current?.classList.remove('hovering')

    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement
      if (target?.closest && target.closest('a, button, [role="button"]')) {
        onMouseEnter()
      }
    })

    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement
      if (target?.closest && target.closest('a, button, [role="button"]')) {
        onMouseLeave()
      }
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
