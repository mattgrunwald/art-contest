import { Adapter } from '../adapter'
import { createJudge, readJudges, createAdmin, readAdmins } from './roles'
import { readScores, createScore, updateScore } from './scores'
import {
  readSubmission,
  readUserSubmission,
  readSubmissionForJudge,
  readSubmissionForAdmin,
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

  deleteUser,
  deleteAllUsers,
}
