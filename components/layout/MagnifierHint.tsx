'use client'

import { useEffect, useState } from 'react'

export function MagnifierHint() {
  const [mounted, setMounted] = useState(false)
  const [isOn, setIsOn] = useState(false)
  const [shape, setShape] = useState(1) // 1: circle, 2: rect

  useEffect(() => {
    setMounted(true)
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'm') setIsOn(prev => !prev)
      if (key === 's') setShape(prev => prev === 1 ? 2 : 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!mounted) return null

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-4 bg-[#111] border border-[rgba(255,255,255,0.1)] px-5 py-2.5 rounded-full shadow-2xl pointer-events-none transition-all">
      
      {/* On/Off Toggle */}
      <div className="flex items-center gap-3 border-r border-[rgba(255,255,255,0.1)] pr-4">
        <span className="font-mono text-[10px] text-white uppercase tracking-widest font-medium">Lens</span>
        <kbd className={`px-2 py-1 rounded text-[10px] font-bold shadow-sm transition-all ${
          isOn 
            ? 'bg-[var(--accent-warm)] text-black shadow-[0_0_10px_var(--accent-warm-glow)]' 
            : 'bg-[rgba(255,255,255,0.1)] text-[#ccc]'
        }`}>
          M
        </kbd>
      </div>

      {/* Shape Toggle */}
      <div className={`flex items-center gap-3 transition-opacity ${isOn ? 'opacity-100' : 'opacity-40'}`}>
        <span className="font-mono text-[10px] text-white uppercase tracking-widest font-medium">
          {shape === 1 ? 'Circle' : 'Rect'}
        </span>
        <kbd className="bg-[rgba(255,255,255,0.1)] text-[#ccc] px-2 py-1 rounded text-[10px] font-bold shadow-sm border border-[rgba(255,255,255,0.05)]">
          S
        </kbd>
      </div>

    </div>
  )
}
