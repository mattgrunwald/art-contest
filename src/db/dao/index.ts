import { Adapter } from '../adapter'
import * as categories from './categories'
import * as composite from './composite'
import * as roles from './roles'
import * as scores from './scores'
import * as submissions from './submissions'
import * as submittedImages from './submittedImages'
import * as transactions from './transactions'
import * as user from './user'

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

  makeJudge = roles.makeJudge
  readJudges = roles.readJudges

  makeAdmin = roles.makeAdmin
  readAdmins = roles.readAdmins

  makeContestant = roles.makeContestant

  createCategory = categories.createCategory
  readCategories = categories.readCategories

  createSubmittedImage = submittedImages.createSubmittedImage
  readImagesForSubmission = submittedImages.readImagesForSubmission

  deleteUser = user.deleteUser
  deleteAllUsers = user.deleteAllUsers
  readUserByEmail = user.readUserByEmail
  updateUserImage = user.updateUserImage

  getNewSubmissionsCount = submissions.getNewSubmissionsCount

  readJudgesScores = composite.readJudgesScores

  createSubmissionAndUser = transactions.createSubmissionAndUser
  createSubmission = transactions.createSubmission
  updateSubmission = transactions.updateSubmission
  deleteSubmission = transactions.deleteSubmission
  readSubmissionForJudge = transactions.readSubmissionForJudge
}

export const DAO = new DrizzleDAO()
