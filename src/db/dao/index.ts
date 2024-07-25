import { Adapter } from '../adapter'
import { createCategory, readCategories } from './categories'
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
  readUserSubmission,
  readSubmissionForJudge,
  readSubmissionForAdmin,
  readSubmissionForContestant,
  readSubmissions,
  readSubmissionsForGallery,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  approveSubmission,
  readUnscoredSubmissionsForGallery,
  readUnapprovedSubmissionsForGallery,
} from './submissions'
import { createSubmittedImage } from './submittedImages'
import { deleteUser, deleteAllUsers } from './user'

export const DAO: Adapter = {
  readSubmission,
  readUserSubmission,
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
}
