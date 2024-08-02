import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { accounts, authenticators, sessions, users } from './db/schema'
import { db } from './db/db'
import { User } from './db/types'
import { DAO } from './db/dao'
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
      profile: async (profile) => await addRole(profile),
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

export const addRole = async (profile: any) => {
  let updatedProfile = { ...profile, image: profile.picture }
  const { data, error } = await DAO.readInitialRole(profile.email)
  if (error) {
    console.error(`error reading initial role for ${profile.email}`, error)
  } else {
    updatedProfile.role = data ? data.role : Role.Contestant
  }
  if (data) {
    const delResult = await DAO.deleteInitialRole(data.id)
    if (delResult) {
      console.error(`error deleting initial role for ${profile.email}`)
    }
  }
  return updatedProfile
}
