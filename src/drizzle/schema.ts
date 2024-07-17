import { relations } from 'drizzle-orm'
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  date,
  serial,
  doublePrecision,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'
import { Role } from './util'

// TODO how to assign role before user is logged in for first time?
// If we create a user and they log in for the first time does that just work?
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  role: text('role').default(Role.Readonly).notNull(),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compositePk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
)

export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  grade: integer('grade').notNull(),
  level: text('level').notNull(),
  statement: text('statement').notNull(),
  imageSrc: text('image').notNull(),
  birthday: date('date').notNull(),
  consentForm: text('consentForm'),
  createdAt: timestamp('timestamp', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('timestamp', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

// TODO do we need to define a relation between subs and scores?

export const userRelations = relations(users, ({ one, many }) => ({
  submission: one(submissions, {
    fields: [users.id],
    references: [submissions.id],
  }),
  scores: many(scores),
}))

export const submissionRelations = relations(submissions, ({ many }) => ({
  scores: many(scores),
}))

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
})

export const scores = pgTable('scores', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  submissionId: integer('submissionId')
    .notNull()
    .references(() => submissions.id, { onDelete: 'cascade' }),
  categoryId: integer('categoryId')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  score: doublePrecision('score'),
})
