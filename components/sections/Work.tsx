'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PROJECTS } from '@/lib/constants'

const CATEGORIES = ['ALL', 'FULL STACK', 'UI/UX', 'AI ENGINEERING', 'EXPERIMENTS']

const TECH_ICONS: Record<string, string> = {
  "Next.js":        "https://cdn.simpleicons.org/nextdotjs/white",
  "React":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "React TS":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "TypeScript":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "Tailwind":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "TailwindCSS":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Cloudflare D1":  "https://cdn.simpleicons.org/cloudflare/F38020",
  "Resend":         "https://cdn.simpleicons.org/resend/white",
  "Svix":           "https://www.svix.com/icon.svg",
  "Zod":            "https://cdn.simpleicons.org/zod/3068b7",
  "OpenNext":       "https://cdn.simpleicons.org/serverless/FD5750",
  "Figma":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  "Firebase":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  "Midtrans API":   "/icons/midtrans.png",
  "Laravel":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "Laravel 12":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "MySQL":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
  "Blade Templates":"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "Vite":           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg",
  "HTTP":           "https://cdn.simpleicons.org/curl/white",
  "Python":         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Pandas":         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  "Matplotlib":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  "Scikit-learn":   "https://cdn.simpleicons.org/scikitlearn/white",
  "NumPy":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  "Streamlit":      "https://cdn.simpleicons.org/streamlit/white",
  "Optuna":         "https://cdn.simpleicons.org/optuna/white",
  "Node.js":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Prisma":         "https://cdn.simpleicons.org/prisma/white",
  "SQLite":         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
  "HTML5":          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS3":           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "JavaScript":     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "Anaconda":       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg",
  "BioPython":      "/icons/biopython.svg",
  "GSAP":           "https://cdn.simpleicons.org/greensock/white",
  "Framer Motion":  "https://cdn.simpleicons.org/framer/white",
  "Lenis":          "/icons/lenis.png",
  "Vercel":         "https://cdn.simpleicons.org/vercel/white",
  "e-JURA":         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "Git":            "https://cdn.simpleicons.org/git/white",
  "HTML/CSS/JS":    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
}

