import { db } from '@/db/db'
import { eq } from 'drizzle-orm'
import { users } from '../schema'
import { AdapterReturn, User } from '../types'
import { q, wrap } from './util'

export const deleteUser = async (userId: string) => {
  await db.delete(users).where(eq(users.id, userId))
  return null
}

export const deleteAllUsers = async () => {
  await db.delete(users)
}

export const readUserByEmail = wrap(
  async (email: string): Promise<AdapterReturn<User | undefined>> => {
    const user = await q.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })

    return { data: user, error: null }
  },
)
