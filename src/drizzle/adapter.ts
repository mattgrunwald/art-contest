import {
  Submission,
  AdapterReturn,
  Score,
  User,
  UpdateSubmissionDto,
  CreateScoreDto,
  SubmissionForAdmin,
  SubmissionForJudge,
  SubmissionForGallery,
  PaginatedResults,
} from './types'
import { Level } from './util'

export interface Adapter {
  readUserSubmission(
    userId: string,
  ): Promise<AdapterReturn<Submission | undefined>>
  readSubmission(subId: number): Promise<AdapterReturn<Submission | undefined>>
  readSubmissionForJudge(
    subId: number,
    userId: string,
  ): Promise<AdapterReturn<SubmissionForJudge | undefined>>
  readSubmissionForAdmin(
    subId: number,
  ): Promise<AdapterReturn<SubmissionForAdmin>>

  readSubmissions(
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>>
  readSubmissionsForGallery(
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>>
  readUnscoredSubmissionsForGallery(
    userId: string,
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>>

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
}
