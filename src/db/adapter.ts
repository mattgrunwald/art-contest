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
  JudgeWithScores,
  CreateUserDto,
  CreateSubmissionForUnknownUserDto,
} from './types'
import { Level } from './util'

export interface Adapter {
  readUserSubmission(
    userId: string,
  ): Promise<AdapterReturn<Submission | undefined>>
  readUserSubmissionForEdit(
    userId: string,
  ): Promise<AdapterReturn<SubmissionForEdit | undefined>>
  readSubmission(subId: string): Promise<AdapterReturn<Submission | undefined>>
  readSubmissionForEdit(
    subId: string,
  ): Promise<AdapterReturn<SubmissionForEdit | undefined>>
  readSubmissionForJudge(
    subId: string,
    userId: string,
  ): Promise<AdapterReturn<SubmissionForJudge>>
  readSubmissionForAdmin(
    subId: string,
  ): Promise<AdapterReturn<SubmissionForAdmin>>
  readSubmissionForContestant(
    subId: string,
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

  createSubmissionAndUser(
    sub: CreateSubmissionForUnknownUserDto,
    user: CreateUserDto,
    image: File,
  ): Promise<AdapterReturn<Submission>>
  createSubmission(
    sub: CreateSubmissionDto,
    image: File,
  ): Promise<AdapterReturn<Submission>>
  // TODO only allow updatable fields
  updateSubmission(
    userId: string,
    subId: string,
    sub: UpdateSubmissionDto,
  ): Promise<AdapterReturn<Submission>>
  approveSubmission(subId: string): Promise<AdapterReturn<Submission>>
  unapproveSubmission(subId: string): Promise<AdapterReturn<Submission>>
  deleteSubmission(subId: string): Promise<Error | null>

  readScores(
    userId: string,
    submissionId: string,
  ): Promise<AdapterReturn<Score[]>>
  createScore(score: CreateScoreDto): Promise<AdapterReturn<Score>>
  updateScore(
    userId: string,
    submissionId: string,
    categoryId: string,
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

  // for bots
  getNewSubmissionsCount(): Promise<AdapterReturn<number>>

  readJudgesScores(subId: string): Promise<AdapterReturn<JudgeWithScores[]>>
}
