import { PgTableWithColumns } from 'drizzle-orm/pg-core'
import { db } from './db' // todo define db outside of index
import { categories, scores, submissions, users } from './schema'
import { Role } from './util'

const dummy = async <T extends PgTableWithColumns<any>>(table: T) => {
  const results = await db.select().from(table)
  return results[0]
}

export const dummy2 = async () => {
  const x = await db.query.users.findFirst({
    with: {
      scores: true,
    },
  })
  if (x === undefined) {
    throw new Error('')
  }
  return x
}

export type DDType = Awaited<ReturnType<typeof dummy2>>

export type DType<T extends PgTableWithColumns<any>> = Awaited<
  ReturnType<typeof dummy<T>>
>

export type User = DType<typeof users> & {
  role: Role
}
export type Judge = User & Pick<DDType, 'scores'>
export type Submission = DType<typeof submissions>
export type UpdateSubmissionDto = Omit<
  Submission,
  'id' | 'userId' | 'createdAt'
>
export type Category = DType<typeof categories>
export type Score = DType<typeof scores>
export type CreateScoreDto = Omit<Score, 'id'>

export type AdapterReturn<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: Error
    }
