import { sql } from 'drizzle-orm'
import { db } from '../db'
import { submittedImages } from '../schema'
import { AdapterReturn, SubmittedImage } from '../types'
import { q, valOrError, wrap } from './util'
import { SubmittedImagesAdapter } from '../adapter'

export class SubmittedImagesDAO implements SubmittedImagesAdapter {
  createSubmittedImage = wrap(
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

  private readImagesForSubmissionStatement = q.submittedImages
    .findMany({
      where: (submittedImages, { eq }) =>
        eq(submittedImages.submissionId, sql.placeholder('subId')),
    })
    .prepare('readImagesBySubId')

  readImagesForSubmission = wrap(
    async (subId: string): Promise<AdapterReturn<SubmittedImage[]>> => {
      const results = await this.readImagesForSubmissionStatement.execute({
        subId,
      })
      return valOrError(results)
    },
  )
}
