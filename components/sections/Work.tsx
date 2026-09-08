'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TechBadge } from '@/components/ui/TechBadge'
import { PROJECTS } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// SVG icons representing each project type
const PROJECT_ICONS: Record<string, React.ReactNode> = {
  pni: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
    </svg>
  ),
  serenity: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  beema: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
  'supreme-court': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  gym: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  ),
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  
  type ViewState = 'idle' | 'grid' | 'detail'
  const [view, setView] = useState<ViewState>('idle')
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // Auto-scroll selected item in grid
  useEffect(() => {
    if (view === 'grid') {
      const el = document.getElementById(`project-${selectedIndex}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [selectedIndex, view])

  const selectedProject = PROJECTS[selectedIndex]

  const handleMenu = () => {
    setView('idle')
  }

  const handleBack = () => {
    if (view === 'detail') setView('grid')
    else if (view === 'grid') setView('idle')
  }

  const handleUp = () => {
    if (view === 'grid') setSelectedIndex(i => Math.max(0, i - 2))
    else if (view === 'detail') {
      const el = document.getElementById('detail-scroll')
      if (el) el.scrollTop -= 50
    }
  }

  const handleDown = () => {
    if (view === 'grid') setSelectedIndex(i => Math.min(PROJECTS.length - 1, i + 2))
    else if (view === 'detail') {
      const el = document.getElementById('detail-scroll')
      if (el) el.scrollTop += 50
    }
  }

  const handleLeft = () => {
    if (view === 'grid') setSelectedIndex(i => Math.max(0, i - 1))
    else if (view === 'detail') setSelectedIndex(i => Math.max(0, i - 1))
  }

  const handleRight = () => {
    if (view === 'grid') setSelectedIndex(i => Math.min(PROJECTS.length - 1, i + 1))
    else if (view === 'detail') setSelectedIndex(i => Math.min(PROJECTS.length - 1, i + 1))
  }

  const handleCenter = () => {
    if (view === 'idle') setView('grid')
    else if (view === 'grid') setView('detail')
  }

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(section.querySelector('.work-content'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    )
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-[var(--scene-work)] flex flex-col justify-center px-[var(--section-px)] py-[var(--section-py)]">
      <div className="absolute top-[var(--section-py)] left-[var(--section-px)] z-10">
        <SectionLabel text="03 — Work" accent="warm" />
      </div>

      <div className="work-content max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center pt-16 md:pt-0">
        
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        {/* LEFT — Interactive MP3 Player Panel */}
        <div className="order-2 md:order-1 flex items-center justify-center min-h-[820px] w-full relative">
          
          <div className="bg-[var(--surface)] border border-[var(--border-mid)] rounded-[3rem] w-full max-w-[480px] h-[820px] flex flex-col p-6 shadow-2xl relative">
            
            {/* MP3 Player Screen */}
            <div className="w-full h-[440px] bg-[#0a0a0a] rounded-2xl border border-[var(--border)] relative overflow-hidden flex flex-col shadow-inner shrink-0">
              {/* Screen reflection/glare */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-20"></div>
              
              {/* Status Bar */}
              <div className="flex justify-between items-center px-5 py-3 text-[9px] text-[var(--text-dim)] font-mono uppercase shrink-0 relative z-10 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/[0.05]">
                <span>Projects</span>
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <div className="w-5 h-2.5 rounded-[2px] border border-[var(--text-dim)] p-[1px] flex items-center">
                    <div className="w-full h-full bg-[var(--text-dim)] rounded-[1px]"></div>
                  </div>
                </div>
              </div>

              {/* Dynamic Screen Content */}
              <div className="flex-1 relative z-10 overflow-hidden bg-[#0a0a0a]">
                <AnimatePresence mode="wait">
                  {view === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="absolute inset-0 flex flex-col justify-center items-center pt-8"
                    >
                      <div className="flex items-end gap-1.5 h-10 mb-5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
                            transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1.5 bg-[var(--accent-warm)] rounded-t-sm"
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-widest mb-1.5">Now Playing</span>
                      <span className="font-display text-base text-[var(--text-primary)] mb-12">Selected Work.</span>

                      {/* Interaction Guide */}
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-3 absolute bottom-12"
                      >
                        <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-warm)]"></div>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)]">Press Center to Open</span>
                      </motion.div>
                    </motion.div>
                  )}

                  {view === 'grid' && (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="absolute inset-0 overflow-y-auto no-scrollbar p-5 grid grid-cols-2 gap-4 pb-10 content-start"
                    >
                      {PROJECTS.map((project, i) => (
                        <div
                          id={`project-${i}`}
                          key={project.id}
                          className={`p-5 rounded-xl border transition-colors flex flex-col items-center gap-4 ${
                            selectedIndex === i 
                              ? 'border-[var(--accent-warm)] bg-[rgba(255,255,255,0.08)]' 
                              : 'border-[var(--border)] opacity-40'
                          }`}
                        >
                          <div className={`w-14 h-14 flex items-center justify-center transition-colors ${
                            selectedIndex === i ? 'text-[var(--accent-warm)]' : 'text-white'
                          }`}>
                            {PROJECT_ICONS[project.id] || (
                              <span className="font-display text-2xl">{project.title.charAt(0)}</span>
                            )}
                          </div>
                          <span className={`text-[11px] text-center font-display leading-tight ${
                            selectedIndex === i ? 'text-white' : 'text-[var(--text-secondary)]'
                          }`}>
                            {project.title}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {view === 'detail' && selectedProject && (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      id="detail-scroll"
                      className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col pb-8 bg-[#0a0a0a]"
                    >
                      <div className="w-full h-40 md:h-48 relative shrink-0">
                        <Image
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-6 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] font-mono text-[var(--accent-warm)]">{selectedProject.year}</span>
                          <span className="text-[10px] font-mono border border-[var(--border)] rounded px-2 py-0.5 text-[var(--text-secondary)]">{selectedProject.role}</span>
                        </div>
                        <span className="text-lg font-display text-white mb-2 leading-snug">{selectedProject.title}</span>
                        <span className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">{selectedProject.description}</span>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {selectedProject.stack.map(tech => (
                            <span key={tech} className="text-[10px] border border-[var(--border)] bg-black/20 rounded px-2 py-1 text-[var(--text-dim)]">{tech}</span>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-auto">
                          {selectedProject.live ? (
                             <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono uppercase bg-[var(--accent-warm)] text-black px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">Visit Site</a>
                          ) : selectedProject.github ? (
                             <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono uppercase border border-[var(--border)] text-[var(--text-secondary)] px-5 py-2.5 rounded-full hover:text-white transition-colors">GitHub</a>
                          ) : (
                             <span className="text-[11px] font-mono uppercase border border-[var(--border)] text-[var(--text-dim)] px-5 py-2.5 rounded-full">Private</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Controls Area */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 mt-8">
              
              {/* Separate MENU & BACK Buttons */}
              <div className="flex items-center gap-12">
                <button 
                  onClick={handleMenu}
                  className="px-6 py-2 rounded-full border border-[var(--border)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-dim)] hover:text-white hover:border-[var(--border-mid)] hover:bg-[rgba(255,255,255,0.02)] active:scale-95 transition-all shadow-sm"
                >
                  Menu
                </button>
                <button 
                  onClick={handleBack}
                  className="px-6 py-2 rounded-full border border-[var(--border)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-dim)] hover:text-white hover:border-(--border-mid) hover:bg-[rgba(255,255,255,0.02)] active:scale-95 transition-all shadow-sm"
                >
                  Back
                </button>
              </div>

              {/* Pie-Slice Click Wheel (D-Pad) */}
              <div className="w-56 h-56 md:w-60 md:h-60 rounded-full border border-[var(--border-mid)] bg-[#111] shadow-xl relative overflow-hidden">
                
                {/* Diagonal Borders Background */}
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[150%] h-px bg-[var(--border-mid)] rotate-45 absolute" />
                  <div className="w-[150%] h-px bg-[var(--border-mid)] -rotate-45 absolute" />
                </div>
                
                {/* UP Arrow (Top Slice) */}
                <button 
                  onClick={handleUp} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-start justify-center pt-5 text-[var(--text-dim)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }}
                >
                  <svg className="w-5 h-5 group-active:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/></svg>
                </button>
                
                {/* RIGHT Arrow (Right Slice) */}
                <button 
                  onClick={handleRight} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-center justify-end pr-5 text-[var(--text-dim)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}
                >
                  <svg className="w-5 h-5 group-active:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </button>

                {/* DOWN Arrow (Bottom Slice) */}
                <button 
                  onClick={handleDown} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-end justify-center pb-5 text-[var(--text-dim)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(100% 100%, 0 100%, 50% 50%)' }}
                >
                  <svg className="w-5 h-5 group-active:translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                </button>

                {/* LEFT Arrow (Left Slice) */}
                <button 
                  onClick={handleLeft} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-center justify-start pl-5 text-[var(--text-dim)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(0 100%, 0 0, 50% 50%)' }}
                >
                  <svg className="w-5 h-5 group-active:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6-1.41 1.41z"/></svg>
                </button>

                {/* CENTER (ACC) Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <button 
                    onClick={handleCenter}
                    className="w-16 h-16 rounded-full border border-[var(--border-mid)] bg-[var(--surface)] shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] active:scale-95 transition-all pointer-events-auto"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-current opacity-70" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* RIGHT — Title & Description */}
        <div className="order-1 md:order-2 flex flex-col items-start md:items-end md:text-right">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text-primary)] mb-4 leading-tight">
            Selected Work.
          </h2>
          <p className="text-[var(--text-secondary)] font-light text-base md:text-lg max-w-md mb-8 leading-relaxed">
            A curated collection of projects spanning full-stack development,
            UI/UX design, and AI engineering.
          </p>

          {/* Mini Stats */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center md:items-end">
              <span className="font-mono text-2xl text-[var(--accent-warm)]">{PROJECTS.length}</span>
              <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider mt-1">Projects</span>
            </div>
            <div className="w-px h-8 bg-[var(--border)]"></div>
            <div className="flex flex-col items-center md:items-end">
              <span className="font-mono text-2xl text-[var(--accent-warm)]">{new Set(PROJECTS.flatMap(p => p.stack)).size}+</span>
              <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider mt-1">Technologies</span>
            </div>
            <div className="w-px h-8 bg-[var(--border)]"></div>
            <div className="flex flex-col items-center md:items-end">
              <span className="font-mono text-2xl text-[var(--accent-warm)]">3</span>
              <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider mt-1">Domains</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
