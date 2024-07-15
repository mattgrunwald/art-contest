import { User } from '@/drizzle/types'
import { Role } from '@/drizzle/util'
import { useSession } from 'next-auth/react'

type UserInfo = {
  email: string | null
  isAdmin: boolean
  isJudge: boolean
  isContestant: boolean
  loggedIn: boolean
}

export const useUser = () => {
  const { data: session } = useSession()

  if (session === null || session.user === undefined) {
    return {
      email: null,
      isAdmin: false,
      isJudge: false,
      isContestant: false,
      loggedIn: false,
    }
  }

  const user = session.user as User
  return {
    email: user.email!,
    isAdmin: user.role === Role.Admin,
    isJudge: user.role === Role.Judge,
    isContestant: user.role === Role.Contestant,
    loggedIn: true,
  }
}
