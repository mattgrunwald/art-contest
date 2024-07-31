'use server'

import { DAO } from '@/db/dao'
import { Level } from '@/db/util'
import { UpdateSubmissionDto } from '@/db/types'
import { newFormSchema, updateFormSchema } from './formSchema/server'

export async function submit(data: FormData): Promise<any> {
  const formData = Object.fromEntries(data)
  const formSchema = formData.submissionId ? updateFormSchema : newFormSchema
  const parsed = await formSchema.safeParseAsync(formData)

  if (!parsed.success) {
    console.error('failed to parse submission upload', parsed.error)
    return {
      message: 'Invalid form data',
    }
  }

  const {
    name,
    email,
    submissionId,
    grade,
    statement,
    street,
    street2,
    city,
    state,
    zip,
    phone,
    image,
    userId,
  } = parsed.data
  const level = parseInt(grade) >= 9 ? Level.HighSchool : Level.MiddleSchool

  try {
    const submission = {
      grade,
      level,
      statement,
      street,
      street2,
      city,
      state,
      zip,
      phone,
      approved: false,
    } as UpdateSubmissionDto

    if (!submissionId) {
      if (!image) {
        return {
          message: 'no image',
        }
      }
      if (!userId) {
        const { error } = await createNewUserAndSubmission(
          submission,
          name,
          email,
          image,
        )
      } else {
        const { error } = await createSubmission(submission, userId, image)
      }
    } else {
      if (!userId) {
        return {
          message: 'no user id',
        }
      }
      const { error } = await DAO.updateSubmission(userId, submissionId, {
        ...submission,
        approved: false,
        updatedAt: new Date(),
      })
    }

    return {
      message: 'success',
    }
  } catch (error) {
    return {
      message: (error as Error).message,
    }
  }
}

const createNewUserAndSubmission = (
  submission: UpdateSubmissionDto,
  name: string,
  email: string,
  image: File,
) => {
  const userData = {
    name,
    email,
  }

  const subData = {
    ...submission,
    approved: false,
    consentForm: null,
  }
  return DAO.createSubmissionAndUser(subData, userData, image)
}

const createSubmission = (
  submission: UpdateSubmissionDto,
  userId: string,
  image: File,
) => {
  const subData = {
    ...submission,
    userId,
    approved: false,
    consentForm: null,
  }

  return DAO.createSubmission(subData, image)
}
