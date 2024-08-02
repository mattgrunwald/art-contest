import { eq } from 'drizzle-orm'
import { db } from '../db'
import { initialRoles } from '../schema'
import { AdapterReturn, InitialRole } from '../types'
import { Role } from '../util'
import { q, valOrError, wrap } from './util'

export const upsertInitialRole = wrap(
  async (email: string, role: Role): Promise<AdapterReturn<InitialRole>> => {
    const result = await db
      .insert(initialRoles)
      .values({ email, role })
      .onConflictDoUpdate({
        target: initialRoles.email,
        set: { role },
      })
      .returning()
    return valOrError(result[0])
  },
)

export const readInitialRole = wrap(
  async (email: string): Promise<AdapterReturn<InitialRole | undefined>> => {
    const result = await q.initialRoles.findFirst({
      where: (initialRoles, { eq }) => eq(initialRoles.email, email),
    })

    return { data: result, error: null }
  },
)

export const deleteInitialRole = async (id: string): Promise<Error | null> => {
  try {
    await db.delete(initialRoles).where(eq(initialRoles.id, id))
    return null
  } catch (error) {
    return error as Error
  }
}
