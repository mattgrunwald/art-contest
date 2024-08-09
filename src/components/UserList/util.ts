import { AdapterReturn } from '@/db/types'
import { Role } from '@/db/util'
import { User } from '@/db/types'
import {
  readAdmins,
  addAdmin,
  readJudges,
  addJudge,
} from '@/actions/admin/roles'

export type AdminOrJudge = Role.Admin | Role.Judge

export const flavors: Record<
  AdminOrJudge,
  {
    singular: string
    plural: string
    readUsers: () => Promise<AdapterReturn<User[]>>
    addUser: (email: string) => Promise<AdapterReturn<User>>
  }
> = {
  [Role.Admin]: {
    singular: 'Admin',
    plural: 'Admins',
    readUsers: readAdmins,
    addUser: addAdmin,
  },
  [Role.Judge]: {
    singular: 'Judge',
    plural: 'Judges',
    readUsers: readJudges,
    addUser: addJudge,
  },
}
