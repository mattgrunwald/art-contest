import { Level } from '@/db/util'

export const parsePage = (page: string) => {
  const int = parseInt(page)
  return isNaN(int) ? 1 : int
}

export const parseLevel = (lvl: string) => {
  switch (lvl) {
    case Level.HighSchool:
      return Level.HighSchool
    case Level.MiddleSchool:
      return Level.MiddleSchool
    default:
      return null
  }
}

const nodeEnv = process.env.NODE_ENV

export const imageUrl = (imageSrc: string) =>
  nodeEnv === 'production' ? imageSrc : `/images/${imageSrc}`

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

export const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/
