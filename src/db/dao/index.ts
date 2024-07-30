import { Adapter } from '../adapter'
import * as categories from './categories'
import * as composite from './composite'
import * as roles from './roles'
import * as scores from './scores'
import * as submissions from './submissions'
import * as submittedImages from './submittedImages'
import * as transactions from './transactions'
import * as user from './user'

submissions.readSubmission

class DrizzleDAO implements Adapter {
  readSubmission = submissions.readSubmission
  readSubmissionForEdit = submissions.readSubmissionForEdit
  readUserSubmission = submissions.readUserSubmission
  readUserSubmissionForEdit = submissions.readUserSubmissionForEdit
  readSubmissionForJudge = submissions.readSubmissionForJudge
  readSubmissionForAdmin = submissions.readSubmissionForAdmin
  readSubmissionForContestant = submissions.readSubmissionForContestant

  readSubmissions = submissions.readSubmissions
  readSubmissionsForGallery = submissions.readSubmissionsForGallery
  readUnscoredSubmissionsForGallery =
    submissions.readUnscoredSubmissionsForGallery
  readUnapprovedSubmissionsForGallery =
    submissions.readUnapprovedSubmissionsForGallery

  createSubmission = submissions.createSubmission
  updateSubmission = submissions.updateSubmission
  deleteSubmission = submissions.deleteSubmission
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

  deleteUser = user.deleteUser
  deleteAllUsers = user.deleteAllUsers

  getNewSubmissionsCount = submissions.getNewSubmissionsCount

  readJudgesScores = composite.readJudgesScores

  createSubmissionAndUser = transactions.createSubmissionAndUser
}

export const DAO = new DrizzleDAO()
