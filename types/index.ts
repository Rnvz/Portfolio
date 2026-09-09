export interface Project {
  id          : string
  title       : string
  subtitle    : string
  category    : string
  role        : string
  year        : string
  description : string
  status      : 'PRODUCTION' | 'COMPLETED'
  visibility  : 'PUBLIC' | 'PRIVATE'
  system      : string[]
  whatWasBuilt: string[]
  stack       : string[]
  goal        : string
  image       : string
  featured    : boolean
  live        : string | null
  github      : string | null
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
