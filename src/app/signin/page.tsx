import { signIn, auth } from '@/auth'
import { DAO } from '@/drizzle/dao'
import Image from 'next/image'

export default async function Page() {
  const session = await auth()
  // await DAO.deleteAllUsers()
  const email = session === null ? 'NOBODY' : session.user?.email
  const x = session?.user?.image || ''
  return (
    <>
      <h1>Hello, {email}</h1>
      <Image src={x} width={500} height={500} alt="you" />
      <form
        action={async () => {
          'use server'
          await signIn()
        }}
      >
        <button type="submit">Sign in</button>
      </form>
    </>
  )
}
