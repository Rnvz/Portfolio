'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PROJECTS } from '@/lib/constants'

const CATEGORIES = ['ALL', 'FRONTEND', 'BACKEND', 'FULL STACK', 'UI/UX', 'AI ENGINEERING']

const TECH_ICONS: Record<string, string> = {
  "Next.js":        "/icons/nextdotjs.svg",
  "React":          "/icons/react.svg",
  "React TS":       "/icons/react.svg",
  "TypeScript":     "/icons/typescript.svg",
  "Tailwind":       "/icons/tailwindcss.svg",
  "TailwindCSS":    "/icons/tailwindcss.svg",
  "Cloudflare D1":  "/icons/cloudflare.svg",
  "Resend":         "/icons/resend.svg",
  "Svix":           "/icons/svix.svg",
  "Zod":            "/icons/zod.svg",
  "OpenNext":       "/icons/opennext.svg",
  "Figma":          "/icons/figma.svg",
  "Firebase":       "/icons/firebase.svg",
  "Midtrans API":   "/icons/midtrans.png",
  "Laravel":        "/icons/laravel.svg",
  "Laravel 12":     "/icons/laravel.svg",
  "MySQL":          "/icons/mysql.svg",
  "Blade Templates":"/icons/laravel.svg",
  "Vite":           "/icons/vite.svg",
  "HTTP":           "/icons/curl.svg",
  "Python":         "/icons/python.svg",
  "Pandas":         "/icons/pandas.svg",
  "Matplotlib":     "/icons/matplotlib.svg",
  "Scikit-learn":   "/icons/scikitlearn.svg",
  "NumPy":          "/icons/numpy.svg",
  "Streamlit":      "/icons/streamlit.svg",
  "Optuna":         "/icons/optuna.svg",
  "Node.js":        "/icons/nodejs.svg",
  "Prisma":         "/icons/prisma.svg",
  "SQLite":         "/icons/sqlite.svg",
  "HTML5":          "/icons/html5.svg",
  "CSS3":           "/icons/css3.svg",
  "JavaScript":     "/icons/javascript.svg",
  "Anaconda":       "/icons/anaconda.svg",
  "BioPython":      "/icons/biopython.svg",
  "GSAP":           "/icons/gsap.svg",
  "Framer Motion":  "/icons/framer.svg",
  "Lenis":          "/icons/lenis.png",
  "Vercel":         "/icons/vercel.svg",
  "e-JURA":         "/icons/laravel.svg",
  "Git":            "/icons/git.svg",
  "HTML/CSS/JS":    "/icons/javascript.svg",
}

export const getTechIcon = (tech: string) => {
  if (TECH_ICONS[tech]) return TECH_ICONS[tech];
  const t = tech.toLowerCase();
  if (t.includes("next.js")) return TECH_ICONS["Next.js"];
  if (t.includes("react")) return TECH_ICONS["React"];
  if (t.includes("tailwind")) return TECH_ICONS["Tailwind"];
  if (t.includes("cloudflare")) return TECH_ICONS["Cloudflare D1"];
  if (t.includes("html")) return "/icons/html5.svg";
  if (t.includes("css")) return "/icons/css3.svg";
  if (t.includes("js")) return "/icons/javascript.svg";
  if (t.includes("node.js")) return "/icons/nodejs.svg";
  if (t.includes("prisma")) return "/icons/prisma.svg";
  if (t.includes("sqlite")) return "/icons/sqlite.svg";
  return null;
}

