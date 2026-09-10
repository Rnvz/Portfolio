'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PROJECTS } from '@/lib/constants'

const CATEGORIES = ['ALL', 'FULL STACK', 'UI/UX', 'AI ENGINEERING', 'EXPERIMENTS']

export const Work = () => {
  const [view, setView] = useState<'idle' | 'nav' | 'detail'>('idle')
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
    if (view === 'idle') return
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1))
  }, [view, filteredProjects.length])

  const handleDown = useCallback(() => {
    if (view === 'idle') return
    setSelectedIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0))
  }, [view, filteredProjects.length])

  const handleLeft = useCallback(() => {
    if (view === 'idle') return
    setActiveCategory((prev) => {
      const idx = CATEGORIES.indexOf(prev)
      return idx > 0 ? CATEGORIES[idx - 1] : CATEGORIES[CATEGORIES.length - 1]
    })
    setSelectedIndex(0)
  }, [view])

  const handleRight = useCallback(() => {
    if (view === 'idle') return
    setActiveCategory((prev) => {
      const idx = CATEGORIES.indexOf(prev)
      return idx < CATEGORIES.length - 1 ? CATEGORIES[idx + 1] : CATEGORIES[0]
    })
    setSelectedIndex(0)
  }, [view])

  const handleCenter = useCallback(() => {
    if (view === 'idle') {
      setView('nav')
    } else if (view === 'nav') {
      setView('detail')
    } else if (view === 'detail') {
      // In detail view, maybe open link? Or do nothing?
      // User can click the "Inspect Project" button to visit the link.
      // Or we can open it here:
      if (selectedProject.live) window.open(selectedProject.live, '_blank')
      else if (selectedProject.github) window.open(selectedProject.github, '_blank')
    }
  }, [view, selectedProject])

  const handleMenu = useCallback(() => {
    if (view === 'detail') setView('nav')
    else if (view === 'nav') setView('idle')
  }, [view])

  const handleBack = useCallback(() => {
    if (view === 'detail') setView('nav')
    else if (view === 'nav') setView('idle')
  }, [view])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); handleUp() }
      if (e.key === 'ArrowDown') { e.preventDefault(); handleDown() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); handleLeft() }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleRight() }
      if (e.key === 'Enter') { e.preventDefault(); handleCenter() }
      if (e.key === 'Escape') { e.preventDefault(); handleBack() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleUp, handleDown, handleLeft, handleRight, handleCenter, handleBack])

  return (
    <section 
      id="work" 
      className="relative w-full min-h-screen flex items-center justify-center py-[var(--section-py)] px-[var(--section-px)]"
    >
      <SectionLabel text="03 — WORK" />

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
        
        {/* LEFT SIDE — Project Navigator (iPod) */}
        <div className="w-full flex justify-center xl:justify-start relative z-10 order-2 xl:order-1">
          {/* Device Shell (Original iPod Size) */}
          <div className="bg-[var(--surface)] border border-[var(--border-mid)] rounded-[3rem] w-full max-w-[540px] h-auto xl:h-[820px] flex flex-col p-6 shadow-2xl relative transition-all">
            
            {/* Screen Area */}
            <div className="w-full h-[360px] xl:h-[440px] bg-[#0a0a0a] rounded-2xl border border-[var(--border)] relative overflow-hidden flex flex-col shadow-inner shrink-0 p-4">
              
              {/* Screen reflection/glare */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-20"></div>
              
              {/* Status Bar */}
              <div className="flex justify-between items-center mb-4 relative z-30">
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

              <div className="flex-1 relative z-30 overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                  {view === 'idle' ? (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="absolute inset-0 flex flex-col justify-center items-center pt-4"
                    >
                      <div className="flex items-end gap-1.5 h-10 mb-5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            animate={shouldReduceMotion ? {} : { height: ['20%', '100%', '40%', '80%', '20%'] }}
                            transition={{ duration: 1.5 + (i * 0.2), repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1.5 bg-[var(--accent-warm)] rounded-t-sm"
                            style={shouldReduceMotion ? { height: '100%' } : {}}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-widest mb-1.5">Now Playing</span>
                      <span className="font-display text-lg text-[var(--text-primary)] mb-12">Selected Work.</span>

                      <motion.div 
                        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-3 absolute bottom-[15%]"
                      >
                        <div className="w-10 h-10 rounded-full border-2 border-[var(--border-mid)] flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-warm)]"></div>
                        </div>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Press Center to Open</span>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="nav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="flex flex-col h-full w-full"
                    >
                      {/* Categories */}
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-2 border-b border-[var(--border)] shrink-0">
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
                                <div className={`w-1.5 h-1.5 rounded-full z-10 shrink-0 ${isActive ? 'bg-[var(--accent-warm)]' : 'bg-[var(--border-mid)]'}`} />
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls Area */}
            <div className="flex-1 w-full flex flex-col items-center justify-center pt-8 pb-4 gap-8">
              
              {/* MENU & BACK Buttons */}
              <div className="w-full flex justify-between px-8">
                <button 
                  onClick={handleMenu}
                  className="px-6 py-2 rounded-full border border-[var(--border-mid)] bg-black/20 text-[10px] font-mono tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-warm)] transition-all shadow-inner active:scale-95"
                >
                  MENU
                </button>
                <button 
                  onClick={handleBack}
                  className="px-6 py-2 rounded-full border border-[var(--border-mid)] bg-black/20 text-[10px] font-mono tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-warm)] transition-all shadow-inner active:scale-95"
                >
                  BACK
                </button>
              </div>

              {/* Click Wheel Area */}
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full border border-[var(--border-mid)] bg-[#111] shadow-xl relative overflow-hidden shrink-0">
                
                {/* Diagonal Borders Background */}
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-50">
                  <div className="w-[150%] h-px bg-[var(--border-mid)] rotate-45 absolute" />
                  <div className="w-[150%] h-px bg-[var(--border-mid)] -rotate-45 absolute" />
                </div>
                
                {/* UP Arrow (Top Slice) */}
                <button 
                  onClick={handleUp} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-start justify-center pt-6 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }}
                  aria-label="Previous project"
                >
                  <svg className="w-6 h-6 group-active:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/></svg>
                </button>
                
                {/* RIGHT Arrow (Right Slice) */}
                <button 
                  onClick={handleRight} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-center justify-end pr-6 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}
                  aria-label="Next category"
                >
                  <svg className="w-6 h-6 group-active:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
                </button>

                {/* DOWN Arrow (Bottom Slice) */}
                <button 
                  onClick={handleDown} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-end justify-center pb-6 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(100% 100%, 0 100%, 50% 50%)' }}
                  aria-label="Next project"
                >
                  <svg className="w-6 h-6 group-active:translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                </button>

                {/* LEFT Arrow (Left Slice) */}
                <button 
                  onClick={handleLeft} 
                  className="absolute inset-0 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.08)] flex items-center justify-start pl-6 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors z-10"
                  style={{ clipPath: 'polygon(0 100%, 0 0, 50% 50%)' }}
                  aria-label="Previous category"
                >
                  <svg className="w-6 h-6 group-active:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6-1.41 1.41z"/></svg>
                </button>

                {/* CENTER (ACC) Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <button 
                    onClick={handleCenter}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[var(--border-mid)] bg-[var(--surface)] shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] active:scale-95 transition-all pointer-events-auto"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-current opacity-70" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE — Dynamic Area (Overview vs Detail) */}
        <div className="w-full flex flex-col order-1 xl:order-2 justify-center">
          <AnimatePresence mode="wait">
            {(view === 'idle' || view === 'nav') ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full h-full justify-center items-start xl:items-end xl:text-right"
              >
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 leading-tight">
                  Selected Work.
                </h2>
                <p className="text-[var(--text-secondary)] font-light text-base md:text-lg max-w-md mb-12 leading-relaxed">
                  A curated collection of projects spanning full-stack development,
                  UI/UX design, and AI engineering.
                </p>

                {/* Mini Stats */}
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-start xl:items-end">
                    <span className="font-mono text-3xl text-[var(--accent-warm)]">{PROJECTS.length}</span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-2">Projects</span>
                  </div>
                  <div className="w-px h-10 bg-[var(--border)]"></div>
                  <div className="flex flex-col items-start xl:items-end">
                    <span className="font-mono text-3xl text-[var(--accent-warm)]">{new Set(PROJECTS.flatMap(p => p.stack)).size}+</span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-2">Technologies</span>
                  </div>
                  <div className="w-px h-10 bg-[var(--border)]"></div>
                  <div className="flex flex-col items-start xl:items-end">
                    <span className="font-mono text-3xl text-[var(--accent-warm)]">3</span>
                    <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-2">Domains</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full h-full pb-8 xl:pb-0"
              >
                
                {/* TOP SECTION: Text & Image */}
                <div className="flex flex-col lg:flex-row gap-12 mb-12 pt-8 xl:pt-0">
                  
                  {/* Text Info */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <span className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] tracking-widest uppercase">
                        Work / {String(globalIndex + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-[var(--text-primary)] mb-6 tracking-wide uppercase leading-none">
                      {selectedProject.title}
                    </h2>
                    
                    <p className="text-[var(--text-secondary)] font-light text-base max-w-lg mb-8 leading-relaxed">
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
                  <div className="w-full lg:w-[320px] shrink-0 mt-8 lg:mt-0">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-[var(--border)] pt-8 mt-auto">
                  
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
                    <div className="mt-auto pt-4 pb-2">
                      <a 
                        href={selectedProject.live || selectedProject.github || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-mid)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] transition-colors rounded-full"
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
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
