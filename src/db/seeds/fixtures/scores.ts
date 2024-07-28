import { Score } from '@/db/types'
import { nextScoreId } from './util'
import { judges } from './users'
import { seedCategories } from './categories'
import { seedSubmissions } from './submissions'

export const seedScores: Score[] = [
  // judge 0 scores
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
  // judge 1 scores
  {
    id: nextScoreId(),
    judgeId: judges[1].id,
    submissionId: seedSubmissions[0].id,
    categoryId: seedCategories[0].id,
    score: 3.4,
  },
  {
    id: nextScoreId(),
    judgeId: judges[1].id,
    submissionId: seedSubmissions[0].id,
    categoryId: seedCategories[1].id,
    score: 4.5,
  },
  {
    id: nextScoreId(),
    judgeId: judges[1].id,
    submissionId: seedSubmissions[1].id,
    categoryId: seedCategories[0].id,
    score: 1.1,
  },
  {
    id: nextScoreId(),
    judgeId: judges[1].id,
    submissionId: seedSubmissions[1].id,
    categoryId: seedCategories[1].id,
    score: 3.3,
  },
  {
    id: nextScoreId(),
    judgeId: judges[1].id,
    submissionId: seedSubmissions[2].id,
    categoryId: seedCategories[0].id,
    score: 2.1,
  },
  {
    id: nextScoreId(),
    judgeId: judges[1].id,
    submissionId: seedSubmissions[2].id,
    categoryId: seedCategories[1].id,
    score: 3.0,
  },
]
