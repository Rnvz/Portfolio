import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'
import { Project } from '@/types'
import { getTechIcon } from './Work' // We need to export this from Work.tsx or move it to a util

export const DeepInspect = ({ project, onBack }: { project: Project, onBack: () => void }) => {
  useEffect(() => {
    // Ensure we start at the top of the section when entering Deep Inspect
    if (typeof window !== 'undefined') {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo('#work', { offset: 0, duration: 0.8 });
      } else {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <motion.div
      key="deep-inspect"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-12 border-b border-[var(--border)] pb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors mb-6 font-mono text-xs uppercase tracking-widest"
          >
            ← Back to Projects
          </button>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5rem] text-[var(--text-primary)] uppercase leading-none tracking-tight">
            {project.title}
          </h1>
        </div>
        <div className="hidden md:flex gap-4">
          {project.url && (
            <a 
              href={project.url} 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 border border-[var(--accent-warm)] text-[var(--accent-warm)] hover:bg-[var(--accent-warm)] hover:text-[#0a0a0a] transition-colors rounded-full font-mono text-xs uppercase tracking-widest"
            >
              Visit Live Site
            </a>
          )}
        </div>
      </div>

      {/* Hero Image */}
      {project.image && (
        <div className="w-full h-[40vh] md:h-[60vh] relative rounded-2xl overflow-hidden mb-16 border border-[var(--border)]">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
        </div>
      )}

      {/* Deep Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left Column (Metadata) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-10">
          <div>
            <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Role</h3>
            <p className="text-[var(--text-primary)] font-medium text-lg">{project.role}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Timeline</h3>
            <p className="text-[var(--text-primary)] font-medium text-lg">{project.period}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Status</h3>
            <p className="text-[var(--text-primary)] font-medium text-lg flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${project.status?.toUpperCase() === 'PRODUCTION' ? 'bg-[var(--accent-warm)]' : 'bg-green-500'}`} /> 
              {project.status}
            </p>
          </div>
          {project.designSpecs && project.designSpecs.length > 0 && (
            <div className="mb-2">
              <h3 className="font-mono text-xs font-semibold text-[var(--accent-warm)] uppercase tracking-widest mb-4">Design</h3>
              <ul className="flex flex-col gap-2">
                {project.designSpecs.map(spec => (
                  <li key={spec} className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider border-l border-[var(--border-mid)] pl-3 py-0.5">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.engineeringSpecs && project.engineeringSpecs.length > 0 && (
            <div>
              <h3 className="font-mono text-xs font-semibold text-[var(--accent-warm)] uppercase tracking-widest mb-4">Engineering</h3>
              <ul className="flex flex-col gap-2">
                {project.engineeringSpecs.map(spec => (
                  <li key={spec} className="font-mono text-xs text-[var(--text-secondary)] uppercase tracking-wider border-l border-[var(--border-mid)] pl-3 py-0.5">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column (Long Form Content) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-16">
          
          <section>
            <h2 className="font-display text-3xl text-[var(--text-primary)] mb-6">Overview</h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-light">
              {project.description}
            </p>
          </section>

          {project.goal && (
            <section>
              <h2 className="font-display text-3xl text-[var(--text-primary)] mb-6">The Goal</h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light border-l-2 border-[var(--accent-warm)] pl-6">
                {project.goal}
              </p>
            </section>
          )}

          {project.built && (
            <section>
              <h2 className="font-display text-3xl text-[var(--text-primary)] mb-8">What Was Built</h2>
              <div className="flex flex-col gap-8">
                {project.built.map((item, idx) => (
                  <div key={idx} className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-xl flex flex-col gap-3">
                    <div className="flex items-center gap-4 border-b border-[var(--border)] pb-3 mb-2">
                      <span className="font-mono text-sm text-[var(--accent-warm)]">{String(idx + 1).padStart(2, '0')}</span>
                      <h4 className="font-mono text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">{item.title}</h4>
                    </div>
                    {item.description && (
                      <p className="text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.systems && (
            <section>
              <h2 className="font-display text-3xl text-[var(--text-primary)] mb-8">System Architecture</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.systems.map(sys => (
                  <div key={sys} className="flex items-start gap-4 bg-[var(--surface)] border border-[var(--border-mid)] p-4 rounded-lg">
                    <span className="text-[var(--accent-warm)] mt-1">■</span>
                    <span className="font-mono text-sm text-[var(--text-primary)] uppercase tracking-wider">{sys}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.outcome && (
            <section>
              <h2 className="font-display text-3xl text-[var(--text-primary)] mb-8">Outcomes</h2>
              <ul className="flex flex-col gap-4">
                {project.outcome.map((out, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="font-mono text-[var(--text-secondary)] opacity-50 mt-1">0{idx + 1}</span>
                    <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{out}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>
      </div>
    </motion.div>
  )
}
