import Link from 'next/link'
import { Role } from '@/db/util'
import { User } from '@/db/types'
import Image from 'next/image'
import { getUser } from '@/app/serverSideUtils'
import { ThemeToggle } from '@/components/util/ThemeToggle'
import { SignInButton, SignOutButton } from './client'
import Flyout from '../Flyout'

export const Header = async () => {
  const user = await getUser()

  const showAdmin = user && user.role === Role.Admin
  const showSubmit =
    user && (user.role === Role.Admin || user.role == Role.Contestant)
  const showGallery = true
  const loggedIn = user !== null
  return (
    <header className="sticky top-0 z-10 bg-slate-50 pt-3 dark:bg-slate-950">
      <div className="mx-auto flex w-full flex-col items-center">
        <div className="flex w-full max-w-[1800px] items-center justify-between px-4 lg:px-8">
          <Link href="/" aria-label="GEM Project Art Contest">
            <b>GEM Project Art Contest</b>
          </Link>
          <div className="flex items-center justify-around max-md:hidden 4xl:justify-between">
            {showAdmin && <AdminLink />}
            {showSubmit && <SubmitLink />}
            {showGallery && <GalleryLink />}
            <ThemeToggle />
            {loggedIn && (
              <>
                <ProfilePicture user={user} />
                <SignOutButton />
              </>
            )}
            {!loggedIn && <SignInButton />}
            {/* <ModeToggle /> */}
          </div>
          <div className="md:hidden">
            <Flyout />
          </div>
        </div>
        <hr className="content-width my-3 w-full dark:border-slate-50/20" />
      </div>
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
    <Link href="/gallery" prefetch={false} aria-label="Gallery">
      Gallery
    </Link>
  </nav>
)

const ProfilePicture = ({ user }: { user: User }) => {
  return (
    <div className="mx-2 w-8">
      <Image
        className="mx-auto h-8 w-8 rounded-full object-cover"
        src={user.image || '/images/1.jpg'}
        alt="Your profile image"
        width={50}
        height={50}
      />
    </div>
  )
}