export const getTechIcon = (tech: string) => {
  if (TECH_ICONS[tech]) return TECH_ICONS[tech];
  const t = tech.toLowerCase();
  if (t.includes("next.js")) return TECH_ICONS["Next.js"];
  if (t.includes("react")) return TECH_ICONS["React"];
  if (t.includes("tailwind")) return TECH_ICONS["Tailwind"];
  if (t.includes("cloudflare")) return TECH_ICONS["Cloudflare D1"];
  if (t.includes("html")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg";
  if (t.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg";
  if (t.includes("js")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg";
  if (t.includes("node.js")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg";
  if (t.includes("prisma")) return "https://cdn.simpleicons.org/prisma/white";
  if (t.includes("sqlite")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg";
  return null;
}

export const Work = () => {
  const [view, setView] = useState<'idle' | 'nav'>('idle')
  const [designLightbox, setDesignLightbox] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [detailTab, setDetailTab] = useState<'OVERVIEW' | 'DEEP DIVE' | 'TECH STACK'>('OVERVIEW')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setDetailTab('OVERVIEW')
  }, [selectedIndex])

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
      
    } else if (view === 'nav') {
      if (selectedProject.url) window.open(selectedProject.url, '_blank')
      else if (selectedProject.github) window.open(selectedProject.github, '_blank')
    }
  }, [view, selectedProject])

  const handleMenu = useCallback(() => {
    if (view === 'nav') setView('idle')
  }, [view])

  const handleBack = useCallback(() => {
    if (view === 'nav') setView('idle')
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
      className="relative w-full min-h-screen flex items-center justify-center py-[var(--section-py)] px-[var(--section-px)]"
    >
      <SectionLabel text="03 — WORK" />

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">
        
        {/* LEFT SIDE — Project Navigator (iPod) */}
        <AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
          className="w-full flex justify-center xl:justify-start relative z-10 order-2 xl:order-1"
        >
          {/* Device Shell (Original iPod Size) */}
          <div className="bg-[var(--surface)] border border-[var(--border-mid)] rounded-[3rem] w-full max-w-[540px] h-auto xl:h-[860px] flex flex-col p-6 pb-12 xl:pb-6 shadow-2xl relative transition-all">
            
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
                              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] mb-4 flex items-center justify-center">
                                {selectedProject.image ? (
                                  <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
                                  />
                                ) : (
                                  <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">No Image</span>
                                )}
                              </div>
                              <div className="mt-auto">
                                <h4 className="font-mono text-[10px] text-[var(--text-primary)] uppercase tracking-widest mb-1 truncate">
                                  {selectedProject.title}
                                </h4>
                                <p className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-wider mb-3 truncate">
                                  {selectedProject.category} · {selectedProject.period}
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-1.5 h-1.5 rounded-full ${selectedProject.status?.toUpperCase() === 'PRODUCTION' ? 'bg-[var(--accent-warm)]' : 'bg-green-500'}`} />
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
            <div className="flex-1 w-full flex flex-col items-center justify-center pt-2 pb-20 xl:pb-24 gap-10">
              
              {/* MENU & BACK Buttons */}
              <div className="w-full flex justify-center gap-12 md:gap-20">
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
        </motion.div>
        </AnimatePresence>

        {/* RIGHT SIDE — Dynamic Area (Overview vs Detail) */}
        <div className={`w-full flex flex-col order-1 xl:order-2 justify-center transition-all duration-700 ${''}`}>
          <AnimatePresence mode="wait">
            {view === 'idle' && (
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
                    <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-2">Projects</span>
                  </div>
                  <div className="w-px h-10 bg-[var(--border)]"></div>
                  <div className="flex flex-col items-start xl:items-end">
                    <span className="font-mono text-3xl text-[var(--accent-warm)]">{new Set(PROJECTS.flatMap(p => p.technologies || [])).size}+</span>
                    <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-2">Technologies</span>
                  </div>
                  <div className="w-px h-10 bg-[var(--border)]"></div>
                  <div className="flex flex-col items-start xl:items-end">
                    <span className="font-mono text-3xl text-[var(--accent-warm)]">3</span>
                    <span className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mt-2">Domains</span>
                  </div>
                </div>
              </motion.div>
            )}
            {view === 'nav' && (
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full h-full pb-8 xl:pb-0 justify-center"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="font-display text-4xl lg:text-5xl xl:text-[3rem] text-[var(--text-primary)] tracking-wide uppercase leading-none">
                    {selectedProject.title}
                  </h2>
                  {selectedProject.designImage && (
                    <button 
                      onClick={() => setDesignLightbox(selectedProject.designImage!)}
                      className="hidden md:inline-flex shrink-0 items-center gap-2 px-4 py-2 border border-[var(--border-mid)] text-[11px] font-mono uppercase tracking-widest text-[var(--text-primary)] hover:border-[var(--accent-warm)] hover:text-[var(--accent-warm)] transition-colors rounded-full"
                    >
                      View Design
                    </button>
                  )}
                </div>
                
                {/* Tabs */}
                <div className="flex gap-6 border-b border-[var(--border)] mb-8">
                  {['OVERVIEW', 'DEEP DIVE', 'TECH STACK'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab as any)}
                      className={`pb-3 font-mono text-xs uppercase tracking-widest transition-all ${
                        detailTab === tab ? 'text-[var(--accent-warm)] border-b-2 border-[var(--accent-warm)]' : 'text-[var(--text-secondary)] hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <AnimatePresence mode="wait">
                  {detailTab === 'OVERVIEW' && (
                    <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-8">
                      <div>
                        <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Overview</h3>
                        <p className="text-[var(--text-secondary)] font-light text-[15px] max-w-2xl leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>

                      {selectedProject.goal && (
                        <div>
                          <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-3">The Goal</h3>
                          <p className="text-[var(--text-secondary)] font-light text-[14px] max-w-2xl leading-relaxed border-l-2 border-[var(--accent-warm)] pl-4">
                            {selectedProject.goal}
                          </p>
                        </div>
                      )}

                      {/* Metadata Grid */}
                      <div className="grid grid-cols-2 gap-y-6 gap-x-6">
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Role</h3>
                          <p className="font-mono text-[13px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.role}</p>
                        </div>
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Status</h3>
                          <p className="font-mono text-[13px] text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                            <span className={`text-[12px] ${selectedProject.status?.toUpperCase() === 'PRODUCTION' ? 'text-[var(--accent-warm)]' : 'text-green-500'}`}>●</span> 
                            {selectedProject.status}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Period</h3>
                          <p className="font-mono text-[13px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.period}</p>
                        </div>
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Visibility</h3>
                          <p className="font-mono text-[13px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.visibility}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {detailTab === 'DEEP DIVE' && (
                    <motion.div key="deep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left Col: What was built */}
                      <div className="flex flex-col gap-6">
                        <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest">What Was Built</h3>
                        <div className="flex flex-col gap-4">
                          {selectedProject.built?.map((item, idx) => (
                            <div key={idx} className="flex flex-col">
                              <div className="flex items-start gap-3">
                                <span className="font-mono text-[11px] text-[var(--text-secondary)] mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                                <span className="font-mono text-[13px] font-semibold text-[var(--text-primary)] uppercase tracking-wider">{item.title}</span>
                              </div>
                              {item.description && (
                                <p className="font-mono text-[12px] text-[var(--text-secondary)] leading-relaxed pl-7 mt-1.5">{item.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Col: Systems & Outcome */}
                      <div className="flex flex-col gap-8">
                        <div>
                          <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-4">System Architecture</h3>
                          <ul className="space-y-2">
                            {selectedProject.systems?.map(sys => (
                              <li key={sys} className="flex items-center gap-3">
                                <span className="text-[var(--accent-warm)] text-xs">■</span>
                                <span className="font-mono text-[13px] text-[var(--text-primary)] uppercase tracking-wider">{sys}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {selectedProject.outcome && (
                          <div>
                            <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-4">Outcome</h3>
                            <ul className="space-y-2 pl-3 border-l border-[var(--border-mid)]">
                              {selectedProject.outcome.map(out => (
                                <li key={out} className="font-mono text-xs text-[var(--text-secondary)] leading-relaxed">
                                  — {out}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {detailTab === 'TECH STACK' && (
                    <motion.div key="tech" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-8">
                      <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Technologies & Tools</h3>
                      <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-y-8 gap-x-2">
                        {selectedProject.technologies?.map(tech => {
                          const iconUrl = getTechIcon(tech);
                          return (
                            <div key={tech} className="flex flex-col items-center gap-3 group w-full">
                              <div className="w-10 h-10 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                {iconUrl ? (
                                  <img 
                                    src={iconUrl} 
                                    alt={tech} 
                                    className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" 
                                  />
                                ) : (
                                  <div className="w-8 h-8 border border-[var(--border)] rounded-md flex items-center justify-center text-[10px] font-mono text-[var(--text-secondary)]">?</div>
                                )}
                              </div>
                              <span className="font-mono font-semibold text-[10px] text-[var(--text-secondary)] group-hover:text-[var(--accent-warm)] transition-colors text-center uppercase tracking-widest">
                                {tech}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>

              </motion.div>
            )}
            
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {designLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDesignLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm cursor-zoom-out"
          >
            <button 
              onClick={() => setDesignLightbox(null)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-primary)] hover:text-[var(--accent-warm)] transition-colors border border-[var(--border)] z-50"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={designLightbox} 
                alt="Project Design" 
                className="w-full h-full object-contain drop-shadow-2xl rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
