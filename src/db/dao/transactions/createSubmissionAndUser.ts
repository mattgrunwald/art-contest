import { uploadImage } from '@/bucket'
import { db } from '../../db'
import {
  CreateSubmissionDto,
  CreateUserDto,
  AdapterReturn,
  Submission,
} from '../../types'
import { submissions, submittedImages, users } from '../../schema'

export const createSubmissionAndUser = (
  sub: CreateSubmissionDto,
  userData: CreateUserDto,
  image: File,
): Promise<AdapterReturn<Submission>> =>
  db.transaction(async (tx) => {
    const rollbackAndError = async (error: Error | unknown) => {
      await tx.rollback()
      return { data: null, error: error as Error }
    }

    try {
      // upload image
      const [filename, uploadPromise, error] = await uploadImage(image)
      if (error) {
        return rollbackAndError(error)
      }

      // create user
      const userResults = await tx
        .insert(users)
        .values(userData)
        .onConflictDoNothing()
        .returning()

      const user = userResults[0]
      sub.imageSrc = filename

      // create submission
      const subPromise = db.insert(submissions).values(sub).returning()

      // create image record
      const imageRecordPromise = await db
        .insert(submittedImages)
        .values({ filename, userId: user.id })

      const [imageBlob, newSubResponse, imageRecord] = await Promise.all([
        uploadPromise,
        subPromise,
        imageRecordPromise,
      ])

      return { data: newSubResponse[0], error: null }
    } catch (error) {
      return rollbackAndError(error)
    }
  })
