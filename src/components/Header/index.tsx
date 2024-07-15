import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Role } from '@/drizzle/util'
import { useState } from 'react'
import { auth, signOut } from '@/auth'
import { User } from '@/drizzle/types'
import Image from 'next/image'

export const Header = async () => {
  const session = await auth()

  const user = session?.user as User | undefined
  const role = user !== undefined ? user.role : Role.Contestant

  const showAdmin = role === Role.Admin
  const showSubmit = role === Role.Admin || role == Role.Contestant
  const showGallery = true
  const userIsDefined = user !== undefined
  return (
    <header className="sticky top-0 z-30 bg-slate-50 pt-4 dark:bg-slate-950">
      <div className="content-width mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link href="/" aria-label="Art Contest">
          <b>Art Contest</b>
        </Link>
        <div className="4xsl:justify-between flex items-center justify-around">
          {showAdmin && <AdminLink />}
          {showSubmit && <SubmitLink />}
          {showGallery && <GalleryLink />}
          {userIsDefined && (
            <>
              <UserDropdown user={user} />
              <SignOutButton />
            </>
          )}
          {/* <ModeToggle /> */}
        </div>
      </div>
      <hr className="my-4 dark:border-slate-50/20" />
    </header>
  )
}

const SubmitLink = () => (
  <nav className="ml-auto space-x-6 text-sm font-medium max-lg:mr-4 lg:mr-6">
    <Link href="/submit" prefetch={false} aria-label="Submit your artwork">
      Submit
    </Link>
  </nav>
)

const AdminLink = () => (
  <nav className="ml-auto space-x-6 text-sm font-medium max-lg:mr-4 lg:mr-6">
    <Link href="/admin" prefetch={false} aria-label="Admin portal">
      Admin
    </Link>
  </nav>
)

const GalleryLink = () => (
  <nav className="ml-auto space-x-6 text-sm font-medium max-lg:mr-4 lg:mr-6">
    <Link href="/judge" prefetch={false} aria-label="Gallery">
      Gallery
    </Link>
  </nav>
)

const UserDropdown = ({ user }: { user: User }) => {
  return (
    <div className="w-8">
      <Image
        className="mx-auto h-6 w-6 rounded-full"
        src={user.image || '/images/1.jpg'}
        alt="Your profile image"
        width="100"
        height="100"
      />
    </div>
  )
}

const SignOutButton = () => (
  <form
    action={async () => {
      'use server'
      await signOut()
    }}
  >
    <button type="submit">Sign Out</button>
  </form>
)
