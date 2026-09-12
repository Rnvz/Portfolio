import Image from 'next/image'
import { Project } from '@/types'
import { TechBadge } from '@/components/ui/TechBadge'

export function ProjectCard({ project }: { project: Project }) {
  const isFeatured = false

  return (
    <div className={`project-card flex flex-col h-full bg-[var(--surface)] rounded-xl overflow-hidden shrink-0 ${isFeatured ? 'w-[85vw] md:w-[60vw]' : 'w-[85vw] md:w-[40vw]'}`}>
      <div className={`relative w-full ${isFeatured ? 'h-[50%]' : 'h-[45%]'}`}>
        <Image
          src={project.image || ''}
          alt={project.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col p-6 flex-1 justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--text-dim)]">{project.period}</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider px-2 py-0.5 border border-[var(--border-mid)] rounded-full text-[var(--text-secondary)]">
              {project.role}
            </span>
          </div>
          <h3 className="font-display text-2xl font-medium text-[var(--text-primary)] mb-1">
            {project.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            {project.category}
          </p>
          <p className="text-[var(--text-secondary)] font-light text-sm line-clamp-2 mb-6">
            {project.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-2 overflow-hidden h-6">
            {(project.technologies || []).slice(0, 4).map(tech => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {(project.technologies || []).length > 4 && (
              <TechBadge tech={`+${(project.technologies || []).length - 4} more`} />
            )}
          </div>
          <div className="pl-4">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-xs text-[var(--accent-warm)]">Visit</a>
            ) : project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-warm)]">GitHub</a>
            ) : (
              <span className="font-mono text-xs text-[var(--text-dim)]">Private</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
