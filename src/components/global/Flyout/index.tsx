'use client'
import { getUser } from '@/app/serverSideUtils'
import { ThemeToggle } from '@/components/util/ThemeToggle'
import { User } from '@/db/types'
import { Role } from '@/db/util'
import { Button, Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { SignInButton, SignOutButton } from '../Header/client'
import { UserInfo } from '../shared/UserInfo'
import { makeBigNav } from './BigNav'
import { MenuItem } from './MenuItem'

export type FlyoutProps = {
  hasSubmitted: boolean
  subId?: string
}
export default function Flyout({ hasSubmitted, subId }: FlyoutProps) {
  const [user, setUser] = useState<User | null>(null)
  let [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])

  useEffect(() => {
    const initUser = async () => {
      setUser(await getUser())
    }
    initUser()
  }, [])

  const showAdmin = user && user.role === Role.Admin
  const showSubmit =
    user &&
    (user.role === Role.Admin || user.role == Role.Contestant) &&
    !hasSubmitted
  const showMySubmission = user && user.role === Role.Contestant && hasSubmitted
  const showGallery = true
  const loggedIn = user !== null

  const [AdminLink, SubmitLink, MySubmissionLink, GalleryLink] = useMemo(() => {
    return [
      makeBigNav('Admin', '/admin', 'Admin portal', close),
      makeBigNav('Submit', '/submit', 'Submit artwork', close),
      makeBigNav(
        'My Submission',
        `/submission/${subId}`,
        'My submission',
        close,
      ),
      makeBigNav('Gallery', '/gallery', 'Gallery', close),
    ]
  }, [close, subId])

  return (
    <>
      <Button
        onClick={open}
        className="data-[focus]:outline-blue block text-sm/6 font-semibold text-neutral-950 focus:outline-none data-[focus]:outline-1 dark:text-neutral-50"
      >
        <Bars3Icon className="size-10" />
      </Button>
      <Dialog
        open={isOpen}
        onClose={close}
        as="div"
        transition
        className="fixed top-0 z-30 h-[100vh] transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 md:hidden"
      >
        <DialogPanel className="flex h-full w-[100vw] flex-col items-start justify-start bg-neutral-300/70 p-6 text-xl backdrop-blur-2xl dark:bg-neutral-800/70">
          <MenuItem>
            <Button onClick={close}>
              <XMarkIcon className="size-10" />
            </Button>
          </MenuItem>
          <UserInfo user={user} large />
          <MenuItem>
            <ThemeToggle large />
          </MenuItem>
          {showAdmin && <AdminLink />}
          {showSubmit && <SubmitLink />}
          {showMySubmission && <MySubmissionLink />}
          {showGallery && <GalleryLink />}
          <MenuItem>
            {loggedIn && <SignOutButton large />}
            {!loggedIn && <SignInButton large />}
          </MenuItem>
        </DialogPanel>
      </Dialog>
    </>
  )
}
