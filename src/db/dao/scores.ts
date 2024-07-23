import { scores } from '@/db/schema'
import { AdapterReturn, Score, CreateScoreDto } from '@/db/types'
import { db } from '@/db/db'
import { and, eq } from 'drizzle-orm'
import { q, valOrError, wrap } from './util'

export const readScores = wrap(
  async (
    userId: string,
    submissionId: number,
  ): Promise<AdapterReturn<Score[]>> => {
    const results = await q.scores.findMany({
      where: and(
        eq(scores.judgeId, userId),
        eq(scores.submissionId, submissionId),
      ),
    })

    return valOrError(results)
  },
)

export const readScore = wrap(
  async (
    userId: string,
    submissionId: number,
    categoryId: number,
  ): Promise<AdapterReturn<Score>> => {
    const score = await q.scores.findFirst({
      where: and(
        eq(scores.judgeId, userId),
        eq(scores.submissionId, submissionId),
        eq(scores.categoryId, categoryId),
      ),
    })

    return valOrError(score)
  },
)

export const createScore = wrap(
  async (score: CreateScoreDto): Promise<AdapterReturn<Score>> => {
    const s = await db.insert(scores).values(score).returning()
    return valOrError(s[0])
  },
)

export const updateScore = wrap(
  async (
    userId: string,
    submissionId: number,
    categoryId: number,
    score: number,
  ): Promise<AdapterReturn<Score>> => {
    const results = await db
      .update(scores)
      .set({ score })
      .where(
        and(
          eq(scores.judgeId, userId),
          eq(scores.submissionId, submissionId),
          eq(scores.categoryId, categoryId),
        ),
      )
      .returning()
    return valOrError(results[0])
  },
)
