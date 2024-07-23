'use client'
import { User } from '@/db/types'
import { useMemo, useState } from 'react'
import { FullTable } from '../themed'
import { removePrivileges } from './actions'
import { AdminOrJudge, flavors } from './util'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Button, Field, Input, Label } from '@headlessui/react'
import { emailRegex } from '@/util/helpers'

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

  const isValidEmail = useMemo(
    () => newUser !== '' && emailRegex.test(newUser),
    [newUser],
  )

  const { plural, addUser } = flavors[flavor]

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

  const rows = users.map((user, index) => [
    user.name,
    user.email,
    <button key={index} onClick={() => onRemovePrivileges(user.email)}>
      <div className="h-4 w-4">
        <TrashIcon />
      </div>
    </button>,
  ])

  const tableProps = {
    title: plural,
    headers: ['name', 'email', 'actions'],
    rows,
  }

  return (
    <div className="py-4">
      <FullTable {...tableProps} />
      {/* <h2 className="pl-8">Add {singular}</h2> */}
      <Field>
        <Input
          className="ml-8 mt-3 w-64 rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"
          placeholder="email"
          type="text"
          onChange={(e) => setNewUser(e.target.value)}
        />
        <Button disabled={!isValidEmail} onClick={() => onAdd(newUser)}>
          <div className="mx-4 h-4 w-4 text-xl">
            <PlusIcon />
          </div>
        </Button>
      </Field>
    </div>
  )
}
