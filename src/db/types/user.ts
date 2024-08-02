import { Role } from '../util'
import { BaseUser } from './tables'

export type User = BaseUser & {
  role: Role
}

export type CreateUserDto = Pick<User, 'name' | 'email'>
