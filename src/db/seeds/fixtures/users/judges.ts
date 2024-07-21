import { User } from '@/db/types'
import { Role } from '@/db/util'
import { newUser } from '../util'

const newJudge = (name: string, email: string) =>
  newUser(name, email, Role.Judge)

export const judges: User[] = [
  newJudge('Matt Grunwald', 'mngreenforest@gmail.com'),
  newJudge('Frankie Bean', 'frankie.bean@gmail.com'),
]
