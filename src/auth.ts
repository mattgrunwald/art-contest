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
      profile: async (profile) => await linkImage(profile),
    }),
  ],
  callbacks: {
    session({ session, user }) {
      const usr = session.user as User

      usr.role = (user as User).role
      return session
    },
  },
  debug: false,
})

export const linkImage = async (profile: any) => {
  const { data, error } = await DAO.readUserByEmail(profile.email)
  if (error) {
    console.error('error reading user', error)
  } else if (data && data.image === null) {
    console.log('updating image for ', data.email)
    DAO.updateUserImage(data.id, profile.picture)
  }
  return { ...profile, image: profile.picture }
}
