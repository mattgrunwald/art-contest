import { Adapter } from '../adapter'
import { createCategory, readCategories } from './categories'
import { readJudgesScores } from './composite'
import {
  createJudge,
  readJudges,
  createAdmin,
  readAdmins,
  createContestant,
} from './roles'
import { readScores, createScore, updateScore } from './scores'
import {
  readSubmission,
  readSubmissionForEdit,
  readUserSubmission,
  readUserSubmissionForEdit,
  readSubmissionForJudge,
  readSubmissionForAdmin,
  readSubmissionForContestant,
  readSubmissions,
  readSubmissionsForGallery,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  approveSubmission,
  unapproveSubmission,
  readUnscoredSubmissionsForGallery,
  readUnapprovedSubmissionsForGallery,
  getNewSubmissionsCount,
} from './submissions'
import { createSubmittedImage } from './submittedImages'
import { deleteUser, deleteAllUsers } from './user'

export const DAO: Adapter = {
  readSubmission,
  readSubmissionForEdit,
  readUserSubmission,
  readUserSubmissionForEdit,
  readSubmissionForJudge,
  readSubmissionForAdmin,
  readSubmissionForContestant,

  readSubmissions,
  readSubmissionsForGallery,
  readUnscoredSubmissionsForGallery,
  readUnapprovedSubmissionsForGallery,

  createSubmission,
  updateSubmission,
  deleteSubmission,
  approveSubmission,
  unapproveSubmission,

  createScore,
  readScores,
  updateScore,

  createJudge,
  readJudges,

  createAdmin,
  readAdmins,

  createContestant,

  createCategory,
  readCategories,

  createSubmittedImage,

  deleteUser,
  deleteAllUsers,

  getNewSubmissionsCount,

  readJudgesScores,
}
