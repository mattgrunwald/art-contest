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
export async function submit(userId: string, formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    name: formData.get('name'),
    grade: formData.get('grade'),
    // statement: formData.get('statement'),
    statement: 'wow aart',
    imageFile: formData.get('image') as unknown as File,
  }

  // todo validate none of these are null

  // TODO if admin is creating this, create user too

  const grade = parseInt((rawFormData.grade as string) || '0')
  const level = grade >= 9 ? Level.HighSchool : Level.MiddleSchool

  const imageFile = rawFormData.imageFile as File
  const [fileName, blob] = await uploadImage(imageFile)

  if (fileName) {
  }

  if (!blob) {
    return {
      data: null,
      error: 'unknown',
    }
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
  console.log('success!!!')
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
