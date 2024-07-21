import { Adapter } from '../adapter'
import { createCategory, updateCategory, readCategories } from './categories'
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
  readUnscoredSubmissionsForGallery,
} from './submissions'
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

  createSubmission,
  updateSubmission,
  deleteSubmission,

  readScores,
  createScore,
  updateScore,

  createJudge,
  readJudges,

  createAdmin,
  readAdmins,

  createContestant,

  createCategory,
  updateCategory,
  readCategories,

  deleteUser,
  deleteAllUsers,
}
