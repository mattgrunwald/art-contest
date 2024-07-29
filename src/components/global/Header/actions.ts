'use server'
import { signIn as authSignIn, signOut as authSignOut } from '@/auth'

export const signOut = () => authSignOut()

export const signIn = () => authSignIn()
