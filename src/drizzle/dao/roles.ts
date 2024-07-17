import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { User } from '@/drizzle/types'
import { users } from '../schema'
import { AdapterReturn } from '../types'
import { Role } from '../util'
import { q, valOrError, wrap, wrapUserQuery } from './util'

const generateCreateRole = (role: Role) => {
  return async (email: string): Promise<AdapterReturn<User>> => {
    // check if in users table
    let user: User | undefined
    user = (await q.users.findFirst({
      where: eq(users.email, email),
    })) as User
    if (user !== undefined) {
      user.role = Role.Judge
      const x = await db
        .update(users)
        .set({ role })
        .where(eq(users.id, user.id))
        .returning()
    } else {
      const bareUser = {
        email,
        role,
      }
      const result = await db.insert(users).values(bareUser).returning()
      user = result[0] as User
    }
    return valOrError(user)
  }
}

export const createJudge = wrap(generateCreateRole(Role.Judge))

export const readJudges = wrapUserQuery(async () => {
  return (await q.users.findMany({
    where: eq(users.role, Role.Judge),
  })) as User[]
})

export const createAdmin = wrap(generateCreateRole(Role.Admin))

export const readAdmins = wrapUserQuery(async () => {
  return (await q.users.findMany({
    where: eq(users.role, Role.Admin),
  })) as User[]
})
