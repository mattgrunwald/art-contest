'use client'
import { User } from '@/db/types'
import { useMemo, useState } from 'react'
import { FullTable } from '../themed'
import { removePrivileges } from '@/actions/admin/roles'
import { AdminOrJudge, flavors } from './util'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Button, Input } from '@headlessui/react'
import { emailRegex } from '@/util/helpers'
import { Tooltip } from '../util/Tooltip'
import { BASE_INPUT_STYLE } from '@/consts'

export type ClientUserListProps = {
  initialUsers: User[]
  flavor: AdminOrJudge
}

// todo use input ref to avoid rerendering entire list on input
export const ClientUserList = ({
  initialUsers,
  flavor,
}: ClientUserListProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [newUser, setNewUser] = useState<string>('')
  const [waiting, setWaiting] = useState(false)

  const isValidEmail = useMemo(
    () => newUser !== '' && emailRegex.test(newUser),
    [newUser],
  )

  const { plural, addUser } = flavors[flavor]

  const onAdd = async (email: string) => {
    try {
      setWaiting(true)
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
    } finally {
      setWaiting(false)
    }
  }

  const onRemovePrivileges = async (email: string) => {
    try {
      setWaiting(true)
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
    } finally {
      setWaiting(false)
    }
  }

  const rows = users.map((user, index) => [
    user.name,
    user.email,
    <Button
      key={index}
      onClick={() => onRemovePrivileges(user.email)}
      disabled={waiting}
    >
      <Tooltip id={`delete-${flavor}-${user.email}`} content="Delete">
        <TrashIcon className="size-5 text-neutral-950 dark:text-neutral-50" />
      </Tooltip>
    </Button>,
  ])

  const emailInput = (
    <Input
      className={BASE_INPUT_STYLE}
      placeholder="email"
      type="text"
      onChange={(e) => setNewUser(e.target.value)}
    />
  )

  const addButton = (
    <Button disabled={!isValidEmail || waiting} onClick={() => onAdd(newUser)}>
      <Tooltip id={`add-${flavor}-new`} content="Add">
        <PlusIcon className="size-5 text-neutral-950 dark:text-neutral-50" />
      </Tooltip>
    </Button>
  )

  rows.push(['', emailInput, addButton])

  const tableProps = {
    title: plural,
    headers: ['name', 'email', 'actions'],
    rows,
    fullWidth: true,
  }

  return (
    <div className="w-full py-4">
      <FullTable {...tableProps} />
    </div>
  )
}
