'use client'
import { AdapterReturn, User } from '@/drizzle/types'
import { Role } from '@/drizzle/util'
import { useUser } from '@/hooks/useUser'
import { useState, useEffect, PropsWithChildren } from 'react'
import {
  addAdmin,
  addJudge,
  readAdmins,
  readJudges,
  removePrivileges,
} from './actions'

export type AdminOrJudge = Role.Admin | Role.Judge
export type UserListProps = {
  flavor: AdminOrJudge
}

const flavors: Record<
  AdminOrJudge,
  [
    string,
    string,
    () => Promise<AdapterReturn<User[]>>,
    (email: string) => Promise<AdapterReturn<User>>,
  ]
> = {
  [Role.Admin]: ['Admin', 'Admins', readAdmins, addAdmin],
  [Role.Judge]: ['Judge', 'Judges', readJudges, addJudge],
}

const UserList = ({ flavor }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<string>('')
  const [err, setErr] = useState<Error | null>(null)
  const me = useUser()

  const [singular, plural, readUsers, addUser] = flavors[flavor]

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data, error } = await readUsers()
      if (error !== null) {
        setErr(error)
      }
      if (data !== null) {
        setUsers(data)
      }
    }
    fetchAdmins()
  }, [])

  if (me === undefined) {
    return <div>loading...</div>
  }

  if (!me.isAdmin) {
    return <div>Restricted</div>
  }

  if (err !== null) {
    return <div>ERROR: {err.message}</div>
  }

  const onAdd = async (email: string) => {
    const response = await addUser(email)
    if (response === null) {
      return
    }
    const { data, error } = response
    if (data !== null) {
      setUsers([...users, data])
      setNewUser('')
    } else {
      console.error(error)
    }
  }

  const onRemovePrivileges = async (email: string) => {
    const response = await removePrivileges(email)
    if (response === null) {
      console.warn('only admins can do that')
      return
    }
    if (response.data !== null) {
      setUsers(users.filter((user) => user.email !== email))
    }
    if (response.error !== null) {
      console.error(response.error.message)
    }
  }

  return (
    <>
      <h2>{plural}</h2>
      <table className="table-auto">
        <tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Actions</Th>
        </tr>
        {users.map((user, index) => (
          <tr key={index}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>
              <button onClick={() => onRemovePrivileges(user.email)}>
                Remove
              </button>
            </Td>
          </tr>
        ))}
      </table>
      <h2>Add {singular}</h2>
      <label>Email</label>
      <input type="text" onChange={(e) => setNewUser(e.target.value)} />
      <button onClick={() => onAdd(newUser)}>Add</button>
    </>
  )
}

const Th = ({ children }: PropsWithChildren) => (
  <th className="px-1">{children}</th>
)
const Td = ({ children }: PropsWithChildren) => (
  <td className="px-1">{children}</td>
)

export const AdminList = () => <UserList flavor={Role.Admin} />
export const JudgeList = () => <UserList flavor={Role.Judge} />
