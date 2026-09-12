'use client'
import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  
  const [isOn, setIsOn] = useState(false)
  const [shape, setShape] = useState(1) // 1: circle, 2: rect
  
  const mode = isOn ? shape : 0
  const modeRef = useRef(0)

  useEffect(() => {
    modeRef.current = mode
    if (!ringRef.current) return
    
    if (mode > 0) {
      const main = document.querySelector('main')
      if (!main) return
      
      const clone = main.cloneNode(true) as HTMLElement
      clone.id = 'magnifier-clone'
      const clonedCursors = clone.querySelectorAll('.cursor-dot, .cursor-ring')
      clonedCursors.forEach(c => (c as HTMLElement).style.display = 'none')
      
      const bodyBg = getComputedStyle(document.body).backgroundColor
      
      let vpClone = ringRef.current.querySelector('#viewport-clone') as HTMLElement
      if (!vpClone) {
        vpClone = document.createElement('div')
        vpClone.id = 'viewport-clone'
        vpClone.style.position = 'absolute'
        vpClone.style.top = '0'
        vpClone.style.left = '0'
        vpClone.style.width = window.innerWidth + 'px'
        vpClone.style.height = window.innerHeight + 'px'
        vpClone.style.overflow = 'hidden'
        vpClone.style.transformOrigin = '0 0'
        vpClone.style.pointerEvents = 'none'
        ringRef.current.appendChild(vpClone)
      }
      
      vpClone.style.backgroundColor = bodyBg
      vpClone.innerHTML = ''
      vpClone.appendChild(clone)
      ringRef.current.style.background = bodyBg
    } else {
      const vpClone = ringRef.current.querySelector('#viewport-clone')
      if (vpClone) vpClone.remove()
      ringRef.current.style.background = 'transparent'
    }
  }, [mode])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'm') setIsOn(prev => !prev)
      if (key === 's') setShape(prev => prev === 1 ? 2 : 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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
        
        if (modeRef.current > 0) {
          const vpClone = ringRef.current.querySelector('#viewport-clone') as HTMLElement
          if (vpClone) {
            const S = 1.4; 
            const Rx = modeRef.current === 1 ? 120 : 250; 
            const Ry = modeRef.current === 1 ? 120 : 70;  
            vpClone.style.transform = `translate3d(${Rx - ringX * S}px, ${Ry - ringY * S}px, 0) scale(${S})`
            
            const cloneMain = vpClone.querySelector('#magnifier-clone') as HTMLElement
            if (cloneMain) {
              cloneMain.style.transform = `translateY(-${window.scrollY}px)`
            }
          }
        }
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
      <div ref={dotRef} className={`cursor-dot ${mode > 0 ? 'opacity-0' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${mode > 0 ? `magnifier-${mode}` : ''}`} />
    </>
  )
}
