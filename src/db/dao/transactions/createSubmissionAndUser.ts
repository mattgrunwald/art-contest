import { uploadImage } from '@/bucket'
import { db } from '../../db'
import {
  CreateUserDto,
  AdapterReturn,
  Submission,
  CreateSubmissionForUnknownUserDto,
  CreateSubmissionDto,
} from '../../types'
import { submissions, submittedImages, users } from '../../schema'

export const createSubmissionAndUser = (
  sub: CreateSubmissionForUnknownUserDto,
  userData: CreateUserDto,
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

      // create user
      const userResults = await tx
        .insert(users)
        .values(userData)
        .onConflictDoNothing()
        .returning()

      const user = userResults[0]
      subData.userId = user.id

      // create submission
      const subPromise = tx.insert(submissions).values(subData).returning()

      // create image record
      const imageRecordPromise = await tx
        .insert(submittedImages)
        .values({ filename, userId: user.id })

      const [newSubResponse, imageRecord] = await Promise.all([
        subPromise,
        imageRecordPromise,
      ])

      return { data: newSubResponse[0], error: null }
    } catch (error) {
      return rollbackAndError(error)
    }
  })
