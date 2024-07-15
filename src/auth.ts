import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { accounts, sessions, users } from './drizzle/schema'
import { db } from './drizzle/db'
import { User } from './drizzle/types'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'database',
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? 'user', ...profile }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      ;(session.user as User).role! = (user as User).role
      return session
    },
  },
  debug: process.env.NODE_ENV !== 'production',
})
