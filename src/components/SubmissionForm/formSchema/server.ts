import 'server-only'

import { MAX_FILE_SIZE } from '@/consts'
import { z } from 'zod'
import { baseSchema } from './base'

const checkType = (file: File) => {
  switch (file.type) {
    case 'image/jpeg':
      return true
    case 'image/png':
      return true
    case 'image/webp':
      return true
    default:
      return false
  }
}

const checkTypeMessage = {
  message: 'Must be jpeg, png, or webp',
}

const checkSize = (file: File) => {
  return file.size < MAX_FILE_SIZE
}

const checkSizeMessage = {
  message: 'Must be under 4.5MB',
}

const imageValidator = z
  .instanceof(File)
  .refine(checkType, checkTypeMessage)
  .refine(checkSize, checkSizeMessage)

const optionalImageValidator = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    console.log('HEY MATT FILE IS', file)
    return !file || checkType(file)
  }, checkTypeMessage)
  .refine((file) => !file || checkSize(file), checkSizeMessage)

export const newFormSchema = z.object({
  ...baseSchema,
  image: imageValidator,
  userId: z.string().nullable(),
  submissionId: z.string().nullable(),
})

export const updateFormSchema = z.object({
  ...baseSchema,
  image: optionalImageValidator,
  userId: z.string().nullable(),
  submissionId: z.string().nullable(),
})

export type CreateFormSchemaOutput = z.output<typeof newFormSchema>
export type UpdateFormSchemaOutput = z.output<typeof updateFormSchema>
