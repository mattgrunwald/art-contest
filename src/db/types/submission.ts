import { submissions } from '../schema'
import { JudgeWithScores } from './composite'
import { Score, Submission } from './tables'
import { User } from './user'

export type CreateSubmissionDto = Omit<
  Submission,
  'id' | 'createdAt' | 'updatedAt'
>
export type CreateSubmissionForUnknownUserDto = Omit<
  Submission,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
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
  'id' | 'level' | 'imageSrc' | 'statement' | 'userId' | 'approved'
>
export type SubmissionForGallery = Pick<Submission, 'id' | 'level' | 'imageSrc'>
export type UpdateSubmissionDto = Omit<
  Submission,
  'id' | 'userId' | 'createdAt'
>
export type SubmissionForEdit = Submission & {
  user: User
}
