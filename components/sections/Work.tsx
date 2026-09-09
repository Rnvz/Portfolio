'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PROJECTS } from '@/lib/constants'

const CATEGORIES = ['ALL', 'FULL STACK', 'UI/UX', 'AI ENGINEERING', 'EXPERIMENTS']

export const Work = () => {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return PROJECTS
    return PROJECTS.filter(p => p.category === activeCategory)
  }, [activeCategory])

  const selectedProject = filteredProjects[selectedIndex] || PROJECTS[0]
  const globalIndex = PROJECTS.findIndex(p => p.id === selectedProject.id)

  const handleUp = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1))
  }, [filteredProjects.length])

  const handleDown = useCallback(() => {
    setSelectedIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0))
  }, [filteredProjects.length])

  const handleLeft = useCallback(() => {
    setActiveCategory((prev) => {
      const idx = CATEGORIES.indexOf(prev)
      return idx > 0 ? CATEGORIES[idx - 1] : CATEGORIES[CATEGORIES.length - 1]
    })
    setSelectedIndex(0)
  }, [])

  const handleRight = useCallback(() => {
    setActiveCategory((prev) => {
      const idx = CATEGORIES.indexOf(prev)
      return idx < CATEGORIES.length - 1 ? CATEGORIES[idx + 1] : CATEGORIES[0]
    })
    setSelectedIndex(0)
  }, [])

  const handleCenter = useCallback(() => {
    if (selectedProject.live) window.open(selectedProject.live, '_blank')
    else if (selectedProject.github) window.open(selectedProject.github, '_blank')
  }, [selectedProject])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); handleUp() }
      if (e.key === 'ArrowDown') { e.preventDefault(); handleDown() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); handleLeft() }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleRight() }
      if (e.key === 'Enter') { e.preventDefault(); handleCenter() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleUp, handleDown, handleLeft, handleRight, handleCenter])

  return (
    <section 
      id="work" 
      className="relative w-full min-h-screen flex items-center justify-center py-[var(--section-py)] px-[var(--section-px)]"
    >
      <SectionLabel text="03 — WORK" />

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* LEFT SIDE — Project Navigator */}
        <div className="w-full flex justify-center lg:justify-start relative z-10 order-2 lg:order-1">
          {/* Device Shell */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] bg-[var(--surface)] border border-[var(--border-mid)] shadow-2xl overflow-hidden flex flex-col p-4 md:p-6 transition-all">
            
            {/* Screen Area */}
            <div className="relative w-full flex-1 bg-[#0a0a0a] rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              
              {/* Status Bar */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest uppercase">Projects</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest">
                    {String(globalIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full border border-[var(--text-secondary)] flex items-center justify-center">
                      <div className="w-1 h-1 bg-[var(--text-secondary)] rounded-full" />
                    </div>
                    <div className="w-4 h-2 border border-[var(--text-secondary)] rounded-[2px] relative before:absolute before:right-[-2px] before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-1 before:bg-[var(--text-secondary)]"></div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-2 border-b border-[var(--border)]">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSelectedIndex(0); }}
                    className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors ${
                      activeCategory === cat ? 'bg-[var(--text-primary)] text-black' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Navigator Content */}
              <div className="flex-1 grid grid-cols-2 gap-4 h-full overflow-hidden">
                {/* List Column */}
                <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar pr-2 relative">
                  <div className="absolute left-[15px] top-0 bottom-0 w-px bg-[var(--border)] -z-10" />
                  {filteredProjects.map((p, idx) => {
                    const isActive = idx === selectedIndex;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedIndex(idx)}
                        className={`flex items-center gap-4 py-2 group text-left ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'} transition-opacity`}
                      >
                        <span className={`font-mono text-[9px] tracking-widest w-4 ${isActive ? 'text-[var(--accent-warm)]' : 'text-[var(--text-secondary)]'}`}>
                          {String(PROJECTS.findIndex(proj => proj.id === p.id) + 1).padStart(2, '0')}
                        </span>
                        <div className={`w-1.5 h-1.5 rounded-full z-10 ${isActive ? 'bg-[var(--accent-warm)]' : 'bg-[var(--border-mid)]'}`} />
                        <span className={`font-mono text-[11px] uppercase tracking-wider truncate flex-1 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                          {p.title}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Preview Column */}
                <div className="flex flex-col h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedProject.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full"
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] mb-4">
                        <Image
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          fill
                          className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
                        />
                      </div>
                      <div className="mt-auto">
                        <h4 className="font-mono text-[10px] text-[var(--text-primary)] uppercase tracking-widest mb-1 truncate">
                          {selectedProject.title}
                        </h4>
                        <p className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-wider mb-3 truncate">
                          {selectedProject.category} · {selectedProject.year}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${selectedProject.status === 'PRODUCTION' ? 'bg-[var(--accent-warm)]' : 'bg-green-500'}`} />
                          <span className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-widest">
                            {selectedProject.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Controls Area */}
            <div className="pt-6 pb-2 px-2 flex flex-col items-center gap-6">
              
              {/* Buttons */}
              <div className="w-full flex justify-between px-4">
                <button 
                  onClick={() => setActiveCategory('ALL')}
                  className="px-4 py-1.5 rounded-full border border-[var(--border-mid)] bg-black/20 text-[9px] font-mono tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-warm)] transition-all shadow-inner active:scale-95"
                >
                  MENU
                </button>
                <button 
                  onClick={() => setSelectedIndex(0)}
                  className="px-4 py-1.5 rounded-full border border-[var(--border-mid)] bg-black/20 text-[9px] font-mono tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-warm)] transition-all shadow-inner active:scale-95"
                >
                  BACK
                </button>
              </div>

              {/* D-Pad */}
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                {/* D-Pad SVG Background */}
                <svg className="absolute inset-0 w-full h-full text-[var(--border-mid)] opacity-50 drop-shadow-xl" viewBox="0 0 100 100">
                  <path d="M35 5 h30 a5 5 0 0 1 5 5 v25 h25 a5 5 0 0 1 5 5 v30 a5 5 0 0 1 -5 5 h-25 v25 a5 5 0 0 1 -5 5 h-30 a5 5 0 0 1 -5 -5 v-25 h-25 a5 5 0 0 1 -5 -5 v-30 a5 5 0 0 1 5 -5 h25 v-25 a5 5 0 0 1 5 -5 z" fill="currentColor" />
                </svg>

                {/* UP */}
                <button onClick={handleUp} className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-12 md:w-12 md:h-14 flex items-start justify-center pt-2 md:pt-3 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors active:translate-y-1 z-10" aria-label="Previous project">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 6.5L6 1.5L11 6.5" stroke="currentColor" strokeWidth="2"/></svg>
                </button>
                {/* DOWN */}
                <button onClick={handleDown} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-12 md:w-12 md:h-14 flex items-end justify-center pb-2 md:pb-3 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors active:-translate-y-1 z-10" aria-label="Next project">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2"/></svg>
                </button>
                {/* LEFT */}
                <button onClick={handleLeft} className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-10 md:w-14 md:h-12 flex items-center justify-start pl-2 md:pl-3 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors active:translate-x-1 z-10" aria-label="Previous category">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M6.5 11L1.5 6L6.5 1" stroke="currentColor" strokeWidth="2"/></svg>
                </button>
                {/* RIGHT */}
                <button onClick={handleRight} className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-10 md:w-14 md:h-12 flex items-center justify-end pr-2 md:pr-3 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors active:-translate-x-1 z-10" aria-label="Next category">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="2"/></svg>
                </button>
                {/* CENTER */}
                <button onClick={handleCenter} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[var(--border-mid)] bg-[var(--surface)] shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] active:scale-95 transition-all z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-current opacity-70" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE — Project Case Study */}
        <div className="w-full flex flex-col order-1 lg:order-2 h-full justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col w-full h-full"
            >
              
              {/* TOP SECTION: Flex layout (Text & Image) */}
              <div className="flex flex-col xl:flex-row gap-12 mb-12">
                
                {/* Text Info */}
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] tracking-widest uppercase">
                      Work / {String(globalIndex + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-4xl md:text-5xl text-[var(--text-primary)] mb-6 tracking-wide uppercase leading-none">
                    {selectedProject.title}
                  </h2>
                  
                  <p className="text-[var(--text-secondary)] font-light text-base max-w-md mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8">
                    <div>
                      <h3 className="font-mono text-[9px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Role</h3>
                      <p className="font-mono text-[11px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.role}</p>
                    </div>
                    <div>
                      <h3 className="font-mono text-[9px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Status</h3>
                      <p className="font-mono text-[11px] text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                        <span className={`text-[9px] ${selectedProject.status === 'PRODUCTION' ? 'text-[var(--accent-warm)]' : 'text-green-500'}`}>●</span> 
                        {selectedProject.status}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-[9px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Period</h3>
                      <p className="font-mono text-[11px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.year}</p>
                    </div>
                    <div>
                      <h3 className="font-mono text-[9px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Visibility</h3>
                      <p className="font-mono text-[11px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.visibility}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-[9px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-3">System</h3>
                    <ul className="space-y-1.5">
                      {selectedProject.system?.map(sys => (
                        <li key={sys} className="flex items-center gap-2">
                          <span className="text-[var(--accent-warm)] text-[10px]">■</span>
                          <span className="font-mono text-[11px] text-[var(--text-primary)] uppercase tracking-wider">{sys}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Floating Preview Image */}
                <div className="w-full xl:w-[320px] shrink-0">
                  <div className="relative w-full aspect-[4/3] bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden mb-3">
                    <div className="absolute top-3 right-3 z-10 font-mono text-[9px] text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                      {String(globalIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                    </div>
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-4 w-full">
                    <span className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-widest whitespace-nowrap">Project Preview</span>
                    <div className="h-px bg-[var(--border)] flex-1"></div>
                  </div>
                </div>

              </div>

              {/* BOTTOM SECTION: 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[var(--border)] pt-8">
                
                {/* Col 1: Built & CTA */}
                <div className="flex flex-col h-full">
                  <h3 className="font-mono text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-4">What Was Built</h3>
                  <div className="flex flex-col gap-2 mb-8">
                    {selectedProject.whatWasBuilt?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="font-mono text-[9px] text-[var(--text-secondary)] mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="font-mono text-[11px] text-[var(--text-primary)] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <a 
                      href={selectedProject.live || selectedProject.github || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent-warm)] text-[10px] font-mono uppercase tracking-widest text-[var(--accent-warm)] hover:bg-[var(--accent-warm)] hover:text-black transition-colors rounded-full"
                    >
                      Inspect Project
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                </div>

                {/* Col 2: Stack */}
                <div>
                  <h3 className="font-mono text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-4">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map(tech => (
                      <span key={tech} className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-primary)] border border-[var(--border)] px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.02)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Col 3: Goal */}
                <div>
                  <h3 className="font-mono text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-4">The Goal</h3>
                  <p className="font-mono text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    {selectedProject.goal}
                  </p>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
