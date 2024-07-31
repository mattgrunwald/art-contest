import * as schema from './schema'

import { sql as vercelSql } from '@vercel/postgres'
import { drizzle as vercelDrizzle } from 'drizzle-orm/vercel-postgres'
import { drizzle as localDrizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const isLocal = process.env.NODE_ENV !== 'production'
const url = process.env.DATABASE_URL || ''

export const db = isLocal
  ? localDrizzle(postgres(url), { schema })
  : vercelDrizzle(vercelSql, { schema })
