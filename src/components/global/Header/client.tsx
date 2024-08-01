'use client'

import { signIn, signOut } from './actions'
import { PrimaryButton } from '@/components/themed/client'

export const SignOutButton = ({ large = false }: { large?: boolean }) => {
  return (
    <PrimaryButton
      small={!large}
      large={large}
      onClick={async () => await signOut()}
    >
      Sign Out
    </PrimaryButton>
  )
}

export const SignInButton = ({ large = false }: { large?: boolean }) => {
  return (
    <PrimaryButton
      small={!large}
      large={large}
      onClick={async () => await signIn()}
    >
      Sign In
    </PrimaryButton>
  )
}
