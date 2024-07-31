import { db } from '@/db/db'
import { and, eq, isNotNull, sql } from 'drizzle-orm'
import { categories, scores, users } from '../schema'
import { AdapterReturn, JudgeWithScores } from '../types'
import { Role } from '../util'
import { valOrError, wrap } from './util'

const judges = db.$with('judges').as(
  db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.role, Role.Judge)),
)

const jc = db.$with('jc').as(
  db
    .with(judges)
    .select({
      categoryId: sql`${categories.id}`.as('jc_categoryId'),
      judgeId: sql`${judges.id}`.as('jc_judgeId'),
      judgeName: judges.name,
      judgeEmail: judges.email,
    })
    .from(judges)
    .rightJoin(categories, isNotNull(judges.id)),
)

const subScores = db.$with('subScores').as(
  db
    .select()
    .from(scores)
    .where(eq(scores.submissionId, sql.placeholder('subId'))),
)

const judgesWithScoresStatement = db
  .with(subScores, jc)
  .select({
    id: jc.judgeId,
    name: jc.judgeName,
    email: jc.judgeEmail,
    scores: sql`jsonb_agg(jsonb_build_object('categoryId', ${jc.categoryId},'score', ${subScores.score}))`,
  })
  .from(jc)
  .leftJoin(
    subScores,
    and(
      eq(jc.categoryId, subScores.categoryId),
      eq(jc.judgeId, subScores.judgeId),
    ),
  )
  .groupBy(jc.judgeId, jc.judgeName, jc.judgeEmail)
  .orderBy(jc.judgeName)
  .prepare('judgesWithScores')

export const readJudgesScores = wrap(
  async (subId: string): Promise<AdapterReturn<JudgeWithScores[]>> => {
    const judgesWithScores = await judgesWithScoresStatement.execute({
      subId,
    })
    return valOrError(judgesWithScores as JudgeWithScores[])
  },
)

// export const readJudgesScores2 = async (
//   subId: string,
// ): Promise<AdapterReturn<JudgeWithScores[]>> => {
//   console.time('readJudgesWithScores2')
//   const categoriesPromise = readCategories()

//   const judgesWithScoresPromise = q.users.findMany({
//     where: (users, { eq }) => eq(users.role, Role.Judge),
//     columns: {
//       id: true,
//       name: true,
//       email: true,
//     },
//     with: {
//       scores: {
//         where: (scores, { eq }) => eq(scores.submissionId, subId),
//         columns: {
//           categoryId: true,
//           score: true,
//         },
//       },
//     },
//     orderBy: users.name,
//   })

//   const allJudgesPromise = q.users.findMany({
//     where: (users, { eq }) => eq(users.role, Role.Judge),
//     columns: {
//       id: true,
//       name: true,
//       email: true,
//     },
//     orderBy: users.name,
//   })

//   const [categoryResults, judgesWithScores, allJudges] = await Promise.all([
//     categoriesPromise,
//     judgesWithScoresPromise,
//     allJudgesPromise,
//   ])

//   if (categoryResults.error) {
//     return { data: null, error: categoryResults.error }
//   }

//   const result = valOrError(
//     combine(
//       categoryResults.data,
//       judgesWithScores as JudgeWithScores[],
//       allJudges,
//     ),
//   )
//   console.timeEnd('readJudgesWithScores2')

//   return result
// }

// const combine = (
//   categories: Category[],
//   judgesWithScores: JudgeWithScores[],
//   allJudges: Pick<User, 'id' | 'name' | 'email'>[],
// ): JudgeWithScores[] => {
//   const judgeWithScoreIds = judgesWithScores.map((j) => j.id)
//   const judgesWithoutScores = allJudges.filter(
//     (j) => !judgeWithScoreIds.includes(j.id),
//   )
//   const categoryIds = categories.map((category) => category.id)
//   const judgesWithNullScores: JudgeWithScores[] = judgesWithoutScores.map(
//     (judge) => ({
//       id: judge.id,
//       email: judge.email,
//       name: judge.name!,
//       scores: categoryIds.map((categoryId) => ({
//         categoryId,
//         score: null,
//       })),
//     }),
//   )

//   for (const judge of judgesWithScores) {
//     if (judge.scores.length === categories.length) {
//       continue
//     }
//     const scoreCatIds = judge.scores.map((score) => score.categoryId)
//     const missingScores = categoryIds
//       .filter((categoryId) => !scoreCatIds.includes(categoryId))
//       .map((categoryId) => ({
//         categoryId,
//         score: null,
//       }))
//     judge.scores.push(...missingScores)
//     judge.scores.sort((a, b) => (a.categoryId < b.categoryId ? -1 : 1))
//   }

//   const allJudgesWithScores = [...judgesWithScores, ...judgesWithNullScores]
//   allJudgesWithScores.sort((a, b) => (a.name < b.name ? -1 : 1))
//   return allJudgesWithScores
// }
