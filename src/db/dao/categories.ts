import { db } from '../db'
import { categories } from '../schema'
import { q, valOrError, wrap } from './util'
import { Category } from '../types'
import { CategoriesAdapter } from '../adapter'

export class CategoriesDAO implements CategoriesAdapter {
  createCategory = wrap(async (category: Category) => {
    const c = await db.insert(categories).values(category).returning()
    return valOrError(c[0])
  })

  readCategories() {
    return readCategories()
  }
}

let categoryCache: Category[] | null = null

export const readCategories = wrap(async () => {
  if (categoryCache === null || categoryCache.length === 0) {
    categoryCache = await q.categories.findMany({
      orderBy: categories.id,
    })
  }
  return valOrError(categoryCache)
})
