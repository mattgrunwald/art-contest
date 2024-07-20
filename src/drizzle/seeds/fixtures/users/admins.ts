import { User } from '../../../../drizzle/types'
import { Role } from '../../../../drizzle/util'
import { newUser } from '../util'

const newAdmin = (name: string, email: string) =>
  newUser(name, email, Role.Admin)

export const admins: User[] = [
  newAdmin('Matt Grunwald', 'matt.grunwald.dev@gmail.com'),
  newAdmin('Leigh Ann Fulford', 'lafulford@gmail.com'),
]
