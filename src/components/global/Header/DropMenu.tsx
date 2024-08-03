'use client'
import { getUser } from '@/app/serverSideUtils'
import { ThemeToggle } from '@/components/util/ThemeToggle'
import { User } from '@/db/types'
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { useEffect, useState } from 'react'
import { SignOutButton } from '../Header/client'
import { UserInfo } from '../shared/UserInfo'

export default function DropMenu() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const initUser = async () => {
      setUser(await getUser())
    }
    initUser()
  }, [])

  return (
    <Menu>
      <MenuButton>
        <Image
          className="mx-auto h-8 w-8 rounded-full object-cover"
          src={user?.image ?? '/images/1.jpg'}
          alt="Your profile image"
          width={50}
          height={50}
        />
      </MenuButton>
      <MenuItems className="absolute right-4 top-16 z-40 rounded-lg bg-slate-300/60 p-4 backdrop-blur-2xl transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:bg-slate-800/60">
        <MenuItem>
          <UserInfo user={user} />
        </MenuItem>
        <MenuItem>
          <div className="flex justify-center">
            <SignOutButton />
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

// export const MenuItem = ({ children }: PropsWithChildren) => (
//   <div className="pb-4">{children}</div>
// )
