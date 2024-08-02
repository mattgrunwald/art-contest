import { db } from '@/db/db'
import { eq } from 'drizzle-orm'
import { User } from '@/db/types'
import { users } from '../schema'
import { AdapterReturn } from '../types'
import { Role } from '../util'
import { q, valOrError, wrap, wrapUserQuery } from './util'

export const makeJudge = (email: string) => setRole(Role.Judge, email)

export const readJudges = wrapUserQuery(async () => {
  return (await q.users.findMany({
    where: eq(users.role, Role.Judge),
  })) as User[]
})

export const makeAdmin = (email: string) => setRole(Role.Admin, email)

export const readAdmins = wrapUserQuery(async () => {
  return (await q.users.findMany({
    where: eq(users.role, Role.Admin),
  })) as User[]
})

export const makeContestant = (email: string) => setRole(Role.Contestant, email)

export const setRole = wrap(
  async (role: Role, email: string): Promise<AdapterReturn<User>> => {
    // check if in users table
    const user = await q.users.findFirst({
      where: eq(users.email, email),
    })
    if (user !== undefined) {
      const results = await db
        .update(users)
        .set({ role })
        .where(eq(users.id, user.id))
        .returning()
      return valOrError(results[0] as User)
    } else {
      const bareUser = {
        name: '',
        email,
        role,
      }
      const result = await db.insert(users).values(bareUser).returning()
      return valOrError(result[0] as User)
    }
  },
)
