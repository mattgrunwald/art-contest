// import { sql } from '@vercel/postgres'
// import { drizzle } from 'drizzle-orm/vercel-postgres'
// export const db = drizzle(sql, { schema })
import * as schema from './schema'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const url = process.env.DATABASE_URL || ''

const sql = postgres(url)
export const db = drizzle(sql, { schema })
