import { db } from '../db'
import { categories } from '../schema'
import { q, valOrError, wrap } from './util'
import { Category } from '../types'
import { CategoriesAdapter } from '../adapter'

export class CategoriesDAO implements CategoriesAdapter {
  private categoryCache: Category[] | null = null

  createCategory = wrap(async (category: Category) => {
    const c = await db.insert(categories).values(category).returning()
    return valOrError(c[0])
  })

  readCategories = wrap(async () => {
    if (this.categoryCache === null || this.categoryCache.length === 0) {
      this.categoryCache = await q.categories.findMany({
        orderBy: categories.id,
      })
    }
    return valOrError(this.categoryCache)
  })
}