export const Work = () => {
  const [view, setView] = useState<'idle' | 'nav'>('idle')
    
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mobileDetailView, setMobileDetailView] = useState(false)
  const [mobileTab, setMobileTab] = useState<'overview' | 'goal' | 'stack'>('overview')
  const [mobileFeatureIndex, setMobileFeatureIndex] = useState(0)
  const [detailTab, setDetailTab] = useState<'OVERVIEW' | 'DEEP DIVE' | 'TECH STACK'>('OVERVIEW')
  const [designLightbox, setDesignLightbox] = useState(false)
  const [expandedFeature, setExpandedFeature] = useState<number>(0)
  const shouldReduceMotion = useReducedMotion()


  

  useEffect(() => {
    setDetailTab('OVERVIEW')
    setExpandedFeature(0)
    setMobileFeatureIndex(0)
  }, [selectedIndex])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return PROJECTS
    return PROJECTS.filter(p => {
      const projectCat = p.category === 'AI / ML' ? 'AI ENGINEERING' : p.category;
      if (['FRONTEND', 'BACKEND', 'UI/UX'].includes(activeCategory) && projectCat === 'FULL STACK') {
        return true;
      }
      return projectCat === activeCategory;
    })
  }, [activeCategory])

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDesignLightbox(false)
    }
    
    if (designLightbox) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
    
    return () => { 
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [designLightbox])
  
  const selectedProject = filteredProjects.length > 0 ? (filteredProjects[selectedIndex] || filteredProjects[0]) : null
  const globalIndex = selectedProject ? PROJECTS.findIndex(p => p.id === selectedProject.id) : -1

  const handleUp = useCallback(() => {
    if (view === 'idle') return
    if (mobileDetailView) {
      if (mobileTab === 'goal' && selectedProject?.built?.length) {
        setMobileFeatureIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.built!.length - 1))
      } else {
        const el = document.getElementById('mobile-detail-container')
        if (el) el.scrollBy({ top: -60, behavior: 'smooth' })
      }
      return
    }
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1))
  }, [view, filteredProjects.length, mobileDetailView, mobileTab, selectedProject])


  const handleDown = useCallback(() => {
    if (view === 'idle') return
    if (mobileDetailView) {
      if (mobileTab === 'goal' && selectedProject?.built?.length) {
        setMobileFeatureIndex((prev) => (prev < selectedProject.built!.length - 1 ? prev + 1 : 0))
      } else {
        const el = document.getElementById('mobile-detail-container')
        if (el) el.scrollBy({ top: 60, behavior: 'smooth' })
      }
      return
    }
    setSelectedIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0))
  }, [view, filteredProjects.length, mobileDetailView, mobileTab, selectedProject])

  const handleLeft = useCallback(() => {
    if (view === 'idle') return
    if (mobileDetailView) {
      setMobileTab(prev => prev === 'stack' ? 'goal' : prev === 'goal' ? 'overview' : 'overview')
      return
    }
    setActiveCategory((prev) => {
      const idx = CATEGORIES.indexOf(prev)
      return idx > 0 ? CATEGORIES[idx - 1] : CATEGORIES[CATEGORIES.length - 1]
    })
    setSelectedIndex(0)
  }, [view, mobileDetailView])

  const handleRight = useCallback(() => {
    if (view === 'idle') return
    if (mobileDetailView) {
      setMobileTab(prev => prev === 'overview' ? 'goal' : prev === 'goal' ? 'stack' : 'stack')
      return
    }
    setActiveCategory((prev) => {
      const idx = CATEGORIES.indexOf(prev)
      return idx < CATEGORIES.length - 1 ? CATEGORIES[idx + 1] : CATEGORIES[0]
    })
    setSelectedIndex(0)
  }, [view, mobileDetailView])

  const handleCenter = useCallback(() => {
    if (view === 'idle') {
      setView('nav')
      setMobileDetailView(false)
    } else if (view === 'nav') {
      if (window.innerWidth < 1280) {
        if (mobileDetailView) {
          if (mobileTab === 'goal' && selectedProject?.built?.length) {
            setExpandedFeature(prev => prev === mobileFeatureIndex ? -1 : mobileFeatureIndex)
          } else {
            if (selectedProject?.url) window.open(selectedProject.url, '_blank', 'noopener,noreferrer')
            else if (selectedProject?.github) window.open(selectedProject.github, '_blank', 'noopener,noreferrer')
          }
        } else {
          setMobileDetailView(true)
        }
      } else {
        if (selectedProject?.url) window.open(selectedProject.url, '_blank', 'noopener,noreferrer')
        else if (selectedProject?.github) window.open(selectedProject.github, '_blank', 'noopener,noreferrer')
      }
    }
  }, [view, selectedProject, mobileDetailView, mobileTab, mobileFeatureIndex])

  const handleMenu = useCallback(() => {
    if (view === 'nav') {
      if (mobileDetailView) setMobileDetailView(false)
      else setView('idle')
    }
  }, [view, mobileDetailView])

  const handleBack = useCallback(() => {
    if (view === 'nav') {
      if (mobileDetailView) setMobileDetailView(false)
      else setView('idle')
    }
  }, [view, mobileDetailView])

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
  }, [handleUp, handleDown, handleLeft, handleRight, handleCenter, handleBack, mobileDetailView, mobileTab, mobileFeatureIndex])

  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center xl:py-[var(--section-py)] xl:px-[var(--section-px)]"
    >
      <div className="hidden xl:block"><SectionLabel text="03 — WORK" /></div>

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-16 items-center">
        
        {/* LEFT SIDE — Project Navigator (iPod) */}
        <AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
          className="w-full flex justify-center xl:justify-start relative z-10 order-2 xl:order-1"
        >
          {/* Device Shell (Original iPod Size) */}
          <div className="bg-[var(--surface)] xl:border border-[var(--border-mid)] rounded-none xl:rounded-[3rem] w-full max-w-full xl:max-w-[540px] h-[100dvh] xl:h-[860px] flex flex-col p-4 xl:p-6 pb-8 xl:pb-6 shadow-none xl:shadow-2xl relative transition-all">
            
            {/* Screen Area */}
            <div className="w-full flex-1 xl:flex-none xl:h-[440px] bg-[#0a0a0a] rounded-2xl border border-[var(--border)] relative overflow-hidden flex flex-col shadow-inner shrink-0 p-4 xl:p-4 pb-2">
              
              {/* Screen reflection/glare */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-20"></div>
              
              {/* Status Bar */}
              <div className="flex justify-between items-center mb-4 relative z-30">
                <span className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest uppercase">Projects</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest">
                    {String(globalIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full border border-[var(--text-secondary)] flex items-center justify-center">
                      <div className="w-1 h-1 bg-[var(--text-secondary)] rounded-full" />
                    </div>
                    <div className="w-4 h-2.5 border border-[var(--text-secondary)] rounded-[2px] relative flex items-center p-[1px] before:absolute before:right-[-2px] before:top-1/2 before:-translate-y-1/2 before:w-[1.5px] before:h-1 before:bg-[var(--text-secondary)]">
                      <div className="w-full h-full bg-[var(--text-secondary)] rounded-sm" />
                    </div>
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
                      

                      {/* Navigator Content */}
                                            {mobileDetailView && selectedProject ? (
                        <div id="mobile-detail-container" className="flex flex-col h-full w-full overflow-y-auto no-scrollbar relative z-30 bg-[#0a0a0a] px-1 pb-4">
                          <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-40 pb-2 mb-4 pt-1 border-b border-[var(--border-mid)]">
                            <div className="flex items-center justify-between mb-3">
                              <button 
                                onClick={() => setMobileDetailView(false)}
                                className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-white transition-colors"
                              >
                                <span className="font-mono text-[9px] uppercase tracking-widest">← Back</span>
                              </button>
                            </div>
                            
                            <h3 className="font-display text-xl text-[var(--text-primary)] mb-1 leading-tight truncate">{selectedProject.title}</h3>
                            <p className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-wider truncate mb-3">{selectedProject.category} · {selectedProject.period}</p>
                            
                            {/* TABS */}
                            <div className="flex items-center gap-4">
                              <button onClick={() => setMobileTab('overview')} className={`font-mono text-[9px] uppercase tracking-widest pb-1 border-b ${mobileTab === 'overview' ? 'text-[var(--accent-warm)] border-[var(--accent-warm)]' : 'text-[var(--text-secondary)] border-transparent'}`}>Overview</button>
                              <button onClick={() => setMobileTab('goal')} className={`font-mono text-[9px] uppercase tracking-widest pb-1 border-b ${mobileTab === 'goal' ? 'text-[var(--accent-warm)] border-[var(--accent-warm)]' : 'text-[var(--text-secondary)] border-transparent'}`}>Deep Dive</button>
                              <button onClick={() => setMobileTab('stack')} className={`font-mono text-[9px] uppercase tracking-widest pb-1 border-b ${mobileTab === 'stack' ? 'text-[var(--accent-warm)] border-[var(--accent-warm)]' : 'text-[var(--text-secondary)] border-transparent'}`}>Tech Stack</button>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-4">
                            {mobileTab === 'overview' && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5">
                                {selectedProject.description && (
                                  <div>
                                    <h4 className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--border-mid)] pb-1 mb-2">Overview</h4>
                                    <p className="font-mono text-[9px] text-[var(--text-primary)] leading-relaxed opacity-80 whitespace-pre-wrap">{selectedProject.description}</p>
                                  </div>
                                )}
                                {selectedProject.goal && (
                                  <div>
                                    <h4 className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--border-mid)] pb-1 mb-2">The Goal</h4>
                                    <p className="font-mono text-[9px] text-[var(--text-primary)] leading-relaxed opacity-80 whitespace-pre-wrap border-l-2 border-[var(--accent-warm)] pl-2">{selectedProject.goal}</p>
                                  </div>
                                )}
                                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-2">
                                  <div>
                                    <h3 className="font-mono text-[8px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Role</h3>
                                    <p className="font-mono text-[9px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.role}</p>
                                  </div>
                                  <div>
                                    <h3 className="font-mono text-[8px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Status</h3>
                                    <p className="font-mono text-[9px] text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1">
                                      <span className={`text-[8px] ${selectedProject.status?.toUpperCase() === 'PRODUCTION' ? 'text-[var(--accent-warm)]' : 'text-green-500'}`}>●</span> 
                                      {selectedProject.status}
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className="font-mono text-[8px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Period</h3>
                                    <p className="font-mono text-[9px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.period}</p>
                                  </div>
                                  <div>
                                    <h3 className="font-mono text-[8px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Visibility</h3>
                                    <p className="font-mono text-[9px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.visibility}</p>
                                  </div>
                                </div>
                                {selectedProject.url && (
                                  <a 
                                    href={selectedProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[9px] text-black bg-[var(--accent-warm)] py-2 text-center rounded uppercase tracking-widest mt-2 hover:bg-white transition-colors block w-full"
                                  >
                                    View Project
                                  </a>
                                )}
                              </motion.div>
                            )}

                            {mobileTab === 'goal' && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                                {/* What was built */}
                                {selectedProject.built && selectedProject.built.length > 0 && (
                                  <div className="flex flex-col gap-3">
                                    <h4 className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--border-mid)] pb-1 mb-1">What Was Built</h4>
                                    <div className="flex flex-col gap-2">
                                      {selectedProject.built.map((item, idx) => (
                                        <div key={idx} className="flex flex-col border-b border-[var(--border-mid)] last:border-0 pb-2">
                                          <button 
                                            onClick={() => {
                                              setMobileFeatureIndex(idx);
                                              setExpandedFeature(expandedFeature === idx ? -1 : idx);
                                            }}
                                            className="flex items-center justify-between w-full text-left"
                                          >
                                            <div className="flex items-center gap-2">
                                              <span className={`font-mono text-[9px] ${mobileFeatureIndex === idx ? 'text-[var(--accent-warm)]' : 'text-[var(--text-secondary)]'}`}>
                                                {String(idx + 1).padStart(2, '0')}
                                              </span>
                                              <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${mobileFeatureIndex === idx ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                                {item.title}
                                              </span>
                                            </div>
                                            <span className={`text-[10px] font-light ${mobileFeatureIndex === idx ? 'text-[var(--accent-warm)]' : 'text-[var(--text-secondary)]'}`}>
                                              {expandedFeature === idx ? '−' : '+'}
                                            </span>
                                          </button>
                                          
                                          <AnimatePresence>
                                            {expandedFeature === idx && (
                                              <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                              >
                                                <div className="pt-2">
                                                  {item.description && (
                                                    <p className="font-mono text-[9px] text-[var(--text-primary)] opacity-80 leading-relaxed pl-5 mb-2">{item.description}</p>
                                                  )}
                                                  {item.features && item.features.length > 0 && (
                                                    <ul className="pl-5 space-y-1">
                                                      {item.features.map((feat, fidx) => (
                                                        <li key={fidx} className="font-mono text-[8px] text-[var(--text-secondary)] flex items-start gap-1">
                                                          <span className="text-[var(--border-mid)] mt-[1px]">—</span>
                                                          <span className="leading-relaxed">{feat}</span>
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  )}
                                                </div>
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {/* System Architecture */}
                                {selectedProject.systems && (
                                  <div className="flex flex-col gap-2">
                                    <h4 className="font-mono text-[9px] text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--border-mid)] pb-1 mb-1">System Architecture</h4>
                                    <ul className="space-y-1">
                                      {selectedProject.systems.map(sys => (
                                        <li key={sys} className="flex items-center gap-2">
                                          <span className="text-[var(--accent-warm)] text-[8px]">■</span>
                                          <span className="font-mono text-[9px] text-[var(--text-primary)] uppercase tracking-wider">{sys}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>
                            )}

                            {mobileTab === 'stack' && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                                {selectedProject.stack ? (
                                  <>
                                    {Object.entries(selectedProject.stack).map(([groupName, techs]) => {
                                      if (!techs || techs.length === 0) return null;
                                      return (
                                        <div key={groupName} className="flex flex-col gap-3">
                                          <h4 className="font-mono text-[9px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--border-mid)] pb-1">{groupName}</h4>
                                          <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                                            {techs.map((tech) => {
                                              const cleanTech = tech.split(' (')[0];
                                              const iconUrl = getTechIcon(cleanTech);
                                              return (
                                                <div key={tech} className="flex flex-col items-center gap-2 w-full">
                                                  <div className="w-8 h-8 flex items-center justify-center opacity-90">
                                                    {iconUrl ? (
                                                      <img src={iconUrl} alt={cleanTech} className="w-6 h-6 object-contain" />
                                                    ) : (
                                                      <div className="w-6 h-6 border border-[var(--border)] rounded flex items-center justify-center text-[8px] font-mono text-[var(--text-secondary)]">?</div>
                                                    )}
                                                  </div>
                                                  <span className="font-mono font-semibold text-[8px] text-[var(--text-primary)] text-center uppercase tracking-widest">
                                                    {tech}
                                                  </span>
                                                </div>
                                              )
                                            })}
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </>
                                ) : (
                                  <div className="flex flex-col gap-3">
                                    <h4 className="font-mono text-[9px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--border-mid)] pb-1">Technologies</h4>
                                    <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                                      {selectedProject.technologies?.map((tech) => {
                                        const cleanTech = tech.split(' (')[0];
                                        const iconUrl = getTechIcon(cleanTech);
                                        return (
                                          <div key={tech} className="flex flex-col items-center gap-2 w-full">
                                            <div className="w-8 h-8 flex items-center justify-center opacity-90">
                                              {iconUrl ? (
                                                <img src={iconUrl} alt={cleanTech} className="w-6 h-6 object-contain" />
                                              ) : (
                                                <div className="w-6 h-6 border border-[var(--border)] rounded flex items-center justify-center text-[8px] font-mono text-[var(--text-secondary)]">?</div>
                                              )}
                                            </div>
                                            <span className="font-mono font-semibold text-[8px] text-[var(--text-primary)] text-center uppercase tracking-widest">
                                              {tech}
                                            </span>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
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

                        <div className="flex-1 grid grid-cols-2 gap-4 h-full overflow-hidden">
                        {/* List Column */}
                        <div className="flex flex-col gap-1 overflow-y-auto no-scrollbar pr-2 relative">
                          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-[var(--border)] -z-10" />
                          {filteredProjects.map((p, idx) => {
                            const isActive = idx === selectedIndex;
                            return (
                              <button
                                key={p.id}
                                onClick={() => { setSelectedIndex(idx); if (window.innerWidth < 1280) setMobileDetailView(true); }}
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
                            {selectedProject ? (
                              <motion.div
                                key={selectedProject.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col h-full"
                              >
                                <div 
                                  className="relative w-full aspect-square rounded-xl overflow-hidden border border-[var(--border)] mb-4 p-4 flex items-center justify-center transition-colors duration-300"
                                  style={{ backgroundColor: selectedProject.bgColor || 'transparent' }}
                                >
                                  {selectedProject.image ? (
                                    <div className="relative w-full h-full">
                                      <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                  ) : (
                                    <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">No Image</span>
                                  )}
                                </div>
                                <div className="mt-4 flex flex-col gap-1">
                                  <h4 className="font-mono text-[10px] text-[var(--text-primary)] uppercase tracking-widest truncate">
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
                                <div className="mt-auto pt-4 flex items-center gap-2 text-[var(--accent-warm)] animate-pulse">
                                  <span className="font-mono text-[8px] uppercase tracking-widest">Tap / Press Center to Open</span>
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center h-full border border-dashed border-[var(--border)] rounded-xl"
                              >
                                <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-widest">No Projects Found</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                        </>
                      )} {/* end mobileDetailView check */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Controls Area */}
            <div className="w-full flex flex-col items-center justify-center pt-6 pb-8 xl:pt-2 xl:pb-24 gap-6 xl:gap-10 shrink-0 xl:flex-1">
              
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
        <div className="w-full h-auto xl:h-[860px] hidden xl:flex flex-col order-1 xl:order-2 justify-center transition-all duration-700">
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
            {view === 'nav' && selectedProject && (
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
                      onClick={() => setDesignLightbox(true)}
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

                <div className="overflow-visible pr-4">
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
                          <p className="font-mono text-[14px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.role}</p>
                        </div>
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Status</h3>
                          <p className="font-mono text-[14px] text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                            <span className={`text-[12px] ${selectedProject.status?.toUpperCase() === 'PRODUCTION' ? 'text-[var(--accent-warm)]' : 'text-green-500'}`}>●</span> 
                            {selectedProject.status}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Period</h3>
                          <p className="font-mono text-[14px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.period}</p>
                        </div>
                        <div>
                          <h3 className="font-mono text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">Visibility</h3>
                          <p className="font-mono text-[14px] text-[var(--text-primary)] uppercase tracking-wider">{selectedProject.visibility}</p>
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
                            <div key={idx} className="flex flex-col border-b border-[var(--border)] last:border-0 pb-3">
                              <button 
                                onClick={() => setExpandedFeature(expandedFeature === idx ? -1 : idx)}
                                className="flex items-center justify-between w-full text-left focus:outline-none group transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <span className={`font-mono text-[13px] mt-0.5 transition-colors ${expandedFeature === idx ? 'text-[var(--accent-warm)]' : 'text-[var(--text-secondary)] group-hover:text-white'}`}>{String(idx + 1).padStart(2, '0')}</span>
                                  <span className={`font-mono text-[14px] font-semibold uppercase tracking-wider transition-colors ${expandedFeature === idx ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] group-hover:text-white'}`}>{item.title}</span>
                                </div>
                                <span className={`font-mono text-[18px] font-light transition-transform duration-300 ${expandedFeature === idx ? 'text-[var(--accent-warm)] rotate-180' : 'text-[var(--text-secondary)] group-hover:text-white rotate-0'}`}>
                                  {expandedFeature === idx ? '−' : '+'}
                                </span>
                              </button>
                              <AnimatePresence>
                                {expandedFeature === idx && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-2">
                                      {item.description && (
                                        <p className="font-mono text-[13px] text-[var(--text-secondary)] leading-relaxed pl-8 mb-3">{item.description}</p>
                                      )}
                                      {item.features && item.features.length > 0 && (
                                        <ul className="pl-7 space-y-1 pb-1">
                                          {item.features.map((feat, fidx) => (
                                            <li key={fidx} className="font-mono text-[12px] text-[var(--text-secondary)] flex items-start gap-2">
                                              <span className="text-[var(--border-mid)] mt-[1px]">—</span>
                                              <span className="leading-relaxed">{feat}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
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
                                <span className="font-mono text-[14px] text-[var(--text-primary)] uppercase tracking-wider">{sys}</span>
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
                    <motion.div key="tech" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-10">
                      {selectedProject.stack ? (
                        <>
                          {Object.entries(selectedProject.stack).map(([groupName, techs]) => {
                            if (!techs || techs.length === 0) return null;
                            return (
                              <div key={groupName} className="flex flex-col gap-4">
                                <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest border-b border-[var(--border-mid)] pb-2">{groupName}</h3>
                                <div className="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-y-6 gap-x-2">
                                  {techs.map((tech: string) => {
                                    // Handle cases where tech is "Zod (Validation)" by extracting "Zod" for the icon lookup
                                    const cleanTech = tech.split(' (')[0];
                                    const iconUrl = getTechIcon(cleanTech);
                                    return (
                                      <div key={tech} className="flex flex-col items-center gap-3 group w-full">
                                        <div className="w-10 h-10 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                          {iconUrl ? (
                                            <img 
                                              src={iconUrl} 
                                              alt={cleanTech} 
                                              className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" 
                                            />
                                          ) : (
                                            <div className="w-8 h-8 border border-[var(--border)] rounded-md flex items-center justify-center text-[10px] font-mono text-[var(--text-secondary)]">?</div>
                                          )}
                                        </div>
                                        <span className="font-mono font-semibold text-[10px] text-[var(--text-secondary)] group-hover:text-[var(--accent-warm)] transition-colors text-center uppercase tracking-widest px-1">
                                          {tech}
                                        </span>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })}
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>

              </motion.div>
            )}
            
          </AnimatePresence>
        </div>

      </div>

      
      <AnimatePresence>
        {designLightbox && selectedProject?.designImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col touch-none overscroll-none"
            onClick={() => setDesignLightbox(false)}
          >
            <button 
              onClick={() => setDesignLightbox(false)}
              className="fixed top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-primary)] hover:text-[var(--accent-warm)] transition-colors border border-[var(--border)] z-[110]"
            >
              ✕
            </button>
            
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={8}
              centerOnInit={true}
              wheel={{ step: 0.04 }}
              panning={{ velocityDisabled: true }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)] z-[110] shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => zoomOut()} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                      <span className="text-xl leading-none mb-1">-</span>
                    </button>
                    <button onClick={() => resetTransform()} className="px-4 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-[11px] font-mono tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase">
                      Reset
                    </button>
                    <button onClick={() => zoomIn()} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                      <span className="text-xl leading-none mb-1">+</span>
                    </button>
                  </div>
                  
                  <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
                    <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                      <img 
                        src={selectedProject.designImage} 
                        alt="Design View" 
                        className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain select-none shadow-2xl rounded-sm"
                        draggable={false}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TransformComponent>
                  </div>
                </>
              )}
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

