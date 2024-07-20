import { User } from '../../../../drizzle/types'
import { Role } from '../../../../drizzle/util'
import { newUser } from '../util'

const newJudge = (name: string, email: string) =>
  newUser(name, email, Role.Judge)

export const judges: User[] = [
  newJudge('Junie Boonie', 'junie.boonie@gmail.com'),
  newJudge('Frankie Bean', 'frankie.bean@gmail.com'),
]
