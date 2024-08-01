import { submissions, scores } from '@/db/schema'
import {
  AdapterReturn,
  Submission,
  SubmissionForJudge,
  SubmissionForAdmin,
  UpdateSubmissionDto,
  Score,
  SubmissionForContestant,
  CreateSubmissionDto,
  SubmissionForEdit,
} from '@/db/types'
import { db } from '@/db/db'
import { eq, avg, count, gt, sql } from 'drizzle-orm'
import { q, valOrError, wrap } from '../util'

export * from './paginated'

export const readSubmissionByUserIdForEdit = wrap(
  async (
    userId: string,
  ): Promise<AdapterReturn<SubmissionForEdit | undefined>> => {
    const sub = (await q.submissions.findFirst({
      where: eq(submissions.userId, userId),
      with: {
        user: true,
      },
    })) as SubmissionForEdit | undefined
    return valOrError(sub)
  },
)

export const readSubmissionForEdit = wrap(
  async (
    userId?: string,
    subId?: string,
  ): Promise<AdapterReturn<SubmissionForEdit | undefined>> => {
    if (userId) {
      return readSubmissionByUserIdForEdit(userId)
    } else if (subId) {
      return readSubmissionBySubIdForEdit(subId)
    }
    return { data: null, error: new Error('id not specified') }
  },
)

const readSubmissionBySubIdForEdit = wrap(
  async (
    subId: string,
  ): Promise<AdapterReturn<SubmissionForEdit | undefined>> => {
    const sub = (await q.submissions.findFirst({
      where: eq(submissions.id, subId),
      with: {
        user: true,
      },
    })) as SubmissionForEdit | undefined
    return valOrError(sub)
  },
)

export const readSubmissionForContestant = wrap(
  async (subId: string): Promise<AdapterReturn<SubmissionForContestant>> => {
    const sub = await q.submissions.findFirst({
      where: eq(submissions.id, subId),
    })

    return valOrError(sub)
  },
)

type SubmissionWithScores = Submission & {
  scores: Score[]
}

export const readSubmissionForAdmin = wrap(
  async (subId: string): Promise<AdapterReturn<SubmissionForAdmin>> => {
    const subPromise = q.submissions.findFirst({
      where: eq(submissions.id, subId),
    })

    const aggregateScorePromise = db
      .select({
        aggregateScore: avg(scores.score),
      })
      .from(scores)
      .where(eq(scores.submissionId, subId))

    const [sub, agResult] = await Promise.all([
      subPromise,
      aggregateScorePromise,
    ])

    if (sub && agResult.length > 0) {
      const agScore = agResult[0].aggregateScore || '-1'
      ;(sub as unknown as SubmissionForAdmin).aggregateScore =
        parseFloat(agScore)
    }

    if (!sub) {
      return { data: null, error: new Error('not found') }
    }

    const agScore = agResult[0].aggregateScore || '-1'

    const result = {
      ...sub,
      aggregateScore: parseFloat(agScore),
    } as SubmissionForAdmin

    return valOrError(result)
  },
)

export const approveSubmission = wrap(
  async (subId: string): Promise<AdapterReturn<Submission>> => {
    const results = await db
      .update(submissions)
      .set({ approved: true })
      .where(eq(submissions.id, subId))
      .returning()
    return valOrError(results[0])
  },
)

export const unapproveSubmission = wrap(
  async (subId: string): Promise<AdapterReturn<Submission>> => {
    const results = await db
      .update(submissions)
      .set({ approved: false })
      .where(eq(submissions.id, subId))
      .returning()
    return valOrError(results[0])
  },
)

export const getNewSubmissionsCount = wrap(
  async (): Promise<AdapterReturn<number>> => {
    const results = await db
      .select({ count: count() })
      .from(submissions)
      .where(gt(submissions.createdAt, sql`NOW() - INTERVAL '7 days'`))

    return valOrError(results[0].count)
  },
)
