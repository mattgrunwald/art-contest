'use client'

import { signIn, signOut } from './actions'
import { PrimaryButton } from '@/components/themed/client'

export const SignOutButton = () => {
  return (
    <PrimaryButton small onClick={async () => await signOut()}>
      Sign Out
    </PrimaryButton>
  )
}

export const SignInButton = () => {
  return (
    <PrimaryButton small onClick={async () => await signIn()}>
      Sign In
    </PrimaryButton>
  )
}
