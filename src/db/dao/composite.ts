import { db } from '@/db/db'
import { categories, scores, users } from '../schema'
import { sql } from 'drizzle-orm'
import { Role } from '../util'
import { AdapterReturn, JudgeWithScores } from '../types'
import { valOrError } from './util'

// Yikes
export const readJudgesScores = async (
  subId: string,
): Promise<AdapterReturn<JudgeWithScores[]>> => {
  const judges = sql`
    SELECT
      ${users.id} AS id,
      ${users.name} AS name,
      ${users.email} AS email
    FROM
      ${users}
    WHERE
      ${users.role} = ${Role.Judge}
    `
  const subScores = sql`
    SELECT
      *
    FROM
      ${scores}
    WHERE
      ${scores.submissionId} = ${subId}
  `

  const jc = sql`
    SELECT 
      ${categories.id} AS categoryId,
      judges.id AS judgeId,
      judges.name as judgeName,
      judges.email as judgeEmail
    FROM 
      judges
    CROSS JOIN 
      ${categories}
  `
  const judgesWithScoresQuery = sql`
    WITH
      judges AS (${judges}),
      jc AS (${jc}),
      subScores AS (${subScores})
    SELECT
      judgeId,
      judgeName,
      judgeEmail,
      jsonb_agg(
        jsonb_build_object(
          'categoryId', categoryId,
          'score', score
        )
      ) AS scores
    FROM
      jc
    LEFT JOIN 
      subScores
    ON
      categoryId = subScores."categoryId" 
    AND 
      judgeId = subScores."judgeId"
    GROUP BY
      jc."judgeid", jc."judgename", jc."judgeemail"
  `

  const judgesWithScores = await db.execute(judgesWithScoresQuery)
  const result = judgesWithScores.rows.map((j) => ({
    id: j.judgeid,
    name: j.judgename,
    email: j.judgeemail,
    scores: j.scores,
  })) as JudgeWithScores[]
  return valOrError(result)
}
