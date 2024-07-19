'use client'
import { User } from '@/drizzle/types'
import { Role } from '@/drizzle/util'
import { useSession } from 'next-auth/react'

type UserInfo = {
  name: string | null
  email: string | null
  isAdmin: boolean
  isJudge: boolean
  isContestant: boolean
  loggedIn: boolean
}

export const useUser = () => {
  const { data: session } = useSession()
  if (session === undefined) {
    return undefined
  }

  if (session === null || session.user === undefined) {
    return {
      name: null,
      email: null,
      isAdmin: false,
      isJudge: false,
      isContestant: false,
      loggedIn: false,
    }
  }

  const user = session.user as User
  return {
    name: user.name,
    email: user.email!,
    isAdmin: user.role === Role.Admin,
    isJudge: user.role === Role.Judge,
    isContestant: user.role === Role.Contestant,
    loggedIn: true,
  }
}
