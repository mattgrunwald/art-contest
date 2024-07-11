import { signIn, auth } from '@/auth'

export default function Page() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
        await getInfo()
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  )
}

async function getInfo() {
  const session = await auth()
  console.log(session !== null ? session.user?.email : 'NOTHING')
}
