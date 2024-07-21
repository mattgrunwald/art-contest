import { submissions, scores } from '@/db/schema'
import {
  AdapterReturn,
  Submission,
  SubmissionForJudge,
  SubmissionForAdmin,
  UpdateSubmissionDto,
  Score,
  SubmissionForContestant,
} from '@/db/types'
import { db } from '@/db/db'
import { eq, avg } from 'drizzle-orm'
import { q, valOrError, wrap } from '../util'

export * from './paginated'

export const readUserSubmission = wrap(
  async (userId: string): Promise<AdapterReturn<Submission | undefined>> => {
    const sub = await q.submissions.findFirst({
      where: eq(submissions.userId, userId),
    })
    return valOrError(sub)
  },
)

export const readSubmission = wrap(
  async (subId: number): Promise<AdapterReturn<Submission | undefined>> => {
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
          where: (scores, { eq }) => eq(scores.judgeId, userId),
        },
      },
    })

    return valOrError(sub)
  },
)

export const readSubmissionForContestant = wrap(
  async (subId: number): Promise<AdapterReturn<SubmissionForContestant>> => {
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
  async (subId: number): Promise<AdapterReturn<SubmissionForAdmin>> => {
    const subPromise = q.submissions.findFirst({
      where: eq(submissions.id, subId),
      with: {
        scores: {
          with: {
            user: {
              columns: {
                email: true,
                name: true,
              },
            },
          },
        },
      },
    })

    const rows = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, subId))
      .leftJoin(scores, eq(submissions.id, scores.submissionId))

    const result = rows.reduce<
      Record<number, { submission: SubmissionWithScores }>
    >((acc, row) => {
      const submission = row.submissions
      const score = row.scores

      if (!acc[submission.id]) {
        const s = { ...submission, scores: [] as Score[] }
        acc[submission.id] = { submission: s }
      }

      if (score) {
        acc[submission.id].submission.scores.push(score)
      }

      return acc
    }, {})

    console.log(result)
    console.log(result['1'].submission.scores)

    const query = subPromise.toSQL()
    console.log(query.sql)

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

    if (!sub) {
      return { data: null, error: new Error('not found') }
    }

    const scoreMap: Record<string, [string, Score[]]> = {}

    // TODO populate scores

    for (const score of sub.scores) {
      if (!scoreMap[score.user.email]) {
        scoreMap[score.user.email] = [score.user.name || '', []]
      }
      scoreMap[score.user.email][1].push({ ...score })
    }

    const result = {
      ...sub,
      aggregateScore: agResult.length > 0 ? agResult[0].aggregateScore : -1,
      scores: scoreMap,
    } as SubmissionForAdmin

    return valOrError(result)
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
    return readSubmission(subId) as Promise<AdapterReturn<Submission>>
  },
)

export const deleteSubmission = async (
  subId: number,
): Promise<Error | null> => {
  await db.delete(submissions).where(eq(submissions.id, subId))
  return null
}
