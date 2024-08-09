'use server'

import { DAO } from '@/db/dao'
import { Level, Role } from '@/db/util'
import { UpdateSubmissionDto } from '@/db/types'
import {
  newFormSchema,
  updateFormSchema,
} from '../components/SubmissionForm/formSchema/server'
import { getRoleAndId } from '@/app/serverSideUtils'
import { createNewUserAndSubmission } from './admin/submissions'

export async function submit(data: FormData) {
  const { id, role } = await getRoleAndId()
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

  if (role !== Role.Admin && id !== userId) {
    return {
      message: 'unauthorized',
    }
  }

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

    let anyError = null
    if (!submissionId) {
      if (!image) {
        return {
          message: 'no image',
        }
      }
      if (!userId) {
        if (role === Role.Admin) {
          const { error } = await createNewUserAndSubmission(
            submission,
            name,
            email,
            image,
          )
          anyError = error
        } else {
          return {
            message: 'unauthorized',
          }
        }
      } else {
        const { error } = await createSubmission(submission, userId, image)
        anyError = error
      }
    } else {
      if (!userId) {
        return {
          message: 'no user id',
        }
      }
      const { error } = await DAO.updateSubmission(userId, submissionId, {
        ...submission,
        approved: role === Role.Admin,
        updatedAt: new Date(),
      })
      anyError = error
    }

    if (anyError) {
      return { message: anyError.message }
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
