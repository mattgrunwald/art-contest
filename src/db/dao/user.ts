import { db } from '@/db/db'
import { eq } from 'drizzle-orm'
import { users } from '../schema'

export const deleteUser = async (userId: string) => {
  await db.delete(users).where(eq(users.id, userId))
  return null
}

export const deleteAllUsers = async () => {
  await db.delete(users)
}
