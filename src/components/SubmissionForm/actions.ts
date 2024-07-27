'use server'

import { DAO } from '@/db/dao'
import { Level } from '@/db/util'
import { put, PutBlobResult } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

const suffixes: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
}

async function uploadImage(
  image: File,
): Promise<[string | null, PutBlobResult | null]> {
  const { size, type } = image
  // todo check size
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

export async function submit(formData: FormData): Promise<string | null> {
  const rawFormData = {
    userId: formData.get('userId') as string,
    submissionId: formData.get('submissionId') as string,
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    grade: formData.get('grade') as string,
    statement: formData.get('statement') as string,
    imageFile: formData.get('image') as unknown as File,
  }

  let userId = rawFormData.userId

  if (rawFormData.userId === null) {
    // make new user
    userId = 'NEW NEW'
  }
  // todo validate none of these are null or empty string
  // TODO if admin is creating this, create user too
  const grade = parseInt((rawFormData.grade as string) || '0')
  const level = grade >= 9 ? Level.HighSchool : Level.MiddleSchool
  const imageFile = rawFormData.imageFile as File
  try {
    const [fileName, blob] = await uploadImage(imageFile)
    if (fileName) {
    }
    if (!blob) {
      return 'failed to upload image: unknown error'
    }
    await DAO.createSubmission({
      userId,
      grade,
      level,
      statement: (rawFormData.statement as string) || '',
      approved: false,
      consentForm: null,
      imageSrc: blob.url,
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    })
    return null
  } catch (error) {
    return (error as Error).message
  }
  // console.log('success!!!')
}
