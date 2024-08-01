'use client'
import { getUser } from '@/app/serverSideUtils'
import { ThemeToggle } from '@/components/util/ThemeToggle'
import { User } from '@/db/types'
import { Role } from '@/db/util'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren, useEffect, useState } from 'react'
import { SignInButton, SignOutButton } from '../Header/client'

const UserInfo = ({ user }: { user: User | null }) => {
  if (!user) {
    return <div className="mb-4 h-8"></div>
  }
  return (
    <div className="mb-4 flex w-full justify-between">
      <div>
        <div className="text-lg">{user.name}</div>
        <div className="text-sm">{user.email}</div>
      </div>
      <div className="">
        <Image
          className="h-12 w-12 rounded-full object-cover"
          src={user.image || '/images/1.jpg'}
          alt="Your profile image"
          width="100"
          height="100"
        />
      </div>
    </div>
  )
}

export default function Flyout() {
  const [user, setUser] = useState<User | null>(null)
  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
  useEffect(() => {
    const initUser = async () => {
      setUser(await getUser())
    }
    initUser()
  }, [])

  const showAdmin = user && user.role === Role.Admin
  const showSubmit =
    user && (user.role === Role.Admin || user.role == Role.Contestant)
  const showGallery = true
  const loggedIn = user !== null
  return (
    <>
      <Button
        onClick={open}
        className="data-[focus]:outline-blue block text-sm/6 font-semibold text-slate-950 focus:outline-none data-[focus]:outline-1 dark:text-slate-50"
      >
        <Bars3Icon className="size-10" />
      </Button>
      <Dialog
        open={isOpen}
        onClose={close}
        as="div"
        transition
        className="fixed top-0 z-20 h-[100vh] transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 md:hidden"
      >
        <DialogPanel className="flex h-full w-[100vw] flex-col items-start justify-start bg-slate-300/70 p-6 text-xl backdrop-blur-2xl dark:bg-slate-800/70">
          <MenuItem>
            <Button onClick={close}>
              <XMarkIcon className="size-10" />
            </Button>
          </MenuItem>
          <UserInfo user={user} />
          <MenuItem>
            <ThemeToggle large />
          </MenuItem>
          {showAdmin && (
            <MenuItem>
              <AdminLink />
            </MenuItem>
          )}
          {showSubmit && (
            <MenuItem>
              <SubmitLink />
            </MenuItem>
          )}
          {showGallery && (
            <MenuItem>
              <GalleryLink />
            </MenuItem>
          )}

          <MenuItem>
            {loggedIn && (
              <>
                <SignOutButton large />
              </>
            )}
            {!loggedIn && <SignInButton large />}
          </MenuItem>
        </DialogPanel>
      </Dialog>
    </>
  )
}

const MenuItem = ({ children }: PropsWithChildren) => (
  <div className="pb-8">{children}</div>
)

const BigNav = ({ children }: PropsWithChildren) => (
  <nav className="ml-auto space-x-6 text-4xl font-medium max-lg:mr-4 lg:mr-6">
    {children}
  </nav>
)

const SubmitLink = () => (
  <BigNav>
    <Link href="/submit" prefetch={false} aria-label="Submit your artwork">
      Submit
    </Link>
  </BigNav>
)

const AdminLink = () => (
  <BigNav>
    <Link href="/admin" prefetch={false} aria-label="Admin portal">
      Admin
    </Link>
  </BigNav>
)

const GalleryLink = () => (
  <BigNav>
    <Link href="/gallery" prefetch={false} aria-label="Gallery">
      Gallery
    </Link>
  </BigNav>
)
