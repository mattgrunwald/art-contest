import { User } from '../../../../drizzle/types'
import { Role } from '../../../../drizzle/util'
import { newUser } from '../util'

const newContestant = (name: string, email: string) =>
  newUser(name, email, Role.Contestant)

export const contestants: User[] = [
  newContestant('Ryan George', 'ryan.george.@gmail.com'),
  newContestant('Clare Mowell', 'clare.mowell@gmail.com'),
  newContestant('Meera Bobeera', 'meera@gmail.com'),
]
