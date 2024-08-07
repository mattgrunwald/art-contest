import { MAX_STATEMENT_LENGTH } from '@/consts'
import { phoneRegex, zipRegex } from '@/util/helpers'
import { z } from 'zod'

export const baseSchema = {
  email: z.string().trim().email({
    message: 'Invalid email',
  }),
  name: z.string().trim().min(1, {
    message: 'Required',
  }),
  grade: z
    .string()
    .trim()
    .refine((g) => !isNaN(parseInt(g)), {
      message: 'Must be a number',
    })
    .refine(
      (g) => {
        const grade = parseInt(g)
        return grade >= 6
      },
      {
        message: 'Minimum is 6',
      },
    )
    .refine(
      (g) => {
        const grade = parseInt(g)
        return grade <= 12
      },
      {
        message: 'Maximum is 12',
      },
    ),
  statement: z.string().trim().max(MAX_STATEMENT_LENGTH).min(1, {
    message: 'Required',
  }),
  phone: z.string().trim().regex(phoneRegex, {
    message: 'Invalid',
  }),
  street: z.string().trim().min(1, {
    message: 'Required',
  }),
  street2: z.string().trim().nullable(),
  state: z.string().trim().length(2),
  zip: z.string().trim().regex(zipRegex),
  city: z.string().trim().min(1, {
    message: 'Required',
  }),
}
