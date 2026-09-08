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
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
    </svg>
  ),
  serenity: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  beema: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  ),
  'supreme-court': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21h-7.5a2.25 2.25 0 0 1-2.25-2.25V6.75a2.25 2.25 0 0 1 2.25-2.25h7.5a2.25 2.25 0 0 1 2.25 2.25v12.015a2.25 2.25 0 0 1-2.25 2.25Zm-2.25-5.25h.008v.008H13.5v-.008Zm0-3h.008v.008H13.5v-.008Zm0-3h.008v.008H13.5v-.008Zm0-3h.008v.008H13.5v-.008Z" />
    </svg>
  ),
  gym: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  nofake: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  peluangnusantara: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  )
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
      const scrollToSelected = () => {
        const el = document.getElementById(`project-${selectedIndex}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        }
      }
      
      scrollToSelected()
      
      // Wait for framer-motion AnimatePresence mode="wait" to mount the component
      const timer = setTimeout(scrollToSelected, 250)
      return () => clearTimeout(timer)
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
    if (view === 'grid') setSelectedIndex(i => Math.max(0, i - 1))
    else if (view === 'detail') {
      const el = document.getElementById('detail-scroll')
      if (el) el.scrollTop -= 50
    }
  }

  const handleDown = () => {
    if (view === 'grid') setSelectedIndex(i => Math.min(PROJECTS.length - 1, i + 1))
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
              <div className="flex justify-between items-center px-5 py-3 text-[10px] font-medium text-[var(--text-secondary)] font-mono uppercase shrink-0 relative z-10 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/[0.05]">
                <span>Projects</span>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <div className="w-6 h-3 rounded-[2px] border border-[var(--text-secondary)] p-[1px] flex items-center">
                    <div className="w-full h-full bg-[var(--text-secondary)] rounded-[1px]"></div>
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
                      <span className="font-mono text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Now Playing</span>
                      <span className="font-display text-lg text-[var(--text-primary)] mb-12">Selected Work.</span>

                      {/* Interaction Guide */}
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-3 absolute bottom-12"
                      >
                        <div className="w-10 h-10 rounded-full border-2 border-[var(--border-mid)] flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-warm)]"></div>
                        </div>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Press Center to Open</span>
                      </motion.div>
                    </motion.div>
                  )}

                  {view === 'grid' && (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="absolute inset-0 overflow-x-auto no-scrollbar flex items-center pt-8"
                      style={{ scrollSnapType: 'x mandatory' }}
                    >
                      <div className="flex px-[60px] gap-8 pb-8">
                        {PROJECTS.map((project, i) => (
                          <div
                            id={`project-${i}`}
                            key={project.id}
                            className="w-[140px] shrink-0 flex flex-col items-center justify-center"
                            style={{ scrollSnapAlign: 'center' }}
                          >
                            <div className={`p-6 rounded-3xl border transition-all duration-300 w-full flex flex-col items-center gap-6 ${
                              selectedIndex === i 
                                ? 'border-[var(--accent-warm)] bg-[rgba(255,255,255,0.08)] scale-110 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                                : 'border-[var(--border)] opacity-30 scale-90'
                            }`}>
                              <div className={`w-12 h-12 flex items-center justify-center transition-colors ${
                                selectedIndex === i ? 'text-[var(--accent-warm)]' : 'text-white'
                              }`}>
                                {PROJECT_ICONS[project.id]}
                              </div>
                            </div>
                            <div className="mt-8 text-center h-12 w-[180px]">
                              <span className={`block text-[13px] font-semibold font-display transition-colors duration-300 ${
                                selectedIndex === i ? 'text-[var(--text-primary)]' : 'text-transparent'
                              }`}>
                                {project.title}
                              </span>
                              <span className={`block text-[9px] font-mono uppercase tracking-widest mt-1.5 transition-colors duration-300 ${
                                selectedIndex === i ? 'text-[var(--text-secondary)]' : 'text-transparent'
                              }`}>
                                {project.subtitle}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
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
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[12px] font-mono text-[var(--accent-warm)]">{selectedProject.year}</span>
                          <span className="text-[11px] font-mono border border-[var(--border)] rounded px-2 py-0.5 text-[var(--text-secondary)]">{selectedProject.role}</span>
                        </div>
                        <span className="text-xl md:text-2xl font-display text-white mb-3 leading-snug">{selectedProject.title}</span>
                        <span className="text-[13px] md:text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">{selectedProject.description}</span>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {selectedProject.stack.map(tech => (
                            <span key={tech} className="text-[10px] border border-[var(--border)] bg-black/20 rounded px-2 py-1 text-[var(--text-secondary)]">{tech}</span>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-auto">
                          {selectedProject.live ? (
                             <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono uppercase bg-[var(--accent-warm)] text-black px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">Visit Site</a>
                          ) : selectedProject.github ? (
                             <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono uppercase border border-[var(--border)] text-[var(--text-secondary)] px-5 py-2.5 rounded-full hover:text-white transition-colors">GitHub</a>
                          ) : (
                             <span className="text-[11px] font-mono uppercase border border-[var(--border)] text-[var(--text-secondary)] px-5 py-2.5 rounded-full">Private</span>
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
                  className="px-6 py-2 rounded-full border border-[var(--border)] text-[11px] font-semibold font-mono uppercase tracking-widest text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-mid)] hover:bg-[rgba(255,255,255,0.02)] active:scale-95 transition-all shadow-sm"
                >
                  Menu
                </button>
                <button 
                  onClick={handleBack}
                  className="px-6 py-2 rounded-full border border-[var(--border)] text-[11px] font-semibold font-mono uppercase tracking-widest text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-mid)] hover:bg-[rgba(255,255,255,0.02)] active:scale-95 transition-all shadow-sm"
                >
                  Back
                </button>
              </div>

              {/* Pie-Slice Click Wheel (D-Pad) */}
              <div className="w-48 h-48 md:w-52 md:h-52 rounded-full border border-[var(--border-mid)] bg-[#111] shadow-xl relative overflow-hidden shrink-0">
                
                {/* Diagonal Borders Background */}
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[150%] h-px bg-[var(--border-mid)] rotate-45 absolute" />
                  <div className="w-[150%] h-px bg-[var(--border-mid)] -rotate-45 absolute" />
                </div>
                
                {/* UP Arrow (Top Slice) */}
                <button 
                  onClick={handleUp} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-start justify-center pt-5 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }}
                >
                  <svg className="w-5 h-5 group-active:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/></svg>
                </button>
                
                {/* RIGHT Arrow (Right Slice) */}
                <button 
                  onClick={handleRight} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-center justify-end pr-5 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}
                >
                  <svg className="w-5 h-5 group-active:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </button>

                {/* DOWN Arrow (Bottom Slice) */}
                <button 
                  onClick={handleDown} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-end justify-center pb-5 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(100% 100%, 0 100%, 50% 50%)' }}
                >
                  <svg className="w-5 h-5 group-active:translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                </button>

                {/* LEFT Arrow (Left Slice) */}
                <button 
                  onClick={handleLeft} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-center justify-start pl-5 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(0 100%, 0 0, 50% 50%)' }}
                >
                  <svg className="w-5 h-5 group-active:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6-1.41 1.41z"/></svg>
                </button>

                {/* CENTER (ACC) Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <button 
                    onClick={handleCenter}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[var(--border-mid)] bg-[var(--surface)] shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] active:scale-95 transition-all pointer-events-auto"
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
              <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-1">Projects</span>
            </div>
            <div className="w-px h-8 bg-[var(--border)]"></div>
            <div className="flex flex-col items-center md:items-end">
              <span className="font-mono text-2xl text-[var(--accent-warm)]">{new Set(PROJECTS.flatMap(p => p.stack)).size}+</span>
              <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-1">Technologies</span>
            </div>
            <div className="w-px h-8 bg-[var(--border)]"></div>
            <div className="flex flex-col items-center md:items-end">
              <span className="font-mono text-2xl text-[var(--accent-warm)]">3</span>
              <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-1">Domains</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
