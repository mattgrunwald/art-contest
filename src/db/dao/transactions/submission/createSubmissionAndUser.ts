import { uploadImage } from '@/bucket'
import { db } from '../../../db'
import {
  CreateUserDto,
  AdapterReturn,
  Submission,
  CreateSubmissionForUnknownUserDto,
  CreateSubmissionDto,
} from '../../../types'
import { submissions, submittedImages, users } from '../../../schema'
import { nanoid } from 'nanoid'

export const createSubmissionAndUser = (
  sub: CreateSubmissionForUnknownUserDto,
  userData: CreateUserDto,
  image: File,
): Promise<AdapterReturn<Submission>> =>
  db.transaction(async (tx) => {
    const subData = sub as CreateSubmissionDto
    const rollbackAndError = async (error: Error | unknown) => {
      tx.rollback()
      return { data: null, error: error as Error }
    }

    try {
      // upload image
      const [uploadPromise, error] = uploadImage(image)
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
      const createResponse = await tx
        .insert(submissions)
        .values(subData)
        .returning()
      const newSub = createResponse[0]

      // create image record
      await tx
        .insert(submittedImages)
        .values({ url: blob.url, userId: user.id, submissionId: newSub.id })

      return { data: newSub, error: null }
    } catch (error) {
      return rollbackAndError(error)
    }
  })
