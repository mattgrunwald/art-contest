import { db } from '@/db/db'
import { count, eq, sql } from 'drizzle-orm'
import { users } from '../schema'
import { AdapterReturn, PaginatedResults, User } from '../types'
import { getPaginationParams, q, wrap } from './util'
import { Role } from '../util'
import { PAGE_SIZE } from '@/consts'

export const deleteUser = async (userId: string) => {
  await db.delete(users).where(eq(users.id, userId))
  return null
}

export const deleteAllUsers = async () => {
  await db.delete(users)
}

const findUserByEmailStatement = q.users
  .findFirst({
    where: (users, { eq }) => eq(users.email, sql.placeholder('email')),
  })
  .prepare('findUserByEmail')

export const readUserByEmail = wrap(
  async (email: string): Promise<AdapterReturn<User | undefined>> => {
    const user = await findUserByEmailStatement.execute({ email })

    return { data: user, error: null }
  },
)

export const updateUserImage = wrap(
  async (id: string, image: string): Promise<AdapterReturn<User>> => {
    const updatedUser = await db
      .update(users)
      .set({ image })
      .where(eq(users.id, id))
      .returning()
    return { data: updatedUser[0], error: null }
  },
)

const userWithSubmissionIdStatement = q.users
  .findFirst({
    columns: {
      id: true,
    },
    where: (users, { eq }) => eq(users.id, sql.placeholder('id')),
    with: {
      submission: {
        columns: {
          id: true,
        },
      },
    },
  })
  .prepare('userWithSubmissionId')

export const hasUserSubmitted = wrap(
  async (id: string): Promise<AdapterReturn<[boolean, string | undefined]>> => {
    const userWithSubmissionId = await userWithSubmissionIdStatement.execute({
      id,
    })

    const hasSubmitted = userWithSubmissionId !== undefined
    const subId = userWithSubmissionId?.submission.id
    return { data: [hasSubmitted, subId], error: null }
  },
)

export const readUsers = wrap(
  async (
    page: number,
    role?: Role,
  ): Promise<AdapterReturn<PaginatedResults<User>>> => {
    const { offset, limit } = getPaginationParams(page)

    const useWhere = role !== undefined
    const usersQuery = q.users.findMany({
      where: useWhere ? (users, { eq }) => eq(users.role, role) : undefined,
      offset,
      limit,
    })

    const countQuery = db
      .select({ count: count() })
      .from(users)
      .where(useWhere ? eq(users.role, role) : undefined)

    const [total, subs] = await Promise.all([countQuery, usersQuery])

    const pageCount = Math.ceil(total[0].count / PAGE_SIZE)
    return {
      error: null,
      data: {
        page,
        results: subs,
        total: pageCount !== 0 ? pageCount : 1,
      },
    }
  },
)
