import {
  categories,
  scores,
  submissions,
  users,
  submittedImages,
} from './schema'
import { Role } from './util'

export type User = typeof users.$inferSelect & {
  role: Role
}
export type Submission = typeof submissions.$inferSelect
export type CreateSubmissionDto = Omit<
  Submission,
  'id' | 'createdAt' | 'updatedAt'
>
export type ScrubbedSubmission = Pick<
  Submission,
  'id' | 'grade' | 'level' | 'statement' | 'imageSrc'
>
export type SubmissionForJudge = ScrubbedSubmission & {
  scores: Score[]
}

export type SubmissionForAdmin = Submission & {
  scores: JudgeWithScores[]
  aggregateScore: number
}

export type SubmissionForContestant = Pick<
  Submission,
  'id' | 'level' | 'imageSrc' | 'statement'
>
export type SubmissionForGallery = Pick<Submission, 'id' | 'level' | 'imageSrc'>
export type UpdateSubmissionDto = Omit<
  Submission,
  'id' | 'userId' | 'createdAt'
>
export type SubmissionForEdit = Submission & {
  user: User
}

export type Category = typeof categories.$inferSelect
export type Score = typeof scores.$inferSelect
export type CreateScoreDto = typeof scores.$inferInsert
export type SubmittedImage = typeof submittedImages.$inferSelect

export type AdapterReturn<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: Error
    }

export type PaginatedResults<T> = {
  page: number
  results: T[]
  total: number
}

export type JudgeWithScores = {
  id: string
  name: string
  email: string
  scores: {
    categoryId: string
    score: number | null
  }[]
}
