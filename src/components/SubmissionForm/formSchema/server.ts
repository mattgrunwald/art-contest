import 'server-only'

import { MAX_FILE_SIZE } from '@/consts'
import { z } from 'zod'
import { baseSchema } from './base'

const imageValidator = z
  .instanceof(File)
  .refine(
    (file) => {
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
    (file) => {
      return file.size < MAX_FILE_SIZE
    },
    {
      message: 'Must be under 4.5MB',
    },
  )
export const formSchema = z.object({
  ...baseSchema,
  image: imageValidator,
  userId: z.string().nullable(),
  submissionId: z.string().nullable(),
})

export type FormSchemaOutput = z.output<typeof formSchema>
