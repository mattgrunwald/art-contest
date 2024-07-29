'use client'

import { MAX_FILE_SIZE } from '@/consts'
import { z } from 'zod'
import { baseSchema } from './base'

const imageValidator = z
  .any()
  .refine(
    (list) => {
      return list.length === 1
    },
    {
      message: 'Required',
    },
  )
  .refine(
    (list) => {
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
    },
    {
      message: 'Must be jpeg, png, or webp',
    },
  )
  .refine(
    (list) => {
      const file = list[0]
      if (!file) {
        return false
      }
      return file.size < MAX_FILE_SIZE
    },
    {
      message: 'Must be under 4.5MB',
    },
  )
export const formSchema = z.object({
  ...baseSchema,
  image: imageValidator,
})

export type FormSchemaOutput = z.output<typeof formSchema>
