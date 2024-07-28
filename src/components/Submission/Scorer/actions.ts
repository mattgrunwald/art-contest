'use server'
import { DAO } from '@/db/dao'

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
  return DAO.createScore(dto)
}
export const updateScore = DAO.updateScore
