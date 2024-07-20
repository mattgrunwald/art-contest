import { Adapter } from '../adapter'
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

  createScore,
  readScores,
  updateScore,

  createJudge,
  readJudges,

  createAdmin,
  readAdmins,

  createContestant,

  deleteUser,
  deleteAllUsers,
}
