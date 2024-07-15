import { eq, and } from 'drizzle-orm'
import { Adapter } from './adapter'
import { db } from './db'
import {
  AdapterReturn,
  Submission,
  Score,
  User,
  UpdateSubmissionDto,
  CreateScoreDto,
} from './types'
import { submissions, scores, users } from './schema'
import { Role } from './util'

const q = db.query

const valOrError = <T>(val: T | undefined): AdapterReturn<T> => {
  if (val === undefined) {
    return { data: null, error: new Error('not found') }
  } else {
    return {
      data: val,
      error: null,
    }
  }
}

const readUserSubmission = async (
  userId: string,
  year: number,
): Promise<AdapterReturn<Submission>> => {
  const sub = await q.submissions.findFirst({
    where: and(eq(submissions.userId, userId), eq(submissions.year, year)),
  })
  return valOrError(sub)
}

const readSubmission = async (
  subId: number,
): Promise<AdapterReturn<Submission>> => {
  const sub = await q.submissions.findFirst({
    where: eq(submissions.id, subId),
  })
  return valOrError(sub)
}

const readSubmissions = async (
  limit: number,
  offset: number,
  year: number,
): Promise<AdapterReturn<Submission[]>> => {
  const subs = await q.submissions.findMany({
    where: eq(submissions.year, year),
    limit,
    offset,
  })

  return valOrError(subs)
}

const createSubmission = async (
  sub: Submission,
): Promise<AdapterReturn<Submission>> => {
  await db.insert(submissions).values(sub)
  return readUserSubmission(sub.userId, sub.year)
}

const updateSubmission = async (
  subId: number,
  sub: UpdateSubmissionDto,
): Promise<AdapterReturn<Submission>> => {
  await db.update(submissions).set(sub).where(eq(submissions.id, subId))
  return readSubmission(subId)
}

const deleteSubmission = async (subId: number): Promise<Error | null> => {
  await db.delete(submissions).where(eq(submissions.id, subId))
  return null
}

const readScores = async (
  userId: string,
  submissionId: number,
): Promise<AdapterReturn<Score[]>> => {
  const results = await q.scores.findMany({
    where: and(
      eq(scores.userId, userId),
      eq(scores.submissionId, submissionId),
    ),
  })

  return valOrError(results)
}

const readScore = async (
  userId: string,
  submissionId: number,
  categoryId: number,
): Promise<AdapterReturn<Score>> => {
  const score = await q.scores.findFirst({
    where: and(
      eq(scores.userId, userId),
      eq(scores.submissionId, submissionId),
      eq(scores.categoryId, categoryId),
    ),
  })

  return valOrError(score)
}

const createScore = async (
  score: CreateScoreDto,
): Promise<AdapterReturn<Score>> => {
  await db.insert(scores).values(score)
  return readScore(score.userId, score.submissionId, score.categoryId)
}

const updateScore = async (
  userId: string,
  submissionId: number,
  categoryId: number,
  score: number,
): Promise<AdapterReturn<Score>> => {
  await db
    .update(scores)
    .set({ score })
    .where(
      and(
        eq(scores.userId, userId),
        eq(scores.submissionId, submissionId),
        eq(scores.categoryId, categoryId),
      ),
    )
  return readScore(userId, submissionId, categoryId)
}

const generateCreateRole = (role: Role) => {
  return async (email: string): Promise<AdapterReturn<User>> => {
    // check if in users table
    let user: any
    user = await q.users.findFirst({
      where: eq(users.email, email),
    })
    if (user === undefined) {
      user.role = Role.Judge
      await db.update(users).set({ role }).where(eq(users.id, user.id))
    } else {
      user = {
        email,
        role,
      }
      await db.insert(users).values(user)
    }
    let result = await q.users.findFirst({
      where: eq(users.email, email),
    })
    return valOrError(result as User)
  }
}

const createJudge = generateCreateRole(Role.Judge)
const createAdmin = generateCreateRole(Role.Admin)

const deleteUser = async (userId: string) => {
  await db.delete(users).where(eq(users.id, userId))
  return null
}

export const DAO: Adapter = {
  readSubmission,
  readUserSubmission,
  readSubmissions,

  createSubmission,
  updateSubmission,
  deleteSubmission,

  readScores,
  createScore,
  updateScore,

  createJudge,
  createAdmin,
  deleteUser,
}
