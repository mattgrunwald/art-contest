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
