'use server'
import { MAX_SCORE, MIN_SCORE } from '@/consts'
import { DAO } from '@/db/dao'
import { revalidatePath } from 'next/cache'

export const createScore = async (
  judgeId: string,
  submissionId: string,
  categoryId: string,
  score: number,
) => {
  const dto = {
    judgeId,
    submissionId,
    categoryId,
    score,
  }

  if (score > MAX_SCORE || score < MIN_SCORE) {
    return {
      data: null,
      error: new Error(`score must be between ${MIN_SCORE}and ${MAX_SCORE}`),
    }
  }

  const result = await DAO.scores.createScore(dto)
  revalidatePath('/gallery/unscored/page')
  revalidatePath('/gallery/unscored/[page]/page', 'page')
  return result
}

export const updateScore = async (
  userId: string,
  submissionId: string,
  categoryId: string,
  score: number,
) => {
  const result = await DAO.scores.updateScore(
    userId,
    submissionId,
    categoryId,
    score,
  )
  revalidatePath('/gallery/unscored/page')
  revalidatePath('/gallery/unscored/[page]/page', 'page')
  return result
}
