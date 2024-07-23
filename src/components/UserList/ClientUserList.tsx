'use client'
import { User } from '@/db/types'
import { useState } from 'react'
import { Th, Td } from '../Table'
import { removePrivileges } from './actions'
import { AdminOrJudge, flavors } from './util'

export type ClientUserListProps = {
  initialUsers: User[]
  flavor: AdminOrJudge
}

export const ClientUserList = ({
  initialUsers,
  flavor,
}: ClientUserListProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [newUser, setNewUser] = useState<string>('')

  const { singular, plural, addUser } = flavors[flavor]

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
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
      <h2>Add {singular}</h2>
      <label>Email</label>
      <input type="text" onChange={(e) => setNewUser(e.target.value)} />
      <button onClick={() => onAdd(newUser)}>Add</button>
    </>
  )
}
