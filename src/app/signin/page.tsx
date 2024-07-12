import { signIn, auth } from '@/auth'

export default async function Page() {
  const session = await auth()
  const email = session === null ? 'NOBODY' : session.user?.email
  return (
    <>
      <h1>Hello, {email}</h1>
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
