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
  SubmissionForContestant,
  Category,
  CreateSubmissionDto,
  SubmittedImage,
  SubmissionForEdit,
} from './types'
import { Level } from './util'

export interface Adapter {
  readUserSubmission(
    userId: string,
  ): Promise<AdapterReturn<Submission | undefined>>
  readUserSubmissionForEdit(
    userId: string,
  ): Promise<AdapterReturn<SubmissionForEdit | undefined>>
  readSubmission(subId: number): Promise<AdapterReturn<Submission | undefined>>
  readSubmissionForEdit(
    subId: number,
  ): Promise<AdapterReturn<SubmissionForEdit | undefined>>
  readSubmissionForJudge(
    subId: number,
    userId: string,
  ): Promise<AdapterReturn<SubmissionForJudge>>
  readSubmissionForAdmin(
    subId: number,
  ): Promise<AdapterReturn<SubmissionForAdmin>>
  readSubmissionForContestant(
    subId: number,
  ): Promise<AdapterReturn<SubmissionForContestant>>

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
  readUnapprovedSubmissionsForGallery(
    level: Level,
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForGallery>>>

  createSubmission(sub: CreateSubmissionDto): Promise<AdapterReturn<Submission>>
  // TODO only allow updatable fields
  updateSubmission(
    subId: number,
    sub: UpdateSubmissionDto,
  ): Promise<AdapterReturn<Submission>>
  approveSubmission(subId: number): Promise<AdapterReturn<Submission>>
  unapproveSubmission(subId: number): Promise<AdapterReturn<Submission>>
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

  createContestant(email: string): Promise<AdapterReturn<User>>

  createCategory(category: Category): Promise<AdapterReturn<Category>>
  readCategories(): Promise<AdapterReturn<Category[]>>

  createSubmittedImage(
    userId: string,
    filename: string,
  ): Promise<AdapterReturn<SubmittedImage>>

  deleteUser(userId: string): Promise<Error | null>

  deleteAllUsers(): Promise<void>
}
