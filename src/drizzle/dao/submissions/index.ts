import { submissions, scores } from '@/drizzle/schema'
import {
  AdapterReturn,
  Submission,
  SubmissionForJudge,
  SubmissionForAdmin,
  UpdateSubmissionDto,
} from '@/drizzle/types'
import { db } from '@/drizzle/db'
import { eq, avg } from 'drizzle-orm'
import { q, valOrError, wrap } from '../util'

export * from './paginated'

export const readUserSubmission = wrap(
  async (userId: string): Promise<AdapterReturn<Submission>> => {
    const sub = await q.submissions.findFirst({
      where: eq(submissions.userId, userId),
    })
    return valOrError(sub)
  },
)

export const readSubmission = wrap(
  async (subId: number): Promise<AdapterReturn<Submission>> => {
    const sub = await q.submissions.findFirst({
      where: eq(submissions.id, subId),
    })
    return valOrError(sub)
  },
)

export const readSubmissionForJudge = wrap(
  async (
    subId: number,
    userId: string,
  ): Promise<AdapterReturn<SubmissionForJudge>> => {
    const sub = await q.submissions.findFirst({
      where: eq(submissions.id, subId),
      with: {
        scores: {
          where: (scores, { eq }) => eq(scores.userId, userId),
        },
      },
    })

    return valOrError(sub)
  },
)

export const readSubmissionForAdmin = wrap(
  async (subId: number): Promise<AdapterReturn<SubmissionForAdmin>> => {
    // This could probably be one query
    const subPromise = q.submissions.findFirst({
      where: eq(submissions.id, subId),
      with: {
        scores: true,
      },
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
      ;(sub as unknown as SubmissionForAdmin).aggregateScore =
        agResult[0].aggregateScore
    }

    return valOrError(sub) as AdapterReturn<SubmissionForAdmin>
  },
)

export const createSubmission = wrap(
  async (sub: Submission): Promise<AdapterReturn<Submission>> => {
    const results = await db.insert(submissions).values(sub).returning()
    return valOrError(results[0])
  },
)

export const updateSubmission = wrap(
  async (
    subId: number,
    sub: UpdateSubmissionDto,
  ): Promise<AdapterReturn<Submission>> => {
    await db.update(submissions).set(sub).where(eq(submissions.id, subId))
    return readSubmission(subId)
  },
)

export const deleteSubmission = async (
  subId: number,
): Promise<Error | null> => {
  await db.delete(submissions).where(eq(submissions.id, subId))
  return null
}
