'use server'

import { DAO } from '@/db/dao'
import { Level } from '@/db/util'
import { put, PutBlobResult } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'
import { formSchema } from './formSchema/server'
import { createHash } from 'node:crypto'
import { UpdateSubmissionDto } from '@/db/types'

const suffixes: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
}

async function uploadImage(
  image: File,
): Promise<[string | null, PutBlobResult | null]> {
  const { type } = image
  const suffix = suffixes[type]
  if (!suffix) {
    // todo error?
    console.error(new Error(`unknown file type "${type}"`))
    return [null, null]
  }

  const fileName = `${uuidv4()}${suffix}`
  try {
    const blob = await put(fileName, image, {
      access: 'public',
    })
    return [fileName, blob]
  } catch (error) {
    console.error(error)
    return [fileName, null]
  }
}

export async function submit(data: FormData): Promise<any> {
  const formData = Object.fromEntries(data)
  const parsed = await formSchema.safeParseAsync(formData)

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    }
  }

  console.log(parsed.data)

  const {
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
  } = parsed.data
  let userId = parsed.data.userId
  const level = parseInt(grade) >= 9 ? Level.HighSchool : Level.MiddleSchool

  if (userId === null) {
    // TODO if admin is creating this, create user too
    userId = 'NEW NEW'
    // await DAO.createUser
  }
  try {
    const buffer = await image.arrayBuffer()
    const imageHash = createHash('md5')
      .update(Buffer.from(buffer))
      .digest('hex')
    // TODO detect if image has changed, upload if it has

    let existingHash = ''
    if (submissionId) {
      const { data, error } = await DAO.readSubmission(submissionId)
      if (error !== null) {
        return {
          message: error.message,
        }
      } else if (data) {
        existingHash = data.imageHash
      }
    }

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
      imageHash,
      approved: false,
    } as UpdateSubmissionDto

    if (imageHash !== existingHash) {
      const [fileName, blob] = await uploadImage(image)
      // TODO add upload to submittedImages table
      submission.imageSrc = blob?.url || ''
      if (!blob) {
        return {
          message: 'failed to upload image: unknown error',
        }
      }
    }
    if (!submissionId) {
      await DAO.createSubmission({
        ...submission,
        userId,
        approved: false,
        consentForm: null,
      })
    } else {
      await DAO.updateSubmission(submissionId, {
        ...submission,
        approved: false,
        consentForm: null,
        updatedAt: new Date(), // todo set timezone here?
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
