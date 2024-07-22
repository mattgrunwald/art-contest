import { User } from '@/db/types'
import { Role } from '@/db/util'
import { newUser } from '../util'

const newContestant = (name: string, email: string) =>
  newUser(name, email, Role.Contestant)

export const contestants: User[] = [
  newContestant('Ryan George', 'ryan.george.@gmail.com'),
  newContestant('Clare Mowell', 'clare.mowell@gmail.com'),
  newContestant('Meera Bobeera', 'meera@gmail.com'),
  newContestant('Seymour Butts', 'seymour.butts@gmail.com'),
]
