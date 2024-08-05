import { User } from '@/db/types'
import { Role } from '@/db/util'
import { nanoid } from 'nanoid'

export const newUser = (name: string, email: string, role: Role): User => {
  return {
    id: nanoid(),
    name,
    email,
    emailVerified: null,
    image: null,
    role,
  }
}
