import { sql } from 'drizzle-orm'
import { db } from '../db'
import { submittedImages } from '../schema'
import { AdapterReturn, SubmittedImage } from '../types'
import { q, valOrError, wrap } from './util'

export const createSubmittedImage = wrap(
  async (
    userId: string,
    submissionId: string,
    url: string,
  ): Promise<AdapterReturn<SubmittedImage>> => {
    const results = await db
      .insert(submittedImages)
      .values({ userId, submissionId, url })
      .returning()

    return valOrError(results[0])
  },
)

const readImagesForSubmissionStatement = q.submittedImages
  .findMany({
    where: (submittedImages, { eq }) =>
      eq(submittedImages.submissionId, sql.placeholder('subId')),
  })
  .prepare('readImagesBySubId')

export const readImagesForSubmission = wrap(
  async (subId: string): Promise<AdapterReturn<SubmittedImage[]>> => {
    const results = await readImagesForSubmissionStatement.execute({ subId })
    return valOrError(results)
  },
)
