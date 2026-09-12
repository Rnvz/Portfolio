export interface Project {
  id: string
  title: string
  category: string
  role: string
  description: string
  period?: string
  status?: string
  visibility?: string
  systems?: string[]
  built?: {
    title: string
    description?: string
  }[]
  technologies?: string[]
  designSpecs?: string[]
  engineeringSpecs?: string[]
  goal?: string
  outcome?: string[]
  image?: string
  url?: string
  github?: string
}

export interface TimelineEntry {
  id    : string
  side  : 'left' | 'right'
  year  : string
  title : string
  place : string
  type  : 'work' | 'education'
}

export interface Skill {
  name : string
  icon : string
}

export interface Stat {
  value : string
  label : string
}

export type Section = 'hero' | 'about' | 'work' | 'journey' | 'contact'
