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
import { Level } from './util'

export interface SubmissionsReadAdapter {
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
}

export interface SubmissionsAdapter {
  read: SubmissionsReadAdapter

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

  getNewSubmissionsCount(): Promise<AdapterReturn<number>>
}

export interface UsersAdapter {
  hasUserSubmitted(
    userId: string,
  ): Promise<AdapterReturn<[boolean, string | undefined]>>

  deleteUser(userId: string): Promise<Error | null>
  deleteAllUsers(): Promise<void>
  readUserByEmail(email: string): Promise<AdapterReturn<User | undefined>>
  updateUserImage(id: string, image: string): Promise<AdapterReturn<User>>

  makeJudge(email: string): Promise<AdapterReturn<User>>
  readJudges(): Promise<AdapterReturn<User[]>>

  makeAdmin(email: string): Promise<AdapterReturn<User>>
  readAdmins(): Promise<AdapterReturn<User[]>>

  makeContestant(email: string): Promise<AdapterReturn<User>>
}

export interface ScoresAdapter {
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
  readJudgesScores(subId: string): Promise<AdapterReturn<JudgeWithScores[]>>
}

export interface SubmittedImagesAdapter {
  createSubmittedImage(
    userId: string,
    submissionId: string,
    url: string,
  ): Promise<AdapterReturn<SubmittedImage>>
  readImagesForSubmission(
    subId: string,
  ): Promise<AdapterReturn<SubmittedImage[]>>
}

export interface CategoriesAdapter {
  createCategory(category: Category): Promise<AdapterReturn<Category>>
  readCategories(): Promise<AdapterReturn<Category[]>>
}

export interface Adapter {
  categories: CategoriesAdapter
  scores: ScoresAdapter
  submissions: SubmissionsAdapter
  users: UsersAdapter
}
