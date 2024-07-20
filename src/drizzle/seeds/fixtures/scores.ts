import { Score } from '@/drizzle/types'
import { nextScoreId } from './util'
import { judges } from './users'
import { seedCategories } from './categories'
import { seedSubmissions } from './submissions'

export const seedScores: Score[] = [
  {
    id: nextScoreId(),
    judgeId: judges[0].id,
    submissionId: seedSubmissions[0].id,
    categoryId: seedCategories[0].id,
    score: 5.5,
  },
  {
    id: nextScoreId(),
    judgeId: judges[0].id,
    submissionId: seedSubmissions[0].id,
    categoryId: seedCategories[1].id,
    score: 7.2,
  },
  {
    id: nextScoreId(),
    judgeId: judges[0].id,
    submissionId: seedSubmissions[1].id,
    categoryId: seedCategories[0].id,
    score: 8.1,
  },
  {
    id: nextScoreId(),
    judgeId: judges[0].id,
    submissionId: seedSubmissions[1].id,
    categoryId: seedCategories[1].id,
    score: 9.9,
  },
  {
    id: nextScoreId(),
    judgeId: judges[0].id,
    submissionId: seedSubmissions[2].id,
    categoryId: seedCategories[0].id,
    score: 4.5,
  },
  {
    id: nextScoreId(),
    judgeId: judges[0].id,
    submissionId: seedSubmissions[2].id,
    categoryId: seedCategories[1].id,
    score: 2.8,
  },
]
