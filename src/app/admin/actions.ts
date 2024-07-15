'use server'

import { auth } from '@/auth'
import { DAO } from '@/drizzle/dao'

export async function readAdmins() {
  const session = await auth()
  const user = session === null ? null : session.user
  console.log(user)
  return await DAO.readAdmins()
}

export async function addAdmin(email: string): Promise<Error | null> {
  const session = await auth()
  const user = session === null ? null : session.user
  console.log(user)
  if (user !== null && user !== undefined) {
    const { error } = await DAO.createAdmin(email)
    return error
  }
  return null
}
