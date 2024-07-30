import { uploadImage } from '@/bucket'
import { db } from '../../db'
import { AdapterReturn, Submission, UpdateSubmissionDto } from '../../types'
import { submissions, submittedImages } from '../../schema'
import { eq } from 'drizzle-orm'

export const updateSubmission = (
  userId: string,
  subId: string,
  sub: UpdateSubmissionDto,
  image?: File,
): Promise<AdapterReturn<Submission>> =>
  db.transaction(async (tx) => {
    const rollbackAndError = async (error: Error | unknown) => {
      await tx.rollback()
      return { data: null, error: error as Error }
    }

    try {
      const promises: Promise<any>[] = []
      if (image) {
        // upload image
        const [filename, uploadPromise, error] = uploadImage(image)
        if (error) {
          return rollbackAndError(error)
        }
        sub.imageSrc = filename
        promises.push(uploadPromise)

        // create image record
        const imageRecordPromise = tx
          .insert(submittedImages)
          .values({ filename, userId: userId })
        promises.push(imageRecordPromise)
      }

      // update submission
      const subPromise = tx
        .update(submissions)
        .set(sub)
        .where(eq(submissions.id, subId))
        .returning()

      promises.unshift(subPromise)

      const [subResponse, ...others] = await Promise.all(promises)
      const updatedSub = (subResponse as Submission[])[0]

      return { data: updatedSub, error: null }
    } catch (error) {
      return rollbackAndError(error)
    }
  })
