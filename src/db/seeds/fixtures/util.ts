import { User } from '@/db/types'
import { Role } from '@/db/util'

function* generator(i: number) {
  while (true) {
    i++
    yield i
  }
}

const userIds = generator(0)
const nextUserId = () => `${userIds.next().value as number}`

export const newUser = (name: string, email: string, role: Role): User => {
  return {
    id: nextUserId(),
    name,
    email,
    emailVerified: null,
    image: null,
    role,
  }
}

const categoryIds = generator(0)
export const nextCategoryId = () => categoryIds.next().value as number

const submissionIds = generator(0)
export const nextSubmissionId = () => submissionIds.next().value as number

const scoreIds = generator(0)
export const nextScoreId = () => scoreIds.next().value as number
