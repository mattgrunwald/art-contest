import { db } from '../db'
import { categories, scores, submissions, users } from '../schema'
import { seedCategories } from './fixtures/categories'
import { seedScores } from './fixtures/scores'
import { seedSubmissions } from './fixtures/submissions'
import { allUsers } from './fixtures/users'

export const seedDb = async () => {
  // users
  console.log('inserting users')
  await db.insert(users).values(allUsers).onConflictDoNothing()

  //submissions
  console.log('inserting submissions')
  await db.insert(submissions).values(seedSubmissions).onConflictDoNothing()

  //categories
  console.log('inserting categories')
  await db.insert(categories).values(seedCategories).onConflictDoNothing()

  //scores
  console.log('inserting scores')
  await db.insert(scores).values(seedScores).onConflictDoNothing()
}

seedDb()
