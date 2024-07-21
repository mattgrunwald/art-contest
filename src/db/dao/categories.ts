import { eq } from 'drizzle-orm'
import { db } from '../db'
import { categories } from '../schema'
import { q, valOrError, wrap } from './util'

export const createCategory = wrap(
  async (name: string, description: string) => {
    const c = await db
      .insert(categories)
      .values({ name, description })
      .returning()
    return valOrError(c[0])
  },
)

export const updateCategory = wrap(
  async (id: number, name: string, description: string) => {
    const c = await db
      .update(categories)
      .set({ name, description })
      .where(eq(categories.id, id))
      .returning()
    return valOrError(c[0])
  },
)

export const readCategories = wrap(async () => {
  const c = await q.categories.findMany()
  return valOrError(c)
})
