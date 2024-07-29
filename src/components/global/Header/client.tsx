'use client'

import { signIn, signOut } from './actions'

export const SignOutButton = () => {
  return <button onClick={async () => await signOut()}>Sign Out</button>
}

export const SignInButton = () => {
  return <button onClick={async () => await signIn()}>Sign In</button>
}
