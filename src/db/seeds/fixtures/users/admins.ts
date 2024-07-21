import { User } from '@/db/types'
import { Role } from '@/db/util'
import { newUser } from '../util'

const newAdmin = (name: string, email: string) =>
  newUser(name, email, Role.Admin)

export const admins: User[] = [
  newAdmin('Matt Grunwald', 'matt.grunwald.dev@gmail.com'),
  newAdmin('Leigh Ann Fulford', 'lafulford@gmail.com'),
]
