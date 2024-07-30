'use client'

import { MAX_FILE_SIZE } from '@/consts'
import { z } from 'zod'
import { baseSchema } from './base'

const checkExists = (list: any) => {
  return list.length === 1
}

const existsMsg = {
  message: 'Required',
}

const checkFileType = (list: any) => {
  const file = list[0]
  if (!file) {
    return false
  }
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

const fileTypeMsg = {
  message: 'Must be jpeg, png, or webp',
}

const checkFileSize = (list: any) => {
  const file = list[0]
  if (!file) {
    return false
  }
  return file.size < MAX_FILE_SIZE
}

const fileSizeMsg = {
  message: 'Must be under 4.5MB',
}

const imageValidator = z
  .any()
  .refine(checkExists, existsMsg)
  .refine(checkFileType, fileTypeMsg)
  .refine(checkFileSize, fileSizeMsg)

const optionalImageValidator = z
  .any()
  .refine((list) => list.length === 0 || checkExists(list), existsMsg)
  .refine((list) => list.length === 0 || checkFileType(list), fileTypeMsg)
  .refine((list) => list.length === 0 || checkFileSize(list), fileSizeMsg)

export const newSubmissionSchema = z.object({
  ...baseSchema,
  image: imageValidator,
})

export const updateSubmissionSchema = z.object({
  ...baseSchema,
  image: optionalImageValidator,
})

export type CreateFormSchemaOutput = z.output<typeof newSubmissionSchema>
export type UpdateFormSchemaOutput = z.output<typeof updateSubmissionSchema>
