import { Category } from '@/drizzle/types'
import { nextCategoryId } from './util'

export const seedCategories: Category[] = [
  {
    id: nextCategoryId(),
    name: 'impact',
    description: 'how does this make you feel?',
  },
  {
    id: nextCategoryId(),
    name: 'creativity',
    description: 'how creative is this piece?',
  },
]
