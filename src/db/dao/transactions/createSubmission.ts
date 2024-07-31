import { uploadImage } from '@/bucket'
import { db } from '../../db'
import { AdapterReturn, Submission, CreateSubmissionDto } from '../../types'
import { submissions, submittedImages } from '../../schema'

export const createSubmission = (
  sub: CreateSubmissionDto,
  image: File,
): Promise<AdapterReturn<Submission>> =>
  db.transaction(async (tx) => {
    const subData = sub as CreateSubmissionDto
    const rollbackAndError = async (error: Error | unknown) => {
      await tx.rollback()
      return { data: null, error: error as Error }
    }

    try {
      // upload image
      const [filename, uploadPromise, error] = uploadImage(image)
      if (error) {
        return rollbackAndError(error)
      }
      const blob = await uploadPromise

      subData.imageSrc = blob.url

      // create submission
      const subPromise = tx.insert(submissions).values(subData).returning()

      // create image record
      const imageRecordPromise = await tx
        .insert(submittedImages)
        .values({ filename, userId: sub.userId })

      const [newSubResponse, imageRecord] = await Promise.all([
        subPromise,
        imageRecordPromise,
      ])

      return { data: newSubResponse[0], error: null }
    } catch (error) {
      return rollbackAndError(error)
    }
  })
