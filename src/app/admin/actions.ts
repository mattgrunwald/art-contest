'use server'

import { DAO } from '@/drizzle/dao'
import { getIsAdmin } from '../serverSideUtils'

export async function readAdmins() {
  return await DAO.readAdmins()
}

export async function addAdmin(email: string): Promise<Error | null> {
  const isAdmin = await getIsAdmin()
  if (isAdmin) {
    const { error } = await DAO.createAdmin(email)
    return error
  }
  return null
}
