import { db } from '@/drizzle/db'
import { users } from '../schema'
import { eq } from 'drizzle-orm'

export const deleteUser = async (userId: string) => {
  await db.delete(users).where(eq(users.id, userId))
  return null
}

export const deleteAllUsers = async () => {
  await db.delete(users)
}
