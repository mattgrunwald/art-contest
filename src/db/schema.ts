import { relations } from 'drizzle-orm'
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  doublePrecision,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'
import { Role } from './util'
import { nanoid } from 'nanoid'

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
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

// Contest tables

// TODO use enums in pg?

export const submissions = pgTable('submissions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  grade: text('grade').notNull(),
  level: text('level').notNull(),
  statement: text('statement').notNull(),
  imageSrc: text('image').notNull(),
  imageHash: text('imageHash').notNull(),
  consentForm: text('consentForm'),
  approved: boolean('approved').notNull().default(false),
  createdAt: timestamp('createdAt', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
  street: text('street').notNull(),
  street2: text('street2'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zip: text('zip').notNull(),
  phone: text('phone').notNull(),
})

export const submittedImages = pgTable('submittedImages', {
  filename: text('filename').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const userRelations = relations(users, ({ one, many }) => ({
  submission: one(submissions, {
    fields: [users.id],
    references: [submissions.userId],
  }),
  scores: many(scores),
  submittedImages: many(submittedImages),
}))

export const submissionRelations = relations(submissions, ({ one, many }) => ({
  scores: many(scores),
  user: one(users, {
    fields: [submissions.userId],
    references: [users.id],
  }),
}))

export const categories = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  exceeds: text('exceeds').notNull(),
  meets: text('meets').notNull(),
  misses: text('misses').notNull(),
})

export const scores = pgTable('scores', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  judgeId: text('judgeId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  submissionId: text('submissionId')
    .notNull()
    .references(() => submissions.id, { onDelete: 'cascade' }),
  categoryId: text('categoryId')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  score: doublePrecision('score'),
})

export const scoresRelations = relations(scores, ({ one }) => ({
  submission: one(submissions, {
    fields: [scores.submissionId],
    references: [submissions.id],
  }),
  user: one(users, {
    fields: [scores.judgeId],
    references: [users.id],
  }),
}))
