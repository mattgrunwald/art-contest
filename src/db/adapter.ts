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
  SubCount,
  SubmissionForPdf,
} from './types'
import { Level, Role } from './util'

export interface Adapter {
  readSubmissionForEdit(
    userId?: string,
    subId?: string,
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
  readSubmissionsForPdf(
    page: number,
  ): Promise<AdapterReturn<PaginatedResults<SubmissionForPdf>>>

  countSubmissionsByDate(): Promise<AdapterReturn<SubCount[]>>

  hasUserSubmitted(
    userId: string,
  ): Promise<AdapterReturn<[boolean, string | undefined]>>

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

  makeJudge(email: string): Promise<AdapterReturn<User>>
  readJudges(): Promise<AdapterReturn<User[]>>

  makeAdmin(email: string): Promise<AdapterReturn<User>>
  readAdmins(): Promise<AdapterReturn<User[]>>

  makeContestant(email: string): Promise<AdapterReturn<User>>

  createCategory(category: Category): Promise<AdapterReturn<Category>>
  readCategories(): Promise<AdapterReturn<Category[]>>

  createSubmittedImage(
    userId: string,
    submissionId: string,
    url: string,
  ): Promise<AdapterReturn<SubmittedImage>>
  readImagesForSubmission(
    subId: string,
  ): Promise<AdapterReturn<SubmittedImage[]>>

  deleteUser(userId: string): Promise<Error | null>
  deleteAllUsers(): Promise<void>
  readUserByEmail(email: string): Promise<AdapterReturn<User | undefined>>
  updateUserImage(id: string, image: string): Promise<AdapterReturn<User>>

  // for bots
  getNewSubmissionsCount(): Promise<AdapterReturn<number>>

  readJudgesScores(subId: string): Promise<AdapterReturn<JudgeWithScores[]>>
}
