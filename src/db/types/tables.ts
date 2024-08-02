import {
  categories,
  scores,
  submittedImages,
  initialRoles,
  users,
  submissions,
} from '../schema'

export type BaseUser = typeof users.$inferSelect
export type Category = typeof categories.$inferSelect
export type InitialRole = typeof initialRoles.$inferSelect
export type Score = typeof scores.$inferSelect
export type CreateScoreDto = typeof scores.$inferInsert
export type Submission = typeof submissions.$inferSelect
export type SubmittedImage = typeof submittedImages.$inferSelect
