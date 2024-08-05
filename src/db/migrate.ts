import { migrate as localMigrate } from 'drizzle-orm/postgres-js/migrator'
import { migrate as vercelMigrate } from 'drizzle-orm/vercel-postgres/migrator'
import { db } from './db'

const isLocal = process.env.NODE_ENV === 'production'

const migrate = isLocal ? localMigrate : vercelMigrate
console.log('local?', isLocal)

// This will run migrations on the database, skipping the ones already applied
async function runMigrations() {
  try {
    console.log('running migrations...')
    await migrate(db as any, { migrationsFolder: './drizzle' })
    console.log('success!')
  } catch (error) {
    console.error('error running migrations: ', error)
  }
  process.exit()
}

runMigrations()
