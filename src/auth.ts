import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { accounts, authenticators, sessions, users } from './db/schema'
import { db } from './db/db'
import { User } from './db/types'
import { Role } from './db/util'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'database',
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    authenticatorsTable: authenticators,
  }),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return { role: profile.role ?? Role.Contestant, ...profile }
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      const usr = session.user as User
      usr.role = (user as User).role
      return session
    },
  },
  // debug: process.env.NODE_ENV !== 'production',
  debug: false,
})
