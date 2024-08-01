import { scores, submissions } from '@/db/schema'
import { AdapterReturn, SubmissionForJudge } from '@/db/types'
import { eq } from 'drizzle-orm'
import { wrap } from '../util'
import { db } from '@/db/db'
import { readCategories } from '../categories'

export const readSubmissionForJudge = wrap(
  async (
    subId: string,
    userId: string,
  ): Promise<AdapterReturn<SubmissionForJudge>> => {
    const subResult = db.transaction(async (tx) => {
      try {
        const categoriesPromise = readCategories()
        const subPromise = tx.query.submissions.findFirst({
          where: eq(submissions.id, subId),
          with: {
            scores: {
              where: (scores, { eq }) => eq(scores.judgeId, userId),
              orderBy: scores.categoryId,
            },
          },
        })

        const [categoriesResult, sub] = await Promise.all([
          categoriesPromise,
          subPromise,
        ])

        if (categoriesResult.error) {
          return { data: null, error: categoriesResult.error }
        }
        if (!sub) {
          return { data: null, error: new Error(`could not find sub ${subId}`) }
        }

        const categories = categoriesResult.data
        if (sub.scores.length < categories.length) {
          const scoredCategories = sub.scores.map((score) => score.categoryId)
          const newScores = categories
            .filter((c) => !scoredCategories.includes(c.id))
            .map((c) => ({
              judgeId: userId,
              submissionId: subId,
              categoryId: c.id,
              score: 0,
            }))
          const results = await tx.insert(scores).values(newScores).returning()
          sub.scores.push(...results)
          sub.scores.sort((a, b) => (a.categoryId < b.categoryId ? -1 : 1))
        }

        return { data: sub, error: null }
      } catch (error) {
        tx.rollback()
        return { data: null, error: error as Error }
      }
    })

    return subResult
  },
)
