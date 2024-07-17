'use server'

import { auth } from '@/auth'
import { User } from '@/drizzle/types'
import { Role } from '@/drizzle/util'

export const getUser = async () => {
  const session = await auth()
  if (session === null || session === undefined || session.user === undefined) {
    return null
  }
  return session.user as User
}

export const getRole = async () => {
  const user = await getUser()
  return user ? user.role : Role.Readonly
}

export const getRoleAndId = async () => {
  const user = await getUser()
  return user
    ? {
        role: user.role,
        id: user.id,
      }
    : { role: Role.Readonly, id: null }
}

export const getIsAdmin = async () => {
  const role = await getRole()
  return role !== undefined && role === Role.Admin
}

export const getIsJudge = async () => {
  const role = await getRole()
  return role !== undefined && role === Role.Judge
}

export const getIsContestant = async () => {
  const role = await getRole()
  return role !== undefined && role === Role.Contestant
}
