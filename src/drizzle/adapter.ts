import {
  Submission,
  AdapterReturn,
  Score,
  User,
  UpdateSubmissionDto,
  CreateScoreDto,
} from './types'

export interface Adapter {
  readUserSubmission(
    userId: string,
    year: number,
  ): Promise<AdapterReturn<Submission>>
  readSubmission(subId: number): Promise<AdapterReturn<Submission>>
  readSubmissions(
    limit: number,
    offset: number,
    year: number,
  ): Promise<AdapterReturn<Submission[]>>
  createSubmission(sub: Submission): Promise<AdapterReturn<Submission>>
  // TODO only allow updatable fields
  updateSubmission(
    subId: number,
    sub: UpdateSubmissionDto,
  ): Promise<AdapterReturn<Submission>>
  deleteSubmission(subId: number): Promise<Error | null>

  readScores(
    userId: string,
    submissionId: number,
  ): Promise<AdapterReturn<Score[]>>
  createScore(score: CreateScoreDto): Promise<AdapterReturn<Score>>
  updateScore(
    userId: string,
    submissionId: number,
    categoryId: number,
    score: number,
  ): Promise<AdapterReturn<Score>>

  createJudge(email: string): Promise<AdapterReturn<User>>
  readJudges(): Promise<AdapterReturn<User[]>>

  createAdmin(email: string): Promise<AdapterReturn<User>>
  readAdmins(): Promise<AdapterReturn<User[]>>

  deleteUser(userId: string): Promise<Error | null>

  deleteAllUsers(): Promise<void>
  //TK
  // which judges have unscored or partially scored submissions
}
