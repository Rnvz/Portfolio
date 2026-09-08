'use client'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide default cursor on devices that support hover
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
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    document.addEventListener('mousemove', onMouseMove)

    let animationFrameId: number

    function animate() {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    const onMouseEnter = () => ringRef.current?.classList.add('hovering')
    const onMouseLeave = () => ringRef.current?.classList.remove('hovering')

    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button')) {
        onMouseEnter()
      }
    })

    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button')) {
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
