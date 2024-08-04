import { Role } from '@/db/util'
import { AdminOrJudge, flavors } from './util'
import { ClientUserList } from './ClientUserList'

type UserListProps = {
  flavor: AdminOrJudge
}

const UserList = async ({ flavor }: UserListProps) => {
  const { readUsers } = flavors[flavor]
  const { data, error } = await readUsers()
  if (error !== null) {
    return <div>Error: {error.message}</div>
  }
  return <ClientUserList flavor={flavor} initialUsers={data} />
}

export const AdminList = () => <UserList flavor={Role.Admin} />
export const JudgeList = () => <UserList flavor={Role.Judge} />
