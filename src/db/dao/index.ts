import { Adapter } from '../adapter'
import * as categories from './categories'
import * as composite from './composite'
import * as roles from './roles'
import * as scores from './scores'
import * as submissions from './submissions'
import * as submittedImages from './submittedImages'
import * as transactions from './transactions'
import * as user from './user'
import * as ir from './initialRoles'

class DrizzleDAO implements Adapter {
  readSubmissionForEdit = submissions.readSubmissionForEdit
  readSubmissionForAdmin = submissions.readSubmissionForAdmin
  readSubmissionForContestant = submissions.readSubmissionForContestant

  readSubmissionsForGallery = submissions.readSubmissionsForGallery
  readUnscoredSubmissionsForGallery =
    submissions.readUnscoredSubmissionsForGallery
  readUnapprovedSubmissionsForGallery =
    submissions.readUnapprovedSubmissionsForGallery

  approveSubmission = submissions.approveSubmission
  unapproveSubmission = submissions.unapproveSubmission

  createScore = scores.createScore
  readScores = scores.readScores
  updateScore = scores.updateScore

  createJudge = roles.createJudge
  readJudges = roles.readJudges

  createAdmin = roles.createAdmin
  readAdmins = roles.readAdmins

  createContestant = roles.createContestant

  createCategory = categories.createCategory
  readCategories = categories.readCategories

  createSubmittedImage = submittedImages.createSubmittedImage
  readImagesForSubmission = submittedImages.readImagesForSubmission

  deleteUser = user.deleteUser
  deleteAllUsers = user.deleteAllUsers
  readUserByEmail = user.readUserByEmail

  getNewSubmissionsCount = submissions.getNewSubmissionsCount

  readJudgesScores = composite.readJudgesScores

  upsertInitialRole = ir.upsertInitialRole
  readInitialRole = ir.readInitialRole
  deleteInitialRole = ir.deleteInitialRole

  createSubmissionAndUser = transactions.createSubmissionAndUser
  createSubmission = transactions.createSubmission
  updateSubmission = transactions.updateSubmission
  deleteSubmission = transactions.deleteSubmission
  readSubmissionForJudge = transactions.readSubmissionForJudge
}

export const DAO = new DrizzleDAO()
