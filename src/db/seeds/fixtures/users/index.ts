import { admins } from './admins'
import { contestants } from './contestants'
import { judges } from './judges'

export * from './admins'
export * from './contestants'
export * from './judges'

export const allUsers = [...admins, ...contestants, ...judges]
